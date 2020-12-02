import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function ListView ({ fields, url }) {
  const [listData, setListData] = useState([])

  function _fetch (_url, data, handler) {
    // setIsLoading(true);
    fetch(_url, data)
      .then(r => {
        handler(r)
        // closeModal();
      })
      .catch(err => console.log(err))
      // .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    _fetch(url, {}, r => {
      r.json().then(json => setListData(json))
    })
  }, [url])

  return (
    <div>
      {
        listData.map((item) =>
          <Card key={item.id}>
            <Card.Header>
              <Row>
                {
                  fields.map((field) =>
                      <Col>{item[field]}</Col>
                  )
                }
              </Row>
            </Card.Header>
          </Card>
        )
      }
    </div>
  )
}

ListView.propTypes = {
  fields: PropTypes.array,
  url: PropTypes.string
}

export default ListView
