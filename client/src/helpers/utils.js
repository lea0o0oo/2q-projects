let onMobile;

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  onMobile = true;
} else {
  onMobile = false;
}

function readableDate(date) {
  const monthNames = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ];

  const datePlugin = new Date(date);
  let day = datePlugin.getDate();
  let monthIndex = datePlugin.getMonth();
  let year = datePlugin.getFullYear();

  let dateString = `${day} ${monthNames[monthIndex]} ${year}`;
  return dateString;
}

function onLoad(callback) {
  document.addEventListener("DOMContentLoaded", () => {
    callback();
  });
}

function isEmpty(text) {
  if (text == "" || text == null) return true;
  let splittedText = text.split("");
  let isEmpty = true;
  splittedText.forEach((element) => {
    if (isEmpty) {
      if (element != " ") {
        isEmpty = false;
      }
    }
  });

  return isEmpty;
}

function getById(element) {
  return document.getElementById(element);
}

export default { readableDate, onLoad, isEmpty, getById, onMobile };
