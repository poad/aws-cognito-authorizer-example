import { AuthTokens, fetchAuthSession } from '@aws-amplify/core';
import { AWSCredentials } from '@aws-amplify/core/internals/utils';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [credentials, setCredentials] = useState<AWSCredentials>();
  const [tokens, setTokens] = useState<AuthTokens>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchAuthSession()
      // oxlint-disable-next-line promise/always-return
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
