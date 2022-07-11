import './App.css';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';
import React from 'react';
import {
  BrowserRouter as Router, 
  Routes,
  Route 
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectId" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;
