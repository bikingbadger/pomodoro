console.log("Auth");

let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");

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

    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;

    // console.log(`Authenticated: ${isAuthenticated}`);
    if (isAuthenticated) {
      document.getElementById("gated-content").classList.remove("hidden");

      document.getElementById(
        "ipt-access-token",
      ).innerHTML = await auth0.getTokenSilently();

      document.getElementById("ipt-user-profile").innerHTML = JSON.stringify(
        await auth0.getUser(),
      );
    } else {
      document.getElementById("gated-content").classList.add("hidden");
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
