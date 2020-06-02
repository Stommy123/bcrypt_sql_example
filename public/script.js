function getCookies() {
  const cookies = document.cookie;

  return cookies.split(' ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');

    return { ...acc, [key]: value };
  }, {});
}
