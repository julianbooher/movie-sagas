import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, call } from "redux-saga/effects";
import axios from 'axios';


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery("ADD_MOVIE", addMovieSaga)
    yield takeEvery("UPDATE_MOVIE", updateMovieSaga)
    yield takeEvery("FETCH_GENRES", fetchGenresSaga)
    yield takeEvery("FETCH_MOVIES", fetchMoviesSaga)
    yield takeEvery("FETCH_DETAILS", fetchDetailsSaga)
    yield takeEvery("FETCH_DETAILS_GENRES", fetchDetailsGenresSaga)
}

// PUT route for updating a movie.
function* updateMovieSaga(action){
    try {
        yield axios.put('/api/movie', action.payload)
    } catch (error) {
        console.log('Error in updateMovieSaga')
    }
}

// POST route for adding a movie to the database, sends it to the router.
function* addMovieSaga(action){
    try{
        yield axios.post('/api/movie/', action.payload) 
    } catch (error) {
        console.log('Error in addMovieSaga', error);
    }
}

// GET route to get all of the genres in the DB, sends them to redux store.
function* fetchGenresSaga(){
    try{
        const response = yield axios.get('/api/genre');
        yield put({ type: 'SET_GENRES', payload: response.data})
    } catch (error) {
        console.log('Error in fetchGenresSaga', error);
    }
}

// GET route to get all of the genres for a particular movie, then stores it in redux.
function* fetchDetailsGenresSaga(action){
    try{
        const response = yield axios.get(`/api/movie/genres/${action.payload}`)
        yield put({type: 'SET_DETAILS_GENRES', payload: response.data})
    } catch (error){
        console.log('Error in fetchDetailsGenresSaga', error)
    }
}

// GET route to get all of the details for a particular movie, stores it in redux.
function* fetchDetailsSaga(action){
    try {
        const response = yield axios.get(`/api/movie/${action.payload}`)
        yield put ({type: 'SET_DETAILS', payload: response.data})
    } catch (error){
        console.log('Error in fetchDetailsSaga', error);
    }
}

// GET route to get an array of every movie in the DB.
function* fetchMoviesSaga(){
    try {
        const response = yield axios.get('/api/movie');
        yield put({ type: 'SET_MOVIES', payload: response.data })
    } catch(error) {
        console.log('Error in fetchMoviesSaga', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movie details for the selected movie.
const details = (state = {
    id: null,
    title: '',
    poster: '',
    description: '',
    genres: [{
        name: '',
        id: null
    }]
}, action) => {
    switch(action.type) {
        case 'SET_DETAILS':
            return {...state, ...action.payload[0]}
        case 'SET_DETAILS_GENRES':
            return {...state, genres: action.payload}
        default: 
            return state;
    }
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
