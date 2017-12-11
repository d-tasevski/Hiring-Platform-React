export default candidates =>
  candidates
    .map(candidate => candidate.amount)
    .reduce((previous, current) => previous + current, 0);
