import React, {useEffect, useState} from 'react'
import {dm_backend_url} from "../../config"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLoading } from '../providers/LoadingContext';
import { tbdGet } from '../tbd/http';
import UniView from '../tbd/views/UniView';

export default function Projects() {

  const {setIsLoading} = useLoading();
  const [fields, setFields] = useState([])

  const categoryApiUrl = dm_backend_url + '/categories/';
  const projectsApiEndpoint = dm_backend_url + '/projects/';

  function initFields(json) {
    const fields = [{
      name: 'name',
      type: 'text'
    },
    {
      name: 'category_id',
      type: 'dropdown',
      list: json
    }];
    setFields(fields)
  }

  useEffect(() => {
    tbdGet(categoryApiUrl, {}, setIsLoading)
      .then( r => {
        r.json().then(json => initFields(json))
      })
  }, [categoryApiUrl])

  if (fields.length < 1) {
    return null
  }

  return (
    <div>
      <h1>
        <Row>
          <Col>Projects</Col>
        </Row>
      </h1>
      <UniView schema={fields} apiEndpoint={projectsApiEndpoint} />
    </div>
  )
}
