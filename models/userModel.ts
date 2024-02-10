import passport, { Profile } from "passport";

const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
];

const userModel = {

  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },

  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

  findOrCreate: (profile: any): Express.User => {
    const user = database.find((user) => user.id === profile.id);
    if (!user) {
      const newUser = {
        id: profile.id,
        name: profile.username,
        email: profile.email,
        password: profile.password,
      };
      database.push(newUser);
      return newUser;
    }
    return user;
  },

}
export { database, userModel };
