import PropTypes from "prop-types";
import React from "react";

function CheckboxInput({ handler, value, disabled, error, checked, text }) {
  const onChange = event => {
    event.preventDefault();
  };

  return (
    <a
      href="/"
      className={`checkbox ${checked ? "checked" : ""}`}
      onClick={onChange}
    >
      <input type="checkbox" />
      <span className="checkbox-content" tabIndex="-1">
        {text}
      </span>
    </a>
  );
}

CheckboxInput.defaultProps = {
  disabled: false,
  error: false
};

CheckboxInput.propTypes = {
  checked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool
};

export default CheckboxInput;
