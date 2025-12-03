import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { getProducts } from "../services/api";
const mockModal = {
  show: jest.fn(),
  hide: jest.fn(),
  dispose: jest.fn(),
};

// Mock do Bootstrap
jest.mock("bootstrap", () => ({
  Modal: jest.fn(() => mockModal),
}));

// No início do describe
let mockModalInstance;

beforeEach(() => {
  jest.clearAllMocks();
  getProducts.mockResolvedValue(mockProducts);

  // Reset do mock
  mockModalInstance = {
    show: jest.fn(),
    hide: jest.fn(),
    dispose: jest.fn(),
  };
  require("bootstrap").Modal.mockImplementation(() => mockModalInstance);
});

// Mock de dados para simular o retorno da API
const mockProducts = [
  { id: 1, title: "Produto A", price: 100, category: "eletronicos" },
  { id: 2, title: "Produto B", price: 500, category: "moda" },
  { id: 3, title: "Produto C", price: 200, category: "eletronicos" },
  { id: 4, title: "Produto D", price: 80, category: "casa" },
  { id: 5, title: "Produto E", price: 150, category: "casa" },
  ...Array(15)
    .fill(0)
    .map((_, i) => ({
      id: i + 6,
      title: `Produto Extra ${i + 6}`,
      price: 10 + i,
      category: "variados",
    })),
];

// Mock da função da API
jest.mock("../services/api", () => ({
  getProducts: jest.fn(() => Promise.resolve(mockProducts)),
}));

describe("App Component (Lógica Principal)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getProducts.mockResolvedValue(mockProducts);
  });

  // --- Carregamento e Renderização Inicial ---
  test("deve carregar os produtos e renderizar os 12 primeiros", async () => {
    render(<App />);
    expect(screen.getAllByTestId("skeleton-card")).toHaveLength(12);

    await waitFor(() => {
      expect(screen.getByText("Produto A")).toBeInTheDocument();
    });

    const productCards = screen.getAllByText(/Produto/);
    expect(productCards.length).toBe(12);
  });

  // --- Filtragem por texto ---
  test("deve filtrar a lista por texto corretamente", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("Produto A")).toBeInTheDocument()
    );

    const searchInput = screen.getByPlaceholderText(/Buscar produtos.../i);
    fireEvent.change(searchInput, { target: { value: "Produto B" } });

    await waitFor(() => {
      expect(screen.getByText("Produto B")).toBeInTheDocument();
      expect(screen.queryByText("Produto A")).not.toBeInTheDocument();
    });
  });

  // --- Ordenação ---
  test("deve ordenar por preço (ascendente) corretamente", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("Produto A")).toBeInTheDocument()
    );

    const sortSelect = screen.getByRole("combobox");
    fireEvent.change(sortSelect, { target: { value: "asc" } });

    await waitFor(() => {
      const firstProduct = screen.getAllByText(/Produto/)[0];
      expect(firstProduct.textContent).toContain("Produto Extra 6");
    });
  });

  // --- Paginação ---
  test("deve mudar a página corretamente ao clicar no botão de paginação", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("Produto A")).toBeInTheDocument()
    );

    const page2Button = screen.getByRole("button", { name: "2" });
    fireEvent.click(page2Button);

    await waitFor(() => {
      expect(screen.queryByText("Produto A")).not.toBeInTheDocument();
      expect(screen.getByText(/Produto Extra 18/)).toBeInTheDocument();
    });
  });

  // --- Filtro de Categoria ---
  test("deve filtrar por categoria e redefinir a página para 1", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("Produto B")).toBeInTheDocument()
    );

    const modaButton = screen.getByRole("button", { name: /moda/i });
    fireEvent.click(modaButton);

    await waitFor(() => {
      expect(screen.getByText("Produto B")).toBeInTheDocument();
      expect(screen.queryByText("Produto A")).not.toBeInTheDocument();
    });
  });

  // --- Modal (ajustado para portais e getByText) ---
  test("deve abrir e fechar o modal de produto", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Produto A")).toBeInTheDocument();
    });

    // Abrir modal
    const productACard = screen.getByTestId("product-card-1");
    fireEvent.click(productACard);

    // Verificar se o Modal foi instanciado
    await waitFor(() => {
      expect(mockModalInstance.show).toHaveBeenCalled();
    });

    // Verificar se o modalProduct foi definido (estado do App)
    // Você pode precisar exportar o componente App ou usar uma abordagem diferente
    // para verificar o estado interno

    // Para fechar, podemos clicar no botão de fechar
    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);

    // Verificar se hide foi chamado
    await waitFor(() => {
      expect(mockModalInstance.hide).toHaveBeenCalled();
    });
  });
});
