import React from "react";
import DropDown from "./DropDown";
import FormControl from "./FormControl";

export default function DynamicInput({field, handler}) {
  let formComponent = <span>Invalid form type</span>

  if (field.type === 'text') {
    formComponent = <FormControl field={field} handler={handler}></FormControl>
  } else if (field.type === 'dropdown') {
    formComponent = <DropDown field={field} handler={handler}></DropDown>
  }

  return (
    formComponent
  );
}
