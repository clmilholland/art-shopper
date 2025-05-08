import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArtworkItem from '../components/artworkItem/ArtworkItem';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import cartReducer from '../features/cart/cartSlice';
import artworkReducer from '../features/artwork/gatherArtworkSlice';

const mockArtwork = {
    1: {
      objectID: 1,
      title: 'Test Artwork',
      objectDate: '2024',
      primaryImageSmall: 'https://example.com/art.jpg',
      price: 1000,
    },
  };

function renderWithProvidersAndRouter(
ui,
{
    route = '/artwork/1',
    path = '/artwork/:ID',
    preloadedState = {
    cart: { cart: [], message: null },
    artwork: { artwork: mockArtwork }
    }
} = {}
) {
const store = configureStore({
    reducer: {
    cart: cartReducer,
    artwork: artworkReducer,
    },
    preloadedState,
});

return {
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={path} element={ui} />
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
    store // ← include this
  };
}  

test('renders artwork details from Redux state', () => {
    renderWithProvidersAndRouter(<ArtworkItem />);
  
    expect(screen.getByText('Test Artwork')).toBeInTheDocument();
    expect(screen.getByText((content, element) =>
        element.tagName.toLowerCase() === 'h5' &&
        content.includes('Date of Creation:')
      )).toHaveTextContent('Date of Creation: 2024');
    // Assert the "Price" heading is present
    expect(screen.getByText('Price')).toBeInTheDocument();
    // Assert the price value is rendered correctly
    expect(screen.getByText('$1000')).toBeInTheDocument();
    expect(screen.getByAltText('Test Artwork')).toBeInTheDocument();
});

test('adds item to cart on button click', () => {
    const { store } = renderWithProvidersAndRouter(<ArtworkItem />);

    const button = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(button);

    const state = store.getState();
    expect(state.cart.cart).toHaveLength(1);
    expect(state.cart.cart[0].objectID).toBe(1);
});

test('disables button if item is already in cart', () => {
    renderWithProvidersAndRouter(<ArtworkItem />, {
        preloadedState: {
        cart: { cart: [mockArtwork[1]], message: null },
        artwork: { artwork: mockArtwork }
        }
    });

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeDisabled();
});
  
  