import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";


export default function DropDown({field, handler}) {

  function handleChange(e) {
    const selected = field.list[e.target.value];
    handler(field.name, selected);
  }

  return (
    <Form.Select onChange={e => handleChange(e)}>
      {field.list.map((option, index) =>
        <option key={option.id} value={index}>{option.name}</option>
      )}
    </Form.Select>
  );
}