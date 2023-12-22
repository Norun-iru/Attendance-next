import { Flex, Box, Heading, Card, } from "@chakra-ui/react";
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { SideBar } from "../components/SideBar";
import React, { useEffect, useState } from 'react';
import Axios from "axios";

interface Category {
    Day: string;
    First: string;
    Second: string;
    Third: string;
    Fourth: string;
    Fifth: string;
    Sixth: string;
    Seventh: string;
    Eighth: string;
}

export const TimeTable: React.FC = () => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get<Category[]>('/api/get/TimeTable');
                setCategoryList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const data = categoryList.map((val, index) => {
        return (
            <Tr key={index}>
                <Th color='#7469D0' fontSize='20px'>{val.Day}</Th>
                <Th>{val.First}</Th>
                <Th>{val.Second}</Th>
                <Th>{val.Third}</Th>
                <Th>{val.Fourth}</Th>
                <Th>{val.Fifth}</Th>
                <Th>{val.Sixth}</Th>
                <Th>{val.Seventh}</Th>
                <Th>{val.Eighth}</Th>
            </Tr>
        );
    });

    return (
        <Flex>
            <SideBar />

            <Box ml="250px" p={10} flex="1">
                <Box margin={10}>
                    <Heading bgGradient='linear(to-tl, #6BA7FA, #274C86)' bgClip='text' fontSize={50} mb={10}>
                        Timetable
                    </Heading>
                    <Card padding={10}>
                        <Table variant="striped" size='lg'>
                            <Thead>
                                <Tr>
                                    <Th w='100px'>曜日</Th>
                                    <Th w='100px'>1限</Th>
                                    <Th w='100px'>2限</Th>
                                    <Th>3限</Th>
                                    <Th>4限</Th>
                                    <Th>5限</Th>
                                    <Th>6限</Th>
                                    <Th>7限</Th>
                                    <Th>8限</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data}
                            </Tbody>
                        </Table>
                    </Card>
                </Box>

            </Box>
        </Flex>
    );
};

export default TimeTable;