import moment from 'moment';

const getVisibleCandidates = (persons, {
  text, sortBy, startDate, endDate
}) =>
  persons
    .filter((person) => {
      const createdAtMoment = moment(person.date);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, 'day')
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, 'day')
        : true;
      const textMatchFN = person.firstName
        .toLowerCase()
        .includes(text.toLowerCase());
      const textMatchLN = person.lastName
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && (textMatchFN || textMatchLN);
    })
    // eslint-disable-next-line array-callback-return
    .sort((a, b) => {
      // from highest to lowest value
      if (sortBy === 'date') {
        return a.date < b.date ? 1 : -1;
      } else if (sortBy === 'name') {
        return a.lastName < b.lastName ? -1 : 1;
      }
    });

export default getVisibleCandidates;
