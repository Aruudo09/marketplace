$(document).ready(function() {

    // GET DATA MENU FOR EDIT
    $(document). on('click', '.menuEditBtn', function() {
        const id = $(this).data('id');
        $.ajax({
          url: `/menu/edit/${id}`,
          type: "GET",
          success: function(data) {
            $('#nama_menu').val(data.nama_menu);
            $('#link').val(data.link);
            $('#icon').val(data.icon);
            $('#urutan').val(data.urutan);
            $('#is_active').val(data.is_active);
            $('#hidden_id_menu').val(data.id_menu);
          }, error: function() {
            swal("Error", "Failed to load user data.", "error");
          }
        });
      });

      // GET MAX URUTAN MENU
      $.ajax({
        url: '/menu/get_max',
        type: "GET",
        success: function(data) {
          // console.log(data); // Data 'max' dari server akan dicetak di sini
          $('#urutan').val(data + 1); // Opsional: Setel nilai input ke hasil
        },
        error: function(xhr, status, error) {
          console.error('Error:', error); // Menangani error
        }
      });

      // CREATE MENU
      $('#form_menu').submit(function(e) {
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
            url: "/menu/create", // Form submission URL
            type: "POST",
            data: $("#form_menu").serialize(), // Serialize form data
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
                window.location.href = "/menu/list";
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

      // UPDATE MENU
      $(document).on('click', '#menuUpdateButton', function() {
        const id = $('#hidden_id_menu').val();
        console.log(id);
        $.ajax({
          url: `/menu/update/${id}`,
          type: "PUT",
          data: {
            nama_menu: $('#nama_menu').val(),
            link: $('#link').val(),
            icon: $('#icon').val(),
            urutan: $('#urutan').val(),
            is_active: $('#is_active').val()
          },
          success: function(data) {
            $('#editUserModal').modal('hide');
            swal("Success", "Menu updated successfully", "success").then(() => {
              window.location.reload(); // Refresh or update your data table as needed
            });
          }, error() {
            swal("Error", "Could not update menu", "error");
          }
        });
      });

      // DELETE MENU
      $(document).on('click', '.menuDelBtn', function(e) {
        e.preventDefault();
        const id_menu = $(this).data('id');

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
              url: `/menu/delete/${id_menu}`, // Use template literal correctly
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
                  window.location.href = "/menu/list";
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