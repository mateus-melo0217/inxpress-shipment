import { useState } from "react";
import ButtonQuote from "components/forms/buttons/ButtonQuote";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { SubFilterQuote } from "./sub-filters/SubFilterQuote";
import { SubFilterDates } from "./sub-filters/SubFilterDates";
import { SubFilterCarrier } from "./sub-filters/SubFilterCarrier";
import { SubFilterServices } from "./sub-filters/SubFilterServices";
import { SubFilterShipmentPlace } from "./sub-filters/SubFilterShipmentPlace";
import moment from "moment";
import { useCarriers, useServices } from "pages/saved_quotes/SavedQuotesQueries";

interface FilterProps  {
    openFilter?: Boolean;
    setFilterQuery: Function;
    setResetPaginator: Function;
}

type FilterFormTypes = {
    quoteNumber: string,
    receiverName: string,
    receiverAddress: string,
    carrier: any,
    service: any,
}

const defaultValues = {

}

const initialDateVal = {
    dateFrom: moment().subtract(30, 'day').format('YYYY-MM-DD'),
    dateTo: moment().add(10, 'day').format('YYYY-MM-DD')
}

export const SavedQuotesFilter = ({openFilter = false, setFilterQuery, setResetPaginator}: FilterProps) => {
    const formMethods = useForm<FilterFormTypes>({
        defaultValues,
    });
    const [tempDateVal, setTempDateVal] = useState(initialDateVal);
    const [resetFilter, setResetFilter] = useState(false);
    const onSubmit: SubmitHandler<FilterFormTypes> = (data: any) => {
        data.dateFrom = tempDateVal.dateFrom;
        data.dateTo = tempDateVal.dateTo;
        setResetPaginator(true);
        setFilterQuery(data);
    };

    const clearSelection = () => {
        formMethods.reset();
        setTempDateVal(initialDateVal)
        setResetFilter(true)
    }
    const { data: carriers } = useCarriers();
    const { data: services } = useServices();

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-y-16" onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className={`pb-[100px] transition-all duration-200 absolute top-0 w-[25%] rounded-tl-2xl bg-white overflow-y-scroll h-full ${openFilter ? 'left-0 mr-1' : '-left-[80%]'}`}>
                    <div className="border-x border-b">
                        <div className="w-full bg-lightest-gray uppercase text-center font-extrabold py-[3.3rem] text-blue-1 rounded-tl-2xl">
                            search filter shipments
                        </div>
                        <div className="flex justify-between px-10">
                            <ButtonQuote
                                className={`uppercase p-5 rounded-lg text-sbase flex justify-center items-center bg-red-1 text-white w-[42%] mt-6 mb-10 font-medium`}
                                label="clear selection"
                                onClick={clearSelection}
                            />
                            <ButtonQuote
                                className={`uppercase p-5 rounded-lg text-sbase flex justify-center items-center bg-green-1 text-white w-[42%] mt-6 mb-10 font-medium`}
                                label="apply filters"
                                type="submit"
                            />
                        </div>

                        <SubFilterQuote formMethods={formMethods} />
                        <SubFilterDates tempDateVal={tempDateVal} setTempDateVal={setTempDateVal}/>
                        <SubFilterCarrier carriers={carriers} formMethods={formMethods} resetFilter={resetFilter} setResetFilter={setResetFilter} />
                        <SubFilterServices services={services} formMethods={formMethods} resetFilter={resetFilter} setResetFilter={setResetFilter} />
                        <SubFilterShipmentPlace />

                        <div className="flex justify-between px-10">
                            <ButtonQuote
                                className={`uppercase p-5 rounded-lg text-sbase flex justify-center items-center bg-red-1 text-white w-[42%] mt-6 mb-10 font-medium`}
                                label="clear selection"
                                onClick={clearSelection}
                            />
                            <ButtonQuote
                                className={`uppercase p-5 rounded-lg text-sbase flex justify-center items-center bg-green-1 text-white w-[42%] mt-6 mb-10 font-medium`}
                                label="apply filters"
                                type="submit"
                            />
                        </div>
                    </div>
                    
                </div>
            </form>
        </FormProvider>
    )
}