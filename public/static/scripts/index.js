async function homeData() {
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

homeData()
