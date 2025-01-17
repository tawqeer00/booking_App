import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Stack,
  Heading,
  Flex,
  Button,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import GuardBooking from '../components/GuardBooking';
// import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaCaretLeft } from 'react-icons/fa';
import { LockIcon, RepeatIcon } from '@chakra-ui/icons';
import BASE_URL from '../env';

function GuardPage(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const BookingsURL = `${BASE_URL}/guard/bookings`;
  const [bookings, setBookings] = useState([]);

  const userCheck = `${BASE_URL}/users/check`;

  useEffect(() => {
    if (!props.loggedIn.token) {
      navigate('/login');
    }
    axios.get(userCheck, {
      headers: { Authorization: `Bearer ${props.loggedIn.token}` },
    })
    .then(response => {
      if (response.data.role == 'admin') {
        navigate('/admin');
      }
      else if (response.data.role == 'user') {
        navigate('/');
      }
      else if (response.data.role == 'guard') {
        return
      }
      else {
        console.log('authentication error')
        props.setLogin({});
        props.logout()
        navigate('/login');
      }
    })
  },[]);

  useEffect(() => {
    axios
      .get(BookingsURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        console.log(response.data.bookings);
        if (response.data.bookings.length == 0) {
          toast({
            title: 'No bookings',
            description: 'There are no bookings for today',
            status: 'warning',
            duration: 2000,
            isClosable: true,
          });
        }
        setBookings(response.data.bookings);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const updateBookings = () => {
    axios
      .get(BookingsURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        console.log(response.data.bookings);
        if (response.data.bookings.length == 0) {
          toast({
            title: 'No bookings',
            description: 'There are no bookings for today',
            status: 'warning',
            duration: 2000,
            isClosable: true,
          });
        }
        setBookings(response.data.bookings);
      })
      .catch(err => {
        console.log(err);
      });
  };

    // if (bookings.length == 0) {
    //   return <Loader />;
    // }

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'space-between'}
      flexDirection={'column'}
    >
      <Stack spacing={4} mx={'auto'} maxW={'lg'} py={4} px={4} w="full">
        <Flex justifyContent={'space-evenly'}>
          <Button
            size="lg"
            colorScheme={'blue'}
            leftIcon={<RepeatIcon />}
            onClick={updateBookings}
          >
            Refresh
          </Button>

          <Button
            size="lg"
            colorScheme={'red'}
            leftIcon={<LockIcon />}
            onClick={() => {
              props.setLogin({});
              props.logout();
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </Flex>

        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>Today's Meetings</Heading>
          <Divider />
          {/* <Text fontSize={'lg'} >
              {`Your account balance is ${props.loggedIn.balance}`}
            </Text> */}
        </Stack>
        {bookings.map(booking => {
          return (
            <Flex key={booking.date}>
              <GuardBooking
                booking={booking}
                updateBookings={updateBookings}
                loggedIn={props.loggedIn}
              />
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
}

export default GuardPage;
