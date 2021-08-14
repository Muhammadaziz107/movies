const selectElement = (selector, parent = document) => parent.querySelector(selector);

const createDOM = element => document.createElement(element);

const normalizeDate = time => {
  const year = new Date(time).getFullYear();
  const month = String(new Date(time).getMonth() + 1).padStart(2, "0");
  const day = String(new Date(time).getDate()).padStart(2, "0");

  return day + "." + month + "." + year;
};
