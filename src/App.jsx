import React, { useState, useEffect } from 'react';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import logo from './assets/images/logo2.png'
import NewsCards from './components/NewsCards/NewsCards';
import { Card, CardTitle, CardText, CardBody } from 'reactstrap';


function App() {
  let [ALAN, setAlan] = useState(null);
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    ALAN = alanBtn({
      key: process.env.REACT_APP_STRING_2,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
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

  return (
    <div className="App">
      <div className="header">
        <div style={{ textAlign: 'center' }}>
          <img className="logo" src={logo} alt="logo" />
        </div>
      </div>

      <div className="main" style={{ marginTop: '100px' }}>

        <Card onClick={() => { getArticles() }} className="box hvr-grow-shadow">
          <CardBody>
            <CardTitle className="ctitle">
              Latest News
            </CardTitle>
            <CardText>Try Saying Get Latest News <br /> <br />
            Stop speech by pressing the Audio button
            </CardText>
          </CardBody>
        </Card>
        <Card onClick={() => { getArticles() }} className="box hvr-grow-shadow">
          <CardBody>
            <CardTitle className="ctitle">
              News by Categories
            </CardTitle>
            <CardText>Business, Entertainment, General, Health, Science, Sports, Technology <br /><br />
            Try saying:
Give me the latest Technology news</CardText>
          </CardBody>
        </Card>
        <Card onClick={() => { getArticles() }} className="box hvr-grow-shadow">
          <CardBody>
            <CardTitle className="ctitle">
              News by Terms
            </CardTitle>
            <CardText>Donald Trump, BitCoin, PlayStation 5, Smartphones... <br /><br />
            Try saying:
What's up with PlayStation 5</CardText>
          </CardBody>
        </Card>
        <Card onClick={() => { getArticles() }} className="box hvr-grow-shadow">
          <CardBody>
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
      </div>
      <div className="me">
        <label onClick={() => { window.open('https://about.me/shubhamlatiyan', '_blank') }}>Created By: Shubham Latiyan</label>
      </div>
    </div >
  );
}

export default App;
