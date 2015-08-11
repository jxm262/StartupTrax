Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '_404',    //Setting header to 200 not 404. https://github.com/iron-meteor/iron-router/issues/1055
    waitOn: function() {
        return [Meteor.subscribe('images')]
    }
});


Router.route('/', function () {
    this.render('home');
});

Router.route('/index', function () {
    this.redirect('/');
});

Router.route('/login', function () {
    this.render('login');
});

Router.route('/search', function () {
    this.render('search');
});

Router.route('/entrepreneurs', function () {
    this.render('entrepreneurs');
});

Router.route('/profile', function () {
    this.render('profile');
});

//why-tf is the ensureSignedIn plugin not working if i don't explicitly name this route?
Router.route('/profile/edit', {
    name: 'editProfile',
    template: 'editProfile',
    action: function () {
        this.render();
    }
});

Router.route('/logout', function () {
    this.render('logout');
})


Router.plugin('ensureSignedIn', {
    only: ['profile', 'editProfile']
});
