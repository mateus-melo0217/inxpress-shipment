import React, { useState, useEffect, useCallback } from "react";
import { MdCancel } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { getTrackingDetails } from "../api/bol_api";
import { getDateFromDateTime, getTimeFromDateTime } from "../utility/Utility";
import { useDispatch } from "react-redux";
import { CLOSE_TRACKING_SHIPMENT_MODAL } from "actions";

export const TrackingDialog = (props: any) => {
  const [trackingDetails, setTrackingDetails] = useState([
    {
      code: "",
      description: "",
      date: "",
      location: "",
      exception: null,
    },
  ]);
  const [shipmentStatus, setShipmentStatus] = useState('');
  const dispatch = useDispatch();
  const closeTrackingShipmentModal = useCallback(()=> {
    dispatch({
      type: CLOSE_TRACKING_SHIPMENT_MODAL,
      payload: {
        showTrackingDialog: false
      }
    })
  }, [dispatch])
  useEffect(() => {
    getTrackingDetails(props.row.original.shipmentId).then((res) => {
      setShipmentStatus(res.data.shipment.statusEnumName);
      setTrackingDetails(res.data.trackingEvents);      
    });
  }, [props.row.original.shipmentId]);

  return (
    <div
      className="z-[1000] justify-center items-center flex modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog w-[500px] relative">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header bg-green-1 flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-white"
              id="exampleModalLabel"
            >
              TRACKING SHIPMENT
            </h5>
            <MdCancel
              onClick={closeTrackingShipmentModal}
              className="text-white bg-green-1 text-5xl cursor-pointer"
            />
          </div>
          <div className="flex col-span-6 mt-5 justify-between pl-3">
            <div className="col-span-4">
              <div className="w-full flex">
                <FaClipboardList className="w-6 h-6 text-blue-1" />
                <label className="text-lg pl-2  text-blue-1 font-bold">
                  PRO Number:
                </label>
                <label className="text-lg pl-2 text-green-1">{props.row.original.proNumber}</label>
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-lg pl-2  text-blue-1 font-bold">
                Status:
              </label>
              <label className="pl-2 text-blue-1 mr-5 text-xl font-bold">
                {shipmentStatus}
              </label>
            </div>
          </div>
          <div className="modal-body overflow-y-auto h-[200px] w-full relative p-4 border-gray-400">
            <div>
              <table className="w-full mt-10 text-center">
                <thead className="bg-lightest-gray text-blue-1">
                  <tr>
                    <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                      STATUS
                    </th>
                    <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                      LOCATION
                    </th>
                    <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                      DATE
                    </th>
                    <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                      TIME
                    </th>
                    <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                      MESSAGE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trackingDetails.map((item, index) => (
                    <tr key={index} className="bg-white">
                      <td className="text-light-gray">{item.code}</td>
                      <td className="text-light-gray">{item.location}</td>
                      <td className="text-light-gray">{getTimeFromDateTime(item.date)}</td>
                      <td className="text-light-gray">{getDateFromDateTime(item.date)}</td>
                      <td className="text-light-gray">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="justify-center flex">
            <button
              type="button"
              className="btn btn-primary relative w-48 h-16 mb-10 justify-center text-center border rounded-md text-white bg-blue-1"
              onClick={closeTrackingShipmentModal}
            >
              <div className="w-full justify-center gap-3 flex mt-5">
                <label className="mb-4 text-lg relative text-center cursor-pointer">
                  CLOSE
                </label>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
