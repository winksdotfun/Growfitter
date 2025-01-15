import React, { useState } from 'react';
import { X } from 'lucide-react';
import spinimg from './spin.png';
import growfitter from './growfitter.png';
import metis from './metis.png';
import watch from './watch.png';
import gfitToken from './gfittoken.png';
import starbucks from './starbucks.png';
import hm from './handm.png';
import trimmer from './trimmer.png';
import iphone from './iphone.png';
import center from './center.png';
import betterLuck from './luck.png';
const SpinningWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const sections = [
    {
      name: "H&M Voucher - 75% Off",
      bgColor: "#6699FF",
      image: hm,
      claimUrl: "https://www2.hm.com/en_in/men/shop-by-product/t-shirts-and-tanks.html",
      couponCode: "HM70OFF2024",
      probability: 10
    },
    {
      name: "Trimmer", 
      bgColor: "#FFFFFF",
      image: trimmer,
      claimUrl: "https://www2.hm.com/en_in/men/products/t-shirts-tank-tops.html",
      couponCode: "HM85OFF2024",
      probability: 5
    },
    {
      name: "FREE Iphone 16",
      bgColor: "#6699FF",
      image: iphone,
      claimUrl: "https://www2.hm.com/en_in/free-tshirt-collection.html",
      couponCode: "HMFREE2024",
      probability: 0
    },
    {
      name: "Smartwatch",
      bgColor: "#FFFFFF",
      image: watch,
      claimUrl: "https://www2.hm.com/en_in/men/shop-by-product/t-shirts-and-tanks.html",
      couponCode: "HM70OFF2024",
      probability: 5
    },
    {
      name: "Starbucks Voucher",
      bgColor: "#6699FF",
      image: starbucks,
      claimUrl: "https://www2.hm.com/en_in/men/shop-by-product/t-shirts-and-tanks.html",
      couponCode: "HM70OFF2024",
      probability: 10
    },
    {
      name: "GFit Token",
      bgColor: "#FFFFFF",
      image: gfitToken,
      claimUrl: "https://www2.hm.com/en_in/men/shop-by-product/t-shirts-and-tanks.html",
      couponCode: "HM70OFF2024",
      probability: 10
    },
    {
      name: "Better luck next time",
      bgColor: "#1b0a40",
      image: betterLuck,
      claimUrl: "https://www2.hm.com/en_in/men/shop-by-product/t-shirts-and-tanks.html",
      couponCode: "HM70OFF2024",
      probability: 60
    },
  ];

  const getRandomSectionIndex = () => {
    const random = Math.random() * 100;
    let sum = 0;
    for (let i = 0; i < sections.length; i++) {
      sum += sections[i].probability;
      if (random <= sum) {
        return i;
      }
    }
    return sections.length - 1;
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setCurrentSection(null);
    setShowOverlay(false);
    setCopied(false);
    
    const numberOfRotations = 5 + Math.floor(Math.random() * 5);
    const degreesPerSection = 360 / sections.length;
    
    // Get random section based on probability
    const selectedIndex = getRandomSectionIndex();
    const baseRotation = numberOfRotations * 360;
    const sectionRotation = (sections.length - selectedIndex) * degreesPerSection;
    const randomOffset = Math.random() * degreesPerSection;
    const newRotation = baseRotation + sectionRotation + randomOffset;
    
    setRotation(newRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setCurrentSection(sections[selectedIndex]);
      setShowOverlay(true);
    }, 8000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 bg-gradient-to-b from-blue-400 to-blue-200 relative">
      <div className="flex justify-between w-full max-w-xl px-4">
        <img src={growfitter} alt="Growfitter" className="h-12" />
        <img src={metis} alt="Metis" className="h-12" />
      </div>
      
      <img src={spinimg} alt="Get Free H&M T-Shirt" className="h-16" />

      <div className="relative w-96 h-96">
        <svg 
          viewBox="0 0 500 500"
          className="w-full h-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 8s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
          }}
        >
          <defs>
            {sections.map((_, i) => (
              <path
                key={`textPath${i}`}
                id={`textPath${i}`}
                d={`M 250,250 m 0,-220 a 220,220 0 0,1 190.5,110`}
                fill="none"
                transform={`rotate(${i * (360/sections.length)}, 250, 250)`}
              />
            ))}
          </defs>

          <g>
            {sections.map((section, i) => (
              <g key={i}>
                <path
                  d={`M 250,250 
                      L ${250 + 240 * Math.cos((i * (360/sections.length) - 90) * Math.PI / 180)},${250 + 240 * Math.sin((i * (360/sections.length) - 90) * Math.PI / 180)} 
                      A 240,240 0 0,1 ${250 + 240 * Math.cos(((i+1) * (360/sections.length) - 90) * Math.PI / 180)},${250 + 240 * Math.sin(((i+1) * (360/sections.length) - 90) * Math.PI / 180)} 
                      Z`}
                  fill={section.bgColor}
                  stroke="#FFD700"
                  strokeWidth="2"
                />

                <image
                  href={section.image}
                  x={250 + 140 * Math.cos((i * (360/sections.length) + (180/sections.length) - 90) * Math.PI / 180) - 35}
                  y={250 + 140 * Math.sin((i * (360/sections.length) + (180/sections.length) - 90) * Math.PI / 180) - 35}
                  width="70"
                  height="70"
                  preserveAspectRatio="xMidYMid meet"
                  transform={`
                    rotate(${i * (360/sections.length) + (180/sections.length)}, 
                    ${250 + 140 * Math.cos((i * (360/sections.length) + (180/sections.length) - 90) * Math.PI / 180)}, 
                    ${250 + 140 * Math.sin((i * (360/sections.length) + (180/sections.length) - 90) * Math.PI / 180)})
                  `}
                />

                <text>
                  <textPath
                    href={`#textPath${i}`}
                    startOffset="40%"
                    className="text-sm font-medium"
                    style={{ 
                      fill: section.bgColor === '#6699FF' || section.bgColor === '#1b0a40' ? '#FFFFFF' : '#000000',
                      textAnchor: 'middle',
                      dominantBaseline: 'hanging',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {section.name}
                  </textPath>
                </text>
              </g>
            ))}
          </g>

          <circle
            cx="250"
            cy="250"
            r="245"
            fill="none"
            stroke="#1b0a40"
            strokeWidth="10"
          />

          <circle
            cx="250"
            cy="250"
            r="40"
            fill="#FFFFFF"
            stroke="#FFD700"
            strokeWidth="2"
          />
          <image
            href={center}
            x="230"
            y="230"
            width="40"
            height="40"
          />
        </svg>

        <div className="absolute top-0 left-1/2 -mt-4 -ml-4">
          <div 
            className="w-0 h-0"
            style={{
              borderLeft: '16px solid transparent',
              borderRight: '16px solid transparent',
              borderTop: '32px solid black'
            }}
          />
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-2xl transition-colors"
      >
        <div className="flex items-center gap-2">
          Spin Now
      
        </div>
      </button>

      {showOverlay && currentSection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-pink-50 to-blue-50 p-8 rounded-2xl max-w-md w-full mx-4 relative">
            <button 
              onClick={() => setShowOverlay(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            
            <div className="relative z-10">
              <img src="/api/placeholder/100/100" alt="Gift" className="w-24 h-24 mx-auto mb-4" />
              
              <h2 className="text-2xl font-bold text-center mb-2">
                {currentSection.name}
              </h2>
              
              <p className="text-xl text-center mb-6">Hooray!! You won</p>
              
              <div className="bg-white p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">How to claim:</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-700">1. Copy your coupon code: {currentSection.couponCode}</li>
                  <li className="text-sm text-gray-700">2. Click claim now to visit the store</li>
                  <li className="text-sm text-gray-700">3. Add T-shirt to cart</li>
                  <li className="text-sm text-gray-700">4. Paste coupon at checkout</li>
                  <li className="text-sm text-gray-700">5. Complete your order</li>
                </ul>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center justify-between">
                <div className="font-mono font-semibold text-gray-800">
                  {currentSection.couponCode}
                </div>
                <button 
                  className={`${copied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors`}
                  onClick={() => {
                    navigator.clipboard.writeText(currentSection.couponCode);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </button>
              </div>
              
              <button 
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full"
                onClick={() => window.open(currentSection.claimUrl, '_blank')}
              >
                Claim now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-black text-bold  font-medium">
        Powered by winks.fun
      </div>
    </div>
  );
};

export default SpinningWheel;