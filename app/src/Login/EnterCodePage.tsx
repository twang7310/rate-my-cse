import React, {useState} from 'react';
import {Box, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input';
import './Login.css'


export const EnterCodePage: React.FC = () => {
    const [otp, setOtp] = React.useState('')
    const [isCodeInvalid, setIsCodeInvalid] = useState(false);
    const [codeHelperText, setCodeHelperText] = useState('');
    const navigate = useNavigate();

    // function handleChange(newValue: string) {
    //     setOtp(newValue)
    // }
    const handleChange = (newValue: string) => {
        setOtp(newValue)
    }

    function handleVerify() {

    }

    function handleResend() {
        navigate('/verify-email');
    }

    function handleSignin() {
        navigate('/login');
    }

    return (
        <div className='signuppage'>
            <h1>Please verify your UW email</h1>

            <Box
                sx={{
                    width: '45%',
                    marginTop: '15%'
                }}
            >
                 <MuiOtpInput value={otp} onChange={handleChange} />
            </Box>

            <p id='email-sent'>
                An email has been sent to your inbox with a verification code.
            </p>

            <Button
                onClick={() => handleVerify()}
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
                Verify
            </Button>

            <Box
                sx={{
                    width: '75%',
                    marginTop: '5%',
                    marginBottom: '6%',
                    fontSize: '2.3vh',
                    fontWeight: 700,
                }}
            >
                <button
                    id='resend-code-button'
                    onClick={() => handleResend()}
                >
                    Resend code
                </button>
            </Box>

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
