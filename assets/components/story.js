class MyStory extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="stories-container">
    <div class="content">
      <div class="previous-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      <div class="stories"></div>

      <div class="next-btn active">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  </div>

  <div class="stories-full-view">
    <div class="close-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>

    <div class="content">
      <div class="previous-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      <div class="story">
      <video src=""  autoplay controls></video>
        <div class="author">Author</div>
      </div>

      <div class="next-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      
    </div>
  </div>
 `;
  }
}

customElements.define("my-story", MyStory);

const allStories = [
  {
    id: 0,
    imageUrl:
      "https://res.cloudinary.com/durcylpvn/image/upload/v1704785219/neon/1.jpg",
    videoUrl:
      "https://res.cloudinary.com/durcylpvn/video/upload/v1704785238/neon/video.mp4",
    author: "customize ",
  },
  {
    id: 1,
    imageUrl:
      "https://res.cloudinary.com/durcylpvn/image/upload/v1704785219/neon/2.jpg",
    videoUrl:
      "https://res.cloudinary.com/durcylpvn/video/upload/v1704785250/neon/video2.mp4",
    author: "customize ",
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/durcylpvn/image/upload/v1704785219/neon/3.jpg",
    videoUrl:
      "https://res.cloudinary.com/durcylpvn/video/upload/v1704785289/neon/video3.mp4",
    author: "customize ",
  },
  {
    id: 3,
    imageUrl:
      "https://res.cloudinary.com/durcylpvn/image/upload/v1704785219/neon/4.jpg",
    videoUrl:
      "https://res.cloudinary.com/durcylpvn/video/upload/v1704785272/neon/video4.mp4",
    author: "customize ",
  },
  {
    id: 4,
    imageUrl:
      "https://res.cloudinary.com/durcylpvn/image/upload/v1704785220/neon/5.jpg",
    videoUrl:
      "https://res.cloudinary.com/durcylpvn/video/upload/v1704785293/neon/video5.mp4",
    author: "customize ",
  },
  {
    id: 5,
    imageUrl:
      "https://res.cloudinary.com/durcylpvn/image/upload/v1704785219/neon/6.jpg ",
    videoUrl:
      "https://res.cloudinary.com/durcylpvn/video/upload/v1704785259/neon/video6.mp4",
    author: "customize ",
  },
  {
    id: 6,
    imageUrl:
      "https://res.cloudinary.com/durcylpvn/image/upload/v1704785219/neon/7.jpg",
    videoUrl:
      "https://res.cloudinary.com/durcylpvn/video/upload/v1704785273/neon/video7.mp4",
    author: "customize ",
  },
  {
    id: 7,
    imageUrl:
      "https://res.cloudinary.com/durcylpvn/image/upload/v1704785220/neon/8.jpg",
    videoUrl:
      "https://res.cloudinary.com/durcylpvn/video/upload/v1704785287/neon/video8.mp4",
    author: "customize ",
  },
];
const stories = document.querySelector(".stories");
const storiesFullView = document.querySelector(".stories-full-view");
const closeBtn = document.querySelector(".close-btn");
const storyvideoFull = document.querySelector(
  ".stories-full-view .story video"
);
const storyAuthorFull = document.querySelector(
  ".stories-full-view .story .author"
);
const nextBtn = document.querySelector(".stories-container .next-btn");
const previousBtn = document.querySelector(".stories-container .previous-btn");
const storiesContent = document.querySelector(".stories-container .content");
const nextBtnFull = document.querySelector(".stories-full-view .next-btn");
const previousBtnFull = document.querySelector(
  ".stories-full-view .previous-btn"
);

let currentActive = 0;

const createStories = () => {
  allStories.forEach((s, i) => {
    const story = document.createElement("div");
    story.classList.add("story");
    const img = document.createElement("img");
    img.src = s.imageUrl;
    const author = document.createElement("div");
    author.classList.add("author");
    author.innerHTML = s.author;

    story.appendChild(img);
    story.appendChild(author);

    stories.appendChild(story);

    story.addEventListener("click", () => {
      showFullView(i);
    });
  });
};

createStories();

const showFullView = (index) => {
  currentActive = index;
  updateFullView();
  storiesFullView.classList.add("active");
};

closeBtn.addEventListener("click", () => {
  storiesFullView.classList.remove("active");
  storyvideoFull.pause();
});

const updateFullView = () => {
  storyvideoFull.src = allStories[currentActive].videoUrl;
  storyAuthorFull.innerHTML = allStories[currentActive].author;
};

nextBtn.addEventListener("click", () => {
  storiesContent.scrollLeft += 300;
});

previousBtn.addEventListener("click", () => {
  storiesContent.scrollLeft -= 300;
});

storiesContent.addEventListener("scroll", () => {
  if (storiesContent.scrollLeft <= 24) {
    previousBtn.classList.remove("active");
  } else {
    previousBtn.classList.add("active");
  }

  let maxScrollValue =
    storiesContent.scrollWidth - storiesContent.clientWidth - 24;

  if (storiesContent.scrollLeft >= maxScrollValue) {
    nextBtn.classList.remove("active");
  } else {
    nextBtn.classList.add("active");
  }
});

nextBtnFull.addEventListener("click", () => {
  if (currentActive >= allStories.length - 1) {
    return;
  }
  currentActive++;
  updateFullView();
});

previousBtnFull.addEventListener("click", () => {
  if (currentActive <= 0) {
    return;
  }
  currentActive--;
  updateFullView();
});
storyvideoFull.addEventListener("ended", () => {
  if (currentActive >= allStories.length - 1) {
    storiesFullView.classList.remove("active");
    storyvideoFull.pause();
    return;
  }
  currentActive++;
  updateFullView();
});
