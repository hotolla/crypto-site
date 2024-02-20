import { Account, CurrencyCode } from '@/types';

export const calculateTotalAmount = (accounts: Account[], selectedCurrency: CurrencyCode, data: any) => {
  const total = accounts.reduce((acc, account) => {
    const rateToUSD = data[account.currency];
    const rateFromUSDToSelected = 1 * data[selectedCurrency];
    console.log(rateFromUSDToSelected)
    console.log(acc, account, accounts,  rateFromUSDToSelected)
    // console.log( '230USD', '212EURO', '920ZL')
    const convertAmount = accounts.filter(({ currency }) => {
      const result = []
      if (currency === selectedCurrency) {
        return account.amount * rateToUSD
      }
    });
    // console.log(convertAmount);

    const amountInCurrency = convertAmount[0].amount * rateFromUSDToSelected;
    console.log(amountInCurrency)
    return acc + amountInCurrency;
  }, 0);
  return total;
};