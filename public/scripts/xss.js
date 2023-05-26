// Prevent XSS, function escape() overwrite built-in since it is deprecated
function escape(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}