import React from 'react';
import { 
   Container,
   Header,
   UserInfo,
   Photo,
   User,
   UserGreeting,
   UserName,
   UserWrapper
} from './styles';

export function Dashboard() {
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
            </UserWrapper>
         </Header>
      </Container>
   )
}
