import React, { useState } from 'react';

import HeroSection from './HeroSection.jsx';
import FilmCatalog from './FilmCatalog.jsx';
import History from './History.jsx';
import About from './About.jsx';
import NowShowing from './NowShowing.jsx';

const App = () => {
  const [page, setPage] = useState('hero');

  if (page === 'hero') {
    return (
      <HeroSection
        onExploreFilms={() => setPage('catalog')}
        onOurHistory={() => setPage('history')}
        onAboutStudio={() => setPage('about')}
      />
    );
  }
  if (page === 'catalog') {
    return <NowShowing onBackHome={() => setPage('hero')} />;
  }
  if (page === 'history') {
    return <History onBackHome={() => setPage('hero')} />;
  }
  return <About onBackHome={() => setPage('hero')} />;
};

export default App;