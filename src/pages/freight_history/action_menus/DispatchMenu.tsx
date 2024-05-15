import { OPEN_DISPATCH_MENU_DIALOG_MODAL } from "actions";
import {useCallback} from "react";
import {BsFillArrowRightSquareFill} from "react-icons/bs";
import { useDispatch } from "react-redux";

interface PropTypes {
    setHIndex: Function;
    row: any;
    options: { label: string, is_active: boolean };
}

export const DispatchMenu = ({ setHIndex, row, options }: PropTypes) => {
  const dispatch = useDispatch();
  const openDispatchMenuDialog = useCallback(()=> {
    dispatch({
      type: OPEN_DISPATCH_MENU_DIALOG_MODAL,
      payload: {
        showDispatchMenuDialog: true,
        row: row
      }
    })
  }, [dispatch, row])
  return (
    <>
      <div
        className={`border-b border-dashed border-light-gray flex items-center text-blue-1 p-3 font-medium text-sbase transition-all duration-200 border-r ${
          options.is_active
            ? "hover:text-green-1 cursor-pointer"
            : "opacity-20 cursor-default"
        }`}
        onClick={options.is_active ? openDispatchMenuDialog: ()=>{}}
      >
        <BsFillArrowRightSquareFill size="1.3em" className="mr-3" />
        {options.label}
      </div>
    </>
  );
};