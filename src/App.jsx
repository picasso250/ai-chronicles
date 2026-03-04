import React from 'react';
import { Brain, Users, Trophy, Image, Target, Zap, MessageSquare, Cpu, Star } from 'lucide-react';
import { milestones } from './data';
import './App.css';

const IconMap = {
  brain: Brain,
  users: Users,
  trophy: Trophy,
  image: Image,
  target: Target,
  zap: Zap,
  'message-square': MessageSquare,
  cpu: Cpu,
  star: Star
};

function App() {
  return (
    <div className="app-wrapper">
      <header className="header">
        <h1>AI 纪元</h1>
        <p>探索机器智能的演进轨迹</p>
      </header>

      <div className="timeline">
        {milestones.map((item, index) => {
          const Icon = IconMap[item.icon] || Star;
          return (
            <div 
              key={index} 
              className={`node ${item.highlight ? 'highlighted' : ''}`}
            >
              <div className="glass-card">
                <div className="node-header">
                  <span className="year">{item.year}</span>
                  <h3 className="title">
                    <Icon size={18} className="icon" />
                    {item.title}
                  </h3>
                </div>
                <p className="desc">{item.description}</p>
                {item.details && <div className="details">{item.details}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
