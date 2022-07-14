import React from "react";
import DropDown from "./DropDown";
import FormControl from "./FormControl";

export default function DynamicInput({field}) {
  let formComponent = <span>Invalid form type</span>

  if (field.type === 'text') {
    formComponent = <FormControl field={field}></FormControl>
  } else if (field.type === 'dropdown') {
    formComponent = <DropDown field={field}></DropDown>
  }

  return (
    formComponent
  );
}
