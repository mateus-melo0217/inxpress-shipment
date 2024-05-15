import { MdCancel } from "react-icons/md";

interface PropTypes {
  headerLabel: string;
  yesLabel: string;
  noLabel: string;
  yesHandler: Function;
  noHandler: Function;
  yesIcon: React.ReactNode;
}

export const ConfirmationDialog = (props: PropTypes) => {
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
              <>
              <label className="text-xl font-bold mb-4">
                I WANT TO....
              </label>
              </>
              <div className="flex justify-end">
                <div className="gap-20 flex mb-6">
                  <button
                    type="button"
                    className="btn btn-primary relative h-16 justify-center text-center underline rounded-md text-gray-1 bg-yellow-5"
                    onClick={() => props.noHandler()}
                  >
                    <div className="w-full justify-center gap-3 flex mt-1">
                      <label className="mb-4 text-lg cursor-pointer">
                        {props.noLabel}
                      </label>
                    </div>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary relative w-40 h-12 justify-center text-center border rounded-md text-white bg-green-1"
                    onClick={() => props.yesHandler()}
                  >
                    <div className="w-full justify-center gap-3 flex mt-2">
                      <>
                        <label className="mb-4 text-lg relative text-center cursor-pointer">
                          {props.yesLabel}
                        </label>
                        {props.yesIcon}
                      </>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-1 modal-header flex flex-shrink-0 justify-end">
                <MdCancel
                  onClick={() => props.noHandler()}
                  className="text-yellow-4 text-3xl cursor-pointer mt-3 mr-1"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
