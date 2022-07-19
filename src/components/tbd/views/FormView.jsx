import React, {useState} from 'react'
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {tbdFetch} from "../http";
import DynamicInput from '../components/DynamicInput';
import Row from 'react-bootstrap/Row'
import { useLoading } from '../../providers/LoadingContext';

function FormView({schema, data, handleNew}) {

  // const {setIsLoading} = useLoading();

  const [formData, setFormData] = useState({});
  // const [editMode, setEditMode] = useState(false);

  // const handler = {formData, setFormData}

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
        </Row>
      </Form>
    </Card>
  )
    // return (<Button onClick={() => setEditMode(true)}>Add</Button>)
}

export default FormView
