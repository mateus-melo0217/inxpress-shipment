import { BsFillTelephoneFill } from "react-icons/bs";
import { MdCancel, MdEmail } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";

interface PropTypes {
  errorImg: React.ReactNode;
  closeHandler: Function;
  errorCode: any;
  errorMsg: string;
  contactName: string;
  deptName: string;
  phone: number;
  email: string;
}

export const ErrorDialog = (props: PropTypes) => {
  return (
    <div
      className="z-[1000] justify-center items-center flex modal fade fixed top-0 left-0 w-full h-full outline-none"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className={`modal-dialog w-[250px] h-fit relative ${props.errorCode === 500 ? "bg-[#fff0ef]" : "bg-yellow-500"} rounded-xl`}>
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto rounded-md">
        <div className="col-span-12 modal-header flex md:mr-2 flex-shrink-0 justify-end">
              <MdCancel
                onClick={() => props.closeHandler()}
                className="text-black text-3xl cursor-pointer mt-3 mr-3"
              />
            </div>
          <div className="w-[250px] col-span-12 pl-5 pt-2 pr-5">
              <div className="col-span-12 flex justify-center">
                {props.errorCode === 500 ? <MdCancel className="text-red-800 text-9xl justify-center"/>
                  :<IoWarningOutline className="text-black text-9xl justify-center"/>
                }
              </div>
              <div className="col-span-12 mt-3 flex justify-center">
                <label className={`text-4xl ${props.errorCode === 500 ? "text-[#d23f37]" : "text-black"}`}>
                 ({props.errorCode === 500 ? "Error" : "Warning"}: {props.errorCode})
                </label>
              </div>
              <div className="flex justify-center px-4 mt-4">
                <label className="text-xl text-center text-black">
                  "{props.errorMsg}"
                </label>
              </div>
              <div className="flex justify-center text-lg gap-16 mb-4 mt-5">
                <div className="col-span-3">
                  <div className="w-full flex justify-center">
                    <BsFillTelephoneFill className="w-8 h-8" />
                  </div>
                  <div className="w-full flex justify-center">
                    <label>PHONE</label>

                  </div>
                  <div className="w-full flex justify-center">
                    <label className="">{props.phone}</label></div>
                </div>
                <div className="col-span-3">
                  <div className="w-full flex justify-center">
                    <MdEmail className="w-8 h-8" />
                  </div>
                  <div className="w-full flex justify-center">
                    <label>EMAIL</label>

                  </div>
                  <div className="w-full flex justify-center">
                    <label className="">{props.email}</label></div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
