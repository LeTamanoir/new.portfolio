const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

export { wrap };
