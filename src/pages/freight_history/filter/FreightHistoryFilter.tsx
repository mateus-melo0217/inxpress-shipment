import { useState, useEffect, useCallback } from "react";
import {TiTimes} from 'react-icons/ti';
import ButtonFilter from "components/forms/buttons/ButtonFilter";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { SubFilterBolProNumber } from "./sub-filters/SubFilterBolProNumber";
import { SubFilterQuoteNumber } from "./sub-filters/SubFilterQuoteNumber";
import { SubFilterReceiverName } from "./sub-filters/SubFilterReceiverName";
import { SubFilterReceiverAddress } from "./sub-filters/SubFilterReceiverAddress";
import { SubFilterDates } from "./sub-filters/SubFilterDates";
import { SubFilterCarrier } from "./sub-filters/SubFilterCarrier";
import { SubFilterServices } from "./sub-filters/SubFilterServices";
import { SubFilterShipmentPlace } from "./sub-filters/SubFilterShipmentPlace";
import { SubFilterStatus } from "./sub-filters/SubFilterStatus";
import { SubFilterAccessorials } from "./sub-filters/SubFilterAccessorials";
import { SubFilterSave } from "./sub-filters/SubFilterSave";
import { getArrayFromString, convertFreightFormData, convertQueryData } from "../../../utils/formatData";
import moment from "moment";
import { useCarriers, useServices, useStatus, useAccessorials, useFilters, useSaveFilter, useDeleteFilter, useFilterDatas } from "pages/freight_history/FreightHistoryQueries";

interface FilterProps  {
    openFilter?: Boolean;
    setFilterQuery: Function;
    setResetPaginator: Function;
}

type FilterFormTypes = {
    bolProNumber: string,
    byBolNumber: boolean,
    byProNumber: boolean,
    quoteNumber: string,
    receiverName: string,
    receiverAddress: string,
    serviceName: any,
    carrierName: any,
    saveName: string,
    statusName:any,
    accessorialsName:any
}

export type OtherOptionType = {
    label: string,
    active: boolean,
    key: string
}

const defaultValues = {

}

const initialDateVal = {
    dateFrom: moment().subtract(30, 'day').format('YYYY-MM-DD'),
    dateTo: moment().add(10, 'day').format('YYYY-MM-DD')
}

const initialExtraOptions = [
    {
        label: 'Display Insured Shipments',
        key: 'insuredShipment',
        active: false,
    },
    {
        label: 'Inspected Shipments',
        key: 'inspectedShipment',
        active: false,
    },
    {
        label: 'Hot Shipments',
        key: 'hotShipment',
        active: false,
    }
]

export const FreightHistoryFilter = ({openFilter = false, setFilterQuery, setResetPaginator}: FilterProps) => {
    const formMethods = useForm<FilterFormTypes>({
        defaultValues,
    });
    const [byBolNumber, setByBolNumber] = useState(true);
    const [tempDateVal, setTempDateVal] = useState(initialDateVal);
    const [otherOptions, setOtherOptions] = useState<Array<OtherOptionType>>(initialExtraOptions);
    const [resetFilter, setResetFilter] = useState(false);
    const [checked, setChecked] = useState(false)
    const [deletedState, setDeletedState] = useState(false);
    const [savedState, setSavedState] = useState(false);
    const { data: carriers } = useCarriers();
    const { data: services } = useServices();
    const { data: status} = useStatus();
    const { data: accessorials} = useAccessorials();
    const { data: filters} = useFilters();
    const [ filterName, setFilterName ] = useState("");   
    const [ filterId, setFilterId ] = useState(-1);
    const { data: filterDatas } = useFilterDatas(filterName);
    const { mutate: saveFilter } = useSaveFilter();
    const { mutate: deleteFilter } = useDeleteFilter();
    
    const onSubmit: SubmitHandler<FilterFormTypes> = (data: any) => {
        if (byBolNumber) {
            data.byBolNumber = true;
            data.byProNumber = false;
        } else {
            data.byBolNumber = false;
            data.byProNumber = true;
        }

        data.dateFrom = tempDateVal.dateFrom;
        data.dateTo = tempDateVal.dateTo;

        if (otherOptions.length) {
            data.extraOption = otherOptions
        }
        setResetPaginator(true);
        setFilterQuery(data);
    };

    const clearSelection = () => {
        formMethods.reset();
        setTempDateVal(initialDateVal)
        setOtherOptions(initialExtraOptions)
        setResetFilter(true);
        setFilterId(-1);
        setFilterName("");
    }

    const getFilterData = (name:string, index:number) => {
        clearSelection();
        setFilterName(name);
        setFilterId(index);
    }
    
    const onDeleteFilter = (id:any) =>{
        setDeletedState(true);
        deleteFilter(id);
    }

    const onSaveFilter = (data:any) => {
        if(formMethods.getValues().saveName) {
            saveFilter(data);
            setSavedState(true)
        }
    } 

    const onFilter = () => {
      const filterData = convertQueryData({...formMethods.getValues(), "byBolNumber":byBolNumber, "dateFrom":tempDateVal.dateFrom, "dateTo":tempDateVal.dateTo})
      setFilterQuery(filterData);
      setResetPaginator(true);
    }

    const populateAll = useCallback((datas:any) =>{
        formMethods.setValue("bolProNumber", datas?.bolProNumber==null?"":datas?.bolProNumber);
        formMethods.setValue("byBolNumber", datas?.byBolNumber);
        formMethods.setValue("byProNumber", datas?.byProNumber);
        formMethods.setValue("quoteNumber", datas?.quoteNumber);
        formMethods.setValue("receiverName", datas?.receiverName);
        formMethods.setValue("receiverAddress", datas?.receiverAddress);
        formMethods.setValue("carrierName", getArrayFromString(datas?.carriers));
        formMethods.setValue("serviceName", getArrayFromString(datas?.services));
        formMethods.setValue("statusName", getArrayFromString(datas?.status));
        formMethods.setValue("accessorialsName", getArrayFromString(datas?.accessorials));
        formMethods.setValue("saveName", datas?.filterName);
        if(datas?.dateTo && datas?.dateFrom) setTempDateVal({ dateFrom:moment(datas.dateFrom).format('YYYY-MM-DD'), dateTo:moment(datas.dateTo).format('YYYY-MM-DD')});
    },[formMethods, setTempDateVal]);
    
    const OnFilterDatas = (filterName:string, i:number, index:number) =>{
        if(filterId===i) return;
        getFilterData(filterName, i);
    }

    useEffect(()=>{
        populateAll(filterDatas);
    },[filterDatas, filterName, populateAll]);

   
    useEffect(()=>{
        if(filters?.length){
            if(savedState){ 
                setFilterId(filters.length-1);
                setFilterName(filters[filters.length-1].filterName);
                setSavedState(false)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filters]);

    useEffect(()=>{
        if(filters?.length){
            if(deletedState){
                setFilterId(-1);
                setFilterName("");
                setDeletedState(false);
            }
        }
    },[filters, deletedState]);

    useEffect(() => {
       setFilterId(-1);
       setFilterName("");
    }, []);

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-y-16" onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={`transition-all duration-200 absolute top-0 w-[25%] rounded-tl-2xl bg-white overflow-y-scroll h-full ${openFilter ? 'left-0 mr-1' : '-left-[80%]'}`}>
                    <div className="border-x border-b">
                        <div className="w-full bg-lightest-gray uppercase text-center font-extrabold py-[3.3rem] text-blue-1 rounded-tl-2xl">
                            search filter shipments
                        </div>
                        <div className="px-10">
                            <p className="text-3xl font-bold my-4">Saved searches : </p>
                            <div className="flex flex-wrap text-white">
                                    {filters?.map((id:any, i:number)=>
                                        <div key={i} className={`relative text-center px-[8px] py-[4px] rounded-full cursor-pointer m-2 ${filterId===i? 'bg-green-1': 'bg-green-2'}`}>
                                        <span className="py-2 px-4 mr-[20px] mx-2" onClick={()=>OnFilterDatas(id.filterName, i, filterId)}>{id.filterName}</span>
                                        <button className="absolute right-[3px] top-1/2 translate-y-[-50%] hover:text-red-1" onClick={()=>onDeleteFilter(id.filterName)} type="button">
                                            <TiTimes />
                                        </button>
                                         
                                        </div>
                                    )}
                            </div>
                            <div className="flex justify-between">
                                <ButtonFilter
                                    className={`uppercase p-5 rounded-lg text-sbase flex justify-center items-center bg-red-1 text-white w-[42%] mt-6 mb-10 font-medium`}
                                    label="clear selection"
                                    onClick={clearSelection}
                                />
                                <ButtonFilter
                                    className={`uppercase p-5 rounded-lg text-sbase flex justify-center items-center bg-green-1 text-white w-[42%] mt-6 mb-10 font-medium`}
                                    label="apply filters"
                                    onClick={onFilter}
                                    disabled={typeof filterName==typeof undefined}
                                />
                            </div>
                        </div>

                        <SubFilterBolProNumber formMethods={formMethods} byBolNumber={byBolNumber} setByBolNumber={setByBolNumber} />
                        <SubFilterQuoteNumber formMethods={formMethods} />
                        <SubFilterReceiverName formMethods={formMethods} />
                        <SubFilterReceiverAddress formMethods={formMethods} />
                        <SubFilterDates tempDateVal={tempDateVal} setTempDateVal={setTempDateVal}/>
                        <SubFilterCarrier carriers={carriers} formMethods={formMethods} resetFilter={resetFilter} setResetFilter={setResetFilter} />
                        <SubFilterServices services={services} formMethods={formMethods} resetFilter={resetFilter} setResetFilter={setResetFilter} />
                        <SubFilterShipmentPlace />
                        <SubFilterStatus status={status} formMethods={formMethods} resetFilter={resetFilter} setResetFilter={setResetFilter} />
                        <SubFilterAccessorials accessorials={accessorials} formMethods={formMethods} resetFilter={resetFilter} setResetFilter={setResetFilter} />
                        <SubFilterSave setChecked={setChecked} checked={checked}/>

                        <div className="flex justify-between px-10">
                            <ButtonFilter
                                className={`uppercase p-5 rounded-lg text-sbase flex justify-center items-center bg-red-1 text-white w-[42%] mt-6 mb-10 font-medium`}
                                label="clear selection"
                                onClick={clearSelection}
                            />
                            <ButtonFilter
                                className={`uppercase p-5 rounded-lg text-sbase flex justify-center items-center bg-green-1 text-white w-[42%] mt-6 mb-10 font-medium`}
                                label="save and apply filters"
                                type="submit"
                                disabled = {!checked} 
                                onClick={()=>onSaveFilter(convertFreightFormData({...formMethods.getValues(), "byBolNumber":byBolNumber, "dateFrom":tempDateVal.dateFrom, "dateTo":tempDateVal.dateTo}))}
                            />
                        </div>
                    </div>
                    
                </div>
            </form>
        </FormProvider>
    )
}