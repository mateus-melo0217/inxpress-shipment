import React from 'react';
import Header from "components/common/header/Header";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, Flip} from "react-toastify";

type PropTypes = {
    customerCode: string;
}

export default function Layout ({customerCode}: PropTypes) {
    return (
        <>
            <Header customerCode={customerCode} />
            <ToastContainer theme={'light'} transition={Flip} />
        </>
    );
}