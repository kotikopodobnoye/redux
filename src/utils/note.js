export function createDbNote(data) {
  const { title, body, userId } = data;

  return {
    title,
    body,
    userId,
    createdAt: new Date().toISOString(),
  };
}
