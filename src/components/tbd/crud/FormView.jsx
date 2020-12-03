import React, {useState} from 'react'
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {tbdFetch} from "../http";

function FormView({fields, url, setIsLoading, setListData, listData}) {

  const initData = fields.reduce((obj, val) => {
    obj[val] = '';
    return obj;
  }, {});

  const [formData, setFormData] = useState(initData);
  const [editMode, setEditMode] = useState(false)

  function updateFormData(fieldName, text) {
    console.log(fieldName, text)
    setFormData({...formData, [fieldName]: text});
  }

  function handleNew() {
    let data = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    tbdFetch(url, data, r => {
      setEditMode(false)
      r.json().then(newData => setListData([...listData, newData]));
    }, setIsLoading);
  }

  if (editMode) {
    return (
      <Card>
        <Form>
          <Form.Row>
            {fields.map((field) =>
              <Col key={field}>
                <Form.Control type='text'
                              placeholder={field}
                              value={formData[field].toString()}
                              onChange={e => updateFormData(field, e.target.value)}
                />
              </Col>
            )}
            <Col xs="1" lg='2'>
              <Button block onClick={handleNew}>Save</Button>
            </Col>
          </Form.Row>
        </Form>
      </Card>
    )
  } else {
    return (<Button onClick={() => setEditMode(true)}>Add</Button>)
  }

}

export default FormView
