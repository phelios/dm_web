import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";

export default function FormControl({field, value, handler, type}) {
  useEffect(() => {
    handler(field.name, value)
  }, [value])

  return(
    <Form.Control 
      type='text'
      placeholder={field.name}
      value={value? String(value) : ''}
      onChange={e => handler(field.name, e.target.value)}
    />

  )
}