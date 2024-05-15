import { useCallback, useEffect, useState } from 'react'
import { Datepicker } from "components/bol_components/DatePicker";
import moment from "moment";
import { FaCalendarPlus } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { BsInfoCircle } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { getBolDetails, updSchedulePickup } from "../api/bol_api";
import { CLOSE_MODIFY_PICKUP_DIALOG_MODAL } from 'actions';
import TimePickDropdown from 'components/bol_components/TimePickDropdown';
import { PICKUP_CLOSE_TIME_OPTIONS, PICKUP_READY_TIME_OPTIONS } from '../constants/BOLConstants';
import { OPEN_VOID_SHIPMENT_MODAL } from "actions";
import Tippy from '@tippyjs/react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export const ModifyPickUpDialog = (props: any) => {
  const shipmentId = props.row.original.shipmentId;
  const changePickupAllowed = props.row.original.changePickupAllowed;
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const dispatch = useDispatch();
  const closeModifyPickupDialog = useCallback(()=> {
    dispatch({
      type: CLOSE_MODIFY_PICKUP_DIALOG_MODAL,
      payload: {
        showShedulePickupDialog: false
      }
    })
  }, [dispatch])
  const [pickupDetailsObj, setPickupDetailsObj] = useState<any>({
    pickupDate: null,
    pickupReadyTime: null,
    pickupCloseTime: null,
  });

  const saveSchedulePickDetails = () => {
    setIsSaving(true)
    updSchedulePickup(props.row.original.shipmentId, {
      pickupDate: moment
        .utc(pickupDetailsObj.pickupDate, "MM/DD/yyyy")
        .format(),
      pickupReadyTime: moment.utc(`
      ${typeof pickupDetailsObj.pickupReadyTime === 'object' ? pickupDetailsObj.pickupReadyTime.value: pickupDetailsObj.pickupReadyTime}`,"HH:mm a").format("HH:mm:ss"),
      pickupCloseTime: moment.utc(` 
      ${typeof pickupDetailsObj.pickupCloseTime === 'object' ? pickupDetailsObj.pickupCloseTime.value: pickupDetailsObj.pickupCloseTime}`,"HH:mm a").format("HH:mm:ss"),
      id: props.row.original.shipmentId,
    }).then(() => {
      setIsSaving(false);
      toast.success('Schedule Updated Successfully');
      props.refetch();
      closeModifyPickupDialog();
    });
  };

  const cancelShipment = () => {
    dispatch({
      type: OPEN_VOID_SHIPMENT_MODAL,
      payload: {
          isCancelShipmentOpen: true,
          row: props.row
      }
    })
    closeModifyPickupDialog();
  }

  const getPickupCloseTime = (timeInput: any) => {
    const timeValue = typeof timeInput === 'string' ? timeInput.slice(0, -3) : timeInput?.value;
    if (!timeValue) return null;
  
    const readyTimeIdx = PICKUP_READY_TIME_OPTIONS.findIndex(
      (item) => item.value === timeValue
    );
  
    return PICKUP_CLOSE_TIME_OPTIONS.slice(readyTimeIdx);
  };

  useEffect(()=> {
      getBolDetails((shipmentId)).then(({data})=> {
          const date = moment(data.pickupDate);
          const formattedDate = date.format('MM/DD/YYYY');
          setPickupDetailsObj({
              pickupDate: formattedDate,
              pickupReadyTime: data.readyTime,
              pickupCloseTime: data.closingTime
          })

          setIsLoading(false);
      })
  }, [shipmentId])

  return (
    <div
      className="z-[1000] justify-center items-center flex modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog w-[500px] relative">
        <div className="modal-content border-none shadow-lg relative flex flex-col pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header bg-green-1 flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-2xl font-medium leading-normal text-white"
              id="exampleModalLabel"
            >
              MODIFY PICK-UP
            </h5>
            <MdCancel
              onClick={closeModifyPickupDialog}
              className="text-white bg-green-1 text-5xl cursor-pointer"
            />
          </div>
          <div className="modal-body relative">
            <div className="m-20 border-[1px] border-solid border-green-1 rounded-md">
              <div className="w-full justify-start flex text-blue-1 mt-5 ml-5">
                <FaCalendarPlus />
                <label className="text-lg pl-2 font-bold">
                  PICK UP DETAILS
                </label>
              </div>
              {changePickupAllowed ? (<div className="w-full justify-center mt-10 text-blue-1 flex">
                  {isLoading ? <ClipLoader loading={isLoading}
                                          size={50}
                                          aria-label='Loading Spinner'
                                          data-testid='loader'
                                /> : <Datepicker
                                          selectedDate={pickupDetailsObj.pickupDate}
                                          onChange={(date: string) => (
                                              setPickupDetailsObj((prev: any) => ({
                                                ...prev,
                                                pickupDate: date,
                                              }))
                                          )}
                                          isValidationTriggered={false}
                                          minDate={true}
                                    />
                  }
              </div>):(<p className='text-center py-[20px] px-[40px]'>The pickup date for this shipment cannot be modified. <br/>Please cancel this shipment and reschedule your <br/> shipment with the new pickup date.</p>)}
              {changePickupAllowed ? (<div className="w-full h-[40px] justify-center mt-10 mb-10 text-blue-1 gap-4 flex items-center">
                  {!isLoading && <>
                                      <TimePickDropdown
                                          time={pickupDetailsObj.pickupReadyTime}
                                          placeholder="Ready Time"
                                          name="ready_time"
                                          options={PICKUP_READY_TIME_OPTIONS}
                                          onChange={(time: any) => {
                                              setPickupDetailsObj((prev: any) => ({
                                                  ...prev,
                                                  pickupReadyTime: time,
                                              }));
                                          }}
                                          isValidationTriggered={false}
                                      />

                                    <TimePickDropdown
                                        time={pickupDetailsObj.pickupCloseTime}
                                        placeholder="Close Time"
                                        name="close_time"
                                        options={getPickupCloseTime(pickupDetailsObj.pickupReadyTime)}
                                        onChange={(time: any) => {
                                            setPickupDetailsObj((prev: any) => ({
                                                ...prev,
                                                pickupCloseTime: time,
                                            }));
                                        }}
                                        isValidationTriggered={false}
                                    />

                                    <Tippy content="This is the time zone for the origin of the shipment" theme="light">
                                        <span>
                                            <BsInfoCircle size={20}/>
                                        </span>
                                    </Tippy>
                                  </>
                  }

              </div>):(<p className='text-center pb-[20px] px-[25px]'>If you require additional assistance, please contact your <br/> Freight Consultant. Thank you</p>)}
            </div>
            <div className="pb-5 w-full justify-center flex gap-16 mt-20">
              <button
                type="button"
                className="btn btn-primary relative w-48 h-16 justify-center text-center border border-solid border-blue-1 rounded-md text-blue-1 bg-white"
              >
                <div className="w-full justify-center gap-3 flex mt-5"  onClick={closeModifyPickupDialog}>
                  <label className="mb-4 text-lg relative text-center cursor-pointer">
                    CANCEL
                  </label>
                </div>
              </button>
              <button
                type="button"
                className={`btn btn-primary relative border h-16 justify-center text-center rounded-md text-white bg-green-1 ${changePickupAllowed ? "w-40" : "w-[fit-content] px-[10px]"}`}
              >
                <div
                  className={`w-full justify-center gap-3 flex ${isSaving ? '' : 'mt-5'}`}
                  onClick={changePickupAllowed ? saveSchedulePickDetails : cancelShipment}
                >
                  {isSaving ? <ClipLoader
                                  loading={isSaving}
                                  size={20}
                                  aria-label='Loading Spinner'
                                  data-testid='loader'
                                  color="white"
                              /> : <>
                                        <label className={changePickupAllowed ? "mb-4 text-lg text-start cursor-pointer" : "mb-4 text-lg text-start cursor-pointer text-[red] text-[1.5rem]"}>
                                        {changePickupAllowed ? "SAVE" : "Cancel this shipment"}
                                        </label>
                                        {changePickupAllowed && <IoMdSave className="justify-items-end cursor-pointer" />}
                                   </>
                  }
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
