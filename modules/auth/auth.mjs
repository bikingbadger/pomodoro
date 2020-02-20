let auth0 = null;
const fetchAuthConfig = () => fetch("assets/auth_config.json");

/**
 * Configure the client
 */
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience,
  });
};

/**
 * Update UI based on login status
 */
const updateUI = async () => {
  try {
    const isAuthenticated = await auth0.isAuthenticated();

    // console.log(`Authenticated: ${isAuthenticated}`);
    if (isAuthenticated) {
      document.getElementById("btn-logout").classList.add("block");
      document.getElementById("btn-logout").classList.remove("hidden");
      document.getElementById("btn-login").classList.remove("block");
      document.getElementById("btn-login").classList.add("hidden");

      const accessToken = await auth0.getTokenSilently();
      localStorage.setItem("accessToken", accessToken);
    } else {
      document.getElementById("btn-logout").classList.remove("block");
      document.getElementById("btn-logout").classList.add("hidden");
      document.getElementById("btn-login").classList.add("block");
      document.getElementById("btn-login").classList.remove("hidden");
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * Login function
 */
const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin,
  });
};

/**
 * Logout function
 */
const logout = () => {
  auth0.logout({
    returnTo: window.location.origin,
  });
};

window.onload = async () => {
  await configureClient();

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    // console.log("> User is authenticated");
    window.history.replaceState({}, document.title, window.location.pathname);
    updateUI();
    return;
  }

  // console.log("> User not authenticated");

  const query = window.location.search;
  const shouldParseResult = query.includes("code=") && query.includes("state=");

  if (shouldParseResult) {
    // console.log("> Parsing redirect");
    try {
      const result = await auth0.handleRedirectCallback();

      if (result.appState && result.appState.targetUrl) {
        showContentFromUrl(result.appState.targetUrl);
      }

      // console.log("Logged in!");
    } catch (err) {
      console.log("Error parsing redirect:", err);
    }

    window.history.replaceState({}, document.title, "/");
  }

  updateUI();
};

export { login, logout };
