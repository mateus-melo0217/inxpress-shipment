import apiClient from "utils/apiClient";
import {useQuery} from "react-query";
import {isUndefined} from "lodash";

export const useCountries = () => useQuery("countries", fetchCountries );
export const useCommodities = () => useQuery("commodities", fetchCommodities );
export const useAccessorials = () => useQuery("accessorials", fetchAccessorials );
export const usePackageTypes = () => useQuery("package-types", fetchPackageTypes );
export const useDefaultAddresses = () => useQuery("default-addresses", fetchDefaultAddresses );
export const useData = (dataId: string|undefined, isShipment: boolean) => useQuery(["get-shipment", dataId ], () => fetchData(dataId, isShipment) );
export const useInsuranceCommodities = () => useQuery("insurance-commodities", fetchInsuranceCommodities);
export const usePackageCategories = (commodityId: string|undefined) => useQuery(["package-categories", commodityId], () => fetchPackageCategories(commodityId));
export const useCoverageOptions = (commodityId: string|undefined) => useQuery(["coverage-options", commodityId], () => fetchCoverageOptions(commodityId));

async function fetchCountries(){
    return await apiClient.get('countries')
        .then((response : any) => {
            return response.data.map(
                ({code, name}: {code:string, name:string}) => ({value: code, label: name, code: code})
            )
        });
}

async function fetchCommodities() {
    return await apiClient.get('customer/commodities')
        .then((response: any) => {
            return response.data.map(
                ({id, description, nmfc, sub_nmfc, commodityClass} : { id: number, description: string, nmfc: string, sub_nmfc: string, commodityClass: string}) => ({
                    value: id,
                    label: description,
                    nmfc: nmfc,
                    sub_nmfc: sub_nmfc,
                    commodityClass: commodityClass,
                })
            )
        });
}

async function fetchAccessorials() {
    return await apiClient.get('accessorials')
        .then((response: any) => {
            return response.data.map(
                ({code, name}: {code:string, name:string}) => ({value: code, label: name})
            )
        });
}

async function fetchPackageTypes() {
    return await apiClient.get('freight-package-types')
        .then((response: any) => {
            return response.data.map(
                (name: string) => ({value: name, label: name})
            )
        });
}

async function fetchDefaultAddresses() {
    return await apiClient.get('customer/default-addresses')
        .then((response: any) => {
            return response.data;
        });
}

async function fetchData(dataId: string | undefined, isShipment: boolean) {

    if(isUndefined(dataId)){
        return undefined;
    }

    if (isShipment) {
        return await apiClient.get(`shipment/bol/${dataId}` , {data:{}})
        .then((response: any) => {
            return response.data;
        });
    } else {
        return await apiClient.get(`freight-quote/${dataId}` , {data:{}})
        .then((response: any) => {
            return response.data;
        });
    }
}

async function fetchInsuranceCommodities() {
    return await apiClient.get('insurance/commodities')
        .then((response: any) => {
            return response.data.map(
                (item: any) => ({value: item.id, label: item.attributes.commodityName})
            )
        });
}

async function fetchPackageCategories(commodityId: string | undefined) {
    if (commodityId) {
        return await apiClient.get(`insurance/${commodityId}/packing-categories`)
            .then((response: any) => {
                return response.data.map(
                    (item: any) => ({value: item.id, label: item.attributes.packingCategoryName})
                )
            });
    } else {
        return []
    }
}

async function fetchCoverageOptions(commodityId: string | undefined) {
    if (commodityId) {
        return await apiClient.get(`insurance/${commodityId}/coverage-options`)
            .then((response: any) => {
                return {
                    coverageOptionName: response.data[0].attributes.coverageOptionName,
                    clientCode: response.data[0].attributes.clientCode
                }
            });
    } else {
        return ""
    }
}