import React from 'react';
import Axios from 'axios';
import Sound from 'react-sound';
import Search from '../components/search.component.js';
import Details from '../components/details.component.js';
import Player from '../components/player.component.js';
import Progress from '../components/progress.component.js';
import Footer from '../components/footer.component.js';

class AppContainer extends React.Component {

  constructor(props){
    super(props);

    this.client_id = '24fd74750e5d8312e2b9de4fb38d236f'
    this.state={
      track: {stream_url:'', title:'', artwork_url: ''},
      playStatus : Sound.status.STOPPED,
      elapsed: '00:00',
      total: '00:00',
      position: 0,
      playFromPosition: 0,
      autoCompleteValue: '',
      tracks: []
    }
  }

  handleSelect(value, item){
    this.setState({
      autoCompleteValue: value,
      track: item
    });
  }

  handleChange(event, value){
    this.setState({
      autoCompleteValue: event.target.value
    });

    let _this= this;

    Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`)
      .then(function (response) {
        // Update track state
        _this.setState({tracks: response.data});
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  randomTrack(){
    let _this = this;
    Axios.get(`https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`)
    .then(function(response){
      const trackLength = response.data.tracks.length;
      const randomNumber = Math.floor((Math.random() * trackLength) + 1);

      _this.setState(
        {
          track: response.data.tracks[randomNumber]
        }
      );
    }).catch(function(err){
      console.log(err);
    })
  }

  prepareUrl(url){
    return `${url}?client_id=${this.client_id}`
  }
  formatMilliseconds(milliseconds){
    // Format hours
    var hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;

    // Format minutes
    var minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;

    // Format seconds
    var seconds = Math.floor(milliseconds / 1000);
    milliseconds = Math.floor(milliseconds % 1000);

    // Return as string
    return (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds;
  }
  handleSongPlaying(audio){
    this.setState({
      elapsed : this.formatMilliseconds(audio.position),
      total: this.formatMilliseconds(audio.duration),
      position: audio.position / audio.duration
    })
  }

  handleSongFinished(){
    this.randomTrack();
  }

  togglePlay(){
    if(this.state.playStatus === Sound.status.PLAYING){
      this.setState({playStatus : Sound.status.PAUSED})
    }else{
      this.setState({playStatus: Sound.status.PLAYING})
    }
  }

  stop(){
    this.setState({playStatus: Sound.status.STOPPED});
  }

  forward(){
    this.setState({playFromPosition: this.state.playFromPosition+= 1000*10})
  }

  backward(){
    this.setState({playFromPosition: this.state.playFromPosition-= 1000*10})
  }

  componentDidMount(){
    this.randomTrack();
  }
  xlArtwork(url){
    return url.replace(/large/, 't500x500');
  }
  render(){
    const playmeStyle = {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ), url(${this.xlArtwork(this.state.track.artwork_url)})`
    };

    const bgImage = {
      backgroundSize: 'cover',
      backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ), url(${this.xlArtwork(this.state.track.artwork_url)})`
    }
    return(
      <div className="playMe_music">
        <div className="bgMusic">
          <div className="bgImage__little" style={bgImage}></div>
          <div className="bgImage__big" style={playmeStyle}></div>
        </div>

          <Search
            autoCompleteValue={this.state.autoCompleteValue}
            tracks={this.state.tracks}
            handleSelect={this.handleSelect.bind(this)}
            handleChange={this.handleChange.bind(this)}
          />
        <div className="main__container">
          <Details title={this.state.track.title} />
          <Sound
                url={this.prepareUrl(this.state.track.stream_url)}
                playStatus={this.state.playStatus}
                playFromPosition={this.state.playFromPosition}
                onPlaying={this.handleSongPlaying.bind(this)}
                onFinishedPlaying={this.handleSongFinished.bind(this)}
          />
          <Player
            togglePlay={this.togglePlay.bind(this)}
            stop={this.stop.bind(this)}
            playStatus={this.state.playStatus}
            forward={this.forward.bind(this)}
            backward={this.backward.bind(this)}
            random={this.randomTrack.bind(this)}
          />
          <Progress
            elapsed={this.state.elapsed}
            total={this.state.total}
            position={this.state.position}
          />
        </div>
        <Footer />
      </div>
    )
  }

}

export default AppContainer
