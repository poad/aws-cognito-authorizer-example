'use client';
import useSession from '../auth/hooks/useSession';
import Fetch from '../fetch/components';
import GraphQLFetch from '../graphql';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import styles from './styles/Home.module.css';

export default function Home(): JSX.Element {
  const session = useSession();

  return (
    <Authenticator>
      {({ signOut }) => (
        <div className={styles.container}>
          <main className={styles.main}>
            <div>
              <button onClick={signOut}>Sign out</button>
            </div>

            <div>
              <div>
                <Fetch label="ID token" token={session?.idToken.token} />
              </div>
            </div>

            <h2>GraphQL</h2>
            <GraphQLFetch />
          </main>

          <footer className={styles.footer}></footer>
        </div>
      )}
    </Authenticator>
  );
}
