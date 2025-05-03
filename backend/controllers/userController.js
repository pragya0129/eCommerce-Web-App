const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  // Fake registration logic
  res.status(201).json({ message: "User registered", name, email });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  // Fake login logic
  if (email === "test@example.com" && password === "123456") {
    res.json({ message: "Login successful", token: "fake-jwt-token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = { registerUser, loginUser };
