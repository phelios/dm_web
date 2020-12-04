import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import {tbdFetch} from "../http";
import {BsPencil, BsTrash} from "react-icons/bs";

function ListView({fields, url, setIsLoading, setListData, listData}) {

  useEffect(() => {
    tbdFetch(url, {}, r => {
      r.json().then(json => setListData(json))
    }, setIsLoading)
  }, [url])

  function handleDelete(id) {
    let data = {
      method: 'DELETE',
    };
    tbdFetch(`${url}${id}`, data, r => {
      setListData(
        listData.filter(v => {
          return v.id !== id;
        }),
      );
    }, setIsLoading);
  }

  return (
    <>
      {listData.map((item) =>
        <Card key={item.id}>
          <Card.Header className='align-middle'>
            <Row>
              {
                fields.map((field) =>
                  <Col key={field}>{item[field]}</Col>
                )
              }
              <Col className='text-right'>
                <Button>
                 <BsPencil />
                </Button>
                {' '}
                <Button onClick={() => handleDelete(item.id)}>
                  <BsTrash />
                </Button>
              </Col>
            </Row>
          </Card.Header>
        </Card>
      )}
    </>
  )
}

ListView.propTypes = {
  fields: PropTypes.array,
  url: PropTypes.string
}

export default ListView
