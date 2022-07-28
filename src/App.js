import './App.css';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';
import React, { useState } from 'react';
import {
  BrowserRouter as Router, 
  Routes,
  Route,
  Navigate,
  Link
} from 'react-router-dom';
import Categories from './components/pages/Categories';
import Criteria from './components/pages/Criteria';
import ProjectCriteria from './components/pages/ProjectCriteria';
import CandidateScore from './components/pages/CandidateScore';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LoadingProvider, useLoading } from './components/providers/LoadingContext';
import { Spinner } from 'react-bootstrap';


function App() {

  const [pageTitle, setPageTitle] = useState('');

  function TbdSpinner() {
    const {isLoading} = useLoading();

    if (isLoading) {
      return <Spinner animation='border' variant='light' />
    } else {
      return null
    }
  }

  return (
    <LoadingProvider pageTitle={pageTitle}>
      <Container>
        <Router>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="projects">DM</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="projects">Projects</Nav.Link>
                <Nav.Link as={Link} to="categories">Categories</Nav.Link>
                <Nav.Link as={Link} to="criteria">Criteria</Nav.Link>
              </Nav>
              <TbdSpinner />
            </Container>
          </Navbar>
          <h1>
            <Row>
              <Col>{pageTitle}</Col>
            </Row>
          </h1>
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
      </Container>
    </LoadingProvider>
  );
}

export default App;
