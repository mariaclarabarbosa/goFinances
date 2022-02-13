import React from 'react';
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
   TransactionList
} from './styles';

export interface DataListProps extends TransactionCardProps {
   id: string;
}

export function Dashboard() {
   const data: DataListProps[] = [{
      id: '0',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$12.000,00',
      category: {
         name: 'Vendas', 
         icon: 'dollar-sign'
      },
      date: '13/04/2020'
   },
   {
      id: '1',
      type: 'negative',
      title: 'Hamburgueria Pizzy',
      amount: 'R$59,00',
      category: {
         name: 'Alimentação', 
         icon: 'coffee'
      },
      date: '13/04/2020'
   },
   {
      id: '2',
      type: 'negative',
      title: 'Aluguel do apartamento',
      amount: 'R$1.200,00',
      category: {
         name: 'Casa', 
         icon: 'home'
      },
      date: '13/04/2020'
   }];
   return (
      <Container>
         <Header>
            <UserWrapper>
               <UserInfo>
                  <Photo source={{ uri: 'https://th.bing.com/th/id/OIP.pOEYVZbdpiUYPjnjhsoKGAHaE7?pid=ImgDet&rs=1' }} />
                  <User>
                     <UserGreeting>Olá,</UserGreeting>
                     <UserName>Maria Clara</UserName>
                  </User>
               </UserInfo>
               <Icon name="power" />
            </UserWrapper>
         </Header>
         <HighLightCards>
            <HighLightCard 
               title='Entradas'
               amount='R$ 17.400,00'
               lastTransaction='Última entrada dia 13 de abril'
               type='up'
            />
            <HighLightCard 
               title='Saídas'
               amount='R$ 1.259,00'
               lastTransaction='Última saída dia 03 de abril'
               type='down'
            />
            <HighLightCard 
               title='Total'
               amount='R$ 16.141,00'
               lastTransaction='01 à 16 de abril'
               type='total'
            />
         </HighLightCards>
         <Transactions>
            <Title>Listagem</Title>
            <TransactionList 
               data={data}
               keyExtractor={(item) => item.id}
               renderItem={({ item }) => <TransactionCard data={item} />}
            />
         </Transactions>
      </Container>
   )
}
