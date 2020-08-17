import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';

import ForgotPassword from '../../pages/ForgotPassword';

const apiMock = new MockAdapter(api);

const mockedAddToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('ForgotPassword Page', () => {
  beforeEach(() => {
    mockedAddToast.mockClear();
  });

  it('should be able to render forgot password page', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    apiMock.onPost('/password/forgot').reply(204);

    const emailElement = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailElement, {
      target: {
        value: 'johndoe@example.com.br',
      },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should not be able to redeem password with invalid email', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailElement = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailElement, {
      target: {
        value: 'not-valid-email',
      },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).not.toHaveBeenCalled();
    });
  });

  it('should display an error if password recovery fails', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    apiMock.onPost('/password/forgot').reply(500, null);

    const emailElement = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailElement, {
      target: {
        value: 'johndoe@example.com.br',
      },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
