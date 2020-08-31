export default {
  BASE_URL: 'http://localhost:8080',
  WEB_URL: process.env.REACT_APP_URI,
  DB_URL:
    process.env.NODE_ENV === 'production'
      ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster007.lfltg.gcp.mongodb.net/basicPos?retryWrites=true&w=majority`
      : 'mongodb://127.0.0.1:27017/basicPos',
  JWT_ACCOUNT_ACTIVATION: process.env.JWT_ACCOUNT_ACTIVATION,
  JWT_RESET_PASSWORD: process.env.JWT_RESET_PASSWORD,
};
