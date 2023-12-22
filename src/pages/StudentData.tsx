import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Flex,
  Box,
  Card,
} from '@chakra-ui/react';
import Axios from 'axios';
import { SideBar } from '../components/SideBar';

interface Category {
  Number: number;
  Name: string;
  Grade: number;
  Class: string;
}

const StudentData: React.FC = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get<Category[]>('/api/get/Students');
        setCategoryList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const data2 = categoryList.map((val, index) => {
    return (
      <Tbody key={index}>
        <Tr>
          <Td>{val.Number}</Td>
          <Td>{val.Name}</Td>
          <Td>{val.Grade}</Td>
          <Td>{val.Class}</Td>
        </Tr>
      </Tbody>
    );
  });

  return (
    <Flex>
      <SideBar />

      <Box ml="250px" p={10} flex="1">

        <Box margin={10}>
          <Heading bgGradient='linear(to-tl, #6BA7FA, #274C86)' bgClip='text' fontSize={50} mb={10}>
            Students
          </Heading>
          <Card p={10}>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Number</Th>
                    <Th>Name</Th>
                    <Th>Grade</Th>
                    <Th>Class</Th>
                  </Tr>
                </Thead>
                {data2}
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>
    </Flex>
  );
};

export default StudentData;
