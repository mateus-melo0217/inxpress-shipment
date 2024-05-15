import React from "react";
import {Breadcrumb} from "components/common/breadcrumb/Breadcrumb";
import { QuotesController } from "./QuotesController";

export const Quotes = () => {
    return (
        <div>
            <Breadcrumb title="Quotes"/>
            <QuotesController />
        </div>
    )
}