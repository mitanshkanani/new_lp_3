import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import { InputAdornment } from '@mui/material';
import { Link as Lk } from 'react-router-dom';
import { useRef, useState } from 'react';
import axios from './axios';
const REGISTER_URL = 'https://fantasyleague-pl7o.onrender.com/user/newUser';

function Signup() {
  const errRef = useRef();
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const nameRegex = /^[a-zA-Z]+$/;
    const phoneRegex = /^\d+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const fullName = data.get('fullName');
    const phoneNumber = data.get('phoneNumber');
    const email = data.get('email');
    const password = data.get('password');

    if (!nameRegex.test(fullName)) {
      setNameError(true);
      console.log('Invalid name. It should only contain alphabets.');
      return;
    } else {
      setNameError(false);
    }

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError(true);
      console.log('Invalid phone number. It should only contain numeric characters.');
      return;
    } else {
      setPhoneError(false);
    }

    if (!emailRegex.test(email)) {
      setEmailError(true);
      console.log('Invalid email address');
      return;
    } else {
      setEmailError(false);
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      console.log('Invalid password. It must contain at least one digit, one lowercase and one uppercase letter, and be at least 6 characters long.');
      return;
    } else {
      setPasswordError(false);
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: fullName, email, password, mobile: phoneNumber }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log(response.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username taken');
      } else {
        setErrMsg('Registration failed');
      }
    }
  };


  return (
    <>
      {success ? (
        <section>
          <Typography component="h1" variant="h5">
            You have signed up successfully
          </Typography>
          <br />
          <Button>
            <Lk to="/">Go to home</Lk>
          </Button>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errMsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <ThemeProvider theme={createTheme()}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="name"
                        name="fullName"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        autoFocus
                        error={nameError}
                        helperText={nameError ? 'Enter a valid name containing only alphabets.' : ''}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={phoneError}
                        helperText={phoneError ? 'Invalid phone number. It should only contain numeric characters.' : ''}
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="tel"
                        onChange={() => setPhoneError(false)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={emailError}
                        helperText={emailError ? 'Invalid email address' : ''}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={passwordError}
                        helperText={passwordError ? 'Invalid password. It must contain at least one digit, one lowercase and one uppercase letter, and be at least 6 characters long.' : ''}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Button>
                        <Lk to="/SignIn">
                          Already have an account? Sign in
                        </Lk>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </section>
      )}
    </>
  );
}

export default Signup;
