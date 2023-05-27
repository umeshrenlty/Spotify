const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export const spotifyAuthConfig = {
  issuer: 'https://accounts.spotify.com',
  clientId: '500d178b001d4745959acc58751d0992',
  redirectUrl: 'com.demospotify.auth:/oauth2callback',
  scopes: [
    'playlist-read-private',
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'user-top-read',
    'user-read-recently-played',
    'user-follow-read',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-modify-playback-state',
    'user-read-playback-position',
  ],

  discovery,
};
