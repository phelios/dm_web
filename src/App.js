import './App.css';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';
import React from 'react';
import {
  BrowserRouter as Router, 
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import LayoutProvider from './components/providers/LayoutProvider';

function App() {
  return (
    <LayoutProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="projects" replace={true} />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<Project />} />
        </Routes>
      </Router>
    </LayoutProvider>
  );
}

export default App;
