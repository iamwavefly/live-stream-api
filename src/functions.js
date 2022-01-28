export const titleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })};

export const getInitials = (str) => {
  let initials = "";
  let strArray = str.split(" ");
  strArray.forEach((str) => {
      initials += str[0];
  });
  return initials;
}

export const formatDate = (date) => {
  let dateObj = new Date(date);
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  return day + "/" + month + "/" + year;
}

export const formatTime = (time) => {
  let dateObj = new Date(time);
  let hours = dateObj.getUTCHours() + 1;
  let minutes = dateObj.getUTCMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';

  return hours + ":" + minutes + ampm ;
}