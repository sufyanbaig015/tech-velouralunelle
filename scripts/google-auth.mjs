// One-time setup: connects your Google Calendar to the booking system and prints a refresh token.
// Needs GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (OAuth client of type "Desktop app") in .env.local.
// Run: npm run google:auth

import { randomBytes } from "node:crypto";
import { createServer } from "node:http";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  console.error("Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env.local first (see README).");
  process.exit(1);
}

const scopes = [
  "https://www.googleapis.com/auth/calendar.events", // create, move and cancel booking events
  "https://www.googleapis.com/auth/calendar.freebusy", // see busy times (not event details)
];
const state = randomBytes(16).toString("hex");
let redirectUri = "";

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", redirectUri);
  const code = url.searchParams.get("code");
  if (!code || url.searchParams.get("state") !== state) {
    response.writeHead(400).end(`Google sign-in failed: ${url.searchParams.get("error") ?? "missing code"}`);
    return;
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  const tokens = await tokenResponse.json();

  if (!tokens.refresh_token) {
    response.writeHead(500).end("No refresh token received. Check the terminal.");
    console.error("\nGoogle did not return a refresh token:", tokens);
    console.error("Remove this app at https://myaccount.google.com/permissions and run the command again.");
  } else {
    response.writeHead(200, { "Content-Type": "text/plain" }).end("Connected! You can close this tab.");
    console.log("\nConnected. Add this to .env.local and to Vercel (Settings → Environment Variables):\n");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
  }
  server.close();
});

server.listen(0, "127.0.0.1", () => {
  redirectUri = `http://127.0.0.1:${server.address().port}`;
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes.join(" "),
    access_type: "offline",
    prompt: "consent",
    state,
  }).toString();
  console.log("Open this link and sign in with the Google account whose calendar should take bookings:\n");
  console.log(authUrl.toString());
});
