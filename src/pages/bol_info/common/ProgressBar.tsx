import { IoIosInformationCircleOutline, IoIosPerson } from "react-icons/io";
import {
  FaBook,
  FaCalendarPlus,
  FaCheckDouble,
  FaTruckMoving,
} from "react-icons/fa";
import { BsShieldShaded } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "store/globalstore";



const ProgressBar = (props: any) => {

  const isValidSections = useSelector((state: RootState) =>
    state.bolInfoReducer.isValidSections);
  const highlightedTillSection = useSelector((state: RootState) =>
    state.bolInfoReducer.highlightedTillSection);

  return (
    <>
      
      <div className="w-full flex justify-center">
    

        <div
          className={
            "w-2.5 mt-96 bg-gray-300 h-[28px] rounded-tl-full border-r-[1px] border-white border-dotted"
          }
        ></div>
        <div
          className={
            "w-2.5 mt-96 bg-gray-300 h-[28px] rounded-tr-full border-l-[1px] border-white border-dotted"
          }
        ></div>
      </div>

       
      <div className="w-full justify-center flex">
        <IoIosPerson
          className={`w-11 h-11 p-2 rounded-full object-none
           bg-green-2 text-black`}
        />
      </div>
      <div className="w-full justify-center flex">
        <label
          className={`border-[0.5px] border-solid 
            border-gray-200 pl-1 pr-1 text-black text-base`}
        >
          Details
        </label>
        
      </div>
      <div className="w-full justify-center flex -mt-[12px] ml-[6px]">
        <label
          className={`invisible border-[0.5px] border-solid 
            border-gray-200 pl-1 pr-1 text-black text-base`}
        >
          Details
        </label>
        {isValidSections[0] && (
          <FaCheckDouble id="check" className="text-green-1 text-base" />
        )}
      </div>
      
      <div className="w-full flex justify-center -mt-[3px]">
        <div
          className={
            highlightedTillSection >= 2
              ? "w-2.5 h-50 bg-gray-300 h-[50px] border-r-[1px] border-white border-dotted"
              : "w-2.5 h-50 bg-gray-300 h-[50px] border-r-[1px] border-white border-dotted opacity-40"
          }
        ></div>
        <div
          className={
            highlightedTillSection >= 2
              ? "w-2.5 h-50 bg-gray-300 h-[50px] border-l-[1px] border-white border-dotted"
              : "w-2.5 h-50 bg-gray-300 h-[50px] border-l-[1px] border-white border-dotted opacity-40"
          }
        ></div>
      </div>
      <div className="w-full justify-center flex">
        <FaBook
          className={`w-11 h-11 p-2 rounded-full object-none 
           ${highlightedTillSection >= 2 ? "bg-green-2 text-black" : "bg-lightest-gray fill-white"}`}
        />
      </div>
      <div className="w-full justify-center flex">
        <label
          className={`border-[0.5px] border-solid 
            border-gray-200 pl-1 pr-1 text-base ${
              highlightedTillSection >= 2 ? "text-black" : "text-gray-300"
            }`}
        >
          Reference Info.
        </label>
      </div>
      <div className="w-full justify-center flex -mt-[12px] ml-[6px]">
        <label
          className={`invisible border-[0.5px] border-solid 
            border-gray-200 pl-1 pr-1 text-black text-base`}
        >
          Reference Info.
        </label>
        {isValidSections[1] && (
          <FaCheckDouble id="check" className="text-green-1 text-base" />
        )}
      </div>

      
      <div className="w-full flex justify-center ">
        <div
          className={
            highlightedTillSection >= 3
              ? "w-2.5 h-50 bg-gray-300 h-[50px] border-r-[1px] border-white border-dotted"
              : "w-2.5 h-50 bg-gray-300 h-[50px] border-r-[1px] border-white border-dotted opacity-40"
          }
        ></div>
        <div
          className={
            highlightedTillSection >= 3
              ? "w-2.5 h-50 bg-gray-300 h-[50px] border-l-[1px] border-white border-dotted"
              : "w-2.5 h-50 bg-gray-300 h-[50px] border-l-[1px] border-white border-dotted opacity-40"
          }
        ></div>
      </div>
      <div className="w-full justify-center flex">
        <FaTruckMoving
          className={`w-11 h-11 p-2 rounded-full object-none
           ${highlightedTillSection >= 3 ? "bg-green-2 text-black" : "bg-lightest-gray fill-white"}`}
        />
      </div>
      <div className="w-full justify-center flex">
        <label
          className={`border-[0.5px] border-solid 
            border-gray-200 pl-1 pr-1 text-base ${
              highlightedTillSection >= 3 ? "text-black" : "text-gray-300"
            }`}
        >
          Shipment Details
        </label>
      </div>
      <div className="w-full justify-center flex -mt-[12px] ml-[6px]">
        <label
          className={`invisible border-[0.5px] border-solid 
            border-gray-200 pl-1 pr-1 text-black text-base`}
        >
          Shipment Details
        </label>
        {isValidSections[2] && (
          <FaCheckDouble id="check" className="text-green-1 text-base" />
        )}
      </div>

     
      <div className="w-full flex justify-center">
        <div
          className={
            highlightedTillSection >= 4
              ? "w-2.5 h-50 bg-gray-300 h-[50px] border-r-[1px] border-white border-dotted"
              : "w-2.5 h-50 bg-gray-300 h-[50px] border-r-[1px] border-white border-dotted opacity-40"
          }
        ></div>
        <div
          className={
            highlightedTillSection >= 4
              ? "w-2.5 h-50 bg-gray-300 h-[50px] border-l-[1px] border-white border-dotted"
              : "w-2.5 h-50 bg-gray-300 h-[50px] border-l-[1px] border-white border-dotted opacity-40"
          }
        ></div>
      </div>
      <div className="w-full justify-center flex">
        <BsShieldShaded
          className={`w-11 h-11 p-2 rounded-full object-none
           ${highlightedTillSection >= 4 ? "bg-green-2 text-black" : "bg-lightest-gray fill-white"}`}
        />
      </div>
      <div className="w-full justify-center flex">
        <label
          className={`border-[0.5px] border-solid 
            border-gray-200 pl-1 pr-1 text-base ${
              highlightedTillSection >= 4 ? "text-black" : "text-gray-300"
            }`}
        >
          Marsh Insurance
        </label>
      </div>
      <div className="w-full justify-center flex -mt-[12px] ml-[6px]">
        <label
          className={`invisible border-[0.5px] border-solid 
            border-gray-200 pl-1 pr-1 text-black text-base`}
        >
          Marsh Insurance
        </label>
        {isValidSections[3] && (
          <FaCheckDouble id="check" className="text-green-1 text-base" />
        )}
      </div>

     
      <div className="w-full flex justify-center">
        <div
          className={
            highlightedTillSection >= 5
              ? "w-2.5 h-50 bg-gray-300 h-[50px] border-r-[1px] border-white border-dotted"
              : "w-2.5 h-50 bg-gray-300 h-[50px] border-r-[1px] border-white border-dotted opacity-40"
          }
        ></div>
        <div
          className={
            highlightedTillSection >= 5
              ? "w-2.5 h-50 bg-gray-300 h-[50px] border-l-[1px] border-white border-dotted"
              : "w-2.5 h-50 bg-gray-300 h-[50px] border-l-[1px] border-white border-dotted opacity-40"
          }
        ></div>
      </div>
      <div className="w-full justify-center flex">
        <FaCalendarPlus
          className={`w-11 h-11 p-2 rounded-full object-none
           ${highlightedTillSection >= 5 ? "bg-green-2 text-black" : "bg-lightest-gray fill-white"}`}
        />{" "}
      </div>
      <div className="w-full justify-center flex">
        <label
          className={`border-[0.5px] border-solid 
            border-gray-200 pl-1 pr-1 text-base ${
              highlightedTillSection >= 5 ? "text-black" : "text-gray-300"
            }`}
        >
          Pick Up Details
        </label>
      </div>
      
      <div className="w-full justify-center flex -mt-[12px] ml-[6px]">
        <label
          className={`invisible border-[0.5px] border-solid 
            border-gray-200 pl-1 pr-1 text-black text-base`}
        >
          Pick Up Details
        </label>
        {isValidSections[4] && (
          <FaCheckDouble id="check" className="text-green-1 text-base" />
        )}
      </div>

     
      <div className="w-full flex justify-center">
        <div
          className={
            highlightedTillSection >= 6
              ? "w-2.5 h-50 bg-gray-300 h-[50px] border-r-[1px] border-white border-dotted"
              : "w-2.5 h-50 bg-gray-300 h-[50px] border-r-[1px] border-white border-dotted opacity-40"
          }
        ></div>
        <div
          className={
            highlightedTillSection >= 6
              ? "w-2.5 h-50 bg-gray-300 h-[50px] border-l-[1px] border-white border-dotted"
              : "w-2.5 h-50 bg-gray-300 h-[50px] border-l-[1px] border-white border-dotted opacity-40"
          }
        ></div>
      </div>
      <div className="w-full justify-center flex">
        <IoIosInformationCircleOutline
          className={`w-11 h-11 p-2 rounded-full object-none
           ${highlightedTillSection >= 6 ? "bg-green-2 text-black" : "bg-lightest-gray fill-white"}`}
        />
      </div>
      <div className="w-full justify-center flex">
        <label
          className={`border-[0.5px] border-solid 
            border-gray-200 pl-1 pr-1 text-base ${
              highlightedTillSection >= 6 ? "text-black" : "text-gray-300"
            }`}
        >
          BOL Type
        </label>
      </div>
      
      <div className="w-full justify-center flex -mt-[12px] ml-[6px]">
        <label
          className={`invisible border-[0.5px] border-solid 
            border-gray-200 pl-1 pr-1 text-black text-base`}
        >
          BOL Type
        </label>
        {isValidSections[5] && (
          <FaCheckDouble id="check" className="text-green-1 text-base" />
        )}
      </div>

            <div className="w-full flex justify-center">
        <div
          className={
            highlightedTillSection >= 6
              ? "w-2.5 bg-gray-300 h-[28px] rounded-bl-full border-r-[1px] border-white border-dotted"
              : "w-2.5 bg-gray-300 h-[28px] rounded-bl-full border-r-[1px] border-white border-dotted opacity-40"
          }
        ></div>
        <div
          className={
            highlightedTillSection >= 6
              ? "w-2.5 bg-gray-300 h-[28px] rounded-br-full border-l-[1px] border-white border-dotted"
              : "w-2.5 bg-gray-300 h-[28px] rounded-br-full border-l-[1px] border-white border-dotted opacity-40"
          }
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
