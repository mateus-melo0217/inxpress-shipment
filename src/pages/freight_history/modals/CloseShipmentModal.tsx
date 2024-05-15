import React, {useCallback} from "react";
import { MdCancel } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import {MdEmail} from "react-icons/md";
import {RiPhoneFill} from "react-icons/ri";
import {FaTruckMoving} from "react-icons/fa";
import {useCancelShipment, useVoidShipment} from "../FreightHistoryQueries";
import { useDispatch } from "react-redux";
import { CLOSE_VOID_SHIPMENT_MODAL, CLOSE_CANCEL_SHIPMENT_MODAL } from "actions";

interface PropTypes {
    row: any;
    setHIndex: Function;
    refetch: Function;
    setIsLoading: Function
}

export const CloseShipmentModal = ({ row, setHIndex, refetch, setIsLoading}: PropTypes) => {
    const isPickupStatus = row.original.displayStatus === "Pending Pickup" ? true : false;
    const isDispatchStatus = row.original.displayStatus === "Pending Dispatch" ? true : false;
    const dispatch = useDispatch();
    const closeVoidShipmentModal = useCallback(()=> {
        if(isPickupStatus) {
            dispatch({
                type: CLOSE_CANCEL_SHIPMENT_MODAL,
                payload: {
                    isCancelShipmentOpen: false,
                }
            })
        }
        else {
            dispatch({
                type: CLOSE_VOID_SHIPMENT_MODAL,
                payload: {
                    isCancelShipmentOpen: false,
                }
            }) 
        }
    }, [dispatch, isPickupStatus])
    
    const {mutate: cancelShipment} = useCancelShipment();
    const {mutate: voidShipment} = useVoidShipment();
    const onClose = () => {
        if(isPickupStatus) {
            setIsLoading(true);
            cancelShipment(row.original.shipmentId);
            refetch().then(()=>setTimeout(()=>setIsLoading(false),15000));
        }
        else {
            setIsLoading(true);
            voidShipment(row.original.shipmentId); 
            refetch().then(()=>setTimeout(()=>setIsLoading(false),15000));
         
        }
        closeVoidShipmentModal();
        setHIndex(-1);
    }
    
    return (
        <div
            className="fixed overflow-visible w-full h-full z-50 bg-gray-modal bottom-0 left-0">
            <div
                className="w-[360px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col">
                <div className="bg-red-2 flex items-center justify-between w-full p-4 rounded-t-xl">
                    <div className="uppercase text-white">{(isPickupStatus&&"cancel") || (isDispatchStatus&&"void")} shipment order</div>
                    <MdCancel
                        onClick={closeVoidShipmentModal}
                        size="1.2em"
                        className="text-white bg-red-2 text-5xl cursor-pointer"
                    />
                </div>
                <div className="bg-red-3 flex-1 w-full flex flex-col items-center rounded-b-xl">
                    <div className="mt-10 w-28 h-28 border-red-2 border-2 border-solid rounded-full flex items-center justify-center relative">
                        <FiTruck size="2em" color="#df2c36"/>
                        <MdCancel
                            size="1.1em"
                            className="text-red-4 bg-white text-5xl cursor-pointer absolute bottom-0 -right-6 rounded-full"
                        />
                    </div>
                    <div className="uppercase text-slg font-medium mt-8">are you sure you want to {(isPickupStatus&&"cancel") || (isDispatchStatus&&"void")} it?</div>
                    <div className="uppercase text-green-1 text-sxl mt-4">BOL# {row.original.issuedBoLNumber} <span className="text-blue-1">?</span> </div>
                    <p className="text-sxsl w-[80%] text-center mt-6 text-gray-2">{(isPickupStatus&&"Canceling a shipment does not inform the carrier to cancel the pickup if you have dispatched the shipment.") || (isDispatchStatus&&"By voiding this shipment you will no longer be able to dispatch. Requote to dispatch.")}</p>
                    <div className="flex items-start justify-between w-full mt-16 px-10">
                        <div className="flex flex-col items-center">
                            <FaTruckMoving size="1.8em"/>
                            <div className="uppercase text-ssmall">carrier</div>
                            <div className="text-light-gray text-ssmall">{row.original.carrierName}</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <RiPhoneFill size="1.8em"/>
                            <div className="uppercase text-ssmall">phone</div>
                            <div className="text-light-gray text-ssmall">{row.original.carrierPhone}</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <MdEmail size="1.8em"/>
                            <div className="uppercase text-ssmall">email</div>
                            <div className="text-light-gray uppercase text-ssmall">{row.original.carrierEmail}</div>
                        </div>
                    </div>
                    <div className="mt-28 mb-12 flex items-center justify-end w-full space-x-16 pr-16">
                        <button
                            className='border-blue-1 border-solid border text-blue-1 px-7 py-5 bg-white rounded-md text-sxsl  uppercase flex items-center justify-center'
                            onClick={closeVoidShipmentModal}
                        >
                            cancel
                        </button>
                        <button
                            className='bg-blue-1 px-7 py-5 text-[rgba(255,255,255,.8)] rounded-md text-sxsl  uppercase flex items-center justify-center'
                            onClick={onClose}
                        >

                            yes,continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};