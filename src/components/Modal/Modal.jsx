import React, { useEffect } from "react";
import css from "components/Modal/Modal.module.css";
import PropTypes from "prop-types";

export default function Modal({ src, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={src.url} alt={src.tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.shape({
    url: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
