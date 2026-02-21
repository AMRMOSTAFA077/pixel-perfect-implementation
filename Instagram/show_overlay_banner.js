(()=>{function S(){let e=document.getElementsByTagName("body")[0],o=document.createElement("div");o.id="overlay_sort_reels",o.style=`
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  background-color: rgba(255,215,112,0.4);
  z-index: 2;
  cursor: pointer;
  `,o.class="animate__animated animate__zoomIn",e.append(o)}function b(e){if(e===null||e===0||e>=1&&e<=999)return e;if(e>=1e3&&e<1e6)return(e/1e3).toFixed(1)+"K";if(e>=1e6)return(e/1e6).toFixed(1)+"M"}function C(e){!e||e._sfNewTabAttached||(e._sfNewTabAttached=!0,e.addEventListener("click",o=>{if(o.target.closest('[data-sf-action="true"]'))return;let a=o.target.closest("a")||e.querySelector("a");if(!a)return;let t=a.getAttribute("href");if(!t||!t.startsWith("/"))return;o.preventDefault(),o.stopPropagation();let c=new URL(t,"https://www.instagram.com").toString();window.open(c,"_blank","noopener,noreferrer")},!0))}function B(e="",o=null,a=null,t=null,c=null){let n=document.createElement("div");n.innerHTML=e,n.style="position: relative;";let l=document.createElement("div");if(l.style=`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.80);
    opacity: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    font-weight: bold;
  `,o!==null&&a!==null){let i=document.createElement("div");i.style=`
      display: flex;
      gap: 40px;
      align-items: center;
      flex-direction: column;
    `;let m=document.createElement("span");m.style="display: flex; align-items: center; gap: 5px;",m.innerHTML=`
      <img src="${chrome.runtime.getURL("Icons/Hover/LoveIG.png")}" style="width: 16px;" />
      ${o}
    `;let f=document.createElement("span");f.style="display: flex; align-items: center; gap: 5px;",f.innerHTML=`
      <img src="${chrome.runtime.getURL("Icons/Hover/whiteBubble.png")}" style="width: 16px;" />
      ${a}
    `,i.appendChild(m),i.appendChild(f),l.appendChild(i)}let r=document.createElement("div");r.style=`
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    z-index: 10;
    pointer-events: auto;
  `;r.style.display="none";let g=document.createElement("img");if(g.src=chrome.runtime.getURL("Icons/Hover/arrowDownBlack.png"),g.style=`
    width: 9px;
    height: 9px;
    border-radius: 3px;
    background: #fde082;
    padding: 5px;
  `,!document.getElementById("slideInUp")){let i=document.createElement("style");i.id="slideInUp",i.textContent=`
      @keyframes slideInUp {
        0% {
          transform: translateY(100%);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `,document.head.appendChild(i)}r.appendChild(g);let s=document.createElement("div");s.textContent="Download",s.style=`
    position: absolute;
    top: 50%;
    left: -6px;
    transform: translate(-100%, -50%);
    background: #000;
    color: #fff;
    font-size: 10px;
    line-height: 1;
    padding: 4px 8px;
    border-radius: 6px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    z-index: 99999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: opacity 120ms ease;
  `,r.appendChild(s),r.addEventListener("mouseenter",()=>{g.style.boxShadow="0 0 0 0.5px #fde082, 0 0 12px 2px #fde082aa",s.style.opacity="1"}),r.addEventListener("mouseleave",()=>{g.style.filter="brightness(1)",g.style.boxShadow="",s.style.opacity="0"}),r.addEventListener("click",i=>{i.stopPropagation(),window.postMessage({download:!0,download_item:"posts",download_post_id:t,download_profile_name:c})});let p=document.createElement("div");return p.style=`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
  `,p.appendChild(l),p.appendChild(r),n.appendChild(p),n.addEventListener("mouseenter",()=>{l.style.opacity="1",r.style.opacity="1",g.style.animation="slideInUp 0.2s ease-out forwards"}),n.addEventListener("mouseleave",i=>{let m=i.relatedTarget;n.contains(m)||(l.style.opacity="0",r.style.opacity="0",g.style.animation="")}),r.dataset.sfAction="true",C(n),n}function $(e="",o=null,a=null,t=null,c=null,n=null){let l=document.createElement("div");l.style="position: relative;";let r=document.createElement("div");r.innerHTML=e,l.appendChild(r);let g=document.createElement("div");if(g.style=`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.80);
    opacity: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    font-weight: bold;
  `,o!==null&&a!==null){let u=document.createElement("div");u.style=`
      display: flex;
      gap: 40px;
      align-items: center;
      flex-direction: column;
    `;let y=document.createElement("span");y.style="display: flex; align-items: center; gap: 5px;",y.innerHTML=`
      <img src="${chrome.runtime.getURL("Icons/Hover/LoveIG.png")}" style="width: 16px;" />
      ${o}
    `;let v=document.createElement("span");v.style="display: flex; align-items: center; gap: 5px;",v.innerHTML=`
      <img src="${chrome.runtime.getURL("Icons/Hover/whiteBubble.png")}" style="width: 16px;" />
      ${a}
    `,u.appendChild(y),u.appendChild(v),g.appendChild(u)}let s=document.createElement("div");s.style=`
    position: absolute;
    bottom: 10px; right: 10px;
    display: flex; flex-direction: column; gap: 5px;
    align-items: flex-end;
    opacity: 0; z-index: 10;
    pointer-events: auto;
  `;let p=document.createElement("div");p.style=`
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative;
  `;let i=document.createElement("img");i.src=chrome.runtime.getURL("Icons/Hover/trans.png"),i.style=`
    width: 9px; height: 9px; border-radius: 3px;
    background: #fde082; padding: 5px;
  `,p.appendChild(i);let m=document.createElement("div");m.textContent="Transcribe",m.style=`
    position: absolute; top: 50%; left: -6px;
    transform: translate(-100%, -50%);
    background: #000; color: #fff; font-size: 10px; line-height: 1;
    padding: 4px 8px; border-radius: 6px; white-space: nowrap;
    opacity: 0; pointer-events: none; z-index: 99999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: opacity 120ms ease;
  `,p.appendChild(m),p.addEventListener("mouseenter",()=>{i.style.filter="brightness(0.7)",i.style.boxShadow="0 0 0 0.5px #fde082, 0 0 12px 2px #fde082aa",m.style.opacity="1"}),p.addEventListener("mouseleave",()=>{i.style.filter="brightness(1)",i.style.boxShadow="",m.style.opacity="0"}),p.addEventListener("click",u=>{u.stopPropagation(),window.postMessage({trans:!0,download_reel_id:t,download_profile_name:c,download_reel_id_ui:n})});let f=document.createElement("div");f.style=`
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative;
  `;let d=document.createElement("img");d.src=chrome.runtime.getURL("Icons/Hover/arrowDownBlack.png"),d.style=`
    width: 9px; height: 9px; border-radius: 3px;
    background: #fde082; padding: 5px;
  `,f.appendChild(d);let x=document.createElement("div");if(x.textContent="Download",x.style=`
    position: absolute; top: 50%; left: -6px;
    transform: translate(-100%, -50%);
    background: #000; color: #fff; font-size: 10px; line-height: 1;
    padding: 4px 8px; border-radius: 6px; white-space: nowrap;
    opacity: 0; pointer-events: none; z-index: 99999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: opacity 120ms ease;
  `,f.appendChild(x),f.addEventListener("mouseenter",()=>{d.style.filter="brightness(0.7)",d.style.boxShadow="0 0 0 0.5px #fde082, 0 0 12px 2px #fde082aa",x.style.opacity="1"}),f.addEventListener("mouseleave",()=>{d.style.filter="brightness(1)",d.style.boxShadow="",x.style.opacity="0"}),f.addEventListener("click",u=>{u.stopPropagation(),window.postMessage({download:!0,download_item:"reels",download_reel_id:t,download_profile_name:c})}),!document.getElementById("slideInUp")){let u=document.createElement("style");u.id="slideInUp",u.textContent=`
      @keyframes slideInUp {
        0% { transform: translateY(100%); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
    `,document.head.appendChild(u)}let h=document.createElement("div");return h.style=`
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 10; pointer-events: none;
  `,s.style.pointerEvents="auto",g.style.pointerEvents="none",s.appendChild(p),s.appendChild(f),h.appendChild(g),h.appendChild(s),l.appendChild(h),l.addEventListener("mouseover",()=>{g.style.opacity="1",s.style.opacity="1",d.style.animation="slideInUp 0.2s ease-out forwards",i.style.animation="slideInUp 0.2s ease-out forwards"}),l.addEventListener("mouseout",u=>{let y=u.relatedTarget;y&&l.contains(y)||(g.style.opacity="0",s.style.opacity="0",d.style.animation="",i.style.animation="")}),p.dataset.sfAction="true",f.dataset.sfAction="true",C(l),l}function T(e="",o=null,a=null,t=null,c=null,n=null,l=null){let r=document.createElement("div");r.style="position: relative;";let g=document.createElement("div");g.innerHTML=e,r.appendChild(g);let s=document.createElement("div");if(s.style=`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.80);
    opacity: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 15px;
    font-weight: bold;
  `,o!==null&&a!==null&&t!==null){let y=document.createElement("div");y.style=`
      display: flex;
      flex-direction: column;
      gap: 30px;
      align-items: center;
    `;let v=(w,E)=>{let I=document.createElement("span");return I.style="display: flex; align-items: center; gap: 5px;",I.innerHTML=`
        <img src="${w}" style="width: 15px;" />
        ${E}
      `,I};y.appendChild(v(chrome.runtime.getURL("Icons/Hover/PlayIG.png"),t)),y.appendChild(v(chrome.runtime.getURL("Icons/Hover/LoveWhite.png"),o)),y.appendChild(v(chrome.runtime.getURL("Icons/Hover/whiteBubble.png"),a)),s.appendChild(y)}let p=document.createElement("div");p.style=`
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    gap: 5px;
    opacity: 0;
    z-index: 10;
    pointer-events: auto;
    flex-direction: column;      /* \u2B05\uFE0F stack buttons vertically */
    align-items: flex-end;       /* \u2B05\uFE0F keep them right-aligned */
  `;let i=document.createElement("div");i.style=`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative; /* for centered tooltip */
  `;let m=document.createElement("img");m.src=chrome.runtime.getURL("Icons/Hover/trans.png"),m.style=`
    width: 9px;
    height: 9px;
    border-radius: 3px;
    background: #fde082;
    padding: 5px;
  `,i.appendChild(m);let f=document.createElement("div");f.textContent="Transcribe",f.style=`
    position: absolute;
    top: 50%;
    left: -6px;
    transform: translate(-100%, -50%);
    background: #000;
    color: #fff;
    font-size: 10px;
    line-height: 1;
    padding: 4px 8px;
    border-radius: 6px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    z-index: 99999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: opacity 120ms ease;
  `,i.appendChild(f),i.addEventListener("mouseenter",()=>{m.style.filter="brightness(0.7)",m.style.boxShadow="0 0 0 0.5px #fde082, 0 0 12px 2px #fde082aa",f.style.opacity="1"}),i.addEventListener("mouseleave",()=>{m.style.filter="brightness(1)",m.style.boxShadow="",f.style.opacity="0"}),i.addEventListener("click",y=>{y.stopPropagation(),window.postMessage({trans:!0,download_reel_id:c,download_profile_name:n,download_reel_id_ui:l})});let d=document.createElement("div");d.style=`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative; /* for centered tooltip */
  `;let x=document.createElement("img");if(x.src=chrome.runtime.getURL("Icons/Hover/arrowDownBlack.png"),x.style=`
    width: 9px;
    height: 9px;
    border-radius: 3px;
    background: #fde082;
    padding: 5px;
  `,!document.getElementById("slideInUp")){let y=document.createElement("style");y.id="slideInUp",y.textContent=`
      @keyframes slideInUp {
        0% {
          transform: translateY(100%);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `,document.head.appendChild(y)}d.appendChild(x);let h=document.createElement("div");h.textContent="Download",h.style=`
    position: absolute;
    top: 50%;
    left: -6px;
    transform: translate(-100%, -50%);
    background: #000;
    color: #fff;
    font-size: 10px;
    line-height: 1;
    padding: 4px 8px;
    border-radius: 6px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    z-index: 99999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: opacity 120ms ease;
  `,d.appendChild(h),p.appendChild(i),p.appendChild(d),d.addEventListener("mouseenter",()=>{x.style.filter="brightness(0.7)",x.style.boxShadow="0 0 0 0.5px #fde082, 0 0 12px 2px #fde082aa",h.style.opacity="1"}),d.addEventListener("mouseleave",()=>{x.style.filter="brightness(1)",x.style.boxShadow="",h.style.opacity="0"}),d.addEventListener("click",y=>{y.stopPropagation(),window.postMessage({download:!0,download_item:"reels",download_reel_id:c,download_profile_name:n})});let u=document.createElement("div");return u.style=`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none; /* non-interactive container */
`,p.style.pointerEvents="auto",s.style.pointerEvents="none",u.appendChild(s),u.appendChild(p),r.appendChild(u),r.addEventListener("mouseover",()=>{s.style.opacity="1",p.style.opacity="1",x.style.animation="slideInUp 0.2s ease-out forwards",m.style.animation="slideInUp 0.2s ease-out forwards"}),r.addEventListener("mouseout",y=>{let v=y.relatedTarget;v&&r.contains(v)||(s.style.opacity="0",p.style.opacity="0",x.style.animation="",m.style.animation="")}),i.dataset.sfAction="true",d.dataset.sfAction="true",C(r),r}function _(){console.log("removed session storage"),sessionStorage.removeItem("isorterSortBy"),sessionStorage.removeItem("isorterNoItems"),sessionStorage.removeItem("isorterStatus"),sessionStorage.removeItem("isorterData"),sessionStorage.removeItem("isorterDataSorted"),sessionStorage.removeItem("isorterPostsVSReels"),sessionStorage.removeItem("isorterProfileName"),sessionStorage.removeItem("isorterItemsVsDates")}function k(){let a=document.getElementsByTagName("main")[0].getElementsByTagName("div")[0].querySelector('[role="tablist"]')?.parentElement;if(!a)return null;let t=a.nextElementSibling;for(;t&&t.tagName!=="DIV";)t=t.nextElementSibling;return t}function H(e,o){return new Promise(a=>{if(o==="Posts"){let t=k();t.style.display="none";let c=document.createElement("div");c.id="div_most_viewed_reels",c.setAttribute("data-isorter","true"),c.className=t.className,c.style="display: flex; flex-direction: column; padding-bottom: 0px; padding-top: 0px; position: relative;",t.after(c);let n=document.getElementById("div_most_viewed_reels");for(let l=0;l<e.length;l+=4){let r=document.createElement("div");for(r.className="_ac7v xat24cr x1f01sob xcghwft xzboxd6",e.slice(l,l+4).forEach(s=>{if(s.mediaType==2){let p=$(s.element,b(s.likesCount),b(s.commentsCount),s.postID,s.userName,s.code);r.appendChild(p)}else{let p=B(s.element,b(s.likesCount),b(s.commentsCount),s.postID,s.userName);r.appendChild(p)}});r.children.length<4;){let s=document.createElement("div");s.className="x11i5rnm x1ntc13c x9i3mqj x2pgyrj",r.appendChild(s)}n.appendChild(r)}a(!0)}else if(o==="Reels"){let t=k();t.style.display="none";let c=document.createElement("div");c.id="div_most_viewed_reels",c.setAttribute("data-isorter","true"),c.className=t.className,c.style="display: flex; flex-direction: column; padding-bottom: 0px; padding-top: 0px; position: relative;",t.after(c);let n=document.getElementById("div_most_viewed_reels");for(let l=0;l<e.length;l+=4){let r=document.createElement("div");for(r.className="_ac7v xat24cr x1f01sob xcghwft xzboxd6",e.slice(l,l+4).forEach(s=>{let p=T(s.element,b(s.likesCount),b(s.commentsCount),b(s.viewCount),s.reelID,s.userName,s.code);p.querySelectorAll("li").forEach(i=>{let m=i.querySelectorAll("span");m.length>=2&&(m[0].remove(),m[1].remove(),m[2].remove())}),r.appendChild(p)});r.children.length<4;){let s=document.createElement("div");s.className="x11i5rnm x1ntc13c x9i3mqj x2pgyrj",r.appendChild(s)}n.appendChild(r)}a(!0)}})}function N(e,o,a,t){if(a==="items")return`Latest ${e} ${o}`;if(a==="dates"&&t==="1_week")return`${e} ${o} from 1 Week Back`;if(a==="dates"&&t==="1_month")return`${e} ${o} from 1 Month Back`;if(a==="dates"&&t==="3_month")return`${e} ${o} from 3 Months Back`;if(a==="dates"&&t==="6_month")return`${e} ${o} from 6 Months Back`;if(a==="dates"&&t==="1_year")return`${e} ${o} from 1 Year Back`;if(a==="dates"&&t==="all_reels")return`${e} ${o}`}function P(e,o){if(e==="views")return`Most Viewed ${o}`;if(e==="comments")return`Most Commented ${o}`;if(e==="likes")return`Most Liked ${o}`;if(e==="oldest")return`Oldest ${o}`}function U(e,o){return e===1?o.slice(0,-1):o}function z(e,o){let a,t;o==="Posts"?(a=["Profile","Post","Likes","Comments"],t=e.map(n=>{let l=[1,8].includes(n.mediaType)?`https://www.instagram.com/${n.userName}/p/${n.code}/`:`https://www.instagram.com/${n.userName}/reel/${n.code}/`;return[n.userName,l,n.likesCount,n.commentsCount]})):o==="Reels"&&(a=["Profile","Reel","Views","Likes","Comments"],t=e.map(n=>{let l=`https://www.instagram.com/${n.userName}/reel/${n.code}/`;return[n.userName,l,n.viewCount,n.likesCount,n.commentsCount]}));let c=[a,...t].map(n=>n.join("	")).join(`
`);navigator.clipboard.writeText(c)}function M(){let e=document.documentElement;return Array.from(e.classList).some(a=>a.toLowerCase().includes("dark"))?{isDark:!0,backgroundColor:"#0b1014",textColor:"#f2f3f5",bannerBorder:"rgba(255,255,255,0.08)",bannerShadow:"0 1px 3px rgba(0,0,0,0.3)",buttonBg:"transparent",buttonHoverBg:"rgba(255,255,255,0.06)",buttonText:"#f2f3f5",menuBg:"rgba(20, 24, 29, 0.98)",menuBorder:"rgba(255,255,255,0.10)",menuShadow:"0 12px 30px rgba(0,0,0,0.55)",menuItemHoverBg:"rgba(255,255,255,0.08)",menuText:"#f2f3f5",menuMutedText:"rgba(242,243,245,0.7)",copyIcon:"Icons/BannerIcons/whiteCopyBanner.png",exportIcon:"Icons/BannerIcons/whiteExportBanner.png",checkIcon:"Icons/BannerIcons/whiteCheckBanner.png"}:{isDark:!1,backgroundColor:"white",textColor:"black",bannerBorder:"rgba(0,0,0,0.08)",bannerShadow:"0 1px 3px rgba(0,0,0,0.06)",buttonBg:"transparent",buttonHoverBg:"rgba(0,0,0,0.04)",buttonText:"#000",menuBg:"rgba(255,255,255,0.98)",menuBorder:"rgba(0,0,0,0.10)",menuShadow:"0 12px 30px rgba(0,0,0,0.12)",menuItemHoverBg:"rgba(0,0,0,0.04)",menuText:"#111",menuMutedText:"rgba(0,0,0,0.55)",copyIcon:"Icons/BannerIcons/blackCopyBanner.png",exportIcon:"Icons/BannerIcons/blackExportBanner.png",checkIcon:"Icons/BannerIcons/blackCheckBanner.png"}}function R(e,o,a){let t=document.getElementById("export-native");if(!t)return;if(t._sf_cleanup&&t._sf_cleanup(),!document.getElementById("sortfeed-export-menu-styles")){let d=document.createElement("style");d.id="sortfeed-export-menu-styles",d.textContent=`
      .sf-menu, .sf-menu * { box-sizing: border-box; }

      .sf-menu {
        position: absolute;
        bottom: calc(100% + 8px);   /* above the button */
        right: 0;
        min-width: 170px;
        padding: 6px;
        border-radius: 10px;

        opacity: 0;
        pointer-events: none;

        transform-origin: bottom right;
        transform: translateY(6px) scale(0.98);

        transition:
          opacity 120ms ease,
          transform 140ms cubic-bezier(.2,.8,.2,1);

        z-index: 2147483647;
      }

      .sf-menu.open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .sf-menu-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        padding: 9px 10px;
        border-radius: 8px;
        cursor: pointer;
        user-select: none;
        font-size: 13px;
        font-weight: 500;
        line-height: 1;
        margin: 0;
      }

      /* \u2705 hide the export tooltip while menu is open */
      #export-native.isorter-menu-open .tooltip {
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `,document.head.appendChild(d)}let c=t.querySelector(".sf-menu");c&&c.remove();let n=document.createElement("div");n.className="sf-menu",n.style.background=e.menuBg,n.style.border=`1px solid ${e.menuBorder}`,n.style.boxShadow=e.menuShadow,n.style.color=e.menuText,n.style.fontFamily="SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",n.style.overflow="hidden",n.style.borderRadius="12px",n.style.padding="6px",n.style.zIndex="2147483647";let l=()=>{let d=t.querySelector(".tooltip");d&&(d.style.opacity="0")},r=(d,x)=>{let h=document.createElement("div");return h.className="sf-menu-item",h.textContent=d,h.addEventListener("mouseenter",()=>{h.style.background=e.menuItemHoverBg}),h.addEventListener("mouseleave",()=>{h.style.background="transparent"}),h.addEventListener("click",u=>{u.stopPropagation(),chrome.runtime.sendMessage({export_click:!0,export_format:x,posts_vs_reels:o,sorted_data:a}),p()}),h};n.appendChild(r("Excel","excel")),n.appendChild(r("CSV","csv")),n.appendChild(r("JSON","json")),t.appendChild(n);let g=()=>n.classList.contains("open"),s=()=>{t.classList.add("isorter-menu-open"),n.classList.add("open"),l()},p=()=>{t.classList.remove("isorter-menu-open"),n.classList.remove("open")},i=()=>g()?p():s();t._sf_clickBound||(t._sf_clickBound=!0,t.addEventListener("click",d=>{d.stopPropagation(),i()}));let m=d=>{t.contains(d.target)||p()};document.addEventListener("click",m);let f=d=>{d.key==="Escape"&&p()};document.addEventListener("keydown",f),t._sf_cleanup=()=>{document.removeEventListener("click",m),document.removeEventListener("keydown",f)}}function L(e=null,o=null,a=null,t=null,c=null,n=null){let l=U(e,o),r=P(a,l),g=N(e,l,c,n),p=document.getElementsByTagName("main")[0].getElementsByTagName("div")[0].querySelectorAll('[role="tablist"]')[0],i=M(),m=document.createElement("div");m.id="banner_most_viewed_reels",m.style=`
    display: flex;
    align-items: center;
    background-color: ${i.backgroundColor};
    color: ${i.textColor};
    padding: 20px 40px;
    justify-content: space-between;
    margin-bottom: 0.2em;
    border: 1px solid ${i.bannerBorder};
    box-shadow: ${i.bannerShadow};
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 0;  /* straight bottom edge */
    border-bottom-right-radius: 0;

      position: relative;     /* \u2705 creates stacking context */
      overflow: visible;      /* \u2705 dropdown can spill outside banner */

  `,m.className="animate__animated animate__bounce",p.replaceWith(m),document.getElementById("banner_most_viewed_reels").innerHTML=`
    <div class="text_section" style="display: flex; flex-direction: row; width: 100%; justify-content: space-between;">
      <div class="metrics_section">
        <div id="reels_number_section" style="display: flex; flex-direction: row; margin-bottom: -2px; align-items: center;">
          <h2 style="color: ${i.textColor}; margin: 0; font-size: 0.8rem; line-height: 1.1667; font-weight: 500; letter-spacing: 0.02em; font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;">
            ${g}
          </h2>
        </div>
        <h1 style="color: ${i.textColor}; margin: 0; font-size: 1.6rem; line-height: 1.1667; font-weight: 600; letter-spacing: -0.01em; font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;">
          ${r}
        </h1>
      </div>

      <div class="button_section" style="display: flex; flex-direction: column; justify-content: center;">
        <div style="display: flex; flex-direction: row; gap: 0.4rem;">

          <!-- Copy Button -->
          <div id="copy-native" style="
            background-color: ${i.buttonBg};
            color: ${i.buttonText};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            padding: 0.7rem;
            border-radius: 4px;
            transition: all 0.15s ease;
          ">
            <img src="${chrome.runtime.getURL(i.copyIcon)}" style="
              width: 1.1rem;
              height: auto;
              pointer-events: none;
            "/>
            <div class="tooltip" style="
              position: absolute;
              bottom: calc(100% + 6px);
              left: 50%;
              transform: translateX(-50%) translateY(4px);
              background-color: rgba(0, 0, 0, 0.85);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 0.75rem;
              font-weight: 500;
              white-space: nowrap;
              pointer-events: none;
              opacity: 0;
              transition: all 0.2s ease;
              font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
              z-index: 1000;
            ">Copy CSV</div>
          </div>

          <!-- Export Button -->
          <div id="export-native" style="
            background-color: ${i.buttonBg};
            color: ${i.buttonText};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            padding: 0.7rem;
            border-radius: 4px;
            transition: all 0.15s ease;
          ">
            <img src="${chrome.runtime.getURL(i.exportIcon)}" style="
              width: 1.1rem;
              height: auto;
              pointer-events: none;
            "/>
            <div class="tooltip" style="
              position: absolute;
              bottom: calc(100% + 6px);
              left: 50%;
              transform: translateX(-50%) translateY(4px);
              background-color: rgba(0, 0, 0, 0.85);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 0.75rem;
              font-weight: 500;
              white-space: nowrap;
              pointer-events: none;
              opacity: 0;
              transition: all 0.2s ease;
              font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
              z-index: 1000;
            ">Export</div>
          </div>

        </div>
      </div>
    </div>
  `;let f=document.getElementById("reels_number_section"),d=document.createElement("img");d.src=chrome.runtime.getURL("Icons/128.png"),d.style=`
    width: auto;
    margin-right: 0.2rem;
    height: 0.7rem;
  `,f.insertBefore(d,f.firstChild);let x=document.getElementById("export-native"),h=x.querySelector(".tooltip");x.addEventListener("mouseover",()=>{x.classList.contains("isorter-menu-open")||(x.style.backgroundColor=i.buttonHoverBg||"rgba(0,0,0,0.04)",h.style.opacity="1",h.style.transform="translateX(-50%) translateY(0)")}),x.addEventListener("mouseout",()=>{x.style.backgroundColor=i.buttonBg,h.style.opacity="0",h.style.transform="translateX(-50%) translateY(4px)"});let u=document.getElementById("copy-native"),y=u.querySelector(".tooltip");u.addEventListener("mouseover",()=>{u.style.backgroundColor=i.buttonHoverBg||"rgba(0,0,0,0.04)",y.style.opacity="1",y.style.transform="translateX(-50%) translateY(0)"}),u.addEventListener("mouseout",()=>{u.style.backgroundColor=i.buttonBg,y.style.opacity="0",y.style.transform="translateX(-50%) translateY(4px)"}),R(i,o,t),u.addEventListener("click",()=>{z(t,o);let v=u.querySelector(".tooltip"),w=u.querySelector("img"),E=v.textContent,I=w.src;v.textContent="Copied!",w.src=chrome.runtime.getURL(i.checkIcon),setTimeout(()=>{v.textContent=E,w.src=I},1500)})}function F(){document.querySelectorAll('img[style*="visibility: hidden"]').forEach(e=>{e.style.visibility="visible"})}function D(){let e=document.querySelector('[role="tablist"]');if(e){let o=e.parentElement,a=Array.from(o.children),t=a.indexOf(e),c=a[t+1];c&&(c.remove(),console.log("Next sibling removed:",c))}}window.addEventListener("message",e=>{if(e.source===window){if(e.data.logo_animate_off){let o=e.data.payload,a=sessionStorage.getItem("isorterPostsVSReels");H(o,a).then(()=>{let t=o.length,c=sessionStorage.getItem("isorterSortBy"),n=sessionStorage.getItem("isorterPostsVSReels"),l=sessionStorage.getItem("isorterItemsVsDates"),r=sessionStorage.getItem("isorterNoItems");window.scrollTo({top:0,behavior:"smooth"}),F();let g=()=>{window.scrollY===0?L(t,n,c,o,l,r):requestAnimationFrame(g)};requestAnimationFrame(g),_(),chrome.runtime.sendMessage({logo_animate_off:!0})})}else if(e.data.logo_animate_off_zero_insta_time_period){let o=null,a=sessionStorage.getItem("isorterSortBy"),t=0,c=sessionStorage.getItem("isorterItemsVsDates"),n=sessionStorage.getItem("isorterNoItems");window.scrollTo({top:0,behavior:"smooth"}),D(),L(t,"Posts",a,o,c,n),_(),chrome.runtime.sendMessage({logo_animate_off:!0})}else if(e.data.item_collected_no){let o=e.data.number_items;chrome.runtime.sendMessage({item_collected_no:!0,number_items:o})}}});window.addEventListener("load",function(){sessionStorage.getItem("isorterStatus")&&(S(),chrome.runtime.sendMessage({logo_animate_on:!0}))});})();
