import React, { createContext, useReducer, useContext } from 'react';

interface State {
    clickedButton: string | null;
}

const initialState: State = {
    clickedButton: 'hand',
};

type Action =
    | { type: 'SET_CLICKED_BUTTON'; payload: string }
    | { type: 'ACTION_TYPE'; payload: any };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_CLICKED_BUTTON':
            return { ...state, clickedButton: action.payload };
        default:
            return state;
    }
};

const StateContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => initialState]);

export const StateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateValue = () => useContext(StateContext);