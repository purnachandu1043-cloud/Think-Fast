import React from 'react';
import { Link } from 'react-router-dom';
import { FaJs, FaPython, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaBrain, FaNetworkWired, FaServer } from 'react-icons/fa';

const subjects = [
  { id: 'js', name: 'JavaScript', icon: <FaJs color="#F7DF1E" /> },
  { id: 'python', name: 'Python', icon: <FaPython color="#3776AB" /> },
  { id: 'html', name: 'HTML', icon: <FaHtml5 color="#E34F26" /> },
  { id: 'css', name: 'CSS', icon: <FaCss3Alt color="#1572B6" /> },
  { id: 'react', name: 'React', icon: <FaReact color="#61DAFB" /> },
  { id: 'node', name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
  { id: 'dsa', name: 'DSA', icon: <FaNetworkWired color="#9C88FF" /> },
  { id: 'express', name: 'Express', icon: <FaServer color="#FFFFFF" /> },
  { id: 'gk', name: 'General Knowledge', icon: <FaBrain color="#FF6B6B" /> },
];

const SubjectSelection = () => {
  return (
    <div className="container">
      <div className="text-center">
        <h1 className="text-primary">Choose a Subject</h1>
        <p className="text-secondary">Select a topic to start your quiz</p>
      </div>
      
      <div className="grid-cards">
        {subjects.map((subject) => (
          <Link 
            to={`/quiz/${subject.id}`} 
            key={subject.id}
            className="subject-card glass-panel"
          >
            <div className="subject-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{subject.icon}</div>
            <h2 className="text-primary">{subject.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelection;
