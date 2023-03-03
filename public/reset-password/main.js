import "./style.css";
const btn = document.querySelector(".reset");
const password = document.querySelector(".password");
console.log("ok");
const resetPassword = async () => {
  try {
    const token = sessionStorage.getItem("resetToken");
    const res = await fetch("/api/v1/users/new/password", {
      method: "POST",
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password.value }),
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

btn.addEventListener("click", (e) => {
  const alertParent = document.querySelector(".msg");
  e.preventDefault();
  const msgs = document.querySelector(".alert-con") || false ;
  if(msgs) msgs.remove()
  resetPassword().then((res) => {
    if (res.msg === "password reset successful") {
      sessionStorage.clear();
      location.href = "/login";
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
