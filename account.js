userData = "";

function register () {
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var confirm_password = document.getElementById("confirm-password").value;
	if(password == confirm_password && email != "") {
	var ref = new Firebase("https://media-monster.firebaseio.com");
	ref.createUser({
	  email    : email,
	  password : password
	}, function(error) {
	  if (error === null) {
	    console.log("User created successfully");
	ref.authWithPassword({
	  email    : email,
	  password : password
	}, function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
    console.log("Authenticated successfully with payload:", authData);
    userData = authData.uid;
    console.log(userData);
  	}
	});
	   location.href="index.html";
	  } else {
	    console.log("Error creating user:", error);
	    document.getElementById("email-text").innerHTML = error
	    document.getElementById("email-div").className = "form-group has-error";	  }
	});
	} else {
		console.log("Error with form.");
	}
}

function validateEmail () {
	var email = document.getElementById("email").value;
	var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
		document.getElementById("email-div").className = "form-group has-error";
	} else {
		document.getElementById("email-div").className = "form-group has-success";
	}
}

function validatePassword () {
	var password = document.getElementById("password").value;	if(password.length < 7) {
		document.getElementById("password-div").className = "form-group has-error";
		document.getElementById("password-text").innerHTML = "Weak Password";
	} else if(password.length > 7 && password.length < 10) {
		document.getElementById("password-div").className = "form-group has-warning";
		document.getElementById("password-text").innerHTML = "Moderate Password";
	} else if(password.length > 10) {
		document.getElementById("password-div").className = "form-group has-success";
		document.getElementById("password-text").innerHTML = "Good Password";
	}
}

function validateConfirmPassword() {
	var password = document.getElementById("password").value;
	var confirm_password = document.getElementById("confirm-password").value;
	if(password == confirm_password) {
		document.getElementById("confirm-password-div").className = "form-group has-success";
		document.getElementById("confirm-password-text").innerHTML = "";
	} else {
		document.getElementById("confirm-password-div").className = "form-group has-error";
		document.getElementById("confirm-password-text").innerHTML = "Passwords do not match!";
	}
}

function pageLoad() {
	document.getElementById("login-button").innerHTML = userData;
	console.log(userData);
}
