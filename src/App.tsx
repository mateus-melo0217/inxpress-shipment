import React, { useEffect, useState } from 'react';
import { BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider} from 'react-query'
import 'App.scss';
import Layout from "layouts/Layout";
import {AppRoutes} from "routes/AppRoutes";
import { ReactQueryDevtools } from "react-query/devtools";
import { userLoggedIn } from 'pages/bol_info/api/bol_api';
import { getToken, setToken } from 'pages/bol_info/utility/Utility';
import { TOKEN } from 'pages/bol_info/constants/BOLConstants';
import { useDispatch, useSelector } from "react-redux";
import {
    UPDATE_AUTHINFO,
    CLEAR_AUTHINFO,
    CLOSE_DEFAULT_SETTING_MODAL
  } from "actions";
import { RootState } from "store/globalstore";
import ApiClient from 'utils/apiClient';
import { useForm, FormProvider } from "react-hook-form";
import DefaultSettingModal from "components/modal_components/default-setting";

const defaultValues = {
    accessorial: [],
    default_is_stackable: false,
    defaultSetting_specialInstruction: ""
};

type DefaultSettingFormTypes = {
    accessorial: { value: string, label: string }[],
    default_is_stackable: boolean,
    defaultSetting_specialInstruction: string
}

// create react query client
const queryClient = new QueryClient()

const App = () => {
    const dispatch = useDispatch();
    const {isViewDefaultSettingModal} = useSelector(
        (state: RootState) => state.headerReducer.actionModal
      );
    const [showDefaultSettingModal, setShowDefaultSettingModal] = useState(false);
    const formMethods = useForm<DefaultSettingFormTypes>({
        defaultValues: defaultValues,
      });
    const tokenState = getToken(TOKEN);
    const appEnv = process.env.REACT_APP_ENV;
    const [customerCode, setCustomerCode] = useState<string>('');
    // set environment name to the app title when
    // the app environment is not 'production'.
    useEffect(() => {
        if(appEnv !== 'production'){
            document.title = '[' + appEnv + '] InXpress Freightship';
        }
    }, [appEnv]);

    useEffect(() => {
        if (!tokenState) {
            const newTokenFromIMCS = new URLSearchParams(window.location.search).get('token');            
            if (newTokenFromIMCS) {
                setToken(TOKEN, encodeURIComponent(newTokenFromIMCS));
                window.location.replace(`${window.location.origin}${window.location.pathname}`);
            } else {
                userLoggedIn();
            }
        }
    });

    useEffect(() => {
        if (tokenState) {
            ApiClient.get('login').then((res) => {
                setCustomerCode(res?.data?.customerCode);
                dispatch({
                    type: UPDATE_AUTHINFO,
                    payload: res.data
                  });
            }).catch((err) => { 
                console.log(err);
                dispatch({
                    type: CLEAR_AUTHINFO,
                  });
            })
        }
    }, [tokenState, dispatch])

    useEffect(() => {
        if(isViewDefaultSettingModal){
            setShowDefaultSettingModal(true);
        }
    }, [isViewDefaultSettingModal])

    useEffect(() => {
        if(!showDefaultSettingModal){
            dispatch({ 
                type: CLOSE_DEFAULT_SETTING_MODAL,
                payload: false
            });
        }
    }, [showDefaultSettingModal, dispatch])

    return (
        tokenState ?
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Layout customerCode={customerCode} />
                <AppRoutes />
                <ReactQueryDevtools position={"bottom-right"} initialIsOpen={false} />
                <FormProvider {...formMethods}>
                    <DefaultSettingModal showDefaultSettingModal={showDefaultSettingModal} setShowDefaultSettingModal={setShowDefaultSettingModal}/>
                </FormProvider>
            </QueryClientProvider>
        </BrowserRouter>
         : <></>
    );
}
export default App;