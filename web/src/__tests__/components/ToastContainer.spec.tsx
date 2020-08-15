import React from 'react';
import { render } from '@testing-library/react';

import ToastContainer from '../../components/ToastContainer';

describe('Toast Container', () => {
  it('should be able to render a toast container', () => {
    const { getByTestId } = render(
      <ToastContainer
        messages={[
          {
            id: 'toast-id',
            type: 'success',
            title: 'Teste realizado com sucesso.',
            description: 'Descrição do toast',
          },
        ]}
      />,
    );

    expect(getByTestId('toast-container')).toBeTruthy();
  });
});
