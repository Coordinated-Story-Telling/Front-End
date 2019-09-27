import React from 'react'
import './styles/Story.css'

export const Story = props => {
    const { match : { params :{ id: index} }, stories } = props;
    return stories.filter(story => story.id.toString() === index).map(story => (
        <div key={story.title} className='story-view'>
            <h3>{story.title}</h3>
            <h4>{story.country}</h4>
            <p>{story.description}</p>
            <p>{`Created on ${new Date(story.created_at)}`}</p>
            <p>{`Updated on ${new Date(story.updated_at)}`}</p>

            <form 
            action="https://www.paypal.com/cgi-bin/webscr" 
            method="post" 
            target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="WGDXBHWLHWZAN" />
                <input type="hidden" name="invoice" value={story.id} />
                <input 
                type="image" 
                src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" 
                border="0" 
                name="submit" 
                title={"Donate to " + story.title} 
                alt="Donate with PayPal button" />
                <img 
                alt="" 
                border="0" 
                src="https://www.paypal.com/en_US/i/scr/pixel.gif" 
                width="1" 
                height="1" />
            </form>
        </div>)
    )
}



export const StoryEditor = props => {
    const { match : { params :{ id: index} }, stories } = props;
    return stories.filter(story => story.id.toString() === index).map(story => (
        <form key={story.title} className='story-view'>
            <input value={story.title}/>
            <select value={story.country} >
                {
                    props.countries.map(country => {
                        // if (country === story.country) return <option selected>{country}</option>
                        return <option>{country}</option>
                    })
                }
            </select>
            <textarea value={story.description}/>
            <p>{`Created on ${new Date(story.created_at)}`}</p>
            <p>{`Updated on ${new Date(story.updated_at)}`}</p>

        </form>)
    )
}
