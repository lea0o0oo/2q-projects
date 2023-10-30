export default {
  api: {
    baseURL: import.meta.env.DEV
      ? "http://localhost:3001"
      : "https://2q-projects-backend.vercel.app",
  },
};
