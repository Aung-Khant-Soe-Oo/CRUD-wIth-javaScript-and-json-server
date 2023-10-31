const isLoggedIn = localStorage.getItem("isLoggedIn");
let title = document.querySelector("#title");
let content = document.querySelector("#content");
let imgUrl = document.querySelector("#imgUrl");
const created_at = new Date().toJSON();
const id = new URLSearchParams(window.location.search).get("id");
const form = document.querySelector("form");
window.addEventListener("DOMContentLoaded", (e) => {
  if (isLoggedIn) {
    console.log(id);
    getPost();
    form.addEventListener("submit", updatePost);
  } else {
    window.location.href = "./login.html";
  }
});

const getPost = async () => {
  const response = await fetch("http://localhost:8000/posts/" + id);
  const post = await response.json();
  title.value = post.title;
  imgUrl.value = post.image_url;
  content.value = post.content;
};

const updatePost = async (e) => {
  e.preventDefault();
  const postData = {
    title: title.value,
    image_url: imgUrl.value,
    content: content.value,
    created_at: created_at,
  };
  await fetch("http://localhost:8000/posts/" + id, {
    method: "PATCH",
    body: JSON.stringify(postData),
    headers: { "Content-Type": "application/json" },
  });
  window.location.replace("./index.html");
};
