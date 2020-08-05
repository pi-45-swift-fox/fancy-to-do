const form = $('#formLogin');

if (!localStorage.token) {
    form.show();
    form.submit(event => {
        event.preventDefault();
        
        const data = {
            email: $('#email').val(),
            username: $('#username').val(),
            password: $('#password').val()
        };
    
        $.ajax('http://localhost:3000/login', {
            method: 'POST',
            data
        })
        .done(data => {
            console.log(data);
            localStorage.token = data.token;
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('Selesai');
        });
    });
} else {
    form.hide();

    $.ajax('http://localhost:3000/', {
        method: 'GET',
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(data => {
        let res = "<table>";
        data.Todos.forEach(e => {
            res += `<tr> <td> ${e.title} </td> <td> ${e.description} </td> <td> ${e.status} </td> </tr>`;            
        });
        res += '</table>';
        $("#result").html(res);
        console.log(data);
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log('Selesai');
    });
}
