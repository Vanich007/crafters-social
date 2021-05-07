const request = new XMLHttpRequest()
request.open('GET','http://localhost:3004/posts/')
request.setRequestHeader('Content-type', 'application/json; charset=utf-8')
request.send
request.addEventListener('readystatechange', () => {
    if request.readyState === 4 && request.status= 200 {
       
    }
})