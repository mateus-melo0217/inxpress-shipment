import {TbBox} from 'react-icons/tb'
import {FaEye} from 'react-icons/fa'
import Tooltip from 'components/common/tooltip/Tooltip'
import {isNil} from "lodash";
interface PropTypes {
    cellContext: any,
}

export const DimsColumn = ({cellContext}: PropTypes) => {
    const items = cellContext.row.original.freightItems;

    if (isNil(items)){
        return null;
    }

    if (!items.length) {
        return <></>
    }

    return (
        <div
            className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[120px] flex items-center relative z-[-1]"
        >
            {items.length > 1 ?  <>
                    <div className='flex items-center justify-between'>
                    <span className="mr-2">
                        <TbBox/>
                    </span>
                        <span className='mr-2'>
                        Multiple Items
                    </span>
                        <Tooltip text=
                                     {items.map((item: any, idx: number)=> {
                                         return (
                                             <div key={`dims_column__${idx}`}>
                                                 - L:{item.dimensions.length}{" "}
                                                 W:{item.dimensions.width}{" "}
                                                 H:{item.dimensions.height}
                                             </div>
                                         )
                                     })}
                        >
                            <FaEye />
                        </Tooltip>
                    </div>
                </>:
                <>
                <span className="mr-2">
                    <TbBox/>
                </span>
                    L:{items[0].dimensions.length}{" "}
                    W:{items[0].dimensions.width}{" "}
                    H:{items[0].dimensions.height}
                </> }
        </div>
    );
};