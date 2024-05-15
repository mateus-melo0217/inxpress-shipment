import {useMutation, useQuery, useQueryClient} from "react-query";
import {QuoteResponse} from "./QuotesTypes";
import {PaginationState, SortingState} from "@tanstack/react-table";
import apiClient, {ApiClientFileDownload} from "utils/apiClient";
import {isEmpty} from "lodash";
import { IFilterQuery } from './filter/QuotesFilterTypes';
import { OtherOptionType } from "./filter/QuotesFilter";

export function useQuotes(sorting:SortingState, pagination:PaginationState, filterQuery:IFilterQuery) {
    return useQuery<QuoteResponse>(
        ["quotes", sorting, pagination, filterQuery],
        () => fetchQuotes(sorting, pagination, filterQuery),
        { keepPreviousData: true, refetchOnWindowFocus: false}
    );
}

export const useCarriers = () => useQuery("freight-shipment-carriers", fetchCarriers);
export const useServices = () => useQuery("freight-service-types", fetchServices);
export const useStatus = () => useQuery("freight-shipment-status", fetchStatus);
export const useAccessorials = () => useQuery("freight-shipment-accessorials", fetchAccessorials);
export const useFilters = () => useQuery("freight-history-searches", fetchFilters);
export const useFilterDatas = (name:string) => useQuery(["freight-history-filter-datas", name], ()=>fetchFilterDatas(name));

async function fetchQuotes(sorting:SortingState, pagination:PaginationState, filterQuery:IFilterQuery) {
    const dateFrom = filterQuery.dateFrom.replace(/\//g, '-')
    const dateTo = filterQuery.dateTo.replace(/\//g, '-')

    let url = `freight-rate-aggregator/quote?page=${pagination.pageIndex + 1 }&pagesize=${pagination.pageSize}&dateFrom=${dateFrom}&dateTo=${dateTo}`;

    if(!isEmpty(sorting)){
        const column = sorting[0];
        url = url + `&sortorder=${column.desc ? 'D' : 'A'}&sortfield=${column.id}`
    }

    if(!isEmpty(filterQuery)){
        const {byBolNumber, byProNumber, bolProNumber, receiverName, receiverAddress, carrierName, serviceName, statusName, accessorialsName, extraOption, quoteNumber} = filterQuery;

        if (bolProNumber) {
            if (byBolNumber) {
                url = url + `&byBolNumber=${byBolNumber}&bolProNumber=${bolProNumber}`;
            } else if (byProNumber) {
                url = url + `&byProNumber=${byProNumber}&bolproNumber=${bolProNumber}`;
            }
        }

        if (quoteNumber) {
            url = url + `&quoteNumber=${quoteNumber}`
        }

        if (receiverName) {
            url = url + `&receiverName=${receiverName}`;
        }

        if (receiverAddress) {
            url = url + `&receiverAddress=${receiverAddress}`;
        }

        if (carrierName?.length) {
            let carriers = '';
            carrierName.forEach((item: any, index:number)=> {
                if (index !== carrierName.length - 1) {
                    carriers += `carriers=${item.value}&`
                } else {
                    carriers += `carriers=${item.value}`
                }
            })
            url = url + '&' + carriers
        }

        if (serviceName?.length) {
            let services = '';
            serviceName.forEach((item: any, index:number)=> {
                if (index !== serviceName.length - 1) {
                    services += `services=${item.value}&`
                } else {
                    services += `services=${item.value}`
                }
            })
            url = url + '&' + services
        }

        if (statusName?.length) {
            let status = '';
            statusName.forEach((item: any, index:number)=> {
                if (index !== statusName.length - 1) {
                    status += `status=${item.value}&`
                } else {
                    status += `status=${item.value}`
                }
            })
            url = url + '&' + status
        }

        if (accessorialsName?.length) {
            let accessorials = '';
            accessorialsName.forEach((item: any, index:number)=> {
                if (index !== accessorialsName.length - 1) {
                    accessorials += `accessorials=${item.value}&`
                } else {
                    accessorials += `accessorials=${item.value}`
                }
            })
            url = url + '&' + accessorials
        }

        if (extraOption) {
            extraOption?.forEach((opt: OtherOptionType)=> {
                let extraOpt = opt.key;
                if(opt.active) {
                    extraOpt += `=true`;
                    url = url + '&' + extraOpt
                }
            })
        }
    }

    return await apiClient.get(url, {data:{}})
        .then((response: any) => {
            return response;
        });
}

export const useCancelShipment = () => {
    const queryClient = useQueryClient();
    return useMutation(cancelShipment, {
        onSuccess: () => {
            queryClient.invalidateQueries('shipments')
        }
    })
}

export const useVoidShipment = () => {
    const queryClient = useQueryClient();
    return useMutation(voidShipment, {
        onSuccess: () => {
            queryClient.invalidateQueries('shipments')
        }
    })
}

export const useSaveFilter = () => {
    const queryClient = useQueryClient();
    return useMutation(saveFilter, {
        onSuccess: () => {
            queryClient.invalidateQueries('freight-history-searches')
        }
    })
}

export const useDeleteFilter = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteFilter, {
        onSuccess: () => {
            queryClient.invalidateQueries('freight-history-searches')
        }
    })
}

const saveFilter = async (data:any) =>
    await apiClient.post(`freight-history-searches/${data.saveName}`, data).then(response => response.data)

const deleteFilter = async (name: string) =>
    await apiClient.delete(`freight-history-searches/${name}`, {data: {}}).then(response => response.data)

const cancelShipment = async (shipmentId: number) =>
    await apiClient.put(`bol/${shipmentId}/cancelshipment`, {data: {}}).then(response => response.data)

const voidShipment = async (shipmentId: number) =>
    await apiClient.put(`bol/${shipmentId}/voidshipment`, {data: {}}).then(response => response.data)

async function fetchCarriers() {
    return await apiClient.get('freight-shipment-carriers', {data:{}}).then((response: any) => {
        return response.data
    })
}

async function fetchServices() {
    return await apiClient.get('freight-service-types', {data:{}}).then((response: any) => {
        return response.data
    })
}

async function fetchStatus() {
    return await apiClient.get('freight-shipment-status', {data:{}}).then((response: any) => {
        return response.data
    })
}

async function fetchAccessorials() {
    return await apiClient.get('accessorials', {data:{}}).then((response: any) => {
        return response.data
    })
}

async function fetchFilters() {
    return await apiClient.get('freight-history-searches', {data:{}}).then((response: any) => {
        return response.data
    })
}

async function fetchFilterDatas(name:string) {
    return await apiClient.get(`freight-history-searches/${name}`, {data:{}}).then((response: any) => {
        return response.data
    })
}

export async function downloadTemplateFile() {
  return await ApiClientFileDownload.get("freight-rate-aggregator/template").then((response) => {
    const href: string = URL.createObjectURL(response.data);

    const link: HTMLAnchorElement = document.createElement("a");
    link.href = href;
    link.setAttribute("download", "template.csv");
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  });
}

export const importQuoteFile = (file: File) => {
  return apiClient.post(`freight-rate-aggregator/quote`, {"file": file}, {headers: {'Content-Type': 'multipart/form-data'}});
}
export const processQuotes = async (quote_id: Number) => {
  await apiClient.post(`freight-rate-aggregator/quote/${quote_id}/process`, {data: {}}).then(response => response.data)
}

export const deleteQuote = async (quote_id: Number) => {
    await apiClient.delete(`freight-rate-aggregator/quote/${quote_id}`, {data: {}}).then(response => response.data)
}