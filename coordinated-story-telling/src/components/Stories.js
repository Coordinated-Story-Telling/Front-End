import React from 'react'
import './styles/Stories.css'

import { Link  } from 'react-router-dom'

const Stories = props => {
    console.log(props)
    const { selectedCountry, stories } = props
    const storiesList = selectedCountry === "All Countries" ? stories : stories.filter(story => story.country === selectedCountry)
    return (
        <div className='stories-container'>
            <form className="stories-filter">
                <label>I want to see stories from </label>
                <select 
                onChange={props.filterStoriesByCountry} 
                value={props.selectedCountry}
                placeholder="Select a Country">
                    {props.countries.map(country => <option key={country}>{country}</option>)}
                </select>
            </form>
            <ul className='stories-list'>
                {
                    storiesList.map(story => (
                        <li className='story-preview' key={story.id}>
                            <h3>{story.title}</h3>
                            <p>{story.description}</p>
                            <Link to={`/stories/${story.id}`}>Continue Reading</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Stories