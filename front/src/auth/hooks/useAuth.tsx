import { useEffect, useState } from 'react';
import { AuthTokens, fetchAuthSession } from '@aws-amplify/core';
import { AWSCredentials } from '@aws-amplify/core/internals/utils';

const useAuth = () => {
  const [credentials, setCredentials] = useState<AWSCredentials>();
  const [tokens, setTokens] = useState<AuthTokens>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchAuthSession()
      // eslint-disable-next-line promise/always-return
      .then((session) => {
        setCredentials(session.credentials);
        setTokens(session.tokens);
        setLoaded(true);
      })
      .catch((error) => setError(error));
  }, []);

  return {
    credentials,
    tokens,
    loaded,
    error,
  };
};

export default useAuth;
