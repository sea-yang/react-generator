export default {
  isProduction: process.env.NODE_ENV === 'production',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  hotPort: process.env.PORT ? (parseInt(process.env.PORT, 10) + 1) : 3001,
};
