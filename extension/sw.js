// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("Error setting panel behavior:", error));

// Listen for tab updates to manage side panel behavior
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  try {
    // Enable the side panel universally for all sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: true           // Enable the side panel
    });
    console.log(`Side panel enabled for tabId: ${tabId} on URL: ${tab.url}`);
  } catch (error) {
    console.error("Error enabling side panel:", error);
  }
});

