import {BsFillGearFill} from "react-icons/bs";
import {processQuotes} from "../QuotesQueries";
import {toast} from 'react-toastify';

interface PropTypes {
  quote_id: Number;
}

export const ProcessMenu = ({quote_id}: PropTypes) => {

  const onClick = () => {
    processQuotes(quote_id)
      .then(() => toast.success('File validation and processing is in progress.'))
      .catch(() => toast.success('Error occurred processing quote.'));

  }

    return (
        <div className="w-1/3 flex justify-center">
            <BsFillGearFill size={25} className="cursor-pointer hover:text-green-1" title="Process" onClick={() => {onClick()}}/>
        </div>
    );
};