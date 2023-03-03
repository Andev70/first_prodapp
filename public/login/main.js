import "./style.css";
// selected elems
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const signIn = document.querySelector(".login");
//const conditions = document.querySelector(".condition");
console.log(email.value);
console.log(password.value);
const alerts = document.querySelector(".msgs");
// functions

const signUserIn = async () => {
  try {
    const res = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const data = res.json();
    return data;
  } catch (e) {
    console.log("error");
  }
};

// addEventListeners
signIn.addEventListener("click", (e) => {
  e.preventDefault();

  signUserIn().then((res) => {
    const msgs = document.querySelector(".alert-container") || false;
    if (msgs) {
      msgs.remove();
    }
    console.log(res);
    const token = res.msg[2];
    if (res.msg[0] === "login successful") {
      sessionStorage.setItem("token", token);
      location.href = `/weiwo/${res.msg[1]}`;
    } else {
      alerts.innerHTML += `<div class="alert-container">
  <div class="alert">
    <p>${res.msg}</p>
    <span class="right-icon">
      <svg viewBox="0 0 20 20">
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path>
      </svg>
    </span>
  </div>
</div>
`;
    }
  });
});
