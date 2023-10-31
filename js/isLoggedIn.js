(() => {
  //Check if the user is logged in using local storage
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const createBtn = document.getElementById("createBtn");
  window.onload = () => {
    if (isLoggedIn) {
      loginBtn.style.display = "none";
      logoutBtn.style.display = "block";

      createBtn.style.display = "block";
    }
  };
})();
