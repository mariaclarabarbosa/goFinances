import React, { useState } from "react";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { 
   Container,
   Header,
   Title,
   Form,
   Fields,
   TransactionsTypes
} from "./styles";

export function Register() {
   const [transactionType, setTransactionType] = useState('');

   const handleTransactionsTypesSelection = (type: 'up' | 'down') => {
      setTransactionType(type);
   }

   return (
      <Container>
         <Header>
            <Title>Cadastro</Title>
         </Header>
         
         <Form>
            <Fields>
               <Input
                  placeholder="Nome"
               />
               <Input
                  placeholder="Preço"
               />
               <TransactionsTypes>
                  <TransactionTypeButton 
                     title="Incomes" 
                     type="up"
                     onPress={() => handleTransactionsTypesSelection('up')}
                     isActive={transactionType === 'up'}
                  />
                  <TransactionTypeButton 
                     title="Outcomes" 
                     type="down"
                     onPress={() => handleTransactionsTypesSelection('down')}
                     isActive={transactionType === 'down'}
                  />
               </TransactionsTypes>
            </Fields>
            <Button
               title="Enviar"
            />
         </Form>
      </Container>
   )
}