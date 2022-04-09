import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoyCard } from '../../components/HistoryCard';

import { 
   Container,
   Header,
   Title,
   Content
} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { TransactionCardProps } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';

interface CategoryName {
   key: string;
   name: string;
   total: string;
   color: string;
}

export function Resume() {
   const [isLoading, setIsLoading] = useState(true);
   const [totalByCategories, setTotalByCategories] = useState<CategoryName[]>([]);

   async function loadData() {
      const dataKey = '@gofinances:transactions';
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      const expensives: TransactionCardProps[] = transactions.filter((item: TransactionCardProps) => item.type === 'negative');

      const totalByCategory: CategoryName[] = [];

      categories.forEach((category) => {
         let categoryTotal = 0;

         expensives.forEach(expensive => {
            if(expensive.category === category.key) {
               categoryTotal += Number(expensive.amount);
            }
         });

         if (categoryTotal > 0) {
            totalByCategory.push({
               key: category.key,
               name: category.name,
               total: categoryTotal.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
               }),
               color: category.color
            })
         }
      });

      setTotalByCategories(totalByCategory);

      setIsLoading(false);
   }

   useFocusEffect(useCallback(() => {
      loadData();
   }, []))

   return (
      <Container>
         <Header>
            <Title>Resumo por categoria</Title>
         </Header>
         <Content>
            {totalByCategories.map(item => {
               return (
                  <HistoyCard 
                     key={item.key}
                     title={item.name}
                     amount={item.total}
                     color={item.color}
                  />
               )
            })}
         </Content>
      </Container>
   )
}