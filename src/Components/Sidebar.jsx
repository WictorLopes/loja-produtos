export function Sidebar({
  categories,
  categoryFilter,
  setCategoryFilter,
  sortPrice,
  setSortPrice,
  isSidebarOpen,
  onClose,
}) {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={onClose}
        ></div>
      )}

      <div
        className={`bg-white rounded-4 shadow-sm p-4 ${
          isSidebarOpen
            ? 'd-block position-fixed top-0 start-0 w-75 h-100'
            : 'd-none d-lg-block sticky-lg-top'
        }`}
        style={{ 
          top: "80px", 
          width: "max-content", 
          zIndex: 1050
        }}
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
    </>
  );
}