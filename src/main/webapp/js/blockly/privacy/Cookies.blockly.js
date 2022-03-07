window.blockly = window.blockly || {};
window.blockly.js = window.blockly.js || {};
window.blockly.js.blockly = window.blockly.js.blockly || {};
window.blockly.js.blockly.privacy = window.blockly.js.blockly.privacy || {};
window.blockly.js.blockly.privacy.Cookies = window.blockly.js.blockly.privacy.Cookies || {};

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.privacy.Cookies.openPreferencesArgs = [];
window.blockly.js.blockly.privacy.Cookies.openPreferences = async function() {
 var value, isChecked;
  this.cronapi.screen.showModal("modalCookies");
  this.cronapi.screen.hideComponent("dialogCookies");
}

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.privacy.Cookies.checkCookieMarketingArgs = [];
window.blockly.js.blockly.privacy.Cookies.checkCookieMarketing = async function() {
 var value, isChecked;
  value = this.cronapi.util.getCookie('cookieMarketing');
  if (this.cronapi.logic.isNullOrEmpty(value)) {
    isChecked = true;
  } else {
    isChecked = this.cronapi.conversion.toBoolean(value);
  }
  return isChecked;
}

/**
 * Cookies
 */
window.blockly.js.blockly.privacy.Cookies.setPreferenceArgs = [];
window.blockly.js.blockly.privacy.Cookies.setPreference = async function() {
 var value, isChecked;
  this.cronapi.screen.hideModal("modalCookies");
  isCheckedMarketingCookie = this.cronapi.screen.getValueOfField("vars.checkMarketing");
  isCheckedAnalyticsCookie = this.cronapi.screen.getValueOfField("vars.checkAnalytics");
  this.cronapi.util.setCookie('cookieMarketing', isCheckedMarketingCookie, 'days', 365);
  this.cronapi.util.setCookie('cookieAnalytics', isCheckedAnalyticsCookie, 'days', 365);
  this.cronapi.util.setCookie('cookieEssencial', true, 'days', 365);
  this.cronapi.screen.hideComponent("dialogCookies");
}

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.privacy.Cookies.hideShowDialogArgs = [];
window.blockly.js.blockly.privacy.Cookies.hideShowDialog = async function() {
 var value, isChecked;
  if (await this.blockly.js.blockly.privacy.Cookies.checkCookieEssencials()) {
    this.cronapi.screen.hideComponent("dialogCookies");
  } else {
    this.cronapi.screen.showComponent("dialogCookies");
    this.cronapi.screen.changeValueOfField("vars.checkMarketing", await this.blockly.js.blockly.privacy.Cookies.checkCookieMarketing());
    this.cronapi.screen.changeValueOfField("vars.checkAnalytics", await this.blockly.js.blockly.privacy.Cookies.checkCookieAnalytics());
  }
}

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.privacy.Cookies.checkCookieAnalyticsArgs = [];
window.blockly.js.blockly.privacy.Cookies.checkCookieAnalytics = async function() {
 var value, isChecked;
  value = this.cronapi.util.getCookie('cookieAnalytics');
  if (this.cronapi.logic.isNullOrEmpty(value)) {
    isChecked = true;
  } else {
    isChecked = this.cronapi.conversion.toBoolean(value);
  }
  return isChecked;
}

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.privacy.Cookies.checkCookieEssencialsArgs = [];
window.blockly.js.blockly.privacy.Cookies.checkCookieEssencials = async function() {
 var value, isChecked;
  isChecked = this.cronapi.util.getCookie('cookieEssencial');
  return this.cronapi.conversion.toBoolean(isChecked);
}
