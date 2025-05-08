import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Artwork from '../components/artwork/Artwork';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addToCart } from '../features/cart/cartSlice';

// Sample artwork data for testing
const sampleArtwork = {
  objectID: 123,
  title: 'Test Artwork',
  objectDate: '1900',
  primaryImageSmall: 'https://example.com/image.jpg',
  price: 2000,
};

function renderWithProviders(
  ui,
  {
    preloadedState = {
      cart: {
        cart: [],
        message: null,
      },
    },
  } = {}
) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    ),
  };
}

describe('Artwork Component', () => {
  test('renders artwork details', () => {
    renderWithProviders(<Artwork artwork={sampleArtwork} />);

    expect(screen.getByText('Test Artwork')).toBeInTheDocument();
    expect(screen.getByText(/Date:/)).toHaveTextContent('Date: 1900');
    expect(screen.getByText(/Price:/)).toHaveTextContent('Price: $2000');
    expect(screen.getByAltText('Test Artwork')).toHaveAttribute('src', sampleArtwork.primaryImageSmall);
  });

  test('adds item to cart on button click', () => {
    const { store } = renderWithProviders(<Artwork artwork={sampleArtwork} />);

    const button = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(button);

    const state = store.getState();
    expect(state.cart.cart).toHaveLength(1);
    expect(state.cart.cart[0].objectID).toBe(sampleArtwork.objectID);
  });

  test('disables button if artwork is already in cart', () => {
    renderWithProviders(<Artwork artwork={sampleArtwork} />, {
      preloadedState: {
        cart: {
          cart: [sampleArtwork], // item already in cart
          message: null,
        },
      },
    });

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeDisabled();
  });
});
