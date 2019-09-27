import React from 'react'
import { connect } from 'react-redux'
import { getUserStories, postUserStories, deleteUserStories, putUserStories } from '../actions/userStories'
import { NavLink } from 'react-router-dom'
import './styles/MyStory.css'

class MyStory extends React.Component {
    constructor() {
        super()
        this.state = {
            Stories: [],
            storyId: null,
            selectedStory: null,
            selectedCountry: 'Bolivia',
            description: '',
            title: '',
            countries: ["Bolivia", "Brazil", "Cambodia", "Colombia", "Ecuador", "El Salvador", "Ghana", "Guatemala", "Haiti", "Honduras", "Kiribati", "Madagascar", "Mongolia", "Nicaragua", "Paraguay", "Peru", "Philippines", "Sierra Leone", "Zimbabwe"],
        }
    }
    
    componentDidMount() {
        this.props.getUserStories()
    }
    editingStory = event => {
        this.setState({
            [event.target.name]:event.target.value
        })
        console.dir(this.state)
    }

    createStory = event => {
        event.preventDefault()

        this.props.postUserStories({
            title: this.state.title,
            description: this.state.description,
            country: this.state.selectedCountry
        }).then(success => {
            
            if (success) this.setState({
                
                selectedCountry: 'Bolivia',
                description: '',
                title: '',
            })}
        )

    }

    saveStory = event => {
        event.preventDefault()

        if (this.state.storyId) {
            this.props.putUserStories(

                this.state.storyId, {
                    // ...this.state.selectedStory,
                    title: this.state.title,
                    description: this.state.description,
                    country: this.state.selectedCountry
                }
            ).then(success => {
                
                if (success) this.clearForm()
                this.props.getUserStories()
            })
        } else {
            
            this.props.postUserStories({
                title: this.state.title,
                description: this.state.description,
                country: this.state.selectedCountry
            }).then(success => {
                
                if (success) this.clearForm()

            })
        }
    }

    editStory = storyId => {
        // event.preventDefault()
        // console.log(storyId)
        const selectedStory = this.props.myStories.filter(story => story.id === storyId)[0]

        this.setState({
            // selectedStory: selectedStory,
            storyId: storyId,
            selectedCountry: selectedStory.country,
            title: selectedStory.title,
            description: selectedStory.description
        })
        // console.dir(selectedStory)
    }

    clearForm = event => {
        if (event) event.preventDefault()
        this.setState({
            storyId: null,                    
            selectedCountry: 'Bolivia',
            description: '',
            title: '',
        })
    }
    render = props => {
        return (
            <div>
                <form className="story-form">
                    <h5>create & edit your story here</h5>

                    <span>
                        <input 
                            type='text'
                            placeholder='Title'
                            minLength='3' 
                            required
                            value={this.state.title}
                            onChange={this.editingStory}
                            name='title'
                        />           

                        <select 
                            onChange={this.editingStory}
                            value={this.state.selectedCountry}
                            placeholder="Select a Country"
                            name='selectedCountry'
                        >
                            {this.state.countries.map(country => <option key={country}>{country}</option>)}
                        </select>
                    </span>                   


                    <textarea
                        type='text'
                        placeholder='description'
                        minLength='3' 
                        required
                        value={this.state.description}
                        onChange={this.editingStory}
                        name='description'
                    >

                    </textarea>
                    <span>

                        <button onClick={this.saveStory}>Save</button>
                        <button onClick={this.clearForm}>Clear</button>

                    </span>
                </form>
                <ul className='stories-list'>
                {
                    this.props.myStories.map((story, index) => (
                        <li className='story-preview' key={story.id}>
                            <h3>{story.title}</h3>
                            <p>{story.description}</p>
                            <NavLink to={`/stories/${story.id}`}>Continue Reading</NavLink>
                            {/* <NavLink to={`/stories/${story.id}/edit`}> Edit</NavLink> */}
                            <button onClick={() => this.editStory(story.id)}>Edit</button>
                            <button onClick={() => this.props.deleteUserStories(index, story.id)}>Remove</button>
                        </li>
                    ))
                }
                </ul>
            </div>
        )
    }
} 


const mapStatetoProps = state => {
    console.log(state)
    return {
        myStories: state.userStory.myStories,
    }
} 
  
export default connect(mapStatetoProps, { getUserStories, postUserStories, deleteUserStories, putUserStories })(MyStory)