import React from "react";
import { Container } from "react-bootstrap";
import { LoadingProvider, useLoading } from "./LoadingContext";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        <h1>
          <Row>
            <Col>DM - {pageTitle}</Col>
          </Row>
        </h1>
        {children}
      </Container>
    </LoadingProvider>
  )
}