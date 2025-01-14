import React, { useState } from 'react';

import herbalCream from './herbal.png';
import vitaminWash from './vitamin.png';


const SpinningWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const sections = [
    {
      name: "Herbal Anti Acne Cream",
      bgColor: "rgb(233, 84, 117)",
      type: "cream",
      image: herbalCream
    },
    {
      name: "Vitamin C Face Wash",
      bgColor: "rgb(250, 196, 214)",
      type: "wash",
      image: vitaminWash
    },
    {
      name: "Herbal Anti Acne Cream",
      bgColor: "rgb(233, 84, 117)",
      type: "cream",
      image: herbalCream
    },
    {
      name: "Vitamin C Face Wash",
      bgColor: "rgb(250, 196, 214)",
      type: "wash",
      image: vitaminWash
    },
    {
      name: "Herbal Anti Acne Cream",
      bgColor: "rgb(233, 84, 117)",
      type: "cream",
      image: herbalCream
    },
    {
      name: "Vitamin C Face Wash",
      bgColor: "rgb(250, 196, 214)",
      type: "wash",
      image: vitaminWash
    }
  ];

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setCurrentSection(null);
    const newRotation = rotation + 3600 + Math.random() * 1800;
    setRotation(newRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      const section = Math.floor((newRotation % 360) / 60);
      console.log("Landed on section:", sections[section].name);
      setCurrentSection(sections[section]);
    }, 8000);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-4xl font-bold" style={{ color: "rgb(233, 84, 117)" }}>
        The Ultimate Nail Bar
      </h1>
      
      <div className="relative w-86 h-86">
        <svg 
          viewBox="0 0 500 500"
          className="w-full h-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 8s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
          }}
        >
          {/* Circular text paths */}
          <defs>
            {sections.map((_, i) => (
              <path
                key={`textPath${i}`}
                id={`textPath${i}`}
                d={`M 250,250 m 0,-240 a 240,240 0 0,1 207.8,120`}
                fill="none"
                transform={`rotate(${i * 60}, 250, 250)`}
              />
            ))}
          </defs>

          {/* Sections */}
          <g>
            {sections.map((section, i) => (
              <g key={i}>
                {/* Section background */}
                <path
                  d={`M 250,250 
                      L ${250 + 250 * Math.cos((i * 60 - 90) * Math.PI / 180)},${250 + 250 * Math.sin((i * 60 - 90) * Math.PI / 180)} 
                      A 250,250 0 0,1 ${250 + 250 * Math.cos((i * 60 - 30) * Math.PI / 180)},${250 + 250 * Math.sin((i * 60 - 30) * Math.PI / 180)} 
                      Z`}
                  fill={section.bgColor}
                  stroke="rgb(207, 181, 59)"
                  strokeWidth="2"
                />

                {/* Product image */}
                <image
                  href={section.image}
                  x={250 + 120 * Math.cos((i * 60 - 60) * Math.PI / 180) - (section.type === 'cream' ? 40 : 30)}
                  y={250 + 120 * Math.sin((i * 60 - 60) * Math.PI / 180) - (section.type === 'cream' ? 40 : 50)}
                  width={section.type === 'cream' ? 80 : 60}
                  height={section.type === 'cream' ? 80 : 100}
                  transform={`
                    translate(${250 + 120 * Math.cos((i * 60 - 60) * Math.PI / 180)}, ${250 + 120 * Math.sin((i * 60 - 60) * Math.PI / 180)})
                    rotate(${-rotation})
                    translate(-${250 + 120 * Math.cos((i * 60 - 60) * Math.PI / 180)}, -${250 + 120 * Math.sin((i * 60 - 60) * Math.PI / 180)})
                  `}                />

                {/* Section text */}
                <text className="text-lg" style={{ fontSize: '18px', fontWeight: '500' }}>
                  <textPath
                    href={`#textPath${i}`}
                    startOffset="50%"
                    style={{ 
                      fill: 'black',
                      textAnchor: 'middle',
                      dominantBaseline: 'hanging'
                    }}
                  >
                    {section.name}
                  </textPath>
                </text>
              </g>
            ))}
          </g>

          {/* Center circle with leaf icon */}
          <circle
            cx="250"
            cy="250"
            r="40"
            fill="white"
            stroke="rgb(207, 181, 59)"
            strokeWidth="2"
          />
          <text 
            x="250" 
            y="250" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            style={{ fontSize: '24px' }}
          >
            🌿
          </text>
        </svg>

        {/* Pointer Triangle */}
        <div className="absolute top-0 left-1/2 -mt-1 -ml-4 w-8 h-8 z-20">
          <div 
            className="w-0 h-0"
            style={{
              borderLeft: '16px solid transparent',
              borderRight: '16px solid transparent',
              borderTop: '24px solid black'
            }}
          />
        </div>
      </div>

      {/* Result Display */}
      {currentSection && !isSpinning && (
        <div className="text-lg font-medium text-center" style={{ color: currentSection.bgColor }}>
          You landed on: {currentSection.name}!
        </div>
      )}

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="rounded-full text-white font-bold px-8 py-3"
        style={{
          backgroundColor: isSpinning ? '#ccc' : '#f45b3c',
          cursor: isSpinning ? 'not-allowed' : 'pointer'
        }}
      >
        <div className="flex items-center gap-2">
          Spin for
          <span className="flex items-center gap-1">
            <span className="text-xl">🌍</span>
            <span>5</span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default SpinningWheel;