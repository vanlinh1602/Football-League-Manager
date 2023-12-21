export const BACKEND_URI = 'http://localhost';
export const PORT = 5053;

export const BACKEND =
  process.env.REACT_APP_STAGE === 'development'
    ? `${BACKEND_URI}:${PORT}`
    : 'https://football-backend-u8tj.onrender.com/';
