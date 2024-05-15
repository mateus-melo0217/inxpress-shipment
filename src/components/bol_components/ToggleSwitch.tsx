import { ChangeEvent } from "react";

interface Props {
  onChange?: Function;
  value: boolean;
  label: string;
  className?: string;
  disabled?: boolean;
}

export const ToggleSwitch = (props: Props) => {
  return (
    <div className={`grid grid-cols-6 w-full mt-3 ${props.disabled ? 'cursor-none pointer-events-none': ''}`}>
      <label
        className="col-span-2 bg-gray-100 cursor-pointer relative w-20 h-7 rounded-full"
      >
        
        <input
          tabIndex={props.disabled ? -1 : 0}  
          type="checkbox"
          checked={props.value}
          className="sr-only peer"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            {props.onChange && props.onChange(e.target.checked)} }
        ></input>
        <span className="w-[28%] h-[75%] bg-light-gray absolute rounded-full left-1 top-1 peer-checked:bg-green-1 peer-checked:left-14 transition-all duration-500"></span>
      </label>
      <label className="col-span-4 pl-[10px] md:pl-5 sm:ml-5 relative text-lg">{props.label}</label>
    </div>
  );
};
