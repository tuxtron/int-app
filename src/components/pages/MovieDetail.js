import React from 'react';
import './MovieDetail.css';
import arrowimage from "../../assets/icons/arrowRight.svg"
import { Link } from 'react-router-dom';


function MovieDetail() {

  return (

    <div className="detail-container">
      <Link to="/Home" className="detail-link">
      <div className="detail-button">
        <img src={arrowimage} alt="arrow"/>
        <p className="detail-back-button-text">
          Volver
        </p>
      </div>
      </Link>
      <div className="detail-card">
        <div className="detail-card-left">
          <h2 className="detail-movie-title">
            El señor de los anillos
          </h2>
          <div className="rectangulo">
          </div>
          <div className="tags-rows">
            <span className="detail-tags">
              2001
            </span>
            <span className="detail-tags">
              acción
            </span>
            <span className="detail-tags">
                <span>★ </span>
                <span> 9.5</span>
            </span>
          </div>
          <p className="detail-descriptions">
          El viaje de La Comunidad del Anillo está llegando a su fin. Las fuerzas de Sauron han atacado Minas Tirith, la capital de Gondor, en su asedio definitivo contra la humanidad.
          </p>
        </div>
        <div className="detail-card-rigth">
          <div className="detail-card-rigth-play">
            <Link to='/player' url='/videos/video-1.mp4' className="detail-link">
            <p className="detail-play">
              Reproducir
            </p>
            </Link>
          </div>
        </div>
        
      </div>



        
    </div>
  );
}

export default MovieDetail;
