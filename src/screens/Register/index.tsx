import React, { useState } from "react";
import { Modal } from "react-native";
import { useForm } from "react-hook-form";

import { Button } from "../../components/Form/Button";
import { InputForm } from "../../components/Form/InputForm";
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

interface FormData {
   name: string;
   amount: string;
}

export function Register() {
   const [transactionType, setTransactionType] = useState('');
   const [categoryModalOpen, setCategoryModalOpen] = useState(false);
   const [category, setCategory] = useState<CategoryProps>({
      key: 'category',
      name: 'Categoria',
   });

   const {
      control,
      handleSubmit,
   } = useForm();

   const handleTransactionsTypesSelection = (type: 'up' | 'down') => {
      setTransactionType(type);
   }

   const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true);
   const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false);

   const handleRegister = (form: FormData) => {
      const data = {
         name: form.name,
         amount: form.amount,
         transactionType,
         category: category.key,
      }
      console.log(data);
   }

   return (
      <Container>
         <Header>
            <Title>Cadastro</Title>
         </Header>
         
         <Form>
            <Fields>
               <InputForm
                  control={control}
                  name='name'
                  placeholder="Nome"
               />
               <InputForm
                  control={control}
                  name='amount'
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
               onPress={handleSubmit(handleRegister)}
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