export class Store {
    constructor(initialState = {}) {
        this._state = initialState;
        this._listeners = new Map();
        this._reducers = new Map();
        this._middlewares = [];
    }

    // Get current state
    getState() {
        return { ...this._state };
    }

    // Add reducer for a specific slice of state
    addReducer(slice, reducer) {
        this._reducers.set(slice, reducer);
        // Initialize state slice if not exists
        if (!(slice in this._state)) {
            this._state[slice] = reducer(undefined, { type: '@@INIT' });
        }
    }

    // Add middleware
    addMiddleware(middleware) {
        this._middlewares.push(middleware);
    }

    // Subscribe to state changes
    subscribe(slice, callback) {
        if (!this._listeners.has(slice)) {
            this._listeners.set(slice, new Set());
        }
        this._listeners.get(slice).add(callback);

        // Return unsubscribe function
        return () => {
            const listeners = this._listeners.get(slice);
            if (listeners) {
                listeners.delete(callback);
                if (listeners.size === 0) {
                    this._listeners.delete(slice);
                }
            }
        };
    }

    // Dispatch an action
    dispatch(action) {
        // Run action through middleware chain
        let finalAction = this._middlewares.reduce(
            (acc, middleware) => middleware(this)(acc),
            action
        );

        // Find affected state slices and their reducers
        let hasChanged = false;
        const newState = { ...this._state };

        this._reducers.forEach((reducer, slice) => {
            const previousStateForSlice = this._state[slice];
            const nextStateForSlice = reducer(previousStateForSlice, finalAction);

            if (previousStateForSlice !== nextStateForSlice) {
                hasChanged = true;
                newState[slice] = nextStateForSlice;
                
                // Notify listeners for this slice
                const listeners = this._listeners.get(slice);
                if (listeners) {
                    listeners.forEach(listener => listener(nextStateForSlice, previousStateForSlice));
                }
            }
        });

        if (hasChanged) {
            this._state = newState;
        }

        return finalAction;
    }

    // Create an action creator
    static createAction(type) {
        const actionCreator = (payload) => ({
            type,
            payload
        });
        actionCreator.toString = () => type;
        return actionCreator;
    }

    // Create a reducer
    static createReducer(initialState, handlers) {
        return (state = initialState, action) => {
            if (handlers.hasOwnProperty(action.type)) {
                return handlers[action.type](state, action);
            }
            return state;
        };
    }

    // Combine multiple reducers
    static combineReducers(reducers) {
        return (state = {}, action) => {
            const nextState = {};
            let hasChanged = false;

            Object.entries(reducers).forEach(([key, reducer]) => {
                const previousStateForKey = state[key];
                const nextStateForKey = reducer(previousStateForKey, action);

                nextState[key] = nextStateForKey;
                hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
            });

            return hasChanged ? nextState : state;
        };
    }

    // Create async action
    static createAsyncAction(type, asyncFn) {
        const actions = {
            request: Store.createAction(`${type}_REQUEST`),
            success: Store.createAction(`${type}_SUCCESS`),
            failure: Store.createAction(`${type}_FAILURE`)
        };

        return (...args) => async (dispatch) => {
            dispatch(actions.request());

            try {
                const result = await asyncFn(...args);
                dispatch(actions.success(result));
                return result;
            } catch (error) {
                dispatch(actions.failure(error));
                throw error;
            }
        };
    }

    // Helper to create a selector
    static createSelector(...args) {
        const selectors = args.slice(0, -1);
        const combiner = args[args.length - 1];
        let lastResults = null;
        let lastValue = null;

        return (state) => {
            const currentResults = selectors.map(selector => selector(state));
            
            if (lastResults && currentResults.every((result, index) => result === lastResults[index])) {
                return lastValue;
            }

            lastResults = currentResults;
            lastValue = combiner(...currentResults);
            return lastValue;
        };
    }
}
