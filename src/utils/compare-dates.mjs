export const compareDates = (a, b) => {
  const dateA = a.split('.').map(Number);
  const dateB = b.split('.').map(Number);

  if (dateA[2] !== dateB[2]) {
    return dateA[2] - dateB[2];
  } else if (dateA[1] !== dateB[1]) {
    return dateA[1] - dateB[1];
  } else {
    return dateA[0] - dateB[0];
  }
};
