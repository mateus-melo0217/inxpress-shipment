import React, { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp, FaClock } from "react-icons/fa";

type Props = {
  label: string;
  time: string | null;
  onChange: Function;
  isValidationTriggered: boolean;
};

const getHourMinIsAM = (time: string) => {
  const timeSplitsColon = time.split(":");
  const timeSplitsSpace = timeSplitsColon[1].split(" ");
  return {
    hour: Number(timeSplitsColon[0]),
    mins: Number(timeSplitsSpace[0]),
    isAM: timeSplitsSpace[1] === "AM",
  };
};

export const TimePicker = (props: Props) => {
  const [hour, setHour] = useState(0);
  const [mins, setMins] = useState(0);
  const [isAM, setIsAM] = useState(true);

  useEffect(() => {
    if (props.time) {
      const timeObj = getHourMinIsAM(props.time);
      setHour(timeObj.hour);
      setMins(timeObj.mins);
      setIsAM(timeObj.isAM);
    }
  }, [props.time]);

  const formatHourMin = (value: number) => {
    if (value < 10) {
      return `0${value}`;
    } else {
      return value;
    }
  };
  const contructTimeString = (hour: number, min: number, isAM: boolean) => {
    return `${formatHourMin(hour)}:${formatHourMin(min)} ${isAM ? "AM" : "PM"}`;
  };

  const setHourWithProtocol = (upClicked: boolean) => {
    if (upClicked && hour === 12) {
      props.onChange(contructTimeString(0, mins, isAM));
    } else if (!upClicked && hour === 0) {
      props.onChange(contructTimeString(12, mins, isAM));
    } else {
      props.onChange(
        contructTimeString(upClicked ? hour + 1 : hour - 1, mins, isAM)
      );
    }
  };
  const setMinsWithProtocol = (upClicked: boolean) => {
    if (upClicked && mins === 55) {
      props.onChange(contructTimeString(hour, 0, isAM));
    } else if (!upClicked && mins === 0) {
      props.onChange(contructTimeString(hour, 55, isAM));
    } else {
      props.onChange(
        contructTimeString(hour, upClicked ? mins + 5 : mins - 5, isAM)
      );
    }
  };
  return (
    <div>
      <div
        className={`container md:grid grid md:grid-cols-6 grid-cols-6 border-[1px] border-solid 
    ${
      props.isValidationTriggered && !props.time
        ? "border-red-500"
        : "border-gray-400"
    }`}
      >
        {!props.time ? (
          <>
            <div className="col-span-5 pt-1">
              <label className="pl-4 text-base">{props.label}</label>
            </div>
            <div className="pr-2 pb-4 pt-4 col-span-1">
              <FaClock
                className="h-6 w-6"
                onClick={() => {
                  props.onChange("00:00 AM");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="container md:grid grid grid-cols-12 md:grid-cols-12 col-span-4">
              <div className="col-span-5 grid text-center justify-center">
                <FaCaretUp
                  className="h-8 w-8"
                  onClick={() => setHourWithProtocol(true)}
                />
                <span>{formatHourMin(hour)}</span>
                <FaCaretDown
                  className="h-8 w-8"
                  onClick={() => setHourWithProtocol(false)}
                />
              </div>
              <div className="col-span-2 p-2 pt-3 font-medium">{`:`}</div>
              <div className="col-span-5 grid text-center justify-center">
                <FaCaretUp
                  className="h-8 w-8"
                  onClick={() => setMinsWithProtocol(true)}
                />
                <span>{formatHourMin(mins)}</span>
                <FaCaretDown
                  className="h-8 w-8"
                  onClick={() => setMinsWithProtocol(false)}
                />
              </div>
            </div>
            <div className="col-span-2">
              <button
                onClick={() =>
                  props.onChange(contructTimeString(hour, mins, true))
                }
                className={`mt-4 ml-3
                ${
                  isAM ? "font-bold text-gray-600" : "font-bold text-gray-400"
                }`}
              >
                AM
              </button>
              <br />
              <button
                onClick={() =>
                  props.onChange(contructTimeString(hour, mins, false))
                }
                className={` ml-3
                ${
                  isAM ? "font-bold text-gray-400" : "font-bold text-gray-600"
                }`}
              >
                PM
              </button>
            </div>
          </>
        )}
      </div>
      {props.isValidationTriggered && !props.time && (
        <div className="-mt-1">
          <label className="italic text-red-500 text-lg">*Required</label>
        </div>
      )}
    </div>
  );
};
