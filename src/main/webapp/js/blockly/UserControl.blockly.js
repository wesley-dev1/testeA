window.blockly = window.blockly || {};
window.blockly.js = window.blockly.js || {};
window.blockly.js.blockly = window.blockly.js.blockly || {};
window.blockly.js.blockly.UserControl = window.blockly.js.blockly.UserControl || {};

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.UserControl.resetPasswordArgs = [{ description: 'email', id: '7afdf898' }];
window.blockly.js.blockly.UserControl.resetPassword = async function(email) {
 var signupUsername, signupEmail, signupPassword, signupConfirmPassword, responseSignUp, json, httpCodeStatus;
  if (this.cronapi.logic.isNullOrEmpty(email)) {
    this.cronapi.screen.notify('error',this.cronapi.i18n.translate("EmailCanNotBeEmpty",[  ]));
  } else {
    this.cronapi.util.callServerBlocklyAsynchronous('blockly.UserControl:resetPassword', async function(sender_item) {
        item = sender_item;
      this.cronapi.screen.notify('success',this.cronapi.i18n.translate("ForgotPasswordSent",[  ]));
      this.cronapi.screen.hideModal("forgotPasswordModal");
    }.bind(this), email);
  }
}

/**
 * Signup
 */
window.blockly.js.blockly.UserControl.signUpArgs = [{ description: 'signupUsername', id: 'ec5dbe32' }, { description: 'signupEmail', id: '62cce53e' }, { description: 'signupPassword', id: 'd42229ad' }, { description: 'signupConfirmPassword', id: 'a49023f3' }];
window.blockly.js.blockly.UserControl.signUp = async function(signupUsername, signupEmail, signupPassword, signupConfirmPassword) {
 var responseSignUp, json, httpCodeStatus, httpMessageStatus;
  if (await this.blockly.js.blockly.UserControl.isValidSignup(signupUsername, signupEmail, signupPassword, signupConfirmPassword)) {
    this.cronapi.util.callServerBlocklyAsynchronous('blockly.UserControl:signUp', async function(sender_responseSignUp) {
        responseSignUp = sender_responseSignUp;
      json = this.cronapi.json.createObjectFromString(responseSignUp);
      httpCodeStatus = this.cronapi.json.getProperty(json, 'code');
      httpMessageStatus = this.cronapi.json.getProperty(json, 'message');
      if (httpCodeStatus == '201') {
        this.cronapi.screen.changeView("#/home/login",[  ]);
        this.cronapi.screen.notify('success',this.cronapi.i18n.translate("UserSuccessfullyRegistered",[  ]));
      } else {
        if (this.cronapi.logic.isNullOrEmpty(httpMessageStatus)) {
          this.cronapi.screen.notify('error',this.cronapi.i18n.translate("General.ErrorNotSpecified",[  ]));
        } else {
          this.cronapi.screen.notify('warning',httpMessageStatus);
        }
      }
    }.bind(this), signupUsername, signupEmail, signupPassword);
  }
}

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.UserControl.isValidSignupArgs = [{ description: 'signupUsername', id: 'abf7b641' }, { description: 'signupEmail', id: '38708282' }, { description: 'signupPassword', id: 'daf1486e' }, { description: 'signupConfirmPassword', id: '3f9f5d23' }];
window.blockly.js.blockly.UserControl.isValidSignup = async function(signupUsername, signupEmail, signupPassword, signupConfirmPassword) {
 var responseSignUp, json, httpCodeStatus, httpMessageStatus;
  isValid = true;
  if (this.cronapi.logic.isNullOrEmpty(signupUsername)) {
    this.cronapi.screen.notify('error',this.cronapi.i18n.translate("UsernameCanNotBeEmpty",[  ]));
    isValid = false;
  }
  if (this.cronapi.logic.isNullOrEmpty(signupEmail)) {
    this.cronapi.screen.notify('error',this.cronapi.i18n.translate("EmailCanNotBeEmpty",[  ]));
    isValid = false;
  }
  if (this.cronapi.logic.isNullOrEmpty(signupPassword)) {
    this.cronapi.screen.notify('error',this.cronapi.i18n.translate("PasswordCanNotBeEmpty",[  ]));
    isValid = false;
  }
  if (this.cronapi.logic.isNullOrEmpty(signupConfirmPassword)) {
    this.cronapi.screen.notify('error',this.cronapi.i18n.translate("PasswordConfirmationCanNotBeEmpty",[  ]));
    isValid = false;
  }
  if (signupPassword != signupConfirmPassword) {
    this.cronapi.screen.notify('error',this.cronapi.i18n.translate("PasswordDoesNotMatch",[  ]));
    isValid = false;
  }
  return isValid;
}
