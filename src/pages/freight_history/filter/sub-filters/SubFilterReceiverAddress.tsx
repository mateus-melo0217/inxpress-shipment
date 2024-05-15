import { ImUser } from "react-icons/im"

export const SubFilterReceiverAddress = ({formMethods}: any) => {
    return (
        <>
            <div className="flex items-center w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 pl-10 space-x-4">
                <ImUser size='1.5em'/>
                <div>receiver address</div>
            </div>
            <div className="flex justify-center px-10">
                <input type="text" className="border border-solid border-border-gray rounded-lg w-full py-7 pl-4 my-10" placeholder="Address" {...formMethods.register('receiverAddress')}/>
            </div>
        </>
    )
}