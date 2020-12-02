import React from 'react'
import Container from 'react-bootstrap/Container'
import ListView from '../../tbd/crud/ListView'

export default function Criteria () {
  const [name, weight] = ['name', 'weight']

  const fields = [name, weight]
  const url = 'http://api.dm.sufendy.com/criteria/'
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
