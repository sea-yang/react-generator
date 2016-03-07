import { TOOGLE } from '../constants/actionTypes';

const initialState = 0;

export default function test(state = initialState, action) {
  switch (action.type) {
    case TOOGLE:
      return state ^ 1;

    default:
      return state;
  }
}
