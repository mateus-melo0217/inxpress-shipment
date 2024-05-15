import React from 'react';
import {LottieCanvas} from "./LottieCanvas";
import LottieSearch from "../../assets/animations/search.json";

interface PropTypes {
    isLoading: boolean
}

/**
 * Display search animation to indicate loading
 */
export const LoadingIndicator = ({isLoading}: PropTypes) => {

    if (!isLoading) {
        return null;
    }

    return (
        <div className={'flex just justify-center'}>
            <LottieCanvas width={600} height={150} animationData={LottieSearch}/>
        </div>
    );
};