export const translateDateFormat = (timeStamp) => {
  //2001-02-15T17:00:00.000+00:00
  //            to be
  //February 29, 2000 9:30 a.m."
  let temp = new Date(timeStamp);
  // console.log(new Date(timeStamp));
  var date = temp.getDate();
  var month = temp.getMonth();
  var year = temp.getFullYear();
  const monthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthName[month] + ' ' + date.toString() + ', ' + year.toString();
};

export const translateTimeFormat = (timeStamp) => {
  let temp = new Date(timeStamp);
  // console.log(new Date(timeStamp));
  var hour = temp.getHours();
  var min = temp.getMinutes();
  return hour.toString() + ':' + min.toString();
};
