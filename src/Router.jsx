import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import App from './Welcome';
import Apod from './APOD';
import Neo from './NeoWs.jsx';
import Donki from './DONKI.jsx';
import Select from './Select.jsx';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/select" element={<Select />} />
                <Route path="/apod" element={<Apod />} />
                <Route path="/neows" element={<Neo />} />
                <Route path="/donki" element={<Donki />} />
            </Routes>
        </BrowserRouter>
    );
}
