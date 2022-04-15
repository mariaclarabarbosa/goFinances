import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';

import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { 
   Container,
   Header,
   UserInfo,
   Photo,
   User,
   UserGreeting,
   UserName,
   UserWrapper,
   Icon, 
   HighLightCards,
   Transactions,
   Title,
   TransactionList,
   LoadContainer,
   LogoutButton
} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

export interface DataListProps extends TransactionCardProps {
   id: string;
}

interface HighLightProps {
   amount: string;
   lastTransaction: string;
}

interface HighLightData {
   entries: HighLightProps;
   expensives: HighLightProps;
   total: HighLightProps;
}

export function Dashboard() {
   const [transactionsData, setTransactionsData] = useState<DataListProps[]>([]);
   const [highLightData, setHighLightData] = useState<HighLightData>();
   const [isLoading, setIsLoading] = useState(true);
   const theme = useTheme();
   const { signOut, user } = useAuth();
   
   function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
      const lastTransaction = new Date(Math.max.apply(Math, collection
         .filter(item => item.type === type)
         .map(item => new Date(item.date).getTime())));

      return `${lastTransaction.toLocaleString('pt-BR', {
         day: '2-digit'
      })} de ${lastTransaction.toLocaleString('pt-BR', {
         month: 'long'
      })}`;
   }

   async function loadTransactions() {
      const dataKey = '@gofinances:transactions';
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      let entriesTotal = 0;
      let expensiveTotal = 0;
     
      const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
         if (item.type === 'positive'){
            entriesTotal += Number(item.amount);
         } else {
            expensiveTotal += Number(item.amount);
         }

         return {
            id: item.id,
            name: item.name,
            amount: Number(item.amount).toLocaleString('pt-BR', {
               style: 'currency',
               currency: 'BRL'
            }),
            type: item.type,
            category: item.category,
            date: Intl.DateTimeFormat('pt-BR', {
               day: '2-digit',
               month: '2-digit',
               year: '2-digit'
            }).format(new Date(item.date)),
         }
      });

      setTransactionsData(transactionsFormatted);

      const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
      const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
      const totalInterval = `01 à ${lastTransactionExpensives}`;

      const total = entriesTotal - expensiveTotal;
      setHighLightData({
         entries: {
            amount: entriesTotal.toLocaleString('pt-BR', {
               style: 'currency',
               currency: 'BRL'
            }),
            lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
         },
         expensives: {
            amount: expensiveTotal.toLocaleString('pt-BR', {
               style: 'currency',
               currency: 'BRL'
            }),
            lastTransaction: `Última saída dia ${lastTransactionExpensives}`,
         },
         total: {
            amount: total.toLocaleString('pt-BR', {
               style: 'currency',
               currency: 'BRL'
            }),
            lastTransaction: totalInterval
         }
      })
      setIsLoading(false);
   }

   useFocusEffect(useCallback(() => {
      loadTransactions();
   }, []))

   return (
      <Container> 
         {
            isLoading ? 
            <LoadContainer> 
               <ActivityIndicator 
                  color={theme.colors.primary} 
                  size='large'
               />
            </LoadContainer> : 
            <>
               <Header>
                  <UserWrapper>
                     <UserInfo>
                        <Photo source={{ uri: user.photo }} />
                        <User>
                           <UserGreeting>Olá,</UserGreeting>
                           <UserName>{user.name}</UserName>
                        </User>
                     </UserInfo>
                     <LogoutButton onPress={signOut}>
                        <Icon name="power" />
                     </LogoutButton>
                  </UserWrapper>
               </Header>
               <HighLightCards>
                  <HighLightCard 
                     title='Entradas'
                     amount={highLightData?.entries.amount || ''}
                     lastTransaction={highLightData?.entries.lastTransaction || ''}
                     type='up'
                  />
                  <HighLightCard 
                     title='Saídas'
                     amount={highLightData?.expensives.amount || ''}
                     lastTransaction={highLightData?.expensives.lastTransaction || ''}
                     type='down'
                  />
                  <HighLightCard 
                     title='Total'
                     amount={highLightData?.total.amount || ''}
                     lastTransaction={highLightData?.total.lastTransaction || ''}
                     type='total'
                  />
               </HighLightCards>
               <Transactions>
                  <Title>Listagem</Title>
                  <TransactionList 
                     data={transactionsData}
                     keyExtractor={(item) => item.id}
                     renderItem={({ item }) => <TransactionCard data={item} />}
                  />
               </Transactions>
            </>
         }
      </Container>
   )
}
