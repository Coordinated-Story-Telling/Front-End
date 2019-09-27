import Axios from "axios";

export const GET_STORY = 'GET_STORY';
export const POST_STORY = 'POST_STORY';
export const DELETE_STORY = 'DELETE_STORY';
export const PUT_STORY = 'PUT_STORY';
export const FILTER_STORY = 'FILTER_STORY'

// LOCAL DATA

export const getStory = stories  => {
    return {
        type: GET_STORY,
        stories
    }
}

export const addStory = story => {
    return {
        type: POST_STORY,
        story
    }
}

export const deleteStory = index => {
    return {
        type: DELETE_STORY,
        index
    }
}

export const putStory = (index, story) => {
    return {
        type: PUT_STORY,
        index,
        story
    }
}

export const filterStory = country => {
    console.log(country)
    return {
        type: FILTER_STORY,
        selectedCountry: country
    }
}


// LIVE DATA

export const FETCH_STORY_START = 'FETCH_STORY_START';
export const FETCH_STORY_SUCCESS = 'FETCH_STORY_SUCCESS';
export const FETCH_STORY_FAILURE = 'FETCH_STORY_FAILURE';

export const fetchStory = () => dispatch => {
    dispatch({
        type: FETCH_STORY_START
    });
    Axios
    .get('https://ourstory-api.herokuapp.com/api/stories')
    .then(res => {
        dispatch({
            type: FETCH_STORY_SUCCESS,
            payload: res.data
        })
    })
    .catch(error => {
        dispatch({
            type: FETCH_STORY_FAILURE,
            payload: error
        })
    })
}