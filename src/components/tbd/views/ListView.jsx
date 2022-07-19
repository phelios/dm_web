import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import {tbdFetch} from "../http";
import {BsPencil, BsTrash} from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { useLoading } from '../../providers/LoadingContext'

function ListView({data, schema, onChange}) {
  // useEffect(() => {
  //   tbdFetch(url, {}, r => {
  //     r.json().then(json => setListData(json))
  //   }, setIsLoading)
  // }, [url])

  // function handleEdit(id) {
  //   navigate(String(id));
  // }

  // function handleDelete(id) {
  //   let data = {
  //     method: 'DELETE',
  //   };
  //   tbdFetch(`${url}${id}`, data, r => {
  //     setListData(
  //       listData.filter(v => {
  //         return v.id !== id;
  //       }),
  //     );
  //   }, setIsLoading);
  // }

  function handleEdit() {
    data.editMode = "update";
    onChange(data);
  }

  function DynamicDisplay({data, fieldSpec}) {
      if (fieldSpec.type === 'text') {
        return (<Col>{data[fieldSpec.name]}</Col>)
      } else if (fieldSpec.type === 'dropdown') {
        return (<Col>{fieldSpec.list.filter( i => i.id == data[fieldSpec.name])[0].name}</Col>)
      }
  }

  return (
        <Card>
          <Card.Header className='align-middle'>
            <Row>
              {
                schema.map((fieldSpec) => <DynamicDisplay key={fieldSpec.name} data={data} fieldSpec={fieldSpec} />)
              }
              <Col className='text-right'>
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
