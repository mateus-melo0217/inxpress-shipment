export enum EShipmentNoteType {
    MANUALLY_ENTERED = 'MANUALLY_ENTERED'
}

type TShipmentNoteType = `${EShipmentNoteType}`

export interface IShipmentNote {
    id: number,
    shipmentId: number,
    shipperId: number,
    title: string,
    message: string,
    createdDate: string,
    createdBy: string,
    editable: boolean,
    noteType: TShipmentNoteType,
    public: boolean,
    attachment: string | null,
}

export interface IShipmentNoteData {
    id?: number,
    shipmentId: number | null,
    title: string,
    message: string,
    public: string
    file?: FileList
}