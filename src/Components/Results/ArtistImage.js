import React, { Component } from 'react';

class ArtistImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData = () => {
        const url = "http://webservice.fanart.tv/v3/music/" + this.props.mbid + "?api_key=f3886806ad07c1771c54fb8245b3a1f1";
        
        console.log(url);

        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    data: result.artistthumb
                });
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.mbid !== prevProps.mbid) {
            this.fetchData();
        };
    }

    render() {
        const {data} = this.state;
        console.log(data);
        if (data !== undefined && data.length !== 0) {
            var url = data[0].url;
        };
        
        return (
            <img src={url} className={this.props.className}></img>
        )
    }
}

export default ArtistImage;