import { useEffect, useState } from 'react';
import { Yup } from '@/app/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { Stack, Paper, Box, Button } from "@mui/material";
import { TextField } from '@/app/components/TextField';
import { chargeAccount } from '@/app/api/accounts/accounts';
import { useAuth } from '@/app/components/AuthProvider';

interface FormValues {
  amount: number | null,
  currency: string | null
}
export interface IBalance {
  amount: number,
  currency: string
}

const defaultValues = {
  amount: 0,
  currency: ''
};

const validationSchema = Yup.object({
  amount: Yup.number().nullable().required(),
  currency: Yup.string().nullable().required()
});

export const Wallet = () => {
  const { token } = useAuth();
  const [ balance, setBalance,  ] = useState<IBalance | null>(null);

  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema)
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values, token)

    chargeAccount(values, token).then((data) => {
      // console.log(data)
      setBalance(data);
    }).catch(() => {
    });
  };

  return (
    <Paper elevation={1}>

      <Stack spacing={2}>
        <Stack spacing={1} direction="column">
          <Box>Estimated Balance: {balance?.amount} {balance?.currency}</Box>

          {/*<IconButton>*/}
          {/*  <VisibilityIcon />*/}
          {/*</IconButton>*/}

        </Stack>

        <FormProvider {...form}>
          <form onSubmit={(form.handleSubmit(handleSubmit))}>
            <TextField
              type="number"
              name="amount"
              label="amount"
              placeholder="Enter amount ..."
              sx={{mb: 1}}
            />

            <TextField
              name="currency"
              label="currency"
              placeholder="Enter curency ..."
              sx={{mb: 1}}
            />
            <Button variant="contained" type="submit">Deposit</Button>
          </form>
        </FormProvider>
      </Stack>
    </Paper>
  );
};