import{_ as a,o as r,a as s,d}from"./index.9bdaf821.js";function l(e){localStorage.setItem(e,e)}const i={name:"login",data(){return{}},mounted(){},methods:{login(){l("signed"),this.$router.push("/dashboard")}}};function c(e,o,u,m,f,t){return r(),s("div",null,[d("button",{onClick:o[0]||(o[0]=(...n)=>t.login&&t.login(...n))},"login")])}var p=a(i,[["render",c]]);export{p as default};
