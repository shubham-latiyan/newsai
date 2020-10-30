import React, { useState, useEffect } from 'react';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import logo from './assets/images/logo2.png'
import NewsCards from './components/NewsCards/NewsCards';
import { Card, CardTitle, CardText, CardBody } from 'reactstrap';
import ReactGA from 'react-ga';

function App() {
  let [ALAN, setAlan] = useState(null);
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ALAN = alanBtn({
      key: process.env.REACT_APP_STRING_2,
      onCommand: ({ command, articles, number }) => {
        // console.log('articles:', articles)
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          toggleClass();
          setActiveArticle(-1);
        } else if (command === 'instructions') {
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          console.log('parsedNumber:', parsedNumber)
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    })
    setAlan(ALAN);
  }, []);

  function getArticles() {
    ALAN.activate();
    setTimeout(() => {
      ALAN.callProjectApi("setClientData", { value: "" }, (error, result) => {
        console.log('result:', result)
        console.log('error:', error)
      });
    }, 600);
  }

  function toggleClass() {
    if (window.innerWidth < 756) {
      [...document.querySelectorAll('#cusy_card')].forEach((el => {
        el.classList.remove('hvr-grow-shadow')
      }))
    }
    else {
      [...document.querySelectorAll('#cusy_card')].forEach((el => {
        el.classList.add('hvr-grow-shadow')
      }))
    }
  }

  async function fetchMoreNews() {
    setLoading(true);
    const response = await fetch(`https://newsbe.vercel.app/morenews`, {
      method: 'POST',
      body: JSON.stringify({ publishedAt: newsArticles[newsArticles.length - 1].publishedAt })
    });
    let res = await response.json();
    setLoading(false);
    setNewsArticles([...newsArticles, ...res.data]);
    document.getElementById(`scroll_${newsArticles.length - 1}`).scrollIntoView({
      block: "center", inline: "end"
    });
    toggleClass();
  }

  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark-mode');
    document.querySelectorAll('.inverted').forEach(el => {
      el.classList.toggle('invert');
    })
  }

  return (
    <div className="App">
      <div className="header inverted">
        <div style={{ textAlign: 'center' }}>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <label className="switch" htmlFor="checkbox" style={{ position: 'absolute', top: '24%', right: '0%' }} title="Change color scheme to dark mode">
          <input type="checkbox" onChange={() => { toggleDarkMode() }} id="checkbox" />
          <div className="slider round"></div>
          <div className="toggle-moon">🌙</div>
          <div className="toggle-sun">☀️</div>
        </label>
      </div>

      <div className="main" style={{ marginTop: '100px' }}>

        <Card onClick={() => { getArticles() }} className="box hvr-grow-shadow">
          <CardBody className="inverted">
            <CardTitle className="ctitle">
              Latest News
            </CardTitle>
            <CardText>Try Saying Get Latest News <br /> <br />
            Stop speech by pressing the Audio button
            </CardText>
          </CardBody>
        </Card>
        <Card onClick={() => { getArticles() }} className="box hvr-grow-shadow">
          <CardBody className="inverted">
            <CardTitle className="ctitle">
              News by Categories
            </CardTitle>
            <CardText>Business, Entertainment, General, Health, Science, Sports, Technology <br /><br />
            Try saying:
Give me the latest Technology news</CardText>
          </CardBody>
        </Card>
        <Card onClick={() => { getArticles() }} className="box hvr-grow-shadow">
          <CardBody className="inverted">
            <CardTitle className="ctitle">
              News by Terms
            </CardTitle>
            <CardText>Donald Trump, BitCoin, PlayStation 5, Smartphones... <br /><br />
            Try saying:
What's up with PlayStation 5</CardText>
          </CardBody>
        </Card>
        <Card onClick={() => { getArticles() }} className="box hvr-grow-shadow">
          <CardBody className="inverted">
            <CardTitle className="ctitle">
              News by Sources
            </CardTitle>
            <CardText>ABC News, Wired, BBC, Time, IGN, Buzzfeed, CNN... <br /><br />
            Try saying:
Give me the news from CNN</CardText>
          </CardBody>
        </Card>

      </div>
      <div style={{ marginTop: '50px' }} >
        <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        {newsArticles.length > 25 &&
          <>
            <button onClick={fetchMoreNews} className="hvr-grow-shadow" style={styleObj}>
              Load More &nbsp;
            {loading && <span style={{marginTop: '4px'}} className="spinner-border spinner-border-sm"></span>}
            </button>
            <br />
            <br />
          </>
        }
      </div>
      <div className="me">
        <label onClick={() => { window.open('https://about.me/shubhamlatiyan', '_blank') }}>Created By: Shubham Latiyan</label>
      </div>
    </div >
  );
}

export default App;

let styleObj = {
  display: 'flex',
  margin: 'auto',
  background: 'linear-gradient(to bottom, #68caeb 1%, #00beff 100%)',
  border: '1px solid',
  padding: '4px 10px',
  color: 'white',
  marginBottom: '40px',
  boxShadow: '0 2px 5px 0 rgb(0 0 0 / 42%), 0 2px 10px 0 rgb(0 0 0 / 38%)',
}
