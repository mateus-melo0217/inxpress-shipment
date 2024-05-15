import React, {useState} from "react";
import {Breadcrumb} from "components/common/breadcrumb/Breadcrumb";
import {ShipmentsImporterContent} from "./ShipmentsImporterContent";
import {QuoteImportDetail} from "./QuoteImportDetail";
import {importQuoteFile} from "../quotes/QuotesQueries";
import {toast} from "react-toastify";

export const ShipmentsImporter = () => {
  const [data, setData] = useState<Map<any, any>[]>();
  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const buttonClass: string = "bg-white px-[15px] py-[8px] rounded-[5px] mx-[5px] border-[#686969] border-[1px]";
  const selectedButtonClass: string = "bg-[#194b86] px-[15px] py-[8px] rounded-[5px] text-white mr-[5px]";
  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    if (event.target.files && event.target.files.length > 0) {
      importQuoteFile(event.target.files[0])
        .then(res => {
          setData(res.data);
          setUploaded(true);
          setIsUploading(false);
        })
        .catch(err => {
          console.log(err);
          toast.error("Cannot upload data");
          setIsUploading(false);
        });
    }
  }

  const openSelectFile = () => {
    setData([]);
    setUploaded(false);
    setIsUploading(false);
  }
  return (
    <div>
      <Breadcrumb title="Rate Aggregator"/>
      <div className="my-[20px] px-[30px] text-[#686969] min-w-[500px]">
        <div className="flex">
          <button className={!uploaded ? selectedButtonClass : buttonClass} onClick={openSelectFile}>Select File
          </button>
          <span className={uploaded ? selectedButtonClass : buttonClass}>Verify
            Data
          </span>
        </div>
        {!uploaded && <ShipmentsImporterContent uploadFile={uploadFile} isUploading={isUploading}/>}
        {uploaded && <QuoteImportDetail data={data}/>}
      </div>
    </div>
  )
}