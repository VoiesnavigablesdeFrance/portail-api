import React, { useState } from 'react';
import Page from '../layouts';
import router from 'next/router';

const Login =() => {
  const initialFormData = {
    user: '',
    password: ''
  }
  const [token,setToken] = useState('');
  const [formData, setFormData] = useState(initialFormData)
  const handleLogin = () => {
    fetch("http://localhost:3002/api/login/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then((res) => {
      return res.json()
    })
    .then((data)=>{

      if(data.token){
        if(sessionStorage.getItem('token')){
          sessionStorage.removeItem('token');
        }
        setToken(data.token)
        sessionStorage.setItem('token', data.token)
        router.push('/')
      }
      setFormData(initialFormData);
    })
    .catch((err)=>{
      console.error(err)
    })
  }

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  return(
    <Page title={'Page de login'}>
    <div className="login-wrapper">
      <h1>S'identifier</h1>
      <form>
        <label className='identifiant'>
          <p>Identifiant</p>
          <input 
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            />
        </label>
        <label>
          <p>Mot de passe</p>
          <input 
            type="password" 
            name='password'
            value={formData.password}
            onChange={handleChange} />
        </label>
        <div>
          <button onClick={handleLogin} type="button">Se connecter</button>
        </div>
      </form>
    </div>
    <style>
        {`
        .login-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
        },
        `}
    </style>
    </Page>
  );
};
export default Login;