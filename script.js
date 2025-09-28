class Book {
    constructor(title, author, year, edition, pictureURL, description, status, genero) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.year = year;
        this.edition = edition;
        this.pictureURL = pictureURL;
        this.description = description;
        this.status = status;
        this.genero = genero;
    }
}
const gridparentContainer = document.querySelector(".book-grid");
const btncloseModal = document.getElementById("close");
const modal = document.getElementById("bookModal");
const addbookbtn = document.getElementById("btnAddBoook");
const modalform = document.getElementById("bookForm");
const btnSubmit = document.getElementById("btnSubmit");
const menuIcon = document.querySelector("header nav img");
const navList = document.querySelector("header nav ul");
const inputSearch = document.getElementById("searchInputBar");
const ulSuggestions = document.querySelector(".suggestions");
let editingBookId = null;
const saveLibrary = () => {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};
const loadLibrary = () => {
    const data = localStorage.getItem("myLibrary");
    if (!data)
        return [];
    const parsed = JSON.parse(data);
    return parsed.map((b) => new Book(b.title, b.author, b.year, b.edition, b.pictureURL, b.description, b.status, b.genero));
};
let myLibrary = loadLibrary();
if (myLibrary.length === 0) {
    myLibrary = [
        new Book("Clean Code", "Robert C. Martin", 2008, "Primera", "https://m.media-amazon.com/images/I/41jEbK-jG+L._SX374_BO1,204,203,200_.jpg", "Guía sobre cómo escribir código limpio y mantenible, con principios y buenas prácticas.", "Completado", "Programación"),
        new Book("The Pragmatic Programmer", "Andrew Hunt y David Thomas", 1999, "Primera", "https://m.media-amazon.com/images/I/41as+WafrFL._SX258_BO1,204,203,200_.jpg", "Consejos prácticos para desarrolladores, técnicas de desarrollo eficiente y profesional.", "En progreso", "Programación"),
        new Book("Design Patterns", "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides", 1994, "Primera", "https://m.media-amazon.com/images/I/41l2KFHRcFL._SY445_SX342_FMwebp_.jpg", "Introducción a los patrones de diseño orientados a objetos y cómo aplicarlos en software.", "No leído", "Arquitectura de software"),
        new Book("Refactoring", "Martin Fowler", 1999, "Primera", "https://m.media-amazon.com/images/I/41JgRyJbGSL._SX342_SY445_FMwebp_.jpg", "Cómo mejorar código existente sin cambiar su comportamiento, manteniéndolo limpio y eficiente.", "Completado", "Programación"),
        new Book("Introduction to Algorithms", "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein", 1990, "Tercera", "https://m.media-amazon.com/images/I/41+aXH4mDbL._SX342_SY445_FMwebp_.jpg", "Referencia completa sobre algoritmos, estructuras de datos y técnicas de análisis.", "En progreso", "Algoritmos"),
        new Book("You Don’t Know JS (Yet)", "Kyle Simpson", 2014, "Primera", "https://m.media-amazon.com/images/I/61sAMmSyhZL._SY522_.jpg", "Explora profundamente JavaScript, desde conceptos básicos hasta avanzados.", "No leído", "JavaScript"),
        new Book("Code Complete", "Steve McConnell", 1993, "Segunda", "https://m.media-amazon.com/images/I/51IM3Ywr1yL._SX342_SY445_FMwebp_.jpg", "Guía exhaustiva sobre las mejores prácticas para escribir software de calidad.", "No leído", "Programación"),
        new Book("Eloquent JavaScript", "Marijn Haverbeke", 2011, "Tercera", "https://m.media-amazon.com/images/I/41VvIauMuuL._SY445_SX342_FMwebp_.jpg", "Introducción moderna a la programación en JavaScript con ejemplos prácticos.", "En progreso", "JavaScript"),
        new Book("The Art of Computer Programming", "Donald E. Knuth", 1968, "Tercera", "https://m.media-amazon.com/images/I/61tIrzRmFdL._SY522_.jpg", "Obra fundamental sobre algoritmos y estructuras de datos, con enfoque matemático.", "No leído", "Algoritmos"),
        new Book("Effective Java", "Joshua Bloch", 2001, "Tercera", "https://m.media-amazon.com/images/I/516sWns6dvL._SX342_SY445_FMwebp_.jpg", "Mejores prácticas para programar en Java, con consejos para optimizar código.", "Completado", "Java"),
    ];
    saveLibrary();
}
const createBookCard = (book) => {
    const card = document.createElement("div");
    card.classList.add("card-book");
    card.id = book.id;
    card.innerHTML = `
    <div class="card-image">
      <img src="${book.pictureURL}" alt="Portada del libro" />
      <div class="card-overlay">
        <h3 class="overlay-title">${book.title}</h3>
        <p class="overlay-author"><strong>Autor:</strong> ${book.author}</p>
        <p class="overlay-description">${book.description}</p>
        <p class="overlay-status"><strong>Estado:</strong> ${book.status}</p>
        <p class="overlay-genero"><strong>Género:</strong> ${book.genero}</p>
        <span id="close" class="closeCard">&times;</span>
      </div>
    </div>
  `;
    gridparentContainer === null || gridparentContainer === void 0 ? void 0 : gridparentContainer.appendChild(card);
};
document.addEventListener("DOMContentLoaded", () => {
    myLibrary.forEach(createBookCard);
});
const toggleModal = (e, bookToEdit) => {
    if (!modal)
        return;
    const target = e.target;
    const h2 = modal.querySelector("h2");
    const inputs = modal.querySelectorAll("input, select, textarea");
    const isAddingBook = (target === null || target === void 0 ? void 0 : target.id) === "btnAddBoook";
    if (h2)
        h2.textContent = isAddingBook ? "Agregar nuevo libro" : "Editar libro";
    if (btnSubmit)
        btnSubmit.textContent = isAddingBook ? "Agregar Libro" : "Guardar Cambios";
    if (isAddingBook) {
        editingBookId = null;
        inputs.forEach((input) => (input.value = ""));
    }
    else if (bookToEdit) {
        editingBookId = bookToEdit.id;
        inputs.forEach((input) => {
            var _a;
            const field = input;
            field.value = (_a = bookToEdit[field.name]) !== null && _a !== void 0 ? _a : "";
        });
    }
    modal.classList.toggle("show");
};
const addBookToLibrary = (title, author, year, edition, pictureURL, description, status, genero) => {
    const newBook = new Book(title, author, year, edition, pictureURL, description, status, genero);
    myLibrary.push(newBook);
    createBookCard(newBook);
    saveLibrary();
};
modalform === null || modalform === void 0 ? void 0 : modalform.addEventListener("submit", (e) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    e.preventDefault();
    const formData = new FormData(modalform);
    const bookData = {};
    formData.forEach((value, key) => (bookData[key] = value.toString()));
    if (editingBookId) {
        const book = myLibrary.find((b) => b.id === editingBookId);
        if (book) {
            book.title = (_a = bookData.title) !== null && _a !== void 0 ? _a : "";
            book.author = (_b = bookData.author) !== null && _b !== void 0 ? _b : "";
            book.year = Number((_c = bookData.year) !== null && _c !== void 0 ? _c : "0");
            book.edition = (_d = bookData.edition) !== null && _d !== void 0 ? _d : "";
            book.pictureURL = (_e = bookData.pictureURL) !== null && _e !== void 0 ? _e : "";
            book.description = (_f = bookData.description) !== null && _f !== void 0 ? _f : "";
            book.status = (_g = bookData.status) !== null && _g !== void 0 ? _g : "";
            book.genero = (_h = bookData.genero) !== null && _h !== void 0 ? _h : "";
            const card = document.getElementById(book.id);
            if (card) {
                card.querySelector(".overlay-title").textContent = book.title;
                card.querySelector(".overlay-author").innerHTML = `<strong>Autor:</strong> ${book.author}`;
                card.querySelector(".overlay-description").textContent =
                    book.description;
                card.querySelector(".overlay-status").innerHTML = `<strong>Estado:</strong> ${book.status}`;
                card.querySelector(".overlay-genero").innerHTML = `<strong>Género:</strong> ${book.genero}`;
                card.querySelector("img").src = book.pictureURL;
            }
        }
    }
    else {
        addBookToLibrary((_j = bookData.title) !== null && _j !== void 0 ? _j : "", (_k = bookData.author) !== null && _k !== void 0 ? _k : "", Number((_l = bookData.year) !== null && _l !== void 0 ? _l : "0"), (_m = bookData.edition) !== null && _m !== void 0 ? _m : "", (_o = bookData.pictureURL) !== null && _o !== void 0 ? _o : "", (_p = bookData.description) !== null && _p !== void 0 ? _p : "", (_q = bookData.status) !== null && _q !== void 0 ? _q : "", (_r = bookData.genero) !== null && _r !== void 0 ? _r : "");
    }
    saveLibrary();
    modal === null || modal === void 0 ? void 0 : modal.classList.remove("show");
    modalform.reset();
    editingBookId = null;
});
gridparentContainer === null || gridparentContainer === void 0 ? void 0 : gridparentContainer.addEventListener("click", (e) => {
    const target = e.target;
    const card = target.closest(".card-book");
    const id = card === null || card === void 0 ? void 0 : card.id;
    if (!card)
        return;
    if (target.classList.contains("closeCard")) {
        if (id) {
            myLibrary = myLibrary.filter((book) => book.id !== id);
            saveLibrary();
        }
        card.remove();
    }
    else {
        const book = myLibrary.find((b) => b.id === id);
        if (book)
            toggleModal(e, book);
    }
});
inputSearch === null || inputSearch === void 0 ? void 0 : inputSearch.addEventListener("input", (e) => {
    if (e.target) {
        const input = e.target;
        const result = myLibrary.filter((book) => book.title.toLocaleLowerCase().includes(input.value.toLocaleLowerCase()));
        if (ulSuggestions) {
            ulSuggestions.innerHTML = result
                .map((book) => `
          <li id=${book.id} class="liSuggestion">
              <div>
                <h4>${book.title}</h4>
                <span>${book.author}</span> |
                <span>${book.year}</span>
              </div>
            </li>`)
                .join("");
        }
    }
});
ulSuggestions === null || ulSuggestions === void 0 ? void 0 : ulSuggestions.addEventListener("mouseleave", () => {
    if (ulSuggestions)
        ulSuggestions.innerHTML = "";
});
ulSuggestions === null || ulSuggestions === void 0 ? void 0 : ulSuggestions.addEventListener("click", (e) => {
    const liTemp = e.target.closest(".liSuggestion");
    if (!liTemp)
        return;
    const bookresult = myLibrary.find((book) => book.id == liTemp.id);
    if (bookresult)
        toggleModal(e, bookresult);
});
menuIcon === null || menuIcon === void 0 ? void 0 : menuIcon.addEventListener("click", () => {
    var _a;
    navList === null || navList === void 0 ? void 0 : navList.classList.toggle("showmenu");
    Array.from((_a = navList === null || navList === void 0 ? void 0 : navList.children) !== null && _a !== void 0 ? _a : []).forEach((li) => {
        li.addEventListener("click", () => {
            if (navList === null || navList === void 0 ? void 0 : navList.classList.contains("showmenu")) {
                navList === null || navList === void 0 ? void 0 : navList.classList.remove("showmenu");
            }
        });
    });
});
addbookbtn === null || addbookbtn === void 0 ? void 0 : addbookbtn.addEventListener("click", (e) => toggleModal(e));
btncloseModal === null || btncloseModal === void 0 ? void 0 : btncloseModal.addEventListener("click", (e) => toggleModal(e));
export {};
//# sourceMappingURL=script.js.map