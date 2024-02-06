import {  useState } from 'react';
import { Yup } from '@/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { Stack, Paper, Box, Button, IconButton } from '@mui/material';
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
    <Paper elevation={1}>

      <Stack spacing={2}>
        <Stack spacing={1} direction="column">
          <Box sx={{ backgroundColor: showBalance ? 'red' : 'green' }}>Estimated Balance: {balance?.amount} {balance?.currency}</Box>

          <IconButton onClick={toggleBalanceVisibility}>
            <VisibilityIcon />
          </IconButton>
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
      </Stack>
    </Paper>
  );
};