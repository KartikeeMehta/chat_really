import React from "react";

function Button({ label = "", type = "", className = "", disabled = false }) {
  return (
    <div>
      <button type={type} className={`${className}`} disabled={disabled}>
        {label}
      </button>
    </div>
  );
}

export default Button;
