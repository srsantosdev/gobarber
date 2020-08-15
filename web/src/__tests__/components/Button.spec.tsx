import React from 'react';
import { render } from '@testing-library/react';

import Button from '../../components/Button';

describe('Button component', () => {
  it('should be able to render a button', () => {
    const { getByText } = render(<Button type="button">Entrar</Button>);

    expect(getByText('Entrar')).toBeTruthy();
  });

  it('should be able to render a button with spinner component', () => {
    const { getByTestId } = render(<Button type="button" loading />);

    expect(getByTestId('button-container')).toBeTruthy();
  });
});
