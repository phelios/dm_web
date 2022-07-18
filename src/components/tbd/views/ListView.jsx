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

function ListView({fields, url, useListData}) {
  const navigate = useNavigate();
  const {setIsLoading} = useLoading();
  const {listData, setListData} = useListData;

  useEffect(() => {
    tbdFetch(url, {}, r => {
      r.json().then(json => setListData(json))
    }, setIsLoading)
  }, [url])

  function handleEdit(id) {
    navigate(String(id));
  }

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

  function DynamicDisplay({item, field}) {
      if (field.type === 'text') {
        return (<Col>{item[field.name]}</Col>)
      } else if (field.type === 'dropdown') {
        return (<Col>{field.list.filter( i => i.id == item[field.name])[0].name}</Col>)
      }
  }

  return (
    <div>
      {listData.map((item) =>
        <Card key={item.id}>
          <Card.Header className='align-middle'>
            <Row>
              {
                fields.map((field) => <DynamicDisplay key={field.name} item={item} field={field} />)
              }
              <Col className='text-right'>
                <Button onClick={() => handleEdit(item.id)}>
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
    </div>
  )
}

ListView.propTypes = {
  fields: PropTypes.array,
  url: PropTypes.string
}

export default ListView
