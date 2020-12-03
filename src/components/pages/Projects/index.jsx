import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import ListView from '../../tbd/crud/ListView'
import {dm_backend_url} from "../../../config"
import Button from "react-bootstrap/Button"
import FormView from "../../tbd/crud/FormView";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Projects() {
  const fields = ['name']
  const url = dm_backend_url + '/projects/'

  const [isLoading, setIsLoading] = useState(false);

  // const listDisplays = {
  //   left: name,
  //   right: weight,
  // };

  function TbdSpinner() {
    if (isLoading) {
      return <Spinner className='float-right' animation='border' />
    } else {
      return null
    }
  }

  return (
    <Container>
      <h1>
        <Row>
          <Col>Projects</Col>
          <Col><TbdSpinner /></Col>
        </Row>
      </h1>
      <ListView fields={fields} url={url} setIsLoading={setIsLoading} />
      <FormView fields={fields} url={url} setIsLoading={setIsLoading} />
    </Container>
  )
}
