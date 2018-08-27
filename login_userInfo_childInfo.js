
$(document).ready(function () {

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



    // var name;
    var parent1Email;
    var email;
    var uid;

    $(".logon-container").show();
    $(".info-container").hide();
    $(".child-info-container").hide();


    $('#submit-signup').on('click', function (event) { // JQuery click handler for the submit button
        event.preventDefault()

        $(".logon-container").hide();
        $(".info-container").show();
        $("#child-input-area").hide();
        $("#parent1-input-area").hide();
        $("#parent2-input-area").hide();


        // $(".child-info-container").hide();

        // var name = $("#child1-first").val().trim();
        // var parent1First = $('#parent-1-first').val().trim();
        // var parent1Last = $('#parent-1-last').val().trim();
        var parent1Email = $('#parent-1-email').val().trim();
        var password = $('#password').val().trim();
        // console.log(displayName);
        // console.log(parent1First);

        $('#status').empty();

        auth.createUserWithEmailAndPassword(parent1Email, password);

        setTimeout(addInfo, 2000);

    });

    function addInfo() {
        var user = firebase.auth().currentUser;
        // console.log(name);
        user.updateProfile({
            email: parent1Email,
            //   photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {

            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });

        firebase.auth().onAuthStateChanged(function (user) {
            // if(!user) {
            //     return; // to mail screen?
            // }

            if (user) {
                // User is signed in.
                email = user.email;
                uid = user.uid;
                console.log("uid" + uid);
                console.log("email" + email);
                // ...
            } else {
                // User is signed out.
                // ...
            }
        });

    };



    $('#login').on('click', function (event) {
        event.preventDefault()
        getData();
        $(".logon-container").hide();
        $(".info-container").hide();
        $(".child-info-container").show();

        var loginEmail = $('#loginEmail').val();
        var loginPassword = $('#loginPassword').val();

        auth.signInWithEmailAndPassword(loginEmail, loginPassword);
    });

    $('#logout').on('click', function (event) {
        event.preventDefault()
        auth.signOut();
        $(".logon-container").show();
        $(".info-container").hide();
        $(".child-info-container").hide();


    });



    //----- end of log on page -----------

    //-------beginning of send to database page ----



    //   child
    $("#open-child-info").on("click", function () {
        $("#child-input-area").show();
    });

    $("#submit-child").on("click", function () {
        var child1First = $("#child-1-first").val();
        var child1Last = $("#child-1-last").val();
        var child1Age = $("#child-1-age").val();
        var child1Grade = $("#child-1-grade").val();
        var child1warning = $("#child-1-warning").val().trim();
        var child1Additional = $("#child-1-additional").val();

        database.ref("/users").child(firebase.auth().currentUser.uid).child("info").child("child1").update({
            "first-name": child1First,
            "last-name": child1Last,
            "age": child1Age,
            "grade": child1Grade,
            "warning": child1warning,
            "additional-info": child1Additional,
        }).then(function () {
            $("#open-child-info").css("color", "green");
        });
        $("#child-input-area").hide();
    });

    $("#close-child").on("click", function () {
        $("#child-input-area").hide();
    });

    // parent 1 
    $("#open-parent1-info").on("click", function () {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var displayEmail = user.email;
                console.log("email" + displayEmail);
                $("#parent1-input-area").show();
                $("#parent-1-email").text(displayEmail);

            } else {
                // User is signed out.
                // ...
            }
        });

    });

    $("#submit-parent1").on("click", function () {
        var parent1emailTemp = $("#parent-1-email").val();
        console.log("this is email: " + parent1emailTemp);
        var parent1First = $("#parent-1-first").val();
        var parent1Last = $("#parent-1-last").val();
        var parent1Cell = $("#parent-1-cell").val();
        // var parent1Email = $("#parent-1-email").val();
        database.ref("/users").child(firebase.auth().currentUser.uid).child("info").child("parent1").update({
            "first-name": parent1First,
            "last-name": parent1Last,
            "cell-number": parent1Cell,
            "email": parent1emailTemp,
        }).then(function () {
            $("#open-parent1-info").css("color", "green");
        });
        $("#parent1-input-area").hide();

    });

    $("#close-parent1").on("click", function () {
        $("#parent1-input-area").hide();
    });


    //   parent 2
    $("#open-parent2-info").on("click", function () {
        $("#parent2-input-area").show();
    });

    $("#submit-parent2").on("click", function () {
        var parent2First = $("#parent-2-first").val();
        var parent2Last = $("#parent-2-last").val();
        var parent2Cell = $("#parent-2-cell").val();
        var parent2Email = $("#parent-2-email").val();
        database.ref("/users").child(firebase.auth().currentUser.uid).child("info").child("parent2").update({
            "first-name": parent2First,
            "last-name": parent2Last,
            "cell-number": parent2Cell,
            "email": parent2Email,
        }).then(function () {
            $("#open-parent2-info").css("color", "green");
        });
        $("#parent2-input-area").hide();

    });

    $("#close-parent2").on("click", function () {
        $("#parent2-input-area").hide();
    });


    $("#continue").on("click", function () {
        getData();
        $(".child-info-container").show();
        $(".info-container").hide();
    });


    // function getData() {

    // database.ref("/users").child(firebase.auth().currentUser.uid).child("info").once("value", function (snapshot) {
    //     console.log(snapshot.val())

    //     var childName = snapshot.val().child("child1").child("first-name")
    //     // var result = snapshot.val().userMessage;

    //     //      $(".put-here").text(result);
    // });


    // };

    // // get child info from database


    function getData() {

        database.ref("/users").child(firebase.auth().currentUser.uid).child("info").once("value", function (snapshot) {
            console.log(snapshot.val())

            var childFirstName = snapshot.val().child1["first-name"];
            var childLastName = snapshot.val().child1["last-name"];
            var childFullName = (childFirstName + " " + childLastName);
            var warnings = snapshot.val().child1.warning;
            var comments = snapshot.val().child1["additional-info"];
            var grade = snapshot.val().child1.grade;
            var parent1First = snapshot.val().parent1["first-name"];
            var parent1Last = snapshot.val().parent1["last-name"];
            var parent1FullName = (parent1First + " " + parent1Last);
            var parent1Cell = snapshot.val().parent1["cell-number"];
            var parent1Email = snapshot.val().parent1.email;
            var parent2First = snapshot.val().parent2["first-name"];
            var parent2Last = snapshot.val().parent2["last-name"];
            var parent2FullName = (parent2First + " " + parent2Last);
            var parent2Cell = snapshot.val().parent2["cell-number"];
            var parent2Email = snapshot.val().parent2.email;
            console.log(childFullName);
            console.log("cell: " +parent1Cell);
            console.log("email: " +parent1Email);

            $("#child1-name").text(childFullName);
            $(".child1-first").text(childFirstName);
            $("#child1-warning").text(warnings);
            $("#child1-comments").text(comments)
            $("#child1-grade").text(grade);
            $("#child1-image").attr("src", "../emmett.jpg")
            $("#parent-1").text(parent1FullName);
            $("#parent-2").text(parent2FullName);

            // Modal parent1 
            // could do this dynamic going thru the keys; for each; 
            $("#parent1-name").text(parent1FullName);
            $("#parent1-cell").text(parent1Cell);
            $("#parent1-email").text(parent1Email);

            // Modal parent2 
            // could do this dynamic going thru the keys; for each; 
            $("#parent2-name").text(parent2FullName);
            $("#parent2-cell").text(parent2Cell);
            $("#parent2-email").text(parent2Email);






        });


    };

    $("#parent-1").on("click", function () {

    })
});  // end of document ready;