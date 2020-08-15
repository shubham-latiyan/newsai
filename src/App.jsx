import React, { useState, useEffect } from 'react';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import logo from './assets/images/logo.png'
import NewsCards from './components/NewsCards/NewsCards';


function App() {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    alanBtn({
      key: '64370f4c903e66c5b517887fefa45c1b2e956eca572e1d8b807a3e2338fdd0dc/stage',
      // key: 'b8dc89174e3acfc3cdfd2617e21f1b7e2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          // const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          // const article = articles[parsedNumber - 1];

          // if (parsedNumber > 20) {
          //   alanBtn().playText('Please try that again...');
          // } else if (article) {
          //   window.open(article.url, '_blank');
          //   alanBtn().playText('Opening...');
          // } else {
          //   alanBtn().playText('Please try that again...');
          // }
        }
      },
    });
  }, []);

  return (
    <div className="App">
      <div className="header">
        <div style={{ textAlign: 'center' }}>
          <img className="logo" src={logo} alt="logo" />
        </div>
      </div>

      <div style={{ marginTop: '95px' }} >
        <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      </div>
    </div >
  );
}

export default App;
