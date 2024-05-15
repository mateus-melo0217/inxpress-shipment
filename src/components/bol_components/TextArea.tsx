import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  onChange?: Function;
  rows: number;
  value: string | number;
  id: string;
  name: string;
  label: string;
  className: string;
  isValidationTriggered: boolean;
}

export const TextArea = (props: Props) => {
  const { register, setValue:setVal } = useFormContext();
  const [value, setValue] = useState(props.value);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    onValueChanged(props.isValidationTriggered, props.value);
  }, [props.value, props.isValidationTriggered]);

  const onValueChanged = (isValidationTriggered: boolean, val: string | number) => {
    if (isValidationTriggered) {
      if (val) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(true);
    }
    setValue(val);
  };

  useEffect(() => {
    setVal(props.id, value);
  },[value, setVal, props.id])

  return (
    <>
    <div className={`border rounded cursor-pointer
      ${isValid ? "border-light-gray" : "border-red-500"} p-4 pb-0`}>
    
      <div className="relative">
        <textarea
          {...register(props.id)}
          id={props.id}
          name={props.name}
          rows={props.rows}
          className="w-full pb-0 pt-2 border-none font-bold cursor-pointer
            outline-none focus:outline-none focus:border-transparent focus:ring-0  peer text-slg"
          value={value ? value : ""}
          onBlur={() =>
            {props.onChange && props.onChange(value)}
          }
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onValueChanged(props.isValidationTriggered, e.target.value)
          }
        />
        
        <label
          htmlFor={props.name}
          className={
            props.value
              ? "absolute font-bold text-ssmall cursor-pointer left-0 -top-4 text-green-1"
              : "-mt-2 w-full text-ssmall text-ellipsis overflow-hidden peer-focus:mt-0 absolute peer-focus:text-base peer-focus:font-bold left-0 top-1 text-light-gray cursor-pointer peer-focus:-top-4 peer-focus:text-green-1 transition-all"
          }
        >
          {props.label}
        </label>
      </div>      
    </div>
    {!isValid && <div className="-mt-6">
    <label className="italic text-red-500 text-lg">*Required</label>
  </div>}
  </>
  );
};
