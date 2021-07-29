

// ***************      initialize         ***********


var namee = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var db=firebase.firestore();


// ***************      Account Register         ***********
var register = () => {
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log("your account is registered");
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    console.log("your account is not register");
  });
}



// ***************      Account Login         ***********
var login = () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      window.location = "./home.html";
      console.log("login");
      chekUser();
      // console.log(userInfo);

      
      
      // ***************     Object User info         ***********
      var userInfo = {
        name : namee.value,
        emaill : userCredential.user.email,
        ID : userCredential.user.uid
      }
      
      addUserData(userInfo)
      
      
      
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("you are not login" + error);
    });
  }
  
  
  // **************    ADD DATA    ****************
  
  var addUserData = (dataSave) => {
    // db.collection("userInfo").add(dataSave) // add with random generate Id
    db.collection("userInfo").doc(dataSave.ID).set(dataSave)  // add with choose Id
    // db.collection("userInfo").doc("user").update({ karachi : true }) // update something
    // db.collection("userInfo").doc("user").delete({ karachi : true }) // delete 
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }
  
  
  
  // ***************     Logout account         ***********
  var logOut = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      window.location = "./index.html";
    }).catch((error) => {
      // An error happened.
    });
  }
  
  
  
  
  
  
  
  
  
  
  
  // ***************     Forgate Password         ***********
  var forgatePass = () => {
    firebase.auth().sendPasswordResetEmail(email.value)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
 }











 // ********* On State Change *************
 var chekUser = () => {
   firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       // User is signed in, see docs for a list of available properties
       // https://firebase.google.com/docs/reference/js/firebase.User
       console.log("state Change " + user);
       fetchData();
       // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  // **************8             Error  **********************
  
  // ********* Fetch Data *************
var fetchData = () => {
  // var uidd = firebase.auth().currentUser.uid;
  var uidd = firebase.auth().currentUser.uid;
    // var docRef = db.collection("users").doc(uid);
    console.log(uidd);





docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
}



var docRef = db.collection("users");
docRef.get()
    .then((usersSnapshot) => {
        usersSnapshot.forEach((userDoc) => {
            console.log(userDoc.data(),'*************');
        })

    })
    .catch((error) => {
        console.log("Error getting document:", error);
    });






















































