Template.userMain.helpers({
    profile: function () {
        console.log('this...', this);
        this.profile = this.profile || {};

        return {
            displayName: this.profile.displayName,
            lastOnline: function () {
                var today = Date.now();
                return moment(today).format('MM-DD-YYYY');
            },
            bio: this.profile.bio,
            profileImg: this.profile.image || 'http://placehold.it/100'
        }
    },
    temp: function () {
        console.log('temp', this);
    }
});
