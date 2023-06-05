window.onload=function(){

  //toggle button
  let darkMode = localStorage.getItem("darkMode");
  const toggleButton = document.getElementById("toggle");
  const darkModeToggle = document.querySelector(".btn-toggle");
  
  const enableDarkMode = () => {
    document.body.classList.add("dark");
    localStorage.setItem("darkMode", "enabled");
    toggleButton.checked = true;
  };
  
  const disableDarkMode = () => {
    document.body.classList.remove("dark");
    localStorage.setItem("darkMode", null);
    toggleButton.checked = false;
  };
  if (darkMode === "enabled") {
    enableDarkMode();
  }
  darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });
    }