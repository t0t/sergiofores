import { Store } from '../modules/Store.js';

// Action Types
export const SET_THEME = 'ui/setTheme';
export const TOGGLE_MENU = 'ui/toggleMenu';
export const SET_LOADING = 'ui/setLoading';
export const SET_ERROR = 'ui/setError';
export const CLEAR_ERROR = 'ui/clearError';

// Action Creators
export const setTheme = Store.createAction(SET_THEME);
export const toggleMenu = Store.createAction(TOGGLE_MENU);
export const setLoading = Store.createAction(SET_LOADING);
export const setError = Store.createAction(SET_ERROR);
export const clearError = Store.createAction(CLEAR_ERROR);

// Initial State
const initialState = {
    theme: 'light',
    menuOpen: false,
    loading: false,
    error: null
};

// Reducer
export const uiReducer = Store.createReducer(initialState, {
    [SET_THEME]: (state, action) => ({
        ...state,
        theme: action.payload
    }),
    [TOGGLE_MENU]: (state) => ({
        ...state,
        menuOpen: !state.menuOpen
    }),
    [SET_LOADING]: (state, action) => ({
        ...state,
        loading: action.payload
    }),
    [SET_ERROR]: (state, action) => ({
        ...state,
        error: action.payload
    }),
    [CLEAR_ERROR]: (state) => ({
        ...state,
        error: null
    })
});

// Selectors
export const selectTheme = state => state.ui.theme;
export const selectMenuOpen = state => state.ui.menuOpen;
export const selectLoading = state => state.ui.loading;
export const selectError = state => state.ui.error;
