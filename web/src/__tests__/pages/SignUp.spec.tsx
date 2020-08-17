import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import SignUp from '../../pages/SignUp';

import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignUp Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign up', async () => {
    const apiResponse = {
      id: 'user-id',
      name: 'John Doe',
      email: 'johndoe@example.com.br',
    };

    apiMock.onPost('users').reply(200, apiResponse);

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameElement = getByPlaceholderText('Nome');
    const emailElement = getByPlaceholderText('E-mail');
    const passwordElement = getByPlaceholderText('Senha');

    const registerButton = getByText('Cadastrar');

    fireEvent.change(nameElement, { target: { value: 'John Doe' } });
    fireEvent.change(emailElement, {
      target: { value: 'johndoe@example.com.br' },
    });
    fireEvent.change(passwordElement, {
      target: { value: '123456789' },
    });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to sign up with invalid data', async () => {
    const { getByText } = render(<SignUp />);

    const registerButton = getByText('Cadastrar');

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/');
    });
  });

  it('should display an error if sign up fails', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    apiMock.onPost('users').reply(500, null);

    const nameElement = getByPlaceholderText('Nome');
    const emailElement = getByPlaceholderText('E-mail');
    const passwordElement = getByPlaceholderText('Senha');

    const registerButton = getByText('Cadastrar');

    fireEvent.change(nameElement, { target: { value: 'John Doe' } });
    fireEvent.change(emailElement, {
      target: { value: 'johndoe@example.com.br' },
    });
    fireEvent.change(passwordElement, {
      target: { value: '123456789' },
    });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
