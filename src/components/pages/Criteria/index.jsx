import React from 'react'
import Container from 'react-bootstrap/Container'
import ListView from '../../tbd/crud/ListView'
import {dm_backend_url} from "../../../config";

export default function Criteria () {
  const [name, weight] = ['name', 'weight']

  const fields = [name, weight]
  const url = dm_backend_url + 'criteria/'
  // const listDisplays = {
  //   left: name,
  //   right: weight,
  // };

  return (
    <Container>
      <h1>
        <div>
          <span>Criteria</span>
        </div>
      </h1>
      <ListView fields={fields} url={url} />
    </Container>
  )
}
