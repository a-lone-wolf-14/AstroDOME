import React from 'react';
import './Loading.css';

// You will define the 'custom-loader-animation' class in your CSS file.
export default function Loading() {
    return (
        <div className="flex justify-center items-center h-64 w-full">
            <div className="pl">
                <div className="pl__dot"></div>
                <div className="pl__dot"></div>
                <div className="pl__dot"></div>
                <div className="pl__dot"></div>
                <div className="pl__dot"></div>
                <div className="pl__dot"></div>
                <div className="pl__dot"></div>
                <div className="pl__dot"></div>
                <div className="pl__dot"></div>
                <div className="pl__dot"></div>
                <div className="pl__dot"></div>
                <div className="pl__dot"></div>
                <div className="pl__text">Loading…</div>
            </div>
        </div>
    );
}