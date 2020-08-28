import queryString from 'query-string';

export function Login() {
  const CLIENTID     = "60ffd175460c4454a85c361500ace5a3";
  const REDIRECT_URI = "http://localhost:3000/login/"

  const scopes = "user-read-private " +
    "user-read-email " +
    "user-library-modify " +
    "user-library-read " +
    "user-follow-read " +
    "playlist-modify-private " +
    "playlist-read-private ";

  const url = 'https://accounts.spotify.com/authorize?' +
    "client_id=" + CLIENTID +
    "&response_type=token" +
    "&scope="+ encodeURI(scopes) +
    "&redirect_uri=" + encodeURI(REDIRECT_URI);
  
  window.location = url;
}

export function Logout() {
  if (localStorage.getItem("token") !== null)
  {
    localStorage.removeItem("token");
  }
  window.location = "http://localhost:3000/";
}

export function updateToken() {
  const hash = window.location.hash;
  if (hash) {
    localStorage.setItem("token", queryString.parse(window.location.hash).access_token)
  }
}

export function hasToken() {
  return localStorage.getItem("token") !== null && localStorage.getItem("token") !== "";
}

export async function getArtistInfo(id) {
  const token = localStorage.getItem("token");
  const url = `https://api.spotify.com/v1/artists/${id}`;
  console.log(url);
  const ops = {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    method: "GET",
  };

  const response = await fetch(url, ops);
  if (response.ok) {
    const js = await response.json();
    return js;
  }
  return null;
}

export async function getArtistAlbums(id,pagUrl) {
  const token = localStorage.getItem("token");
  let url = `https://api.spotify.com/v1/artists/${id}/albums?include_group=album%2Csingle&limit=20`;
  if (pagUrl !== undefined && pagUrl !== null) {
    url = pagUrl;
  }
  const ops = {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    method: "GET",
  };

  const response = await fetch(url, ops);
  if (response.ok) {
    return await response.json();
  }
  return null;
}

export async function getAlbumSongs(id) {
  const token = localStorage.getItem("token");
  let url = `https://api.spotify.com/v1/albums/${id}/tracks?limit=50`;
  const ops = {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    method: "GET",
  };

  const response = await fetch(url, ops);
  if (response.ok) {
    const js = await response.json();
    return js;
  }
  return null;
}

export async function getSongInfo(id) {
  const token = localStorage.getItem("token");
  const url = `https://api.spotify.com/v1/tracks/${id}`;
  console.log(url);
  const ops = {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    method: "GET",
  };

  const response = await fetch(url, ops);
  if (response.ok) {
    const js = await response.json();
    return js;
  }
  return null;
}

export async function searchSong(txt) {
  const text = encodeURI(txt);
  const token = localStorage.getItem("token");
  const ops = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    },
  }
  const url = `https://api.spotify.com/v1/search?q=${text}&type=track`;
  const response = await fetch(url, ops);
  if (response.ok) {
    const obj = await response.json();
    return obj.tracks;
  }
  return null;
}

export async function searchSongNav(url) {
  const token = localStorage.getItem("token");
  const ops = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    },
  }
  const response = await fetch(url, ops);
  if (response.ok) {
    const obj = await response.json();
    return obj.tracks;
  }
  return null;
}

export async function getUserInfo() {
  const token = localStorage.getItem("token");
  const url = "https://api.spotify.com/v1/me";
  const ops = {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    method: "GET",
  };

  const response = await fetch(url, ops);
  if (response.ok) {
    const ud = await response.json();
    return ud;
  }
  return null;
}

export async function getUserplaylist() {
  const token = localStorage.getItem("token");
  const url = "https://api.spotify.com/v1/me/playlists?limit=20"
  const ops = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    },
  }
  const response = await fetch(url, ops);
  if (response.ok) {
    const obj = await response.json();
    return obj.items;
  }
  return null;
}

export async function getPlaylist(id) {
  const token = localStorage.getItem("token");
  const url = `https://api.spotify.com/v1/playlists/${id}`
  const ops = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    },
  }
  const response = await fetch(url, ops);
  if (response.ok) {
    const obj = await response.json();
    return obj;
  }
  return null;
}

export async function createPlaylist(id, name) {
  const token = localStorage.getItem("token");
  const url = `https://api.spotify.com/v1/users/${id}/playlists`
  const ops = {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    dataType: 'json',
    body: JSON.stringify({
      "name": name,
      "description" : "Empty",
      "public": false,
    }),
  }
  const response = await fetch(url, ops);
  return response.ok;
}

export async function addSongtoPlaylist(playlists, song_uri) {
  console.log(song_uri);
  let res = [];
  const token = localStorage.getItem("token");
  for (let i = 0; i < playlists.length; i++) {
    const playlist_id = playlists[i];
    const ecSong_uri = encodeURI(song_uri);
    const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${ecSong_uri}`;
    const ops = {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
    const response = await fetch(url, ops);
    res.push(response.ok);
  }
  return res;
}

export async function getPlaylistSongs(tracks) {
  const token = localStorage.getItem("token");
  const ops = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    },
  }
  const response = await fetch(tracks, ops);
  if (response.ok) {
    const obj = await response.json();
    return obj;
  }
  return null;
}