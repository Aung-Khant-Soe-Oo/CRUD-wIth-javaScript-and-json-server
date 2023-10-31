const postBlk = document.querySelector(".post-blk");
const id = new URLSearchParams(window.location.search).get("id");

// Detail
const renderDetailPost = async () => {
  const response = await fetch("http://localhost:8000/posts/" + id);
  const post = await response.json();

  const title = post.title;
  const content = post.content;
  const imgUrl = post.image_url;

  postBlk.innerHTML = `
            <div class="img-blk">
                <img src=${imgUrl} alt=${title} width="100%">
                </div>
            <div class="text-blk">
                <h2>${title}</h2>
                <p>${content}...</p>
            </div>
   `;
};

window.addEventListener("DOMContentLoaded", () => renderDetailPost());

// Delete
const isLoggedIn = localStorage.getItem("isLoggedIn");
const deleteBtn = document.querySelector(".delete-btn");
const error = document.querySelector(".create-sec");
const deletePost = async () => {
  if (isLoggedIn) {
    if (confirm("Are you sure to delete post ?")) {
      const res = await fetch("http://localhost:8000/posts/" + id, {
        method: "DELETE",
      });
      window.location.href = "./index.html";
    }
  } else {
    window.location.href = "./login.html";
  }
};

deleteBtn.addEventListener("click", () => deletePost());

// to get id for edit click edit button
const editBtn = document.querySelector(".edit-btn");
editBtn.addEventListener("click", () => {
  window.location.href = "./edit.html?id=" + id;
});
