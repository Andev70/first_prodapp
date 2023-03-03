import "./style.css";

const form = document.querySelector(".form");
// const create = document.querySelector(".add-profile");
console.log(sessionStorage.getItem("token"));
const sendFile = async () => {
  const name = document.querySelector(".username");
  const website = document.querySelector(".website");
  const bio = document.querySelector(".about");

  const token = sessionStorage.getItem("token");
  const myFile = document.querySelector(".file").files;
  const formData = new FormData();

  Object.keys(myFile).forEach((key) => {
    formData.append("dp", myFile.item(key));
  });
  formData.append("username", name.value);
  formData.append("website", website.value);
  formData.append("bio", bio.value);

  //    formData.append("userID", email.value);

  const res = await fetch("/api/v1/profiles", {
    method: "POST",
    headers: {
      authorization: token,
    },
    body: formData,
  });
  const json = await res.json();
  console.log(json);
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendFile();
});

// add-profile
// file
// about
// website
// username
