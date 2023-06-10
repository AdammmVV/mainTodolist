import React from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { authThunk } from 'features/auth/auth.slice';

export const Login = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      let errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 7) {
        errors.password = 'Сan`not be less than 7';
      }
      return errors;
    },
    onSubmit: (data) => {
      dispatch(authThunk.logIn(data));
      formik.resetForm();
    },
  });

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={'https://social-network.samuraijs.com/'}
                  target={'_blank'}
                >
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                error={!!formik.errors.email}
                helperText={formik.errors.email}
                margin="normal"
                {...formik.getFieldProps('email')}
              />
              <TextField
                type="password"
                error={!!formik.errors.password}
                helperText={formik.errors.password}
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
              />
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                    checked={formik.values.rememberMe}
                    {...formik.getFieldProps('rememberMe')}
                  />
                }
              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

//types
type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};
