import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { CategoryProps } from '.';

interface CategoryButtonProps {
   isActive: boolean;
}

export const Container = styled.View`
   flex: 1;
   background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
   width: 100%;
   height: ${RFValue(113)}px;
   background-color: ${({theme}) => theme.colors.primary};
   align-items: center;
   justify-content: flex-end;
   padding-bottom: 19px;
`;

export const Title = styled.Text`
   font-family: ${({theme}) => theme.fonts.regular };
   font-size: ${RFValue(18)}px;
   color: ${({theme}) => theme.colors.shape };
`;

export const CategoryList = styled(
   FlatList as new () => FlatList<CategoryProps>
)`
   flex: 1;
   width: 100%;
`;

export const Category = styled.TouchableOpacity<CategoryButtonProps>`
   flex-direction: row;
   width: 100%;
   align-items: center;
   padding: ${RFValue(15)}px;

   background-color: ${({ isActive, theme }) => 
   isActive ? theme.colors.secondary_light : theme.colors.background
   };
`;

export const Icon = styled(Feather)`
   font-size: ${RFValue(20)}px;
   color: ${({theme}) => theme.colors.title };
   margin-right: 16px;
`;

export const Name = styled.Text`
   font-family: ${({theme}) => theme.fonts.regular };
   font-size: ${RFValue(14)}px;
   color: ${({theme}) => theme.colors.title };
`;

export const Separator = styled.View`
   height: 1px;
   width: 100%;
   background-color: ${({theme}) => theme.colors.text };
`;

export const Footer = styled.View`
   width: 100%;
   padding: 24px;
`;
