export type FilterFormTypes = {
    parcel_type?: any;
    origin_country?: any;
    origin_state?: string;
    origin_city?: string;
    origin_post_code?: string;
    origin_address_id?: number;

    origin_address1?: string;
    origin_address2?: string;
    origin_companyName?: string;
    origin_contactName?: string;
    origin_email?: string;
    origin_phone?: string;

    destination_country?: any;
    destination_state?: string;
    destination_city?: string;
    destination_post_code?: string;
    destination_address_id?: number;

    destination_address1?: string;
    destination_address2?: string;
    destination_companyName?: string;
    destination_contactName?: string;
    destination_email?: string;
    destination_phone?: string;

    load_item?: [{
        dimension_length: string;
        dimension_width: string;
        dimension_height: string;

        weight: string;
        weight_unit: any;

        commodity: any;
        commodity_nmfc: string;

        class: any;
        type: any;
        units: number;
        is_stackable: boolean,
        is_hazmat: boolean,
    }];
    accessorial?: { value: string, label: string }[];
    insurance_commodity?: { value: string, label: string };
    insurance_package_category?: { value: string, label: string };
    insurance_coverage_option?: string;
    insurance_coverage_client_code?: string;
    insurance_amount?: number;
    pickupDate?: any;
    totalWeight?:any;
    linearFt?:any;
    acceptLtl?:any;
    acceptVolume?:any;
}