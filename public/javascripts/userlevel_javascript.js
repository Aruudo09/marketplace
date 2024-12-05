$(document).ready(function() {

    // FORM INPUT USERS
    $("#form_userlevel").submit(function (e) {
        e.preventDefault(); // Prevent the default form submission
        
        swal({
          title: "Are you sure?",
          text: "Do you want to submit this form?",
          icon: "warning",
          buttons: {
            confirm: {
              text: "Yes, submit it!",
              className: "btn btn-success",
            },
            cancel: {
              text: "Cancel",
              visible: true,
              className: "btn btn-danger",
            },
          },
        }).then((willSubmit) => {
          if (willSubmit) {
           // If the user confirms, submit the form using AJAX
          $.ajax({
            url: "userlevel/create", // Form submission URL
            type: "POST",
            data: $("#form_users").serialize(), // Serialize form data
            success: function(response) {
              // Redirect to /users_list if the submission is successful
              swal({
                title: "Submission Success",
                text: "Create new data is success",
                icon: "success",
                buttons: {
                  confirm: {
                    text: "OK",
                    className: "btn btn-success",
                  },
                },
              }).then(() => {
                // Redirect to /users_list after the user clicks "OK"
                window.location.href = "userlevel/list";
              });
            },
            error: function(xhr, status, error) {
              // Show SweetAlert error if submission fails
              swal({
                title: "Submission Failed",
                text: "An error occurred while submitting the form. Please try again.",
                icon: "error",
                buttons: {
                  confirm: {
                    text: "OK",
                    className: "btn btn-danger",
                  },
                },
              });
            }
          });
          } else {
            swal.close();
          }
        });
      });

      // GET DATA USER FOR EDIT
      $(document).on('click', '.userLevelEditBtn', function() {
        const id = $(this).data('id');
        $.ajax({
          url: `/userlevel/edit/${id}`,
          method: 'GET',
          success: function (data) {
            $('#nama_level').val(data.nama_level);
          },
          error: function() {
            swal("Error", "Failed to load user data.", "error");
          } 
        });
      });

      // UPDATE USER DATA
      $(document).on('click', '#editUpdateButton', function() {
        const userId = $('#hidden_id_user').val();
        $.ajax({
          url: `/userlevel/update/${userId}`,
          method: 'PUT',
          data: {
            nama_level: $('#nama_level').val(),
          },
          success: function() {
            $('#editUserModal').modal('hide');
            swal("Success", "User updated successfully", "success").then(() => {
              window.location.reload(); // Refresh or update your data table as needed
            });
          },
          error: function() {
            swal("Error", "Could not update user", "error");
          }
        });
      });

      // HAPUS DATA USER
      $(document).on('click', '.userDelBtn', function(e) {
        e.preventDefault();
        const id_del = $(this).data('id');

        swal({
          title: "Are you sure?",
          text: "Do you want to delete this data?",
          icon: "warning",
          buttons: {
            confirm: {
              text: "Yes, delete it!",
              className: "btn btn-success",
            },
            cancel: {
              text: "Cancel",
              visible: true,
              className: "btn btn-danger",
            },
          },
        }).then((willSubmit) => {
          if (willSubmit) {
            // If the user confirms, submit the form using AJAX
            $.ajax({
              url: `/userlevel/delete/${id_del}`, // Use template literal correctly
              method: 'DELETE',
              success: function(response) {
                // Show success message
                swal({
                  title: "Deletion Successful",
                  text: "The data has been successfully deleted.",
                  icon: "success",
                  buttons: {
                    confirm: {
                      text: "OK",
                      className: "btn btn-success",
                    },
                  },
                }).then(() => {
                  // Redirect to /users_list after the user clicks "OK"
                  window.location.href = "userlevel/list";
                });
              },
              error: function(xhr, status, error) {
                // Show SweetAlert error if deletion fails
                swal({
                  title: "Failed to delete data",
                  text: "An error occurred while deleting the data. Please try again.",
                  icon: "error",
                  buttons: {
                    confirm: {
                      text: "OK",
                      className: "btn btn-danger",
                    },
                  },
                });
              }
            });
          } else {
            swal.close();
          }
        });
      });

});