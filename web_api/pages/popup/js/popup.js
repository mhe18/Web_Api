/*global window*/
(function () {
    "use strict";

    const {standardsLib,browserLib, constants, enums, preferencesLib} = window.WEB_API_MANAGER;
    const rootObject = browserLib.getRootObject();
    const doc = window.document;
    const configureButton = doc.getElementById("config-page-link");
    const reportButton = doc.getElementById("report-page-link");
    const rulesTableBody = doc.querySelector("#rules-table tbody");
    const defaultPattern = constants.defaultPattern;
    const clickButton = doc.getElementById("click-button");
    clickButton.clicked = false;

    const cachedButton = doc.getElementById("cached-button");
    cachedButton.clicked = false;

    const DOMPopupBlockedButton = doc.getElementById("DOMPopupBlocked-button");
    DOMPopupBlockedButton.clicked = false;

    const AlertActiveButton = doc.getElementById("AlertActive-button");
    AlertActiveButton.clicked = false;

    const AlertCloseButton = doc.getElementById("AlertClose-button");
    AlertCloseButton.clicked = false;

    const storageButton = doc.getElementById("storage-button");
    storageButton.clicked = false;


    /**
     * Returns a function for use as the "onclick" handler for a toggle button.
     *
     * @param {string} hostName
     *   The name of the host to change the blocking settings for.
     * @param {string} action
     *   Either "allow" (indicating that all APIs should be allowed for this
     *   host) or "block" (indicating that all APIs should be blocked for
     *   this host).
     *
     * @return {function}
     *   A function that takes a single event object as an argument.  For
     *   use as an event handler callback.
     */
    const createOnToggleHandler = (hostName, action) => {
        const onClickHandler = event => {
            const message = ["toggleBlocking", {
                "action": action,
                "hostName": hostName,
            }];
            const button = event.target;
            const containingRowElm = button.parentNode.parentNode;

            const appliedRuleTd = containingRowElm.querySelector("td:nth-child(2)");
            const numApisBlockedTd = containingRowElm.querySelector("td:nth-child(3)");

            button.className += " disabled";
            button.innerHtml = "setting…";

            rootObject.runtime.sendMessage(message, responseMessage => {
                const [messageType, numAPIsBlocked] = responseMessage;

                if (messageType === "toggleBlockingResponse") {
                    numApisBlockedTd.innerText = numAPIsBlocked.length;
                    console.log(numAPIsBlocked)

                    if (action === "block") {
                        appliedRuleTd.innerText = defaultPattern;
                         chrome.tabs.getSelected(null, function(tab) {
                        var code = 'window.location.reload();';
                        chrome.tabs.executeScript(tab.id, {code: code});
                        });
                    } else if (action === "allow") {
                        appliedRuleTd.innerText = hostName;
                        chrome.tabs.getSelected(null, function(tab) {
                        var code = 'window.location.reload();';
                        chrome.tabs.executeScript(tab.id, {code: code});
                        });
                    }

                    button.innerText = "👍";
                }
            });

            event.preventDefault();
            event.stopImmediatePropagation();
        };
       // window.location.reload(true)

        return onClickHandler;
    };

    /**
     * Generates a TR element based on a domain's blocking status
     *
     * @param {string} domainName
     *   The name of a domain of a frame on the current tab
     * @param {string} appliedRuleName
     *   The pattern matching rule for the rule set applied (or,
     *   if no matching rule "(default)").
     * @param {number} numAPIsBlocked
     *   The number of APIs blocked for this domain.
     *
     * @return {Node}
     *   a HTMLTRElement object.
     */
     
    const ruleToTr = (domainName, appliedRuleName, numAPIsBlocked) => {
        const trElm = doc.createElement("tr");

        const domainTd = doc.createElement("td");
        const domainTdText = doc.createTextNode(domainName);
        domainTd.appendChild(domainTdText);
        trElm.appendChild(domainTd);

        const ruleTd = doc.createElement("td");
        ruleTd.appendChild(doc.createTextNode(appliedRuleName));
        trElm.appendChild(ruleTd);

        const numBlockedTd = doc.createElement("td");
        numBlockedTd.appendChild(doc.createTextNode(numAPIsBlocked.length));
        trElm.appendChild(numBlockedTd);
       // const onClickAPINumber = createonClickAPINumber(numAPIsBlocked);
        //numBlockedTd.addEventListener("click", onClickAPINumber, false);
        numBlockedTd.addEventListener("click", event => {
            let temp = doc.createElement("table")
            var html = "<table border='1|1'>";
            for (var i = 0; i < numAPIsBlocked.length; i++) {
                html+="<tr>";
                html+="<td>"+standardsLib.nameForStandardId(numAPIsBlocked[i])+"</td>";
                html+="</tr>";

            }
            html+="</table>";
            temp.innerHTML = html;
            trElm.appendChild(temp)
            
        alert(standardsLib.nameForStandardId(numAPIsBlocked[0]))
    }, false);
        

        const actionsTd = doc.createElement("td");
        const toggleButton = doc.createElement("button");
        //const toggleButton1 = doc.createElement("button");
        toggleButton.className = "btn btn-default block-toggle btn-sm";
       // toggleButton1.className = "btn btn-default block-toggle btn-sm";
        //toggleButton1.appendChild(doc.createTextNode("details"))
        //toggleButton1.addEventListener("click", onClickToggleButton, false);
        

        var isAllowingAll = false;
        if(numAPIsBlocked.length==0){
            isAllowingAll = true
        }

        let toggleButtonText;
        let toggleAction;

        // If the domain is using the default rule, and the default rule is
        // allowing all API's then do nothing, since there is no sensible
        // option to "toggle" to.
        if (isAllowingAll === false) {
            toggleButtonText = "allow all";
            toggleButton.className += " success";
            toggleAction = "allow";
        } else {
            toggleButtonText = "revoke permission";
            toggleButton.className += " warn";
            toggleAction = "block";
        }

        if (toggleButtonText !== undefined) {
            const toggleButtonTextElm = doc.createTextNode(toggleButtonText);
            toggleButton.appendChild(toggleButtonTextElm);

            if (toggleAction !== undefined) {
                const onClickToggleButton = createOnToggleHandler(domainName, toggleAction);
                toggleButton.addEventListener("click", onClickToggleButton, false);
            }
        }

        actionsTd.appendChild(toggleButton);
        trElm.appendChild(actionsTd);

        return trElm;
    };

    configureButton.addEventListener("click", event => {
        rootObject.runtime.openOptionsPage();
        event.preventDefault();
        event.stopImmediatePropagation();
    }, false);
    
    clickButton.addEventListener('click', () => {
        if(clickButton.clicked){
            clickButton.clicked = false;
            clickButton.style.backgroundColor = "lightgray";
             chrome.tabs.getSelected(null, function(tab) {
                        var code = 'window.location.reload();';
                        chrome.tabs.executeScript(tab.id, {code: code});
                        });
        }else{
              clickButton.clicked = true;
              clickButton.style.backgroundColor = "gray";
              console.log("Popup DOM fully loaded and parsed");
              //event.startPropagation

            function modifyDOM() {
            //You can play with your DOM here or check URL against your regex
            console.log('Tab script:');
            document.addEventListener("click",handler,true);

            function handler(e){
                e.stopPropagation();
                e.preventDefault();
            }
        
            return document.body.innerHTML;
            }
            chrome.tabs.executeScript({
                code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
            }, (results) => {
                //Here we have just the innerHTML and not DOM structure
                console.log('Popup script:');
            });    

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
}
    });
    
    cachedButton.addEventListener('click', () => {
        if(cachedButton.clicked){
            cachedButton.clicked = false;
            cachedButton.style.backgroundColor = "lightgray";
             chrome.tabs.getSelected(null, function(tab) {
                        var code = 'window.location.reload();';
                        chrome.tabs.executeScript(tab.id, {code: code});
                        });
        }else{
              cachedButton.clicked = true;
              cachedButton.style.backgroundColor = "gray";
              console.log("Popup DOM fully loaded and parsed");
              //event.startPropagation

            function modifyDOM() {
            //You can play with your DOM here or check URL against your regex
            console.log('Tab script:');
            document.addEventListener("cached",handler,true);

            function handler(e){
                e.stopPropagation();
                e.preventDefault();
            }
        
            return document.body.innerHTML;
            }
            chrome.tabs.executeScript({
                code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
            }, (results) => {
                //Here we have just the innerHTML and not DOM structure
                console.log('Popup script:');
            });    

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
}
    });
    
    DOMPopupBlockedButton.addEventListener('click', () => {
        if(DOMPopupBlockedButton.clicked){
            DOMPopupBlockedButton.clicked = false;
            DOMPopupBlockedButton.style.backgroundColor = "lightgray";
             chrome.tabs.getSelected(null, function(tab) {
                        var code = 'window.location.reload();';
                        chrome.tabs.executeScript(tab.id, {code: code});
                        });
        }else{
              DOMPopupBlockedButton.clicked = true;
              DOMPopupBlockedButton.style.backgroundColor = "gray";
              console.log("Popup DOM fully loaded and parsed");
              //event.startPropagation

            function modifyDOM() {
            //You can play with your DOM here or check URL against your regex
            console.log('Tab script:');
            document.addEventListener("DOMPopupBlocked",handler,true);

            function handler(e){
                e.stopPropagation();
                e.preventDefault();
            }
        
            return document.body.innerHTML;
            }
            chrome.tabs.executeScript({
                code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
            }, (results) => {
                //Here we have just the innerHTML and not DOM structure
                console.log('Popup script:');
            });    

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
}
    });
    
    AlertActiveButton.addEventListener('click', () => {
        if(AlertActiveButton.clicked){
            AlertActiveButton.clicked = false;
            AlertActiveButton.style.backgroundColor = "lightgray";
             chrome.tabs.getSelected(null, function(tab) {
                        var code = 'window.location.reload();';
                        chrome.tabs.executeScript(tab.id, {code: code});
                        });
        }else{
              AlertActiveButton.clicked = true;
              AlertActiveButton.style.backgroundColor = "gray";
              console.log("Popup DOM fully loaded and parsed");
              //event.startPropagation

            function modifyDOM() {
            //You can play with your DOM here or check URL against your regex
            console.log('Tab script:');
            document.addEventListener("AlertActive",handler,true);

            function handler(e){
                e.stopPropagation();
                e.preventDefault();
            }
        
            return document.body.innerHTML;
            }
            chrome.tabs.executeScript({
                code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
            }, (results) => {
                //Here we have just the innerHTML and not DOM structure
                console.log('Popup script:');
            });    

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
}
    });
    
    AlertCloseButton.addEventListener('click', () => {
        if(AlertCloseButton.clicked){
            AlertCloseButton.clicked = false;
            AlertCloseButton.style.backgroundColor = "lightgray";
             chrome.tabs.getSelected(null, function(tab) {
                        var code = 'window.location.reload();';
                        chrome.tabs.executeScript(tab.id, {code: code});
                        });
        }else{
              AlertCloseButton.clicked = true;
              AlertCloseButton.style.backgroundColor = "gray";
              console.log("Popup DOM fully loaded and parsed");
              //event.startPropagation

            function modifyDOM() {
            //You can play with your DOM here or check URL against your regex
            console.log('Tab script:');
            document.addEventListener("AlertClose",handler,true);

            function handler(e){
                e.stopPropagation();
                e.preventDefault();
            }
        
            return document.body.innerHTML;
            }
            chrome.tabs.executeScript({
                code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
            }, (results) => {
                //Here we have just the innerHTML and not DOM structure
                console.log('Popup script:');
            });    

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
}
    });
     storageButton.addEventListener('click', () => {
        if(storageButton.clicked){
            storageButton.clicked = false;
            storageButton.style.backgroundColor = "lightgray";
             chrome.tabs.getSelected(null, function(tab) {
                        var code = 'window.location.reload();';
                        chrome.tabs.executeScript(tab.id, {code: code});
                        });
        }else{
              storageButton.clicked = true;
              storageButton.style.backgroundColor = "gray";
              console.log("Popup DOM fully loaded and parsed");
              //event.startPropagation

            function modifyDOM() {
            //You can play with your DOM here or check URL against your regex
            console.log('Tab script:');
            document.addEventListener("storage",handler,true);

            function handler(e){
                e.stopPropagation();
                e.preventDefault();
            }
        
            return document.body.innerHTML;
            }
            chrome.tabs.executeScript({
                code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
            }, (results) => {
                //Here we have just the innerHTML and not DOM structure
                console.log('Popup script:');
            });    

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
}
    });
    
    reportButton.addEventListener("click", event => {
        rootObject.runtime.sendMessage(["openReportPage", undefined]);
        event.preventDefault();
        event.stopImmediatePropagation();
    });

    const message = ["getPreferencesAndFrames", undefined];

    rootObject.runtime.onMessage.addListener(response => {
        const [label, data] = response;
        if (label !== "getPreferencesAndFramesResponse") {
            return;
        }
        doc.body.className = "loaded";

        const preferences = preferencesLib.fromJSON(data.prefsJSON);
        const uniqueHosts = data.uniqueHosts;

        uniqueHosts.forEach(aHost => {
            const blockRule = preferences.getRuleForHost(aHost);
            const stdIdsForRule = blockRule.getStandardIds();
            const rowElm = ruleToTr(aHost, blockRule.getPattern(), stdIdsForRule);
            rulesTableBody.appendChild(rowElm);
        });

        switch (preferences.getShouldLog()) {
            // If the current logging preference is "don't log", then
            // don't change the default setup, which is to hide the "show
            // the log" button.
            case enums.ShouldLogVal.NONE:
                break;

            // If the logging preference is "standard", the show the button
            // with the template's text, which prompts users to press
            // the button to show blocked features.  Also we need
            // to un-hide the button.
            case enums.ShouldLogVal.STANDARD:
                reportButton.className = reportButton.className.replace(" hidden", "");
                break;

            // Finally, if the logging preference is "passive", then
            // show the button and change the text to be be
            // about "used" features, instead of "blocked" features.
            case enums.ShouldLogVal.PASSIVE:
                reportButton.className = reportButton.className.replace(" hidden", "");
                reportButton.innerText = "Show used features";
                break;
        }
    });

    rootObject.runtime.sendMessage(message);
}());
