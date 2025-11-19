// File: SplitTextAnimator.jsx

import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText'; // Import the plugin

// 💡 IMPORTANT: Register the plugin globally once
gsap.registerPlugin(SplitText);

const SplitTextAnimator = ({ text, animationType = 'chars' }) => {
    // Refs for the target element and the SplitText instance
    const textRef = useRef(null);
    const splitRef = useRef(null);
    const animationRef = useRef(null);

    // Function to create, split, and run the initial animation
    const runAnimation = useCallback(() => {
        // 1. Clean up any previous split/animation instances
        if (splitRef.current) splitRef.current.revert();
        if (animationRef.current) animationRef.current.revert();

        if (textRef.current) {
            // 2. Create the SplitText instance
            splitRef.current = new SplitText(textRef.current, { 
                type: "chars,words,lines" 
            });

            let targets;
            let staggerValue;
            let animationProps;

            // 3. Determine the animation targets and properties based on prop
            if (animationType === 'words') {
                targets = splitRef.current.words;
                staggerValue = 0.1;
                animationProps = { y: 50, opacity: 0, rotation: 5, ease: "back.out(1.7)" };
            } else if (animationType === 'lines') {
                targets = splitRef.current.lines;
                staggerValue = 0.2;
                animationProps = { opacity: 0, x: -100, ease: "power2.out" };
            } else { // Default to 'chars'
                targets = splitRef.current.chars;
                staggerValue = 0.03;
                animationProps = { opacity: 0, scale: 0.5, ease: "power1.out" };
            }

            // 4. Execute the animation
            animationRef.current = gsap.from(targets, {
                ...animationProps,
                duration: 0.8,
                stagger: staggerValue,
            });
        }
    }, [animationType, text]); // Dependency array ensures re-run if props change

    // useEffect for mounting, unmounting (cleanup), and resizing
    useEffect(() => {
        runAnimation();

        // Optional: Handle cleanup on component unmount
        return () => {
            if (splitRef.current) splitRef.current.revert();
            if (animationRef.current) animationRef.current.revert();
        };
    }, [runAnimation]); 
    // Note: If you want to handle window resize, add the event listener here 
    // and call runAnimation on resize, ensuring you clean up the listener.

    // JSX output: The actual text element where the splitting happens
    return (
        <span 
            ref={textRef} 
            className="split-text-target" 
            // Optional style to prevent FOUC (Flash of Unstyled Content) 
            // by keeping it invisible until GSAP sets its final opacity.
            //style={{ opacity: 0 }} 
        >
            {text}
        </span>
    );
};

export default SplitTextAnimator;