// Get User Input Value
let userTitle = document.getElementById("user-title");
let userDesc = document.getElementById("user-desc");
let userCategory = document.getElementById("user-category");
let addNote = document.getElementById("add-note");

// Get User Input Box
let createNoteBox = document.getElementById("create-note-box");
createNoteBox.classList.add("create-note-box-hide");

// Get Notes Box
let notesList = document.getElementById("notes-list");

// Close Buttons
let closeModalBtn = document.getElementById("close-modal-btn");
let clearAllBtn = document.getElementById("clear-all-btn");

// Create Note
const createNote = () => {
  createNoteBox.classList.add("create-note-box-show");
  createNoteBox.classList.remove("create-note-box-hide");
};

// Close Note Modal Closer
closeModalBtn.addEventListener("click", () => {
  createNoteBox.classList.add("create-note-box-hide");
  createNoteBox.classList.remove("create-note-box-show");
  // Clean inputs on exit window
  userTitle.value = "";
  userDesc.value = "";
});

// Local Storage
const saveToLocalStorage = () => {
  localStorage.setItem("all-notes", notesList.innerHTML);
};

// Clear All Action Hook with Clean Native Messaging
clearAllBtn.addEventListener("click", () => {
  if (notesList.children.length === 0) {
    alert("Your dashboard is already empty. There are no notes to clear.");
  } else if (
    confirm("Are you sure you want to permanently delete all saved notes from this device? This action cannot be undone.")
  ) {
    notesList.innerHTML = "";
    localStorage.removeItem("all-notes");
  }
});

addNote.addEventListener("click", () => {
  // Check If user didn't type value
  if (!userTitle.value.trim()) {
    return alert("Please enter a note title before saving.");
  }

  // Create Note
  let noteItem = document.createElement("div");
  noteItem.classList.add("note-item");

  // Create Note Title
  let noteTitle = document.createElement("h3");
  noteTitle.textContent = userTitle.value;
  noteTitle.classList.add("note-title");
  noteItem.appendChild(noteTitle);

  // Create Note Description
  let noteDesc = document.createElement("p");
  noteDesc.textContent = userDesc.value;
  noteDesc.classList.add("note-desc");
  noteItem.appendChild(noteDesc);

  // Create Note Footer
  let noteFooter = document.createElement("div");
  noteFooter.classList.add("note-footer");
  noteItem.appendChild(noteFooter);

  // Create Note Category
  let noteCategory = document.createElement("span");
  noteCategory.textContent = userCategory.value;
  noteCategory.classList.add("note-category");
  noteFooter.appendChild(noteCategory);

  // Create Note Delete Button
  let deleteNoteBTN = document.createElement("button");
  deleteNoteBTN.classList.add("btn", "delete-note");

  // Delete Icon
  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa", "fa-trash");
  deleteNoteBTN.appendChild(deleteIcon);

  // Delete Note Logic
  deleteNoteBTN.addEventListener("click", () => {
    noteItem.remove();
    saveToLocalStorage();
  });
  noteFooter.appendChild(deleteNoteBTN);

  // Create Note Date and Time
  let noteTimeStamp = document.createElement("span");
  noteTimeStamp.classList.add("note-timestamp");
  noteTimeStamp.textContent = `${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} | ${new Date().toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" })}`;
  noteFooter.appendChild(noteTimeStamp);

  // Add Note Item Into List
  notesList.appendChild(noteItem);
  saveToLocalStorage();

  // Update Create Note Box
  createNoteBox.classList.add("create-note-box-hide");
  createNoteBox.classList.remove("create-note-box-show");

  // Clear User Inputs
  userTitle.value = "";
  userDesc.value = "";
});

// Load from Local Storage
if (localStorage.getItem("all-notes")) {
  notesList.innerHTML = localStorage.getItem("all-notes");

  // Delete Button Logic
  const item = notesList.querySelectorAll(".note-item");
  item.forEach((item) => {
    const btn = item.querySelector(".delete-note");
    if (btn) {
      btn.addEventListener("click", () => {
        item.remove();
        saveToLocalStorage();
      });
    }
  });
}