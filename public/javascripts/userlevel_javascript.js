$(document).ready(function() {

  $('#userLevelTable').DataTable({
    ajax: {
      url: '/api/userlevels', // URL endpoint API
      type: 'GET',
      dataSrc: '' // Data langsung sebagai array
    },
    columns: [
      { data: 'id_level' },
      { data: 'nama_level' },
      {
        data: null,
        render: function (data, type, row) {
          return `
            <div class="form-button-action">
              <a data-bs-toggle="modal" data-bs-target="#editUserModal" data-id="${row.id_level}" 
                class="btn btn-link btn-primary btn-lg userLevelEditBtn">
                <i class="fa fa-edit"></i>
              </a>
              <a data-id="${row.id_level}" class="btn btn-link btn-danger userLevelDelBtn">
                <i class="fa fa-times"></i>
              </a>
            </div>
          `;
        }
      }
    ]
  });

  $('#userLevelTable').DataTable({
    // Your options...
    dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
         '<"row"<"col-sm-12"tr>>' +
         '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
  });

  $(document).on('click', '.userLevelEditBtn', function () {
    const id = $(this).data('id');
    // Load data into the modal via AJAX or directly
    console.log(`Edit user level with ID: ${id}`);
  });
  
  $(document).on('click', '.userLevelDelBtn', function () {
    const id = $(this).data('id');
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        $.ajax({
          url: `/list/delete/${id}`,
          type: 'DELETE',
          success: function (response) {
            swal('Deleted!', response.message, 'success');
            $('#userLevelTable').DataTable().ajax.reload(); // Reload table
          },
          error: function () {
            swal('Error', 'Failed to delete user level', 'error');
          },
        });
      }
    });
  });
  


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

      var action = '';
      var method = '';

      // GET DATA USER FOR EDIT
      $(document).on('click', '.userLevelEditBtn', function() {
        const id = $(this).data('id');
        $('#editUpdateButton').text('Edit');
        action = false;
        $.ajax({
          url: `/userlevel/edit/${id}`,
          method: 'GET',
          success: function (data) {
            console.log(data);
            $('#nama_level').val(data.nama_level);
            $('#hidden_id_userlevel').val(id);
          },
          error: function() {
            swal("Error", "Failed to load user data.", "error");
          } 
        });
      });

      // ADD FORM USER LEVEL
      $(document).on('click', '.userLevelAddBtn', function() {
        $('#editUpdateButton').text('Add');
        $('#nama_level').val('');
            $('#hidden_id_userlevel').val('');
        action = true;
      });

      // UPDATE USER DATA
      $(document).on('click', '#editUpdateButton', function() {
          const id = $('#hidden_id_userlevel').val();
          url = action ? `/userlevel/create` : `/userlevel/update/${id}`;
          method = action ? 'POST' : 'PUT';
        $.ajax({
          url: url,
          method: method,
          data: {
            nama_level: $('#nama_level').val(),
          },
          success: function() {
            $('#editUserModal').modal('hide');
            swal("Success", "User saved successfully", "success").then(() => {
              window.location.reload(); // Refresh or update your data table as needed
            });
          },
          error: function() {
            swal("Error", "Could not saving user data", "error");
          }
        });
      });

      // HAPUS DATA USER
      $(document).on('click', '.userLevelDelBtn', function(e) {
        e.preventDefault();
        const id = $(this).data('id');
        console.log(id);

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
              url: `/userlevel/delete/${id}`, // Use template literal correctly
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
                  window.location.href = "/userlevel/list";
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