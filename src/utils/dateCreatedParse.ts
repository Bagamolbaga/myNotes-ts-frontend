export const dateCreatedParse = (date: string) => {
    const arr = date.split(/-|T/)   //  >>  ['2022', '04', '07', '14:27:47.509Z']
    console.log(arr);
    
    return `${arr[2]}.${arr[1]}.${arr[0].split('').slice(-2).join('')}`     //  >>  '07.04.22'
}