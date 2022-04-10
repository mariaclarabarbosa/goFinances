import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { HistoyCard } from '../../components/HistoryCard';
import { useTheme } from 'styled-components';

import { 
   Container,
   Header,
   Title,
   Content,
   ChartContainer,
   MonthSelect,
   MonthSelectButton,
   MonthSelectIcon,
   Month,
   LoadContainer,
} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { TransactionCardProps } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import { ActivityIndicator } from 'react-native';

interface CategoryName {
   key: string;
   name: string;
   total: number;
   totalFormatted: string;
   color: string;
   percent: string;
}

export function Resume() {
   const [isLoading, setIsLoading] = useState(true);
   const [totalByCategories, setTotalByCategories] = useState<CategoryName[]>([]);
   const [selectedDate, setSelectedDate] = useState(new Date());
   const theme = useTheme();

   function handleDateChange(action: 'next' | 'prev') {
      setIsLoading(true);
      if (action === 'next') {
         setSelectedDate(addMonths(selectedDate, 1));
      } else {
         setSelectedDate(subMonths(selectedDate, 1));
      }  
   }

   async function loadData() {
      const dataKey = '@gofinances:transactions';
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      const expensives: TransactionCardProps[] = transactions.filter((item: TransactionCardProps) => 
      item.type === 'negative' && 
      new Date(item.date).getMonth() === selectedDate.getMonth() &&
      new Date(item.date).getFullYear() === selectedDate.getFullYear());

      const expensiveTotal = expensives.reduce((acumullator: number, expensive: TransactionCardProps) => {
         return acumullator + Number(expensive.amount)
      }, 0);

      const totalByCategory: CategoryName[] = [];

      categories.forEach((category) => {
         let categoryTotal = 0;

         expensives.forEach(expensive => {
            if(expensive.category === category.key) {
               categoryTotal += Number(expensive.amount);
            }
         });

         if (categoryTotal > 0) {
            const percent = `${(categoryTotal / expensiveTotal * 100).toFixed(0)}%`;
            totalByCategory.push({
               key: category.key,
               name: category.name,
               totalFormatted: categoryTotal.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
               }),
               total: categoryTotal,
               color: category.color,
               percent,
            })
         }
      });

      setTotalByCategories(totalByCategory);

      setIsLoading(false);
   }

   useFocusEffect(useCallback(() => {
      loadData();
   }, [selectedDate]))

   return (
      <Container>
         <Header>
            <Title>Resumo por categoria</Title>
         </Header>
         {isLoading ? 
            <LoadContainer> 
               <ActivityIndicator 
                  color={theme.colors.primary} 
                  size='large'
               />
            </LoadContainer> :      
            <Content>
               <MonthSelect>
                  <MonthSelectButton onPress={() => handleDateChange('prev')}>
                     <MonthSelectIcon name='chevron-left' />
                  </MonthSelectButton>
                  <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>
                  <MonthSelectButton onPress={() => handleDateChange('next')}>
                     <MonthSelectIcon name='chevron-right' />
                  </MonthSelectButton>
               </MonthSelect>

               <ChartContainer>
                  <VictoryPie
                     data={totalByCategories}
                     colorScale={totalByCategories.map(item => item.color)}
                     style={{
                        labels: {
                           fontSize: RFValue(18),
                           fontWeight: 'bold',
                           fill: theme.colors.shape,
                        }
                     }}
                     labelRadius={100}
                     x='percent'
                     y='total'
                  />
               </ChartContainer>
               {totalByCategories.map(item => {
                  return (
                     <HistoyCard 
                        key={item.key}
                        title={item.name}
                        amount={item.totalFormatted}
                        color={item.color}
                     />
                  )
               })}
            </Content>
         }
      </Container>
   )
}