const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const isLoggedIn = localStorage.getItem("isLoggedIn");
const postList = document.getElementById("postList");
const hero = document.querySelector(".hero");

// click login button in nav bar
loginBtn.addEventListener("click", () => {
  window.location.href = "./login.html";
});

const renderPost = async () => {
  const response = await fetch("http://localhost:8000/posts");
  const posts = await response.json();
  let postsToShow = [];
  // check login or not to show all post or the last 20 posts
  if (!isLoggedIn) {
    postsToShow = posts.slice(-20).reverse();
  } else {
    postsToShow = posts.reverse();
  }
  // get post id for show in hero section
  const lastPostId = postsToShow[0].id;

  // get post data and create article with that data
  postsToShow.map((post) => {
    const id = post.id;
    const title = post.title;
    const content = post.content.substring(0, 70);
    const imgUrl = post.image_url;
    const created_at = new Date(post.created_at);

    const author = post.created_by;
    const article = document.createElement("article");
    article.innerHTML = `
              <div class="img-blk">
              <img src=${imgUrl} alt=${title} width="100%">
              </div>
              <div class="text-blk">
              <h3>${title}</h3>
              <p>${content}...</p>
              <div class="created">
                <date>${created_at.toLocaleDateString()}</date>
                <span>by ${author}</span>
              </div>
              <a href="details.html?id=${id}" class="btn">Read More ..</a>
             </div>
          `;
    if (id != lastPostId) {
      postList.appendChild(article);
    } else {
      hero.appendChild(article);
    }
  });
};
renderPost();

const goTopBtn = document.querySelector(".go-top");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goTopBtn.style.display = "flex";
  } else {
    goTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

goTopBtn.addEventListener("click", () => topFunction());
