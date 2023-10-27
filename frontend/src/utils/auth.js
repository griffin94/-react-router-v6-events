export function getAuthTokenExpiration() {
  const storedExpirationDate = localStorage.getItem(
    "event-app-token-expiration"
  );
  const expierationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expierationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("event-app-token");
  const duration = getAuthTokenExpiration();

  if (token && duration > 0) {
    return token;
  }

  if (token && duration < 0) {
    return "EXPIRED";
  }

  return null;
}
