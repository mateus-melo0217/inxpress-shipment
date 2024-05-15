import { useEffect, useState, ChangeEvent } from "react";
import "../../assets/sass/components/inputStyles.css";
import { ValidationType } from "components/forms/Types";

interface Props {
  onChange?: Function;
  type: string;
  value: string | number;
  id: string;
  name: string;
  label: string;
  className: string;
  isEmail?: boolean;
  showError?: Function;
  validation?: ValidationType;
  errors?: any;
  isValidationTriggered: boolean;
  disabled?: boolean;
  ingoreDisabledBack?: boolean;
  onFocus?: Function;
}
export const TextField = (props: Props) => {
  const [value, setValue] = useState<any>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    onValueChanged(props.isValidationTriggered, props.value);
  }, [props.value, props.isValidationTriggered]);

  const onValueChanged = (isValidationTriggered: boolean, val: string | number) => {
    if (isValidationTriggered) {
      if (val === 0 || val) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(true);
    }
    setValue(val);
  };

  return (
    <div className={props.className}>
      <div
        className={`border rounded cursor-pointer 
     pt-8 pb-0 pl-[0.5rem]
     ${isValid ? "border-light-gray" : "border-red-500"}
      ${props.disabled ? "cursor-none pointer-events-none" : ""}
      ${props.disabled && !props.ingoreDisabledBack ? "bg-lightest-gray" : ""}`
    }
      >
        <div className="relative">
          <input
            tabIndex={props.disabled ? -1 : 0}
            type={props.type}
            id={props.id}
            name={props.name}
            className={`w-full pb-0 pt-0 border-none font-bold cursor-pointer text-slg
            outline-none focus:outline-none focus:border-transparent focus:ring-0  peer
            ${props.disabled && !props.ingoreDisabledBack ? "bg-lightest-gray" : ""}`}
            value={value ? value : ""}
            onBlur={() => {
              props.onChange && props.onChange(value);
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onValueChanged(props.isValidationTriggered, e.target.value)
            }
            onFocus={() => props.onFocus?.()}
          />

          <label
            htmlFor={props.name}
            className={
              props.value === 0 || props.value
                ? "absolute font-bold text-ssmall cursor-pointer left-0 top-[-90%] text-green-1"
                : "-mt-2 w-full text-ssmall text-ellipsis overflow-hidden peer-focus:mt-0 absolute peer-focus:text-base peer-focus:font-bold left-0 top-1 text-light-gray cursor-pointer peer-focus:-top-4 peer-focus:text-green-1 transition-all"
            }
          >
            {props.label}
          </label>
        </div>
      </div>
      {!isValid && <div className="-mt-1">
        <label className="italic text-red-500 text-lg">*Required</label>
      </div>}
    </div>
  );
};
