import React, {useState} from 'react';
import { BsStickiesFill } from "react-icons/bs";
import {useFormContext} from "react-hook-form";

interface Props {
    label?: string;
    id: string;
    disabled?: boolean;
    onCheckBoxChanged: Function;
}

export const ImageCheckBox = (props: Props) => {
    const { register } = useFormContext();
    const [isChecked, setIsChecked] = useState<boolean>(false);
  
    const handleCheckboxClick = () => {
      const newIsChecked = !isChecked;
      setIsChecked(newIsChecked);
      props.onCheckBoxChanged(props.id, newIsChecked);
    };
  
    return (
      <div className={`flex mt-6 ml-10 ${props.disabled ? "" : "cursor-pointer"}`}>
        <label className={`flex ${props.disabled ? "" : "cursor-pointer"}`}>
          <input
            {...register("checkbox")}
            type="checkbox"
            disabled={props?.disabled}
            className={`w-8 h-8 rounded-sm mt-6 box-borde text-green-1 ${
              props.disabled ? "" : "cursor-pointer"
            }`}
            id={props.id}
            onClick={handleCheckboxClick}
          />
          <div className="relative text-center ml-[5px]">
            <BsStickiesFill className="block mx-auto" size={"2.5em"} />
            <div
              className={`ml-2 mt-[8px] w-[50px] text-center ${
                props.disabled ? "" : "cursor-pointer"
              }`}
            >
              <p className="text-ssmall mb-[-5px] font-bold">BOL</p>
              <p className="mt-[3px] break-spaces break-all text-ssmall text-lg leading-[13px]">
                {props.label}
              </p>
            </div>
          </div>
        </label>
      </div>
    );
  };