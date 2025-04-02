"use strict";var w=Object.create;var f=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var C=Object.getPrototypeOf,M=Object.prototype.hasOwnProperty;var k=(e,t)=>{for(var n in t)f(e,n,{get:t[n],enumerable:!0})},m=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of x(t))!M.call(e,c)&&c!==n&&f(e,c,{get:()=>t[c],enumerable:!(r=E(t,c))||r.enumerable});return e};var y=(e,t,n)=>(n=e!=null?w(C(e)):{},m(t||!e||!e.__esModule?f(n,"default",{value:e,enumerable:!0}):n,e)),b=e=>m(f({},"__esModule",{value:!0}),e);var R={};k(R,{activate:()=>A,deactivate:()=>I});module.exports=b(R);var s=y(require("vscode"));var u=y(require("vscode"));function g(e,t={}){if(!e||typeof e!="string")return e;try{let n=e.normalize("NFD");return n=n.replace(/[\u0300-\u036f]/g,""),Array.from(n).map(r=>t[r]||r).join("")}catch{return e}}function h(e){if(!e||typeof e!="object")return u.l10n.t("Invalid mappings: Not an object.");for(let[t,n]of Object.entries(e)){if(typeof t!="string"||t.length!==1)return u.l10n.t('Invalid key: "{key}". Keys must be single characters.',{key:t});if(typeof n!="string")return u.l10n.t('Invalid value for key "${key}": "${value}". Values must be strings.',{key:t,value:n})}return""}function A(e){let t=s.commands.registerCommand("ps-replace-accents.replaceAccents",async()=>{try{let n=s.window.activeTextEditor;if(!n)return;let r=n.document,c=n.selections;if(r.uri.scheme!=="file"&&r.uri.scheme!=="untitled"){s.window.showErrorMessage(s.l10n.t('Cannot modify "{type}" type of document',{type:r.uri.scheme}));return}let o=s.workspace.getConfiguration("ps-replace-accents").get("specialCharacterMappings",{}),a=h(o);if(a){s.window.showErrorMessage(a);return}let l=!c.length||c.every(i=>i.isEmpty),d=!1;if(await n.edit(i=>{d=l?T(i,r,o):S(i,r,c,o)}),d){let i=l?s.l10n.t("All accented characters were replaced in the entire document."):s.l10n.t("All accented characters were replaced in the selected text.");s.window.showInformationMessage(i)}}catch(n){let r=n instanceof Error?n.message:s.l10n.t("Unknown error");s.window.showErrorMessage(s.l10n.t("Unable to replace accents: {errorMessage}. If this persists, please try reopening the file or restarting VS Code.",{errorMessage:r}))}});e.subscriptions.push(t)}function T(e,t,n){let r=!1;if(t.lineCount===0)return r;let c=1e3;for(let o=0;o<t.lineCount;o+=c){let a=Math.min(o+c-1,t.lineCount-1),l=new s.Position(o,0),d=t.lineAt(a).range.end,i=new s.Range(l,d),p=t.getText(i),v=g(p,n);p!==v&&(e.replace(i,v),r=!0)}return r}function S(e,t,n,r){let c=!1;for(let o of n)if(!o.isEmpty)for(let a=o.start.line;a<=o.end.line;a++){let l=t.lineAt(a),d=new s.Range(a===o.start.line?o.start:l.range.start,a===o.end.line?o.end:l.range.end),i=t.getText(d),p=g(i,r);i!==p&&(e.replace(d,p),c=!0)}return c}function I(){}0&&(module.exports={activate,deactivate});
