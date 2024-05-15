import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { toast } from 'react-toastify';
import DefaultSetting from 'components/modal_components/default-setting/content';
import SettingModal from "components/common/modal/SettingModal";
import apiClient from "utils/apiClient";

interface PropsType {
    showDefaultSettingModal: boolean;
    setShowDefaultSettingModal: Dispatch<SetStateAction<boolean>>;
}

const DefaultSettingModal = ({showDefaultSettingModal, setShowDefaultSettingModal}:PropsType) => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
	const { getValues, setValue } = useFormContext();
    const [defaultInstruction, setDefaultInstruction] = React.useState<string>('');

    useEffect(() => {
        if (isSubmitting) {
            const accessorialLists = getValues('accessorial')?.map((item: any) => item.value);
            apiClient.post(`freight/default-settings`, {
                stackable: getValues('default_is_stackable'),
                specialInstructions: getValues('defaultSetting_specialInstruction'),
                accessorialCodeList: accessorialLists || []
            })
            .then((response: any) => {
                toast.success('Default settings saved successfully');
            }).catch((err: any) => {
                toast.error('Failed to save default settings');
            });
            setIsSubmitting(false);
        }
    },[isSubmitting, getValues]);

    useEffect(() => {
        apiClient.get(`freight/default-settings`)
        .then((response: any) => {
            const accessorialLists = response.data.accessorials.map((item: any) => ({value:item.accessorialCode.code, label: item.accessorialCode.name}));
            setValue('accessorial', accessorialLists);
            setValue('default_is_stackable', response.data.stackable);
            setDefaultInstruction(response.data.specialInstructions);
        }).catch((err: any) => {
            console.log("Network Error:", err)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[showDefaultSettingModal])

    return (
        <SettingModal showModal={showDefaultSettingModal} setShowModal={setShowDefaultSettingModal} setIsSubmitting={setIsSubmitting} title="Freight Default Settings" exWrappeCls="px-12" exContentCls="px-0">
            <DefaultSetting defaultInstruction={defaultInstruction}/>
        </SettingModal>
    );
}
export default DefaultSettingModal;