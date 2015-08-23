Meteor.publish("images", function(){
    return Images.find();
});


Meteor.publish('projects', function() {
    return Projects.find();
});

Meteor.publish('singleProject', function(id) {
    //check(id, String);
    return Projects.find(id);
});

//function running() {
//    var idx = 0;
//    var lorem = 'Lorem ipsum dolor sit amet, cu decore prodesset duo, cum aeterno feugait in, ad vix mundi quodsi. Errem graeco facilisis sit at. Quo et veri aeterno. Liber discere inermis mei eu, aliquid salutatus deterruisset no nam, et assum liber laboramus nec. Ius eu viris homero scribentur, ornatus offendit luptatum no cum. Ex vim graeco menandri efficiendi, vel doctus nonumes pericula no. Mei at pericula consequuntur, feugiat cotidieque suscipiantur ne sit.\n' +
//        'Vim ex placerat inimicus, sea ex inani officiis expetendis. Cu cum invenire posidonium persequeris. Ad graece maiorum vix, posse delectus signiferumque mea id. Has no appareat pericula repudiare, ne iudico mediocritatem has. Epicurei detraxit cum ad, modus saperet suscipiantur eum ea.\n\n' +
//        'Sint postea persequeris sed ei. No has saepe scripta placerat. Cum detracto delicatissimi cu, cum ea nibh prima animal, novum comprehensam nec id. Ad nullam verear vis, oratio soleat et usu. Eam ut summo democritum efficiantur, inermis tincidunt ex pri. Pri ut porro quaeque, reque adolescens scribentur ea pro, vidit corrumpit cotidieque in per.\n\n' +
//        'Usu ex possim oportere, utinam integre sit ei, cu facilisis percipitur has. At utinam ancillae senserit vix, has ne essent scripta salutandi. Cu utamur contentiones necessitatibus ius, usu et nobis reprimique. Vocent mandamus temporibus ut pri. Cum ullum nostrum et, suas idque hendrerit ea cum. At mel elit graeci accusam.\n\n' +
//        'Pro no vide paulo vivendum, quas detraxit disputationi ex pri. Movet suavitate vis ea, mea aperiam gloriatur cu, euismod corpora quo ei. Ad tamquam admodum vix, eum modo quando eirmod ad, an semper partiendo erroribus quo. Quo ignota reformidans et, numquam explicari in sed. Putant deterruisset vis ex, soluta docendi euripidis usu et.\n\n';
//        'Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. Its also called placeholder (or filler) text. Its a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation\t\n' +
//        'eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; its not genuine, correct, or comprehensible Latin anymore. While lorem ipsums still resembles classical Latin, it actually has no meaning whatsoever. As Ciceros\n'+
//        'text doesnt contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.';
//
//    while (idx < 10000) {
//        idx++;
//        console.log('running', idx);
//
//        var name = 'Justin Maat'+idx;
//        var email = 'justin'+idx+'@gmail.com';
//
//
//        Accounts.createUser({
//            username: name,
//            email : email,
//            password : 'hello',
//            profile  : {
//                image: null,
//                displayName: name,
//                tagLine: lorem + "tagLine"+1,
//                myInterests: lorem + "myInterests"+idx,
//                lookingFor: "lookingFor"+idx +' ' + lorem,
//                iCanDo: lorem + "iCanDo"+idx,
//                pastProjects: "pastProjects"+idx+ ' ' + lorem
//            }
//
//        });
//    }
//
//};

//running();
