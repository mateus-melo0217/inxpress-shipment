import React from "react";
import {downloadTemplateFile} from "../quotes/QuotesQueries";
import {ClipLoader} from "react-spinners";


type Props = {
  uploadFile: Function;
  isUploading: boolean;
}
export const ShipmentsImporterContent = (props: Props) => {
  return (
    <div className="w-[40%]">
      <div className="my-[30px] flex flex-wrap">
        <h1 className="text-[20px] font-bold w-full mb-[30px]">Select a CSV file</h1>
        <p className="w-full">A CSV is a file generate for Excel or similar software.<br/>
          The extension must be .csv or .txt.<br/>
          Use this template to upload quote requests.
          <span onClick={downloadTemplateFile} className="underline cursor-pointer">RateAggregatorTemplate.csv</span>
        </p>
        <p className="w-full mb-[30px]">Click the "Load" button to select and import file.</p>
        <p className="w-full"><span className="font-bold">Note</span> <br/> Choose a Spreadsheet type to import.</p>
      </div>
      <div className="flex items-center">
        <select className="px-[5px] py-[8px] border-[1px] border-[#686969] rounded-[5px]" name="Comma spreadsheet value"
                id="spreadsheet">
          <option value="menu" defaultValue='Comma spreadsheet value'>Comma spreadsheet value</option>
        </select>
        {props.isUploading &&
          <ClipLoader loading={props.isUploading}
                      size={20}
                      aria-label='Loading Spinner'
                      data-testid='loader'/>}
        <input type="file" className="ml-[15px] p-[5px] border-[1px] border-[#686969] w-[-webkit-fill-available]"
               disabled={props.isUploading}
               onChange={event => {
                 props.uploadFile(event);
               }}/>
      </div>
    </div>
  )
}