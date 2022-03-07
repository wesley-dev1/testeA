window.blockly = window.blockly || {};
window.blockly.js = window.blockly.js || {};
window.blockly.js.blockly = window.blockly.js.blockly || {};
window.blockly.js.blockly.auth = window.blockly.js.blockly.auth || {};
window.blockly.js.blockly.auth.UserControl = window.blockly.js.blockly.auth.UserControl || {};

/**
 * Signup
 */
window.blockly.js.blockly.auth.UserControl.signUpArgs = [{ description: 'signupUsername', id: '8df902ea' }, { description: 'signupEmail', id: '0c25d725' }, { description: 'signupPassword', id: '9c203fbf' }, { description: 'signupConfirmPassword', id: '067b073b' }];
window.blockly.js.blockly.auth.UserControl.signUp = async function(signupUsername, signupEmail, signupPassword, signupConfirmPassword) {
 var responseSignUp, json, httpCodeStatus, httpMessageStatus;
  if (await this.blockly.js.blockly.auth.UserControl.isValidSignup(signupUsername, signupEmail, signupPassword, signupConfirmPassword)) {
    this.cronapi.util.callServerBlocklyAsynchronous('blockly.UserControl:signUp', async function(sender_responseSignUp) {
        responseSignUp = sender_responseSignUp;
      json = this.cronapi.json.createObjectFromString(responseSignUp);
      httpCodeStatus = this.cronapi.json.getProperty(json, 'code');
      httpMessageStatus = this.cronapi.json.getProperty(json, 'message');
      if (httpCodeStatus == '201') {
        this.cronapi.screen.changeView("#/app/login",[  ]);
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
window.blockly.js.blockly.auth.UserControl.resetPasswordArgs = [{ description: 'email', id: '7b9f3909' }];
window.blockly.js.blockly.auth.UserControl.resetPassword = async function(email) {
 var signupUsername, signupEmail, signupPassword, signupConfirmPassword, responseSignUp, json, httpCodeStatus;
  if (this.cronapi.logic.isNullOrEmpty(email)) {
    this.cronapi.screen.notify('error',this.cronapi.i18n.translate("UsernameCanNotBeEmpty",[  ]));
  } else {
    this.cronapi.util.callServerBlocklyAsynchronous('blockly.UserControl:resetPassword', async function(sender_item) {
        item = sender_item;
      this.cronapi.screen.notify('success',this.cronapi.i18n.translate("ForgotPasswordSent",[  ]));
      this.cronapi.screen.changeView("#/app/login",[  ]);
    }.bind(this), email);
  }
}

/**
 * Descreva esta função...
 */
window.blockly.js.blockly.auth.UserControl.isValidSignupArgs = [{ description: 'signupUsername', id: 'be2325de' }, { description: 'signupEmail', id: 'dc667925' }, { description: 'signupPassword', id: '9a49950f' }, { description: 'signupConfirmPassword', id: 'f6fdc12c' }];
window.blockly.js.blockly.auth.UserControl.isValidSignup = async function(signupUsername, signupEmail, signupPassword, signupConfirmPassword) {
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
