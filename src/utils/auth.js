function isLoggedIn() {
  return (
    localStorage.getItem("accessToken") !== null &&
    localStorage.getItem("accessToken") !== undefined
  );
}

export { isLoggedIn };
