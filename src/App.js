import React, {useEffect, useState} from 'react';

import classes from './App.module.css';

import './App.css';

var episodes = null;


function App() {
  const [inputEpisode, setInputEpisode] = useState('');
  const [listEpisodes, setListEpisodes] = useState([]);
  const [selectEpisode, setSelectEpisode] = useState({});


  useEffect(()=>{
    async function fetchData() {
      const response = await fetch('https://rickandmortyapi.com/api/episode');
      const data = await response.json();
      const episodeData = data.results;
      episodes = [...episodeData];

      setListEpisodes(episodeData);
    }

    fetchData();

  },[]);

  const inputHanlder = (e) => {
    setInputEpisode(e.target.value);
    let selectedEpisode = e.target.value;
    
    if( !(selectedEpisode.match(/^ *$/))) {
      const selectedEpisodes = episodes.filter((item)=>{
        return item.name.trim().toLowerCase().includes(selectedEpisode.toLowerCase())}
        );
      setListEpisodes(selectedEpisodes);
    } else {
      setListEpisodes(episodes);
    } 

    setSelectEpisode({});
  };

  const selectEpisodeHandler = (epi) => {
    setSelectEpisode(epi);
  }

  return (
    <div className={classes.container}>
      <div className={classes.showContainer}>
        <div className={classes.mainPicture}>picture</div>
        <div className={classes.title}>{selectEpisode.name}</div>
      </div>
      <div  className={classes.inputStyle}>
        <input type='text' value={inputEpisode} placeholder='search episode' onChange={inputHanlder}/>
      </div>
      <div className={classes.listContainer}>
        {
          listEpisodes.map((episode)=>{ return (
            <div 
              key={episode.id} 
              className={`${episode.id === selectEpisode.id? `${classes.redBorder} ${classes.episodeContainer}` :classes.episodeContainer} `} 
              onClick={()=>selectEpisodeHandler(episode)}
            >
              <div className={classes.picture}>picture</div>
              <div className={classes.name}>{episode.name}</div>
            </div>
          )})
        }
      </div>
    </div>
  );
}

export default App;
