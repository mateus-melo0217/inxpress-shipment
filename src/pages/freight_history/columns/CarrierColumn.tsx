import Tippy from "@tippyjs/react";

interface PropTypes {
    cellContext: any,
}

export const CarrierColumn = ({cellContext}: PropTypes) => {
    const {tariffDescription} = cellContext.row.original
    
    return (
        <>
            <Tippy content={tariffDescription} theme="light">
                <span>
                    {cellContext.renderValue()}
                </span>
            </Tippy>
        </>
    );
};