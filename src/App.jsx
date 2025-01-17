import React, { useState, useEffect } from 'react';
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
import betterLuck from './betterluck.png';

const SpinningWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [copied, setCopied] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [hasSpun, setHasSpun] = useState(false);

  // Check session storage on component mount and make IP status request
  useEffect(() => {
    


    // Check IP status
    const checkIpStatus = async () => {
      try {
        const response = await fetch('https://orca-app-ezrxl.ondigitalocean.app/api/check-ip-status');
        const data = await response.json();
        console.log('IP Status Response:', data);

        if(data.hasClaimed && data.hasClaimed === true){
          setHasSpun(true);    
           sessionStorage.setItem('hasSpun', 'true');

        }
      } catch (error) {
        console.error('Error checking IP status:', error);
      }
    };

    checkIpStatus();
  }, []);
  
  const sections = [
    {
      name: "H&M Voucher - 75% Off",
      bgColor: "#6699FF",
      image: hm,
      claimUrl: "https://www.growfitter.com/store/category/155661502",
      probability: 0.25, // 5% chance
      instructions: [
        "1. Copy your exclusive H&M voucher code",
        "2. Click on the Claim now Button",
        "3. It will redirect to the redemption link",
        "4. Click on the Buy Now Button",
        "5. Copy & Paste the Coupon in the discount Bar & click apply",
        "6. Redirect to the payment page",
        "7. No shipping charges",
        "8. Your order will be successfully placed"
      ]
    },
    {
      name: "Trimmer", 
      bgColor: "#FFFFFF",
      image: trimmer,
      claimUrl: "https://www.growfitter.com/store/#!/Zebronics-Zeb-HT104/p/717582147/category=0",
      probability: 0.2, // 2% chance
      instructions: [
        "1. Copy your exclusive coupon code",
        "2. Click on the Claim now Button",
        "3. It will redirect to the redemption link",
        "4. Click on the Buy Now Button", 
        "5. Copy & Paste the Coupon in the discount Bar & click apply",
        "6. Redirect to the payment page",
        "7. Shipping charges to be paid",
        "8. Your order will be successfully placed"
      ]
    },
    {
      name: "iPhone",
      bgColor: "#6699FF",
      image: iphone,
      claimUrl: "https://www.growfitter.com/store/#!/iPhone-16/p/719808627/category=0",
      probability: 0.000, // 0% chance
      instructions: [
        "1. We are ran out of stocks",
        "2. Try again next time"
      ]
    },
    {
      name: "Smartwatch",
      bgColor: "#FFFFFF",
      image: watch,
      claimUrl: "https://www.growfitter.com/store/#!/Actofit-Ultra-Max-Smartwatch/p/707840259/category=0",
      probability: 0.02, // 2% chance
      instructions: [
        "1. Copy your exclusive coupon code",
        "2. Click on the Claim now Button",
        "3. It will redirect to the redemption link",
        "4. Click on the Buy Now Button",
        "5. Copy & Paste the Coupon in the discount Bar & click apply",
        "6. Redirect to the payment page",
        "7. Shipping charges to be paid",
        "8. Your order will be successfully placed"
      ]
    },
    {
      name: "Starbucks Voucher",
      bgColor: "#6699FF",
      image: starbucks,
      claimUrl: "https://www.growfitter.com/store/#!/Starbucks-E-Gift-Card/p/719797918/category=0",
      probability: 0.05, // 5% chance
      instructions: [
        "1. Copy your exclusive coupon code",
        "2. Click on the Claim now Button",
        "3. It will redirect to the redemption link",
        "4. Click on the Buy Now Button",
        "5. Copy & Paste the Coupon in the discount Bar & click apply",
        "6. Redirect to the payment page",
        "7. No Shipping charges to be paid",
        "8. Your order will be successfully placed"
      ]
    },
    {
      name: "GFit Token",
      bgColor: "#FFFFFF",
      image: gfitToken,
      claimUrl: "",
      probability: 0.009, // 0.9% chance
      instructions: [
        "1. GFit Token is Eligible on Min 100 Growfitter Points",
        "2. Once we have successfully launched the GFit Token,", 
        "3. Our support experts will reach out to you",
        "4. Through your registered Growfitter Contact Number"
      ]
    },
    {
      name: "Better luck next time",
      bgColor: "#3F2B96",
      image: betterLuck,
      claimUrl: "https://www2.hm.com/en_in/men/shop-by-product/t-shirts-and-tanks.html",
      probability: 0.60, // 85% chance,
    },
  ];

  const getRandomSectionIndex = () => {
    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (let i = 0; i < sections.length; i++) {
      cumulativeProbability += sections[i].probability;
      if (random <= cumulativeProbability) {
        return i;
      }
    }
    
    // Fallback to "Better luck next time" if no section is selected
    return sections.length - 1;
  };

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;
    
    setIsSpinning(true);
    setCurrentSection(null);
    setShowOverlay(false);
    setCopied(false);
    setCouponCode('');
    
    const numberOfRotations = 5 + Math.floor(Math.random() * 3);
    const degreesPerSection = 360 / sections.length;
    
    const selectedIndex = getRandomSectionIndex();
    console.log("selectedIndex", selectedIndex);

    const si = selectedIndex + 1;
    const baseRotation = numberOfRotations * 360;
    const sectionRotation = (sections.length - si) * degreesPerSection;
    const offset = degreesPerSection / 2;
    const newRotation = rotation + baseRotation + sectionRotation + offset;
    
    setRotation(newRotation);
    
    setTimeout(async () => {
      setIsSpinning(false);
      setHasSpun(true);
      // Store spin status in session storage
      sessionStorage.setItem('hasSpun', 'true');
      console.log("sections[selectedIndex]", sections[selectedIndex]);
      
      if ([0, 1, 3,4].includes(selectedIndex)) {
        try {
          const response = await fetch(`https://orca-app-ezrxl.ondigitalocean.app/api/coupon?id=${selectedIndex}`);
          const data = await response.json();
          console.log('Coupon response:', data);

          setCouponCode(data.couponCode);
        } catch (error) {
          console.error('Error fetching coupon:', error);
          setCouponCode('ERROR_FETCHING_COUPON');
        }
      }
      
      setCurrentSection(sections[selectedIndex]);
      setShowOverlay(true);
    }, 8000);
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-0 pt-4 px-4 bg-gradient-to-b from-blue-400 to-blue-200 relative">
      <div className="flex justify-between w-full max-w-xl px-4">
        <img src={growfitter} alt="Growfitter" className="h-8" />
        <img src={metis} alt="Metis" className="h-8" />
      </div>
      
      <img src={spinimg} alt="Spin to Win" className="h-12" />

      <div className="relative h-[340px] w-[340px]">
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
                  x={250 + 140 * Math.cos((i * (360/sections.length) + (180/sections.length) - 90) * Math.PI / 180) - (section.image === iphone ? 60 : section.image === gfitToken ? 55 : 45)}
                  y={250 + 140 * Math.sin((i * (360/sections.length) + (180/sections.length) - 90) * Math.PI / 180) - (section.image === iphone ? 60 : section.image === gfitToken ? 55 : 45)}
                  width={section.image === iphone ? "130" : section.image === gfitToken ? "120" : "100"}
                  height={section.image === iphone ? "130" : section.image === gfitToken ? "120" : "100"}
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
                      fill: section.bgColor === '#6699FF' || section.bgColor === '#3F2B96' ? '#FFFFFF' : '#000000',
                      textAnchor: 'middle',
                      dominantBaseline: 'hanging',
                      fontSize: '16px',
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
            x="200"
            y="205"
            width="100"
            height="100"
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
        disabled={isSpinning || hasSpun}
        className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-2xl transition-colors mt-2"
      >
        <div className="flex items-center gap-2">
          {hasSpun ? 'Spin again later' : 'Spin Now'}
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
              <h2 className="text-2xl font-bold text-center mb-2">
                {currentSection.name}
              </h2>
              
              {currentSection.name !== "Better luck next time" ? (
                <>
                  <p className="text-xl text-center mb-6">Hooray!! You won</p>
                  
                  <div className="bg-white p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-2">How to claim:</h3>
                    <ul className="space-y-2">
                      {currentSection.instructions.map((instruction, index) => (
                        <li key={index} className="text-sm text-gray-700">{instruction}</li>
                      ))}
                    </ul>
                  </div>

                  {currentSection.name !== "GFit Token" && (
                    <>
                      <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center justify-between">
                        <div className="font-mono font-semibold text-gray-800">
                          {couponCode}
                        </div>
                        <button 
                          className={`${copied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors`}
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(couponCode);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            } catch (err) {
                              console.error('Failed to copy text:', err);
                            }
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
                    </>
                  )}
                </>
              ) : (
                <p className="text-xl text-center mb-6">Please spin again later!</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-black text-bold font-medium">
        Powered by winks.fun
      </div>
    </div>
  );
};

export default SpinningWheel;