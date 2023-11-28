import React from 'react';
import Particles from "react-particles";

const ParticleBackground = () => {
  const particleParams = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000',
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: 'repulse',
        },
      },
    },
  };

  return <Particles params={particleParams} className='particles' />;
};

export default ParticleBackground;
