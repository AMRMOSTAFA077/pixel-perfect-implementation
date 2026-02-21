(()=>{window.addEventListener("message",e=>{if(e.data.insta_banner_notification){let t=e.data.count,n=e.data.type;s(t,n)}});function s(e=25,t="Posts"){let n=document.querySelector(".sort-banner");if(n){let a=n.querySelector(".message");a&&(a.innerHTML=`<span style="font-weight: 600;">${e} ${t}</span> sorted - don't scroll yet`);return}let r=document.createElement("style");r.textContent=`
  @keyframes slideBounceDown {
    0% {
      transform: translate(-50%, -120%);
      opacity: 0;
    }
    60% {
      transform: translate(-50%, 10px);
      opacity: 1;
    }
    80% {
      transform: translate(-50%, -5px);
    }
    100% {
      transform: translate(-50%, 0);
    }
  }

  @keyframes slideBounceUp {
    0% {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    20% {
      transform: translate(-50%, -10px);
    }
    100% {
      transform: translate(-50%, -120%);
      opacity: 0;
    }
  }

  @keyframes bounceLogo {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }

  .sort-banner .icon {
    padding: 4px;
    width: 1.5rem !important;
    height: auto !important;
    margin-right: 8px;
    animation: bounceLogo 1s infinite;
  }

  .sort-banner {
    position: fixed;
    top: 15%; 
    left: 50%;
    transform: translateX(-50%);
    background: #ffffff;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    width: 50%;
    max-width: 500px;
    z-index: 9999;
    animation: slideBounceDown 0.25s ease;
    border: 1px solid rgba(0, 0, 0, 0.15); 
    border-radius: 0.75rem; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

    .sort-banner .stop-btn:hover {
        background: #e5e7eb; /* slightly darker on hover */
    }

    .sort-banner .message {
      font-size: 16px;
      font-weight: 400;
      color: #000;
      flex-grow: 1;
      font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
    }

    .sort-banner .stop-btn {
      font-size: 15px;
      color: #000; /* black text like the amenities button */
      background: #f3f4f6; /* light gray background */
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      padding: 8px 14px;
      font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
      display: inline-flex;           /* icon + text in a row */
      align-items: center;
      gap: 8px;                       /* space between icon and text */
      }
      .sort-banner .stop-btn img {
         width: 10px;
         height: 10px;
         display: block;
         background: rgba(0,0,0,0.85);
         border-radius: 2px;
      }

    @media (max-width: 400px) {
      .sort-banner {
        padding: 10px 12px;
      }
      .sort-banner .message,
      .sort-banner .stop-btn {
        font-size: 14px;
      }
    }
  `,document.head.appendChild(r);let o=document.createElement("div");o.className="sort-banner",o.innerHTML=`
  <img class="icon" src="${chrome.runtime.getURL("Icons/16.png")}" />
  <div class="message">
    <span style="font-weight: 600;">${e} ${t}</span> sorted - don't scroll yet
  </div>
  <button class="stop-btn">
    <img src="${chrome.runtime.getURL("Icons/StopIcon.png")}" alt="">
    <span>Stop Sorting</span>
  </button>
`,o.querySelector(".stop-btn").addEventListener("click",()=>{sessionStorage.setItem("isorterStopSorting","on")}),document.body.appendChild(o)}function i(){let e=document.querySelector(".sort-banner");e&&(e.style.animation="slideBounceUp 0.25s ease forwards",setTimeout(()=>{e.remove()},250))}window.addEventListener("message",e=>{if(e.data.insta_banner_notification_remove){i();let t=document.getElementById("overlay_sort_reels");t&&t.remove()}});})();
