import React from "react";
import { Breadcrumb } from "components/common/breadcrumb/Breadcrumb";
import { SavedQuotesController } from "./SavedQuotesController";

export const SavedQuotes = () => {
    return (
        <div>
            <Breadcrumb title="Saved Quotes" />
            <SavedQuotesController />
        </div>
    )
}