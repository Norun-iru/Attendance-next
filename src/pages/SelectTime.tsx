import React, { useState, useEffect } from 'react';
import { HStack, Button, Box, Heading, Flex, Card } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SideBar } from '../components/SideBar';
import Axios from 'axios';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'

interface Category {
    ID: number;
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
    [key: string]: number | boolean;
}



function SelectTime() {
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [disabledBool, setdisabledBool] = useState<Category[]>([]);
    const router = useRouter();

    const weeks = Array.from({ length: 16 }, (_, i) => i + 1);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const handleDaySelect = (week: number, day: string) => {
        setSelectedWeek(week);
        setSelectedDay(day);
    };

    const handleNext = () => {
        if (selectedWeek !== null && selectedDay !== null) {
            router.push(`/SelectSubject/${selectedWeek}/${selectedDay}`);
        } else {
            console.error('Please select both a week and a day.');
        }
    };

    const colorchange = (selectedWeek: number | null, selectedDay: string | null, week: number, day: string) => {
        const matchingCategory = disabledBool.find(category => category.ID === week);
        if (selectedWeek === week && selectedDay === day) {
            return 'teal';
        } else if (matchingCategory && matchingCategory[day] === 1) {
            return 'red'
        }
        else {
            return 'gray';
        }
    }

    const disabledCheck = (week: number | null, day: string | null): boolean => {
        if (week !== null && day !== null) {
            // 週と曜日に対応するCategoryオブジェクトを検索
            const matchingCategory = disabledBool.find(category => category.ID === week);

            // 該当するCategoryオブジェクトが存在し、該当曜日のbooleanが1の場合はtrue、それ以外はfalse
            return matchingCategory ? matchingCategory[day] === 1 : false;
        } else {
            return false;
        }
    }

    useEffect(() => {
        Axios.get<Category[]>(`http://localhost:3001/api/get/disabled`)
            .then((response) => {
                setdisabledBool(response.data);
            })
            .catch((error) => {
                console.error('Error fetching subjects:', error);
            });
    }, []);

    return (
        <Flex>
            {/*Side Bar*/}
            <SideBar />

            <Box ml="250px" p={10} flex="1">

                <Box margin={10}>
                    <HStack justifyContent="space-between" alignItems="center" mb={5}>
                        <Heading bgGradient='linear(to-tl, #6BA7FA, #274C86)' bgClip='text' fontSize={50} mb={10}>
                            Week&Day
                        </Heading>
                        <Button bgGradient='linear(to-l, #3D78DF, #92BFF8)' color='white' onClick={handleNext}>
                            Next Page
                        </Button>
                    </HStack>

                    <Card overflowX="auto">
                        <Table margin={5}>
                            <Thead>
                                <Tr>
                                    <Th>週\曜日</Th>
                                    <Th>月</Th>
                                    <Th>火</Th>
                                    <Th>水</Th>
                                    <Th>木</Th>
                                    <Th>金</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {weeks.map((week) => (
                                    <Tr key={week}>
                                        <Td>{week}</Td>
                                        {daysOfWeek.map((day) => (
                                            <Th key={day}>
                                                <Button
                                                    isDisabled={disabledCheck(week, day)}
                                                    key={day}
                                                    colorScheme={colorchange(selectedWeek, selectedDay, week, day)}
                                                    onClick={() => handleDaySelect(week, day)}
                                                    marginLeft={-3}
                                                >
                                                </Button>
                                            </Th>
                                        ))}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Card>

                    <HStack mt={14}>
                        <Button bgGradient='linear(to-l, #3D78DF, #92BFF8)' color='white' onClick={handleNext}>
                            Next Page
                        </Button>
                    </HStack>
                </Box>
            </Box>
        </Flex>
    );
};

export default SelectTime;
