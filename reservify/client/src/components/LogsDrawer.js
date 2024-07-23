// import {
//     Flex,
//     FormControl,
//     FormLabel,
//     Stack,
//     Button,
//     Drawer,
//     DrawerBody,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerOverlay,
//     DrawerContent,
//     DrawerCloseButton,
//     Select,
//     Divider,
//   } from '@chakra-ui/react';
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router';
// import { useEffect } from 'react';
// import UserLog from './UserLog';

//  function LogsDrawer(props) {

//     const navigate = useNavigate();
//     // const toast = useToast();

//     const userCheck = `http://localhost:8080/api/users/check`;

//     useEffect( () => {
//       if (!props.loggedIn.token) {
//         console.log(props.loggedIn.token);
//         navigate('/login');
//       }
//        axios.get(userCheck, {
//         headers: { Authorization: `Bearer ${props.loggedIn.token}` },
//       })
//       .then(response => {
//         if (response.data.role == 'admin') {
//           return
//         }
//         else if (response.data.role == 'user') {
//           navigate('/');
//         }
//         else if (response.data.role == 'guard') {
//           navigate('/guard')
//         }
//         else {
//           console.log('authentication error')
//           props.setLogin({});
//           props.logout()
//           navigate('/login');
//         }
//       })
//     },[]);

//     const [loading, setLoading] = useState(false)
//     const [logs, setLogs] = useState([]);
//     const [logsForm, setLogsForm] = useState({

//       duration: '',
//     });

//     const fetchLogs = () => {
//       setLoading(true)
//       const logsURL = `http://localhost:8080/api/logs/${logsForm.duration}`;

//        axios
//         .get(logsURL, {
//           headers: { Authorization: `Bearer ${props.loggedIn.token}` },
//         })
//         .then(response => {
//           setLogs(response.data.logs);
//           console.log(response.data.logs);

//           setLoading(false)
//         });

//     };

//     const onDurChange = e => {
//       const value = e.target.value;
//       setLogsForm({
//         ...logsForm,
//         [e.target.name]: value,
//       });
//     };


//     return (
//       <Drawer
//         isOpen={props.isLogsOpen}
//         placement="right"
//         onClose={props.onLogsClose}
//         size="md"
//       >
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerCloseButton />
//           <DrawerHeader>View my activity</DrawerHeader>

//           <DrawerBody>
//             <FormControl id="duration" isRequired>
//               <FormLabel fontSize={'sm'} fontWeight="bold">
//                 Duration
//               </FormLabel>
//               <Select
//                 name="duration"
//                 placeholder="Select option"
//                 onChange={onDurChange}
//               >
//                 <option value="3">Past 3 Days</option>
//                 <option value="7">Past 7 Days</option>
//                 <option value="30">Past 30 Days</option>
//               </Select>
//             </FormControl>
//             <Stack spacing={2} pt={2}>
//               <Button
//                 onClick={fetchLogs}
//                 loadingText="Loading..."
//                 isLoading={loading}
//                 size="md"
//                 colorScheme={'blue'}
//               >
//                 Get my activity
//               </Button>
//             </Stack>
//             <Divider mt={2} mb={2} />
//             <Flex flexDirection={'column'} gap={2} px={2}>
//               {logs.map(userlog => {
//                 return (
//                   <div key={userlog._id}>
//                      <UserLog userlog={userlog} />

//                   </div>
//                 );
//               })}
//             </Flex>

//           </DrawerBody>

//           <DrawerFooter>
//             <Button
//               colorScheme={'red'}
//               mr={3}
//               // onClick={onLogsClose}
//               size="lg" //isDisabled={confirmBookLoading}
//             >
//               X Close
//             </Button>
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//     );
//   }

//   export default LogsDrawer;



import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Select,
  Divider,
} from '@chakra-ui/react';
import UserLog from '../components/UserLog';

export default function LogsDrawer(props) {
  return (
    <Drawer
      isOpen={props.isLogsOpen}
      placement="right"
      onClose={props.onLogsClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>View my activity</DrawerHeader>

        <DrawerBody>
          <FormControl id="duration" isRequired>
            <FormLabel fontSize={'sm'} fontWeight="bold">
              Duration
            </FormLabel>
            <Select
              name="duration"
              placeholder="Select option"
              onChange={props.onDurChange}
            >
              <option value="3">Past 3 Days</option>
              <option value="7">Past 7 Days</option>
              <option value="30">Past 30 Days</option>
            </Select>
          </FormControl>
          <Stack spacing={2} pt={2}>
            <Button
              onClick={props.fetchLogs}
              loadingText="Loading..."
              isLoading={props.logs}
              size="md"
              colorScheme={'blue'}
            >
              Get my activity
            </Button>
          </Stack>
          <Divider mt={2} mb={2} />
          <Flex flexDirection={'column'} gap={2} px={2}>
            {props._logs.map(log => {
              return (
                <div key={log._id}>
                  <UserLog log={log} />
                </div>
              );
            })}
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button
            colorScheme={'red'}
            mr={3}
            onClick={props.onLogsClose}
            size="lg" //isDisabled={confirmBookLoading}
          >
            X Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

















