(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
  new MutationObserver((e) => {
    for (const o of e)
      if (o.type === "childList")
        for (const l of o.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && r(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(e) {
    const o = {};
    return (
      e.integrity && (o.integrity = e.integrity),
      e.referrerpolicy && (o.referrerPolicy = e.referrerpolicy),
      e.crossorigin === "use-credentials"
        ? (o.credentials = "include")
        : e.crossorigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const o = s(e);
    fetch(e.href, o);
  }
})();
const c = document.querySelector(".email"),
  i = document.querySelector(".password"),
  a = document.querySelector(".login");
console.log(c.value);
console.log(i.value);
const u = document.querySelector(".msgs"),
  d = async () => {
    try {
      return (
        await fetch("/api/v1/users/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: c.value, password: i.value }),
        })
      ).json();
    } catch {
      console.log("error");
    }
  };
a.addEventListener("click", (n) => {
  n.preventDefault(),
    d().then((t) => {
      const s = document.querySelector(".alert-container") || !1;
      s && s.remove(), console.log(t);
      const r = t.msg[2];
      t.msg[0] === "login successful"
        ? (sessionStorage.setItem("token", r),
          (location.href = `/weiwo/${t.msg[1]}`))
        : (u.innerHTML += `<div class="alert-container">
  <div class="alert">
    <p>${t.msg}</p>
    <span class="right-icon">
      <svg viewBox="0 0 20 20">
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path>
      </svg>
    </span>
  </div>
</div>
`);
    });
});
