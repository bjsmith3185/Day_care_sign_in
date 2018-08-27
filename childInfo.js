$( document ).ready(function() {

    $(".logon-container").hide();
    $(".info-container").hide();
    $(".child-info-container").show();
    
    
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
    
    
    //-------from log in page ----------
    
     
   
    
    
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
            $("#child1-image").attr("src","../emmett.jpg")
            $("#parent-1").text(parent1FullName);
            $("#parent-2").text(parent2FullName);

           
        });
    
    
    // };
    
    
    
    });  // end of doc ready
    