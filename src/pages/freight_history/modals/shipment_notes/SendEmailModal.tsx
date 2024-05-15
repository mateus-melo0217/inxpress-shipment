import React, {useCallback, useEffect} from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { IShipmentNoteData } from "./ShipmentNoteTypes";
import {useSendEmailDocuments} from "./ShipmentNoteQueries";
import InputText from "components/forms/InputText";
import { useDispatch } from "react-redux";
import { CLOSE_SHIPMENT_NOTES_ADD_NOTES_MODAL } from "actions";
import ClipLoader from 'react-spinners/ClipLoader';
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import { ImageCheckBox } from "components/bol_components/ImageCheckBox";
import { validateEmail } from "utils/validateHelpers";

interface PropTypes {
    attachments: any,
    ids: any,
    shipmentId: number
}

interface CheckboxTypes {
    id: any, 
    state: boolean,
}

export const SendEmailModal = ({ attachments, ids, shipmentId }: PropTypes) => {
    const dispatch = useDispatch();
    const [sendBtnStatus, setSendBtnStatus] = React.useState(false);
    const [checkboxStatus, setCheckboxStatus] = React.useState(false);

    const defaultValue: CheckboxTypes[] = ids.map((id:any)=>({id, state:false}));
    const [checkboxStateArr, setCheckboxStateArr] = React.useState<CheckboxTypes[]>([]);
    
    const sendDocuments = useCallback(()=> {
        dispatch({
            type: CLOSE_SHIPMENT_NOTES_ADD_NOTES_MODAL,
            payload: {
                sendDocumenetsModal: false,
            }
        })
        toast.success('Email sent successfully');
    }, [dispatch])

    const {mutate: sendEmailDocuments, isLoading} = useSendEmailDocuments(() => {
        sendDocuments();
    });

    const formMethods = useForm<IShipmentNoteData>({});
    const emailStatus = formMethods.watch('title');

    const onSubmit: SubmitHandler<IShipmentNoteData> = (data: any) => {
        if (!sendBtnStatus) {
            return;
        }

        const emailAddress: string[] = data.title.split(',');
        emailAddress.forEach((element: string, index: number) => {
            emailAddress[index] = element.trim();
        });

        const isValidEmail = emailAddress.every((email) => validateEmail(email));

        if (!isValidEmail) {
            toast.error('Invalid Email Address. Please check again!');
            return;
        } else {
            const documentIds = ids.filter((id: number, index: number) => data.checkbox[index] === 'on');
            const model = {
                emailAddress,
                documentIds,
            };
            sendEmailDocuments({ shipmentId, formData: model });
        }
    };

    const onCancel = () => {
        dispatch({
            type: CLOSE_SHIPMENT_NOTES_ADD_NOTES_MODAL,
            payload: {
                sendDocumenetsModal: false,
            }
        })
    };

    const onChangeStatus = (id: any, state: boolean) => {
        setCheckboxStateArr((prev: CheckboxTypes[]) => {
          const updatedCheckboxStateArr = prev.map((item) => {
            if (item.id === id) {
              return { ...item, state };
            }
            return item;
          });
          return updatedCheckboxStateArr;
        });
      };

    // Set the default value when ids has been fetched.
    useEffect(()=>{
        setCheckboxStateArr(defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue.length])

    // Enable/Disable send button according to email and checkbox status.
    useEffect(()=>{
        if(emailStatus && checkboxStatus) {
            setSendBtnStatus(true);
            return;
        }
        setSendBtnStatus(false);
    },[emailStatus, checkboxStatus])
  
    // Check the multi-checkbox status.
    useEffect(() => {
        const hasTrueValue = checkboxStateArr.some((item) => item.state === true);
        setCheckboxStatus(hasTrueValue);
    }, [checkboxStateArr]);

    return (
        <div className="fixed overflow-visible w-full h-full z-50 bg-gray-modal bottom-0 left-0">
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <div className="w-2/5 absolute overflow-y-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col items-center">
                        <div className="bg-green-1 flex items-center justify-between w-full p-4 rounded-t-xl">
                            <div className="uppercase text-white">Send Documents</div>
                            <MdCancel
                                onClick={()=>onCancel()}
                                size="1.2em"
                                className="text-white bg-green-1 text-5xl cursor-pointer"
                            />
                        </div>
                        <div className="bg-white flex-1 w-full flex flex-col items-center rounded-b-xl">
                            <div
                                className="px-14 w-full flex flex-col items-center"
                            >
                                <div className="w-full pb-3 px-6">
                                    <div className="flex items-center my-2">
                                        <MdEmail className="mr-[5px]" size={'1.8em'}/>
                                        <div className="text-blue-1 text-sxl font-medium">
                                            Email
                                        </div>
                                        <div className="flex-1 ml-[5px]">
                                            <InputText
                                                id={`title`}
                                                placeholder="Put Emails here!"
                                                validation={{required:'Required Field'}}
                                                className="py-[10px] pl-[10px]"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-lighter-gray text-sbase mt-[8px] border-b-[1px] border-lighter-gray italic">Seperate multiple email address with commas</p>
                                    <div className="mt-[5px]">
                                        <div className="text-black text-smxl font-bold">
                                            Choose documents available
                                        </div>
                                        <div className="flex flex-wrap">
                                        {ids.map((id:any, index:number)=>{
                                            return <ImageCheckBox key={index} id={id} label={attachments[index]} disabled={false} onCheckBoxChanged={onChangeStatus}/>
                                        })}
                                        </div>
                                    </div>

                                </div>
                                <div className="flex justify-center mt-14 mb-12">
                                    <button className="mr-[20px] py-6 px-[20px] cursor-pointer uppercase text-blue-1 border-[1.5px] border-blue-1 rounded-lg flex items-center justify-center hover:bg-blue-1 hover:text-[rgba(255,255,255,.8)] transition-all duration-[500ms] ease-out" type="button" onClick={()=>onCancel()}>Close</button>
                                    <button
                                        type="submit"
                                        className={`bg-blue-1 text-[rgba(255,255,255,.8)] uppercase px-[20px] py-6 rounded-lg flex items-center justify-center border-[1.5px] border-blue-1 ${sendBtnStatus ? 'cursor-pointer hover:bg-transparent hover:text-blue-1 transition-all duration-[500ms] ease-out' : 'cursor-not-allowed opacity-50'}`}>
                                            {isLoading ? <ClipLoader
                                                loading={isLoading}
                                                size={20}
                                                aria-label='Loading Spinner'
                                                data-testid='loader'
                                                color="white"
                                            />: 'send documents'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};