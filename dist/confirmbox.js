define("arale/dialog/1.1.0/confirmbox",["$","./dialog","arale/overlay/1.1.0/overlay-debug","$-debug","arale/position/1.0.0/position-debug","arale/iframe-shim/1.0.1/iframe-shim-debug","arale/widget/1.1.0/widget-debug","arale/base/1.1.0/base-debug","arale/class/1.0.0/class-debug","arale/events/1.1.0/events-debug","arale/overlay/1.1.0/mask","arale/position/1.0.0/position","arale/iframe-shim/1.0.1/iframe-shim","arale/widget/1.1.0/widget","arale/base/1.1.0/base","arale/class/1.0.0/class","arale/events/1.1.0/events","arale/templatable/0.9.0/templatable-debug","gallery/handlebars/1.0.1/handlebars-debug","./dialog.handlebars","./confirmbox.handlebars","./dialog.css"],function(e,t,a){var i=e("$"),r=e("./dialog"),n=e("./confirmbox.handlebars");e("./dialog.css");var s=r.extend({attrs:{content:"",title:"默认标题",confirmTpl:'<a class="ui-dialog-button-orange">确定</a>',cancelTpl:'<a class="ui-dialog-button-white">取消</a>',message:"默认内容"},parseElement:function(){var e={classPrefix:this.get("classPrefix"),message:this.get("message"),title:this.get("title"),confirmTpl:this.get("confirmTpl"),cancelTpl:this.get("cancelTpl"),hasFoot:this.get("confirmTpl")||this.get("cancelTpl")};this.set("content",n(e)),s.superclass.parseElement.call(this)},events:{"click [data-role=confirm]":function(e){e.preventDefault(),this.trigger("confirm")},"click [data-role=cancel]":function(e){e.preventDefault(),this.hide()}},_onChangeMessage:function(e){this.$("[data-role=message]").html(e)},_onChangeTitle:function(e){this.$("[data-role=title]").html(e)},_onChangeConfirmTpl:function(e){this.$("[data-role=confirm]").html(e)},_onChangeCancelTpl:function(e){this.$("[data-role=cancel]").html(e)}});s.alert=function(e,t,a){var r={message:e,title:"",cancelTpl:"",closeTpl:"",onConfirm:function(){t&&t(),this.hide()}};new s(i.extend(null,r,a)).show().after("hide",function(){this.destroy()})},s.confirm=function(e,t,a,r){var n={message:e,title:t||"确认框",closeTpl:"",onConfirm:function(){a&&a(),this.hide()}};new s(i.extend(null,n,r)).show().after("hide",function(){this.destroy()})},s.show=function(e,t,a){var r={message:e,title:"",confirmTpl:!1,cancelTpl:!1};new s(i.extend(null,r,a)).show().before("hide",function(){t&&t()}).after("hide",function(){this.destroy()})},a.exports=s}),define("arale/dialog/1.1.0/dialog",["$","arale/overlay/1.1.0/overlay-debug","$-debug","arale/position/1.0.0/position-debug","arale/iframe-shim/1.0.1/iframe-shim-debug","arale/widget/1.1.0/widget-debug","arale/base/1.1.0/base-debug","arale/class/1.0.0/class-debug","arale/events/1.1.0/events-debug","arale/overlay/1.1.0/mask","arale/position/1.0.0/position","arale/iframe-shim/1.0.1/iframe-shim","arale/widget/1.1.0/widget","arale/base/1.1.0/base","arale/class/1.0.0/class","arale/events/1.1.0/events","arale/templatable/0.9.0/templatable-debug","gallery/handlebars/1.0.1/handlebars-debug"],function(e,t,a){function i(e){null==e.attr("tabindex")&&e.attr("tabindex","-1")}function r(e){var t=e[0].contentWindow.document;return t.body.scrollHeight&&t.documentElement.scrollHeight?Math.min(t.body.scrollHeight,t.documentElement.scrollHeight):t.documentElement.scrollHeight?t.documentElement.scrollHeight:t.body.scrollHeight?t.body.scrollHeight:void 0}var n=e("$"),s=e("arale/overlay/1.1.0/overlay-debug"),l=e("arale/overlay/1.1.0/mask"),o=e("arale/events/1.1.0/events"),c=e("arale/templatable/0.9.0/templatable-debug"),h=".dialog",d="300px",f=s.extend({Implements:c,attrs:{template:e("arale/dialog/1.1.0/dialog.handlebars"),trigger:{value:null,getter:function(e){return n(e)}},classPrefix:"ui-dialog",content:{value:"",setter:function(e){return/^(https?:\/\/|\/|\.\/|\.\.\/)/.test(e)&&(this._type="iframe"),e}},hasMask:!0,closeTpl:"×",width:500,height:null,effect:"none",zIndex:999,autoFit:!0,align:{selfXY:["50%","50%"],baseXY:["50%","50%"]}},parseElement:function(){this.set("model",{classPrefix:this.get("classPrefix")});var e=this.get("template");n.isFunction(e)?this.element=n(e(this.get("model"))):f.superclass.parseElement.call(this),this.contentElement=this.$("[data-role=content]"),this.contentElement.css({background:"#fff",height:"100%",zoom:1}),this.$("[data-role=close]").hide()},events:{"click [data-role=close]":function(e){e.preventDefault(),this.hide()}},show:function(){return"iframe"===this._type&&(!this.get("height")&&this.element.css("height",d),this._showIframe()),f.superclass.show.call(this),this},hide:function(){return"iframe"===this._type&&this.iframe&&(this.iframe.attr({src:"javascript:'';"}),this.iframe.remove(),this.iframe=null),f.superclass.hide.call(this),clearInterval(this._interval),delete this._interval,this},destroy:function(){return this.get("trigger")&&this.get("trigger").off("click"+h+this.cid),n(document).off("keyup."+h+this.cid),this.element.remove(),this.get("hasMask")&&l.hide(),clearInterval(this._interval),f.superclass.destroy.call(this)},setup:function(){f.superclass.setup.call(this),this._setupTrigger(),this._setupMask(),this._setupKeyEvents(),this._setupFocus(),i(this.element),i(this.get("trigger")),this.activeTrigger=this.get("trigger").eq(0)},_onRenderContent:function(e){if("iframe"!==this._type){var t;try{t=n(e)}catch(a){t=[]}t[0]?this.contentElement.empty().append(t):this.contentElement.empty().html(e)}},_onRenderCloseTpl:function(e){""===e?this.$("[data-role=close]").html(e).hide():this.$("[data-role=close]").html(e).show()},_onRenderVisible:function(e){e?"fade"===this.get("effect")?this.element.fadeIn(300):this.element.show():this.element.hide()},_setupTrigger:function(){var e=this;this.get("trigger").on("click"+h+this.cid,function(t){t.preventDefault(),e.activeTrigger=n(this),e.show()})},_setupMask:function(){var e,t=this.get("hasMask"),a=parseInt(this.get("zIndex"),10);this.before("show",function(){t&&(e=l.get("zIndex"),l.set("zIndex",a-1).show())}),this.after("hide",function(){t&&l.set("zIndex",e).hide()})},_setupFocus:function(){this.after("show",function(){this.element.focus()}),this.after("hide",function(){this.activeTrigger&&this.activeTrigger.focus()})},_setupKeyEvents:function(){var e=this;n(document).on("keyup."+h+this.cid,function(t){27===t.keyCode&&e.get("visible")&&e.hide()})},_showIframe:function(){var e=this;this.iframe||this._createIframe(),this.iframe.attr({src:this._fixUrl(),name:"dialog-iframe"+(new Date).getTime()}),this.iframe.one("load",function(){e.get("visible")&&(e.get("autoFit")&&(clearInterval(e._interval),e._interval=setInterval(function(){e._syncHeight()},300)),e._syncHeight(),e._setPosition(),e.trigger("complete:show"))})},_fixUrl:function(){var e=this.get("content").match(/([^?#]*)(\?[^#]*)?(#.*)?/);return e.shift(),e[1]=(e[1]&&"?"!==e[1]?e[1]+"&":"?")+"t="+(new Date).getTime(),e.join("")},_createIframe:function(){var e=this;this.iframe=n("<iframe>",{src:"javascript:'';",scrolling:"no",frameborder:"no",allowTransparency:"true",css:{border:"none",width:"100%",display:"block",height:"100%",overflow:"hidden"}}).appendTo(this.contentElement),o.mixTo(this.iframe[0]),this.iframe[0].on("close",function(){e.hide()})},_syncHeight:function(){var e;if(this.get("height"))clearInterval(this._interval),delete this._interval;else{try{this._errCount=0,e=r(this.iframe)+"px"}catch(t){this._errCount=(this._errCount||0)+1,this._errCount>=6&&(e=d,clearInterval(this._interval),delete this._interval)}this.element.css("height",e),this.element[0].className=this.element[0].className}}});a.exports=f}),define("arale/dialog/1.1.0/dialog.handlebars",["gallery/handlebars/1.0.1/runtime"],function(e,t,a){var i=e("gallery/handlebars/1.0.1/runtime"),r=i.template;a.exports=r(function(e,t,a,i,r){this.compilerInfo=[3,">= 1.0.0-rc.4"],a=a||{};for(var n in e.helpers)a[n]=a[n]||e.helpers[n];r=r||{};var s,l="",o="function",c=this.escapeExpression;return l+='<div class="',(s=a.classPrefix)?s=s.call(t,{hash:{},data:r}):(s=t.classPrefix,s=typeof s===o?s.apply(t):s),l+=c(s)+'">\n    <div class="',(s=a.classPrefix)?s=s.call(t,{hash:{},data:r}):(s=t.classPrefix,s=typeof s===o?s.apply(t):s),l+=c(s)+'-close" title="关闭本框" data-role="close"></div>\n    <div class="',(s=a.classPrefix)?s=s.call(t,{hash:{},data:r}):(s=t.classPrefix,s=typeof s===o?s.apply(t):s),l+=c(s)+'-content" data-role="content"></div>\n</div>\n'})}),define("arale/dialog/1.1.0/confirmbox.handlebars",["gallery/handlebars/1.0.1/runtime"],function(e,t,a){var i=e("gallery/handlebars/1.0.1/runtime"),r=i.template;a.exports=r(function(e,t,a,i,r){function n(e,t){var i,r="";return r+='\n<div class="',(i=a.classPrefix)?i=i.call(e,{hash:{},data:t}):(i=e.classPrefix,i=typeof i===f?i.apply(e):i),r+=g(i)+'-title" data-role="title">',(i=a.title)?i=i.call(e,{hash:{},data:t}):(i=e.title,i=typeof i===f?i.apply(e):i),(i||0===i)&&(r+=i),r+="</div>\n"}function s(e,t){var i,r="";return r+='\n    <div class="',(i=a.classPrefix)?i=i.call(e,{hash:{},data:t}):(i=e.classPrefix,i=typeof i===f?i.apply(e):i),r+=g(i)+'-operation" data-role="foot">\n        ',i=a["if"].call(e,e.confirmTpl,{hash:{},inverse:u.noop,fn:u.program(4,l,t),data:t}),(i||0===i)&&(r+=i),r+="\n        ",i=a["if"].call(e,e.cancelTpl,{hash:{},inverse:u.noop,fn:u.program(6,o,t),data:t}),(i||0===i)&&(r+=i),r+="\n    </div>\n    "}function l(e,t){var i,r="";return r+='\n        <div class="',(i=a.classPrefix)?i=i.call(e,{hash:{},data:t}):(i=e.classPrefix,i=typeof i===f?i.apply(e):i),r+=g(i)+'-confirm" data-role="confirm">\n            ',(i=a.confirmTpl)?i=i.call(e,{hash:{},data:t}):(i=e.confirmTpl,i=typeof i===f?i.apply(e):i),(i||0===i)&&(r+=i),r+="\n        </div>\n        "}function o(e,t){var i,r="";return r+='\n        <div class="',(i=a.classPrefix)?i=i.call(e,{hash:{},data:t}):(i=e.classPrefix,i=typeof i===f?i.apply(e):i),r+=g(i)+'-cancel" data-role="cancel">\n            ',(i=a.cancelTpl)?i=i.call(e,{hash:{},data:t}):(i=e.cancelTpl,i=typeof i===f?i.apply(e):i),(i||0===i)&&(r+=i),r+="\n        </div>\n        "}this.compilerInfo=[3,">= 1.0.0-rc.4"],a=a||{};for(var c in e.helpers)a[c]=a[c]||e.helpers[c];r=r||{};var h,d="",f="function",g=this.escapeExpression,u=this;return h=a["if"].call(t,t.title,{hash:{},inverse:u.noop,fn:u.program(1,n,r),data:r}),(h||0===h)&&(d+=h),d+='\n<div class="',(h=a.classPrefix)?h=h.call(t,{hash:{},data:r}):(h=t.classPrefix,h=typeof h===f?h.apply(t):h),d+=g(h)+'-container">\n    <div class="',(h=a.classPrefix)?h=h.call(t,{hash:{},data:r}):(h=t.classPrefix,h=typeof h===f?h.apply(t):h),d+=g(h)+'-message" data-role="message">',(h=a.message)?h=h.call(t,{hash:{},data:r}):(h=t.message,h=typeof h===f?h.apply(t):h),(h||0===h)&&(d+=h),d+="</div>\n    ",h=a["if"].call(t,t.hasFoot,{hash:{},inverse:u.noop,fn:u.program(3,s,r),data:r}),(h||0===h)&&(d+=h),d+="\n</div>\n"})}),define("arale/dialog/1.1.0/dialog.css",[],function(){seajs.importStyle(".ui-dialog{background-color:rgba(0,0,0,.5);border:0;FILTER:progid:DXImageTransform.Microsoft.Gradient(startColorstr=#88000000, endColorstr=#88000000);padding:6px}:root .ui-dialog{FILTER:none\\9}.ui-dialog-close{color:#999;cursor:pointer;display:block;font-family:tahoma;font-size:24px;font-weight:700;height:18px;line-height:14px;position:absolute;right:16px;text-decoration:none;top:16px;z-index:10}.ui-dialog-close:hover{color:#666;text-shadow:0 0 2px #aaa}.ui-dialog-title{height:45px;font-size:16px;font-family:'微软雅黑','黑体',Arial;line-height:46px;border-bottom:1px solid #E1E1E1;color:#4d4d4d;text-indent:20px;background:-webkit-gradient(linear,left top,left bottom,from(#fcfcfc),to(#f9f9f9));background:-moz-linear-gradient(top,#fcfcfc,#f9f9f9);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#f9f9f9');background:-o-linear-gradient(top,#fcfcfc,#f9f9f9);background:linear-gradient(top,#fcfcfc,#f9f9f9)}.ui-dialog-container{padding:15px 20px 20px;font-size:12px}.ui-dialog-message{margin-bottom:15px}.ui-dialog-operation{zoom:1}.ui-dialog-confirm,.ui-dialog-cancel{display:inline}.ui-dialog-operation .ui-dialog-confirm{margin-right:4px}.ui-dialog-button-orange,.ui-dialog-button-white{display:inline-block;*display:inline;*zoom:1;text-align:center;text-decoration:none;vertical-align:middle;cursor:pointer;font-family:verdana,Hiragino Sans GB;font-size:12px;font-weight:700;border-radius:2px;padding:0 12px;line-height:23px;height:23px;*overflow:visible}a.ui-dialog-button-orange:hover,a.ui-dialog-button-white:hover{text-decoration:none}.ui-dialog-button-orange{border:1px solid #F67600;color:#fff;background-color:#F5AA2B;background:-webkit-gradient(linear,left top,left bottom,from(#FFA600),to(#FE9200));background:-moz-linear-gradient(top,#FFA600,#FE9200);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFA600', endColorstr='#FE9200');background:-o-linear-gradient(top,#FFA600,#FE9200);background:linear-gradient(top,#FFA600,#FE9200);box-shadow:0 -2px 2px rgba(255,255,255,.33) inset}.ui-dialog-button-orange:hover{border:1px solid #F26600;background-color:#F5AA2B;background:-webkit-gradient(linear,left top,left bottom,from(#FFB91C),to(#FFA700));background:-moz-linear-gradient(top,#FFB91C,#FFA700);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFB91C', endColorstr='#FFA700');background:-o-linear-gradient(top,#FFB91C,#FFA700);background:linear-gradient(top,#FFB91C,#FFA700);box-shadow:0 -2px 2px rgba(255,255,255,.4) inset}.ui-dialog-button-white{border:1px solid #B3B3B3;color:#595959;background-color:#F2F2F2;background:-webkit-gradient(linear,left top,left bottom,from(#FEFEFE),to(#ECECEC));background:-moz-linear-gradient(top,#FEFEFE,#ECECEC);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FEFEFE', endColorstr='#ECECEC');background:-o-linear-gradient(top,#FEFEFE,#ECECEC);background:linear-gradient(top,#FEFEFE,#ECECEC);box-shadow:0 -2px 2px rgba(255,255,255,.33) inset}.ui-dialog-button-white:hover{border:1px solid #999;background-color:#F6F6F6;background:-webkit-gradient(linear,left top,left bottom,from(#FEFEFE),to(#F0F0F0));background:-moz-linear-gradient(top,#FEFEFE,#F0F0F0);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#FEFEFE', endColorstr='#F0F0F0');background:-o-linear-gradient(top,#FEFEFE,#F0F0F0);background:linear-gradient(top,#FEFEFE,#F0F0F0)}")});
