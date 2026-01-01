import { useEffect, useState } from 'react';
import { fetchAuthSession } from '@aws-amplify/core';
import { AuthSession } from '@aws-amplify/core';

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
    // eslint-disable-next-line promise/catch-or-return
    fetchAuthSession()
      .then((it) => {
        setSession(it);
        // eslint-disable-next-line promise/always-return
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
