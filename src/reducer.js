export const initialState = {
    playerName: null,
    playerStats: null,
    status: "Search for Player"
};

export const actionTypes = {
    SET_NAME: "SET_NAME",
    REMOVE_NAME: "REMOVE_NAME",
    SET_STATS: "SET_STATS",
    REMOVE_STATS: "REMOVE_STATS",
    SET_STATUS: "SET_STATUS",
};

const reducer = (state, action) => {

    switch(action.type) {
        case actionTypes.SET_NAME:
            return {
                ...state,
                playerName: action.playerName
            }
        case actionTypes.REMOVE_NAME:
            return {
                ...state,
                playerName: null
            }

        case actionTypes.SET_STATS:
            return {
                ...state,
                playerStats: action.playerStats
            }
        case actionTypes.REMOVE_STATS:
            return {
                ...state,
                playerStats: null
            }
        case actionTypes.SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}

export default reducer;