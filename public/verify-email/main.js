import "./style.css";
const demomail = sessionStorage.getItem("email");
const id = sessionStorage.getItem("userID");
console.log(id, demomail);

if (!id) location.href = "/signup";
// //// selectors

const otp_first = document.querySelector(".first-otp");
const otp_second = document.querySelector(".second-otp");
const otp_third = document.querySelector(".third-otp");
const otp_fourth = document.querySelector(".fourth-otp");
const verifyBtn = document.querySelector(".verify-btn");
const resendBtn = document.querySelector(".resend-btn");

console.log(otp_fourth, otp_third, otp_second, otp_first, verifyBtn);

// function

const verifyAccount = async () => {
  try {
    let clientOTP = `${otp_first.value}${otp_second.value}${otp_third.value}${otp_fourth.value}`;
    clientOTP = parseInt(clientOTP);

    // request http
    const res = await fetch("/api/v1/users/verify", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        otp: clientOTP,
      }),
    });
    const data = res.json();
    return data;
  } catch (e) {
    console.log("error");
  }
};

// event listeners
verifyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  verifyAccount().then((res) => {
    console.log(res);
    if (res.msg[0] === "successfully verified") {
      sessionStorage.setItem("token", res.msg[1]);
      location.href = "/create/profile";
    }
  });
});

// resend otp method request

const resendOtp = async () => {
  try {
    const email = sessionStorage.getItem("email");
    const id = sessionStorage.getItem("userID");
    // request http
    const res = await fetch("/api/v1/users/resendotp", {
      method: "PATCH",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        Userid: id,
      }),
    });
    const data = res.json();
    return data;
  } catch (e) {
    console.log("error");
  }
};

resendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resendOtp().then((res) => {
    console.log(res);
  });
});
