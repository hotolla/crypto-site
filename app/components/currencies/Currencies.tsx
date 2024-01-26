"use client"

import * as React from 'react';
import { useEffect, useContext } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { DataGrid, GridValueFormatterParams } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { changePercent } from '../../helpers/changePercent';
import { CurrenciesContext } from './CurrenciesProvider';

const columns = [
  { field: 'symbol', headerName: 'Symbol', width: 80, cellClassName: 'symbol' },
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'priceUsd', headerName: 'Price USD', width: 140 },
  { 
    field: 'changePercent24Hr',
    headerName: 'Change 24Hr, %',
    width: 120,
    valueFormatter: (params: GridValueFormatterParams) => changePercent (params),
    cellClassName: (params: any) => {
      if (params.value == null) {
        return '';
      }

      return clsx('color', {
        negative: params.value < 0,
        positive: params.value > 0
      });
    }
  },
  { field: 'volumeUsd24Hr', headerName: 'Volume Usd 24Hr', width: 120 },
  { field: 'marketCapUsd', headerName: 'market capital. Usd', width: 120 },
  {
    field: 'Buy',
    headerName: '',
    width: 80,
    renderCell: (currencies: any) => 
    <Link href={`/markets/${currencies.id}`} color="info.main"><Button>More</Button></Link>
  }
];

export const Currencies = () => {
  const { currencies, fetchCurrencies } = useContext(CurrenciesContext);
 
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrencies();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box 
    sx={{
      width: '45%',
      marginRight: 'auto',
      marginLeft: 'auto',
      marginTop: 4,
      marginBottom: 4,
      '& .color.negative': {
        color: 'error.registration'
      },
      '& .color.positive': {
        color: 'success.registration'
      },
      '& .symbol': {
        fontWeight: 'bold'
      }
    }}
    >
      <DataGrid
        checkboxSelection
        rows={currencies}
        columns={columns}
        sx={{ marginTop:8 }}
        disableRowSelectionOnClick
        slotProps={{
          baseCheckbox: {
            icon: <StarBorderIcon />,
            checkedIcon: <StarIcon />
          }
        }}
      />
    </Box>
  );
};
