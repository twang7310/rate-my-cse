import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [psw1, setPsw1] = useState('');
    const [psw2, setPsw2] = useState('');
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isPswInvalid, setIsPswInvalid] = useState(false);
    const [pswHelperText, setPswHelperText] = useState(' ');
    const navigate = useNavigate();

    function handleSubmit() {
        let parts = email.split('@');
        if (parts.length !== 2 || parts[1] !== 'uw.edu') {
            setIsEmailInvalid(true);
        } else {
            setIsEmailInvalid(false);
        }
        if (psw1 !== psw2) {
            setIsPswInvalid(true);
            setPswHelperText('Passwords do not match. Please try again.');
        } else {
            setIsPswInvalid(false);
            setPswHelperText(' ');
        }
    }

    function handleSignin() {
        navigate('/login');
    }

    return (
        <div className='signuppage'>
            <h1>Sign up</h1>

            <Box
                sx={{
                    width: '75%'
                }}
            >
                <TextField
                    fullWidth
                    error={isEmailInvalid}
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
                    id='password'
                    label='Password'
                    variant='outlined'
                    margin='normal'
                    onInput={ (e) => {
                        setPsw1((e.target as HTMLInputElement).value)
                    }}
                />
            </Box>

            <Box
                sx={{
                    width: '75%'
                }}
            >
                <TextField
                    error={isPswInvalid}
                    helperText={pswHelperText}
                    fullWidth
                    id='repeat-password'
                    label='Repeat Password'
                    variant='outlined'
                    margin='normal'
                    onInput={ (e) => {
                        setPsw2((e.target as HTMLInputElement).value)
                    }}
                />
            </Box>

            <Button
                onClick={() => handleSubmit()}
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
                Verify UW Email
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
