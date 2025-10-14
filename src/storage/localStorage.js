const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const safeJSONParse = (value, fallback) => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn("[storage] Failed to parse value, returning fallback instead.", error);
    return fallback;
  }
};

export const readStorage = (key, fallback) => {
  if (!isBrowser) {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);
  return safeJSONParse(rawValue, fallback);
};

export const writeStorage = (key, value) => {
  if (!isBrowser) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("[storage] Failed to persist value.", error);
  }
};

export const removeStorage = (key) => {
  if (!isBrowser) {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error("[storage] Failed to remove value.", error);
  }
};

export const readLegacyBoolean = (key) => {
  const value = readStorage(key, null);

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value === "true";
  }

  return false;
};

