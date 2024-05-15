import React from "react";
import { MdCancel } from "react-icons/md";
import { AiFillWarning } from "react-icons/ai";
import {useFormContext} from "react-hook-form";

interface PropTypes {
    setIsWarning: Function;
    setIsAccept: Function;
    setIsCancel: Function;
    isConfirm: boolean;
    setIsReject: Function;
}

export const Warning = ({setIsWarning, setIsAccept, setIsCancel, isConfirm, setIsReject}:PropTypes) => {
    const formMethods = useFormContext();
    // get freight type and total weight from react-hook-form context
    const currentType = formMethods.getValues("parcel_type");
    const totalWeight = formMethods.getValues("totalWeight");
    const totalCubic = formMethods.getValues("totalCubic");
    const totalPCF = formMethods.getValues("totalPCF");
    const linearFt = formMethods.getValues("linearFt");
    const totalLinear = formMethods.getValues("totalLinear");

    const onAccept = () => {
        if(currentType.length===2){
            if(linearFt >= 12 || totalWeight >= 5000) formMethods.setValue("parcel_type", ['VOLUME'], {shouldDirty: true}) 
            else if (linearFt < 12 && totalWeight < 5000) formMethods.setValue("parcel_type", ['LTL'], {shouldDirty: true}) 
        }
        else{
            if(currentType[0]==='LTL' && (linearFt >= 12 || totalWeight >= 5000)) formMethods.setValue("parcel_type", ['VOLUME'], {shouldDirty: true})
            else if(currentType[0]==='VOLUME' && linearFt < 12 && totalWeight < 5000) formMethods.setValue("parcel_type", ['LTL'], {shouldDirty: true})
        }
        setIsWarning(false)
        setIsAccept(true)
    }

    const onCancel = () => {
        setIsWarning(false)
        setIsCancel(true)
        if(isConfirm) setIsReject(true);
    };

    const onAcceptNoEffect = () => {
        setIsWarning(false)
    };

    return (
        <div className="fixed overflow-visible w-full h-full z-50 bottom-0 left-0">
            <div className="bg-[#fefdec] text-3xl border-l-[16px] border-l-[#f1dc2e] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col px-16 pt-12">
                <div className="flex items-center justify-between w-full p-4 rounded-t-xl">
                    <div className="flex justify-center w-full">
                        <p className="font-bold text-[#404b63] mr-32">{!(totalCubic >= 350 && totalPCF <= 3) ? 'Weight Total :' : 'Total Cubic :'} <span className="text-[#9f9e92]">{!(totalCubic >= 350 && totalPCF <= 3) ? totalWeight : totalCubic.toFixed(2)} {!(totalCubic >= 350 && totalPCF <= 3) && 'lbs.'}</span></p>
                        <p className="font-bold text-[#404b63]">{!(totalCubic >= 350 && totalPCF <= 3) ? 'Linear Ft : ' : 'Total PCF : '}<span className="text-[#9f9e92]">{!(totalCubic >= 350 && totalPCF <= 3) ? totalLinear.toFixed(2) : totalPCF.toFixed(2)}</span> </p>
                    </div>
                </div>
                <MdCancel
                        onClick={!(totalCubic >= 350 && totalPCF <= 3) ? onCancel : onAcceptNoEffect}
                        size="1.2em"
                        className="absolute top-8 right-5 text-[#bfb025] bg-[#f9f2bb] text-3xl cursor-pointer rounded-full overflow-hidden"
                />
                <div className="flex-1 w-full flex flex-col items-center rounded-b-xl">
                    <div className="flex align-middle text-[#aba46d] mt-8">
                     <AiFillWarning size="1.25em" color="#afa95f" className="mr-4"/>
                     {!(totalCubic >= 350 && totalPCF <= 3) ? ((currentType.length === 1 && currentType[0] === 'LTL' && totalWeight >= 5000) && "Your shipment may qualify for Volume pricing.") || ((currentType.length === 1 && currentType[0] === 'LTL' && linearFt >= 12) && "Your shipment is over 12 Linear ft. and requires a Volume quote for pricing. If you continue to process an LTL quote, your shipment may incur additional fees.") || ((currentType.length === 2 && linearFt >= 12) && "Your shipment is over 12 Linear ft. and requires a Volume quote for pricing. If you continue to process an LTL quote, your shipment may incur additional fees.") || ((currentType.length === 2 && linearFt < 12 && totalWeight >= 5000) && "Both LTL and Volume services have been selected. Based on the characteristics of the shipment, we believe this to be a Volume quote for pricing.") || ((currentType.length === 1 && currentType[0] === 'VOLUME' && linearFt < 12 && totalWeight < 5000 ) && "Your shipment may qualify for LTL pricing.") || ((currentType.length === 2 && linearFt < 12 && totalWeight < 5000 ) && "Your shipment may qualify for LTL pricing.") : 'Shipment has a density below 3 and exceeds 350 cubic feet. Please check the carrier Rules Tariff to make sure this does not break the carriers cubic capacity rules or additional charges may apply'} 
                    </div>
                    <div className="mt-8 mb-8 flex items-center justify-center w-full space-x-32 text-2xl">
                        {!(totalCubic >= 350 && totalPCF <= 3) ? (
                        <React.Fragment>
                            <button
                                className="px-7 py-5 text-[#c8c7bc] flex items-center justify-center hover:bg-transparent hover:text-[#5ca834] hover:outline-2 hover:outline-[#5ca834] hover:outline rounded-md font-bold"
                                onClick={onCancel}
                            >
                                No, Thanks
                            </button>
                            <button
                                className="bg-[#5ca834] text-white hover:bg-transparent hover:text-[#5ca834] hover:outline-2 hover:outline-[#5ca834] hover:outline font-bold px-7 py-5 bg-white rounded-md flex items-center justify-center"
                                onClick={onAccept}
                            >
                                YES, Proceed
                            </button>
                        </React.Fragment>
                        ) :  (
                        <button
                            className="bg-[#5ca834] text-white hover:bg-transparent hover:text-[#5ca834] hover:outline-2 hover:outline-[#5ca834] hover:outline font-bold px-7 py-5 bg-white rounded-md flex items-center justify-center"
                            onClick={onAcceptNoEffect}
                        >
                            Accept
                        </button>)}
                    </div>
                </div>
            </div>
        </div>
    );
};
