import React from 'react';
import { render } from '@testing-library/react-native';
import SignIn from '../../pages/SignIn';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('SignIn Page', () => {
  it('should contains email/password inputs', () => {
    const { getByPlaceholderText } = render(<SignIn />);

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });
});
