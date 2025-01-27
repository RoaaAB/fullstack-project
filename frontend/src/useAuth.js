import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Adjust the import path if necessary

/**
 * Custom hook to manage and retrieve the current authenticated user.
 */
export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Set up a listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return currentUser;
}
