import { MdBookmarks } from 'react-icons/md';

interface FilterByQuoteNumber {
  formMethods: any;
}

export const SubFilterQuoteNumber = ({ formMethods }: FilterByQuoteNumber) => {
  return (
    <>
      <div className='flex items-center w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 pl-10 space-x-4'>
        <MdBookmarks size='1.5em' />
        <div>Quote Number</div>
      </div>
      <div className='flex justify-center px-10 py-10'>
        <input
          className='border border-solid border-border-gray rounded-lg w-full py-7 pl-4'
          placeholder='Write the value'
          {...formMethods.register('quoteNumber')}
        />
      </div>
    </>
  );
};
