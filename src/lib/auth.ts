import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const logout = () => signOut(auth);

export const onAuthChange = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);

/** Check if the signed-in user has the admin custom claim */
export async function isAdminUser(): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;
  const tokenResult = await user.getIdTokenResult(true);
  return tokenResult.claims['admin'] === true;
}
