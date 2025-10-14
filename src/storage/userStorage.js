import { readStorage, writeStorage } from "./localStorage";

const USER_KEY = "ecom.users";

const defaultUserState = {
  currentUserId: null,
  users: [],
};

const isBrowser = typeof window !== "undefined";

const hashPassword = (password) => {
  if (!isBrowser) {
    return password;
  }

  try {
    return window.btoa(encodeURIComponent(password));
  } catch (error) {
    console.warn("[storage] Failed to encode password, storing raw value.", error);
    return password;
  }
};

const normaliseEmail = (email = "") => email.trim().toLowerCase();

const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

const ensureUserState = () => {
  const state = readStorage(USER_KEY, null);
  if (state) {
    return {
      users: Array.isArray(state.users) ? state.users : [],
      currentUserId: state.currentUserId ?? null,
    };
  }

  writeStorage(USER_KEY, defaultUserState);
  return { ...defaultUserState };
};

const persistUserState = (nextState) => {
  writeStorage(USER_KEY, nextState);
  return nextState;
};

const generateUserId = () => {
  if (isBrowser && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `user-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
};

export const getUsers = () => ensureUserState().users.map(sanitizeUser);

export const getActiveUserId = () => ensureUserState().currentUserId;

export const getCurrentUser = () => {
  const state = ensureUserState();
  const active = state.users.find((user) => user.id === state.currentUserId);
  return sanitizeUser(active);
};

export const registerUser = ({ name, email, password }) => {
  const trimmedName = name.trim();
  const normalisedEmail = normaliseEmail(email);
  const state = ensureUserState();

  if (!trimmedName) {
    throw new Error("Nama tidak boleh kosong.");
  }

  if (!normalisedEmail) {
    throw new Error("Email tidak valid.");
  }

  if (!password || password.length < 6) {
    throw new Error("Password minimal 6 karakter.");
  }

  const emailAlreadyUsed = state.users.some(
    (user) => user.email === normalisedEmail
  );

  if (emailAlreadyUsed) {
    throw new Error("Email sudah terdaftar. Silakan masuk.");
  }

  const newUser = {
    id: generateUserId(),
    name: trimmedName,
    email: normalisedEmail,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  const nextState = {
    currentUserId: newUser.id,
    users: [...state.users, newUser],
  };

  persistUserState(nextState);
  return sanitizeUser(newUser);
};

export const authenticateUser = ({ email, password }) => {
  const normalisedEmail = normaliseEmail(email);
  const state = ensureUserState();
  const existingUser = state.users.find((user) => user.email === normalisedEmail);

  if (!existingUser) {
    throw new Error("Email tidak ditemukan.");
  }

  if (existingUser.passwordHash !== hashPassword(password)) {
    throw new Error("Password yang kamu masukkan salah.");
  }

  persistUserState({
    ...state,
    currentUserId: existingUser.id,
  });

  return sanitizeUser(existingUser);
};

export const signOutUser = () => {
  const state = ensureUserState();
  persistUserState({
    ...state,
    currentUserId: null,
  });
};
