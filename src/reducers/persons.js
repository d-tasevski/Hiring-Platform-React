// Candidates reducer

const candidateReducerDefaultState = [];

const candidatesReducer = (state = candidateReducerDefaultState, action) => {
  switch (action.type) {
  case 'ADD_PERSON':
    return [...state, action.person];
  case 'REMOVE_PERSON':
    return state.filter(({ id }) => id !== action.id);
  case 'EDIT_PERSON':
    return state.map((person) => {
      if (person.id === action.id) {
        return { ...person, ...action.updates };
      }
      return person;
    });
  case 'SET_PERSONS':
    return action.persons;
  case 'LOAD_SAMPLES':
    return [...state, action.personSample];
  default:
    return state;
  }
};

export default candidatesReducer;
