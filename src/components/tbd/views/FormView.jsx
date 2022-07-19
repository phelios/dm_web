import React, {useState} from 'react'
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {tbdFetch} from "../http";
import DynamicInput from '../components/DynamicInput';
import Row from 'react-bootstrap/Row'
import { useLoading } from '../../providers/LoadingContext';

function FormView({schema, data, onChange}) {

  const [formData, setFormData] = useState({});

  function updateFormData(fieldName, val) {
    setFormData({...formData, [fieldName]: val});
  }

  // function handleNew() {
  //   let data = {
  //     method: 'POST',
  //     body: JSON.stringify(formData),
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   tbdFetch(url, data, r => {
  //     setEditMode(false)
  //     r.json().then(newData => setListData([...listData, newData]));
  //   }, setIsLoading);
  // }

  function handleNew() {}

  function handleCancel() {
    if (data.editMode == 'new') {
      data = null
    } else if (data.editMode == 'update') {
      delete data.editMode
    }

    onChange(data);
  }

  return (
    <Card>
      <Form>
        <Row>
          {schema.map((field) =>
            <Col key={field.name}>
              <DynamicInput field={field} handler={updateFormData} />
            </Col>
          )}
          <Col xs="1" lg='2'>
            <Button onClick={handleNew}>Save</Button>
          </Col>
          <Col xs="1" lg='2'>
            <Button onClick={handleCancel}>Cancel</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default FormView
