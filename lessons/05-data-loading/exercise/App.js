import React, { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'app/utils';
import LoggedIn from 'app/LoggedIn';
import LoggedOut from 'app/LoggedOut';

const useAuth = () => {
  const [auth, setAuth] = useState(null);
  const [authAttempted, setAuthAttempted] = useState(false);

  useEffect(() => {
    const cleanup = onAuthStateChanged(a => {
      setAuthAttempted(true);
      setAuth(a);
    });

    return cleanup;
  }, []);

  return { auth, authAttempted };
};

export default function App() {
  /* const [auth, setAuth] = useState(null);
  const [authAttempted, setAuthAttempted] = useState(false);

  useEffect(() => {
    const cleanup = onAuthStateChanged(a => {
      setAuthAttempted(true);
      setAuth(a);
    });

    return cleanup;
  }, []); */

  const { auth, authAttempted } = useAuth();
  // The warning on logout is due to a bug in onAuthStateChanged.

  if (!authAttempted) {
    return <p>Authenticating...</p>;
  }

  return (
    <div className="Layout">
      {auth ? <LoggedIn auth={auth} /> : <LoggedOut />}
    </div>
  );
}
