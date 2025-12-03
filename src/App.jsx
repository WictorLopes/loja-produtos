import { useState, useEffect, useMemo } from "react";
import { getProducts } from "./services/api.js";
import { ProductCard } from "./Components/ProductCard.jsx";
import { ProductModal } from "./Components/ProductModal.jsx";
import { Pagination } from "./Components/Pagination";
import { Sidebar } from "./Components/Sidebar";
import { Filters } from "./Components/Filters";
import { SkeletonCard } from "./Components/SkeletonCard";

export default function App() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortPrice, setSortPrice] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalProduct, setModalProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const itemsPerPage = 12;

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 600));
      const data = await getProducts();
      setProducts(data);
      setIsLoading(false);
    }
    load();
  }, []);

  const handleSetCategoryFilter = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
    setIsSidebarOpen(false);
  };
  const handleSetSearchText = (text) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(() => {
    let currentFiltered = products.filter((p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (categoryFilter !== "all") {
      currentFiltered = currentFiltered.filter(
        (p) => p.category === categoryFilter
      );
    }

    const sorted = [...currentFiltered];

    if (sortPrice === "asc") sorted.sort((a, b) => a.price - b.price);
    if (sortPrice === "desc") sorted.sort((a, b) => b.price - a.price);

    return sorted;
  }, [products, searchText, categoryFilter, sortPrice]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="bg-light min-vh-100">
      <header
        className="py-3 shadow-sm sticky-top bg-gradient"
        style={{ backgroundColor: "white" }}
      >
        <div className="container-fluid container-xl d-flex align-items-center gap-3 px-4">
          <h1 className="h4 fw-bold text-black mb-0">🛒 Loja do Wictor</h1>

          <button
            className="btn btn-outline-dark d-lg-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰{" "}
          </button>

          <Filters
            searchText={searchText}
            setSearchText={handleSetSearchText}
          />
        </div>
      </header>

      <div className="container-fluid container-xl d-flex mt-4 px-4">
        <aside
          className={isSidebarOpen ? "d-block" : "d-none d-lg-block w-25 me-4"}
        >
          <Sidebar
            categories={categories}
            categoryFilter={categoryFilter}
            setCategoryFilter={handleSetCategoryFilter}
            sortPrice={sortPrice}
            setSortPrice={setSortPrice}
            isSidebarOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </aside>

        <main className="flex-grow-1">
          {isLoading && (
            <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 g-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div className="col" key={index}>
                  <SkeletonCard />
                </div>
              ))}
            </div>
          )}

          {!isLoading && filtered.length > 0 && (
            <>
              <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 g-4">
                {paginated.map((product) => (
                  <div className="col" key={product.id}>
                    <ProductCard
                      product={product}
                      onClick={() => setModalProduct(product)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 mb-5">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className="text-center text-secondary h5 py-5">
              ❌ Nenhum produto encontrado.
            </div>
          )}
        </main>
      </div>

      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
}
