import { useState, useEffect } from 'react';
import TargetCursor from './Cursor';
import './Button.css';
import Neo from './NeoWs.jsx';
import Loading from './Loading'; // ⬅️ NEW: Import the Loader component

const API_KEY = 'ta9g2hpjIn0cBsLfPGVaPny9VWLP7jIkRGo3FJfn'; // Replace with your NASA API key

export default function Apod() {
    const [apod, setApod] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [showIntro, setShowIntro] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleProceed = () => {
        setFadeOut(true);
        setTimeout(() => setShowIntro(false), 1000);
    };

    const fetchAPOD = async (selectedDate) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}&thumbs=true`
            );
            if (!res.ok) throw new Error('Failed to fetch APOD');
            const data = await res.json();
            setApod(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAPOD(date);
    }, [date]);

    // Conditional rendering for navigation/intro is checked first
    if (!showIntro) {
        return <Neo />;
    }

    // ⬅️ CONDITIONAL RENDERING for Loading/Error is moved here for clarity
    let content;

    if (loading) {
        content = <Loading />; // ⬅️ Show your custom animation while loading
    } else if (error) {
        content = (
            <div className="bg-red-900/50 border border-red-500 rounded p-4 text-center">
                <p>Error fetching data: {error}</p>
                <button
                    onClick={() => fetchAPOD(date)}
                    className="mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                    Retry
                </button>
            </div>
        );
    } else if (apod) {
        // Render the APOD data once loaded
        content = (
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                {/* Your APOD content rendering logic goes here */}
                <div className="relative">
                    {/* Media Display Logic */}
                    {apod.media_type === 'video' ? (
                        <div className="aspect-video">
                            <iframe src={apod.url} title={apod.title} className="w-full h-full" allowFullScreen />
                        </div>
                    ) : (
                        <img src={apod.url} alt={apod.title} className="w-full h-auto" />
                    )}
                </div>
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{apod.title}</h2>
                    <div className="flex gap-4 text-sm text-gray-400 mb-4">
                        <span>{apod.date}</span>
                        {apod.copyright && <span>© {apod.copyright}</span>}
                    </div>
                    <p className="text-gray-300 leading-relaxed">{apod.explanation}</p>
                    {apod.hdurl && (
                        <a href={apod.hdurl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition">
                            View HD Image
                        </a>
                    )}
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <TargetCursor spinDuration={3} hideDefaultCursor={true} parallaxOn={true} />
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-2">🌌 Astronomy Picture of the Day</h1>
                {/* <button
                    className="continue-button"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleProceed}
                >
                    {!isHovered ? "Let's GO!" : 'Continue'}
                </button> */}
                <p className="text-gray-400 text-center mb-6">NASA APOD Viewer</p>

                <div className="flex justify-center mb-6">
                    <input
                        type="date"
                        value={date}
                        max={new Date().toISOString().split('T')[0]}
                        min="1995-06-16"
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                    />
                </div>

                {/* ⬅️ Render the content variable (Loader, Error, or APOD Data) */}
                {content}

            </div>
        </div>
    );
}