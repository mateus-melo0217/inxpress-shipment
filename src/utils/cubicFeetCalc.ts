import {roundFn} from "./round"

export const cubicFeetCalc = (length:number = 0 , width:number = 0, height:number = 0, weight:number) => {
    if(length && width && height && weight) return roundFn(weight/(length*width*height/1728))
    return 0 
}
    