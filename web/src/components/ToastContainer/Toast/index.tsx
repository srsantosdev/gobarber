import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { Container } from './styles';

import { useToast, ToastMessage } from '../../../hooks/toast';

interface ToastData {
  toast: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastData> = ({ toast, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.id, removeToast]);

  return (
    <Container
      style={style}
      key={toast.id}
      type={toast.type}
      hasdescription={Number(!!toast.description)}
      data-testid="toast-component"
    >
      {icons[toast.type || 'info']}

      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>

      <button
        type="button"
        onClick={() => removeToast(toast.id)}
        data-testid="close-button-toast"
      >
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
