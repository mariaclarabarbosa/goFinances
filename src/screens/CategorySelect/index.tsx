import React from 'react';
import { categories } from '../../utils/categories';
import { Button } from '../../components/Form/Button';
import { 
   Container,
   Header,
   Title,
   CategoryList,
   Category,
   Icon,
   Name,
   Separator,
   Footer,
} from './styles';

export interface CategoryProps {
   key: string;
   name: string;
   icon?: string;
   color?: string;
}

interface Props {
   category: CategoryProps;
   setCategory: (category: CategoryProps) => void;
   closeSelectCategory: () => void;
}

export function CategorySelect({ 
   category, 
   setCategory,
   closeSelectCategory,
}: Props) {
   const handleCategorySelect = (category: CategoryProps) => setCategory(category);
   return(
      <Container>
         <Header>
            <Title>Categoria</Title>
         </Header>
         <CategoryList
            data={categories}
            keyExtractor={(item) => item.key}
            renderItem={({item}) => (
               <Category 
                  onPress={() => handleCategorySelect(item)}
                  isActive={category.key === item.key}
               >
                  <Icon name={item.icon} />
                  <Name>{item.name}</Name>
               </Category>
            )}
            ItemSeparatorComponent={() => <Separator />}
         />
         <Footer>
            <Button 
               title='Selecionar'
               onPress={closeSelectCategory} 
            />
         </Footer>
      </Container>
   )
}