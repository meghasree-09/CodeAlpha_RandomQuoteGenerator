import { useEffect, useState } from "react";
import quotes from "./quotes";
import "./App.css";

function App() {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [copied, setCopied] = useState(false);

  const getRandomQuote = () => {
    let randomIndex = Math.floor(Math.random() * quotes.length);

    // Prevent the same quote from appearing immediately
    if (currentQuote) {
      while (quotes[randomIndex].text === currentQuote.text) {
        randomIndex = Math.floor(Math.random() * quotes.length);
      }
    }

    setCurrentQuote(quotes[randomIndex]);
    setCopied(false);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  const copyQuote = async () => {
    if (!currentQuote) return;

    const quoteText = `"${currentQuote.text}" — ${currentQuote.author}`;

    try {
      await navigator.clipboard.writeText(quoteText);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy quote:", error);
    }
  };

  return (
    <div className="app">
      <div className="background-circle circle-one"></div>
      <div className="background-circle circle-two"></div>

      <main className="quote-container">
        <div className="quote-card">
          <div className="icon">❝</div>

          <h1>Random Quote</h1>

          <p className="subtitle">
            Get inspired with a new quote
          </p>

          {currentQuote && (
            <div className="quote-content">
              <p className="quote-text">
                "{currentQuote.text}"
              </p>

              <p className="quote-author">
                — {currentQuote.author}
              </p>
            </div>
          )}

          <div className="buttons">
            <button
              className="new-quote-btn"
              onClick={getRandomQuote}
            >
              ✨ New Quote
            </button>

            <button
              className="copy-btn"
              onClick={copyQuote}
            >
              📋 {copied ? "Copied!" : "Copy Quote"}
            </button>
          </div>

          <div className="quote-count">
            💡 {quotes.length} inspiring quotes
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;