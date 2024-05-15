import { FaThumbtack } from 'react-icons/fa';
import { useUnPinQuote } from "../SavedQuotesQueries";


interface PropTypes {
    setHIndex: Function;
    setLoading:Function;
    refetch:Function;
    row: any;
    options: { label: string, is_active: boolean };
}

export const UnpinQuoteMenu = ({setHIndex, row, options, setLoading, refetch}: PropTypes) => {

    const { mutate: unpinSavedQuote} = useUnPinQuote(refetch, setLoading);

    const onClick = () => {
        setLoading(true);
        const data = {quoteId:row.original.providerQuoteId, uuid:row.original.uuid};
        unpinSavedQuote(data);
        setHIndex(-1);
    }

    return (
        <div
            className={`border-b border-dashed border-light-gray flex items-center text-blue-1 px-3 py-5 font-medium text-sbase transition-all duration-200 ${options.is_active ? 'hover:text-green-1 cursor-pointer' : 'opacity-20 cursor-default'}`}
            onClick={options.is_active ? onClick: ()=>{}}
        >
            <FaThumbtack size='1.3em' className="mr-3"/>
            {options.label}
        </div>
    );
};