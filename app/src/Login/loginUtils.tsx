
export const checkPswValid = (psw1: string, psw2:string, setIsPsw1Invalid: any,
    setPsw1HelperText: any, setIsPsw2Invalid: any, setPsw2HelperText: any) => {

    const capitalRegex = new RegExp('[A-Z]');
    const numberRegex = new RegExp('[0-9]');
    const specialRegex = new RegExp('[!@#$%^&*(),.?":{}|<>]');

    // Check psw1 has at least 8 characters
    if (psw1.length < 8) {
        setIsPsw1Invalid(true);
        setPsw1HelperText('Password must be at least 8 characters long.');
        return false;
    }
    // Check psw1 has at least one capital letter
    if (!psw1.match(capitalRegex)) {
        setIsPsw1Invalid(true);
        setPsw1HelperText('Password must contain at least one capital letter.');
        return false;
    }
    // Check psw1 has at least one number
    if (!psw1.match(numberRegex)) {
        setIsPsw1Invalid(true);
        setPsw1HelperText('Password must contain at least one number.');
        return false;
    }
    // Check psw1 has at least one special character
    if (!psw1.match(specialRegex)) {
        setIsPsw1Invalid(true);
        setPsw1HelperText('Password must contain at least one special character.');
        return false;
    }
    setIsPsw1Invalid(false);
    setPsw1HelperText('');
    // Check psw1 and psw2 match
    if (psw1 !== psw2) {
        setIsPsw2Invalid(true);
        setPsw2HelperText('Passwords do not match. Please try again.');
        return false;
    } else {
        setIsPsw2Invalid(false);
        setPsw2HelperText('');
    }
    return true;
}
