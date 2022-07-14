import React, {useState} from 'react'
import ListView from '../../tbd/views/ListView'
import {dm_backend_url} from "../../../config"
import FormView from "../../tbd/views/FormView";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Projects() {

  const fields = ['name'];
  const url = dm_backend_url + '/projects/';

  const [listData, setListData] = useState([]);

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
