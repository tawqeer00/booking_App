import React from 'react';
import {
  Box,
  useColorModeValue,
  Flex,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
// import { useNavigate } from 'react-router';
import { useState } from 'react';
import BASE_URL from '../env';

function GuardBooking(props) {
  const [confirmLoading, setConfirmLoading] = useState(false);
    const toast = useToast();
    const confirmURL = `${BASE_URL}/guard/confirm`;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const confirmBooking = () => {
      setConfirmLoading(true)
      axios
        .put(confirmURL, {id: props.booking._id} , {
          headers: { Authorization: `Bearer ${props.loggedIn.token}` },
        })
        .then(response => {
          props.updateBookings();
          onClose();
          toast({
            title: 'Booking confirmed',
            description: response.data.message,
            status: 'success',
            duration: 8000,
            isClosable: true,
          });
          setConfirmLoading(false)
        })
        .catch(err => {
          toast({
            title: 'Confirmation failed',
            description: err.message,
            status: 'error',
            duration: 8000,
            isClosable: true,
          });
          setConfirmLoading(false)
        });
    };
    return (
      <Flex w={'full'}>
        <Flex
          rounded={'lg'}
          bg={useColorModeValue('green.50', 'green.700')}
          boxShadow={'md'}
          p={2}
          w="full"
          justifyContent={'space-between'}
          flexDirection={'column'}
          gap={2}
        >
          <Flex justifyContent={'space-between'}>
          
          <Flex flexDirection={'column'}>
          <Text>
              Times:
            </Text>
            <Flex gap={2} wrap="wrap">
              {props.booking.slots_full.map(time => {
                return <Text fontSize={'lg'} fontWeight={['bold']} key={time.time}>{time.time}</Text>;
              })}
            </Flex>
            
          
           <Text>
           Duration:
           <strong>{` ${props.booking.slots.length/2} Hour/s`} </strong>
            
           </Text>
            
          </Flex>
          
          <Flex flexDirection={'column'} justifyContent={'space-between'}>
            <Button colorScheme={'green'} shadow={'md'} size={'lg'} onClick={onOpen}>
              Check-In
            </Button>
            
            <Text>
           Department:
           <strong>{` ${props.booking.user.address}`} </strong>
            
           </Text>
            
          </Flex>
            
          </Flex>
          
        </Flex>
  
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Confirm check-in</DrawerHeader>
  
            <DrawerBody justifyContent={'space-evenly'}>
              <Flex direction={'column'} gap={6}>
                <Box>
                  <Text fontWeight={600} fontSize="lg">
                    Date:
                  </Text>
                  <Text>{` ${props.booking.day}/${props.booking.month}/${props.booking.year}`}</Text>
                </Box>
  

                <Box>
                  <Text fontWeight={600} fontSize="lg">
                    Time slots:
                  </Text>
                  {props.booking.slots_full.map(time => {
                    return <Text>{time.time}</Text>;
                  })}
                </Box>
                <Box>
                  <Text fontWeight={600} fontSize="lg">
                    Total duration:
                  </Text>
                  {` ${props.booking.slots.length / 2} hour/s`}
                </Box>
                <Box>
                  <Text fontWeight={600} fontSize="lg">
                    Department:
                  </Text>
                  <Text>{` ${props.booking.user.address}`}</Text>
                </Box>
                <Box>
                  <Text fontWeight={600} fontSize="lg">
                    Name:
                  </Text>
                  <Text>{` ${props.booking.user.name_first} ${props.booking.user.name_last}`}</Text>
                </Box>
                
              </Flex>
            </DrawerBody>
  
            <DrawerFooter
              justifyContent={'space-evenly'}
              display="flex"
              flexDirection={'column'}
            >
              <Text pb={4}>
                <strong>This cannot be undone</strong>
              </Text>
              <Flex justifyContent={'space-around'} w='100%'>
                <Button colorScheme={'blue'} mr={3} onClick={onClose} size="lg" isDisabled={confirmLoading}>
                  Cancel
                </Button>
                <Button colorScheme="green" size={'lg'} onClick={confirmBooking} loadingText='Processing...' isLoading={confirmLoading}>
                  Confirm
                </Button>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    );
}

export default GuardBooking