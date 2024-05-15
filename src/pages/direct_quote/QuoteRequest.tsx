import React from "react";
import {Breadcrumb} from "components/common/breadcrumb/Breadcrumb";
import {QuoteRequestContent} from "./QuoteRequestContent";

export const QuoteRequest = () => {
    return (
        <div>
            <Breadcrumb title="Quote Request"/>
            <QuoteRequestContent/>
        </div>
    )
}