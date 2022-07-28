import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button";
import {BsPencil} from "react-icons/bs";
import { ListGroup } from 'react-bootstrap';

function ListView({data, schema, onChange, onClick}) {
  function handleEdit() {
    data.editMode = "update";
    onChange(data, "update");
  }

  function dynamicDisplay(data, fieldSpec) {
    let displayData = '';
    if (fieldSpec.type === 'text') {
      displayData = data[fieldSpec.name]
    } else if (fieldSpec.type === 'dropdown') {
      displayData = fieldSpec.list.filter( i => i.id === data[fieldSpec.name])[0].name
    }
    return displayData
  }

  function handleOnClick() {
    if (onClick instanceof Function) {
      onClick(data.id)
    }
  }

  return (
        <ListGroup variant='flush' >
          <ListGroup.Item className='align-middle'>
            <Row>
              {
                schema.map((fieldSpec) => <Col onClick={handleOnClick} key={fieldSpec.name}>{dynamicDisplay(data, fieldSpec)}</Col>)
              }
              <Col xs={1} sm={1}>
                <Button onClick={handleEdit}>
                 <BsPencil />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
  )
}

export default ListView
