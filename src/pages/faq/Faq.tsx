import React from "react";
import {Breadcrumb} from "components/common/breadcrumb/Breadcrumb";
import {IoIosConstruct} from "react-icons/io";

export const Faq = () => {
    return (
        <div>
            <Breadcrumb title="FAQs"/>
            <div className="grid place-items-center h-screen">
                <div>
                    <IoIosConstruct size="12em"/>
                    <h1>Page Is Under Construction</h1>
                </div>
            </div>
        </div>
    )
}