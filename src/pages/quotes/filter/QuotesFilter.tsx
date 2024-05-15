import { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import ButtonFilter from "components/forms/buttons/ButtonFilter";
import { SubFilterDates } from "./sub-filters/SubFilterDates";
import { SubFilterSave } from "./sub-filters/SubFilterSave";
import { convertQuotesFormData, convertQueryData } from "utils/formatData";
import { useFilters, useSaveFilter, useDeleteFilter, useFilterDatas } from "pages/quotes/QuotesQueries";
import {TiTimes} from 'react-icons/ti';
import moment from "moment";

interface FilterProps  {
    openFilter?: Boolean;
    setFilterQuery: Function;
    setResetPaginator: Function;
}

type FilterFormTypes = {
    saveName:string,
    createDateFrom:string,
    createDateTo:string,
    startDateFrom:string,
    startDateTo:string,
    endDateFrom:string,
    endDateTo:string,
}

export type OtherOptionType = {
    label: string,
    active: boolean,
    key: string
}

const defaultValues = {}

const initialDateVal = {
    dateFrom: moment().subtract(30, 'day').format('YYYY-MM-DD'),
    dateTo: moment().add(10, 'day').format('YYYY-MM-DD')
}

export const QuotesFilter = ({openFilter = false, setFilterQuery, setResetPaginator}: FilterProps) => {
    const formMethods = useForm<FilterFormTypes>({
        defaultValues,
    });
    const [tempCreateDateVal, setTempCreateDateVal] = useState(initialDateVal);
    const [tempStartDateVal, setTempStartDateVal] = useState(initialDateVal);
    const [tempEndDateVal, setTempEndDateVal] = useState(initialDateVal);
    const [checked, setChecked] = useState(false)
    const [deletedState, setDeletedState] = useState(false);
    const [savedState, setSavedState] = useState(false);
    const { data: filters} = useFilters();
    const [ filterName, setFilterName ] = useState("");   
    const [ filterId, setFilterId ] = useState(-1);
    const { data: filterDatas } = useFilterDatas(filterName);
    const { mutate: saveFilter } = useSaveFilter();
    const { mutate: deleteFilter } = useDeleteFilter();
    
    const onSubmit: SubmitHandler<FilterFormTypes> = (data: any) => {
        data.creatDateFrom = tempCreateDateVal.dateFrom;
        data.creatDateTo = tempCreateDateVal.dateTo;
        data.startDateFrom = tempStartDateVal.dateFrom;
        data.startDateTo = tempStartDateVal.dateTo;
        data.endDateFrom = tempEndDateVal.dateFrom;
        data.endDateTo = tempEndDateVal.dateTo;
        
        setResetPaginator(true);
        setFilterQuery(data);
    };

    const clearSelection = () => {
        formMethods.reset();
        setTempCreateDateVal(initialDateVal)
        setTempStartDateVal(initialDateVal)
        setTempEndDateVal(initialDateVal)
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
        saveFilter(data);
        setSavedState(true)
    } 

    const onFilter = () => {
      const filterData = convertQueryData({...formMethods.getValues(), "dateFrom":tempCreateDateVal.dateFrom, "dateTo":tempCreateDateVal.dateTo})
      setFilterQuery(filterData);
    }

    const populateAll = useCallback((datas:any) =>{
        formMethods.setValue("saveName", datas?.filterName);
        if(datas?.dateTo && datas?.dateFrom) setTempCreateDateVal({ dateFrom:moment(datas.dateFrom).format('YYYY-MM-DD'), dateTo:moment(datas.dateTo).format('YYYY-MM-DD')});
    },[formMethods, setTempCreateDateVal]);
    
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

                        <SubFilterDates tempDateVal={tempCreateDateVal} setTempDateVal={setTempCreateDateVal} type='create'/>
                        <SubFilterDates tempDateVal={tempStartDateVal} setTempDateVal={setTempStartDateVal} type='start'/>
                        <SubFilterDates tempDateVal={tempEndDateVal} setTempDateVal={setTempEndDateVal} type='end'/>
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
                                onClick={()=>{
                                    if(formMethods.getValues().saveName) {
                                        onSaveFilter(convertQuotesFormData({
                                            ...formMethods.getValues(),
                                            "createDateFrom":tempCreateDateVal.dateFrom, "createDateTo":tempCreateDateVal.dateTo,
                                            "startDateFrom":tempStartDateVal.dateFrom, "startDateTo":tempStartDateVal.dateTo,
                                            "endDateFrom":tempEndDateVal.dateFrom, "endDateTo":tempEndDateVal.dateTo
                                        }))
                                    }}
                                }
                            />
                        </div>
                    </div>
                    
                </div>
            </form>
        </FormProvider>
    )
}