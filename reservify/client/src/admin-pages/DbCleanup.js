import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import BASE_URL from "../env";

function DbCleanup(props) {
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

  return(
    <div>DbCleanup</div>
  ) 
}

export default DbCleanup;
