import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography, Container, Stack } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Yup } from '@/validation';
import * as authApi from '@/app/api/auth';
import { TextField } from '@/app/components/TextField';
import { preventDefault } from '@/app/helpers/preventDefault';
import { useAuth } from '@/app/components/AuthProvider';

interface FormValues {
  email: string | null,
  password: string | null
}

const defaultValues = {
  email: '',
  password: ''
};

const schema = Yup.object({
  email: Yup.string().nullable().required(),
  password: Yup.string().nullable().required()
});

export const LoginPage = () => {
  const [ isError, setIsError ] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });
  const { login } = useAuth();

  const handleSubmit = (values: FormValues) => {
    authApi.login(values).then((data) => {
      login(data);
      router.push('/markets');
    }).catch(() => {
      setIsError(true);
    });
  };
  // const handleGoogleLogin = async () => {
  //   try {
  //     await signIn('google');
  //     router.push('/markets');
  //   } catch (error) {
  //     console.error('Google login error:', error);
  //     setIsError(true);
  //   }
  // };

  return (
    <Container maxWidth="xs">
      <FormProvider {...form}>
        <Stack sx={{ mt: 10, alignItems: 'center' }}>
          <Typography variant="h5" color="primary" mb={4}>
            Welcome to crypto exchange!
          </Typography>
          <LockOpenIcon  color="primary" fontSize="large"/>

          <Typography variant="h5" color="primary" mt={1}>
            Login to account:
          </Typography>
        </Stack>

        <Stack
          noValidate
          spacing={2}
          mt={4}
          component="form"
          onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
        >
          <TextField
            required
            type="email"
            name="email"
            label="E-mail address"
            placeholder="Enter e-mail ..."
          />

          <TextField
            required
            type="password"
            name="password"
            label="Password"
            placeholder="Enter password ..."
          />

          {isError &&
            <>
              <Typography align="center" color="error">
                Login details are not correct
              </Typography>
            </>
          }

          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Login
          </Button>

          <Typography>
            <Link href="/registration" style={{ textDecoration: 'none' }}>Forgot your password?</Link>
          </Typography>

          <Typography>
            <Link href="/registration" style={{ textDecoration: 'none' }}>Register a new account?</Link>
          </Typography>
        </Stack>
      </FormProvider>

      {/*<Button*/}
      {/*  variant="outlined"*/}
      {/*  startIcon={<AddLocationAltIcon />}*/}
      {/*  onClick={handleSubmit2}*/}
      {/*  sx={{mt: 2}}*/}
      {/*>*/}
      {/*  see location on the map*/}
      {/*</Button>*/}
    </Container>
  );
};
