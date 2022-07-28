import React from "react";
import { Container } from "react-bootstrap";
import { LoadingProvider, useLoading } from "./LoadingContext";
import Spinner from "react-bootstrap/Spinner";

export default function LayoutProvider({ children, pageTitle}) {

  function TbdSpinner() {
    const {isLoading} = useLoading();

    if (isLoading) {
      return <Spinner className='float-right' animation='border' />
    } else {
      return null
    }
  }

  return(
    <LoadingProvider>
      <Container>
        <TbdSpinner />
        {children}
      </Container>
    </LoadingProvider>
  )
}