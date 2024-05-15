import React from "react";
import {useNavigate} from "react-router-dom";

type Props = {
  data: Map<any, any>[] | undefined;
}

export const QuoteImportDetail = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="modal-body overflow-auto h-[200px] w-full relative p-4 border-gray-400">
        <table className="w-full mt-10 text-center">
          <thead className="bg-lightest-gray text-blue-1">
          <tr className="gap-8">
            {props && props.data && props.data.length &&
              Object.keys(props.data[0]).map(key => <th
                className="border-[0.5px] border-l-gray-400 border-r-gray-400 py-4 px-8">{key}</th>)}
          </tr>
          </thead>
          <tbody>
          {props && props.data && props.data.length &&
            props.data.map((item) => <tr>{Object.entries(item).map((row) => <td>{row[1]}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
      <div className="pb-5 w-full justify-center flex gap-16 mt-10">
        <button
          onClick={() => navigate("/rate_aggregator/quotes")}
          type="button"
          className="btn btn-primary relative w-48 h-16 justify-center text-center border border-solid border-blue-1 rounded-md text-blue-1 bg-white"
        >OK</button>
      </div>
    </div>
  )
}