$(document).ready(function() {

    // CREATE SUB MENU
    $('#form_submenu').submit(function(e) {
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
            url: "/submenu/create", // Form submission URL
            type: "POST",
            data: $("#form_submenu").serialize(), // Serialize form data
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
                window.location.href = "/submenu/list";
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

      // URURTAN SUBMENU
      $.ajax({
        url: '/submenu/get_max',
        type: "GET",
        success: function(data) {
          $('#urutan').val(data + 1); // Opsional: Setel nilai input ke hasil
        },
        error: function(xhr, status, error) {
          console.error('Error:', error); // Menangani error
        }
      });

      // GET EDIT DATA SUB MENU
      $(document). on('click', '.subMenuEditBtn', function() {
        const id = $(this).data('id');
        // console.log(id);
        $.ajax({
          url: `/submenu/edit/${id}`,
          type: "GET",
          success: function(data) {
            // console.log(data);
            $('#nama_submenu').val(data.nama_submenu);
            $('#link').val(data.link);
            $('#icon').val(data.icon);
            $('#id_menu').val(data.id_menu);
            $('#urutan').val(data.urutan);
            $('#is_active').val(data.is_active);
            $('#hidden_id_submenu').val(data.id_submenu);
          }, error: function() {
            swal("Error", "Failed to load user data.", "error");
          }
        });
      });

      // UPDATE SUB MENU
      $(document).on('click', '#subMenuUpdateButton', function() {
        const id_submenu = $('#hidden_id_submenu').val();
        console.log(id_submenu);
        $.ajax({
          url: `/submenu/update/${id_submenu}`,
          type: "PUT",
          data: {
            nama_submenu: $('#nama_submenu').val(),
            link: $('#link').val(),
            icon: $('#icon').val(),
            id_menu: $('#id_menu').val( ),
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

      // DELETE SUB MENU
      $(document).on('click', '.subMenuDelBtn', function(e) {
        e.preventDefault();
        const id_submenu = $(this).data('id');
        console.log(id_submenu);

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
              url: `/submenu/delete/${id_submenu}`, // Use template literal correctly
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
                  window.location.href = "/submenu/list";
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