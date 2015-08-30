Template.editProfile.created = function () {
    this.state = new ReactiveDict();
    this.state.set('isChangingProfileImg', false);
    this.state.set('profileImgFile', false);
};

Template.editProfile.helpers({
    user: function () {
      console.log('this', this);
    },
    user: function () {
        //TODO: why is this popping twice?
        console.log('user retrieved', this.user);

        return {
            displayName: this.user.profile.displayName || '',
            lastOnline: function () {
                var today = Date.now();
                return moment(today).format('MM-DD-YYYY');
            },
            bio: this.user.profile.bio || '',
            profileImg: this.user.profile.image || null
        }
    },
    isUpsertingProject: function () {
        return true;
    },
    profileImgTemplName: function () {
        var userIsEditing = Template.instance().state.get('isChangingProfileImg');
        return (userIsEditing) ? 'editProfileImg' : 'promptEditProfileImg';
    },

    //image: function() {
    //    //TODO: move this to actual image file and hardcoded value to props file
    //    var defaultImg = "http://placehold.it/50";
    //    return Session.get("image") || defaultImg;
    //},
    imgtocropp: function() {
        return Session.get("imgtocropp");
    }
});

function getElByName(e, name) {
    var name = "[name=" + name + "]";
    var el = $(e.target).find(name);
    return el ? el.val() : "";
};


Template.editProfile.events({
    'click #change-profile-pic': function () {
        Template.instance().state.set('isChangingProfileImg', true);
    },
    //TODO change to click event instead of form submission
    'submit form': function(e) {
        e.preventDefault();

        console.log('submitted heres');
        var getEl = getElByName.bind(this, e);

        var user = Meteor.user();
        var profile = user.profile || {};
        var oldDisplayName = _.extend({}, profile).displayName;

        var profileInfo = {
            displayName: getEl("displayName"),
            bio: getEl("bio")
        };

        _.extend(profile, profileInfo);

        Meteor.users.update(
            { _id: Meteor.userId()},
            { $set: {profile: profile}},
            function (err) {
                if(err) {
                    console.log('there was an error submitting editProfile data');
                    console.log(err);
                } else {
                    Router.go('profile', {_name: profileInfo.displayName});
                }
            }
        );
    },
    image: function() {
        return Session.get("image") || "http://placehold.it/50";
    },
    imgtocropp: function() {
        return Session.get("imgtocropp");
    },
    'click .openmodal': function(event, template) {
        event.preventDefault();
        var file = template.find('#inputImage').files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            // Places.update({_id: placeId}, {$set: {imageTmp: e.target.result}});
            Session.set('imgtocropp', e.target.result);
            if (Session.get('imgtocropp') !== '') {
                $('#imageModal').modal();
            }
        };
        reader.readAsDataURL(file);
    },
    'shown.bs.modal': function (evt,tmpl) {
        var originalData = {width: 200};
        $('.imgtocropp').attr("src",Session.get('imgtocropp'));
        $('.imgtocropp').cropper({
            aspectRatio: 1.0,
            maxWidth: 200,
            data: originalData
        });
    },

    //TODO: on uploading images - http://stackoverflow.com/questions/28860545/is-there-any-event-to-indicate-that-the-uploaded-file-has-been-written-with-coll
    'hidden.bs.modal': function() {
        var originalData = $('.imgtocropp').cropper("getCroppedCanvas");
        var imgUrl = originalData.toDataURL();

        if (originalData !== '') {
            Session.set('image', imgUrl);

            Images.insert(imgUrl, function (err, fileObj) {
                if (err){
                    console.log('err inserting image', err);
                } else {
                    var userId = Meteor.userId();
                    var imagesURL = {
                        "profile.image": "/cfs/files/images/" + fileObj._id
                    };
                    Meteor.users.update(userId, {$set: imagesURL});
                }
            });
        }

        Template.instance().state.set('isChangingProfileImg', false);
        $('.imgtocropp').cropper("destroy");
    }
});

