const e={style:"currency",currency:"USD",minimumFractionDigits:2},c=(r,n={})=>{const t={...e,...n};return new Intl.NumberFormat("en-US",t).format(Number.isFinite(r)?r:0)};export{c as f};
