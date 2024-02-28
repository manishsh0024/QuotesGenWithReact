import React, { useState, useEffect , useCallback } from 'react';
import './Quotes.css'

const QuoteCard = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [quotesData, setQuotesData] = useState([]);

    const getNewQuotes = useCallback(() => {
    const randomNum = Math.floor(Math.random() * 10);
    setQuote(quotesData[randomNum].text);
    setAuthor(quotesData[randomNum].author);
  }, [quotesData]);

  const shared = () => {
    const tweetText = encodeURIComponent(quote);
    const tweetPost = `https://twitter.com/intent/tweet/?text=${tweetText}`;
    window.open(tweetPost);
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      const api = "https://type.fit/api/quotes";
      try {
        const response = await fetch(api);
        const data = await response.json();
        setQuotesData(data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    fetchQuotes();
    
  }, []);

  useEffect(() => {
    if (quotesData.length > 0) {
      getNewQuotes();
    }
  }, [quotesData, getNewQuotes]);

  return (
    <div className="container">
          <div id="card">
      <div id="icons">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: '#10B981', fontSize: '1.5rem' }}
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: '#3B82F6', fontSize: '1.25rem' }}
          id="tweet"
          onClick={shared}
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      </div>
      <p id="quote">{quote}</p>
      <p id="author">{author}</p>
      <button id="btn" onClick={getNewQuotes}>
        New Quotes
      </button>
    </div>
    </div>
  );
};

export default QuoteCard;
