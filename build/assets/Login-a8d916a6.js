import{r,e as u,d as p,j as s,B as h}from"./index-23f63bfb.js";import{P as f}from"./PageNav-22bbc544.js";import"./Logo-30d9df09.js";const g="_login_1mydq_1",x="_form_1mydq_8",j="_row_1mydq_22",a={login:g,form:x,row:j};function y(){const[t,n]=r.useState("prsshahrivar@gmail.com"),[o,l]=r.useState("1234"),{login:m,isAuthenticated:i}=u(),c=p();function d(e){e.preventDefault(),t&&o&&m(t,o)}return r.useEffect(function(){i&&c("/app/cities",{replace:!0})},[i]),s.jsxs("main",{className:a.login,children:[s.jsx(f,{}),s.jsxs("form",{className:a.form,onSubmit:d,children:[s.jsxs("div",{className:a.row,children:[s.jsx("label",{htmlFor:"email",children:"Email address"}),s.jsx("input",{type:"email",id:"email",onChange:e=>n(e.target.value),value:t})]}),s.jsxs("div",{className:a.row,children:[s.jsx("label",{htmlFor:"password",children:"Password"}),s.jsx("input",{type:"password",id:"password",onChange:e=>l(e.target.value),value:o})]}),s.jsx("div",{children:s.jsx(h,{type:"primary",children:"Login"})})]})]})}export{y as default};
