export const login = (email, password) =>
  Parse.User.logIn(email, password)
    .then(() => {
      alert("Successfully logged in!");
    })
    .catch((error) => {
      alert("Error: " + error.code + " " + error.message);
    });

export const register = (user) => {
  let newUser = new Parse.User();
  newUser.set("username", user.username);
  newUser.set("password", user.password);
  newUser.set("email", user.email);

  newUser
    .signUp()
    .then((user) =>
      alert(
        "User created successful with name: " +
          user.get("username") +
          " and email: " +
          user.get("email")
      )
    )
    .catch((error) => alert("Error: " + error.code + " " + error.message));
};

export const logout = async () => {
  await Parse.User.logOut();
  const currentUser = await Parse.User.current();
  if (currentUser === null) {
    alert("Success! No user is logged in anymore!");
  }
};

export const validate = (user) => {
  const requiredFields = ["username", "email", "password"];

  return requiredFields.some((x) => !user[x]);
};
