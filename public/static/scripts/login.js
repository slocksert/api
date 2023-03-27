async function sendLogin() {
    const username = document.getElementById("login_username")
    const password = document.getElementById("login_password")
    const form = document.getElementById('form_data')
    const url_login = 'http://localhost:8000/user/login'

    form.onsubmit = async (event) => {
        event.preventDefault()
        const username_value = username.value
        const password_value = password.value
        localStorage.setItem('user', username_value)
        var details = {
            "username": username_value,
            "password": password_value
        }
        var formBody = []
        
        for (var property in details) {
            var key = property
            var value = details[property]
            formBody.push(key + "=" + value)
        }
        formBody = formBody.join("&")

        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: formBody
          }

          const response = await fetch(url_login, options)
          if (!response.ok) {
            alert("Incorrect username or password")
            throw new Error("Failed to login")
          }

          const data = await response.json()
          localStorage.setItem('token', data.access_token)

          location.href = "http://localhost:5500/public/index_auth.html"

    }}

sendLogin()