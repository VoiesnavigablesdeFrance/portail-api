import React, { useState } from 'react';
import Page from '../layouts';
import router from 'next/router';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



const Login =() => {
  const initialFormData = {
    user: '',
    password: ''
  }
  const [token,setToken] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if(formData.user != "" && formData.password != ""){
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
      else{
        setError('Identifiant ou mot de passe incorrect');
      }
      setFormData(initialFormData);
    })
    .catch((err)=>{
      console.error(err)
    })
    }
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Username"
              autoComplete="user"
              autoFocus
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              id="password"
              autoComplete="current-password"
              type="password" 
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="button"
              onClick={handleLogin}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </Box>
      </Container>
    </Page>
  );
};
export default Login;