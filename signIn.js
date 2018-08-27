
var config = {
    apiKey: "AIzaSyBZKFIjSuFa_PIeh-fgVVBK2dG5P5aIb3E",
    authDomain: "getting-a-user-logged-in.firebaseapp.com",
    databaseURL: "https://getting-a-user-logged-in.firebaseio.com",
    projectId: "getting-a-user-logged-in",
    storageBucket: "",
    messagingSenderId: "183862492872"
};

firebase.initializeApp(config);
var database = firebase.database();
// Grabs a reference to the authentication module in your firebase project
var auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

$(document).ready(function () {

    var displayName;
    var parent1First;

    $(".logon-container").show();
    $(".info-container").hide();
    $(".child-info-container").hide();


    $('#submit-signup').on('click', function (event) { // JQuery click handler for the submit button
        event.preventDefault()

        $(".logon-container").hide();
        $(".info-container").show();
        // $(".child-info-container").hide();

        var displayName = $("#child1-first").val().trim();
        var parent1First = $('#parent-1-first').val().trim();
        var parent1Last = $('#parent-1-last').val().trim();
        var parent1Emaill = $('#parent-1-email').val().trim();
        var password = $('#password').val().trim();
        console.log(displayName);
        console.log(parent1First);




        $('#status').empty();

        auth.createUserWithEmailAndPassword(parent1Emaill, password);

    })

    $('#login').on('click', function (event) {
        event.preventDefault()

        $(".logon-container").hide();
        $(".info-container").hide();
        $(".child-info-container").show();

        var loginEmail = $('#loginEmail').val();
        var loginPassword = $('#loginPassword').val();

        auth.signInWithEmailAndPassword(loginEmail, loginPassword);
    })

    $('#logout').on('click', function (event) {
        event.preventDefault()
        auth.signOut();
    })

    auth.onAuthStateChanged(function (user) {
        console.log(user);
        if (!user) return;
        if (!user.displayName) {
            user.updateProfile({
                "displayName": parent1First,
            }).then(function () {
                // var newUser = user.displayName;
                $('#status').text(user.displayName);
                console.log("this is approved: ");
                console.log(user.displayName);
            })
        } else {
            $('#status').text(user.displayName);
        }


    });



    // firebase.auth().onAuthStateChanged(function(user) {
    // if (user) {
    // // User is signed in.
    // var displayName = user.displayName;
    // var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
    // // ...
    // } else {
    // // User is signed out.
    // // ...
    // }
    // });


    //----- end of log on page -----------

    //-------beginning of send to database page ----

    $("#submit").on("click", function () {
        // parent 1 
        var parent1First = $("#parent-1-first").val();
        var parent1Last = $("#parent-1-last").val();
        var parent1Cell = $("#parent-1-cell").val();
        var parent1Email = $("#parent-1-email").val();
        database.ref("/users").child(firebase.auth().currentUser.uid).child("info").child("parent1").update({
            "first-name": parent1First,
            "last-name": parent1Last,
            "cell-number": parent1Cell,
            "email": parent1Email,
        });
        //   parent 2
        var parent2First = $("#parent-2-first").val();
        var parent2Last = $("#parent-2-last").val();
        var parent2Cell = $("#parent-2-cell").val();
        var parent2Email = $("#parent-2-email").val();
        database.ref("/users").child(firebase.auth().currentUser.uid).child("info").child("parent2").update({
            "first-name": parent2First,
            "last-name": parent2Last,
            "cell-number": parent2Cell,
            "email": parent2Email,
        });
        //   child
        var child1First = $("#child-1-first").val();
        var child1Last = $("#child-1-last").val();
        var child1Age = $("#child-1-age").val();
        var child1Grade = $("#child-1-grade").val();
        var child1Additional = $("#child-1-additional").val();
        database.ref("/users").child(firebase.auth().currentUser.uid).child("info").child("child1").update({
            "first-name": child1First,
            "last-name": child1Last,
            "age": child1Age,
            "grade": child1Grade,
            "additional-info": child1Additional,
        });
        getData();
        $(".child-info-container").show();
        $(".info-container").hide();
    });


    // function getData() {

    database.ref("/users").child(firebase.auth().currentUser.uid).child("info").once("value", function (snapshot) {
        console.log(snapshot.val())

        var childName = snapshot.val().child("child1").child("first-name")
        // var result = snapshot.val().userMessage;

        //      $(".put-here").text(result);
    });


    // };

    // get child info from database


    // function getData() {

    database.ref("/users").child("info").once("value", function (snapshot) {
        console.log(snapshot.val())

        var childFirstName = snapshot.val().child1["first-name"];
        var childLastName = snapshot.val().child1["last-name"];
        var childFullName = (childFirstName + " " + childLastName);
        var warnings = snapshot.val().child1.warnings;
        var comments = snapshot.val().child1.comments;
        var grade = snapshot.val().child1.grade;
        var parent1First = snapshot.val().parent1["first-name"];
        var parent1Last = snapshot.val().parent1["last-name"];
        var parent1FullName = (parent1First + " " + parent1Last);
        var parent2First = snapshot.val().parent2["first-name"];
        var parent2Last = snapshot.val().parent2["last-name"];
        var parent2FullName = (parent2First + " " + parent2Last);


        console.log(childFullName);



        $("#child1-name").text(childFullName);
        $(".child1-first").text(childFirstName);
        $("#child1-warning").text(warnings);
        $("#child1-comments").text(comments)
        $("#child1-grade").text(grade);
        $("#child1-image").attr("src", "../emmett.jpg")
        $("#parent-1").text(parent1FullName);
        $("#parent-2").text(parent2FullName);


    });


    // };


});  // end of document ready;