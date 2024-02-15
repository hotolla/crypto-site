import {  useState } from 'react';
import { Yup } from '@/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { Stack, Paper, Box, Button, IconButton, Container, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { chargeAccount } from '@/api/accounts/accounts';
import { TextField } from '@/components/TextField';

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
  const [ balance, setBalance,  ] = useState<IBalance | null>(null);
  const [showBalance, setShowBalance] = useState<boolean>(false);

  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema)
  });

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };


  const handleSubmit = (values: FormValues) => {
    console.log(values)
    chargeAccount(values)
      .then((data) => {
        setBalance(data);
        console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Paper elevation={1} sx={{maxWidth: 500}}>
      <Container>

        <Stack spacing={1}>
          <Stack spacing={3} direction="row" alignItems="center">
            <Typography variant="h6">Estimated Balance:</Typography>

            <IconButton onClick={toggleBalanceVisibility}>
              <VisibilityIcon />
            </IconButton>
          </Stack>
          <Stack>
            {showBalance ?
              <Box>{balance?.amount} {balance?.currency}5000</Box>
              : <Box>********</Box>
            }
          </Stack>
        </Stack>
        <FormProvider {...form}>
          <form onSubmit={(form.handleSubmit(handleSubmit))}>
            <TextField
              type="number"
              name="amount"
              label="amount"
              placeholder="Enter amount ..."
              sx={{mb: 1 }}
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
      </Container>
    </Paper>
  );
};
