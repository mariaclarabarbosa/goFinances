import React from 'react'
import { render } from '@testing-library/react-native'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'; 
import { ThemeProvider } from 'styled-components/native'
import theme from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('TransactionTypeButton Component', () => {
  it('must have specific border color when active ', () => {
    const { getByTestId, debug } = render(
      <TransactionTypeButton
        testID={'btn'}
        isActive={true}
        title=''
        type='down'
      />,
      {
        wrapper: Providers
      }
    );
    const btnComponent = getByTestId('btn');

    expect(btnComponent.props.style.backgroundColor).toEqual(
      theme.colors.attention_light
    );
    expect(btnComponent.props.style.borderWidth).toEqual(0);
  });
});