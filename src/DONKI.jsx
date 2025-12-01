import { useState, useEffect } from 'react';
import TargetCursor from './Cursor';
import './Button.css';
import Loading from './Loading'; // ⬅️ NEW: Import the Loader component

const API_KEY = 'ta9g2hpjIn0cBsLfPGVaPny9VWLP7jIkRGo3FJfn'; // Replace with your NASA API key

const EVENT_TYPES = [
    { id: 'CME', name: 'Coronal Mass Ejection', icon: '🌊', color: 'blue' },
    { id: 'GST', name: 'Geomagnetic Storm', icon: '⚡', color: 'yellow' },
    { id: 'FLR', name: 'Solar Flare', icon: '☀️', color: 'orange' },
    { id: 'SEP', name: 'Solar Energetic Particle', icon: '⚛️', color: 'purple' },
    { id: 'IPS', name: 'Interplanetary Shock', icon: '💥', color: 'red' },
    { id: 'MPC', name: 'Magnetopause Crossing', icon: '🧲', color: 'green' },
    { id: 'RBE', name: 'Radiation Belt Enhancement', icon: '☢️', color: 'pink' },
    { id: 'HSS', name: 'High Speed Stream', icon: '🌀', color: 'cyan' },
    { id: 'notifications', name: 'Notifications', icon: '🔔', color: 'indigo' }
];

export default function Donki() {
    const [selectedType, setSelectedType] = useState('CME');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [startDate, setStartDate] = useState(
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    );
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const endpoint = selectedType === 'notifications'
                ? `https://api.nasa.gov/DONKI/notifications?startDate=${startDate}&endDate=${endDate}&type=all&api_key=${API_KEY}`
                : `https://api.nasa.gov/DONKI/${selectedType}?startDate=${startDate}&endDate=${endDate}&api_key=${API_KEY}`;

            const res = await fetch(endpoint);
            if (!res.ok) throw new Error(`Failed to fetch ${selectedType} data`);
            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderEventCard = (event, index) => {
        const eventType = EVENT_TYPES.find(t => t.id === selectedType);
        const colorClasses = {
            blue: 'border-blue-500 bg-blue-900/20',
            yellow: 'border-yellow-500 bg-yellow-900/20',
            orange: 'border-orange-500 bg-orange-900/20',
            purple: 'border-purple-500 bg-purple-900/20',
            red: 'border-red-500 bg-red-900/20',
            green: 'border-green-500 bg-green-900/20',
            pink: 'border-pink-500 bg-pink-900/20',
            cyan: 'border-cyan-500 bg-cyan-900/20',
            indigo: 'border-indigo-500 bg-indigo-900/20'
        };

        return (
            <div key={index} className={`rounded-lg p-4 border ${colorClasses[eventType?.color || 'blue']}`}>
                <TargetCursor spinDuration={3} hideDefaultCursor={true} parallaxOn={true} />
                <div className="space-y-2 text-sm">
                    {/* ... (Event type specific rendering logic goes here) ... */}
                    {selectedType === 'CME' && (
                        <>
                            <p><strong>Activity ID:</strong> {event.activityID}</p>
                            <p><strong>Start Time:</strong> {event.startTime}</p>
                            <p><strong>Source Location:</strong> {event.sourceLocation || 'N/A'}</p>
                            <p><strong>Note:</strong> {event.note || 'No additional notes'}</p>
                            {event.linkedEvents && event.linkedEvents.length > 0 && (
                                <p><strong>Linked Events:</strong> {event.linkedEvents.length}</p>
                            )}
                        </>
                    )}
                    {selectedType === 'GST' && (
                        <>
                            <p><strong>GST ID:</strong> {event.gstID}</p>
                            <p><strong>Start Time:</strong> {event.startTime}</p>
                            {event.allKpIndex && event.allKpIndex.length > 0 && (
                                <p><strong>Kp Index:</strong> {event.allKpIndex.map(k => k.kpIndex).join(', ')}</p>
                            )}
                            {event.linkedEvents && event.linkedEvents.length > 0 && (
                                <p><strong>Linked Events:</strong> {event.linkedEvents.length}</p>
                            )}
                        </>
                    )}
                    {selectedType === 'FLR' && (
                        <>
                            <p><strong>Flare ID:</strong> {event.flrID}</p>
                            <p><strong>Begin Time:</strong> {event.beginTime}</p>
                            <p><strong>Peak Time:</strong> {event.peakTime}</p>
                            <p><strong>End Time:</strong> {event.endTime || 'Ongoing'}</p>
                            <p><strong>Class Type:</strong> {event.classType}</p>
                            <p><strong>Source Location:</strong> {event.sourceLocation}</p>
                            {event.linkedEvents && event.linkedEvents.length > 0 && (
                                <p><strong>Linked Events:</strong> {event.linkedEvents.length}</p>
                            )}
                        </>
                    )}
                    {selectedType === 'SEP' && (
                        <>
                            <p><strong>SEP ID:</strong> {event.sepID}</p>
                            <p><strong>Event Time:</strong> {event.eventTime}</p>
                            {event.instruments && event.instruments.length > 0 && (
                                <p><strong>Instruments:</strong> {event.instruments.map(i => i.displayName).join(', ')}</p>
                            )}
                            {event.linkedEvents && event.linkedEvents.length > 0 && (
                                <p><strong>Linked Events:</strong> {event.linkedEvents.length}</p>
                            )}
                        </>
                    )}
                    {selectedType === 'IPS' && (
                        <>
                            <p><strong>Activity ID:</strong> {event.activityID}</p>
                            <p><strong>Event Time:</strong> {event.eventTime}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            {event.catalog && <p><strong>Catalog:</strong> {event.catalog}</p>}
                        </>
                    )}
                    {selectedType === 'MPC' && (
                        <>
                            <p><strong>MPC ID:</strong> {event.mpcID}</p>
                            <p><strong>Event Time:</strong> {event.eventTime}</p>
                            {event.instruments && event.instruments.length > 0 && (
                                <p><strong>Instruments:</strong> {event.instruments.map(i => i.displayName).join(', ')}</p>
                            )}
                        </>
                    )}
                    {selectedType === 'RBE' && (
                        <>
                            <p><strong>RBE ID:</strong> {event.rbeID}</p>
                            <p><strong>Event Time:</strong> {event.eventTime}</p>
                            {event.instruments && event.instruments.length > 0 && (
                                <p><strong>Instruments:</strong> {event.instruments.map(i => i.displayName).join(', ')}</p>
                            )}
                        </>
                    )}
                    {selectedType === 'HSS' && (
                        <>
                            <p><strong>HSS ID:</strong> {event.hssID}</p>
                            <p><strong>Event Time:</strong> {event.eventTime}</p>
                            {event.instruments && event.instruments.length > 0 && (
                                <p><strong>Instruments:</strong> {event.instruments.map(i => i.displayName).join(', ')}</p>
                            )}
                        </>
                    )}
                    {selectedType === 'notifications' && (
                        <>
                            <p><strong>Message Type:</strong> {event.messageType}</p>
                            <p><strong>Issue Time:</strong> {event.messageIssueTime}</p>
                            <p className="text-xs text-gray-300 mt-2">{event.messageBody?.substring(0, 200)}...</p>
                        </>
                    )}
                </div>
            </div>
        );
    };

    // --- Conditional Content Rendering ---
    let content;

    if (loading) {
        // ⬅️ RENDER LOADER: Show the custom animation while fetching
        content = <Loading />;
    } else if (error) {
        // RENDER ERROR: Show the error state
        content = (
            <div className="bg-red-900/50 border border-red-500 rounded p-4 text-center">
                <p>Error fetching data: {error}</p>
                <button
                    onClick={fetchData}
                    className="mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                    Retry
                </button>
            </div>
        );
    } else if (data) {
        // RENDER DATA: Show results if loading is false and data exists
        content = (
            <div>
                <div className="bg-gray-800 border border-gray-700 rounded p-3 mb-4">
                    <p className="text-sm">
                        <strong>Results:</strong> {Array.isArray(data) ? data.length : 0} {selectedType} events found
                    </p>
                </div>

                {Array.isArray(data) && data.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                        No events found for this date range. Try adjusting the dates.
                    </div>
                )}

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {Array.isArray(data) && data.map((event, i) => renderEventCard(event, i))}
                </div>
            </div>
        );
    } else {
        // RENDER INITIAL MESSAGE: Show a message when first loaded with no data yet
        content = (
            <div className="text-center text-gray-400 py-12">
                <p className="text-lg mb-2">Select an event type and date range</p>
                <p className="text-sm">Click "Fetch Data" to view space weather events</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            {/* <TargetCursor spinDuration={3} hideDefaultCursor={true} parallaxOn={true} /> */}
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-2">🌌 Space Weather Monitor</h1>
                <p className="text-gray-400 text-center mb-6">NASA DONKI Database</p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
                    {EVENT_TYPES.map(type => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`p-3 rounded-lg transition text-left ${selectedType === type.id
                                ? `bg-${type.color}-600 border-2 border-${type.color}-400`
                                : 'bg-gray-800 border-2 border-gray-700 hover:border-gray-600'
                                }`}
                        >
                            <div className="text-2xl mb-1">{type.icon}</div>
                            <div className="text-xs font-semibold">{type.name}</div>
                        </button>
                    ))}
                </div>

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
                                max={new Date().toISOString().split('T')[0]}
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                            />
                        </div>
                        <button
                            onClick={fetchData}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-2 rounded transition"
                        >
                            {loading ? 'Loading...' : 'Fetch Data'}
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        Note: Date range limited to 30 days for most event types
                    </p>
                </div>

                {/* ⬅️ RENDER THE CONDITIONAL CONTENT (Loader/Error/Data) */}
                {content}

            </div>
        </div>
    );
}