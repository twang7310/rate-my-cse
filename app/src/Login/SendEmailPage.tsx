import React, {useState} from 'react';
import {TextField, Box, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import './Login.css'

const emailRegex = new RegExp('^[a-zA-Z0-9_]+@uw.edu$');

export const SendEmailPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const navigate = useNavigate();

    function handleSend() {
        // Check email is valid
        if (!email.match(emailRegex)) {
            setIsEmailInvalid(true);
            setEmailHelperText('Please enter a valid @uw.edu email.');
            return;
        }
        setIsEmailInvalid(false);
        setEmailHelperText('');
        navigate('/verify-code');
    }

    function handleSignin() {
        navigate('/login');
    }

    return (
        <div className='signuppage'>
            <h1>Please verify your UW email</h1>

            <Box
                sx={{
                    width: '75%',
                    marginTop: '15%'
                }}
            >
                <TextField
                    fullWidth
                    error={isEmailInvalid}
                    helperText={emailHelperText}
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

            <Button
                onClick={() => handleSend()}
                variant="contained"
                sx={{
                    borderRadius: 28,
                    width: '45%',
                    bgcolor: 'black',
                    textTransform: 'none',
                    fontSize: '2.5vh',
                    marginTop: '5%'
                }}
            >
                Send Verification Code
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
                <p>Already have an account?
                    <button
                        id='sign-in-button'
                        onClick={() => handleSignin()}
                    >
                        Sign in
                    </button>
                </p>
            </Box>
        </div>
    );
}
