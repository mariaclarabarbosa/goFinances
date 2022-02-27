import React, { useState } from "react";
import { 
   Alert,
   Keyboard, 
   Modal, 
   TouchableWithoutFeedback
} from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

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

const schema = Yup.object().shape({
   name: Yup.string().required('Nome é obrigatório'),
   amount: Yup.number()
      .required('Valor é obrigatório')
      .typeError('Informe um valor numérico')
      .positive('O valor não pode ser negativo')
})

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
      formState: { errors }
   } = useForm({ resolver: yupResolver(schema) });

   const handleTransactionsTypesSelection = (type: 'up' | 'down') => {
      setTransactionType(type);
   }

   const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true);
   const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false);

   const handleRegister = (form: FormData) => {
      if (!transactionType)
         return Alert.alert('', 'Selecione o tipo de transação.');

      if (category.key === 'category')
         return Alert.alert('', 'Selecione a categoria.');

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
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
               <Header>
                  <Title>Cadastro</Title>
               </Header>
               
               <Form>
                  <Fields>
                     <InputForm
                        control={control}
                        name='name'
                        placeholder="Nome"
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.name && errors.name.message}
                     />
                     <InputForm
                        control={control}
                        name='amount'
                        placeholder="Preço"
                        keyboardType="numeric"
                        error={errors.amount && errors.amount.message}
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
         </>
         </TouchableWithoutFeedback>

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