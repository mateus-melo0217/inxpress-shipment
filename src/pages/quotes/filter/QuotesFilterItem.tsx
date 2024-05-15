interface ItemProps {
    label?: string;
    activated?: Boolean | null;
    setActive?: any;
}

export const QuotesFilterItem = ({ label, activated = false, setActive }: ItemProps) => {
    return (
        <div className={`cursor-pointer text-sbase rounded-3xl px-4 py-2 w-fit mt-4 ${activated ? 'bg-green-1 text-white' : 'bg-disabled-gray text-light-gray'}`} onClick={setActive}>{label}</div>
    )
}