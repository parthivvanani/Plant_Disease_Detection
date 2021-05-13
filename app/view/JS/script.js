/*jshint esversion: 8*/
function signup() {

    console.log($('#username').val())
    let user = {
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        role: ["user"]
    };

    fetch("/api/auth/signup",  {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user)
    
    }).then(async (response) => {
        console.log("response");
        let result = await response.json();
        console.log(result);
        toastr.options = {
            "positionClass": "toast-bottom-full-width"
        };
        if(response.status !== 200) {
            toastr.error(result.message);
        } else {
            toastr.success(result.message);
        }
      
    });
}

function login() {
    
}

function validateEmail()
{
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if($('#email').val().match(mailformat))
    {
        alert("Valid email address!");
        document.form1.text1.focus();
        return true;
    }
    else
    {
        alert("You have entered an invalid email address!");
        document.form1.text1.focus();
        return false;
    }
}
