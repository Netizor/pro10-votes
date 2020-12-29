import { ADD_STUDENT, RESET } from '../constants/actions';

const stateInit = {
    students : [
        { id: 0, list: ["Alan", "Juliette"] },
        { id: 1, list: ["Phi", "Bernard"] },
        { id: 2, list: ["Lisa", "Elise"] },
        { id: 3, list: ["Cecilia", "Alice"] },
    ],
    favorites : [],
    count : 0
}

const reducer = (state = stateInit, action = {}) => {

    switch(action.type){

        case ADD_STUDENT:

            const { choice, id } = action.payload;
            let {favorites, count} = state;

            console.log(count)

            if( !favorites.map( (favorite) => { return favorite.student.toLowerCase() } ).includes(choice.toLowerCase()) )
                favorites.push({ id: id, student: choice });

            return {
                ...state,
                favorites : favorites,
                count: count+=1
            };

        case RESET:
            return {
                ...state,
                favorites : [],
                count: 0
            };


        // Si aucun changement de state
        default:
            return state;

    }

}

export default reducer;
