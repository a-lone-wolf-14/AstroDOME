import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const SplitTextAnimator = ({ text, animationType = 'chars' }) => {
    const textRef = useRef(null);
    const splitRef = useRef(null);
    const animationRef = useRef(null);

    // --- Animation function ---
    const runAnimation = useCallback(() => {
        if (!textRef.current) return;

        // Cleanup previous instances
        if (splitRef.current) splitRef.current.revert();
        if (animationRef.current) animationRef.current.revert();

        // Create split instance
        splitRef.current = new SplitText(textRef.current, {
            type: "chars,words,lines",
        });

        let targets, staggerValue, animationProps;

        switch (animationType) {
            case 'words':
                targets = splitRef.current.words;
                staggerValue = 0.1;
                animationProps = { y: 50, opacity: 0, rotation: 5, ease: "back.out(1.7)" };
                break;

            case 'lines':
                targets = splitRef.current.lines;
                staggerValue = 0.2;
                animationProps = { opacity: 0, x: -100, ease: "power2.out" };
                break;

            default:
                targets = splitRef.current.chars;
                staggerValue = 0.03;
                animationProps = { opacity: 0, scale: 0.5, ease: "power1.out" };
        }

        // Animate
        animationRef.current = gsap.from(targets, {
            ...animationProps,
            duration: 0.8,
            stagger: staggerValue,
        });
    }, [animationType, text]);

    // --- Run only after fonts are loaded ---
    useEffect(() => {
        const runWhenFontsReady = () => {
            if (document.fonts.status === "loaded") {
                runAnimation();
            } else {
                document.fonts.ready.then(runAnimation);
            }
        };

        runWhenFontsReady();

        return () => {
            if (splitRef.current) splitRef.current.revert();
            if (animationRef.current) animationRef.current.revert();
        };
    }, [runAnimation]);

    return (
        <span
            ref={textRef}
            className="split-text-target"
            style={{ opacity: 1 }}  // Avoid flicker
        >
            {text}
        </span>
    );
};

export default SplitTextAnimator;
