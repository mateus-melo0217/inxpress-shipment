import { useState } from 'react';
import DatePicker from 'react-date-picker';
import { useFormContext, Controller } from 'react-hook-form';
import { get, has } from 'lodash';
import { FaCalendarAlt } from "react-icons/fa";
import 'react-date-picker/dist/DatePicker.css';

interface DatePickerProps {
    name: string;
    label: string;
    disabled?: boolean;
    className?: string;
    validation: any;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
    name,
    label,
    disabled = false,
    className = '',
    validation,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    // Get the context object from useFormContext
    const {
        control,
        formState: { errors },
        getValues,
    } = useFormContext();

    const minDate = new Date();
    const val = getValues(name)
    // Render the DatePicker component and wrap it in the Controller component
    return (
        <div className='h-[32px]'>
            <label htmlFor={name} className='text-sbase block w-full'>{label}</label>
            <div
                className={`border w-[150px] py-3 px-5 rounded-md ${
                    has(errors, name) ? 'border-red-2' : 'border-black-2'
                } ${className}`}
            >
                <div className="container flex justify-between items-center">
                    <div onClick={()=>setIsOpen(true)} className='cursor-pointer flex items-center h-[32px]'>
                        <Controller
                            name={name}
                            control={control}
                            rules={{ required: validation.required ? true : false }}
                            render={({ field: { value, onChange } }) => (
                                <DatePicker
                                    disabled={disabled}
                                    onChange={onChange}
                                    value={value}
                                    minDate={minDate}
                                    calendarIcon={null}
                                    format={val ? "MMMdd, yyyy" : "Select Date"}
                                    isOpen={isOpen}
                                    onCalendarClose={() => setIsOpen(false)}
                                    // className="h-[32px]"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <FaCalendarAlt
                            className="w-7 h-7 cursor-pointer mt-1 ml-2"
                            onClick={() => setIsOpen(true)}
                        />
                    </div>
                </div>
            </div>
            {errors && (
                <span className={'text-red-1 text-xl mt-2'}>
                    {get(errors, name) ? validation.required : ''}
                </span>
            )}
        </div>
    );
};

export default CustomDatePicker;
