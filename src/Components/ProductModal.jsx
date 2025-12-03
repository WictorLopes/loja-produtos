import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";

export function ProductModal({ product, onClose }) {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (product) {
      modalInstance.current = new Modal(modalRef.current);
      modalRef.current.addEventListener("hidden.bs.modal", onClose);
      modalInstance.current.show();
    } else if (modalInstance.current) {
      modalInstance.current.hide();
    }

    return () => {
      if (modalInstance.current) {
        modalRef.current?.removeEventListener("hidden.bs.modal", onClose);
      }
    };
  }, [product, onClose]);

  if (!product) return null;

  const priceFormatted = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      ref={modalRef}
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content rounded-4 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body pt-0 px-4 text-center">
            <img
              src={product.thumbnail || product.images?.[0]}
              alt={product.title}
              className="img-fluid mb-3 rounded-3"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />

            <h2 className="fs-4 fw-bold">{product.title}</h2>
            <p className="text-secondary mt-2">{product.description}</p>

            <p className="fs-3 fw-semibold mt-3 text-success">
              {priceFormatted}
            </p>
          </div>
          <div className="modal-footer border-0 pt-0 px-4 pb-4">
            <button
              type="button"
              className="btn btn-success btn-lg w-100 rounded-pill shadow-sm"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
