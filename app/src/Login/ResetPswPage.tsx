import React, {useState} from 'react';
import {TextField, Box, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input';
import {checkPswValid} from './loginUtils';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {getCognitoUserPoolAsync} from '../userpool';
import './Login.css'

const emailRegex = new RegExp('^[a-zA-Z0-9_]+@uw.edu$');
const sentText = 'An email has been sent to your inbox with a verification code.';

export const ResetPswPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [psw1, setPsw1] = useState('');
    const [psw2, setPsw2] = useState('');
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [isPsw1Invalid, setIsPsw1Invalid] = useState(false);
    const [psw1HelperText, setPsw1HelperText] = useState('');
    const [isPsw2Invalid, setIsPsw2Invalid] = useState(false);
    const [psw2HelperText, setPsw2HelperText] = useState('');
    const [otp, setOtp] = React.useState('')
    const [isCodeInvalid, setIsCodeInvalid] = useState(false);
    const [codeHelperText, setCodeHelperText] = useState(sentText);

    const [showLayout, setShowLayout] = useState(true);
    const [showSendEmail, setShowSendEmail] = useState(true);
    const [showSendCode, setShowSendCode] = useState(false);
    const [showReset, setShowReset] = useState(false);

    async function handleSendCode() {
        // Check email is valid
        if (!email.match(emailRegex)) {
            setIsEmailInvalid(true);
            setEmailHelperText('Please enter a valid @uw.edu email.');
            return;
        }
        // TODO: Send email address to backend to send code
        // Forgot password
        if (email.length > 0) {
            const userPool = await getCognitoUserPoolAsync();
            const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
            cognitoUser.forgotPassword({
                onSuccess: function(result) {
                    console.log('call result: ' + result);
                    // navigate to verficication code page
                    setIsEmailInvalid(false);
                    setEmailHelperText('');
                    setShowSendEmail(false);
                    setShowLayout(false);
                    setShowReset(true);
                },
                onFailure: function(err) {
                    alert(err);
                }
            });
        }
    }

    async function handleVerify() {
        // Check code is valid
        if (otp.length !== 6) {
            setIsCodeInvalid(true);
            setCodeHelperText('Please enter a valid 6 digit code.');
            return;
        }
        // Send code to backend to verify
        const userPool = await getCognitoUserPoolAsync();
        const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
        cognitoUser.confirmPassword(otp, psw1, {
            onSuccess: function(confirmResult) {
                console.log('call result: ' + confirmResult);
                // navigate to login page
                navigate('/login');
            },
            onFailure: function(err) {
                alert(err);
            }
        });
        // setIsCodeInvalid(false);
        // setCodeHelperText(sentText);
        // setShowSendCode(false);
        // setShowLayout(false);
        // setShowReset(true);
    }

    function handleSubmit() {
        if (!checkPswValid(psw1, psw2, setIsPsw1Invalid, setPsw1HelperText,
                     setIsPsw2Invalid, setPsw2HelperText)) {
            return;
        }
        // toggle to verification code page
        setShowLayout(true);
        setShowSendCode(true);
        setShowReset(false);
    }

    function handleResend() {
        setShowSendEmail(true);
        setShowSendCode(false);
    }

    function handleSignin() {
        navigate('/login');
    }

    return (
        <div className='signuppage' id='container'>
            <h1 style={{ display: showLayout ? undefined : 'none' }}
            >
                Please verify your UW email
            </h1>

            <h1 style={{ display: showReset ? undefined : 'none' }}
            >
                Reset Password
            </h1>

            <Box
                style={{ display: showSendEmail ? undefined : 'none' }}
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
                style={{ display: showSendEmail ? undefined : 'none' }}
                onClick={() => handleSendCode()}
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
                style={{ display: showSendCode ? undefined : 'none' }}
                sx={{
                    width: '55%',
                    marginTop: '15%'
                }}
            >
                <MuiOtpInput length={6} value={otp} onChange={
                    (newValue: string) => { setOtp(newValue) }} />
            </Box>
            
            <p 
                id='email-sent'
                style={{ color: isCodeInvalid ? "#ff0000" : "#159500",
                         display: showSendCode ? undefined : 'none'}}>
                {codeHelperText}
            </p>

            <Button
                style={{ display: showSendCode ? undefined : 'none' }}
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
                style={{ display: showSendCode ? undefined : 'none' }}
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
                style={{ display: showReset ? undefined : 'none' }}
                sx={{
                    width: '75%',
                    marginTop: '8%'
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
                style={{ display: showReset ? undefined : 'none' }}
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
                style={{ display: showReset ? undefined : 'none' }}
                onClick={() => handleSubmit()}
                variant="contained"
                sx={{
                    borderRadius: 28,
                    width: '45%',
                    bgcolor: 'black',
                    textTransform: 'none',
                    fontSize: '2.5vh',
                    marginTop: '15%'
                }}
            >
                Reset Password
            </Button>

            <Box
                style={{ display: showLayout ? undefined : 'none' }}
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