import React, { useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaDonate } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../env';

function TopUp(props) {
  const toast = useToast();

  const navigate = useNavigate();

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
        return
      }
      else if (response.data.role == 'user') {
        navigate('/');
      }
      else if (response.data.role == 'guard') {
        navigate('/guard')
      }
      else {
        console.log('authentication error')
        props.setLogin({});
        props.logout()
        navigate('/login');
      }
    })
  },[]);

  const getUsersURL = `${BASE_URL}/admin/users-top-up`;
  const topUpURL = `${BASE_URL}/admin/top-up`;

  const [amount, setAmount] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [receipt, setReceipt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(getUsersURL, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        setUsers(response.data.users);
      });
  }, []);

  const topUp = () => {
    setLoading(true);
    const topUpDetails = {
      userId: selectedUser,
      amount: amount,
      receipt: receipt,
    };
    console.log(topUpDetails);
    axios
      .post(topUpURL, topUpDetails, {
        headers: { Authorization: `Bearer ${props.loggedIn.token}` },
      })
      .then(response => {
        toast({
          title: 'Top-up complete',
          description: response.data.message,
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setAmount('');
        setReceipt('');
        setLoading(false);
      })
      .catch(err => {
        toast({
          title: 'Error generating code',
          description: err.response.data.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  const onUserChange = e => {
    const value = e.target.value;
    console.log(value);
    setSelectedUser(value);
  };

  const onAmountChange = e => {
    const value = e.target.value;
    setAmount(value);
  };

  const onRecieptChange = e => {
    const value = e.target.value;
    setReceipt(value);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={4} px={4} w="full">
        <RouteLink to={'/admin'}>
          <Button size="sm" colorScheme={'blue'} leftIcon={<FaArrowLeft />}>
            Back to menu
          </Button>
        </RouteLink>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Top-up</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Add Credits to user
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="user">
              <FormLabel>User</FormLabel>
              <Select placeholder="Select user" onChange={onUserChange}>
                {users.map(user => {
                  return (
                    <option
                      value={user._id}
                      key={user._id}
                    >{`${user.address} - ${user.name_first} ${user.name_last}- ${user.balance}`}</option>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl id="amount">
              <FormLabel>
                Amount <small>(increments of 50)</small>
              </FormLabel>
              <Input
                type="number"
                required
                onChange={onAmountChange}
                value={amount}
                name="amount"
                placeholder="Eg. 1000"
              />
            </FormControl>

            <FormControl id="receipt">
              <FormLabel>Receipt #</FormLabel>
              <Input
                type="text"
                required
                onChange={onRecieptChange}
                value={receipt}
                name="amount"
                placeholder="Enter receipt number"
              />
            </FormControl>

            <Stack spacing={2} pt={4}>
              <Text textAlign={'center'}>
                <strong>⚠️ Ensure information accuracy</strong>
              </Text>
              <Button
                isLoading={loading}
                onClick={topUp}
                loadingText="Topping up..."
                colorScheme="green"
                size="lg"
                leftIcon={<FaDonate />}
              >
                {`Top-up ${amount}`}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default TopUp;
