import React, {useState} from 'react'
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {tbdFetch} from "../http";
import DropDown from '../components/DropDown';
import {dm_backend_url} from "../../../config";
import Row from 'react-bootstrap/Row'
import { useLoading } from '../../providers/LoadingContext';

function FormView({fields, url, setListData, listData}) {

  const {setIsLoading} = useLoading();

  const initData = fields.reduce((obj, val) => {
    obj[val] = '';
    return obj;
  }, {});

  const [formData, setFormData] = useState(initData);
  const [editMode, setEditMode] = useState(false)

  function updateFormData(fieldName, text) {
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
          <Row>
            {fields.map((field) =>
              <Col key={field}>
                <Form.Control type='text'
                              placeholder={field}
                              value={formData[field].toString()}
                              onChange={e => updateFormData(field, e.target.value)}
                />
              </Col>
            )}
            {/* <DropDown url={dm_backend_url + 'categories/'} pk='id' fieldName='name' /> */}
            <Col xs="1" lg='2'>
              <Button onClick={handleNew}>Save</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  } else {
    return (<Button onClick={() => setEditMode(true)}>Add</Button>)
  }

}

export default FormView
