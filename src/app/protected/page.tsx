'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]/route';

const Page = () => {
  const { data } = useSession();
  return (
    <div>
      Page {JSON.stringify(data)} <button onClick={() => signOut()}>signOut</button>
    </div>
  );
};

export default Page;
