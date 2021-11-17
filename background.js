function open() {
  let val = window.prompt("SBL key?");
  let url = "https://devportal.internal.unicreditgroup.eu:8443/browse/";
  if (val.startsWith("g")) {
    val = val.substr(1);
    url =
      "https://github.com/buildo/unicredit-cz-with-externals/pulls?q=is%3Apr+";
  }

  let array = Array.from(
    document.body.innerText.matchAll(/SBL-\d+/gm),
    (m) => m[0]
  );
  let filtered = [...new Set(array)].filter((el) => el.includes(val));
  if (filtered.length === 1) {
    window.open(url + filtered[0]);
  } else {
    if (val.includes("SBL")) {
      window.open(url + val);
    } else {
      window.open(url + "SBL-" + val);
    }
  }
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: open,
  });
});
