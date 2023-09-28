import React from "react";
import Avatar from "react-avatar";
const Client = ({ userName }) => {
  return (
    <div className="client">
      <Avatar name={userName} size={36} round="2px" />
      <span className="userName" style={{ color: "#fff" }}>
        {userName}
      </span>
    </div>
  );
};

export default Client;
