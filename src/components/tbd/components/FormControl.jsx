import React from "react";
import Form from "react-bootstrap/Form";

export default function FormControl({field, handler}) {
  return(
    <Form.Control type='text'
                  placeholder={field.name}
                  // value={formData[field].toString()}
                  onChange={e => handler(field.name, e.target.value)}
    />

  )
}