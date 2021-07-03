// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require("electron");
console.log("Inside renderer JS file");

let showModal = document.getElementById("show-modal"),
closeModal = document.getElementById("close-modal"),
modal = document.getElementById("modal"),
addItem = document.getElementById("add-item"),
itemUrl = document.getElementById("url");

//communication with main process
ipcRenderer.on("new-item-success", (e, ack) => {
console.log(`Respone from main : ${ack}`);
  //enable add link btn on success ack
  toggleAddItemBtn();

  //clear values
  modal.style.display = 'none'
  itemUrl.value = ""
});

//show modal
showModal.addEventListener("click", (ev) => {
  modal.style.display = "flex";
  itemUrl.focus();
});

//close modal
closeModal.addEventListener("click", (ev) => {
  modal.style.display = "none";
});

//add new link
addItem.addEventListener("click", (ev) => {
  if (itemUrl.value) {
    ipcRenderer.send("new-item", itemUrl.value);
    //disable add btn
    toggleAddItemBtn()
  }

});

//handle return/enter key
itemUrl.addEventListener("keyup", (ev) => {
  if (ev.key === "Enter") {
    console.log("user pressed ENTER key");
    addItem.click();
  }
});

toggleAddItemBtn = () => {
  if (addItem.disabled === true) {
    addItem.disabled = false;
    addItem.style.opacity = 1;
    addItem.style.innerText = 'Add Link';
    closeModal.style.display='inline'
  } else {
    addItem.disabled = true;
    addItem.style.opacity = .5;
    addItem.style.innerText = "Adding...";
    closeModal.style.display = "none";
  }
}