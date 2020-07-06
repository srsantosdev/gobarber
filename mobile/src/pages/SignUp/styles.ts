import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ebe8;
  font-size: 24px;
  margin: 64px 0 24px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;
`;

export const BackToSignInText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #f4ebe8;
  margin-left: 16px;
`;
