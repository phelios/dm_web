import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";


export default function DropDown({field, handler}) {
  useEffect(() => {
    if (field.list.length > 0) {
      handler(field.name, field.list[0].id);
    }
  }, [field.list])


  return (
    <Form.Select onChange={e => handler(field.name, e.target.value)}>
      {field.list.map((option, index) =>
        <option key={option.id} value={index}>{option.name}</option>
      )}
    </Form.Select>
  );
}