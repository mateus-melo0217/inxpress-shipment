import apiClient from "utils/apiClient";
import {useQuery} from "react-query";
import {FilterFormTypes} from "../filter_form/FilterFormTypes";
import {chunk, find} from "lodash";
import {QuoteTypes} from "./QuoteTypes";

export function useQuotes(
    filters: FilterFormTypes,
    paginator: {perPage: number, page: number},
    topBarFilter: {bestValue: boolean, quickest: boolean},
    isInsuranceVal: boolean
) {

    let opt:any = {
        refetchOnWindowFocus: false,
        select: (quotes : any) => {
            return {
                id: quotes.id,
                uuid: quotes.uuid,
                data: paginate(paginator, quotes.data),
                bestValue: find(quotes.data, ['bestPriceSortIndex', 0]),
                quickest: find(quotes.data, ['quickestSortIndex', 0]),
                total: quotes.total,
                allQuotes: quotes.data,
                marshQuoteResponse: quotes.marshQuoteResponse,
                upsCapitalGenerateQuoteResponse: quotes.upsCapitalGenerateQuoteResponse,
                insuranceTermsAndConditionsDocument: quotes.insuranceTermsAndConditionsDocument,
                insuranceInformation: quotes?.insuranceInformation,
                accessorial: quotes?.accessorial
            }
        }
    };

    if(topBarFilter.bestValue){
        opt = {
            refetchOnWindowFocus: false,
            select: (quotes : any) => {
                return {
                    id: quotes.id,
                    uuid: quotes.uuid,
                    data: paginate(
                        paginator,
                        quotes.data.sort((a: QuoteTypes, b: QuoteTypes) => a.bestPriceSortIndex - b.bestPriceSortIndex )
                    ),
                    bestValue: find(quotes.data, ['bestPriceSortIndex', 0]),
                    quickest: find(quotes.data, ['quickestSortIndex', 0]),
                    total: quotes.total,
                    allQuotes: quotes.data,
                    marshQuoteResponse: quotes.marshQuoteResponse,
                    upsCapitalGenerateQuoteResponse: quotes.upsCapitalGenerateQuoteResponse,
                    insuranceInformation: quotes?.insuranceInformation,
                    accessorial: quotes?.accessorial
                }
            }
        };
    }

    if(topBarFilter.quickest){
        opt = {
            refetchOnWindowFocus: false,
            select: (quotes : any) => {
                return {
                    id: quotes.id,
                    uuid: quotes.uuid,
                    data: paginate(
                        paginator,
                        quotes.data.sort((a: QuoteTypes, b: QuoteTypes) => a.quickestSortIndex - b.quickestSortIndex )
                    ),
                    bestValue: find(quotes.data, ['bestPriceSortIndex', 0]),
                    quickest: find(quotes.data, ['quickestSortIndex', 0]),
                    total: quotes.total,
                    allQuotes: quotes.data,
                    marshQuoteResponse: quotes.marshQuoteResponse,
                    upsCapitalGenerateQuoteResponse: quotes.upsCapitalGenerateQuoteResponse,
                    insuranceInformation: quotes?.insuranceInformation,
                    accessorial: quotes?.accessorial
                }
            }
        };
    }

    return useQuery(["quotes", filters], () => fetchQuotes(filters, isInsuranceVal), opt)
}

function paginate(paginator: {perPage: number, page: number}, data: QuoteTypes[]){
    const dataChunks = chunk(data, paginator.perPage)
    return dataChunks[paginator.page -1];
}

async function fetchQuotes(filters: FilterFormTypes, isInsuranceVal:boolean) {
    const filterData =  mapFilterData(filters, isInsuranceVal)
    const response: any = await apiClient.post('freight-quote', filterData)
    const result:any = {
        id: response.id,
        uuid: response.uuid,
        data:response.data.items,
        total: response.data.items.length,
        marshQuoteResponse: response.data.marshQuoteResponse,
        upsCapitalGenerateQuoteResponse: response.data.upsCapitalGenerateQuoteResponse,
        insuranceTermsAndConditionsDocument: response.data.insuranceTermsAndConditionsDocument,
        allQuotes: [],
        insuranceInformation: filterData?.insuranceInformation,
    }
    result.accessorial = filters.accessorial
    return result
}

function mapFilterData(filters: FilterFormTypes, isInsuranceVal:boolean) {
    let mapData: any = {
        "acceptLtl": filters.acceptLtl,
        "acceptVolume": filters.acceptVolume,   
        "serviceTypes": filters.parcel_type,
        "originCountry": filters.origin_country.value,
        "originCity": filters.origin_city,
        "originState": filters.origin_state,
        "originAddressCode": filters.origin_post_code,
        "destinationCountry": filters.destination_country.value,
        "destinationCity": filters.destination_city,
        "destinationState": filters.destination_state,
        "destinationAddressCode": filters.destination_post_code,
        "stackType": "SINGLE",
        "insurance": isInsuranceVal,
        "pickupDate": filters.pickupDate,
        "accessorials": !filters.accessorial ? null : filters.accessorial.map(accessorial => accessorial.value),
        "freightItems": filters?.load_item?.map(load => {
            return {
                "dimensions": {
                    "length": load.dimension_length,
                    "width": load.dimension_width,
                    "height": load.dimension_height
                },
                "weight": load.weight,
                "measurementType": "IMPERIAL",
                "commodityDescription": load.commodity.label,
                "nmfcCode": load.commodity_nmfc,
                "classCode": load.class.value,
                "packageType": load.type.value,
                "numberOfUnits": load.units,
                "stackable": load.is_stackable,
                "hazmat":load.is_hazmat
            }
        }),
    }

    if(isInsuranceVal){
        mapData.insuranceInformation = {
            "commodityClientCode": filters.insurance_commodity?.value,
            "packingMethodClientCode": filters.insurance_package_category?.value,
            "coverageOptionClientCode": filters.insurance_coverage_client_code,
            "insuredValue": {
                "insuredValueCurrencyISO": "USD",
                "invoiceAmount": filters.insurance_amount,
                "insuredValueAmount": filters.insurance_amount,
            }
        }
    }
    
    return mapData
}