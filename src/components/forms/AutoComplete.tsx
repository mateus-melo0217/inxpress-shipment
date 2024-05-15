import React, { useState } from "react";
import { get, has } from "lodash";
import { ValidationType } from "./Types";
import { useFormContext } from "react-hook-form";
import { getPostCodeLookupDetails } from "pages/bol_info/api/bol_api";
import { PostalCodeSearchRes } from "pages/bol_info/constants/BOLConstants";
import { isUSPostcodeFormat, isCanadaPostcodeFormat } from "utils/validateHelpers";

interface PropTypes {
  type: string;
  id: string;
  label?: string;
  className?: string;
  placeholder: string;
  validation: ValidationType;
  onSuggestionClicked: Function;
  country: string;
  clearAddress: Function;
  setIsDesCodeChanged?: Function;
  setIsShowDesWarning?: Function;
  setIsOriCodeChanged?: Function;
  setIsShowOriWarning?: Function;
}

export default function AutoComplete({
  type,
  id,
  label,
  className,
  placeholder,
  validation,
  onSuggestionClicked,
  clearAddress,
  setIsDesCodeChanged,
  setIsShowDesWarning,
  setIsOriCodeChanged,
  setIsShowOriWarning,
}: PropTypes) {
  const {
    register,
    formState: { errors },
    clearErrors,
    getValues,
    watch
  } = useFormContext();
  watch(type);
  const target_country = getValues()[type] || { value: '' };
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsListComponent, setSuggestionsListComponent] = useState(
    <></>
  );

  const onClick = (suggestion: PostalCodeSearchRes) => {
    setShowSuggestions(false);
    onSuggestionClicked(suggestion);
  };
  
  const getSuggestions = (userInput: string) => {
    if(type === "origin_country"){
      setIsOriCodeChanged?.(false);    
    }
    else if (type === "destination_country"){
      setIsDesCodeChanged?.(false);    
    }
    
    getPostCodeLookupDetails(userInput).then(res => {
      if(type === "origin_country"){
        setIsOriCodeChanged?.(true);    
      }
      else if (type === "destination_country"){
        setIsDesCodeChanged?.(true);    
      }
      if((target_country.value === 'US' && !isUSPostcodeFormat(userInput)) || (target_country.value === 'CA' && !isCanadaPostcodeFormat(userInput))) {
        if(type === "origin_country"){
          setIsShowOriWarning?.(true);   
        }
        else if (type === "destination_country"){
          setIsShowDesWarning?.(true);   
        }
      }
      else{
        if(type === "origin_country"){
          setIsShowOriWarning?.(false);   
        }
        else if (type === "destination_country"){
          setIsShowDesWarning?.(false);   
        }

        if (res.data.length === 1) {
          onSuggestionClicked(res.data[0]);
        } else if (res.data.length > 1) {
          setShowSuggestions(true);
          setSuggestionsListComponent(
            <ul className="pl-0 overflow-y-auto max-h-[150px] mb-2 mt-1 border-[1px] border-solid border-blue-1">
              {res.data.map((suggestion: PostalCodeSearchRes, index: number) => {
                return (
                  <li className="p-[0.5rem] border-b-[1px] solid border-gray-1 hover:bg-lightest-gray hover:text-blue-1 cursor-pointer"
                    key={index}
                    onClick={() => onClick(suggestion)}
                  >
                    {`${suggestion.postalCode}  ${suggestion.stateCode}  ${suggestion.cityName}`}
                  </li>
                 );
              })}
            </ul>
          ); 
        }
      }
    });
  };

  const handleSuggestions = (event: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    clearErrors(id);
    if (type === "origin_country") {
      clearAddress("origin");
    } else if (type === "destination_country") {
      clearAddress("destination");
    }
    const { value } = event.currentTarget;
    const finalValueWithoutSpace = value.replace(/\s/g, '');
    getSuggestions(finalValueWithoutSpace);
  }

  return (
    <div className={className}>
      {label && <label className="text-sbase block w-full mt-8">{label}</label>}
      <div className={"w-full"}>
        <input
          {...register(id, validation)}
          placeholder={placeholder}
          className={
            "h-[38px] cursor-pointer w-40 md:w-48 rounded-[0.4rem] py-3 px-5 border border-solid border-light-gray" +
            (has(errors, id)
              ? " border-red-1 placeholder:text-red-1 placeholder:opacity-40"
              : "")
          }
          type="text"
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              handleSuggestions(event)
            }}
          }
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
            handleSuggestions(event)
          }}
        />
        {showSuggestions && suggestionsListComponent}
        {errors && (
          <span className={"text-red-1 text-xl mt-2"}>
            {get(errors, id)?.message}
          </span>
        )}
      </div>
    </div>
  );
}
