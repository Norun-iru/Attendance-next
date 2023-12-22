import { Box, Heading, Stack, Image, HStack } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react'
import Link from 'next/link';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useColorMode } from '@chakra-ui/react';

export const SideBar = () => {
    const Logo = "/RoCall.png";
    const { colorMode } = useColorMode();
    return (
        <Box w="250px" p={4} position="fixed" height="100%" className="sidebar">
            <Box margin={7} marginTop={10} marginBottom={10}>
                <Link href="/">
                    <Image src={Logo} alt="logo" />
                </Link>
            </Box>

            <Divider />
            <Stack marginTop={5} marginLeft={5}>
                <Box margin={3}>
                    <HStack>
                        <EventSeatIcon style={{ verticalAlign: 'middle' }} />
                    <Link href="/SelectTime">
                        <Heading size='sm' verticalAlign='middle'>
                            出席確認
                        </Heading>
                    </Link>
                    </HStack>
                    
                </Box>

                <Box margin={3}>
                    <HStack>
                        <PersonIcon style={{ verticalAlign: 'middle' }} />
                    <Link href="/StudentData">
                        <Heading size='sm' verticalAlign='middle'>
                            学生情報
                        </Heading>
                    </Link>
                    </HStack>
                    
                </Box>

                <Box margin={3}>
                    <HStack>
                         <EventNoteIcon style={{ verticalAlign: 'middle' }} />
                    <Link href="/TimeTable">
                        <Heading size='sm' verticalAlign='middle'>
                            時間割
                        </Heading>
                    </Link>
                    </HStack>
                   
                </Box>
            </Stack>
        </Box>
    );
};


export default SideBar;