class Book {
  id: string;
  title: string;
  author: string;
  year: number;
  edition: string;
  pictureURL: string;
  description: string;
  status: string;
  genero: string;

  constructor(
    title: string,
    author: string,
    year: number,
    edition: string,
    pictureURL: string,
    description: string,
    status: string,
    genero: string
  ) {
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
const modalform = document.getElementById("bookForm") as HTMLFormElement;
const btnSubmit = document.getElementById("btnSubmit");
const menuIcon = document.querySelector("header nav img");
const navList = document.querySelector("header nav ul");
const inputSearch = document.getElementById("searchInputBar");
const ulSuggestions = document.querySelector(".suggestions");

let editingBookId: string | null = null;

const saveLibrary = () => {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};

const loadLibrary = (): Book[] => {
  const data = localStorage.getItem("myLibrary");
  if (!data) return [];
  const parsed = JSON.parse(data);
  return parsed.map(
    (b: any) =>
      new Book(
        b.title,
        b.author,
        b.year,
        b.edition,
        b.pictureURL,
        b.description,
        b.status,
        b.genero
      )
  );
};

let myLibrary: Book[] = loadLibrary();

if (myLibrary.length === 0) {
  myLibrary = [
    new Book(
      "Clean Code",
      "Robert C. Martin",
      2008,
      "Primera",
      "https://m.media-amazon.com/images/I/41jEbK-jG+L._SX374_BO1,204,203,200_.jpg",
      "Guía sobre cómo escribir código limpio y mantenible, con principios y buenas prácticas.",
      "Completado",
      "Programación"
    ),
    new Book(
      "The Pragmatic Programmer",
      "Andrew Hunt y David Thomas",
      1999,
      "Primera",
      "https://m.media-amazon.com/images/I/41as+WafrFL._SX258_BO1,204,203,200_.jpg",
      "Consejos prácticos para desarrolladores, técnicas de desarrollo eficiente y profesional.",
      "En progreso",
      "Programación"
    ),
    new Book(
      "Design Patterns",
      "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
      1994,
      "Primera",
      "https://m.media-amazon.com/images/I/41l2KFHRcFL._SY445_SX342_FMwebp_.jpg",
      "Introducción a los patrones de diseño orientados a objetos y cómo aplicarlos en software.",
      "No leído",
      "Arquitectura de software"
    ),
    new Book(
      "Refactoring",
      "Martin Fowler",
      1999,
      "Primera",
      "https://m.media-amazon.com/images/I/41JgRyJbGSL._SX342_SY445_FMwebp_.jpg",
      "Cómo mejorar código existente sin cambiar su comportamiento, manteniéndolo limpio y eficiente.",
      "Completado",
      "Programación"
    ),
    new Book(
      "Introduction to Algorithms",
      "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
      1990,
      "Tercera",
      "https://m.media-amazon.com/images/I/41+aXH4mDbL._SX342_SY445_FMwebp_.jpg",
      "Referencia completa sobre algoritmos, estructuras de datos y técnicas de análisis.",
      "En progreso",
      "Algoritmos"
    ),
    new Book(
      "You Don’t Know JS (Yet)",
      "Kyle Simpson",
      2014,
      "Primera",
      "https://m.media-amazon.com/images/I/61sAMmSyhZL._SY522_.jpg",
      "Explora profundamente JavaScript, desde conceptos básicos hasta avanzados.",
      "No leído",
      "JavaScript"
    ),
    new Book(
      "Code Complete",
      "Steve McConnell",
      1993,
      "Segunda",
      "https://m.media-amazon.com/images/I/51IM3Ywr1yL._SX342_SY445_FMwebp_.jpg",
      "Guía exhaustiva sobre las mejores prácticas para escribir software de calidad.",
      "No leído",
      "Programación"
    ),
    new Book(
      "Eloquent JavaScript",
      "Marijn Haverbeke",
      2011,
      "Tercera",
      "https://m.media-amazon.com/images/I/41VvIauMuuL._SY445_SX342_FMwebp_.jpg",
      "Introducción moderna a la programación en JavaScript con ejemplos prácticos.",
      "En progreso",
      "JavaScript"
    ),
    new Book(
      "The Art of Computer Programming",
      "Donald E. Knuth",
      1968,
      "Tercera",
      "https://m.media-amazon.com/images/I/61tIrzRmFdL._SY522_.jpg",
      "Obra fundamental sobre algoritmos y estructuras de datos, con enfoque matemático.",
      "No leído",
      "Algoritmos"
    ),
    new Book(
      "Effective Java",
      "Joshua Bloch",
      2001,
      "Tercera",
      "https://m.media-amazon.com/images/I/516sWns6dvL._SX342_SY445_FMwebp_.jpg",
      "Mejores prácticas para programar en Java, con consejos para optimizar código.",
      "Completado",
      "Java"
    ),
  ];
  saveLibrary();
}

const createBookCard = (book: Book) => {
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

  gridparentContainer?.appendChild(card);
};

document.addEventListener("DOMContentLoaded", () => {
  myLibrary.forEach(createBookCard);
});

const toggleModal = (e: Event, bookToEdit?: Book): void => {
  if (!modal) return;
  const target = e.target as HTMLElement | null;
  const h2 = modal.querySelector("h2");
  const inputs = modal.querySelectorAll("input, select, textarea");
  const isAddingBook = target?.id === "btnAddBoook";

  if (h2)
    h2.textContent = isAddingBook ? "Agregar nuevo libro" : "Editar libro";
  if (btnSubmit)
    btnSubmit.textContent = isAddingBook ? "Agregar Libro" : "Guardar Cambios";

  if (isAddingBook) {
    editingBookId = null;
    inputs.forEach((input) => ((input as any).value = ""));
  } else if (bookToEdit) {
    editingBookId = bookToEdit.id;
    inputs.forEach((input) => {
      const field = input as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;
      field.value = (bookToEdit as any)[field.name] ?? "";
    });
  }

  modal.classList.toggle("show");
};

const addBookToLibrary = (
  title: string,
  author: string,
  year: number,
  edition: string,
  pictureURL: string,
  description: string,
  status: string,
  genero: string
): void => {
  const newBook = new Book(
    title,
    author,
    year,
    edition,
    pictureURL,
    description,
    status,
    genero
  );
  myLibrary.push(newBook);
  createBookCard(newBook);
  saveLibrary();
};

modalform?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(modalform);
  const bookData: Record<string, string> = {};
  formData.forEach((value, key) => (bookData[key] = value.toString()));

  if (editingBookId) {
    const book = myLibrary.find((b) => b.id === editingBookId);
    if (book) {
      book.title = bookData.title ?? "";
      book.author = bookData.author ?? "";
      book.year = Number(bookData.year ?? "0");
      book.edition = bookData.edition ?? "";
      book.pictureURL = bookData.pictureURL ?? "";
      book.description = bookData.description ?? "";
      book.status = bookData.status ?? "";
      book.genero = bookData.genero ?? "";

      const card = document.getElementById(book.id);
      if (card) {
        card.querySelector(".overlay-title")!.textContent = book.title;
        card.querySelector(
          ".overlay-author"
        )!.innerHTML = `<strong>Autor:</strong> ${book.author}`;
        card.querySelector(".overlay-description")!.textContent =
          book.description;
        card.querySelector(
          ".overlay-status"
        )!.innerHTML = `<strong>Estado:</strong> ${book.status}`;
        card.querySelector(
          ".overlay-genero"
        )!.innerHTML = `<strong>Género:</strong> ${book.genero}`;
        (card.querySelector("img") as HTMLImageElement).src = book.pictureURL;
      }
    }
  } else {
    addBookToLibrary(
      bookData.title ?? "",
      bookData.author ?? "",
      Number(bookData.year ?? "0"),
      bookData.edition ?? "",
      bookData.pictureURL ?? "",
      bookData.description ?? "",
      bookData.status ?? "",
      bookData.genero ?? ""
    );
  }

  saveLibrary();
  modal?.classList.remove("show");
  modalform.reset();
  editingBookId = null;
});

gridparentContainer?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const card = target.closest(".card-book");
  const id = card?.id;

  if (!card) return;

  if (target.classList.contains("closeCard")) {
    if (id) {
      myLibrary = myLibrary.filter((book) => book.id !== id);
      saveLibrary();
    }
    card.remove();
  } else {
    const book = myLibrary.find((b) => b.id === id);
    if (book) toggleModal(e, book);
  }
});

inputSearch?.addEventListener("input", (e) => {
  if (e.target) {
    const input = e.target as HTMLInputElement;
    const result = myLibrary.filter((book) =>
      book.title.toLocaleLowerCase().includes(input.value.toLocaleLowerCase())
    );

    if (ulSuggestions) {
      ulSuggestions.innerHTML = result
        .map(
          (book) => `
          <li id=${book.id} class="liSuggestion">
              <div>
                <h4>${book.title}</h4>
                <span>${book.author}</span> |
                <span>${book.year}</span>
              </div>
            </li>`
        )
        .join("");
    }
  }
});

ulSuggestions?.addEventListener("mouseleave", () => {
  if (ulSuggestions) ulSuggestions.innerHTML = "";
});

ulSuggestions?.addEventListener("click", (e) => {
  const liTemp = (e.target as HTMLElement).closest(
    ".liSuggestion"
  ) as HTMLLIElement | null;
  if (!liTemp) return;
  const bookresult = myLibrary.find((book) => book.id == liTemp.id);
  if (bookresult) toggleModal(e, bookresult);
});

menuIcon?.addEventListener("click", () => {
  navList?.classList.toggle("showmenu");
  Array.from(navList?.children ?? []).forEach((li) => {
    li.addEventListener("click", () => {
      if (navList?.classList.contains("showmenu")) {
        navList?.classList.remove("showmenu");
      }
    });
  });
});

addbookbtn?.addEventListener("click", (e) => toggleModal(e));
btncloseModal?.addEventListener("click", (e) => toggleModal(e));
