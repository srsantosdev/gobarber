import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Toast from '../../components/ToastContainer/Toast';

const mocketRemoveToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      removeToast: mocketRemoveToast,
    }),
  };
});

describe('Toast component', () => {
  beforeEach(() => {
    mocketRemoveToast.mockClear();
  });

  it('should be able to render a toast', () => {
    const { getByTestId } = render(
      <Toast style={{}} toast={{ id: 'toast-id', title: 'Teste de toast' }} />,
    );

    expect(getByTestId('toast-component')).toBeTruthy();
  });

  it('should be able to remove a toast when close button is clicked', async () => {
    const { getByTestId } = render(
      <Toast style={{}} toast={{ id: 'toast-id', title: 'Teste de toast' }} />,
    );

    const closeButton = getByTestId('close-button-toast');

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(mocketRemoveToast).toHaveBeenCalledWith('toast-id');
    });
  });

  it('should be able to remove a toast when 3 seconds pass', async () => {
    jest.useFakeTimers();

    render(
      <Toast style={{}} toast={{ id: 'toast-id', title: 'Teste de toast' }} />,
    );

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(mocketRemoveToast).toHaveBeenCalledWith('toast-id');
    });
  });
});
