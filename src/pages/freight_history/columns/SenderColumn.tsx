import Tooltip from 'components/common/tooltip/Tooltip';
import { FaBuilding } from 'react-icons/fa';
import { IoMdMap } from 'react-icons/io';

interface PropTypes {
    cellContext: any,
}

export const SenderColumn = ({cellContext}: PropTypes) => {
    const { senderCompanyName, senderCity, senderStateCode, senderPostalCode } = cellContext.row.original;

    return (
        <div
            className="text-ellipsis overflow-hidden whitespace-wrap text-center mx-auto cursor-pointer"
        >
            <Tooltip text={TooltipContent(senderCompanyName, senderCity, senderStateCode, senderPostalCode)} extClsName="top-[-75px] left-[50%] translate-x-[-50%] min-w-[fit-content]">
                {senderCompanyName}
            </Tooltip>
        </div>
    );
};

const TooltipContent = (senderCompanyName: string, senderCity: string, senderStateCode: string, senderPostalCode: string) => {
    return (
        <div className="p-2">
            <div className="flex items-center">
                <FaBuilding/>
                <span className="ml-2 font-bold">
                    {senderCompanyName}
                </span>
            </div>
            <div className="flex items-start mt-2">
                <IoMdMap className="mt-2"/>
                <div className="flex flex-col ml-2 font-bold">
                    <span>{senderCity.toUpperCase()}</span>
                    <span>{senderStateCode.toUpperCase()}</span>
                    <span>{senderPostalCode}</span>
                </div>
            </div>
        </div>
    )
}