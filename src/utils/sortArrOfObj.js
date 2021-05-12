export const sortArrOfObj = (array, value) => array.sort((a, b) => (a[value] < b[value]) ? 1 : -1);
