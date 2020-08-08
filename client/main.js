const server = 'http://localhost:3000'

$(document).ready(()=>{
    auth()

    $('#logInPage').submit((event)=>{
        event.preventDefault()

        const email = $('#email').val()
        const password = $('#password').val()

        $.ajax(`${server}/login`, {
            method: 'POST',
            data: {
                email,
                password
            }
        })
            .done(data=>{
                console.log('data', data)
                localStorage.access_token = data.access_token
                auth()
                $('#email').val('')
                $('#password').val('')
            })
            .fail(err=>{
                console.log('err', err)
            })
            .always(()=>{
                console.log('finished')
            })
    })
})

$('#logoutButton').click(()=>{
    localStorage.clear()
    auth()
})

function auth() {
    if (!localStorage.access_token) {
        $('#loginPage').show()
        $('#homePage').hide()
    } else {
        $('#loginPage').hide()
        $('#homePage').show()        
        showTodos()
    }
}

function showTodos() {
    $('#todosTable').empty()
    $.ajax(`${server}/todos`, {
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
    })
        .done(data=>{
            console.log(data)
            let num = 1
            data.forEach(todo => {
                $('#todosTable').append(`
                <tr id="todosRow">
                    <th scope="row"> ${num} </th>
                    <td> <b>${todo.title}</b> </td>
                    <td> ${todo.description} </td>
                    <td> ${todo.status} </td>
                    <td> ${todo.due_date} </td>
                </tr>
                `)
                num++
            });
            num = 1
        })
        .fail(err=>{
            console.log(err)
        })
        .always(()=>{
            console.log('success')
        })
}
