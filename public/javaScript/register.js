$('#registerId').click(() => {
    let firstName = $('#FirstName').val();
    let lastName = $('#LastName').val();
    let username = $('#Username').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let C_password = $('#C_password').val();
    let lengthPassword = password.length;

    if (firstName == "" || lastName == "" || username == "" || email == "" || password == "" || C_password == "") {
        Swal.fire('Missing Details', 'Enter the missing Details', 'warning');
    } else if (lengthPassword < 6) {
        Swal.fire('Oops!!!!!', 'Password Should be min 6 Characters Long', 'warning');
    } else if (password !== C_password) {
        Swal.fire('Mismatch', 'Password Did not match', 'error');
    } else {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be Redirected to the Login Page',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                $('form').submit();

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                return false;
            }
        });
    }

});