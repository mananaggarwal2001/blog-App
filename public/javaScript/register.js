$('#registerId').click(() => {
    let firstName = $('#FirstName').val();
    let lastName = $('#LastName').val();
    let username = $('#Username').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let C_password = $('#C_password').val();
    if (firstName == "" || lastName == "" || username == "" || email == "" || password == "" || C_password == "") {
        Swal.fire('Missing Details', 'Enter the missing Details', 'warning');
    } else if (password !== C_password) {
        Swal.fire('Mismatch', 'Password Did not match', 'error');
    } else {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                $('form').submit((element) => {
                    console.log(element);
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        });
    }

});