import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';

class Video extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData = () => {

        if (this.props.trackName.length !==0) {
            const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCgFFm4z6LBNXkbCrdKwuDiyqyd8hTjMX4&maxResults=1&q=" + this.props.trackName + ' ' + this.props.artistName;
            
            fetch(url)
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        data: result.items[0]
                    });
                });
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.trackName !== prevProps.trackName) {
            this.fetchData();
        };
    }

    render() {
        // console.log(this.props.trackName);
        const {artistName} = this.props;
        const {trackName} = this.props;
        const {data} = this.state;
        if (data.length !== 0) {
            var videoId = this.state.data.id.videoId;
            // var title = this.state.data.snippet.title;
        };

        const url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";

        return (
            <React.Fragment>
                <VideoPlayer artistName={artistName} trackName={trackName} videoUrl={url} />
            </React.Fragment>
        )
    }
}

export default Video;