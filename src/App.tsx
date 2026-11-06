import { useEffect, useState } from 'react';
import { fetchAPOD } from './api';
import type {APOD} from './types';

export default function App(){
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<APOD[]>([]);

    useEffect(() => {
        const tg = (window as any).Telegram?.WebApp;
        if (tg) {
        tg.ready(); 
        tg.expand(); 
        }
    }, []);

    
    useEffect(() => {
        const now: Date = new Date()
        const pastDate: Date = new Date(now);

        const today: string = now.toISOString().slice(0,10);
        pastDate.setDate(now.getDate() - 10);
        const tenDaysAgo: string = pastDate.toISOString().slice(0, 10);

        async function loadData(){
            try{
                setLoading(true)
                const data = await fetchAPOD(tenDaysAgo, today);
                console.log("Ответ NASA:", data);
                setItems(data)
            }catch(error){
                console.error("Ошибка при загрузке:", error);
            }finally{
                setLoading(false)
            }
        }

        loadData()


    }, []);


  

    if (loading) return <p>Загрузка снимков NASA...</p>;

        return (
        <div>
            {items.map((item) => (
                <div key={item.date}>
                    <img src={item.hdurl || item.url} width="200" alt={item.title} />
                    <div className="card-content">
                        <h3>{item.title}</h3>
                        <p>{item.date}</p>
                    </div>
                </div>
            ))}
        </div>
        );
}