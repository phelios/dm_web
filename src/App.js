import './App.css';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';
import React, { useState } from 'react';
import {
  BrowserRouter as Router, 
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import LayoutProvider from './components/providers/LayoutProvider';

function App() {

  const [pageTitle, setPageTitle] = useState('');

  return (
    <LayoutProvider pageTitle={pageTitle}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="projects" replace={true} />} />
          <Route path="projects" element={<Projects setPageTitle={setPageTitle} />} />
          <Route path="projects/:projectId" element={<Project />} />
        </Routes>
      </Router>
    </LayoutProvider>
  );
}

export default App;
