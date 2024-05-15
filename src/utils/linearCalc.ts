const stackableCalc = (units:number, length:number) =>{
    const val = ((units/2)*length)/12;
    return val;
}

export const linearCalc = (data:any) =>
    data.reduce( 
        (previousValue: any, currentValue: any) =>
            previousValue + (
                stackableCalc(Number(currentValue.units), Number(currentValue.dimension_length))
            )
    , 0);




