async function verifyToken(){

    const response = await fetch('http://localhost:8000/test/test', {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (!response.ok){
        location.href = 'http://localhost:5500/public/index.html'
    }
    
        
}


async function logOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    location.href = 'http://localhost:5500/public/index.html'
}

function App() {
    verifyToken()
}

App()