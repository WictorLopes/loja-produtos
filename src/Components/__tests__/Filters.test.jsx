import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Filters } from '../Filters';

describe('Filters Component', () => {
    // Mock functions
    const mockSetSearchText = jest.fn();
    const mockSetSortPrice = jest.fn();
    
    // Props simuladas
    const mockProps = {
        searchText: '',
        setSearchText: mockSetSearchText,
        sortPrice: 'none',
        setSortPrice: mockSetSortPrice,
    };

    test('deve renderizar o campo de busca (input)', () => {
        render(<Filters {...mockProps} />);
        
        // Busca o input pelo placeholder
        const searchInput = screen.getByPlaceholderText(/Buscar produtos.../i);
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveValue('');
    });

    test('deve exibir o valor correto de searchText', () => {
        render(<Filters {...mockProps} searchText="notebook" />);
        
        const searchInput = screen.getByPlaceholderText(/Buscar produtos.../i);
        expect(searchInput).toHaveValue('notebook');
    });

    test('deve chamar setSearchText ao digitar no campo de busca', () => {
        render(<Filters {...mockProps} />);
        
        const searchInput = screen.getByPlaceholderText(/Buscar produtos.../i);
        const newText = 'teclado';
        
        // Simula a digitação
        fireEvent.change(searchInput, { target: { value: newText } });
        
        // Verifica se a função foi chamada com o novo valor
        expect(mockSetSearchText).toHaveBeenCalledTimes(1);
        expect(mockSetSearchText).toHaveBeenCalledWith(newText);
    });
});