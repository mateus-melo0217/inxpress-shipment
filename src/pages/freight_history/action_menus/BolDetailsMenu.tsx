import {useCallback, useEffect} from 'react';
import React from "react";
import {MdOutlineCollectionsBookmark} from "react-icons/md";
import {useDispatch} from 'react-redux';
import {CLEAR_BOL_DATA, OPEN_BOL_DETAIL_MODAL} from 'actions';

interface PropTypes {
    setHIndex: Function;
    row: any;
    options: { label: string, is_active: boolean };
}

export const BolDetailsMenu = ({setHIndex, row, options}: PropTypes) => {
    const dispatch = useDispatch();
    const isEditable = options.label === 'BOL details' && (row.original.displayStatus.toLowerCase() === 'pending dispatch' || row.original.displayStatus.toLowerCase() === 'pending pickup');
    const openBolDetailModal = useCallback((isEditable: boolean)=> {
        dispatch({
            type: OPEN_BOL_DETAIL_MODAL,
            payload: {
                showInfoBol: true,
                isEditable: isEditable,
                row: row
            }
        })
    }, [dispatch, row])
    useEffect(() => {
        dispatch({
            type: CLEAR_BOL_DATA
        });
    });

    return (
        <>
            <div
                className={`border-b border-dashed border-light-gray flex items-center text-blue-1 p-3 font-medium text-sbase transition-all duration-200 border-r ${options.is_active ? 'hover:text-green-1 cursor-pointer' : 'opacity-20 cursor-default'}`}
                onClick={options.is_active ? ()=>openBolDetailModal(isEditable): ()=>{}}
            >
                <MdOutlineCollectionsBookmark size='1.3em' className="mr-3"/>
                {options.label}
            </div>
        </>
    );
};