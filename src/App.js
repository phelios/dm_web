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
import Categories from './components/pages/Categories';
import Criteria from './components/pages/Criteria';
import ProjectCriteria from './components/pages/ProjectCriteria';
import CandidateScore from './components/pages/CandidateScore';

function App() {

  const [pageTitle, setPageTitle] = useState('');

  return (
    <LayoutProvider pageTitle={pageTitle}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="projects" replace={true} />} />
          <Route path="projects" element={<Projects setPageTitle={setPageTitle} />} />
          <Route path="projects/:projectId/criteria" element={<ProjectCriteria setPageTitle={setPageTitle} />} />
          <Route path="projects/:projectId" element={<Project setPageTitle={setPageTitle} />} />
          <Route path="projects/:projectId/candidate/:candidateId" element={<CandidateScore setPageTitle={setPageTitle} />} />
          <Route path="categories" element={<Categories setPageTitle={setPageTitle} />} />
          <Route path="criteria" element={<Criteria setPageTitle={setPageTitle} />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </LayoutProvider>
  );
}

export default App;
