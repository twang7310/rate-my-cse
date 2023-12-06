import React, {useState} from 'react';
import {TextField, Box, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {getCognitoUserPoolAsync} from '../userpool';
import {Link} from 'react-router-dom';
import {EyeAdornment} from './LoginPage';
import './Login.css'
import Popup from '../Popup/Popup';
import {checkPswValid} from './loginUtils';

const emailRegex = new RegExp('^[a-zA-Z0-9_]+@uw.edu$');

export const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [psw1, setPsw1] = useState('');
    const [psw2, setPsw2] = useState('');
    const [visible, setVisible] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [isPsw1Invalid, setIsPsw1Invalid] = useState(false);
    const [psw1HelperText, setPsw1HelperText] = useState('');
    const [isPsw2Invalid, setIsPsw2Invalid] = useState(false);
    const [psw2HelperText, setPsw2HelperText] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit() {
        // Check email is valid
        if (!email.match(emailRegex)) {
            setIsEmailInvalid(true);
            setEmailHelperText('Please use your @uw.edu email to sign up.');
            return;
        } else {
            setIsEmailInvalid(false);
            setEmailHelperText('');
        }
        if (!checkPswValid(psw1, psw2, setIsPsw1Invalid, setPsw1HelperText,
                          setIsPsw2Invalid, setPsw2HelperText)) {
            return;
        }

        setLoading(true);
        handleSignup();
        setLoading(false);
    }

    const handleSignup = async () => {
        try {
            const userPool = await getCognitoUserPoolAsync(); // Wait for the user pool to be initialized
        
            const attributeList = [];
            attributeList.push(
                new CognitoUserAttribute({
                Name: 'email',
                Value: email,
                })
            );
    
            userPool.signUp(email, psw1, attributeList, attributeList, (err: { message: string }, data: any) => {
                if (err) {
                    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
        
                    // Find if the user is already in our database
                    const fetchData = async () => {
                        try {
                            const response = await fetch(`/api/GetUsers?name=${email}`);
                            const data = await response.json();
                            setUsers(data);
                        } catch (error) {
                            console.error('Error fetching data:', error);
                        }
                    };
                    fetchData();

                    if (err.message === 'An account with the given email already exists.') {
                        // Not verified yet
                        if (users.length === 0) {
                            setIsEmailInvalid(true);
                            setLoading(false);
                            setEmailHelperText('Account already signed up. Please verify this account.');
                            cognitoUser.resendConfirmationCode((resendErr, result) => {
                                if (resendErr) {
                                    console.error(resendErr);
                                } 
                            });
                        } else {
                            setIsEmailInvalid(true);
                            setLoading(false);
                            setEmailHelperText('User is already verified. Please sign in.');
                        }
                    }
                } else {
                    setLoading(false);
                    setPopupOpen(true);
                }
            });
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
    };

    function handleSignin() {
        navigate('/login');
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className='signuppage'>
            {popupOpen &&
                <Popup onClose={() => setPopupOpen(false)} header='Verification Email Sent'>
                    <p>Check your UW email inbox for your verification email and click the link. Your account will then be ready to log into!</p>
                    <p>Click here to <Link to="/login" onClick={() => setPopupOpen(false)}>Login</Link></p>
                </Popup>
            }
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
                    onKeyDown={handleKeyDown}
                />
            </Box>

            <Box
                sx={{
                    width: '75%'
                }}
            >
                <TextField
                    type='password'
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
                    InputProps={{endAdornment: <EyeAdornment visible={visible} setVisible={setVisible}/>}}
                    onKeyDown={handleKeyDown}
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
                    type={visible ? 'text' : 'password'}
                    id='repeat-password'
                    label='Repeat Password'
                    variant='outlined'
                    margin='normal'
                    onInput={ (e) => {
                        setPsw2((e.target as HTMLInputElement).value)
                    }}
                    InputProps={{endAdornment: <EyeAdornment visible={visible} setVisible={setVisible}/>}}
                    onKeyDown={handleKeyDown}
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
                    fontSize: 'clamp(1px, 20px, 2.8vw)',
                    marginTop: '5%',
                }}
            >
                Verify UW Email
            </Button>

            {loading && 
                <div className='loading-comps'>
                    <div className='loading-spinner center'/>
                    <div className='loading-text'>
                        Loading...
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
                <p className='signin'>Already have an account?
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
