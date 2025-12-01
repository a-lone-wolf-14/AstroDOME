import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TargetCursor from "./Cursor";
import "./Select.css";

export default function Select() {
    const navigate = useNavigate();
    const [isHovered_apod, setIsHovered_apod] = useState(false);
    const [isHovered_neows, setIsHovered_neows] = useState(false);
    const [isHovered_donki, setIsHovered_donki] = useState(false);

    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-background text-foreground flex flex-col">
            {/* Reuse Background for consistency */}
            <TargetCursor spinDuration={3} hideDefaultCursor={true} parallaxOn={true} />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/80 to-background" />

            {/* Header */}
            <header className="relative z-10 p-6 md:p-12 flex justify-between items-center">
                <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 cursor-pointer" onClick={() => navigate("/")}>
                    AstroDOME
                </h2>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 gap-12">

                <h1 className="text-4xl md:text-6xl font-display font-bold text-white drop-shadow-[0_0_10px_rgba(255,86,142,0.5)]">
                    Select Destination
                </h1>
            </main>
            <div className="card">
                <p
                    className="card-apod"
                    onClick={() => navigate("/apod")}
                    onMouseEnter={() => setIsHovered_apod(true)}
                    onMouseLeave={() => setIsHovered_apod(false)}><span>{isHovered_apod ? "Astronomy Picture of the Day (APOD)" : "APOD"}</span></p>
                <p
                    className="card-neows"
                    onClick={() => navigate("/neows")}
                    onMouseEnter={() => setIsHovered_neows(true)}
                    onMouseLeave={() => setIsHovered_neows(false)}><span>{isHovered_neows ? "Near Earth Object Web Service (NEOWS)" : "NEOWS"}</span></p>
                <p
                    className="card-donki"
                    onClick={() => navigate("/donki")}
                    onMouseEnter={() => setIsHovered_donki(true)}
                    onMouseLeave={() => setIsHovered_donki(false)}><span>{isHovered_donki ? "Space Weather Database of Notification, Knowledge and Information (DONKI)" : "DONKI"}</span></p>
            </div>
        </div>
    );
}
