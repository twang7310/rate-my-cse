import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {authenticate} from './authenticate';
import './Login.css'

let isUserSignedIn = false;
let user: string = '';

export function getSignInStatus() {
  return isUserSignedIn;
}

export function setSignInStatus(b: boolean): void {
    isUserSignedIn = b;
}

export function clearUser(): void {
    user = '';
}

export function getEmail() {
    return user;
}

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalidLogin, setIsInvalidLogin] = useState('');
    const navigate = useNavigate();

    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/GetUsers?name=${user}`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (user) {
            fetchData();
        }
    });

    function handleSubmit() {
        authenticate(email,password)
          .then(async (data)=>{
            isUserSignedIn = true;
            user = email;

            if (users.length === 0) await postUser(user);

            // Navigate back to home page
            navigate('../');
          },(err)=>{
            setIsInvalidLogin('Username or password is incorrect');
          })
    }

    function handleSignup() {
        navigate('/signup');
    }

    function handleForgot() {
        alert('Can\'t do much! Try again');
    }

    async function postUser(username: string) {
        try {
            const response = await fetch(`/api/PostUser?name=${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });
            response.json();
        } catch (error) {
            console.error('Error adding user to database:', error);
        }
    }
    
    return (
        <div className='loginpage'>
            <h1>Login</h1>

            <Box
                sx={{
                    width: '75%',
                }}
            >
                <TextField
                    fullWidth
                    error={isInvalidLogin !== ''}
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
                    width: '75%',
                }}
            >
                
                <TextField
                    fullWidth
                    error={isInvalidLogin !== ''}
                    helperText={isInvalidLogin}
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
                <p className='signup'>Don't have an account?
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
