import React, { useEffect } from "react";
import "../styles/toast.css"; // CSS dosyanızı buraya ekleyebilirsiniz

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="toast-container">
      <div className="toast">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Toast;
