!function(){var t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")},n={intervalId:null,start:function(){t.startBtn.disabled=!0,t.stopBtn.disabled=!1,n.intervalId=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)},stop:function(){t.startBtn.disabled=!1,t.stopBtn.disabled=!0,clearInterval(n.intervalId)}};t.startBtn.addEventListener("click",n.start),t.stopBtn.addEventListener("click",n.stop)}();
//# sourceMappingURL=01-color-switcher.d6cb8989.js.map
