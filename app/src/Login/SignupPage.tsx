import React, {useState} from 'react';
import {TextField, Box, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import './Login.css'

export const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [psw1, setPsw1] = useState('');
    const [psw2, setPsw2] = useState('');
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [isPsw1Invalid, setIsPsw1Invalid] = useState(false);
    const [psw1HelperText, setPsw1HelperText] = useState('');
    const [isPsw2Invalid, setIsPsw2Invalid] = useState(false);
    const [psw2HelperText, setPsw2HelperText] = useState('');
    const navigate = useNavigate();

    function handleSubmit() {
        // Check email
        let parts = email.split('@');
        if (parts.length !== 2 || parts[1] !== 'uw.edu') {
            setIsEmailInvalid(true);
            setEmailHelperText('Please use your @uw.edu email to sign up.');
            return;
        } else {
            setIsEmailInvalid(false);
            setEmailHelperText('');
        }
        // Check psw1 has at least 8 characters
        if (psw1.length < 8) {
            setIsPsw1Invalid(true);
            setPsw1HelperText('Password must be at least 8 characters long.');
            return;
        }
        // Check psw1 has at least one capital letter
        if (!psw1.match(/[A-Z]/)) {
            setIsPsw1Invalid(true);
            setPsw1HelperText('Password must contain at least one capital letter.');
            return;
        }
        // Check psw1 has at least one number
        if (!psw1.match(/[0-9]/)) {
            setIsPsw1Invalid(true);
            setPsw1HelperText('Password must contain at least one number.');
            return;
        }
        // Check psw1 has at least one special character
        if (!psw1.match(/[!@#$%^&*(),.?":{}|<>]/)) {
            setIsPsw1Invalid(true);
            setPsw1HelperText('Password must contain at least one special character.');
            return;
        }
        setIsPsw1Invalid(false);
        setPsw1HelperText('');
        // Check psw1 and psw2 match
        if (psw1 !== psw2) {
            setIsPsw2Invalid(true);
            setPsw2HelperText('Passwords do not match. Please try again.');
        } else {
            setIsPsw2Invalid(false);
            setPsw2HelperText('');
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

            <Box
                sx={{
                    width: '75%'
                }}
            >
                <TextField
                    error={isPsw1Invalid}
                    helperText={psw1HelperText}
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
                    error={isPsw2Invalid}
                    helperText={psw2HelperText}
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
