export interface IFilterQuery {
    quoteNumber?: string | null,
    receiverName? : string | null,
    serviceName: [] | undefined,
    statusName?: [] | undefined,
    receiverAddress?: string | null,
    dateFrom: string,
    dateTo: string,
    carrierName: [] | undefined
}