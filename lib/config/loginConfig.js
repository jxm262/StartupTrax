//var mySubmitFunc = function(error, state){
//    if (!error) {
//        if (state === "signIn") {
//            // Successfully logged in
//            console.log('signed in...');
//        }
//        if (state === "signUp") {
//            // Successfully registered
//            console.log('signed up...');
//            this.redirect('/profile/edit');
//        }
//    }
//};

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');

//TODO: create a workflow for users to navigate initial signup
AccountsTemplates.configureRoute('signUp', {
    redirect: function(){
        Router.go('profile', {_name: Meteor.user().profile.displayName});
    }
});

AccountsTemplates.configureRoute('verifyEmail');

// Options
AccountsTemplates.configure({
    //defaultLayout: 'emptyLayout',
    showForgotPasswordLink: true,
    overrideLoginErrors: true,
    enablePasswordChange: true,
    sendVerificationEmail: true,

    //homeRoutePath: '/profile/edit',
    redirectTimeout: 1000,

    enforceEmailVerification: false,
    //confirmPassword: true,
    //continuousValidation: false,
    //displayFormLabels: true,
    //forbidClientAccountCreation: false,
    //formValidationFeedback: true,
    //homeRoutePath: '/',
    //showAddRemoveServices: false,
    //showPlaceholders: true,

    negativeValidation: true,
    positiveValidation:true,
    negativeFeedback: false,
    positiveFeedback:true,

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',

    //onSubmitHook: mySubmitFunc,
    onLogoutHook: function() {
        console.log('called onLogoutHook');
        Router.go('/logout');
    }
});

AccountsTemplates.addField({
    _id: 'displayName',
    displayName: 'Display Name',
    type: 'text',
    placeholder: {
        signUp: "Ex: John Doe"
    },
    required: true,
    minLength: 3,
    maxLength: 20,
    errStr: 'User Name Already Exists!',
    func: function(userName){
        if (Meteor.isClient) {
            console.log("Validating username...");
            var self = this;
            Meteor.call("userExists", userName, function(err, userExists){
                if (err) {
                    console.log('err', err);
                }
                if (!userExists) {
                    console.log('user does not exist', userExists);
                    self.setSuccess();
                }
                else {
                    console.log('user exists', userExists);
                    self.setError(userExists);
                }
                self.setValidating(false);
            });
            return;
        }
        return Meteor.call("userExists", userName);
    },
});

//AccountsTemplates.addField({
//    _id: 'displayName',
//    type: 'text',
//    placeholder: {
//        signUp: "At least six characters"
//    },
//    required: true,
//    minLength: 3,
//    maxLength: 20
//});