import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = (suggestion) => suggestion.name;
const renderSuggestion = (suggestion) => (
    <span>{suggestion.name}</span>
)

class Searchbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        };
        this.setParams = this.setParams.bind(this);
    }

    setParams = (query) => {
        const params = new URLSearchParams();
        params.set('q', query);
        return params.toString();
    }

    onChange = (e, {newValue}) => {
        this.setState({
            value: newValue
        });
    }

    onSuggestionsFetchRequested = ({ value }) => {
        fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${value}&api_key=0a69994bb150786ab25f611187931d88&format=json&limit=10`)
          .then(response => response.json())
          .then(data => this.setState({ suggestions: data.results.artistmatches.artist }))
      }
    
    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
      };

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state.value);
        const url = this.setParams(this.state.value);
        // console.log(this.props);
        this.props.routeProps.push('/results?' + url);
        this.setState({
            value: ''
        });
    }

    render() {
        
        const { value, suggestions } = this.state;
        const inputProps = {
          placeholder: "Search artist",
          value,
          onChange: this.onChange
        };

        return (
            <form onSubmit={this.handleSubmit}>
                <Autosuggest 
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps} 
                />
            </form>
        )
    }
}

export default Searchbar;