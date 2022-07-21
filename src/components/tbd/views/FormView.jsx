import React, {useEffect, useState} from 'react'
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import DynamicInput from '../components/DynamicInput';
import Row from 'react-bootstrap/Row'

function FormView({schema, data, onChange, onDelete, onNew, onUpdate}) {

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data.editMode === 'update') {
      setFormData(data);
    }
  }, [data])

  function updateFormData(fieldName, val) {
    setFormData({...formData, [fieldName]: val});
  }

  function handleNew() {
    onNew(formData)
      .then(r => {
        r.json().then(newData => onChange(newData, "add"));
      })
  }

  function handleUpdate() {
    const formDataWithId = {...formData, id: data.id}
    onUpdate(formDataWithId, data.id)
    .then(r => {
      r.json().then(newData => onChange(newData, "update"));
    });
  }
  
  function handleDelete() {
    onDelete(data.id)
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
    if (data.editMode === 'new') {
      onChange(data, "delete");
    } else if (data.editMode === 'update') {
      delete data.editMode
      onChange(data, "update");
    }

  }

  return (
    <Card>
      <Form className="form-view">
        <Row>
          {schema.map((field) =>
            <Col key={field.name}>
              <DynamicInput field={field} handler={updateFormData} value={formData[field.name]} />
            </Col>
          )}
          <Col xs="4" sm='4' className="right-align">
            <Button onClick={handleSave}>Save</Button>
            {
              data.editMode === 'update' ? 
                  <Button onClick={handleDelete} variant="danger">Delete</Button>:
                null
            }
            <Button onClick={handleCancel}>Cancel</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default FormView
