import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pagination } from "../Pagination";

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();

  // Teste 1: Não deve renderizar se houver apenas uma página
  test("não deve renderizar se totalPages for 1 ou menos", () => {
    const { container } = render(
      <Pagination
        totalPages={1}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );
    expect(container.firstChild).toBeNull();

    const { container: container2 } = render(
      <Pagination
        totalPages={0}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );
    expect(container2.firstChild).toBeNull();
  });

  // Teste 2: Renderização de 5 páginas
  test("deve renderizar todos os números de página (5 páginas)", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />
    );

    // Verifica se os números de 1 a 5 estão presentes como botões
    for (let i = 1; i <= 5; i++) {
      expect(
        screen.getByRole("button", { name: i.toString() })
      ).toBeInTheDocument();
    }

    // Verifica se a página 3 está ativa
    const page3Button = screen.getByRole("button", { name: "3" });
    expect(page3Button.closest("li")).toHaveClass("active");
  });

  // Teste 3: o botão Anterior deve estar desabilitado na página 1
  test("o botão Anterior deve estar desabilitado na página 1", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    // Limpa o mock antes de tentar a interação
    mockOnPageChange.mockClear();

    // O botão Anterior é identificado pelo seu aria-label "Previous"
    const prevButton = screen.getByRole("button", { name: /Previous/i });

    // FIX: Verifica se o <li> pai tem a classe 'disabled' (não o botão em si, pois não há atributo disabled)
    expect(prevButton.closest("li")).toHaveClass("disabled");

    // Tenta clicar no botão
    fireEvent.click(prevButton);

    // Verifica se a função de troca de página NÃO foi chamada
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  // Teste 4: Navegação para a página anterior
  test("deve chamar onPageChange com a página -1 ao clicar no botão Anterior", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole("button", { name: /Previous/i });
    fireEvent.click(prevButton);

    // Espera ser chamada com 3 - 1 = 2
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});