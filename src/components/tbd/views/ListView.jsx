import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import {BsPencil} from "react-icons/bs";

function ListView({data, schema, onChange}) {
  function handleEdit() {
    data.editMode = "update";
    onChange(data, "update");
  }

  function DynamicDisplay({data, fieldSpec}) {
      if (fieldSpec.type === 'text') {
        return (<Col>{data[fieldSpec.name]}</Col>)
      } else if (fieldSpec.type === 'dropdown') {
        return (<Col>{fieldSpec.list.filter( i => i.id === data[fieldSpec.name])[0].name}</Col>)
      }
  }

  return (
        <Card>
          <Card.Header className='align-middle'>
            <Row>
              {
                schema.map((fieldSpec) => <DynamicDisplay key={fieldSpec.name} data={data} fieldSpec={fieldSpec} />)
              }
              <Col xs={1} sm={1}>
                <Button onClick={handleEdit}>
                 <BsPencil />
                </Button>
              </Col>
            </Row>
          </Card.Header>
        </Card>
  )
}

export default ListView
