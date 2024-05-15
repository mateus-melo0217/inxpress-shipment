import moment from "moment";
import {Address, AddressBookEntry, DATE_FORMAT} from "../constants/BOLConstants";

export const setToken = (name: string, value: string) => {
  localStorage.setItem(name, value);
}
export const deleteToken = (name: string) => {
  localStorage.removeItem(name);
}
export const getToken = (name: string) => {
  return localStorage.getItem(name);
};

export const checkValidObject = (obj: any, skipKeys: string[]) => {
  for (let key in obj) {
    if (
      skipKeys.indexOf(key) === -1 &&
      (obj[key] === undefined ||
        obj[key] === null ||
        (typeof obj[key] === "string" && obj[key].trim() === ""))
    ) {
      return false;
    }
  }
  return true;
};

export const stringToDate = (
  _date: string | null,
  _format: string,
  _delimiter: string
) => {
  if (_date) {
    const formatLowerCase = _format.toLowerCase();
    const formatItems = formatLowerCase.split(_delimiter);
    const dateItems = _date.split(_delimiter);
    const monthIndex = formatItems.indexOf("mm");
    const dayIndex = formatItems.indexOf("dd");
    const yearIndex = formatItems.indexOf("yyyy");
    const month = parseInt(dateItems[monthIndex]) - 1;
    const formatedDate = new Date(
      Number(dateItems[yearIndex]),
      month,
      Number(dateItems[dayIndex])
    );
    return formatedDate;
  } else {
    return null;
  }
};

export const dateToString = (date: Date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

export const validateData = (dataObjArr: any[]) => {
  let isValid = true;
  for (let i = 0; i < dataObjArr.length; i++) {
    isValid = checkValidObject(dataObjArr[i].data, dataObjArr[i].skipKeys);
    if (!isValid) {
      break;
    }
  }
  return isValid;
}

export const valIsAddressDataChanged =
  (selAddressBookData: AddressBookEntry, formData: Address) => {
    if (selAddressBookData.companyName === formData.companyName &&
      selAddressBookData.contactName === formData.contactName &&
      selAddressBookData.address1 === formData.address1 &&
      selAddressBookData.address2 === formData.address2 &&
      selAddressBookData.email === formData.email &&
      selAddressBookData.phone.replace(/ /g, '') === formData.phone) {
      return false;
    } else {
      return true;
    }
  }


export const getDateFromDateTime = (dateTime: string) => {
  return moment(dateTime).format('H:mm A');
}

export const getTimeFromDateTime = (dateTime: string) => {
  return moment(dateTime).format('MM/D/yyyy');
}

export const getDefaultDeliveryTime = (dateTime: string, transitTime: number): string => {
  return moment(dateTime, DATE_FORMAT).add(transitTime + 7, 'days').format(DATE_FORMAT);
}
