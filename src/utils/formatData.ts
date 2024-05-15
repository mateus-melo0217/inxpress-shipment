import moment from "moment";

export const convertFreightFormData = (data:any) =>{
    const formatData:any = {};

    formatData["bolProNumber"] = data.bolProNumber;
    formatData["byBolNumber"] = data.byBolNumber;
    formatData["byProNumber"] =!data.byBolNumber;
    formatData["byProNumberOriginOrEdited"] = false;
    formatData["receiverName"] = data.receiverName;
    formatData["receiverAddress"] = data.receiverAddress;
    formatData["carriers"] = data.carrierName?.map((item:any)=>item.value).join(",");
    formatData["services"] = data.serviceName?.map((item:any)=>item.value).join(",");
    formatData["shipmentDomestic"] = true;
    formatData["status"] = data.statusName?.map((item:any)=>item.value).join(",");
    formatData["insuredShipment"] = true;
    formatData["inspectedShipment"] = false;
    formatData["hotShipment"] = false;
    formatData["dateFrom"] = moment(data.dateFrom, "YYYY/MM/DD").format("YYYY-MM-DD HH:mm:ss");
    formatData["dateTo"] = moment(data.dateTo, "YYYY/MM/DD").format("YYYY-MM-DD HH:mm:ss");
    formatData["quoteNumber"] = data.quoteNumber;
    formatData["saveName"] = data.saveName;
    formatData["accessorialsName"] = data.accessorialsName;
    
    return formatData
}

export const convertQuotesFormData = (data:any) =>{
    const formatData:any = {};
    formatData["createDateFrom"] = moment(data.createDateFrom, "YYYY/MM/DD").format("YYYY-MM-DD HH:mm:ss");
    formatData["createDateTo"] = moment(data.createDateTo, "YYYY/MM/DD").format("YYYY-MM-DD HH:mm:ss");
    formatData["startDateFrom"] = moment(data.startDateFrom, "YYYY/MM/DD").format("YYYY-MM-DD HH:mm:ss");
    formatData["startDateTo"] = moment(data.startDateTo, "YYYY/MM/DD").format("YYYY-MM-DD HH:mm:ss");
    formatData["endDateFrom"] = moment(data.endDateFrom, "YYYY/MM/DD").format("YYYY-MM-DD HH:mm:ss");
    formatData["endDateTo"] = moment(data.endDateTo, "YYYY/MM/DD").format("YYYY-MM-DD HH:mm:ss");
    formatData["saveName"] = data.saveName;
    return formatData
}

export const convertQueryData = (data:any) =>{
    const formatData:any = {};

    formatData["bolProNumber"] = data.bolProNumber;
    formatData["byBolNumber"] = data.byBolNumber;
    formatData["byProNumber"] =!data.byBolNumber;
    formatData["receiverName"] = data.receiverName;
    formatData["receiverAddress"] = data.receiverAddress;
    formatData["carrierName"] = data.carrierName;
    formatData["serviceName"] = data.serviceName;
    formatData["statusName"] = data.statusName;
    formatData["accessorialsName"] = data.accessorialsName;
    formatData["dateFrom"] = moment(data.dateFrom, "YYYY/MM/DD").format("YYYY-MM-DD HH:mm:ss");
    formatData["dateTo"] = moment(data.dateTo, "YYYY/MM/DD").format("YYYY-MM-DD HH:mm:ss");
    formatData["quoteNumber"] = data.quoteNumber;
    
    return formatData
}

export const getArrayFromString = (str:string) =>{
    if(typeof str==typeof undefined || typeof str==typeof null || str==="") return undefined;
    const arr = str.split(",")
    const name:any = [];
    arr.forEach((element) => {
        name.push({label: element, value: element})
    })
    return name;
}

// Format input array for preselecting
export const formatArray = (originArray: string[], baseArray: { value: string, label: string }[]) => {
    const result = originArray.map(item => {
      const { value, label } = baseArray?.find(i => i.value === item) || { value: "", label: "" };
      return { value, label };
    });
    return result;
}

// Get name array for preselecting from Saved_Quotes
export const getNameArray = (originArray: { code: string }[]): string[] => {
   return originArray.map((item) => item.code);
};