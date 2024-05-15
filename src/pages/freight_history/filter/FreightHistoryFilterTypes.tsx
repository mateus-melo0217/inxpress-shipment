export interface IFilterQuery {
    byBolNumber: boolean,
    byProNumber: boolean,
    bolNumber?: number | null,
    proNumber?: number | null,
    bolProNumber?: string | null,
    quoteNumber? : string | null | undefined,
    receiverName? : string | null,
    serviceName: [] | undefined,
    statusName?: [] | undefined,
    accessorialsName?: [] | undefined,
    receiverAddress?: string | null,
    dateFrom: string,
    dateTo: string,
    carrierName: [] | undefined,
    extraOption?: [] | undefined
}