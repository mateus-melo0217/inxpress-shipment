import {FaTrash} from "react-icons/fa";
import {deleteQuote, processQuotes} from "../QuotesQueries";
import {toast} from "react-toastify";
import {BsFillGearFill} from "react-icons/bs";

interface PropTypes {
  row: any;
}


export const ActionColumn = ({row}: PropTypes) => {
  const quote_id = Number(row.original.id);
  const inProgress = row.original.inProgress;
  const startTime = row.original.startTime;

  const onProcessClick = () => {
    processQuotes(quote_id)
      .then(() => toast.success('File validation and processing is in progress.'))
      .catch(() => toast.success('Error occurred processing quote.'));
  }

  const onDeleteClick = () => {
    // TODO: reload after deleted
    deleteQuote(quote_id)
      .then(() => toast.success('Quote file is deleted'))
      .catch(() => toast.success('Error occurred deleting quote.'));
  }

  return (
    <div className="flex justify-center">
      <button onClick={onProcessClick} disabled={inProgress || startTime !== null}
              className="w-full justify-center gap-3 flex mt-5">
        <BsFillGearFill size={25} title="Process" className="cursor-pointer hover:text-green-1"/>
      </button>
      {/* TODO: Open `Are You Sure` Modal*/}
      <button onClick={onDeleteClick} disabled={inProgress} className="w-full justify-center gap-3 flex mt-5">
        <FaTrash size={25} className="cursor-pointer hover:text-green-1" title="Delete"/>
      </button>
    </div>
  );
};