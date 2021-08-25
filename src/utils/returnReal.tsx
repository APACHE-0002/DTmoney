

interface valueProps{
    value: number;
}

export function ReturnReal({value}:valueProps){
    return(
        <>
        {new Intl.NumberFormat('pr-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)}
        </>
    )
}