import { ADD_STUDENT, RESET } from '../constants/actions';

export const student_selected = (payload) => {

    return {
        type: ADD_STUDENT, payload
    }
}

export const reset = () => {

    return {
        type: RESET
    }

}
