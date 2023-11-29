import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import { authenticate } from '../services/authenticate';
import './Login.css'

let isUserSignedIn = false;
let user = "";

export function getSignInStatus() {
  return isUserSignedIn;
}

export function getEmail() {
    return user;
}

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalidLogin, setIsInvalidLogin] = useState(false);
    const navigate = useNavigate();

    function handleSubmit() {
        authenticate(email,password)
          .then((data)=>{
            isUserSignedIn = true;
            user = email;
            navigate('../');
          },(err)=>{
            setIsInvalidLogin(true);
          })
    }

    function handleSignup() {
        navigate('/signup');
    }

    function handleForgot() {
        alert('Can\'t do much! Try again');
    }

    return (
        <div className='loginpage'>
            <h1>Login</h1>

            <Box
                sx={{
                    width: '75%'
                }}
            >
                <TextField
                    fullWidth
                    error={isInvalidLogin}
                    id='email'
                    label='UW Email'
                    variant='outlined'
                    margin='normal'
                    autoComplete='off'
                    onInput={ (e) => {
                        setEmail((e.target as HTMLInputElement).value)
                    }}
                />
            </Box>

            <Box
                sx={{
                    width: '75%'
                }}
            >
                <TextField
                    fullWidth
                    error={isInvalidLogin}
                    id='password'
                    label='Password'
                    variant='outlined'
                    margin='normal'
                    onInput={ (e) => {
                        setPassword((e.target as HTMLInputElement).value)
                    }}
                />
            </Box>

            <button
                id='forgot-psw' 
                onClick={() => handleForgot()}
            >
                Forgot password?
            </button>

            <Button
                onClick={() => handleSubmit()}
                variant="contained"
                sx={{
                    borderRadius: 28,
                    width: '45%',
                    bgcolor: 'black',
                    textTransform: 'none',
                    fontSize: '2.5vh'
                }}
            >
                Continue
            </Button>

            <Box
                sx={{
                    width: '75%',
                    marginTop: 'auto',
                    marginBottom: '6%',
                    fontSize: '2.3vh',
                    fontWeight: 700,
                }}
            >
                <p>Don't have an account?
                    <button
                        id='sign-up-button'
                        onClick={() => handleSignup()}
                    >
                        Sign up
                    </button>
                </p>
            </Box>
        </div>
    );
}
