async function sendData() {
    const form_data = document.getElementById('form_data')
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    const confirm_password = document.getElementById('password2')
    const url_register = 'http://localhost:8000/user/register'
    const email = document.getElementById('email')


    form_data.onsubmit = async (event) => {
        event.preventDefault()
        const username_value = username.value
        const password_value = password.value
        const email_value = email.value
        const confirm_password_value = confirm_password.value
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            "username": username_value,
            "password": password_value,
            "email": email_value
          })
        }

        if (password_value == confirm_password_value) {   
          const response = await fetch(url_register, options)
          var data = await response.json()
          var data_json = JSON.stringify(data.detail)

          if (response.ok){
            alert("User registered")
            location.href = 'http://localhost:5500/public/login.html'
          }
          else{
            var data_quotes = data_json.replace(/["']/g, "")
            alert(data_quotes)
          }
        }
        else {
          alert("Passwords do not match")
        }
    }   
}

async function verifyToken() {
  
  const response = await fetch('http://localhost:8000/test/test', {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
})

if (response.status == 200){
    location.href = 'http://localhost:5500/public/index_auth.html'
}

}

function App() {
  verifyToken()
  sendData()
}

App()
