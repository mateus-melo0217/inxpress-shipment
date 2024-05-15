export const ShipmentNoteFormDefaultValues = (row: any) => {
    return {
        shipmentId: row?.original?.shipmentId,
        title: '',
        message: '',
        public: 'false',
    }
}