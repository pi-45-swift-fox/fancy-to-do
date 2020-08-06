function checkLogin(){
    if(!localStorage.token){
        $("#formSignIn").show()
        $('#homepage').hide()
        $("#logout").hide()
    }else{
        $('#formSignIn').hide()
        $('#homepage').show()
        $("#logout").show()
    }
}

$(document).ready(function(){
    $('#formRegister').hide()
    checkLogin()
    $('#RegisterButton').click(event=>{
        event.preventDefault()
        $('#formRegister').show()
        $("#formSignIn").hide()
    })
    $('#formRegister').submit(event=>{
        event.preventDefault()
        const email = $('#emailLogin').val()
        const password = $('#passwordLogin').val()
        $.ajax('http://localhost:3000/register', {
            method: "POST",
            data:{
                email,
                password
            }
        })
        .done(function(data){
            checkLogin()
            show()
            $("#emailLogin").val('')
            $("#passwordLogin").val('')
        })
        .fail(function(err){
            // $('#error').append(`<button type="button" class="btn btn-danger">${err}</button>`)
            console.log(err)
        })
        .always(function(){
            console.log('selesai')
        })
    })

    $('#formSignIn').submit(function(event){
        event.preventDefault()
        const email = $('#emailLogin').val()
        const password = $('#passwordLogin').val()
        $.ajax('http://localhost:3000/login', {
            method: "POST",
            data:{
                email,
                password
            }
        })
        .done(function(data){
            localStorage.token = data.token
            checkLogin()
            show()
            $("#emailLogin").val('')
            $("#passwordLogin").val('')
            $('#logout').click(event=>{
                event.preventDefault()
                localStorage.clear()
                checkLogin()
            })
        })
        .fail(function(err){
            // $('#error').append(`<button type="button" class="btn btn-danger">${err}</button>`)
            console.log(err)
        })
        .always(function(){
            console.log('selesai')
        })
    })

    function show(){
        $.ajax('http://localhost:3000/todos', {
        method: "GET",
        headers: {
            access_token : localStorage.token
        }
    })
    .done(function(data){
        data.forEach(el => {
            $('.table').append(`
            <tr>
            <td>${el.id}</td>
            <td>${el.title}</td>
            <td>${el.description}</td>
            <td><input type="checkbox">${el.status}</td>
            <td>${el.Due_date}</td>
            <td>${el.User.email}</td>
            <td>${el.User.id}</td>
            </tr>
            `)
            })
        
        
    })
    .fail(function(err){
        console.log(err)
    })
    .always(function(){
        console.log('selesai')
    })
    }
    
})