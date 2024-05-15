import { useCallback } from "react";
import { MdCancel } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import { useDeleteQuote } from "../SavedQuotesQueries";
import { useDispatch } from "react-redux";
import { CLOSE_DELETE_QUOTE_MODAL } from "actions";

interface PropTypes {
    row: any;
    setHIndex: Function;
}

export const DeleteQuoteModal = ({ row, setHIndex }: PropTypes) => {
    const id = row.original.id;
    const quoteId = row.original.uuid
    const dispatch = useDispatch();
    const closeDeleteQuoteModal = useCallback(() => {
        dispatch({
            type: CLOSE_DELETE_QUOTE_MODAL,
            payload: {
                isDeleteQuoteOpen: false,
            },
        });
    }, [dispatch]);

    const { mutate: deleteSavedQuote } = useDeleteQuote();

    const onCancel = () => {
        deleteSavedQuote(id);
        closeDeleteQuoteModal();
        setHIndex(-1);
    };

    return (
        <div className="fixed overflow-visible w-full h-full z-50 bg-gray-modal bottom-0 left-0">
            <div className="w-[360px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col">
                <div className="bg-red-2 flex items-center justify-between w-full p-4 rounded-t-xl">
                    <div className="uppercase text-white">Delete Quote</div>
                    <MdCancel
                        onClick={closeDeleteQuoteModal}
                        size="1.2em"
                        className="text-white bg-red-2 text-5xl cursor-pointer"
                    />
                </div>
                <div className="bg-red-3 flex-1 w-full flex flex-col items-center rounded-b-xl">
                    <div className="mt-10 w-28 h-28 border-red-2 border-2 border-solid rounded-full flex items-center justify-center relative">
                        <FiTruck size="2em" color="#df2c36" />
                        <MdCancel
                            size="1.1em"
                            className="text-red-4 bg-white text-5xl cursor-pointer absolute bottom-0 -right-6 rounded-full"
                        />
                    </div>
                    <div className="uppercase text-slg font-medium mt-8">
                        are you sure you want to delete quote
                    </div>
                    <div className="uppercase text-green-1 text-sxl mt-4">
                        #{quoteId} <span className="text-blue-1"></span>{" "}
                    </div>

                    <div className="mt-28 mb-12 flex items-center justify-around w-full space-x-16">
                        <button
                            className="bg-blue-1 px-7 py-5 text-[rgba(255,255,255,.8)] rounded-md text-sxsl  uppercase flex items-center justify-center"
                            onClick={onCancel}
                        >
                            yes, continue
                        </button>
                        <button
                            className="border-blue-1 border-solid border text-blue-1 px-7 py-5 bg-white rounded-md text-sxsl  uppercase flex items-center justify-center"
                            onClick={closeDeleteQuoteModal}
                        >
                            cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
