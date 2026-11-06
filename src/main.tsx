import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

console.log("MAIN.TSX УСПЕШНО ЗАГРУЗИЛСЯ");

createRoot(document.getElementById('root')!).render(<App />);