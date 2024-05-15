import { RESTORE_COLUMN_SETTING } from "actions";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import {ColumnsShowMenuItem} from "./ColumnsShowMenuItem"
interface PropTypes {
    setIsOpen:Function;
}
export const ColumnShowSettingMenu = ({setIsOpen}: PropTypes) => {
    const dispatch = useDispatch();

    const columnsSetting = useSelector((state: RootState) => state.quotesInfoReducer.columnsSetting);
    const handleResetColumnSetting = useCallback(() => {
        dispatch({
            type: RESTORE_COLUMN_SETTING
        })
    }, [dispatch])

    return (
        <div className="fixed w-full h-screen z-[50] mt-24" onClick={(event) => {
            setIsOpen(false);
        }}>
            <div
                onClick={(event) => {event.stopPropagation()}}
                className="absolute w-[500px] h-[fit-content] right-0 top-0 bg-white
              border border-solid border-light-gray rounded-3xl px-12 z-[100]"
            >
                <div className="flex items-center justify-between relative py-6">
                    <div className="text-blue-1 font-medium	text-sxl uppercase">Select which columns to show</div>
                    <div className="flex items-center justify-center cursor-pointer" role="button" onClick={handleResetColumnSetting}>
                        <div className="text-green-1 font-medium text-sbase ml-2">Restore Defaults</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 mx-2 gap-x-8">
                    {columnsSetting.map((colSet: any)=> {
                        return (
                            <ColumnsShowMenuItem label={colSet.label} inuse={colSet.is_active} key={colSet.label} disableHide={colSet.disable_hide}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}