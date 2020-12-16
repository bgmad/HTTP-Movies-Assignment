import React from 'react';
import axios from 'axios';

export default class EditMovieForm extends React.Component {
    constructor(props) {
        super();
        const { title, director, metascore, stars, id } = props.movie;
        this.state = {
            newActorInput: '',
            body: {
                title: title,
                director: director,
                metascore: metascore,
                stars: stars,
                id: id
            }
        }
    }

    handleAddActor = e => {
        e.preventDefault();
        this.setState({
            ...this.state,
            body: {
                ...this.state.body,
                stars: [...this.state.body.stars, this.state.newActorInput]
            },
            newActorInput: ''
        })
    }

    handleRemoveActor = e => {
        e.preventDefault();
        this.setState({
            ...this.state,
            body: {
                ...this.state.body,
                stars: this.state.body.stars.filter(star => star !== e.target.id)
            }
        });
    }

    handleBodyChange = e => {
        this.setState({
            ...this.state,
            body: {
                ...this.state.body,
                [e.target.name]: e.target.value
            }
        })
    }

    handleNewActorInput = e => {
        this.setState({
            ...this.state,
            newActorInput: e.target.value
        })
    }
    
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.body)
        axios
            .put(`http://localhost:5000/api/movies/${this.state.body.id}`, this.state.body)
            .then(res => this.props.setMovie(res.data))
            .catch(err => console.error(err));
        this.props.setEdit(false);
        window.location.href = `/movies/${this.state.body.id}`
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="movie-card">
                    <input value={this.state.body.title} onChange={this.handleBodyChange} name='title' type='text'/>
                    <div className="movie-director">
                        <label>Director: </label>
                        <input value={this.state.body.director} onChange={this.handleBodyChange} name='director' type='text'/>
                    </div>
                    <div className="movie-metascore">
                        <label>Metascore: </label>
                        <input value={this.state.body.metascore} onChange={this.handleBodyChange} name='metascore' type='number'/>
                    </div>
                    <h3>Actors</h3>
                    {this.state.body.stars.map((star) => (
                    <div key={star} className="movie-star" id={star} onClick={this.handleRemoveActor}>
                        {star} 
                    </div>
                    ))}
                    <div>
                        <input value={this.state.newActorInput} onChange={this.handleNewActorInput} name='newActorInput' type='text' />
                        <button onClick={this.handleAddActor}>Add Actor</button>
                    </div>
                    <button>Save Changes</button>
                </div>
            </form>
      );
    }
};

