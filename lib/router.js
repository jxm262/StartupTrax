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
        console.log('..', Meteor.users.find({}).fetch());
        return {users: Meteor.users.find({})};
    }
});

Router.route('/projects', {
    name: 'projects',
    template: 'projects',
    waitOn: function() {
        return [Meteor.subscribe('projects')]
    },
    data: function () {
        return {projects: Projects.find({})};
    }
});

Router.route('/projects/:_id', {
    name: 'projectItem',
    template: 'projectItem',
    waitOn: function() {
        return [
            Meteor.subscribe('singleProject', this.params._id)
        ];
    },
    data: function() { return Projects.findOne(this.params._id); }
});


Router.route(
    '/profile/:_name',
    function () {
        var user = Meteor.users.findOne({"profile.displayName": this.params._name});
        this.render('profile', {
            waitOn: function () {
                return [
                    Meteor.subscribe('projects')
                ];
            },
            data: function () {
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


Router.route('/projects/:_id/edit', {
    name: 'edit.project',
    template: 'editProject',
    onBeforeAction: function () {
        var project = Projects.findOne({_id: this.params._id});
        var loggedInUser = Meteor.user() || {};
        if(project.owner !== loggedInUser._id) {
            this.redirect('/');
        } else {
            this.next();
        }
    },
    waitOn: function() {
        return [
            Meteor.subscribe('singleProject', this.params._id)
            //Meteor.subscribe('comments', this.params._id)
        ];
    },
    data: function() { return Projects.findOne(this.params._id); }
});

//why-tf is the ensureSignedIn plugin not working if i don't explicitly name this route?
Router.route('/profile/:_name/edit', {
    name: 'profile.edit',
    template: 'editProfile',
    onBeforeAction: function () {
        var user = Meteor.users.findOne({"profile.displayName": this.params._name});
        var loggedInUser = Meteor.user();

        //TODO maybe change this?  for now if trying to edit a profile thats not your own, it just redirects to main page
        if(loggedInUser._id !== user._id) {
            this.redirect('/');
        } else {
            this.next();
        }
    },
    data: function () {
        var user = Meteor.users.findOne({"profile.displayName": this.params._name});
        return {
            name: this.params._name,
            user: user,
            projects: Projects.find({owner: user._id})
        };
    },
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
