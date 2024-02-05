import { ChangeEvent, useState } from 'react';
import { Button, Grid, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import { fetchExchangeRates } from '@/api/exchangeRates';

interface IProps {
  priceUsd: number,
  symbol: string
};

enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  PLN = 'PLN',
};

const currencies = [
  {
    value: CurrencyCode.USD,
    label: '$'
  },
  {
    value: CurrencyCode.EUR,
    label: '€'
  },
  {
    value: CurrencyCode.PLN,
    label: 'zł'
  }
];

export const Buy = ({ priceUsd, symbol }: IProps) => {
	const [ currencyAmount, setCurrencyAmount ] = useState(20);
  const [ currency, setCurrency ] = useState(CurrencyCode.USD);
	const [ exchangeRate, setExchangeRate ] = useState(1);
	const [ cryptoAmount, setCryptoAmount ] = useState(currencyAmount / priceUsd);
  const [ estimatedPrice, setEstimatedPrice ] = useState(priceUsd);
  const handleCurrencyAmountChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {

    setCurrencyAmount(+value);
    let buyPrice = priceUsd * exchangeRate;
    setCryptoAmount(+value / buyPrice);
    console.log(value, priceUsd, exchangeRate);
    setEstimatedPrice(priceUsd * exchangeRate);
  };

  const handleCurrencyChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setCurrency(value as CurrencyCode);
    fetchExchangeRates({
      params: {
        currencies: value
      }
    }).then(({ data }) => {
      setExchangeRate(data[value]);
      setCryptoAmount((currencyAmount / data[value]) / priceUsd );
      setEstimatedPrice(priceUsd * data[value]);
    });
  };
  return (
		<>
			<Grid
				noValidate
				container
				spacing={0}
				alignItems="center"
				direction="column"
				component="form"
			>
				<Grid item width={225}>
					<TextField
						margin="dense"
						name="Spend"
						label="Spend"
            onChange={handleCurrencyAmountChange}
            InputProps={{
              endAdornment: (
              <InputAdornment position="start">
                <TextField
                  select
                  defaultValue="USD"
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  onChange={handleCurrencyChange}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </InputAdornment>
              )
            }}
					>
					</TextField>
				</Grid>

				<Grid item >
					<TextField
						margin="dense"
						name="Reseive"
						label="Reseive"
						placeholder="0 - 10000Currency"
            value={cryptoAmount}
					/>
				</Grid>

				<Grid item>
					<Button
						type="submit"
						variant="contained"
						size="large"
					>
						Buy
					</Button>
				</Grid>
		</Grid>

    <Typography textAlign="center" mt={2}>Estimated price: 1 {symbol} ≈ {estimatedPrice}  {currency}</Typography>
	</>
	);
};