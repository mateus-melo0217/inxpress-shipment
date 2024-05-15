import {useState, useEffect} from "react";
import {Breadcrumb} from "components/common/breadcrumb/Breadcrumb";
import {FilterForm} from "./filter_form/FilterForm";
import {QuotesResult} from "./quotes/QuotesResult";
import {isEmpty} from "lodash";
import {FilterFormTypes} from "./filter_form/FilterFormTypes";
import { useParams} from "react-router-dom";
import ApiClient from "utils/apiClient";
import { QuoteErrorModal } from "./quotes/QuoteErrorModal";

interface ContactInfo {
    id: number;
    displayName: string;
    email: string;
    phone: string;
    fax: string;
    langCode: string;
    status: boolean;
    freightContactDepartmentName: string;
}

export const GetPricing = () => {
    const [filters, setFilters] = useState<FilterFormTypes>({});
    const [bolAddressBeforeReQuote, setBolAddressBeforeReQuote] = useState();
    let { dataId } = useParams();
    const [addressUpdInfo, setAddressUpdInfo] = useState<any>(null);
    const [openQuoteResult, setOpenQuoteResult] = useState<boolean>(true);
    const [isRestricted, setIsRestricted] = useState({
        status: false,
        case: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        displayName: '',
        phone: '',
        email: ''
    });

    const [isAddedBookInfo, setIsAddedBookInfo] = useState(false);
    const [isInsuranceVal, setIsInsuranceVal] = useState(false);

    const fetchContactInfo = async ():Promise<ContactInfo> => {
        const {data} = await ApiClient.get('freight-customer/sale-rep-contact');
        return data
    }

    useEffect(() => {
        if (showModal) {
            fetchContactInfo().then((contactData) => {
                setContactInfo((prevData) => ({
                    ...prevData,
                    displayName: contactData.freightContactDepartmentName,
                    email: contactData.email,
                    phone: contactData.phone
                }))
            })
        }
    }, [showModal])

    useEffect(() => {  
        if(!isEmpty(filters)){
            setIsAddedBookInfo(false)
        }
    }, [filters]);

    return (
        <div className="quote">
            <Breadcrumb title="Get pricing"/>
            <FilterForm {...{setFilters, dataId, addressUpdInfo, setOpenQuoteResult, setIsRestricted, setShowModal, isAddedBookInfo, setIsAddedBookInfo, setIsInsuranceVal }}/>
            {isRestricted.status && <QuoteErrorModal showModal={showModal} setShowModal={setShowModal} title="Restricted Area" content={isRestricted.case} contactInfo={contactInfo}/>}
            {!isRestricted && !isEmpty(filters)
                && openQuoteResult && <QuotesResult {...{filters, setFilters, setAddressUpdInfo, contactInfo, bolAddressBeforeReQuote, setBolAddressBeforeReQuote, isInsuranceVal}}/>
            }
        </div>
    )
}