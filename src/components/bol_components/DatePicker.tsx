import React, {useEffect, useState} from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "assets/sass/components/datePicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { DATE_DELIMITER, DATE_FORMAT } from "../../pages/bol_info/constants/BOLConstants";
import { dateToString, stringToDate } from "../../pages/bol_info/utility/Utility";
import { noop, has, isFunction } from "lodash";
import moment from "moment";

interface DatePickerProps {
  selectedDate: string | null;
  onChange: Function;
  isValidationTriggered: boolean;
  minDate: boolean;
  dateFormat?: string;
  dateToString?: Function
  disabled?: boolean
  required?: boolean
}

export const Datepicker = (props: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const getDateFromProps = () => stringToDate(props.selectedDate, props.dateFormat? props.dateFormat: DATE_FORMAT, DATE_DELIMITER)
  const [selectedDate, setSelectedDate] = useState(getDateFromProps);

  useEffect(() => {
    setSelectedDate(getDateFromProps())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedDate]);

  return (
    <>
      <div className={`container w-[44%] px-1 py-5 pr-2 md:grid md:grid-cols-12 grid grid-cols-12 border-[1px] border-solid
        ${props.isValidationTriggered && !props.selectedDate ? "border-red-500" : "border-gray-400"}`}>
        <div className={`col-span-10 ${props.selectedDate ? "" : "cursor-pointer"}`}
          onClick={() => props.selectedDate ? noop() : setIsOpen(true)}>
          <DatePicker
            value={selectedDate}
            calendarIcon={null}
            isOpen={isOpen}
            minDate={props.minDate ? moment().toDate() : undefined}
            format={props.selectedDate ? "MMMdd, yyyy" : "Select Date"}
            onCalendarClose={() => setIsOpen(false)}
            onChange={(date: Date) => {
              setSelectedDate(date)
              if(has(props, 'onChange') && isFunction(props['onChange'])){
                props.onChange(props.dateToString ? props.dateToString(date) : dateToString(date))
              }
            }}
            disabled={props.disabled}
          />
        </div>
        <div className="col-span-2">
          <FaCalendarAlt
            className="w-7 h-7 cursor-pointer mt-1 ml-2"
            onClick={() => !props.disabled && setIsOpen(true)}
          />
        </div>
      </div>
      {props.required && props.isValidationTriggered && !props.selectedDate &&
        <div className="-mt-1"><label className="italic text-red-500 text-lg">*Required</label></div>
      }
    </>
  );
};
