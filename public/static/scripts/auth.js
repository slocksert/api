async function verifyToken(){

    const response = await fetch('http://localhost:8000/test/ŧest', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (response.status == 401) {
        location.href = 'http://localhost:5500/public/index.html'
    }


}

function App(){
    verifyToken()
}

App()
