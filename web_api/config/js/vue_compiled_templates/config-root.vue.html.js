
/* This file is derived from sources/vue/config-root.vue.html. */
if (window.WEB_API_MANAGER.vueComponents === undefined) {
    window.WEB_API_MANAGER.vueComponents = {};
}

window.WEB_API_MANAGER.vueComponents["config-root"] = {
    render: function () {with(this){return _c('section',{staticClass:"container"},[_c('ul',{staticClass:"nav nav-tabs",attrs:{"role":"tablist"}},[_c('li',{staticClass:"nav-item",attrs:{"role":"presentation"}},[_c('a',{class:[dataActiveTab === 'blocking-rules' ? 'active' : '', 'nav-link'],attrs:{"href":"#blocking-rules"},on:{"click":setActiveTab}},[_v("Blocking Rules")])]),_v(" "),_c('li',{staticClass:"nav-item",attrs:{"role":"presentation"}},[_c('a',{class:[dataActiveTab === 'import-export' ? 'active' : '', 'nav-link'],attrs:{"href":"#import-export"},on:{"click":setActiveTab}},[_v("Import / Export")])]),_v(" "),_c('li',{staticClass:"nav-item",attrs:{"role":"advanced-options"}},[_c('a',{class:[dataActiveTab === 'advanced-options' ? 'active' : '', 'nav-link'],attrs:{"href":"#advanced-options"},on:{"click":setActiveTab}},[_v("Advanced Options")])])]),_v(" "),_c('div',{staticClass:"tab-content pt-2"},[_c('div',{class:['tab-pane', dataActiveTab === 'blocking-rules' ? 'active' : ''],attrs:{"role":"tabpanel","id":"blocking-rules"}},[_m(0),_v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-4"},[_c('blocking-rules',{attrs:{"data-patterns":dataPatterns,"data-selected-pattern":dataSelectedPattern,"data-allowing-all-patterns":dataAllowingAllPatterns,"data-blocking-any-patterns":dataBlockingAnyPatterns}})],1),_v(" "),_c('div',{staticClass:"col-8"},[_c('web-api-standards',{attrs:{"data-should-log":dataShouldLog,"data-current-standard-ids":dataCurrentStandardIds,"data-selected-pattern":dataSelectedPattern,"data-template-standards":dataTemplateStandards,"data-template-custom-blocked-features":dataTemplateCustomBlockedFeatures,"data-current-custom-blocked-features":dataCurrentCustomBlockedFeatures}})],1)])]),_v(" "),_c('div',{class:['tab-pane', dataActiveTab === 'import-export' ? 'active' : ''],attrs:{"role":"tabpanel","id":"import-export"}},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col12"},[_c('import-export',{attrs:{"data-patterns":dataPatterns,"data-current-standard-ids":dataCurrentStandardIds}})],1)])]),_v(" "),_c('div',{class:['tab-pane', dataActiveTab === 'advanced-options' ? 'active' : ''],attrs:{"role":"tabpanel","id":"advanced-options"}},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col"},[_c('advanced-options',{attrs:{"data-should-log":dataShouldLog,"data-block-cross-frame":dataBlockCrossFrame}})],1)])])])])}},
    staticRenderFns: [function () {with(this){return _c('div',{staticClass:"row"},[_c('div',{staticClass:"col"},[_c('p',[_v("\n                        Enter "),_c('a',{attrs:{"href":"https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Match_patterns"}},[_v("domain matching rules")]),_v("\n                        on the right, to create a new blocking rule.  On the\n                        right, select which functionality should be blocked for\n                        hosts matching each rule.\n                    ")])])])}}]
};