import { Dispatch, SetStateAction } from 'react';

type PropTypes = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title?: string;
  children: string | JSX.Element | JSX.Element[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function ErrorModal({
  showModal,
  setShowModal,
  title,
  children,
  ...rest
}: PropTypes) {
  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none' {...rest}>
            <div className='relative w-auto my-6 mx-auto max-w-5xl px-5 py-4'>
              {/*content*/}
              <div className='border-2 border-medium-gray rounded-smd p-8 shadow-black shadow-md relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='items-start justify-between p-5 rounded-t'>
                  {title && (
                    <h2 className='text-4xl text-center text-medium-gray'>
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
                <div className='relative p-6 flex-auto'>{children}</div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
