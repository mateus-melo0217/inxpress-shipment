import InfoModal from "components/common/modal/InfoModal"
import { BsFillExclamationCircleFill } from "react-icons/bs"

interface PropTypes {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    content: string;
    contactInfo: {
        displayName: string;
        phone: string;
        email: string;
    }
}

export const QuoteErrorModal = ({showModal, setShowModal, title, content, contactInfo}: PropTypes) => {
    return (
        <div className="ml-10 text-sxl">
            <InfoModal showModal={showModal} setShowModal={setShowModal} title={title}>
                <div className="mx-[20px] text-center text-medium-gray">
                    <p>{content}</p>
                    <p className="mx-[20px] mt-6">Please try your quote again or contact your Freight Customer Service Representative</p>
                    <div className="text-left mt-6 text-black">
                       <span className="text-green-1 font-semibold">{contactInfo.displayName}</span>
                       <div>
                           <span className="font-semibold mr-4">Phone</span>
                           <span>{contactInfo.phone}</span>
                       </div>
                       <div>
                           <span className="font-semibold mr-6">Email</span>
                           <span>{contactInfo.email}</span>
                       </div>
                    </div>
                    <BsFillExclamationCircleFill color="red" size={25} className="absolute top-[-5%] left-[3%]"/>
                </div>
            </InfoModal>
          </div>
    )
}