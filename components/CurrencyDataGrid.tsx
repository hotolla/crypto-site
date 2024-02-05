"use client"

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { ICurrency, ICurrencyHistory } from './currencies/types';
import { Chat } from '@/components/Chat';
import { columns } from "@/components/columns";
import { fetchCurrency, fetchCurrencyCandles } from '@/api/currencies';
import { Buy } from '@/app/markets/[coin]/Buy';
import { CryptoChart } from '@/app/markets/[coin]/СryptoСhart';

export const CurrencyDataGrid  = (props: { coin: string }) => {
  const [ currency, setCurrency ] = useState<ICurrency | null>(null);
  const [ history, setHistory ] = useState<ICurrencyHistory[] | null>(null);

  const { coin } = useParams();

    useEffect(() => {
      if (!coin) return;

      fetchCurrency(coin as string)
        .then(({ data }: { data: ICurrency }) => {
          setCurrency(data);
        });

      fetchCurrencyCandles(coin as string)
        .then(( data : ICurrencyHistory [] ) => {
          setHistory(data.map(([ date, open, high, low, close ] : any) => ({
            date: new Date(date),
            open,
            high,
            low,
            close,
            volume: 0
          })));
        });
  }, [ coin ]);

  return !currency ? (
    <CircularProgress
      size={36}
      style={{ marginLeft: '50%', marginTop: 12 }}
    />
  ) : (
    <Box 
      sx={{
        width: '50%',
        marginRight: 'auto',
        marginLeft: 'auto',
        // marginTop: 8,
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
        hideFooterPagination
        hideFooter
        rows={[ currency ]}
        columns={columns}
        disableRowSelectionOnClick
        slotProps={{
          baseCheckbox: {
            icon: <StarBorderIcon />,
            checkedIcon: <StarIcon />
          }
        }
      }
      />
      
      {!history ? (
        <CircularProgress
          size={36}
          style={{ marginLeft: '50%', marginTop: 12 }}
        />
      ) : (
        <CryptoChart data={history} />
      )}
      <Buy priceUsd={+currency.priceUsd} symbol={currency.symbol} />
      <Chat />
    </Box>
  );
};
