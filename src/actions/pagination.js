import database from '../firebase/firebase';

export const paginateNext = (page, persons) => ({
  type: 'PAGINATE_NEXT',
  page,
  persons,
});

export const startPaginateNext = () => (dispatch, getState) => {
  const { uid } = getState().auth;
  let { page, limit } = getState().pagination;
  console.log(limit, page);
  return database
    .ref(`users/${uid}/candidates`)
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
      const last = persons[persons.length - 1].id;
      page += 1;
      console.log(persons);
      console.log(last);
      dispatch(paginateNext({
        page,
        persons,
      }), );
    });
};

export const paginateBack = persons => ({
  type: 'PAGINATE_BACK',
  persons,
});

export const startPaginateBack = () => {};

{
  //  // Firebase example
  // const first = database
  //   .collection('cities')
  //   .orderBy('population')
  //   .limit(25);
  // return first.get().then((documentSnapshots) => {
  //   // Get the last visible document
  //   const lastVisible =
  //     documentSnapshots.docs[documentSnapshots.docs.length - 1];
  //   console.log('last', lastVisible);
  //   // Construct a new query starting at this document,
  //   // get the next 25 cities.
  //   const next = database
  //     .collection('cities')
  //     .orderBy('population')
  //     .startAfter(lastVisible)
  //     .limit(25);
  // });
}
