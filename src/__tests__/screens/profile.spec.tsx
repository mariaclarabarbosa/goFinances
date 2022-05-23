import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile', () => {
   it('should have placeholder correctly input user name', () => {
      const { getByPlaceholderText } = render(<Profile />);
      expect(getByPlaceholderText('Nome')).toBeTruthy();
   });
   
   it('should be load user data', () => {
      const { getByTestId } = render(<Profile />);
   
      const inputName = getByTestId('input-name');
      const inputSurname = getByTestId('input-surname');
   
      expect(inputName.props.value).toEqual('');
      expect(inputSurname.props.value).toEqual('');
   });
   
   it('should be exist title correctly', () => {
      const { getByTestId } = render(<Profile />);
      const textTitle = getByTestId('text-title');
   
      expect(textTitle.props.children).toContain('Perfil');
   });
});

