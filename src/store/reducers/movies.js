const initialState = {
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
                  "imageMobile": "https://pics.filmaffinity.com/Siete_almas-243841583-large.jpg",
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
    ]
}

const moviesReducer = ( state = initialState, action ) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default moviesReducer;