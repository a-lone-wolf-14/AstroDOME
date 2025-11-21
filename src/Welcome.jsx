import { useState, useEffect } from 'react';
import './Welcome.css';
//import { TypeAnimation } from 'react-type-animation';
//import './Text.jsx'
import SplitTextAnimator from './Text.jsx';
import TargetCursor from './Cursor.jsx';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [videoReady, setvideoReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleProceed = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 1000);
  };

  const videoPlayback = (e) => {
    e.target.playbackRate = 1.0;
  };

  if (!showIntro) {
    return <MainContent />;
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
    >
      <TargetCursor spinDuration={3} hideDefaultCursor={true} />
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
          <p className='heading3'><SplitTextAnimator text="based on INSIGHT, CURIOSITY, PERSEVERANCE" animationType='lines' /></p>
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Your Main Application
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            The intro animation has finished. This is your main content area where you can build your application.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6">
              <h3 className="font-semibold text-purple-800 mb-2">Feature 1</h3>
              <p className="text-sm text-purple-600">Amazing capabilities</p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-orange-100 rounded-lg p-6">
              <h3 className="font-semibold text-pink-800 mb-2">Feature 2</h3>
              <p className="text-sm text-pink-600">Incredible performance</p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg p-6">
              <h3 className="font-semibold text-orange-800 mb-2">Feature 3</h3>
              <p className="text-sm text-orange-600">Seamless experience</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}