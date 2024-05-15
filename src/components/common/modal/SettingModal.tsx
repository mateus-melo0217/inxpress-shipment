import { Dispatch, SetStateAction } from 'react';
import { FaCheckCircle } from "react-icons/fa";

type PropTypes = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  title?: string;
  children: string | JSX.Element | JSX.Element[];
  exWrappeCls?: string;
  exContentCls?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function DefaultSettingModal({
  showModal,
  setShowModal,
  setIsSubmitting,
  title,
  children,
  exWrappeCls,
  exContentCls,
  ...rest
}: PropTypes) {

  const onSave = () => {
    setIsSubmitting(true);
    setShowModal(false);
  }

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none' {...rest}>
            <div className={`relative flex justify-center w-full my-6 mx-auto px-5 py-4`}>
              {/*content*/}
              <div className={`rounded-lg p-8 shadow-black shadow-md relative flex flex-col w-1/3 bg-white outline-none focus:outline-none ${exWrappeCls}`}>
                {/*header*/}
                <div className='items-start justify-between px-5 py-3 rounded-t border-b-[2px] border-[#b4b4b3]'>
                  {title && (
                    <h2 className='text-4xl font-bold'>
                      {title}
                    </h2>
                  )}
                  <button
                    className='absolute top-[10px] right-[10px] p-1 ml-auto border-0 text-medium-gray float-right font-semibold'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='text-medium-gray h-6 w-6 text-5xl block'>
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className={`relative p-6 flex-auto ${exContentCls}`}>{children}</div>
                <div className='flex justify-end'>
                  <div className='py-2 px-8'>
                    <button
                      className='bg-[#64ac38] text-white rounded-md px-8 py-2'
                      onClick={() => onSave()}
                    >
                      <span className='flex items-center gap-[5px]'>
                        <FaCheckCircle color='white'/> Save Changes
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
