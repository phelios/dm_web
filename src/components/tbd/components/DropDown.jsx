import React from "react";
import Form from "react-bootstrap/Form";


export default function DropDown({field, handler, selected}) {
  if (selected === undefined) selected = "-1"
  const optionList = [{id: "-1", disabled: true, name: `Choose a ${field.name}`} , ...field.list] 

  return (
    <Form.Select value={selected} onChange={e => handler(field.name, e.target.value)}>
      {optionList.map(option =>
        <option 
          key={option.id}
          value={option.id} 
          disabled={option.disabled === true? 'disabled': null}>
            {option.name}
        </option>
      )}
    </Form.Select>
  );
}