const form = document.querySelector(".form");
const token = sessionStorage.getItem("token");
const sendForm = async () => {
  const email = document.querySelector(".email");
  const name = document.querySelector(".name");
  const id = document.querySelector(".id");
  const btn = document.querySelector(".btn");
  const files = document.querySelector(".file").files;
  const formData = new FormData(form);

  Object.keys(files).forEach((key) => {
    formData.append("dp", files.item(key));
  });

  const res = await fetch("/api/v1/posts", {
    method: "POST",
    headers: {
      authorization: token,
      Accept: "application/json",
      token: "jjjj",
    },
    body: formData,
  });
  const data = res.json();
  return data;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendForm().then((res) => console.log(res));
});
