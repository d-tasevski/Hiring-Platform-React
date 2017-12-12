import database from '../firebase/firebase';

// * Actions workflow
// ? component calls action generator
// ? action generator returns function
// ? component dispatches function (redux middleware)(redux-thunk?)
// ? redux store changes

export const loadSamples = personSample => ({
  type: 'LOAD_SAMPLES',
  personSample,
});

export const startLoadSamples = (personSample = {}) => (dispatch, getState) => {
  // set defaults and destructure from personData
  const { uid } = getState().auth;
  return database
    .ref(`users/${uid}/candidates`)
    .push(personSample)
    .then((ref) => {
      dispatch(loadSamples({
        id: ref.key,
        ...personSample,
      }), );
    });
};

// Add Candidate
export const addCandidate = person => ({
  type: 'ADD_PERSON',
  person,
});

export const startAddCandidate = (personData = {}) => (dispatch, getState) => {
  // set defaults and destructure from personData
  const {
    firstName = '',
    lastName = '',
    skills = '',
    cvFileName = '',
    cvUri = '',
    notes = '',
    date = 0,
  } = personData;
  const person = {
    firstName,
    lastName,
    skills,
    cvUri,
    cvFileName,
    notes,
    date,
  };
  const { uid } = getState().auth;
  return database
    .ref(`users/${uid}/candidates`)
    .push(person)
    .then((ref) => {
      dispatch(addCandidate({
        id: ref.key,
        ...person,
      }), );
    });
};
// Remove Candidate
export const removeCandidate = ({ id } = {}) => ({
  type: 'REMOVE_PERSON',
  id,
});

export const startRemoveCandidate = ({ id } = {}) => (dispatch, getState) => {
  const { uid } = getState().auth;
  return database
    .ref(`users/${uid}/candidates/${id}`)
    .remove()
    .then(() => {
      dispatch(removeCandidate({ id }));
    });
};

// Edit Candidate
export const editCandidate = (id, updates) => ({
  type: 'EDIT_PERSON',
  id,
  updates,
});

export const startEditCandidate = (id, updates) => (dispatch, getState) => {
  const { uid } = getState().auth;
  return database
    .ref(`users/${uid}/candidates/${id}`)
    .update(updates)
    .then(() => dispatch(editCandidate(id, updates)));
};

// Set Candidates
export const setCandidates = persons => ({
  type: 'SET_PERSONS',
  persons,
});

export const startSetCandidates = () => (dispatch, getState) => {
  const { uid } = getState().auth;
  return database
    .ref(`users/${uid}/candidates`)
    .once('value')
    .then((snapshot) => {
      const persons = [];
      snapshot.forEach((childSnapshot) => {
        persons.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      dispatch(setCandidates(persons));
    });
};
