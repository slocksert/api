function sendData() {
    const form_data = document.getElementById('form_data')
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    const confirm_password = document.getElementById('password2')
    const url_register = 'http://localhost:8000/user/register'

    form_data.onsubmit = async (event) => {
        event.preventDefault()
        const username_value = username.value
        const password_value = password.value
        const confirm_password_value = confirm_password.value

        if (password_value == confirm_password_value) {   
            const options = {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify({
                  "username": username_value,
                  "password": password_value,
                })
              }

              fetch(url_register, options)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })

        } else {
            alert('Passwords do not match')
        }
    }   
}

function Register() {
    sendData()
}

Register()