import { readStorage, writeStorage } from "./localStorage";

const ACCOUNT_KEY = "ecom.accountProfiles";

/**
 * @typedef {Object} Address
 * @property {string} id
 * @property {string} label
 * @property {string} recipientName
 * @property {string} phone
 * @property {string} addressLine
 * @property {string} city
 * @property {string} postalCode
 * @property {boolean} isPrimary
 */

/**
 * @typedef {Object} AccountProfile
 * @property {string} userId
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {Address[]} addresses
 * @property {{promo: boolean, orderStatus: boolean, email: boolean, push: boolean}} notifications
 */

const defaultNotifications = {
  promo: true,
  orderStatus: true,
  email: true,
  push: false,
};

const emptyProfile = (user) => ({
  userId: user?.id ?? "guest",
  name: user?.name ?? "",
  email: user?.email ?? "",
  phone: "",
  addresses: [],
  notifications: defaultNotifications,
});

const readProfiles = () => readStorage(ACCOUNT_KEY, {});

const writeProfiles = (profiles) => writeStorage(ACCOUNT_KEY, profiles);

export const getAccountProfile = (user) => {
  const userId = user?.id;
  if (!userId) {
    return emptyProfile(user);
  }

  const profiles = readProfiles();
  return {
    ...emptyProfile(user),
    ...(profiles[userId] ?? {}),
    userId,
    email: profiles[userId]?.email || user.email || "",
    name: profiles[userId]?.name || user.name || "",
    notifications: {
      ...defaultNotifications,
      ...(profiles[userId]?.notifications ?? {}),
    },
    addresses: Array.isArray(profiles[userId]?.addresses)
      ? profiles[userId].addresses
      : [],
  };
};

export const saveAccountProfile = (user, profile) => {
  if (!user?.id) {
    return emptyProfile(user);
  }

  const profiles = readProfiles();
  const nextProfile = {
    ...getAccountProfile(user),
    ...profile,
    userId: user.id,
  };

  writeProfiles({
    ...profiles,
    [user.id]: nextProfile,
  });

  return nextProfile;
};

export const getPrimaryAddress = (user) => {
  const profile = getAccountProfile(user);
  return profile.addresses.find((address) => address.isPrimary) ?? profile.addresses[0] ?? null;
};

export const upsertAddress = (user, address) => {
  const profile = getAccountProfile(user);
  const addressId = address.id || `addr-${Date.now()}`;
  const nextAddress = {
    id: addressId,
    label: address.label || "Alamat Utama",
    recipientName: address.recipientName || profile.name || user?.name || "",
    phone: address.phone || profile.phone || "",
    addressLine: address.addressLine || "",
    city: address.city || "",
    postalCode: address.postalCode || "",
    isPrimary: address.isPrimary ?? profile.addresses.length === 0,
  };

  const nextAddresses = profile.addresses
    .filter((item) => item.id !== addressId)
    .map((item) => ({
      ...item,
      isPrimary: nextAddress.isPrimary ? false : item.isPrimary,
    }));

  return saveAccountProfile(user, {
    ...profile,
    phone: nextAddress.phone || profile.phone,
    addresses: [...nextAddresses, nextAddress],
  });
};

export const getCheckoutAutofill = (user) => {
  const profile = getAccountProfile(user);
  const address = getPrimaryAddress(user);

  return {
    fullName: address?.recipientName || profile.name || user?.name || "",
    phone: address?.phone || profile.phone || "",
    addressLine: address?.addressLine || "",
    city: address?.city || "",
    postalCode: address?.postalCode || "",
    shippingNote: "",
  };
};
