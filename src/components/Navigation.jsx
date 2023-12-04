import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/customers">Asiakkaat</Link>
        </li>
        <li>
          <Link to="/trainings">Harjoitukset</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;