export function Sidebar({
  categories,
  categoryFilter,
  setCategoryFilter,
  sortPrice,
  setSortPrice,
}) {
  return (
    <div
      className="bg-white rounded-4 shadow-sm p-4 sticky-lg-top"
      style={{ top: "80px", width: "max-content" }}
    >
      {/* Seção de Categorias */}
      <div className="mb-4">
        <h3 className="fs-6 fw-bold mb-3">Categoria</h3>
        <div className="d-grid gap-2">
          <button
            className={`btn btn-sm rounded-pill text-start fw-semibold ${
              categoryFilter === "all"
                ? "btn-warning text-white shadow-sm"
                : "btn-light"
            }`}
            onClick={() => setCategoryFilter("all")}
            style={{ transition: "all 0.2s" }}
          >
            Todas as Categorias
          </button>

          {categories.map((c) => (
            <button
              key={c}
              className={`btn btn-sm rounded-pill text-start text-capitalize fw-semibold ${
                categoryFilter === c
                  ? "btn-warning text-white shadow-sm"
                  : "btn-light"
              }`}
              onClick={() => setCategoryFilter(c)}
              style={{ transition: "all 0.2s" }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Seção de Ordenação */}
      <div>
        <h3 className="fs-6 fw-bold mb-2">Ordenar por</h3>
        <select
          className="form-select form-select-sm"
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
        >
          <option value="none">Padrão (Relevância)</option>
          <option value="asc">Menor preço</option>
          <option value="desc">Maior preço</option>
        </select>
      </div>
    </div>
  );
}
