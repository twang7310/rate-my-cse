import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {authenticate} from './authenticate';
import './Login.css'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

let isUserSignedIn = false;
let user: string = '';

export function getSignInStatus(): boolean {
  return isUserSignedIn;
}

export function setSignInStatus(b: boolean): void {
    isUserSignedIn = b;
}

export function clearUser(): void {
    user = '';
}

export function getEmail(): string {
    return user;
}

// The eyeball icon in the password fields that toggles the hide/unhide
export const EyeAdornment: React.FC<{visible: any, setVisible: any}> = ({visible, setVisible}) => (
    <InputAdornment position="end">
        <IconButton onClick={() => setVisible(!visible)}>
            {visible ? <VisibilityOff /> : <Visibility/>}
        </IconButton>
    </InputAdornment>
)

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [isInvalidLogin, setIsInvalidLogin] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleSubmit() {
        setLoading(true);
        authenticate(email,password)
          .then(async (data)=>{
            isUserSignedIn = true;
            user = email;

            // Due to asynchronus behavior, we cannot check if the user already exists
            // We will just accept that we try to POST duplicate usernames and error out
            // but that is expected since it is a primary key
            postUser(user);

            // Navigate back to home page
            setLoading(false);
            navigate('../');
          },(err)=>{
            setLoading(false);
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
            console.error('Error during fetch:', error);
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
                    type={visible ? 'text' : 'password'}
                    error={isInvalidLogin !== ''}
                    helperText={isInvalidLogin}
                    id='password'
                    label='Password'
                    variant='outlined'
                    margin='normal'
                    onInput={ (e) => {
                        setPassword((e.target as HTMLInputElement).value)
                    }}
                    InputProps={{endAdornment: <EyeAdornment visible={visible} setVisible={setVisible}/>}}
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
                    fontSize: 'clamp(1px, 20px, 2.8vw)'
                }}
            >
                Continue
            </Button>

            {loading && 
                <div className='loading-comps'>
                    <div className='loading-spinner center'/>
                    <div className='loading-text'>
                        Logging in...
                    </div>
                </div>
            }

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
