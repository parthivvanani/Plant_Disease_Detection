/*jshint esversion: 8*/
function signup() {

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

    let user = {
        username: $('#username').val(),
        password: $('#password').val(),
    };

    fetch("/api/auth/signin",  {
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
            toastr.success("User logged in successfully! \n Token: " + result.accessToken);
        }
      
    });
}


/**Here */
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    $.blockUI();

    var x = 10;
    var form = $('#uploadForm')[0];
    var data = new FormData(form);
    // formData.append('upload', document.getElementById('image').files[0]);
    x = 15;

    /**
     * prediction {
     *      payload: [
     *          label{
     *                  annotationSpecID: String
     *                  displayName: String
     *                  classification: {
     *                      }
     *                  details: String
     *              },
     *          label{},....1
     *      ]
     * }
     */
    /**Stackoverflow  */
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/upload/",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
            $.unblockUI();
            var result = "";
            for (const annotationPayload of data.payload) {
                if(annotationPayload.displayName === 'tomato_leaf') continue;
                result = result + (`Predicted class name: ${annotationPayload.displayName}`) + "<br>";
                result = result + `Predicted class score: ${annotationPayload.classification.score}` + "<br><br>";
            }

            $("#predict").html("Prediction: <br/>" + result);
            console.log("SUCCESS : ", data);
            // $("#btnSubmit").prop("disabled", false);

        },
        error: function (e) {
            $.unblockUI();
            $("#predict").text("Error: " + e.responseText);
            console.log("ERROR : ", e);
            // $("#btnSubmit").prop("disabled", false);

        }
        // url: 'api/upload',
        // type: 'post',
        // dataType: 'json',
        // data: $('form#uploadForm').serialize(),
        // success: function(data) {
        //             if(data.length > 0) {
        //                 var res = JSON.stringify(data);
        //                 $("#predict").text(res);
        //             }   
        //             else {
        //                 $("#predict").text("Something went wrong.");
        //             }
        //         }
    });
    
    // $.post('api/upload', {
    //     vmc: TData
    // }, function (data) {
    //     $.unblockUI();
    //     if (data == "success") {
    //         swal({ title: 'Success!', text: 'Successful.', type: 'success' }, function () { window.location = '/Home/Index'; });
    //     }
    //     else {
    //         swal('Warning', 'Load failed. Reason: ' + data.replace('Failed:', ''), 'warning');
    //     }
    // }).fail(function (res) {
    //     $.unblockUI();
    //     swal('Warning', 'Load failed. Reason: ' + res.responseText, 'warning');
    // });
});


/***** */

// document.querySelector('form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const fileInput = document.querySelector('#image') ;
//     const formData = new FormData();
//     console.log(fileInput);
//     formData.append('file', fileInput.files[0]);

//         const options = {
//         method: 'POST',
//         body: formData,
//         // If you add this, upload won't work
//         // headers: {
//         //   'Content-Type': 'multipart/form-data',
//         // }
//     };
// } );

function upload(e) {
    
}



// function upload() {
    // var data = new FormData();
    // data.append('file', $('#image').files[0]);

    // fetch("/api/auth/signin",  {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json',
    //     },
    //     body: JSON.stringify(user)
    
    // }).then(async (response) => {
    //     console.log("response");
    //     let result = await response.json();
    //     console.log(result);
    //     toastr.options = {
    //         "positionClass": "toast-bottom-full-width"
    //     };
    //     if(response.status !== 200) {
    //         toastr.error(result.message);
    //     } else {
    //         toastr.success("User logged in successfully!");
    //     }
      
    // });
// }

// function validateEmail()
// {
//     var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     if($('#email').val().match(mailformat))
//     {
//         alert("Valid email address!");
//         document.form1.text1.focus();
//         return true;
//     }
//     else
//     {
//         alert("You have entered an invalid email address!");
//         document.form1.text1.focus();
//         return false;
//     }
// }
