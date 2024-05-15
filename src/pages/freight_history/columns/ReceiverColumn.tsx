import Tooltip from 'components/common/tooltip/Tooltip';
import { FaBuilding } from 'react-icons/fa';
import { IoMdMap } from 'react-icons/io';
interface PropTypes {
    cellContext: any,
}

export const ReceiverColumn = ({cellContext}: PropTypes) => {
    const { receiverCompanyName, receiverCity, receiverStateCode, receiverPostalCode } = cellContext.row.original;
    return (
        <div
            className="text-ellipsis overflow-hidden whitespace-wrap text-center mx-auto cursor-pointer"
        >
            <Tooltip text={TooltipContent(receiverCompanyName, receiverCity, receiverStateCode, receiverPostalCode)} extClsName="top-[-60px] left-[50%] translate-x-[-50%] min-w-[fit-content]">
                {receiverCompanyName}
            </Tooltip>
        </div>
    );
};

const TooltipContent = (receiverCompanyName: string, receiverCity: string, receiverStateCode: string, receiverPostalCode: string) => {
    return (
        <div className="p-2">
            <div className="flex items-center">
                <FaBuilding/>
                <span className="ml-2 font-bold">
                    {receiverCompanyName}
                </span>
            </div>
            <div className="flex items-start mt-2">
                <IoMdMap className="mt-2"/>
                <div className="flex flex-col ml-2 font-bold">
                    <span>{receiverCity.toUpperCase()}</span>
                    <span>{receiverStateCode.toUpperCase()}</span>
                    <span>{receiverPostalCode}</span>
                </div>
            </div>
        </div>
    )
}