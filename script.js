
const photos = [
  {
    title: "Mountain Escape",
    category: "nature",
    image: "photo-1470770841072-f978cf4d019e"
  },
  {
    title: "Forest Dreams",
    category: "nature",
    image: "photo-1441974231531-c6227db76b6e"
  },
  {
    title: "Alpine Views",
    category: "nature",
    image: "photo-1464822759023-fed622ff2c3b"
  },
  {
    title: "Modern Lines",
    category: "architecture",
    image: "photo-1511818966892-d7d671e672a2"
  },
  {
    title: "City Geometry",
    category: "architecture",
    image: "photo-1487958449943-2429e8be8625"
  },
  {
    title: "Urban Design",
    category: "architecture",
    image: "photo-1518005020951-eccb494ad742"
  },
  {
    title: "Blue Horizons",
    category: "travel",
    image: "photo-1501785888041-af3ef285b470"
  },
  {
    title: "Lake Journey",
    category: "travel",
    image: "photo-1476514525535-07fb3b4ae5f1"
  },
  {
    title: "Open Roads",
    category: "travel",
    image: "photo-1500530855697-b586d89ba3ee"
  }
];

const gallery = document.querySelector("#gallery");
const count = document.querySelector("#gallery-count");
const filters = document.querySelectorAll(".filter");

const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const caption = document.querySelector("#lightbox-caption");
const position = document.querySelector("#image-position");

const closeBtn = document.querySelector("#close-btn");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

let visiblePhotos = [];
let currentIndex = 0;
let previousFocus = null;

function getImageUrl(photo) {
  return `https://images.unsplash.com/${photo.image}?auto=format&fit=crop&w=1000&q=80`;
}

function renderGallery(category = "all") {
  const filteredPhotos = photos.filter(photo =>
    category === "all" || photo.category === category
  );

  visiblePhotos = filteredPhotos;
  gallery.replaceChildren();

  count.textContent =
    `${visiblePhotos.length} photos in this collection`;

  visiblePhotos.forEach((photo, index) => {
    const card = document.createElement("article");
    card.className = "photo-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${photo.title}`);

    const img = document.createElement("img");
    img.src = getImageUrl(photo);
    img.alt = photo.title;
    img.loading = "lazy";

    const info = document.createElement("div");
    info.className = "photo-info";

    const title = document.createElement("h3");
    title.textContent = photo.title;

    const categoryText = document.createElement("p");
    categoryText.textContent = photo.category;

    info.append(title, categoryText);
    card.append(img, info);

    card.addEventListener("click", () => openLightbox(index));

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });

    gallery.append(card);
  });
}

function openLightbox(index) {
  if (visiblePhotos.length === 0) return;

  previousFocus = document.activeElement;
  currentIndex = index;
  updateLightbox();

  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  closeBtn.focus();
}

function updateLightbox() {
  const photo = visiblePhotos[currentIndex];

  lightboxImg.src = getImageUrl(photo);
  lightboxImg.alt = photo.title;
  caption.textContent = photo.title;

  position.textContent =
    `${currentIndex + 1} of ${visiblePhotos.length}`;
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.removeAttribute("src");
  document.body.style.overflow = "";

  if (previousFocus && previousFocus.isConnected) {
    previousFocus.focus();
  }
}

function showNext() {
  currentIndex = (currentIndex + 1) % visiblePhotos.length;
  updateLightbox();
}

function showPrevious() {
  currentIndex =
    (currentIndex - 1 + visiblePhotos.length) %
    visiblePhotos.length;

  updateLightbox();
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(filter => {
      filter.classList.remove("active");
    });

    button.classList.add("active");
    renderGallery(button.dataset.category);
  });
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrevious);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", event => {
  if (lightbox.hidden) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrevious();
});

renderGallery();
