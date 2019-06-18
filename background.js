// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const HUD = {
  injected: false
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if ( HUD.injected ) {
    
  }
});

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: 'hello'}, (response) => {
    console.log(response.farewell);
  });
});

chrome.runtime.onMessage.addListener((message, cb = () => {}) => {
    switch(message) {
      case 'HUD_INJECTED':
        HUD.injected = true;
        cb();
        break;
      
      case 'HUD_REMOVED':
        HUD.injected = false;
        cb();
        break;
      
      case 'HUD_UPDATED':
        cb();
        break;

      default:
        cb();
    }
});