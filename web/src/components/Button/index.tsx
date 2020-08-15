import React, { ButtonHTMLAttributes } from 'react';
import { StageSpinner } from 'react-spinners-kit';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest} data-testid="button-container">
    {loading ? <StageSpinner size={40} /> : children}
  </Container>
);

export default Button;
