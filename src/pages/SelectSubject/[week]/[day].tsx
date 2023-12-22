import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Button, SimpleGrid, Box, HStack, Flex } from '@chakra-ui/react'
import Axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/router';
import { SideBar } from '../../../components/SideBar';

//Database: Monday ~ Friday
interface Category {
    SubjectName: string;
    SubjectName2: string;
    ID: number;
    Format: string;
    Unit: number;
    Start: number;
    Time: number;
}

interface Category2 {
    ID: number;
    Number: number;
    Name: string;
    Status: boolean;
}

const SelectSubject: React.FC = () => {

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [categoryList2, setCategoryList2] = useState<Category2[]>([]);
    const router = useRouter();
    const { week, day } = router.query as { week: string, day: string };

    const dayJPN = (day: string) => {
        if (day === 'Monday') {
            return '月';
        } else if (day === 'Tuesday') {
            return '火';
        } else if (day === 'Wednesday') {
            return '水';
        } else if (day === 'Thursday') {
            return '木';
        } else if (day === 'Friday') {
            return '金';
        }
    }

    //最初に
    useEffect(() => {
        Axios.get<Category[]>(`/api/get/SelectSubject/Day/${day}`)
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching subjects:', error);
            });
    }, [day]);

    //送信ボタンを押した時
    const setdisabledStatus = () => {

        categoryList.map((val) => {
            Axios.get<Category2[]>(`/api/get/SelectSubject/Subject/${val.SubjectName2}`)
                .then((response) => {
                    setCategoryList2(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching subjects:', error);
                });

            categoryList2.map((val2) => {
                Axios.put(`http://localhost:3001/api/put/select/${val2.Number}/${val.SubjectName2}/${val2.Status}`)
                    .then((response2) => {
                        console.log(response2.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        });


        Axios.put(`http://localhost:3001/api/put/${week}/${day}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const data = categoryList.map((val, index) => {
        const subn = '/Teacher/' + val.SubjectName2;
        const subn2 = '/Student/' + val.SubjectName2

        return (
            <Card marginTop={10} key={index} p={3}>
                <CardHeader margin={5} marginBottom={-3}>
                    <Heading fontSize='25px'>{val.SubjectName}</Heading>
                    <Heading fontSize='15px' color='#ececec'>{val.SubjectName2}</Heading>
                </CardHeader>

                <CardBody marginLeft={5}>
                    <HStack marginBottom={1}>
                        <Heading size='s' color='#6c6c6c'>開始: </Heading>
                        <Heading size='s' color='#1B254A'>{val.Start}限</Heading>
                    </HStack>
                    <HStack marginBottom={1}>
                        <Heading size='s' color='#6c6c6c'>時間: </Heading>
                        <Heading size='s' color='#1B254A'>{val.Time}時間</Heading>
                    </HStack>
                    <HStack marginBottom={1}>
                        <Heading size='s' color='#6c6c6c'>形式: </Heading>
                        <Heading size='s' color='#1B254A'>{val.Format}</Heading>
                    </HStack>
                    <HStack>
                        <Heading size='s' color='#6c6c6c'>単位: </Heading>
                        <Heading size='s' color='#1B254A'>{val.Unit}単位</Heading>
                    </HStack>
                </CardBody>

                <CardFooter>
                    <Link href={subn}>

                        <Button marginRight={1} marginLeft={1} flex='1' variant='outline'>Teacher</Button>
                    </Link>
                    <Link href={subn2}>
                        <Button marginRight={1} marginLeft={1} flex='1' variant='outline'>Student</Button>
                    </Link>


                </CardFooter>
            </Card>
        );
    });

    return (
        <Flex>
            <SideBar />

            <Box ml="250px" p={10} flex="1">
                <Box margin={10}>
                    <HStack justifyContent="space-between" alignItems="center" mb={5}>
                        <Heading bgGradient='linear(to-tl, #6BA7FA, #274C86)' bgClip='text' fontSize={50}>
                            Subjects
                        </Heading>
                        <Link href="/SelectTime">
                            <Button onClick={setdisabledStatus} bgGradient='linear(to-l, #3D78DF, #92BFF8)' color='white' size='lg'>送信</Button>
                        </Link>

                    </HStack>

                    <Card maxW='250px' align='center'>
                        <CardBody>
                            <Heading margin={2} fontSize='25px' color='#1B254A'>第{week}週, {dayJPN(day)}曜日</Heading>
                        </CardBody>
                    </Card>

                    <SimpleGrid templateColumns='repeat(auto-fill, minmax(300px, 1fr))' gap={10}>
                        {data}
                    </SimpleGrid>
                </Box>
            </Box>
        </Flex>
    );
};

export default SelectSubject;
