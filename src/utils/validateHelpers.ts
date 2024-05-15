import { InputSchema } from 'utils/constants/Interfaces';

export const validationLinearFt = (data:any) =>{
    let isValid = true;
    for(let i in data){
        if(!data[i].units || !data[i].dimension_length) isValid = false;
    }
    return isValid;    
}

export const validateEmail = (email: string): boolean => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null;
};

export const isUSPostcodeFormat = (input: string): boolean =>  {
  const pattern = /^\d{5}(-\d{4})?$/;
  return pattern.test(input);
}

export const isCanadaPostcodeFormat = (input: string): boolean =>  {
  const pattern = /^[A-Za-z0-9]{6}$|^\d{3}\s\d{3}$|^\d{3}\s[A-Za-z0-9]{3}$/;
  return pattern.test(input);
}

export const moveScroll = (inputData: InputSchema[], windowId: string) => {
  inputData.forEach(({ id }) => {
    const modalWindow = document.getElementById(windowId);
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (input?.value === '') {
      const inputRect = input!.getBoundingClientRect(); // Use non-null assertion operator
      const scrollTop = document.documentElement.scrollTop;
      const center = (windowId ? (modalWindow!.clientHeight / 2) : (window.innerHeight /2)) - (inputRect.height / 2); // Use clientHeight
      if(windowId){
        modalWindow!.scrollTo({ top: scrollTop + inputRect.top - center, behavior: 'smooth' }); // Use clientHeight
      }
      else{
        window.scrollTo({ top: scrollTop + inputRect.top - center, behavior: 'smooth' }); // Use clientHeight
      }
      return;
    }
  });
}