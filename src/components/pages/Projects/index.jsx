import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import ListView from '../../tbd/crud/ListView'
import {dm_backend_url} from "../../../config"
import Button from "react-bootstrap/Button"
import FormView from "../../tbd/crud/FormView";

export default function Projects() {
  const fields = ['name']
  const url = dm_backend_url + '/projects/'
  const [editMode, setEditMode] = useState(false)

  function editor() {
    if (editMode) {
      return (<FormView fields={fields} url={url} />)
    } else {
      return (<Button onClick={() => setEditMode(true)}>Add</Button>)
    }
  }

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
      <ListView fields={fields} url={url}/>
      {editor()}
    </Container>
  )
}
