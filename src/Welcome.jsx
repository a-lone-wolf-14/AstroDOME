import { useState, useEffect } from 'react';
import './Welcome.css';
import './Button.css';
//import { TypeAnimation } from 'react-type-animation';
//import './Text.jsx'
import SplitTextAnimator from './Text.jsx';
import TargetCursor from './Cursor.jsx';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [videoReady, setvideoReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AstroDOME | Welcome";
  }, []);

  const handleProceed = () => {
    setFadeOut(true);
    setTimeout(() => setShowIntro(false), 1000);
    navigate('/select');
  };

  const videoPlayback = (e) => {
    e.target.playbackRate = 1.0;
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
    >
      <TargetCursor spinDuration={3} hideDefaultCursor={true} parallaxOn={true} />
      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        loop
        onLoadedMetadata={videoPlayback}
        onCanPlay={() => setvideoReady(true)}
        preload='auto'
        poster='/0000.jpg'
        className="video-container"
      >
        <source src="https://pub-d02828e273b44062a2d7b141ace289ad.r2.dev/Mars4_PLL.webm" type="video/webm" />
      </video>

      {/* Overlay for better text readability (optional) */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="text-center relative z-10">
        <div className="animate-bounce-slow mb-8">
          <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className='heading-container'>
          <p>
            <div className='heading1'><SplitTextAnimator text="Welcome to " animationType='lines' /></div>
            <div className='heading2'><SplitTextAnimator text="AstroDOME" animationType='chars' /></div>
          </p>
          <p className='heading3'><SplitTextAnimator text="based on NASA InSight API, Data by- Curiosity, Perseverance" animationType='lines' /></p>
        </div>

        <div className="flex gap-2 justify-center animate-fade-in-delay">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        <button
          className="continue-button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleProceed}
        >
          {!isHovered ? "Let's GO!" : 'Continue'}
        </button>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.6s both;
        }
        
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function MainContent() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8"></div>
  );
}