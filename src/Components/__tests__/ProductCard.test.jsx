import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductCard } from "../ProductCard";

// Mock de um produto
const mockProduct = {
  id: 1,
  title: "Smartphone Ultra",
  price: 1500.5,
  thumbnail: "image.jpg",
};

describe("ProductCard Component", () => {
  const mockOnClick = jest.fn();

  // Renderiza o componente antes de cada teste
  beforeEach(() => {
    render(<ProductCard product={mockProduct} onClick={mockOnClick} />);
  });

  // Teste 1: Renderização dos dados
  test("deve exibir o título e o preço formatado do produto", () => {
    // Título
    expect(screen.getByText("Smartphone Ultra")).toBeInTheDocument();
    // Preço formatado
    expect(screen.getByText(/US\$ 1\.500,50/i)).toBeInTheDocument();
  });

  // Teste 2: Atributos da imagem
  test("deve renderizar a imagem com src e alt corretos", () => {
    const image = screen.getByAltText(mockProduct.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct.thumbnail);
  });

  // Teste 3: Ação de clique
  test("deve chamar a função onClick ao clicar no card", () => {
    // O componente principal é um div com o manipulador de clique
    const productCardElement = screen
      .getByText(mockProduct.title)
      .closest(".card");

    if (productCardElement) {
      fireEvent.click(productCardElement);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    } else {
      // Falha o teste se o elemento pai não for encontrado (segurança)
      throw new Error("Não foi possível encontrar o elemento do Card.");
    }
  });
});