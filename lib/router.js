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

Router.route('/entrepreneurs', {
    name: 'entrepreneurs',
    //TODO: should users be subscribed to?
    waitOn: function() {
        return [Meteor.subscribe('images')]
    },
    data: function () {
        return {users: Meteor.users.find({})};
    }
});

Router.route('/projects', {
    name: 'projectsPage',
    waitOn: function() {
        return [Meteor.subscribe('projects')]
    },
    data: function () {
        return {projects: Projects.find({})};
    }
});

Router.route('/projects/:_id', {
    name: 'projectPage',
    waitOn: function() {
        return [
            Meteor.subscribe('singleProject', this.params._id)
            //Meteor.subscribe('comments', this.params._id)
        ];
    },
    data: function() { return Projects.findOne(this.params._id); }
});


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
                var user = Meteor.user();
                return {
                    name: this.params._name,
                    user: user,
                    projects: Projects.find({owner: user._id})
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
Router.route('/profile/:_name/edit', {
    name: 'profile.edit',
    template: 'editProfile',
    action: function () {
        console.log('here...');
        this.render();
    }
});

Router.route('/logout', function () {
    this.render('logout');
})


Router.plugin('ensureSignedIn', {
    only: ['profile', 'editProfile']
});
