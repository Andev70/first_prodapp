import "./style.css";

const name = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const register = document.querySelector(".register");
const conditions = document.querySelector(".condition");
// const checker = document.querySelector(".condition").checked;
let terms;

conditions.addEventListener("change", () => {
  const checker = document.querySelector(".condition").checked;
  // console.log(checker);
  if (checker === false) {
    terms = "";
  } else {
    terms = true;
  }
});

const createAccount = async () => {
  try {
    const res = await fetch("/api/v1/users/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name.value,
        email: email.value,
        password: password.value,
        termsAndConditions: terms,
      }),
    });
    const data = res.json();
    return data;
  } catch (e) {
    console.log("error");
  }
};

register.addEventListener("click", (e) => {
  const alertParent = document.querySelector(".msg");
  const msgs = document.querySelector(".alert-con") || false;
  if (msgs) msgs.remove();
  e.preventDefault();
  createAccount().then((res) => {
    console.log(res);

    const responseEmail = res.msg[1];
    const userID = res.msg[2];
    if (res.msg[0] === "your account has been initiated please verify") {
      sessionStorage.setItem("email", responseEmail);
      sessionStorage.setItem("userID", userID);
      location.href = "/verify";
    } else {
      alertParent.innerHTML += `<div
    class="alert-con flex justify-between text-red-200 shadow-inner rounded p-3 bg-red-600"
  >
    <p class="self-center"><strong>Danger </strong>${res.msg}</p>
    <strong class="text-xl align-center cursor-pointer alert-del"
      >&times;</strong
    >
  </div>`;
    }
  });
});
