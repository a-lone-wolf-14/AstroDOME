import { useState } from "react";

const ContinueButton = () =>
{
    const [isHovered, setIsHovered] = useState(false);

    return
    (
        <button 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="continue-button"
        >
            {isHovered ? "Let's Go!" : "Continue"}
        </button>
    )
};

export default ContinueButton;