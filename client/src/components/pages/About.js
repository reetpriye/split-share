import React from 'react';
import profile from '../assets/profile.jpg';

const About = () => {
  return (
    <div>
      <div className='card'>
        <img src={profile} alt='Profile Pic' />
        <h4>Web Developer</h4>
        <h2>Reet Priye</h2>
        <h3>Kolkata, India</h3>
      </div>
      <div className='description'>
        <p>
          What is Lorem Ipsum? <br /> Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
      <div className='label'>
        <h4>VERSION: 1.0.0</h4>
        <h4>
          FORK THIS ON{' '}
          <a href='https://github.com/reetpriye/split-share'>GITHUB</a>
        </h4>
      </div>
    </div>
  );
};

export default About;
