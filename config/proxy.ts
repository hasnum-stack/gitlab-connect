function getProxy() {
  const target = process.env.PUBLIC_SERVICE_TARGET;
  if (target) {
    return {
      '/api': {
        target,
        changeOrigin: true,
      },
    };
  }
}
const proxy = getProxy();
export { proxy };
