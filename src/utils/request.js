export default async function request(url, opt = {}, skipHeader) {
  console.log("calling", request);
  const options = opt;
  if (!skipHeader) {
    options.headers = options.headers || {};
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf("MSIE ");
    if (msie > 0) {
      options.headers.pragma = "no-cache";
      options.headers["cache-control"] = "no-cache";
    }
    options.headers["Content-Type"] = "application/json";
    let sessionUser = sessionStorage.getItem("currentUser");
    console.log("entered", sessionUser);
    if (sessionUser !== "null" && sessionUser !== null) {
      sessionUser = JSON.parse(sessionUser);
      options.headers.currentuser = sessionUser.id;
      options.headers.token = sessionUser.token;
    }
  }

  console.log("till-api");
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.msg || "Network response was not ok");
  }

  return data;
}
