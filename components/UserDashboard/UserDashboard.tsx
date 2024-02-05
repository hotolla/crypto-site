import { useContext, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Yup } from '@/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { Button, Typography, Container, Stack, TextField } from '@mui/material';
import * as usersApi from '@/api/users';
import { UsersProfilesContext } from '@/components/user/User';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { preventDefault } from '@/helpers/preventDefault';

interface FormValues {
  name?: string | null,
  email?: string | null,
  password?: string | null,
  balance: number | null,
  purchasedCurrency: string | null,
  soldCurrency: string | null
}

const defaultValues = {
  name: '',
  email: '',
  password: '',
  balance: '',
  purchasedCurrency: '',
  soldCurrency: ''
};

const schema = Yup.object({
  name: Yup.string().nullable().required(),
  email: Yup.string().nullable().required(),
  password: Yup.string().nullable().required(),
  balance: Yup.string().nullable().required(),
  purchasedCurrency: Yup.string().nullable().required(),
  soldCurrency: Yup.string().nullable().required()
});

export const UserDashboard = () => {
  const [ isError, setIsError ] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });
  const { fetchUsersProfiles } = useContext(UsersProfilesContext);

  useEffect(() => {
    fetchUsersProfiles();
  });
  const handleSubmit = (values: FormValues) => {
    console.log(values);
    usersApi.updateUserProfile(values).then((data) => {
      console.log(values);
      fetchUsersProfiles();
      router.push('/markets');
    }).catch(() => {
      setIsError(true);
    });
  };

  return (
    <Container maxWidth="xs">
      <FormProvider {...form}>
        <Stack sx={{ mt: 10, alignItems: 'center' }}>
          <PriceChangeIcon  color="primary" fontSize="large"/>

          <Typography variant="h5" color="primary" mt={1}>
            Estimated Balance:
          </Typography>
        </Stack>

        <Stack
          noValidate
          spacing={2}
          mt={4}
          component="form"
          // onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
        >
          <TextField
            required
            type="text"
            name="balance"
            label="balance"
            placeholder="Enter balance ..."
          />

          <TextField
            required
            type="text"
            name="purchasedCurrency"
            label="purchasedCurrency"
            placeholder="Enter purchasedCurrency ..."
          />

          <TextField
            required
            type="text"
            name="soldCurrency"
            label="soldCurrency"
            placeholder="Enter soldCurrency ..."
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Login
          </Button>
        </Stack>
      </FormProvider>
    </Container>
  );
};
