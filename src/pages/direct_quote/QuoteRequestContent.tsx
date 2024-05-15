import React from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import { BsTruck } from "react-icons/bs";
import { LiaShipSolid } from "react-icons/lia";

export const QuoteRequestContent = () => {

    return (
        <div className="my-[20px] px-[30px] text-[#686969]">
            <div className="mt-[60px]">
              <h1 className="font-bold text-black">Mode of Transportation</h1>
              <p className="">Select your mode of transportation for this request</p>
              <div className="flex items-center mt-[30px]">
                <div className="flex items-center px-[60px]">
                  <input type="radio" id="road" name="mode" value="road" />
                  <div className="pl-[20px] text-center">
                    <BsTruck size={50}/>
                    <label htmlFor="road" className="text-black font-bold">Road</label>
                  </div>
                </div>
                <div className="flex items-center px-[60px]">
                  <input type="radio" id="air" name="mode" value="air" />
                  <div className="pl-[20px] text-center">
                    <GiCommercialAirplane size={50}/>
                    <label htmlFor="air" className="text-black font-bold">Air</label>
                  </div>
                </div>
                <div className="flex items-center px-[60px]">
                  <input type="radio" id="ocean" name="mode" value="ocean" />
                  <div className="pl-[20px] text-center">
                    <LiaShipSolid size={50}/>
                    <label htmlFor="ocean" className="text-black font-bold">Ocean</label>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
}