
/* This file is derived from sources/vue/advanced-options.vue.html. */
if (window.WEB_API_MANAGER.vueComponents === undefined) {
    window.WEB_API_MANAGER.vueComponents = {};
}

window.WEB_API_MANAGER.vueComponents["advanced-options"] = {
    render: function () {with(this){return _c('div',{staticClass:"advanced-options-container"},[_c('div',{staticClass:"logging-settings card mb-4"},[_c('strong',{staticClass:"card-header"},[_v("\n            Logging setting\n        ")]),_v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"form-check"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(dataShouldLog),expression:"dataShouldLog"}],staticClass:"form-check-input",attrs:{"type":"radio","id":"should-log-radio-none","aria-describedby":"should-log-help-none"},domProps:{"value":enums.ShouldLogVal.NONE,"checked":_q(dataShouldLog,enums.ShouldLogVal.NONE)},on:{"change":[function($event){dataShouldLog=enums.ShouldLogVal.NONE},shouldLogChanged]}}),_v(" "),_c('label',{staticClass:"form-check-label",attrs:{"for":"should-log-radio-none"}},[_v("\n                    No logging\n                ")]),_v(" "),_c('p',{staticClass:"text-muted form-text",attrs:{"id":"should-log-help-none"}},[_v("\n                    No information about what features and standards were blocked\n                    is stored.  This is the default option, and what you should\n                    choose for normal use.\n                ")])]),_v(" "),_c('div',{staticClass:"text-muted form-text"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(dataShouldLog),expression:"dataShouldLog"}],staticClass:"form-check-input",attrs:{"type":"radio","id":"should-log-radio-standard","aria-describedby":"should-log-help-standard"},domProps:{"value":enums.ShouldLogVal.STANDARD,"checked":_q(dataShouldLog,enums.ShouldLogVal.STANDARD)},on:{"change":[function($event){dataShouldLog=enums.ShouldLogVal.STANDARD},shouldLogChanged]}}),_v(" "),_c('label',{staticClass:"form-check-label",attrs:{"for":"should-log-radio-standard"}},[_v("\n                    Log blocked functionality\n                ")]),_v(" "),_c('p',{staticClass:"form-check",attrs:{"id":"should-log-help-standard"}},[_v("\n                    Information about functionality that web pages want to access,\n                    but the extension prevents pages from accessing, is logged.\n                ")])]),_v(" "),_c('div',{staticClass:"form-check"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(dataShouldLog),expression:"dataShouldLog"}],staticClass:"form-check-input",attrs:{"type":"radio","id":"should-log-radio-passive","aria-describedby":"should-log-help-passive"},domProps:{"value":enums.ShouldLogVal.PASSIVE,"checked":_q(dataShouldLog,enums.ShouldLogVal.PASSIVE)},on:{"change":[function($event){dataShouldLog=enums.ShouldLogVal.PASSIVE},shouldLogChanged]}}),_v(" "),_c('label',{staticClass:"form-check-label",attrs:{"for":"should-log-radio-passive"}},[_v("\n                    Passive logging\n                ")]),_v(" "),_c('p',{staticClass:"text-muted form-text",attrs:{"id":"should-log-help-passive"}},[_v("\n                    No functionality is blocked, but the extension logs all\n                    functionality that pages use.\n                ")])]),_v(" "),_c('a',{staticClass:"sr-only",attrs:{"id":"logging-raw-report-link","href":"/pages/report/report-json.html"}},[_v("\n                View raw logged data\n            ")])])]),_v(" "),_c('div',{staticClass:"compatibility-settings card mb-4"},[_c('strong',{staticClass:"card-header"},[_v("\n            Compatibility Settings\n        ")]),_v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"form-check"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(dataBlockCrossFrame),expression:"dataBlockCrossFrame"}],staticClass:"form-check-input",attrs:{"type":"checkbox","id":"cross-frame-blocking-checkbox","aria-describedby":"cross-frame-blocking-help"},domProps:{"checked":Array.isArray(dataBlockCrossFrame)?_i(dataBlockCrossFrame,null)>-1:(dataBlockCrossFrame)},on:{"change":[function($event){var $$a=dataBlockCrossFrame,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_i($$a,$$v);if($$el.checked){$$i<0&&(dataBlockCrossFrame=$$a.concat([$$v]))}else{$$i>-1&&(dataBlockCrossFrame=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{dataBlockCrossFrame=$$c}},blockCrossFrameChanged]}}),_v(" "),_c('label',{staticClass:"form-check-label",attrs:{"for":"cross-frame-blocking-checkbox"}},[_v("\n                    Block cross-frame access\n                ")]),_v(" "),_m(0)])])])])}},
    staticRenderFns: [function () {with(this){return _c('div',{staticClass:"form-text text-muted",attrs:{"id":"cross-frame-blocking-help"}},[_c('p',[_v("\n                        There are some cases where a very determined attacker can\n                        work around the protections Web API Manager provides.\n                        Because of bugs in how browsers have implemented the\n                        WebExtensions standard (tracked by bugs in both\n                        "),_c('a',{attrs:{"href":"https://bugzilla.mozilla.org/show_bug.cgi?id=1424176"}},[_v("Firefox")]),_v(" and\n                        "),_c('a',{attrs:{"href":"https://bugs.chromium.org/p/chromium/issues/detail?id=793217"}},[_v("Chromium")]),_v("),\n                        attackers can create child-frames, and extract blocked\n                        functionality out of those frames, before extensions can\n                        modify the child frame.\n                    ")]),_v(" "),_c('p',[_v("\n                        By default this extension does not block agianst these kinds\n                        of attacks.  The only manner to do so (preventing\n                        parent frames from accessing any content of child frames)\n                        breaks a large number of sites, and in the wild this\n                        kind of attack seems to be rare (to-non-existant).\n                    ")]),_v(" "),_c('p',[_v("\n                        Checking this option will guard against this type of\n                        attack, though will break any site that requires direct\n                        interaction with child frames to function.\n                    ")])])}}]
};