"use client";
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';

export const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <Button
        color="error"
        startIcon={<LoginIcon />}
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    )
  }
  return (
    <Button
      color="inherit"
      startIcon={<LoginIcon />}
      onClick={() => signIn()}
    >
      Sign In
    </Button>
  );
};