export function createUser(data) {
  const { username, password, email } = data;

  return {
    email,
    username,
    password,
    createdAt: new Date().toISOString(),
  };
}
