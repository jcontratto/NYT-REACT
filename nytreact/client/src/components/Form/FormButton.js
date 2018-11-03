import React from "react";

export const FormButton = props => (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
    {props.children}
    </button>
);