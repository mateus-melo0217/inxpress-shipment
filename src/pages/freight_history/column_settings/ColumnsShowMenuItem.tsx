import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import { TOGGLE_VIEW_COLUMN_SETTING } from 'actions';

interface PropTypes {
    label?: string;
    inuse?: boolean;
    disableHide?: boolean;
}
export const ColumnsShowMenuItem = ({label, inuse, disableHide}: PropTypes) => {
    const dispatch = useDispatch();
    
    const handleColumnSettingClick = useCallback((label: string | undefined) => {
        dispatch({
            type: TOGGLE_VIEW_COLUMN_SETTING,
            payload: {
                label: label,
            }
        })
    }, [dispatch])
    
    return (
        <div className={`border-t border-solid border-light-gray flex items-center py-4 transition-all duration-200 ${disableHide ? '': 'cursor-pointer'}`} 
        onClick={ disableHide ? ()=>{} : ()=> {handleColumnSettingClick(label)}}
        >
            {inuse ? <FaRegEye size='1.5em' />: <FaRegEyeSlash size='1.5em' className='text-lighter-gray'/>}
            <div 
                className={`ml-8 text-smxl font-medium ${inuse ? disableHide ? ' text-green-1': ' text-blue-2 hover:text-green-1' : ' text-lighter-gray'}`}>
                {label}
            </div>
        </div>
    )
}