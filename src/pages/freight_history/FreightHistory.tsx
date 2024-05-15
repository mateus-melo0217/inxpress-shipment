import React from "react";
import { Breadcrumb } from "components/common/breadcrumb/Breadcrumb";
import { FreightHistoryController } from "./FreightHistoryController";

export const FreightHistory = () => {
    return (
        <div>
            <Breadcrumb title="Freight History" />
            <FreightHistoryController />
        </div>
    )
}