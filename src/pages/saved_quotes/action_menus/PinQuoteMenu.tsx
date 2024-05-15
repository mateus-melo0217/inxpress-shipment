import {BsPinAngleFill} from "react-icons/bs";
import { usePinQuote } from "../SavedQuotesQueries";


interface PropTypes {
    setHIndex: Function;
    setLoading:Function;
    refetch:Function;
    row: any;
    options: { label: string, is_active: boolean };
}

export const PinQuoteMenu = ({setHIndex, row, options, setLoading, refetch}: PropTypes) => {

    const { mutate: pinSavedQuote } = usePinQuote(refetch, setLoading);

    const onClick = () => {
        setLoading(true);
        const data = {uuid:row.original.uuid};
        pinSavedQuote(data);
        setHIndex(-1);
    }

    return (
        <div
            className={`border-b border-dashed border-light-gray flex items-center text-blue-1 px-3 py-5 font-medium text-sbase transition-all duration-200 ${options.is_active ? 'hover:text-green-1 cursor-pointer' : 'opacity-20 cursor-default'}`}
            onClick={options.is_active ? onClick: ()=>{}}
        >
            <BsPinAngleFill size='1.3em' className="mr-3"/>
            {options.label}
        </div>
    );
};