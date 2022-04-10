import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
   background-color: ${({theme}) => theme.colors.background};
   flex: 1;
`;

export const Header = styled.View`
   background-color: ${({theme}) => theme.colors.primary};
   width: 100%;
   height: ${RFValue(113)}px;
   align-items: center;
   justify-content: flex-end;
   padding-bottom: 19px;
`;

export const Title = styled.Text`
   color: ${({theme}) => theme.colors.shape}
   font-size: ${RFValue(18)}px;
   font-family: ${({theme}) => theme.fonts.regular};
`;

export const Content = styled.ScrollView.attrs({
   contentContainerStyle: { 
      flexGrow: 1,
      padding: 24,
   }
})``;

export const ChartContainer = styled.View`
   width: 100%;
   align-items: center;
`;

export const MonthSelect = styled.View`
   width: 100%;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`;

export const MonthSelectButton = styled.TouchableOpacity``;

export const MonthSelectIcon = styled(Feather)`
   font-size: ${RFValue(20)}px;
`;

export const Month = styled.Text`
   font-family: ${({ theme }) => theme.fonts.regular};
   font-size: ${RFValue(20)}px;
   color: ${({ theme }) => theme.colors.text_dark};
`;

export const LoadContainer = styled.View`
   flex: 1;
   background-color: ${({theme}) => theme.colors.background};
   justify-content: center;
   align-items: center;
`;
