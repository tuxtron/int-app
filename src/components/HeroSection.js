import React, { useState } from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";

const videos = [
  {
    video: "/videos/video-1.mp4",
  },
  {
    video: "/videos/video-2.mp4",
  },
  {
    video: "/videos/video-3.mp4",
  },
  {
    video: "/videos/video-4.mp4",
  },
];

function HeroSection() {
  const [current, setCurrent] = useState(0);
  const length = videos.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(videos) || videos.length <= 0) {
    return null;
  }

  return (
    <div className="hero-container">
      <Row>
      <section className="slider">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        {videos.map((slide, index) => {
          return (
            <>
              {index === current && (
                <video src={slide.video} autoPlay loop muted />
              )}
            </>
          );
        })}
        <Col md={12} lg={12}>
          <h1 className="text-center">LA AVENTURA TE ESPERA</h1>
        </Col>
        <p>¿Qué estás esperando?</p>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            SUSCRIBITE
          </Button>
          <Button
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
            onClick={console.log("hey")}
          >
            VER TRAILER <i className="far fa-play-circle" />
          </Button>
        </div>
      </section>
      </Row>
    </div>
  );
}

export default HeroSection;
