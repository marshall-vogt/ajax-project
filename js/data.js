/* exported data */

let data = {
  disc: [],
  bag: []
};

// Add event listener to window object

window.addEventListener('beforeunload', handleUnload);

function handleUnload(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('disc-storage', dataJSON);
}

// Add conditional statement to parse previous data entries

const previousDataJSON = localStorage.getItem('disc-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
