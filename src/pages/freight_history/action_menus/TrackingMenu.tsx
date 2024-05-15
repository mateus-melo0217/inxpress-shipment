import { OPEN_TRACKING_SHIPMENT_MODAL } from "actions";
import { useCallback } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import { useDispatch } from "react-redux";

interface PropTypes {
  setHIndex: Function;
  row: any;
  options: { label: string, is_active: boolean };
}

export const TrackingMenu = ({ setHIndex, row, options }: PropTypes) => {
  const dispatch = useDispatch();
  const openTrackingShipmentModal = useCallback(()=> {
    dispatch({
      type: OPEN_TRACKING_SHIPMENT_MODAL,
      payload: {
        showTrackingDialog: true,
        row: row
      }
    })
  }, [dispatch, row])
  return (
    <>
    <div
      onClick={options.is_active ? openTrackingShipmentModal : ()=>{}}
      className={`border-b border-dashed border-light-gray flex items-center text-blue-1 p-3 font-medium text-sbase transition-all duration-200 border-r ${
        options.is_active
          ? "hover:text-green-1 cursor-pointer"
          : "opacity-20 cursor-default"
      }`}
    >
      <MdOutlineMyLocation size="1.3em" className="mr-3" />
      {options.label}
    </div>
      
    </>
  );
};
