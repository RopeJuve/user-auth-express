

export const adminPage = (req, res) => {
  const { user } = req;
  if (!user) {
    return res.redirect("/login");
  }
  return res.render("Admin", { user });
};

export const registerPage = (req, res) => {
  res.render("Register");
};

export const loginPage = (req, res) => {
  res.render("Login");
};
