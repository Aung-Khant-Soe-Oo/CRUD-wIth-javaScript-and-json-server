const error = document.querySelector(".error");
const form = document.querySelector(".login-form form");

form.addEventListener("submit", login);
const getUser = async () => {
  const response = await fetch("http://localhost:8000/users");
  const users = await response.json();

  users.map((user) => {
    const { name, password } = user;
    console.log(name, password);
    if (name === form.username.value && password === form.password.value) {
      localStorage.setItem("isLoggedIn", true);
      window.location.href = "./index.html";
    } else {
      error.style.display = "block";
      form.username.value = "";
      form.password.value = "";
    }
  });
};
// Function to handle login
function login(e) {
  getUser();
  e.preventDefault();
}
