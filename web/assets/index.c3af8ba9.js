import{_ as y,r as t,o as n,c as o,w as u,a as s,n as h,b as f,d as x,t as p,e as k,F as P,f as l}from"./index.0ed467a8.js";const B={name:"routerMenu",data(){return{}},props:["route","supPath"],computed:{indexPath:function(){let r="";return this.supPath&&(r=this.supPath),this.route.redirect&&this.route.children.length===1?r+=this.route.redirect.startsWith("/")?this.route.redirect:"/"+this.route.redirect:r+=this.route.path.startsWith("/")?this.route.path:"/"+this.route.path,r}},methods:{}},N={class:"navtitle"},V={class:"navtitle"};function F(r,g,e,M,v,a){const i=t("routerMenu",!0),c=t("el-submenu"),_=t("el-menu-item");return e.route&&e.route.children&&(e.route.children.length>1||!e.route.redirect&&e.route.children.length===1)?(n(),o(c,{key:0,index:a.indexPath,class:h({navLeft:e.supPath})},{title:u(()=>[e.route.meta.icon?(n(),s("i",{key:0,class:h(e.route.meta.icon)},null,2)):f("",!0),x("span",N,p(e.route.meta.title),1)]),default:u(()=>[(n(!0),s(P,null,k(e.route.children,(d,m)=>(n(),o(i,{key:m,supPath:a.indexPath,route:d},null,8,["supPath","route"]))),128))]),_:1},8,["index","class"])):e.route.meta&&e.route.meta.title?(n(),o(_,{key:1,index:a.indexPath},{title:u(()=>[e.route.meta.icon?(n(),s("i",{key:0,class:h(e.route.meta.icon)},null,2)):f("",!0),x("span",V,p(e.route.meta.title),1)]),_:1},8,["index"])):f("",!0)}var L=y(B,[["render",F]]);const W={name:"layout",data(){return{isCollapse:!1}},components:{routerMenu:L},mounted(){}};function q(r,g,e,M,v,a){const i=t("routerMenu"),c=t("el-menu"),_=t("el-aside"),d=t("router-view"),m=t("el-main"),C=t("el-container");return n(),o(C,null,{default:u(()=>[l(_,{width:"200px"},{default:u(()=>[l(c,{uniqueOpened:!0,collapse:v.isCollapse,"default-active":r.$route.path,router:!0,class:"el-menu-vertical-demo","background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"},{default:u(()=>[(n(!0),s(P,null,k(r.$router.options.routes,(b,w)=>(n(),o(i,{key:w,route:b},null,8,["route"]))),128))]),_:1},8,["collapse","default-active"])]),_:1}),l(m,null,{default:u(()=>[l(d)]),_:1})]),_:1})}var D=y(W,[["render",q]]);export{D as default};