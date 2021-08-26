function openJira() {
  let jiraLink = "https://devportal.internal.unicreditgroup.eu:8443/browse/";
  let val = window.prompt("SBL key?");
  let array = Array.from(
    document.body.innerText.matchAll(/SBL-\d+/gm),
    (m) => jiraLink + m[0]
  );
  let withoutDup = [...new Set(array)];
  let filtered = withoutDup.filter((el) => el.includes(val));
  if (filtered.length === 1) {
    window.open(filtered[0]);
  } else {
    if (val.includes("SBL")) {
      window.open(jiraLink + val);
    } else {
      window.open(jiraLink + "SBL-" + val);
    }
  }
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: openJira,
  });
});
