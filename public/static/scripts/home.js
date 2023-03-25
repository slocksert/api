async function waitRequest() {
    
    const response = await fetch(
        "http://localhost:8000/test/test",
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
    )

    if (!response.ok) {
        location.href = 'http://localhost:5500/public/index.html'
    }

}

function App() {
    waitRequest()
}

App()