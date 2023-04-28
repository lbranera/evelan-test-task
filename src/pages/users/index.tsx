import { Avatar, Button, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

const UsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://reqres.in/api/users');
      const jsonResult = await result.json();
      setUsers(jsonResult.data);
      setTotalPages(jsonResult.total_pages);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (currentPage <= totalPages) {
      setIsLoading(true);

      const fetchData = async () => {
        const result = await fetch(`https://reqres.in/api/users?page=${currentPage}`);
        const jsonResult = await result.json();
        setUsers([...users, ...jsonResult.data]);
        setIsLoading(false);
      }
  
      fetchData();
    }
  }, [currentPage]);

  const visitHomePage = () => {
    router.push('/');
  };

  const loadMoreUsers = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
      <VStack paddingY={["50px", "100px"]} paddingX={[0, "100px"]} alignItems="center" spacing="50px">
        <VStack alignItems="center" spacing="10px">
          <Heading>Users Table</Heading>
          <Button colorScheme='blue' onClick={visitHomePage}>Go to Home</Button>
        </VStack>
        
        <TableContainer w="full" boxShadow="xl">
          <Table variant='striped' colorScheme="gray">
            <Thead>
              <Tr>
                  <Th>User ID</Th>
                  <Th>Avatar</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                users.map((user: User) => {
                  const { id, avatar, first_name, last_name, email } = user;
                  return (
                    <Tr key={id}>
                      <Td>{id}</Td>
                      <Td><Avatar size={["lg", "xl"]} name={`${first_name} ${last_name}`} src={avatar} /></Td>
                      <Td>{first_name}</Td>
                      <Td>{last_name}</Td>
                      <Td>{email}</Td>
                    </Tr>
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>

        <Button isDisabled={currentPage === totalPages} colorScheme='blue' onClick={loadMoreUsers}>Load more</Button>
      </VStack>
  );
};

export default UsersPage