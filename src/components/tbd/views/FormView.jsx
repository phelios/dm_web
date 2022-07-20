import React, {useEffect, useState} from 'react'
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {tbdDelete, tbdPost, tbdPut} from "../http";
import DynamicInput from '../components/DynamicInput';
import Row from 'react-bootstrap/Row'
import { useLoading } from '../../providers/LoadingContext';

function FormView({schema, data, onChange, apiEndpoint}) {

  const [formData, setFormData] = useState({});
  const {setIsLoading} = useLoading();

  useEffect(() => {
    if (data.editMode === 'update') {
      setFormData(data);
    }
  }, [data])

  function updateFormData(fieldName, val) {
    setFormData({...formData, [fieldName]: val});
  }

  function handleNew() {
    tbdPost(apiEndpoint, formData, setIsLoading)
      .then(r => {
        r.json().then(newData => onChange(newData, "add"));
      })
  }

  function handleUpdate() {
    const formDataWithId = {...formData, id: data.id}
    tbdPut(`${apiEndpoint}${data.id}`, formDataWithId, setIsLoading).then(r => {
      r.json().then(newData => onChange(newData, "update"));
    });
  }
  
  function handleDelete() {
    tbdDelete(`${apiEndpoint}${data.id}`, setIsLoading)
      .then(r => {
      onChange(data, "delete");
    });
  }
  
  function handleSave() {
    if (data.editMode === 'new') {
      handleNew();
    } else if (data.editMode === 'update') {
      handleUpdate();
    }
  }

  function handleCancel() {
    if (data.editMode == 'new') {
      onChange(data, "delete");
    } else if (data.editMode == 'update') {
      delete data.editMode
      onChange(data, "update");
    }

  }

  return (
    <Card>
      <Form>
        <Row>
          {schema.map((field) =>
            <Col key={field.name}>
              <DynamicInput field={field} handler={updateFormData} value={formData[field.name]} />
            </Col>
          )}
          <Col xs="1" lg='2'>
            <Button onClick={handleSave}>Save</Button>
          </Col>
          {
            data.editMode === 'update' ? 
              <Col xs="1" lg='2'>
                <Button onClick={handleDelete} variant="danger">Delete</Button>
              </Col> :
              null
          }
          <Col xs="1" lg='2'>
            <Button onClick={handleCancel}>Cancel</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default FormView
