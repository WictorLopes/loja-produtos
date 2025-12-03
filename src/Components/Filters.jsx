export function Filters({
  searchText,
  setSearchText,
  sortPrice,
  setSortPrice,
}) {
  return (
    <div className="d-flex flex-grow-1 gap-2">
      {/* Campo de Busca */}
      <div className="input-group flex-grow-1">
        <span className="input-group-text bg-white border-end-0">🔎</span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Buscar produtos..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
}