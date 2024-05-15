export type QuoteTypes = {
    id: number,
    carrierId: number,
    carrierName: string,
    carrierLogo: string,
    tariffId: number,
    tariffDescription: string,
    tariffOwner: string,
    isBlueGrace: boolean,
    accountNumber: string,
    price: number,
    quoteNumber: string,
    transitTime: string,
    specialInstructions: string;
    originPhone: string,
    destinationPhone: string,
    message: string,
    providerId: number,
    providerQuoteId: string,
    providerQuoteItemId: string,
    quickestSortIndex: number,
    bestPriceSortIndex: number,
    isChecked?: boolean,
    markupToApply: any,
    accessorials: Accessorial[],
    displayPriceWithoutAccessorials: number,
    serviceType: string,
    displayPrice: string,
    baseRate: number
};

type Accessorial = {
    code: string,
    description: string,
    displayChargeAmount: string,
}; 
