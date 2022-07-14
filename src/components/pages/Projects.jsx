import React, {useEffect, useState} from 'react'
import ListView from '../tbd/views/ListView'
import {dm_backend_url} from "../../config"
import FormView from "../tbd/views/FormView";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLoading } from '../providers/LoadingContext';
import { tbdFetch } from '../tbd/http';

export default function Projects() {

  const {setIsLoading} = useLoading();
  const [fields, setFields] = useState([])
  const [listData, setListData] = useState([]);

  const categoryApiUrl = dm_backend_url + '/categories/';
  const url = dm_backend_url + '/projects/';

  function initFields(json) {
    const fields = [{
      name: 'name',
      type: 'text'
    },
    {
      name: 'category',
      type: 'dropdown',
      list: json
    }];
    setFields(fields)
  }

  useEffect(() => {
    tbdFetch(categoryApiUrl, {}, r => {
      r.json().then(json => initFields(json))
    }, setIsLoading)
  }, [categoryApiUrl])

  return (
    <div>
      <h1>
        <Row>
          <Col>Projects</Col>
        </Row>
      </h1>
      <ListView fields={fields} url={url} setListData={setListData} listData={listData} />
      <FormView fields={fields} url={url} setListData={setListData} listData={listData} />
    </div>
  )
}
