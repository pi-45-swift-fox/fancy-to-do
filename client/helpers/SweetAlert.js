import Swal from 'sweetalert2'

class SweetAlert {
    static showAlertSuccess(message) {
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonText: 'Ok'
          })
    }
    
    static showAlertFail(message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonText: 'Close'
          })
    }
}

module.exports = SweetAlert