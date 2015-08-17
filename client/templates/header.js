Template.header.events({
    'click #logout': AccountsTemplates.logout
});

Template.header.helpers({
    users: function () {
        console.log('here... in users', Meteor.user());
        return 'hello';
    }
})
