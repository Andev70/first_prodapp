// popover
var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

// Gender Select
if (window.location.pathname === "/") {
  const radioBtn1 = document.querySelector("#flexRadioDefault1");
  const radioBtn2 = document.querySelector("#flexRadioDefault2");
  const radioBtn3 = document.querySelector("#flexRadioDefault3");
  const genderSelect = document.querySelector("#genderSelect");

  radioBtn1.addEventListener("change", () => {
    genderSelect.classList.add("d-none");
  });
  radioBtn2.addEventListener("change", () => {
    genderSelect.classList.add("d-none");
  });
  radioBtn3.addEventListener("change", () => {
    genderSelect.classList.remove("d-none");
  });
}
// selectors
const post_caption = document.querySelector(".caption");
const user_name = document.querySelector(".user-name");
const user_pic = document.querySelector(".user-pic");
const token = sessionStorage.getItem("token");
const postBtn = document.querySelector(".post-btn");

// selectors

const getUser = async () => {
  try {
    const res = await fetch("/api/v1/profiles/profile", {
      headers: {
        Accept: "application/json",
        authorization: token,
      },
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log("error");
  }
};

getUser().then((res) => {
  if (res.msg === "error occured") location.href = "/login";
  console.log(res);
});
// console.log(user_name.innerHTML, user_pic.src);
const createPost = async () => {
  try {
    const post_image = document.querySelector(".post-image").files;
    const formData = new FormData();
    // appending values
    formData.append("username", user_name.innerHTML);
    formData.append("user_pic", user_pic.src);
    formData.append("caption", post_caption.value);
    // appending files
    Object.keys(post_image).forEach((key) => {
      formData.append("dp", post_image.item(key));
    });
    console.log(post_image);
    console.log([...formData.entries()]);
    const res = await fetch("/api/v1/posts", {
      method: "POST",
      headers: { authorization: token, Accept: "application/json" },
      body: formData,
    });
    const data = res.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
console.log(postBtn);
postBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("ok");
  createPost().then((res) => console.log(res));
});
