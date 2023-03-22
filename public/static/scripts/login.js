function sendLogin() {
    const username = document.getElementById("login_username")
    const password = document.getElementById("login_password")
    const form = document.getElementById('form_data')
    const url_login = 'http://localhost:8000/user/login'
    //const submit = document.getElementById("button_").onclick = function () {
           // location.href = 'http://localhost:8000/test/test'
   // }


    form.onsubmit = async (event) => {
        event.preventDefault()
        const username_value = username.value
        const password_value = password.value
        var details = {
            "username": username_value,
            "password": password_value
        }
        var formBody = []
        
        for (var property in details) {
            var encondeKey = property
            var encodeValue = details[property]
            formBody.push(encondeKey + "=" + encodeValue)
        }
        formBody = formBody.join("&")

        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: formBody
          }

          fetch(url_login, options)
          .then( response => {
            return response.json
          })
          .then(json => {
            if (json.status === "success") {

                var access_token = json['access_token']
                console.log(access_token)
                
                //fetch('http://localhost:8000/test/test'), {
                  //  method: "GET",
                    //headers: {
                      //  "Authorization": "Bearer " + access_token
                   // }
                  //}

                //location.href = "http://localhost:8000/test/test"
            }
          })
    }
}

function Login() {
    console.log("Login")
    sendLogin()
}

Login()