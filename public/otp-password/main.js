import "./style.css"
const btn = document.querySelector(".btn");
const gmail = document.querySelector(".email");
const otpInput = document.querySelector(".otp");
const sendOtp = document.querySelector(".otp-btn");
const resetPass = async () => {
  try {
    const res = await fetch("/api/v1/users/reset", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: gmail.value }),
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

btn.addEventListener("click", (e) => {
  console.log(gmail.value);
  e.preventDefault();
  resetPass().then((res) => {
    console.log(res);
    if (
      res.msg[1] ===
      "otp has been reset please verify the code we have sent to your account"
    ) {
      sessionStorage.setItem("resetToken", res.msg[0]);
      console.log(sessionStorage.getItem("resetToken"));
    }
  });
});

const otpSender = async () => {
  try {
    const token = sessionStorage.getItem("resetToken");
    const res = await fetch("/api/v1/users/otp/check", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ otp: parseInt(otpInput.value) }),
    });

    const data = res.json();
    return data;
  } catch (error) {
    console.log("cannot send request");
  }
};

sendOtp.addEventListener("click", (e) => {
  e.preventDefault();
  otpSender().then((res) => {
    console.log(res);
    if (res.msg[0] === "verification successful reset password") {
      sessionStorage.setItem("resetToken", res.msg[1]);
      location.href = "/new/password";
    }
  });
});
