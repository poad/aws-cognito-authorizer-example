import { fetchAuthSession, AuthSession } from '@aws-amplify/core';
import { useEffect, useState } from 'react';

export interface Session {
  idToken: {
    token: string;
    expiration: number;
  };
  accessToken: {
    token: string;
    expiration: number;
  };
  refreshToken?: string;
}

const useSession = (): Session | undefined => {
  const [session, setSession] = useState<AuthSession>();

  useEffect(() => {
    // oxlint-disable-next-line promise/catch-or-return
    fetchAuthSession()
      // oxlint-disable-next-line promise/always-return
      .then((it) => {
        setSession(it);
        localStorage.setItem('token', it.tokens?.idToken?.toString() ?? '');
      });
  }, []);

  if (session) {
    return {
      idToken: {
        token: session.tokens?.idToken?.toString() ?? '',
        expiration: session.tokens?.idToken?.payload.exp ?? 0,
      },
      accessToken: {
        token: session.tokens?.accessToken?.toString() ?? '',
        expiration: session.tokens?.accessToken?.payload.exp ?? 0,
      },
    };
  }
  return undefined;
};

export default useSession;
