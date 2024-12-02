function Book(id, title, author, pages, publicationYear, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.publicationYear = publicationYear;
  this.read = read;
}

var myLibrary = [
  new Book(
    crypto.randomUUID(),
    "The Great Gatsby",
    "F. Scott Fitzgerald",
    180,
    "1925",
    true
  ),
  new Book(
    crypto.randomUUID(),
    "To Kill a Mockingbird",
    "Harper Lee",
    281,
    "1960",
    true
  ),
  new Book(crypto.randomUUID(), "1984", "George Orwell", 328, "1949", false),
  new Book(
    crypto.randomUUID(),
    "Pride and Prejudice",
    "Jane Austen",
    279,
    "1813",
    true
  ),
  new Book(
    crypto.randomUUID(),
    "The Catcher in the Rye",
    "J.D. Salinger",
    277,
    "1951",
    false
  ),
  new Book(
    crypto.randomUUID(),
    "The Hobbit",
    "J.R.R. Tolkien",
    310,
    "1937",
    true
  ),
];

const addModal = new bootstrap.Modal(document.querySelector(".add-modal"));
document.querySelector(".btn-show").addEventListener("click", () => {
  addModal.show();
});

document.querySelector(".add-form").addEventListener("submit", function (e) {
  e.preventDefault();
  addBook(this);
});

displayLibrary();

function displayLibrary() {
  console.log(myLibrary);
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";

  if (myLibrary.length === 0) {
    cards.innerHTML = "<p>No books available in the library.</p>";
    return;
  }

  myLibrary.forEach(({ id, title, author, pages, read, publicationYear }) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="./assets/img/cat1S.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Book name: ${title}</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Author: ${author}</li>
          <li class="list-group-item">Pages: ${pages}</li>
          <li class="list-group-item">Publication Year: ${publicationYear}</li>
          <li class="list-group-item read-status">
            Read: ${read ? "Yes" : "No"}
            <button class="btn btn-sm btn-primary toggle-read-btn" onclick="toggleReadStatus('${id}')"><img src="./assets/img/book-open.svg"></button>
          </li>
        </ul>
        <button class="btn btn-secondary btn-sm delete-btn" onclick="deleteBook('${id}')"><img src="./assets/img/delete-outline.svg" > </button>
        </div>
    `;
    cards.appendChild(card);
  });
}

function addBook(form) {
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return false;
  }

  const formData = new FormData(form);
  const dataObject = Object.fromEntries(formData.entries());

  const newBook = {
    id: crypto.randomUUID(),
    title: dataObject.title,
    author: dataObject.author,
    pages: Number(dataObject.pages),
    publicationYear: dataObject.publicationYear,
    read: false,
  };

  myLibrary.push(newBook);
  displayLibrary();

  form.reset();
  form.classList.remove("was-validated");
  addModal.hide();
  return true;
}

function deleteBook(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  displayLibrary();
}
function toggleReadStatus(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.read = !book.read;
    displayLibrary();
  }
}

function sortByAuthor() {
  myLibrary.sort((a, b) => {
    const authorA = a.author.toLowerCase();
    const authorB = b.author.toLowerCase();
    if (authorA < authorB) return -1;
    if (authorA > authorB) return 1;
    return 0;
  });
  displayLibrary();
}

function sortByPages() {
  myLibrary.sort((a, b) => a.pages - b.pages);
  displayLibrary();
}

function sortByRead() {
  myLibrary.sort((a, b) => {
    return a.read === b.read ? 0 : a.read ? -1 : 1;
  });
  displayLibrary();
}

function sortByPublicationYear() {
  myLibrary.sort((a, b) => a.publicationYear - b.publicationYear);
  displayLibrary();
}
