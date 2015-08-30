Template.profile.events({
    'click #add-project-btn': function () {
        Session.set('isUpsertingProject', true);
    },
    'click #edit-profile-btn': function () {
        Router.go('profile.edit', {_name: this.name});
    }
});
