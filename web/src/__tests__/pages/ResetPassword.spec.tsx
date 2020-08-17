import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import ResetPassword from '../../pages/ResetPassword';

import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

let mockedLocationSearch = '?token=user-token';

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: mockedLocationSearch,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('ResetPassword page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to reset password', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    apiMock.onPost('/password/reset').reply(204);

    const passwordElement = getByPlaceholderText('Nova senha');
    const passwordConfirmationElement = getByPlaceholderText(
      'Confirmação da senha',
    );

    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordElement, { target: { value: '123456789' } });
    fireEvent.change(passwordConfirmationElement, {
      target: { value: '123456789' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to reset password without user token', async () => {
    mockedLocationSearch = '';

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordElement = getByPlaceholderText('Nova senha');
    const passwordConfirmationElement = getByPlaceholderText(
      'Confirmação da senha',
    );

    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordElement, { target: { value: '123456789' } });
    fireEvent.change(passwordConfirmationElement, {
      target: { value: '123456789' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to reset password with invalid data', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordElement = getByPlaceholderText('Nova senha');
    const passwordConfirmationElement = getByPlaceholderText(
      'Confirmação da senha',
    );

    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordElement, { target: { value: '123456789' } });
    fireEvent.change(passwordConfirmationElement, {
      target: { value: '987654321' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/');
    });
  });
});
