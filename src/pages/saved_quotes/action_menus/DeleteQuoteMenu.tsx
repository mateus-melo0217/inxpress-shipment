import { OPEN_DELETE_QUOTE_MODAL } from "actions";
import {useCallback} from "react";
import {MdCancel} from "react-icons/md";
import { useDispatch } from "react-redux";

interface PropTypes {
    row: any;
    options: { label: string, is_active: boolean };
}

export const DeleteQuoteMenu = ({row, options}: PropTypes) => {

    const dispatch = useDispatch();
    const openDeleteQuoteModal = useCallback(()=> {
        dispatch({
            type: OPEN_DELETE_QUOTE_MODAL,
            payload: {
                isDeleteQuoteOpen: true,
                row: row
            }
        })
    }, [dispatch, row])

    return (
        <>
            <div
                onClick={options.is_active ? openDeleteQuoteModal:()=>{}}
                className={`border-b border-dashed border-light-gray flex items-center text-red-1 px-3 py-5 font-medium text-sbase transition-all duration-200 ${options.is_active ? 'hover:text-green-1 cursor-pointer': 'opacity-20 cursor-default'}`}
            >
                <MdCancel size='1.3em' className="mr-3"/>
                {options.label}
            </div>
        </>
    );
};