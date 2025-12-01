import { useState, useEffect } from 'react';
import TargetCursor from './Cursor';
import './Button.css';
import Donki from './DONKI.jsx';
import Loading from './Loading'; // ⬅️ NEW: Import the Loader component

const API_KEY = 'ta9g2hpjIn0cBsLfPGVaPny9VWLP7jIkRGo3FJfn'; // Replace with your NASA API key

export default function Neo() {
    const [view, setView] = useState('feed');
    // Note: setting initial loading to true for the first data fetch on component mount
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [showIntro, setShowIntro] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleProceed = () => {
        setFadeOut(true);
        setTimeout(() => setShowIntro(false), 1000);
    };

    if (!showIntro) {
        return <Donki />;
    }

    // Feed parameters
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    );

    // Lookup parameter
    const [asteroidId, setAsteroidId] = useState('3542519');

    // --- Data Fetching Functions (No change here, they correctly set setLoading(true/false) ---

    const fetchFeed = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
            );
            if (!res.ok) throw new Error('Failed to fetch asteroid feed');
            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchLookup = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${API_KEY}`
            );
            if (!res.ok) throw new Error('Failed to fetch asteroid details');
            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchBrowse = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`
            );
            if (!res.ok) throw new Error('Failed to browse asteroids');
            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Trigger initial fetch when the component mounts or view changes to browse
    useEffect(() => {
        if (view === 'feed' && !data) {
            // ⬅️ Run initial fetch for 'feed' view (assuming this is the default initial data)
            fetchFeed();
        } else if (view === 'browse') {
            fetchBrowse();
        }
    }, [view]);


    // --- Render Functions (renderFeedResults, renderLookupResults, renderBrowseResults) remain unchanged ---

    // ... (renderFeedResults, renderLookupResults, renderBrowseResults functions go here) ...
    // Note: I am omitting the bodies of render functions for brevity, assume they are pasted here.

    // --- START of render functions (for completeness) ---

    const renderFeedResults = () => {
        if (!data?.near_earth_objects) return null;

        const allAsteroids = [];
        Object.entries(data.near_earth_objects).forEach(([date, asteroids]) => {
            asteroids.forEach(a => allAsteroids.push({ ...a, approach_date: date }));
        });

        return (
            <div className="space-y-4">
                <TargetCursor spinDuration={3} hideDefaultCursor={true} parallaxOn={true} />
                {/* <button
                    className="continue-button"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleProceed}
                >
                    {!isHovered ? "Let's GO!" : 'Continue'}
                </button> */}
                <div className="bg-blue-900/30 border border-blue-500 rounded p-4 mb-4">
                    <p className="text-sm">
                        <strong>Total Count:</strong> {data.element_count} asteroids found
                    </p>
                </div>
                {allAsteroids.map(asteroid => (
                    <div key={asteroid.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-blue-400">{asteroid.name}</h3>
                            {asteroid.is_potentially_hazardous_asteroid && (
                                <span className="bg-red-600 text-xs px-2 py-1 rounded">⚠️ Hazardous</span>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                            <p><strong>ID:</strong> {asteroid.id}</p>
                            <p><strong>Approach Date:</strong> {asteroid.approach_date}</p>
                            <p><strong>Diameter:</strong> {asteroid.estimated_diameter?.meters?.estimated_diameter_min?.toFixed(0)} - {asteroid.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(0)} m</p>
                            <p><strong>Velocity:</strong> {parseFloat(asteroid.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour).toFixed(0)} km/h</p>
                            <p><strong>Miss Distance:</strong> {parseFloat(asteroid.close_approach_data?.[0]?.miss_distance?.kilometers).toFixed(0)} km</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderLookupResults = () => {
        if (!data) return null;

        return (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                {/* <TargetCursor spinDuration={3} hideDefaultCursor={true} parallaxOn={true} /> */}
                {/* <button
                    className="continue-button"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleProceed}
                >
                    {!isHovered ? "Let's GO!" : 'Continue'}
                </button> */}
                <h2 className="text-2xl font-bold text-blue-400 mb-4">{data.name}</h2>
                <div className="space-y-3 text-gray-300">
                    <p><strong>NASA JPL ID:</strong> {data.id}</p>
                    <p><strong>Designation:</strong> {data.designation}</p>
                    <p><strong>Absolute Magnitude:</strong> {data.absolute_magnitude_h}</p>
                    <p><strong>Potentially Hazardous:</strong> {data.is_potentially_hazardous_asteroid ? '⚠️ Yes' : '✓ No'}</p>

                    <div className="mt-4">
                        <h3 className="text-lg font-bold mb-2">Estimated Diameter</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p>Meters: {data.estimated_diameter?.meters?.estimated_diameter_min?.toFixed(0)} - {data.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(0)} m</p>
                            <p>Feet: {data.estimated_diameter?.feet?.estimated_diameter_min?.toFixed(0)} - {data.estimated_diameter?.feet?.estimated_diameter_max?.toFixed(0)} ft</p>
                        </div>
                    </div>

                    {data.close_approach_data && data.close_approach_data.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-bold mb-2">Close Approaches ({data.close_approach_data.length})</h3>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {data.close_approach_data.slice(0, 5).map((approach, i) => (
                                    <div key={i} className="bg-gray-700 rounded p-2 text-sm">
                                        <p><strong>Date:</strong> {approach.close_approach_date}</p>
                                        <p><strong>Velocity:</strong> {parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(0)} km/h</p>
                                        <p><strong>Miss Distance:</strong> {parseFloat(approach.miss_distance.kilometers).toFixed(0)} km</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderBrowseResults = () => {
        if (!data?.near_earth_objects) return null;

        return (
            <div className="space-y-4">
                {/* <TargetCursor spinDuration={3} hideDefaultCursor={true} parallaxOn={true} /> */}
                {/* <button
                    className="continue-button"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleProceed}
                >
                    {!isHovered ? "Let's GO!" : 'Continue'}
                </button> */}
                <div className="bg-blue-900/30 border border-blue-500 rounded p-4 mb-4">
                    <p className="text-sm">Showing {data.near_earth_objects.length} asteroids from the database</p>
                </div>
                {data.near_earth_objects.map(asteroid => (
                    <div key={asteroid.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-blue-400">{asteroid.name}</h3>
                            {asteroid.is_potentially_hazardous_asteroid && (
                                <span className="bg-red-600 text-xs px-2 py-1 rounded">⚠️ Hazardous</span>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                            <p><strong>ID:</strong> {asteroid.id}</p>
                            <p><strong>Designation:</strong> {asteroid.designation}</p>
                            <p><strong>Magnitude:</strong> {asteroid.absolute_magnitude_h}</p>
                            <p><strong>Diameter:</strong> {asteroid.estimated_diameter?.meters?.estimated_diameter_min?.toFixed(0)} - {asteroid.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(0)} m</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // --- END of render functions ---

    // Define content based on loading/error state
    let content;

    if (loading) {
        content = <Loading />; // ⬅️ Use the custom Loader component
    } else if (error) {
        content = (
            <div className="bg-red-900/50 border border-red-500 rounded p-4 text-center">
                <p>Error fetching data: {error}</p>
                <p className="text-sm mt-2 text-red-300">Please check your network or try a different view/ID.</p>
                <button
                    onClick={() => {
                        // Retry the current view's fetch function
                        if (view === 'feed') fetchFeed();
                        else if (view === 'lookup') fetchLookup();
                        else if (view === 'browse') fetchBrowse();
                    }}
                    className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                    Retry Fetch
                </button>
            </div>
        );
    } else if (data) {
        // Render the results based on the current view state
        content = (
            <>
                {view === 'feed' && renderFeedResults()}
                {view === 'lookup' && renderLookupResults()}
                {view === 'browse' && renderBrowseResults()}
            </>
        );
    } else {
        // Default message before initial fetch (optional)
        content = (
            <div className="text-center text-gray-500 p-8">
                <p>Select your search parameters and click "Search" to view Near Earth Objects.</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            {/* <TargetCursor spinDuration={3} hideDefaultCursor={true} parallaxOn={true} /> */}
            {/* <button
                className="continue-button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleProceed}
            >
                {!isHovered ? "Let's GO!" : 'Continue'}
            </button> */}
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-2">☄️ Near Earth Objects</h1>
                <p className="text-gray-400 text-center mb-6">NASA NeoWs Browser</p>

                <div className="flex gap-2 mb-6 flex-wrap justify-center">
                    <button
                        onClick={() => setView('feed')}
                        className={`px-4 py-2 rounded transition ${view === 'feed' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                    >
                        Feed (Date Range)
                    </button>
                    <button
                        onClick={() => setView('lookup')}
                        className={`px-4 py-2 rounded transition ${view === 'lookup' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                    >
                        Lookup (ID)
                    </button>
                    <button
                        onClick={() => setView('browse')}
                        className={`px-4 py-2 rounded transition ${view === 'browse' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                    >
                        Browse All
                    </button>
                </div>

                {/* Input fields based on view */}
                {view === 'feed' && (
                    <div className="bg-gray-800 rounded-lg p-4 mb-6">
                        <div className="flex gap-4 flex-wrap items-end">
                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-sm mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                                />
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-sm mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                                />
                            </div>
                            <button
                                onClick={fetchFeed}
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-2 rounded transition"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                )}

                {view === 'lookup' && (
                    <div className="bg-gray-800 rounded-lg p-4 mb-6">
                        <div className="flex gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-sm mb-1">Asteroid ID (SPK-ID)</label>
                                <input
                                    type="text"
                                    value={asteroidId}
                                    onChange={(e) => setAsteroidId(e.target.value)}
                                    placeholder="e.g., 3542519"
                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                                />
                            </div>
                            <button
                                onClick={fetchLookup}
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-2 rounded transition"
                            >
                                Lookup
                            </button>
                        </div>
                    </div>
                )}

                {/* ⬅️ RENDER THE CONTENT (Loader/Error/Data) */}
                {content}

            </div>
        </div>
    );
}