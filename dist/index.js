(()=>{"use strict";class t{constructor(t){this.len=t,this.hits=0,this.sunk=!1}hit(){this.hits+=1}isSunk(){return this.hits>=this.len&&(this.sunk=!0,!0)}}class e{constructor(){this.board=[];for(let t=0;t<10;t++)for(let e=0;e<10;e++)this.board.push([t,e]);this.ships=[],this.index=0,this.actualShips=[]}showShips(){for(let t=0;t<this.actualShips.length;t++)console.log(this.actualShips[t])}reset(){for(let t=0;t<10;t++)for(let e=0;e<10;e++)this.board.push([t,e]);this.ships=[],this.index=0,this.actualShips=[]}place(t,e,s,a,l){const i=this.index;if(this.actualShips[i]=t,"horizontal"==a)for(let a=s;a<s+t.len;a++)document.querySelector(`${l}[data-x="${e}"][data-y="${a}"]`).classList.add("ship"),this.ships.push([e,a,i]);else for(let a=e;a<e+t.len;a++)document.querySelector(`${l}[data-x="${a}"][data-y="${s}"]`).classList.add("ship"),this.ships.push([a,s,i]);this.index+=1}hitted(t,e){for(let s=0;s<this.ships.length;s++)if(this.ships[s][0]==t&&this.ships[s][1]==e)return this.actualShips[this.ships[s][2]].hits+=1,!0;return!1}recieveAttack(t,e,s){let a=!1;const l=document.querySelector(`${s}[data-x="${t}"][data-y="${e}"]`);l||console.log("Cell not found"),this.hitted(t,e)&&(l.classList.add("hit"),a=!0),a||l.classList.add("miss")}allShipsHit(t){for(const e of t)if(!e.classList.contains("hit"))return!1;return!0}print(){for(let t=0;t<this.board.length;t++)console.log(this.board[t])}}class s{attack(t,e,s){s.recieveAttack(t,e)}move(){return[Math.floor(10*Math.random()),Math.floor(10*Math.random())]}}function a(t,e){const s=document.getElementById(e);for(let t=0;t<10;t++)for(let a=0;a<10;a++){const l=document.createElement("div");l.dataset.x=t,l.dataset.y=a,"ai"==e?l.classList.add("aiCell"):l.classList.add("playerCell"),l.classList.add("cell"),s.appendChild(l)}}let l,i,n=!0,o="horizontal",c=!1;new s;const r=new e;a(0,"player");const d=new s,h=new e;a(0,"ai"),document.getElementById("dir").addEventListener("click",(function(){o="horizontal"==o?"vertical":"horizontal"})),document.getElementById("start").addEventListener("click",(function(){h.place(new t(5),0,0,"horizontal",".aiCell"),h.place(new t(4),1,5,"horizontal",".aiCell"),h.place(new t(3),2,3,"horizontal",".aiCell"),h.place(new t(2),3,2,"horizontal",".aiCell");const e=document.querySelectorAll(".playerCell");let s=[5,4,3,2],a=0;e.forEach((e=>{e.addEventListener("mouseover",(()=>{const t=parseInt(e.dataset.x),l=parseInt(e.dataset.y);if("horizontal"==o){if(l+s[a]<=10)for(let e=l;e<l+s[a];e++)document.querySelector(`.playerCell[data-x="${t}"][data-y="${e}"]`).classList.add("maybe")}else if(t+s[a]<=10)for(let e=t;e<t+s[a];e++)document.querySelector(`.playerCell[data-x="${e}"][data-y="${l}"]`).classList.add("maybe")})),e.addEventListener("click",(function(){const l=parseInt(e.dataset.x),i=parseInt(e.dataset.y);r.place(new t(s[a]),l,i,o,".playerCell"),a++,a>=4&&(document.getElementById("result").textContent="BEGIN!",n=!1),console.log(r)})),e.addEventListener("mouseout",(()=>{const t=parseInt(e.dataset.x),l=parseInt(e.dataset.y);for(let e=0;e<s[a];e++)"horizontal"==o?document.querySelector(`.playerCell[data-x="${t}"][data-y="${l+e}"]`).classList.remove("maybe"):document.querySelector(`.playerCell[data-x="${t+e}"][data-y="${l}"]`).classList.remove("maybe")}))}))})),document.getElementById("again").addEventListener("click",(function(){c=!1;const t=document.querySelectorAll(".playerCell"),e=document.querySelectorAll(".aiCell");t.forEach((t=>{t.classList.contains("ship")?t.classList.remove("ship"):t.classList.contains("hit")?t.classList.remove("hit"):t.classList.contains("miss")?t.classList.remove("miss"):t.classList.contains("maybe")&&t.classList.remove("maybe")})),r.reset(),e.forEach((t=>{t.classList.contains("ship")?t.classList.remove("ship"):t.classList.contains("hit")?t.classList.remove("hit"):t.classList.contains("miss")?t.classList.remove("miss"):t.classList.contains("maybe")&&t.classList.remove("maybe")})),h.reset()})),document.querySelectorAll(".aiCell").forEach((t=>{t.addEventListener("click",(()=>{!function(t,e){if(!n)if(n||(l=document.querySelectorAll(".playerCell.ship"),i=document.querySelectorAll(".aiCell.ship")),c)console.log("GAME OVER");else if(r.allShipsHit(l))c=!0,document.getElementById("result").innerHTML="ai won";else if(h.allShipsHit(i))c=!0,document.getElementById("result").innerHTML="player won";else{h.recieveAttack(t,e,".aiCell");const[s,a]=d.move();r.recieveAttack(s,a,".playerCell")}}(parseInt(t.dataset.x),parseInt(t.dataset.y))}))}))})();