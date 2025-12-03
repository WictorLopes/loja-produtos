export function ProductCard({ product, onClick }) {
  const priceFormatted = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div
      onClick={onClick}
      className="card shadow-sm hover-shadow cursor-pointer h-100 border-0 rounded-4 overflow-hidden "
      style={{ transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div
        className="d-flex align-items-center justify-content-center bg-light rounded-top"
        style={{ height: "140px" }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="img-fluid"
          style={{ maxHeight: "100px", objectFit: "contain" }}
        />
      </div>

      <div className="card-body d-flex flex-column p-3">
        <p
          className="card-text text-dark fw-medium mb-1"
          style={{ fontSize: "0.9rem", lineHeight: "1.2" }}
        >
          <span
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.title}
          </span>
        </p>

        <p className="fs-5 fw-bold text-success mt-auto">{priceFormatted}</p>
      </div>
    </div>
  );
}
