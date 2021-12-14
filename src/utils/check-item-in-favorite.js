export const checkItemInFavorite = (favorite,roomId) =>
  favorite.some(({ room }) => room.id === roomId);
