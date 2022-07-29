import React from "react";
import DropDown from "./DropDown";
import FormControl from "./FormControl";

export default function DynamicInput({field, value, handler}) {
  let formComponent = <span>Invalid form type</span>

  if (['text', 'number'].includes(field.type)) {
    formComponent = <FormControl field={field} handler={handler} value={value} type={field.type}></FormControl>
  } else if (field.type === 'dropdown') {
    formComponent = <DropDown field={field} handler={handler} selected={value}></DropDown>
  }

  return (
    formComponent
  );
}
