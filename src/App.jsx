import React from 'react';
import { Brain, Users, Trophy, Image, Target, Zap, MessageSquare, Cpu, Star } from 'lucide-react';
import { milestones } from './data';

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
    <div className="container">
      <header className="header">
        <h1>AI Chronicles</h1>
        <p className="subtitle">The Journey from Imitation to Discovery</p>
      </header>

      <div className="timeline">
        {milestones.map((item, index) => {
          const Icon = IconMap[item.icon] || Star;
          return (
            <div 
              key={index} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${item.highlight ? 'highlighted' : ''}`}
            >
              <div className="timeline-content">
                <div className="year-badge">{item.year}</div>
                <div className="content-inner">
                  <div className="icon-wrapper">
                    <Icon size={24} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.details && <div className="details">{item.details}</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
