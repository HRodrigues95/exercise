import React from 'react';
import { Button } from "react-bootstrap";

function LoginBtn(props) {
  return (
    <Button
      onClick={props.onLogin}
      variant="primary"
      className="btn-margin">
      Login
    </Button>
  );
}

export default LoginBtn;