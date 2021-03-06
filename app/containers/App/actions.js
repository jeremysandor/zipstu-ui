/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_SESSION,
  LOAD_SESSION_SUCCESS,
  LOAD_GAMES_ON_RENDER,
  LOAD_GAMES,
  LOAD_GAMES_SUCCESS,
  LOAD_GAMES_ERROR,  
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  IS_AUTHENTICATED,
} from './constants';

export function setAuthenticated(authed) {
  console.log('setAuthenticated')
  return {
    type: IS_AUTHENTICATED,
    authed,
  }
}


export function loadSession() {
  console.log('got loadSession');
  return {
    type: LOAD_SESSION,
  }
}

export function sessionLoaded(session) {
  console.log('sessionLoaded', session);
  return {
    type: LOAD_SESSION_SUCCESS,
    session,
  }
}

/**
 * Load the games on render, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_GAMES_ON_RENDER
 */
export function loadGamesOnRender() {
  console.log('got loadGamesOnRender');
  return {
    type: LOAD_GAMES_ON_RENDER,
  };
}



/**
 * Load the games, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_GAMES
 */
export function loadGames() {
  return {
    type: LOAD_GAMES,
  };
}


/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The game data
 *
 * @return {object}      An action object with a type of LOAD_GAMES_SUCCESS passing the games
 */
export function gamesLoaded(games) {
  return {
    type: LOAD_GAMES_SUCCESS,
    games,
  };
}


/**
 * Dispatched when loading the games fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_GAMES_ERROR passing the error
 */
export function gameLoadingError(error) {
  return {
    type: LOAD_GAMES_ERROR,
    error,
  };
}




/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
