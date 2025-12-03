import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from '../Sidebar';

// Mock de props
const mockCategories = ["eletronicos", "moda"];
const mockProps = {
    categories: mockCategories,
    categoryFilter: "all",
    setCategoryFilter: jest.fn(),
    sortPrice: "none",
    setSortPrice: jest.fn(),
    isSidebarOpen: false,
    onClose: jest.fn(),
};

describe('Sidebar Component (com Mobile Logic)', () => {
    
    // --- Testes de Renderização e Interação (Conteúdo) ---
    
    test('deve renderizar e interagir com o campo de ordenação', () => {
        render(<Sidebar {...mockProps} />);
        
        const sortSelect = screen.getByRole('combobox');
        fireEvent.change(sortSelect, { target: { value: 'desc' } });
        
        expect(mockProps.setSortPrice).toHaveBeenCalledWith('desc');
    });

    test('deve chamar setCategoryFilter ao clicar em uma categoria', () => {
        render(<Sidebar {...mockProps} isSidebarOpen={true} />);
        
        const targetCategory = mockCategories[0]; 
        const categoryButton = screen.getByText(new RegExp(targetCategory, 'i'));
        
        fireEvent.click(categoryButton);
        
        // Verifica se a categoria foi atualizada (onClose não é chamado pelo componente isoladamente)
        expect(mockProps.setCategoryFilter).toHaveBeenCalledWith(targetCategory);
        // Nota: onClose é chamado apenas no App via handleSetCategoryFilter. Para testar integração, use um teste de App.
    });

    // --- Testes de Responsividade (Mobile vs. Desktop) ---
    
    test('deve estar visível (Desktop) quando isSidebarOpen é false (d-lg-block)', () => {
        // Quando a sidebar está fechada, ela deve renderizar a versão desktop (d-lg-block)
        const { container } = render(<Sidebar {...mockProps} isSidebarOpen={false} />);
        
        // Verifica a classe d-lg-block
        const sidebarDiv = container.querySelector('.bg-white');
        expect(sidebarDiv).toHaveClass('d-none');
        expect(sidebarDiv).toHaveClass('d-lg-block');
        expect(sidebarDiv).toHaveClass('sticky-lg-top');
        
        // Não deve haver o overlay
        expect(container.querySelector('.opacity-50')).toBeNull();
    });

    test('deve estar visível (Mobile) e ter overlay quando isSidebarOpen é true', () => {
        const { container } = render(<Sidebar {...mockProps} isSidebarOpen={true} />);
        
        // 1. Verifica se a classe d-block (mobile) está presente
        const sidebarDiv = container.querySelector('.bg-white');
        expect(sidebarDiv).toHaveClass('d-block');
        expect(sidebarDiv).not.toHaveClass('d-none'); // Não deve ter d-none
        
        // 2. Verifica a presença do overlay (fundo escuro)
        const overlayDiv = container.querySelector('.opacity-50');
        expect(overlayDiv).toBeInTheDocument();
    });
    
    test('deve chamar onClose ao clicar no overlay', () => {
        const { container } = render(<Sidebar {...mockProps} isSidebarOpen={true} />);
        
        const overlayDiv = container.querySelector('.opacity-50');
        fireEvent.click(overlayDiv);
        
        expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });
});