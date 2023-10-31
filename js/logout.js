logoutBtn.addEventListener("click", logout);

// Function to handle logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "./index.html";
}
