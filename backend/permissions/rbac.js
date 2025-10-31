// défininition des autorisations en fonction du rôle de chaque utilisateur

export const entityRolePermissions = {
  challenge: {
    admin: {
      create: "yes",
      read: "yes",
      update: "yes",
      delete: "yes",
    },
    user: {
      create: "yes",
      read: "yes",
      update: "self",
      delete: "self",
    },
    anonymous: {
      create: "no",
      read: "yes",
      update: "no",
      delete: "no"
    }
  },
  user: {
    admin: {
      create: "yes",
      read: "yes",
      update: "yes",
      delete: "yes",
    },
    user: {
      create: "no",
      read: "self",
      update: "self",
      delete: "self",
    },
    anonymous: {
      create: "yes",
      read: "no",
      update: "no",
      delete: "no"
    }
  },
  game: {
    admin: {
      create: "yes",
      read: "yes",
      update: "yes",
      delete: "yes",
    },
    user: {
      create: "no",
      read: "yes",
      update: "no",
      delete: "no",
    },
    anonymous: {
      create: "no",
      read: "yes",
      update: "no",
      delete: "no"
    }
  }
};