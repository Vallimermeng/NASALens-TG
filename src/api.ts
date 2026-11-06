import type { APOD } from './types';



export async function fetchAPOD(startDate: string, endDate: string){ 
    const url = `https://science.nasa.gov/wp-json/wp/v2/apod-basic?start_date=${startDate}&end_date=${endDate}`;
    const response = await fetch(url);
    if (!response.ok){
        throw new Error("Ошибка сети")
    }
    const data: APOD[] = await response.json();
    return data as APOD[]
    
}