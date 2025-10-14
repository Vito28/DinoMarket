import {
  authenticateUser,
  getCurrentUser,
  registerUser,
  signOutUser,
} from "./userStorage";

export const loadAuthState = () => ({
  currentUser: getCurrentUser(),
});

export const signUpUser = (payload) => registerUser(payload);

export const signInUser = (payload) => authenticateUser(payload);

export const signOutCurrentUser = () => {
  signOutUser();
  return { currentUser: null };
};

