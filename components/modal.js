import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const modalRoot = document.getElementById("__next");
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);
  }, []);

  useEffect(() => {
    return () => modalRoot.removeChild(el);
  });

  return createPortal(children, el);

};

const Modal = ({ titleModal, textModal, open, onClose }) => (
  open && (
    createPortal(
      <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white rounded shadow-lg w-1/2">
          <div className="border-b px-4 py-2 flex justify-between items-center">
            <h3 className="font-semibold text-lg">{titleModal}</h3>
            <button className="text-black close-modal" onClick={onClose}>&times;</button>
          </div>
          <div className="m-4 grid grid-cols-4 gap-4">
            {
              textModal.map( (item , idx) => (
                <div className="flex items-center" key={idx}>
                  <h1>{item['key']} <span className="text-gray-500">{item['doc_count']}</span></h1>
                </div>
              ))
            }
          </div>
        </div>
      </div>, document.body
    )
  )
)

export default Modal;