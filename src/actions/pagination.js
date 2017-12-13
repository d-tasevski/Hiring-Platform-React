import database from '../firebase/firebase';

export const paginateNext = persons => ({
  type: 'PAGINATE_NEXT',
  persons,
});

export const startPaginateNext = () => (dispatch, getState) => {
  const { uid } = getState().auth;
  const { page, limit } = getState().pagination;
  console.log(getState());
  return database
    .ref(`users/${uid}/candidates`)
    .startAt(page * limit)
    .limitToLast(limit)
    .once('value')
    .then((snapshot) => {
      const persons = [];
      snapshot.forEach((childSnapshot) => {
        persons.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      dispatch(paginateNext({
        page: page + 1,
        persons,
      }), );
    });
};

export const paginateBack = persons => ({
  type: 'PAGINATE_BACK',
  persons,
});

export const startPaginateBack = () => {};
