import React from "react";
import {Breadcrumb} from "components/common/breadcrumb/Breadcrumb";
import {QuoteRequestHistoryContent} from "./QuoteRequestHistoryContent";

export const QuoteRequestHistory = () => {
    return (
        <div>
            <Breadcrumb title="Quote Request History"/>
            <QuoteRequestHistoryContent/>
        </div>
    )
}