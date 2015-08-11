var mySubmitFunc = function(error, state){
    if (!error) {
        if (state === "signIn") {
            console.log('signed in...');
            // Successfully logged in
            // ...
        }
        if (state === "signUp") {
            console.log('signed up...');
            //this.redirect('/profile/edit');
            // Successfully registered
            // ...
        }
    }
};

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');

//TODO: create a workflow for users to navigate initial signup
AccountsTemplates.configureRoute('signUp', {
    redirect: function(){
        Router.go('/profile/edit');
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

    homeRoutePath: '/profile/edit',
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

    onSubmitHook: mySubmitFunc,
    onLogoutHook: function() {
        console.log('called onLogoutHook');
        Router.go('/logout');
    }
});
