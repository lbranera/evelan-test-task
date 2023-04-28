import { Avatar, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  const visitUsersPage = () => {
    router.push('/users');
  };

  return (
    <VStack padding={["50px", "100px"]} spacing="50px" alignItems="center">
      <VStack alignItems="center" textAlign="center">
        <Heading>Evelan Test Task</Heading>
        <Avatar src="/timi.jpg" boxSize="200px" name="Lorenz Timothy Barco Ranera" />
        <Text>Lorenz Timothy Barco Ranera</Text>
        <Text>lbranera@up.edu.ph</Text>
        <Text>Applying for Next/ReactJS Developer</Text>
      </VStack>
      <Button colorScheme='blue' onClick={visitUsersPage}>Go to Users Table</Button>
    </VStack>
  )
};

export default HomePage;
