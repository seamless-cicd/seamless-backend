export const deleteConnection = (
  connectionIds: string[],
  connectionId: string,
) => {
  const index = connectionIds.indexOf(connectionId);
  connectionIds.splice(index, 1);
};
