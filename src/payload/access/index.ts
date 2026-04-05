import type { Access, FieldAccess } from "payload";

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes("admin"));
};

export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user);
};

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.roles?.includes("admin")) return true;
  return { id: { equals: user.id } };
};

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes("admin"));
};
