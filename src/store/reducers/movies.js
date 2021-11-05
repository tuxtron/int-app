import {
    SET_MOVIES,
} from '../actions/movies';

const initialState = {
    movies: [],
    featureMovies: [
        {
            "_id": "6140dd7db50723b434c74198",
            "title": "A title 1",
            "duration": "120",
            "value": "8",
            "description": "A description",
            "minAge": "18+",
            "launch": "2021-09-14T00:00:00.000Z",
            "imageCover": "https://images.alphacoders.com/822/822222.jpg",
            "imageMobile": "",
            "movieUrl": "https://es.vid.web.acsta.net/nmedia/34/19/06/03/14//19562331_hd_013.mp4",
            "director": "A director",
            "producer": "A producer",
            "__v": 0
        },
        {
            "_id": "61420cf6fb9af077be23359c",
            "title": "A title 2",
            "duration": "120",
            "value": "8",
            "description": "A description",
            "minAge": "12+",
            "launch": "2021-09-15T15:10:39.685Z",
            "imageCover": "https://images.alphacoders.com/822/822222.jpg",
            "imageMobile": "https://images.alphacoders.com/822/822222.jpg",
            "movieUrl": "https://es.vid.web.acsta.net/nmedia/34/19/06/03/14//19562331_hd_013.mp4",
            "director": "A director",
            "producer": "A producer",
            "__v": 0
        },
        {
            "_id": "61420cfefb9af077be23359f",
            "title": "A title 3",
            "duration": "120",
            "value": "8",
            "description": "A description",
            "minAge": "10+",
            "launch": "2021-09-15T15:10:48.260Z",
            "imageCover": "https://images.alphacoders.com/822/822222.jpg",
            "imageMobile": "https://images.alphacoders.com/822/822222.jpg",
            "movieUrl": "https://es.vid.web.acsta.net/nmedia/34/19/06/03/14//19562331_hd_013.mp4",
            "director": "A director",
            "producer": "A producer",
            "__v": 0
        },
        {
            "_id": "61420d34fb9af077be2335a6",
            "title": "A title 4",
            "duration": "120",
            "value": "8",
            "description": "A description",
            "minAge": "5+",
            "launch": "2021-09-15T15:11:32.511Z",
            "imageCover": "https://images.alphacoders.com/822/822222.jpg",
            "imageMobile": "https://images.alphacoders.com/822/822222.jpg",
            "movieUrl": "https://es.vid.web.acsta.net/nmedia/34/19/06/03/14//19562331_hd_013.mp4",
            "director": "A director",
            "producer": "A producer",
            "__v": 0
        },
        {
            "_id": "614e670cad170641a41840f4",
            "title": "A title 5",
            "duration": "120",
            "value": "8",
            "description": "A description",
            "minAge": "16+",
            "launch": "1999-07-14T00:00:00.000Z",
            "imageCover": "https://images.alphacoders.com/822/822222.jpg",
            "imageMobile": "https://images.alphacoders.com/822/822222.jpg",
            "movieUrl": "https://es.vid.web.acsta.net/nmedia/34/19/06/03/14//19562331_hd_013.mp4",
            "director": "A director",
            "producer": "A producer",
            "__v": 0
        }
    ],
    categories: [
        {
            "_id": "randomid",
            "name": "Terror",
            "pos": 0,
            "movies": [
              {
                "pos": 0,
                "movie": {
                  "_id": "randomid",
                  "title": "The Conjuring",
                  "duration": "2h",
                  "value": "9/10",
                  "description": "Película de Terror",
                  "minAge": "18",
                  "launch": "09/11/2016 16:16pm (GMT)",
                  "image": "https://images.alphacoders.com/822/822222.jpg",
                  "imageMobile": "https://pelisporlanoche.files.wordpress.com/2013/10/cb1d3-elconjurocaratula.jpg?w=640",
                  "images": [
                    "https://images.alphacoders.com/822/822222.jpg",
                    "https://www.xtrafondos.com/wallpapers/resized/el-conjuro-726.jpg?s=large"
                  ],
                  "movieUrl": "https://es.vid.web.acsta.net/nmedia/34/19/06/03/14//19562331_hd_013.mp4",
                  "characters": [
                    "Ed Warren",
                    "Lorraine Warren"
                  ],
                  "director": "James Wan",
                  "producer": "Tony DeRosa-Grund"
                }
              },
              {
                "pos": 1,
                "movie": {
                  "_id": "randomid",
                  "title": "Insidious",
                  "duration": "3h",
                  "value": "9/10",
                  "description": "Película de terror muy de terror",
                  "minAge": "22",
                  "launch": "09/11/2016 16:16pm (GMT)",
                  "image": "https://images6.alphacoders.com/804/804808.jpg",
                  "imageMobile": "https://vistapointe.net/images/insidious-wallpaper-8.jpg",
                  "images": [
                    "https://images6.alphacoders.com/804/804808.jpg",
                    "https://vistapointe.net/images/insidious-7.jpg"
                  ],
                  "movieUrl": "https://es.vid.web.acsta.net/nmedia/34/19/06/03/14//19562331_hd_013.mp4",
                  "characters": [
                    "Josh Lambert",
                    "Elise Rainier"
                  ],
                  "director": "Director",
                  "producer": "Producer"
                }
              }
            ]
          },
          {
            "_id": "randomid",
            "name": "Drama",
            "pos": 1,
            "movies": [
              {
                "pos": 0,
                "movie": {
                  "_id": "randomid",
                  "title": "Seven Pounds",
                  "duration": "1h30min",
                  "value": "9/10",
                  "description": "Drama",
                  "minAge": "15",
                  "launch": "09/11/2016 16:16pm (GMT)",
                  "image": "https://www.funeralnatural.net/sites/default/files/pelicula/imagen/sietealmascartel.jpg",
                  "imageMobile": "https://i.blogs.es/5c56b8/seven_pounds/450_1000.jpg",
                  "images": [
                    "https://www.funeralnatural.net/sites/default/files/pelicula/imagen/sietealmascartel.jpg",
                    "https://pics.filmaffinity.com/Siete_almas-151960634-large.jpg"
                  ],
                  "movieUrl": "https://es.vid.web.acsta.net/nmedia/34/19/06/03/14//19562331_hd_013.mp4",
                  "characters": [
                    "Ben/Tim Thomas",
                    "Emily Posa"
                  ],
                  "director": "Gabriele Muccino",
                  "producer": "Todd Black"
                }
              },
              {
                "pos": 1,
                "movie": {
                  "_id": "randomid",
                  "title": "Forrest Gump",
                  "duration": "2h10min",
                  "value": "9/10",
                  "description": "Película de drama",
                  "minAge": "16",
                  "launch": "09/11/2016 16:16pm (GMT)",
                  "image": "https://wallpaperaccess.com/full/1455905.jpg",
                  "imageMobile": "https://i.pinimg.com/564x/dc/f1/13/dcf11341e68fa8a58a849636ae500c2c.jpg",
                  "images": [
                    "https://wallpaperaccess.com/full/1455905.jpg",
                    "https://media.gettyimages.com/photos/forrest-gump-1994-directed-by-robert-zemeckis-picture-id932243246?s=612x612"
                  ],
                  "movieUrl": "https://es.vid.web.acsta.net/nmedia/34/19/06/03/14//19562331_hd_013.mp4",
                  "characters": [
                    "Forrest Gump",
                    "Jenny Curran"
                  ],
                  "director": "Robert Zemeckis",
                  "producer": "Wendy Finerman"
                }
              }
            ]
          }
    ],
    allMovies: []
}

const moviesReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case SET_MOVIES: 
            return {
                ...state,
                movies: action.movies,
                allMovies: action.allMovies,
            }
        default:
            return state;
    }
}

export default moviesReducer;