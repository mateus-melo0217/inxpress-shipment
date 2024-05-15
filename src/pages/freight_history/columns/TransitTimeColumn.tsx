import {FaTruck} from 'react-icons/fa'
interface PropTypes {
    cellContext: any,
}

export const TransitTimeColumn = ({cellContext}: PropTypes) => {    
    const transitTime = cellContext.renderValue()
    return (
        <div className="flex justify-center text-center items-center">
            <FaTruck /> <span className="ml-2">{transitTime}</span> day{transitTime === '1' ? null : 's'}
        </div>
    );
};