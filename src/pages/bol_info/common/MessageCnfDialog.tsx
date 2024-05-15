import { MdCancel } from "react-icons/md";

interface PropTypes {
  headerLabel: string;
  yesLabel: string;
  yesHandler: Function;
}

export const MessageCnfDialog = (props: PropTypes) => {
  return (
    <div
      className="z-[1000] justify-center items-center flex modal fade fixed top-0 left-0 w-full h-full outline-none"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog w-[300px] relative">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-yellow-5 rounded-md">
          <div className="flex col-span-12 justify-start">
            <div className="w-[8px] rounded-md flex bg-yellow-3 "></div>
            <div className="col-span-10 pl-5 pt-10 pr-5">
              
              <div>
              <label className="text-lg">
                {props.headerLabel}
              </label>
              </div>
              
              <div className="flex justify-end">
                <div className="gap-20 flex mb-6">
                  <button
                    type="button"
                    className="btn btn-primary relative w-40 h-12 mt-5 justify-center text-center border rounded-md text-white bg-green-1"
                    onClick={() => props.yesHandler()}
                  >
                    <div className="w-full justify-center gap-3 flex mt-2">
                      <label className="mb-4 text-lg relative text-center cursor-pointer">
                        {props.yesLabel}
                      </label>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 modal-header flex md:mr-2 flex-shrink-0 justify-end">
                <MdCancel
                  onClick={() => props.yesHandler()}
                  className="text-yellow-4 text-3xl cursor-pointer mt-3 mr-1"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
