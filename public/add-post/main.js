const email = document.querySelector(".email");
const name = document.querySelector(".name");
const id = document.querySelector(".id");
const btn = document.querySelector(".btn");
console.log(email);
console.log(btn);
const posts = async () => {
  try {
    const res = await fetch("/api/v1/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name.value,
        userID: id.value,
        user_pic: email.value,
      }),
    });
    const data = res.json();
    return data;
  } catch (e) {
    console.log("error");
  }
};

btn.addEventListener("click", (e) => {
  console.log(email.value, name.value);
  e.preventDefault();
  posts().then((res) => console.log(res));
});
