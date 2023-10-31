const form = document.querySelector("form");

const createPost = async (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  const imgUrl = document.querySelector("#imgUrl").value;
  const created_at = new Date().toJSON();
  const res = await fetch("http://localhost:8000/users");
  const user = await res.json();

  // get post data from user
  const post = {
    title: title,
    image_url: imgUrl,
    content: content,
    created_at: created_at,
    created_by: user[0].name,
  };
  // post to json server
  await fetch("http://localhost:8000/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "Content-Type": "application/json" },
  });

  window.location.href = "./index.html";
};

form.addEventListener("submit", createPost);
