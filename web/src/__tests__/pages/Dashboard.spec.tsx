import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';

const mockedSignOut = jest.fn();

const mockedUser = {
  id: 'user-id',
  avatar_url: 'image.jpg',
};

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signOut: mockedSignOut,
      user: mockedUser,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Dashboard page', () => {
  it('should be able to render dashboard page', async () => {
    const { baseElement } = render(<Dashboard />);

    expect(baseElement.firstChild).toBeTruthy();
  });
});
