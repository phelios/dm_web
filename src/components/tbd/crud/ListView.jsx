import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import {tbdFetch} from "../http";

function ListView ({ fields, url }) {
  const [listData, setListData] = useState([])

  useEffect(() => {
    tbdFetch(url, {}, r => {
      r.json().then(json => setListData(json))
    })
  }, [url])

  return (
    <>
      {listData.map((item) =>
          <Card key={item.id}>
            <Card.Header>
              <Row>
                {
                  fields.map((field) =>
                      <Col key={field}>{item[field]}</Col>
                  )
                }
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
