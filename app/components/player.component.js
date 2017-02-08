import React from 'react';
import ClassNames from 'classnames';
import Sound from 'react-sound';
class Player extends React.Component{
  render(){
    const PlayPauseClass = ClassNames({
      'fa fa-play' : this.props.playStatus == Sound.status.PLAYING ? false : true,
      'fa fa-pause' : this.props.playStatus == Sound.status.PLAYING ? true : false
    });

    return(
      <div className="player">
        <div className="col-md-2 col-sm-2 col-xs-2">
          <div className="player__backward pull-left">
            <button onClick={this.props.backward}>
              <i className="fa fa-backward"></i>
            </button>
          </div>
        </div>
        <div className="col-md-8 col-sm-8 col-xs-8">
          <div className="player__main pull-center">
            <button onClick={this.props.stop}>
              <i className="fa fa-stop"></i>
            </button>
            <button onClick={this.props.togglePlay} className="playMe">
              <i className={PlayPauseClass}></i>
            </button>
            <button onClick={this.props.random}>
              <i className="fa fa-random"></i>
            </button>
          </div>
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2">
          <div className="player__forward pull-right">
            <button onClick={this.props.forward}>
              <i className="fa fa-forward"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Player
