import React, { Component } from 'react';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import Duration from './Duration';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt, faPause, faPlay, faStop, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

import styles from './VideoPlayer.module.css';

class VideoPlayer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pip: false,
            playing: true,
            stop: true,
            controls: false,
            volume: 0.7,
            muted: false,
            loop: false,
            played: 0,
            duration: 0
        };
    }

    playPause = () => {
        this.setState({
            playing: !this.state.playing
        });
    }

    stop = () => {
        this.setState({
            playing: false,
            stop: true,
            played: 0,
            duration: 0
        });
    }

    toggleLoop = () => {
        this.setState({
            loop: !this.state.loop
        });
    }

    setVolume = e => {
        this.setState({ 
            volume: parseFloat(e.target.value) 
        });
    }
      
    toggleMuted = () => {
        this.setState({ 
            muted: !this.state.muted 
        });
    }

    onReady = () => {
        this.setState({
            playing: true,
            stop: false
        });
    }

    onPlay = () => {
        this.setState({
            playing: true
        });
    }

    onPause = () => {
        this.setState({
            playing: false
        });
    }

    onProgress = state => {
        if (!this.state.seeking) {
            this.setState(state);
        };
    }

    onEnded = () => {
        this.setState({
             playing: this.state.loop 
        });
    }

    onDuration = (duration) => {
        console.log('onDuration', duration);
        this.setState({
            duration: duration
        });
    }

    onSeekMouseDown = e => {
        this.setState({
             seeking: true 
        });
    }

    onSeekChange = e => {
        this.setState({ 
            played: parseFloat(e.target.value) 
        });
    }

    onSeekMouseUp = e => {
        this.setState({ 
            seeking: false 
        });
        this.player.seekTo(parseFloat(e.target.value));
    }

    ref = player => {
        this.player = player;
    }

    componentDidUpdate(prevProps) {

        // if (this.props.videoUrl) {
        //     this.setState({
        //         playing: true,
        //         stop: false,
        //         played: 0
        //     });
        // };

        if (this.props.videoUrl !== prevProps.videoUrl) {
            this.setState({
                playing: true,
                stop: false,
                played: 0
            });
        };

        if (this.props.artistName !== prevProps.artistName) {
            this.setState({
                playing: false,
                stop: true,
                played: 0
            });
        };
    }

    render() {
        const { playing, stop, volume, muted, loop, played, duration } = this.state;
        
        if (!stop) {
            var {videoUrl, trackName} = this.props;
        }

        const togglePlayer = stop ? '' : styles['toggle-player'];
        const toggleLoop = loop ? styles['loop-toggled'] : styles['loop-button'];
        const toggleMute = muted ? styles['mute-toggled'] : ''

        return (
            <section className={[styles['controls-container'], togglePlayer].join(' ') }>
                <YoutubePlayer 
                    className='react-player'
                    ref={this.ref}
                    width='0'
                    height='0'
                    url={videoUrl}
                    playing={playing}
                    loop={loop}
                    volume={volume}
                    muted={muted}onReady={() => console.log('onReady')}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onSeek={e => console.log('onSeek', e)}
                    onProgress={this.onProgress}
                    onEnded={this.onEnded}
                    onDuration={this.onDuration}
                    onError={e => console.log('onError', e)}
                />

                {/* <div className={styles['center-container']}> */}
                    <div className={styles['inline-container']}>

                        <div className={styles['text-container']}>
                            <h3 className={styles['artist-name']}>{this.props.artistName}</h3>
                            <p className={styles['track-name']}>{trackName}</p>
                        </div>

                        <div className={styles['button-container']}>
                            <FontAwesomeIcon icon={muted ? faVolumeMute : faVolumeUp} onClick={this.toggleMuted} className={[styles.button, toggleMute].join(' ')}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={playing ? faPause : faPlay} onClick={this.playPause} className={[styles.button, styles['play-pause']].join(' ')}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faStop} onClick={this.stop} className={[styles.button, styles['stop-button']].join(' ')}></FontAwesomeIcon>
                        </div>
                            
                            {/* <input 
                                type='range' min={0} max={1} step='any' value={volume} 
                                onChange={this.setVolume}
                                className={styles['volume-bar']}
                            /> */}

                        <div className={styles['seek-container']}>
                            <FontAwesomeIcon icon={faRedoAlt} onClick={this.toggleLoop} className={[styles.button, toggleLoop].join(' ')}></FontAwesomeIcon>
                            <p><Duration className={styles.duration} seconds={duration * played} /></p>
                            <input 
                                type='range' min={0} max={1} 
                                step='any' value={played}
                                onMouseDown={this.onSeekMouseDown}
                                onChange={this.onSeekChange}
                                onMouseUp={this.onSeekMouseUp}
                                className={styles['seek-bar']}
                            />
                            <p><Duration className={styles.duration} seconds={duration} /></p>
                        </div>
                    </div>
                {/* </div> */}
            </section>
        )
    }
}

export default VideoPlayer;