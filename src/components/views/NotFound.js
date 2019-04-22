import React from "react";
import "./LoginAndSignup.css";
import { FormattedMessage } from "react-intl";

const NotFound = () => (
  <div className="login-and-signup">
    <div className="form-card">
      <h1>
        404 <FormattedMessage id="err.missing" defaultMessage="No encontrado" />
      </h1>
      <h2>
        <FormattedMessage
          id="err.lost"
          defaultMessage="Parece que te perdiste."
        />
      </h2>
    </div>
  </div>
);

export default NotFound;
