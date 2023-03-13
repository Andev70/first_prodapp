(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const l=document.querySelector(".email"),c=document.querySelector(".password"),a=document.querySelector(".login"),d=document.querySelector(".msgs"),u=async()=>{try{return(await fetch("/api/v1/users/login",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({email:l.value,password:c.value})})).json()}catch{console.log("error")}};a.addEventListener("click",n=>{n.preventDefault(),u().then(o=>{const s=document.querySelector(".alert-container")||!1;s&&s.remove(),console.log(o);const r=o.msg[2];o.msg[0]==="login successful"?(sessionStorage.setItem("token",r),location.href=`/weiwo/${o.msg[1]}`):d.innerHTML+=`<div class="alert-container">
  <div class="alert">
    <p>${o.msg}</p>
    <span class="right-icon">
      <svg viewBox="0 0 20 20">
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path>
      </svg>
    </span>
  </div>
</div>
`})});
