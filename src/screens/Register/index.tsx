import React, { useState } from "react";
import { Modal } from "react-native";

import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategoryProps, CategorySelect } from '../CategorySelect';

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
   const [categoryModalOpen, setCategoryModalOpen] = useState(false);
   const [category, setCategory] = useState<CategoryProps>({
      key: 'category',
      name: 'Categoria',
   });

   const handleTransactionsTypesSelection = (type: 'up' | 'down') => {
      setTransactionType(type);
   }

   const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true);
   const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false);

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
               <CategorySelectButton 
                  title={category.name} 
                  onPress={handleOpenSelectCategoryModal}
               />
            </Fields>
            <Button
               title="Enviar"
            />
         </Form>

         <Modal visible={categoryModalOpen}>
            <CategorySelect
               category={category}
               setCategory={setCategory}
               closeSelectCategory={handleCloseSelectCategoryModal}
            />
         </Modal>
      </Container>
   )
}