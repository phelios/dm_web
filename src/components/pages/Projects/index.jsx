import React from 'react'
import Container from 'react-bootstrap/Container'
import ListView from '../../tbd/crud/ListView'
import {dm_backend_url} from "../../../config";

export default function Projects () {
  const fields = ['name']
  const url = dm_backend_url + '/projects/'
  // const listDisplays = {
  //   left: name,
  //   right: weight,
  // };

  return (
    <Container>
      <h1>
        <div>
          <span>Projects</span>
        </div>
      </h1>
      <ListView fields={fields} url={url} />
    </Container>
  )
}
