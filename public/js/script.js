document.addEventListener("DOMContentLoaded", () => {
  console.log("filmgalaxy JS imported successfully!");

  function makeActive(evt) {
    const selector = ".nav-link";
    const elems = Array.from(document.querySelectorAll(selector));
    elems.forEach((elem) => {
      console.log("window.location.href>>>", window.location.href);
      console.log("elem.href>>>", elem.href);
      if (window.location.href.endsWith(elem.href)) {
        elem.classList.add("active");
      } else {
        elem.classList.remove("active");
      }
    });
  }
  makeActive();
});
