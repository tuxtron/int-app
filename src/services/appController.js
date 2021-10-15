
export const loadMovies = async () => {
    fetch("https://ia-cms.herokuapp.com/api/v1/public/films")
        .then((res) => res.json())
        .then((data) => console.log(data));
}

export const _fetch = async function (url, action, body) {
  
  const options = {
    method: action,
    body: body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin':'no-cors'
    },
  };
  return fetch(url, options);
};



