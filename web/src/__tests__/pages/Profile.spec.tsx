import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';

import Profile from '../../pages/Profile';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const mockedUpdateUser = jest.fn();

const mockedUser = {
  name: 'John Doe',
  email: 'johndoe@example.com.br',
  avatar_url: 'image.jpg',
};

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

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      updateUser: mockedUpdateUser,
      user: mockedUser,
    }),
  };
});

describe('Profile page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();

    mockedAddToast.mockClear();
  });

  it('should be able to update profile', async () => {
    const apiResponse = {
      name: 'John Doe',
      email: 'johndoe@example.com.br',
    };

    apiMock.onPut('/profile').reply(200, apiResponse);

    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameInputElement = getByPlaceholderText('Nome');
    const emailInputElement = getByPlaceholderText('E-mail');

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(nameInputElement, { target: { value: 'John Doe' } });
    fireEvent.change(emailInputElement, {
      target: { value: 'johndoe@example.com.br' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should be able to update password', async () => {
    const apiResponse = {
      name: 'John Doe',
      email: 'johndoe@example.com.br',
    };

    apiMock.onPut('/profile').reply(200, apiResponse);

    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameInputElement = getByPlaceholderText('Nome');
    const emailInputElement = getByPlaceholderText('E-mail');
    const currentPasswordInputElement = getByPlaceholderText('Senha atual');
    const newPasswordInputElement = getByPlaceholderText('Nova senha');
    const passwordConfirmationInputElement = getByPlaceholderText(
      'Confirmar senha',
    );

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(nameInputElement, { target: { value: 'John Doe' } });
    fireEvent.change(emailInputElement, {
      target: { value: 'johndoe@example.com.br' },
    });
    fireEvent.change(currentPasswordInputElement, {
      target: { value: 'old-password' },
    });
    fireEvent.change(newPasswordInputElement, {
      target: { value: 'new-password' },
    });
    fireEvent.change(passwordConfirmationInputElement, {
      target: { value: 'new-password' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to update password if the new password is different from the confirmation', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameInputElement = getByPlaceholderText('Nome');
    const emailInputElement = getByPlaceholderText('E-mail');
    const currentPasswordInputElement = getByPlaceholderText('Senha atual');
    const newPasswordInputElement = getByPlaceholderText('Nova senha');
    const passwordConfirmationInputElement = getByPlaceholderText(
      'Confirmar senha',
    );

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(nameInputElement, { target: { value: 'John Doe' } });
    fireEvent.change(emailInputElement, {
      target: { value: 'johndoe@example.com.br' },
    });
    fireEvent.change(currentPasswordInputElement, {
      target: { value: 'old-password' },
    });
    fireEvent.change(newPasswordInputElement, {
      target: { value: 'new-password' },
    });
    fireEvent.change(passwordConfirmationInputElement, {
      target: { value: 'different-password' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should display an error if update profile fails', async () => {
    apiMock.onPut('/profile').reply(500);

    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameInputElement = getByPlaceholderText('Nome');
    const emailInputElement = getByPlaceholderText('E-mail');
    const currentPasswordInputElement = getByPlaceholderText('Senha atual');
    const newPasswordInputElement = getByPlaceholderText('Nova senha');
    const passwordConfirmationInputElement = getByPlaceholderText(
      'Confirmar senha',
    );

    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(nameInputElement, { target: { value: 'John Doe' } });
    fireEvent.change(emailInputElement, {
      target: { value: 'johndoe@example.com.br' },
    });
    fireEvent.change(currentPasswordInputElement, {
      target: { value: 'old-password' },
    });
    fireEvent.change(newPasswordInputElement, {
      target: { value: 'new-password' },
    });
    fireEvent.change(passwordConfirmationInputElement, {
      target: { value: 'new-password' },
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

  it('should be able to update user avatar', async () => {
    const apiResponse = {
      avatar_url: 'update-avatar.jpg',
    };

    apiMock.onPatch('/users/avatar').reply(200, apiResponse);

    const { getByTestId } = render(<Profile />);

    const inputElement = getByTestId('avatar-input');

    fireEvent.change(inputElement, {
      target: { files: ['update-avatar.jpg'] },
    });

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should not be able to update user avatar if non-existing file', async () => {
    apiMock.onPatch('/users/avatar').reply(400);

    const { getByTestId } = render(<Profile />);

    const inputElement = getByTestId('avatar-input');

    fireEvent.change(inputElement, {
      target: { files: null },
    });

    await waitFor(() => {
      expect(mockedAddToast).not.toHaveBeenCalled();
    });
  });
});
