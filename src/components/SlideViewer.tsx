import { useEffect, useState } from 'react';
import HTMLFlipBookOrig from 'react-pageflip';
import './SlideViewer.css';

const HTMLFlipBook = HTMLFlipBookOrig as any;

interface SlideViewerProps {
  slides: string[];
  onClose: () => void;
}

export default function SlideViewer({ slides, onClose }: SlideViewerProps) {
  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });

  /* 화면 크기에 따라 슬라이드 크기 조절*/
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      setDimensions({
        width: window.innerWidth * 0.95,
        height: window.innerHeight * 0.7,
      });
    } else {
      setDimensions({
        width: 1000,
        height: 700,
      });
    }
  }, []);

  return (
    <div className="slide-viewer-overlay">
      <div className="slide-viewer-container">
        {/* 닫기 버튼 */}
        <button className="close-btn" onClick={onClose}>×</button>

        {/* 슬라이드북 구성 */}
        <HTMLFlipBook
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          responsive={true}
          drawShadow={true}
          flippingTime={500}
          usePortrait={false}
          startPage={0}
          mobileScrollSupport={true}
          useMouseEvents={true}
          className="book-flip"
        >
          {slides.map((src, idx) => (
            <div key={idx} className="page">
              <img src={src} alt={`slide-${idx}`} />
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
}
