import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Brain, Users, Trophy, Image, Target, Zap, MessageSquare, Cpu, Star, Terminal, ChevronUp, ChevronDown } from 'lucide-react';
import { milestones as originalMilestones } from './data';
import './App.css';

const milestones = [...originalMilestones].reverse();

const IconMap = {
  brain: Brain,
  users: Users,
  trophy: Trophy,
  image: Image,
  target: Target,
  zap: Zap,
  'message-square': MessageSquare,
  cpu: Cpu,
  star: Star,
  terminal: Terminal
};

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, milestones.length - 1));
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      // 忽略较小的滚动，防止误触
      if (Math.abs(e.deltaY) < 10) return;
      
      // 节流处理
      if (isScrolling.current) return;
      isScrolling.current = true;
      
      if (e.deltaY > 0) {
        handleNext();
      } else if (e.deltaY < 0) {
        handlePrev();
      }
      
      setTimeout(() => {
        isScrolling.current = false;
      }, 600); 
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowUp') {
        handlePrev();
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      // 阈值判断，防止轻微抖动触发
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleNext, handlePrev]);

  return (
    <div className="app-wrapper">
      <header className="header">
        <h1>AI 纪元</h1>
        <p>探索机器智能的演进轨迹</p>
      </header>

      <div className="card-container">
        {milestones.map((item, index) => {
          const Icon = IconMap[item.icon] || Star;
          const offset = index - activeIndex;
          const absOffset = Math.abs(offset);
          
          let className = "card-wrapper";
          if (offset === 0) className += " active";
          else if (offset < 0) className += " past";
          else className += " future";
          
          if (item.highlight) className += " highlighted";

          return (
            <div 
              key={index} 
              className={className}
              style={{
                '--offset': offset,
                '--abs-offset': absOffset,
                zIndex: milestones.length - index,
              }}
              onClick={() => {
                if (offset > 0) setActiveIndex(index);
              }}
            >
              <div className="glass-card">
                <div className="card-content">
                  <div className="node-header">
                    <span className="year">{item.year}</span>
                    <h3 className="title">
                      <Icon size={28} className="icon" />
                      {item.title}
                    </h3>
                  </div>
                  <p className="desc">{item.description}</p>
                  {item.details && <div className="details">{item.details}</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="controls">
        <button onClick={handlePrev} disabled={activeIndex === 0} className="nav-btn">
          <ChevronUp size={24} />
        </button>
        <div className="indicator">
          {activeIndex + 1} / {milestones.length}
        </div>
        <button onClick={handleNext} disabled={activeIndex === milestones.length - 1} className="nav-btn">
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  );
}

export default App;
