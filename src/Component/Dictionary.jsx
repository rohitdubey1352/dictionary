import { useState } from "react";
import Search from "../assets/Images/icon-search.svg";
import AudioIcon from "../assets/Images/icon-play.svg";
import Window from "../assets/Images/icon-new-window.svg";

const Dictionary = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async (word) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      if (res.title === "No Definitions Found") {
        setErrorMessage(`No definitions found for "${word}"`);
        setData(null);
      } else {
        setData(res);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Error fetching data. Please try again later.");
      setData(null);
    }
  };

  const handleSearch = () => {
    if (query) {
      fetchData(query);
    }
  };

  const playAudio = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <main>
        <div className="dictionary_section">
          <div className="searchBar">
            <input
              type="text"
              id="typeHere"
              placeholder="Search here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <img
              src={Search}
              alt="search"
              id="searchNow"
              onClick={handleSearch}
            />
          </div>
          <div className="result">
            {errorMessage ? (
              <div className="error-message">
                <p className="emoji">😒</p>
                <h2>No Definitions Found!</h2>
                <p>
                  Sorry pal, we couldn't find definitions for the word you were
                  looking for. You can try the search again at later time or
                  head to the web instead.
                </p>
              </div>
            ) : data ? (
              <div>
                <div className="heading">
                  <div className="subHeading">
                    <h2>{data[0].word}</h2>
                    <h3>{data[0].phonetic}</h3>
                  </div>
                  {data[0].phonetics &&
                    data[0].phonetics.length > 0 &&
                    data[0].phonetics[0].audio && (
                      <figure>
                        <img
                          src={AudioIcon}
                          alt="audio"
                          onClick={() => playAudio(data[0].phonetics[0].audio)}
                          style={{ cursor: "pointer" }}
                        />
                      </figure>
                    )}
                </div>
                {data[0].meanings.map((meaning, meaningIndex) => (
                  <div className="partOfSpeech" key={meaningIndex}>
                    <div className="nounHeading">
                      <h2>{meaning.partOfSpeech}</h2>
                      <hr />
                    </div>
                    <h4>Meaning</h4> <br />
                    <div className="meaning">
                      <ul>
                        {meaning.definitions
                          .slice(0, 5)
                          .map((definition, defIndex) => (
                            <li key={defIndex}>{definition.definition}</li>
                          ))}
                      </ul>
                    </div>
                    {meaning.synonyms && meaning.synonyms.length > 0 && (
                      <div className="synonyms">
                        <h4>Synonyms</h4>
                        <p>{meaning.synonyms.join(", ")}</p>
                      </div>
                    )}
                  </div>
                ))}
                <div className="source">
                  <h4>Source</h4>
                  <a href={data[0].sourceUrls[0]}>{data[0].sourceUrls[0]}</a>
                  <a href={data[0].sourceUrls[0]}>
                    <img src={Window} alt="newPage" />
                  </a>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dictionary;
