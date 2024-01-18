// components/ErrorCard.js
import React, { useEffect } from 'react';
// @ts-ignore
const ErrorCard = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose(); // Automatically close the error card after 3 seconds
    }, 3000);

    return () => {
      clearTimeout(timeout); // Clear the timeout on component unmount or when onClose is triggered
    };
  }, [onClose, message]);

  return (
    <div className="fixed  inset-0 z-50 overflow-hidden flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0  opacity-75"></div>
      </div>
      <div className=" rounded-lg p-4 bg-gray-500">
        <p className="text-white text-center text-lg font-bold w-[17rem]">{message}</p>
        {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Close
        </button> */}
      </div>
    </div>
  );
};

export default ErrorCard;
