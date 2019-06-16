
export default function logger(msg: string): void {
  var logElem = document.querySelector("body");

  var time = new Date();
  var timeStr = time.toLocaleTimeString();
  logElem.innerHTML += timeStr + ": " + msg + "<br/>";
}
