import React from 'react';
import { Button } from "react-bootstrap";

function LogoutBtn(props) {
  return (
    <Button
      onClick={props.onLogout}
      variant="primary"
      className="btn-margin">
      Logout
    </Button>
  );
}

export default LogoutBtn;