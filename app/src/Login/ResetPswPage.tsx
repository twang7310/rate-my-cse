import React, {useState} from 'react';
import {TextField, Box, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {MuiOtpInput} from 'mui-one-time-password-input';
import {checkPswValid} from './loginUtils';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {getCognitoUserPoolAsync} from '../userpool';
import {EyeAdornment} from './LoginPage';
import Popup from "../Popup/Popup";
import './Login.css'

const emailRegex = new RegExp('^[a-zA-Z0-9_]+@uw.edu$');
const sentText = 'An email has been sent to your inbox with a verification code.';

export const ResetPswPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [psw1, setPsw1] = useState('');
    const [visible1, setVisible1] = useState(false);
    const [psw2, setPsw2] = useState('');
    const [visible2, setVisible2] = useState(false);
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
    const [popupOpen, setPopupOpen] = useState(false);

    async function handleContinue() {
        // Check email is valid
        if (!email.match(emailRegex)) {
            setIsEmailInvalid(true);
            setEmailHelperText('Please enter a valid @uw.edu email.');
            return;
        }
        // Continue to reset password
        setIsEmailInvalid(false);
        setEmailHelperText('');
        setShowSendEmail(false);
        setShowLayout(false);
        setShowReset(true);
    }
 
    async function handleSubmit() {
        if (!checkPswValid(psw1, psw2, setIsPsw1Invalid, setPsw1HelperText,
                     setIsPsw2Invalid, setPsw2HelperText)) {
            return;
        }
        // Forgot password
        const userPool = await getCognitoUserPoolAsync();
        const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
        cognitoUser.forgotPassword({
            onSuccess: function() {
                // Continue to verification code page
                setShowLayout(true);
                setShowSendCode(true);
                setShowReset(false);
            },
            onFailure: function(err) {
                alert(err);
            }
        });
    }

    async function handleVerify() {
        // Check code is valid
        if (otp.length !== 6) {
            setIsCodeInvalid(true);
            setCodeHelperText('Please enter a valid 6 digit code.');
            return;
        }
        const userPool = await getCognitoUserPoolAsync();
        const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
        // Send code to backend to verify
        cognitoUser.confirmPassword(otp, psw1, {
            onSuccess: function() {
                // popup saying reset successful
                setPopupOpen(true);
            },
            onFailure: function() {
                setIsCodeInvalid(true);
                setCodeHelperText('Code does not match, please try again.');
            }
        });
    }

    function handleResend() {
        setShowSendEmail(true);
        setShowSendCode(false);
        setIsEmailInvalid(false);
        setEmailHelperText(sentText);
    }

    function handleSignin() {
        navigate('/login');
    }

    const handleKeyDownContinue = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleContinue();
        }
    };

    const handleKeyDownSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className='signuppage' id='container'>
            {popupOpen && 
                <Popup 
                    onClose={() => {
                        setPopupOpen(false);
                        navigate('/login');
                    }} 
                    header=""
                >
                    <p>Password changed successfully!</p>
                </Popup>
            }
            <h1 style={{ display: showLayout ? undefined : 'none', fontSize: 'clamp(1px, 34px, 6vw)', paddingLeft: '2vw', paddingRight: '2vw' }}>
                Please enter your UW email
            </h1>

            <h1 style={{ display: showReset ? undefined : 'none', fontSize: 'clamp(1px, 34px, 6vw)', paddingLeft: '2vw', paddingRight: '2vw' }}>
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
                    onKeyDown={handleKeyDownContinue}
                />
            </Box>

            <Button 
                style={{ display: showSendEmail ? undefined : 'none' }}
                onClick={() => handleContinue()}
                variant="contained"
                sx={{
                    borderRadius: 28,
                    width: '45%',
                    bgcolor: 'black',
                    textTransform: 'none',
                    fontSize: 'clamp(1px, 20px, 2.8vw)',
                    marginTop: '5%'
                }}
            >
                Continue
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
                    fontSize: 'clamp(1px, 20px, 2.8vw)',
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
                    type={visible1 ? 'text' : 'password'}
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
                    onKeyDown={handleKeyDownSubmit}
                    InputProps={{endAdornment: <EyeAdornment visible={visible1} setVisible={setVisible1}/>}}
                />
            </Box>

            <Box
                style={{ display: showReset ? undefined : 'none' }}
                sx={{
                    width: '75%'
                }}
            >
                <TextField
                    type={visible2 ? 'text' : 'password'}
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
                    onKeyDown={handleKeyDownSubmit}
                    InputProps={{endAdornment: <EyeAdornment visible={visible2} setVisible={setVisible2}/>}}
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
                <p className='signin'>Changed your mind?
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