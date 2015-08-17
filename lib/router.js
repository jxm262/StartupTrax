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

//Router.route('/profile', {
//    name: 'profile'
//    //waitOn: function () {
//    //    Meteor.subscribe('projects');
//    //}
//});

Router.route(
    '/profile/:_name',
    function () {
        console.log(':userName', this.params._name);
        console.log('this.user', Meteor.user());
        var name = Meteor.user().profile.displayName.toLowerCase();
        name = name.replace(/\s/g, '');

        //this.name
        this.render('profile', {
            waitOn: function () {
                return [
                    Meteor.subscribe('projects', this.params._name)
                ];
            },
            data: function () {
                //return {test: 'hellow'};
                console.log('name...', this.params._name);
                return {
                    projects: Projects.find({owner: this.params._name})
                };
            }
        });
    },
    {name: 'profile'}
);

//name: 'postPage',
//    waitOn: function() {
//    return [
//        Meteor.subscribe('singlePost', this.params._id),
//        Meteor.subscribe('comments', this.params._id)
//    ];
//},
//data: function() { return Posts.findOne(this.params._id); }

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
