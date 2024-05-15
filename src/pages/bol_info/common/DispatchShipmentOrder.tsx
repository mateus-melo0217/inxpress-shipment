import {useState} from 'react';
import { BiCalendarEvent } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { RiInformationFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "store/globalstore";

const tosLink = process.env.REACT_APP_LINK_TERMS_AND_CONDITIONS

export const DispatchShipment = (props: any) => {
  const {pickupDetailsObj} = useSelector((state: RootState) => state.bolInfoReducer);
  const [agreed, setAgreed]  = useState(true);
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.currentTarget.checked)
  }
  return (
    <div
      className="z-[1000] justify-center items-center flex modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog w-[300px] relative">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-[45rem] pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header bg-green-1 flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-2xl font-medium leading-normal text-white"
              id="exampleModalLabel"
            >
              DISPATCH SHIPMENT ORDER
            </h5>
            <MdCancel
              onClick={props.onDialogClose}
              className="text-white bg-green-1 text-5xl cursor-pointer"
            />
          </div>
          <div className="modal-body relative p-4 border-b-[1px] border-dotted border-gray-400">
            <div className="flex w-full mt-5 mb-5 ml-12 justify-between">
              <RiInformationFill className="h-20 w-20 ml-64 fill-yellow-400" />
            </div>
            <div className="text-center mt-4 font-bold ">
              <label>DO YOU WANT TO DISPATCH THIS ORDER ?</label>
            </div>
            <div className="flex justify-between mt-9 ml-20 mr-20 ">
                <BiCalendarEvent className="w-12 h-12" />
                <FaRegClock className="w-11 h-11"/>
                <FaRegClock className="w-11 h-11"/>
            </div>
            <div className="flex justify-between mt-5 ml-10 mr-10 font-bold">
                <label>PICKUP DATE</label>
                <label>READY TIME</label>
                <label>CLOSE TIME</label>
            </div>
            <div className="flex justify-between mt-1 mb-10 ml-12 mr-12 text-lg">
                <label>{pickupDetailsObj.pickupDate}</label>
                <label>{pickupDetailsObj.pickupReadyTime}</label>
                <label>{pickupDetailsObj.pickupCloseTime}</label>
            </div>
            <div className="flex mt-1 mb-10 text-lg justify-center">
              <input type="checkbox" className="mr-2 cursor-pointer" checked={agreed} onChange={handleChange}/>
              <label>I agree to the <a className="underline" href={tosLink} target="_blank" rel="noreferrer">Terms & Conditions</a></label>
            </div>
            <div className="w-full justify-center flex gap-12 mt-5 mb-10">
              <button
                type="button"
                className="btn btn-primary relative border-solid border-blue-1 border w-40 h-20 justify-center text-center rounded-md text-blue-1 bg-white"
              >
                <div
                  className="w-full justify-center gap-3 flex mt-5"
                >
                  <label className="mb-4 text-xl text-start cursor-pointer" onClick={props.onDialogClose}>CANCEL</label>
                </div>
              </button>

              <button
                type="button"
                className="btn btn-primary relative w-56 h-20 justify-center text-center border rounded-md text-white bg-blue-1 underline disabled:bg-light-gray"
                disabled={!agreed}
                onClick={() => props.onDispatchClicked()}
              >
                <div className="w-full justify-center gap-3 flex mt-5">
                  <label className={`mb-4 text-xl relative text-center ${agreed ? 'cursor-pointer': 'cursor-not-allowed'}`}>
                    YES, CONTINUE
                  </label>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
