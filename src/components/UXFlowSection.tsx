import React, { useState, useEffect } from 'react';
import SectionContainer from './SectionContainer';

// Mock data for different themes
const mockupData = {
  template: {
    title: "Template Microsite",
    mobileTitle: "Template Mobile",
    desktopTitle: "Template Desktop",
    mobileScreenshot: "https://i.imgur.com/tmygosw.png", // Private mobile
    desktopImage: "https://i.imgur.com/xWB74sr.jpeg", // Private desktop
    tagline: "Tap-optimized interface"
  },
  pirate: {
    title: "Pirate Package",
    mobileTitle: "Pirate Mobile",
    desktopTitle: "Pirate Desktop",
    mobileScreenshot: "https://i.imgur.com/dZ1qZ5k.jpeg", // Group mobile
    desktopImage: "https://i.imgur.com/mLFuB99.jpeg", // Group desktop
    tagline: "Swashbuckling experience"
  },
  caboEscape: {
    title: "Escape Route",
    mobileTitle: "Escape Route Mobile",
    desktopTitle: "Escape Route Desktop",
    mobileScreenshot: "https://i.imgur.com/5U3aP5r.jpeg", // Destination mobile
    desktopImage: "https://i.imgur.com/8y68aJN.png", // Destination desktop
    tagline: "Adventure awaits"
  },
  vesselShowcase: {
    title: "Vessel Showcase",
    mobileTitle: "Vessel Mobile",
    desktopTitle: "Vessel Desktop",
    mobileScreenshot: "https://i.imgur.com/N7uN7QZ.png", // Vessel mobile
    desktopImage: "https://i.imgur.com/xexfhTw.png", // Vessel desktop
    tagline: "Your vessel, your story"
  },
  corporate: {
    title: "Corporate Fleet",
    mobileTitle: "Corporate Mobile",
    desktopTitle: "Corporate Desktop",
    mobileScreenshot: "https://i.imgur.com/LyZCxnP.png", // Corporate mobile
    desktopImage: "https://i.imgur.com/xet3GSx.png", // Corporate desktop
    tagline: "Enterprise management"
  }
};

// CSS for the animations and device styling
const deviceStyles = `
  /* iPhone animation */
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 10px rgba(200, 200, 200, 0.2);
    }
    50% {
      transform: scale(1.01);
      box-shadow: 0 0 25px rgba(200, 200, 200, 0.4);
    }
  }
  .iphone-body {
    animation: pulse 4s infinite ease-in-out;
  }

  /* iMac styling */
  .imac-display {
    background-color: #2d3748; /* Darker gray for the display bezel */
    border: 1px solid #1a202c; /* Even darker border for depth */
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1), /* Softer shadow */
      0 10px 20px rgba(0, 0, 0, 0.1), /* Larger, more diffuse shadow */
      inset 0 2px 4px rgba(255, 255, 255, 0.05); /* Inner highlight for screen glass effect */
  }

  .imac-screen {
    box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
  }

  .imac-stand-arm {
    background-color: #a0aec0; /* Lighter gray for stand arm */
    border: 1px solid #718096;
    box-shadow: 0 2px 3px rgba(0,0,0,0.1);
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .imac-stand-base {
    background-color: #cbd5e0; /* Even lighter gray for base */
    border: 1px solid #a0aec0;
    box-shadow:
      0 1px 2px rgba(0,0,0,0.05), /* Bottom edge shadow */
      0 4px 8px rgba(0,0,0,0.1); /* Floor shadow - Fixed typo */
    transform: perspective(100px) rotateX(10deg) translateY(-5px);
  }

  /* Chrome-style tabs */
  .chrome-tabs {
    background-color: transparent;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    padding: 0 8px;
    height: 60px;
    position: relative;
    z-index: 1;
  }

  .chrome-tab {
    position: relative;
    height: 60px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    cursor: pointer;
    margin: 0 3px;
    transform-origin: bottom center;
    background-color: #374151; /* Darker gray */
    width: 130px; /* Fixed width for all tabs */
    text-align: center; /* Center the text */
    color: #ffffff; /* White text */
  }

  .chrome-tab.active {
    background-color: #4b5563; /* Even darker gray for active */
    box-shadow: 0 -3px 10px rgba(0, 120, 215, 0.15); /* Keep a subtle blue shadow */
    z-index: 10;
    transform: translateY(-3px);
  }

  .chrome-tab:not(.active) {
    background-color: #374151; /* Ensure consistent background when not active */
    border-bottom: 1px solid #1f2937; /* Darker border */
  }

  .chrome-tab:not(.active):hover {
    background-color: #4f5b69; /* Slightly lighter dark gray on hover */
  }

  .tab-bottom-border {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: transparent;
    transform-origin: center;
    transform: scaleX(0);
    transition: transform 0.4s cubic-bezier(0.17, 0.67, 0.56, 1.35);
  }

  .chrome-tab.active .tab-bottom-border {
    transform: scaleX(1);
    background-color: #0078d7; /* Wild Cabo blue color for active tab indicator */
  }

  /* Tab content animation - remove fade animation to make it instantaneous */
  .tab-content {
    opacity: 1;
    transform: translateY(0);
  }

  .tab-content-wrapper {
    position: relative;
    z-index: 5;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  /* Hide/Show tab content immediately without animation */
  .hidden-tab {
    display: none;
  }

  .visible-tab {
    display: block;
  }

  /* Pre-loaded images */
  .preloaded-image {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  /* Responsive adjustments for iMac */
  @media (max-width: 640px) {
    .imac-container {
      transform: scale(0.85); /* Scale down for smaller screens */
    }
  }
  @media (max-width: 480px) {
    .imac-container {
      transform: scale(0.7); /* Further scale down for very small screens */
    }
  }
`;

const UXFlowSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('corporate');
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images on component mount
  useEffect(() => {
    const imageUrls = Object.values(mockupData).flatMap(mockup => [
      mockup.mobileScreenshot,
      mockup.desktopImage
    ]);
    
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = url;
    });
  }, []);

  return (
    <SectionContainer id="ux-flow" bgColor="bg-black">
      {/* Add device styles */}
      <style>{deviceStyles}</style>
      
      {/* Preloader div to ensure all images are loaded */}
      <div style={{ display: 'none' }}>
        {Object.values(mockupData).map((mockup, index) => (
          <React.Fragment key={index}>
            <img src={mockup.mobileScreenshot} className="preloaded-image" alt="preload" />
            <img src={mockup.desktopImage} className="preloaded-image" alt="preload" />
          </React.Fragment>
        ))}
      </div>

      {/* Chrome-style Tabs */}
      <div className="flex justify-center mb-10 overflow-x-auto">
        <div className="chrome-tabs inline-flex rounded-t-lg overflow-hidden">
          <div
            className={`chrome-tab flex items-center justify-center ${activeTab === 'pirate' ? 'active' : ''}`}
            onClick={() => setActiveTab('pirate')}
          >
            <span className="text-lg font-medium">Group</span>
            <div className="tab-bottom-border"></div>
          </div>
          <div
            className={`chrome-tab flex items-center justify-center ${activeTab === 'template' ? 'active' : ''}`}
            onClick={() => setActiveTab('template')}
          >
            <span className="text-lg font-medium">Private</span>
            <div className="tab-bottom-border"></div>
          </div>
          <div
            className={`chrome-tab flex items-center justify-center ${activeTab === 'vesselShowcase' ? 'active' : ''}`}
            onClick={() => setActiveTab('vesselShowcase')}
          >
            <span className="text-lg font-medium">Vessel</span>
            <div className="tab-bottom-border"></div>
          </div>
          <div
            className={`chrome-tab flex items-center justify-center ${activeTab === 'caboEscape' ? 'active' : ''}`}
            onClick={() => setActiveTab('caboEscape')}
          >
            <span className="text-lg font-medium">Destination</span>
            <div className="tab-bottom-border"></div>
          </div>
          <div
            className={`chrome-tab flex items-center justify-center ${activeTab === 'corporate' ? 'active' : ''}`}
            onClick={() => setActiveTab('corporate')}
          >
            <span className="text-lg font-medium">Corporate</span>
            <div className="tab-bottom-border"></div>
          </div>
        </div>
      </div>

      {/* Render all layouts at once but only show the active one */}
      {imagesLoaded ? (
        <div className="tab-content grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-center p-6 max-w-6xl mx-auto">
          {/* Left: Mobile View */}
          <div className="w-full flex justify-center">
            <div className="mobile-mockup">
              {/* Animated iPhone */}
              <div className="flex justify-center">
                <div className="relative iphone-body w-72 h-[36rem] bg-gray-800 rounded-[2.5rem] border-4 border-gray-700 shadow-xl p-2">
                  <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                    <div className="w-full h-full flex flex-col items-center justify-center relative">
                      {/* Render all mobile images at once but show only the active one */}
                      {Object.keys(mockupData).map((tabKey) => {
                        const mockup = mockupData[tabKey as keyof typeof mockupData];
                        return (
                          <div 
                            key={`mobile-${tabKey}`} 
                            className={`absolute inset-0 w-full h-full flex items-center justify-center bg-gray-900 ${activeTab === tabKey ? 'visible-tab' : 'hidden-tab'}`}
                          >
                            <img
                              src={mockup.mobileScreenshot}
                              alt={`${mockup.mobileTitle} view`}
                              className={`${tabKey === 'pirate' ? 'w-full h-full object-cover' : 'max-w-full max-h-full object-contain'}`}
                            />
                          </div>
                        );
                      })}
                      {/* Phone notch */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-full border-2 border-gray-800 z-10"></div>
                    </div>
                  </div>

                  {/* Side buttons */}
                  <div className="absolute -right-1 top-24 w-1 h-16 bg-gray-700 rounded-l-sm"></div>
                  <div className="absolute -left-1 top-20 w-1 h-8 bg-gray-700 rounded-r-sm"></div>
                  <div className="absolute -left-1 top-32 w-1 h-8 bg-gray-700 rounded-r-sm"></div>
                  <div className="absolute -left-1 top-12 w-1 h-4 bg-gray-700 rounded-r-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Desktop View */}
          <div className="w-full flex justify-center relative md:-mt-4">
            <div className="desktop-mockup">
              {/* Photorealistic iMac */}
              <div className="flex justify-center">
                <div className="imac-container flex flex-col items-center scale-110 transform origin-top">
                  {/* iMac Display */}
                  <div className="imac-display w-[43rem] h-[30rem] rounded-lg p-2.5 flex flex-col items-center">
                    {/* Screen with flexible aspect ratio */}
                    <div className="imac-screen w-full h-full rounded-sm flex items-center justify-center relative overflow-hidden">
                      {/* Render all desktop images at once but show only the active one */}
                      {Object.keys(mockupData).map((tabKey) => {
                        const mockup = mockupData[tabKey as keyof typeof mockupData];
                        return (
                          <div 
                            key={`desktop-${tabKey}`} 
                            className={`absolute inset-0 w-full h-full flex items-center justify-center bg-gray-900 ${activeTab === tabKey ? 'visible-tab' : 'hidden-tab'}`}
                          >
                            <img
                              src={mockup.desktopImage}
                              alt={`${mockup.title} desktop view`}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom bar with logo */}
                    <div className="w-[95%] h-10 mt-2 bg-gray-700 rounded-b-md flex items-center justify-center">
                      <div className="text-gray-200 opacity-60 font-bold">
                        {/* Empty for logo */}
                      </div>
                    </div>
                  </div>

                  {/* Stand */}
                  <div className="imac-stand-arm w-12 h-14 -mt-4 rounded-b-md z-[-1] relative">
                  </div>

                  <div className="imac-stand-base w-48 h-2 rounded-sm mt-[-1px]">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading mockups...</div>
        </div>
      )}
    </SectionContainer>
  );
};

export default UXFlowSection;
