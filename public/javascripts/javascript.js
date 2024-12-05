$(document).ready(function() {
    //Dashboard
    $("#lineChart").sparkline([102, 109, 120, 99, 110, 105, 115], {
        type: "line",
        height: "70",
        width: "100%",
        lineWidth: "2",
        lineColor: "#177dff",
        fillColor: "rgba(23, 125, 255, 0.14)",
      });
    
      $("#lineChart2").sparkline([99, 125, 122, 105, 110, 124, 115], {
        type: "line",
        height: "70",
        width: "100%",
        lineWidth: "2",
        lineColor: "#f3545d",
        fillColor: "rgba(243, 84, 93, .14)",
      });
    
      $("#lineChart3").sparkline([105, 103, 123, 100, 95, 105, 115], {
        type: "line",
        height: "70",
        width: "100%",
        lineWidth: "2",
        lineColor: "#ffa534",
        fillColor: "rgba(255, 165, 52, .14)",
      });
      //END DASHBOARD

    //Datatables
    $("#basic-datatables").DataTable({});
        $("#multi-filter-select").DataTable({
          pageLength: 5,
          initComplete: function () {
            this.api()
              .columns()
              .every(function () {
                var column = this;
                var select = $(
                  '<select class="form-select"><option value=""></option></select>'
                )
                  .appendTo($(column.footer()).empty())
                  .on("change", function () {
                    var val = $.fn.dataTable.util.escapeRegex($(this).val());

                    column
                      .search(val ? "^" + val + "$" : "", true, false)
                      .draw();
                  });

                column
                  .data()
                  .unique()
                  .sort()
                  .each(function (d, j) {
                    select.append(
                      '<option value="' + d + '">' + d + "</option>"
                    );
                  });
              });
          },
        });

        // Add Row
        $("#add-row").DataTable({
          pageLength: 5,
        });

        var action =
          '<td> <div class="form-button-action"> <button type="button" data-bs-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task"> <i class="fa fa-edit"></i> </button> <button type="button" data-bs-toggle="tooltip" title="" class="btn btn-link btn-danger" data-original-title="Remove"> <i class="fa fa-times"></i> </button> </div> </td>';

        $("#addRowButton").click(function () {
          $("#add-row")
            .dataTable()
            .fnAddData([
              $("#addName").val(),
              $("#addPosition").val(),
              $("#addOffice").val(),
              action,
            ]);
          $("#addRowModal").modal("hide");
        });

        // FORM INPUT USERS
        // $("#form_users").submit(function (e) {
        //   e.preventDefault(); // Prevent the default form submission
          
        //   swal({
        //     title: "Are you sure?",
        //     text: "Do you want to submit this form?",
        //     icon: "warning",
        //     buttons: {
        //       confirm: {
        //         text: "Yes, submit it!",
        //         className: "btn btn-success",
        //       },
        //       cancel: {
        //         text: "Cancel",
        //         visible: true,
        //         className: "btn btn-danger",
        //       },
        //     },
        //   }).then((willSubmit) => {
        //     if (willSubmit) {
        //      // If the user confirms, submit the form using AJAX
        //     $.ajax({
        //       url: "/create_user", // Form submission URL
        //       type: "POST",
        //       data: $("#form_users").serialize(), // Serialize form data
        //       success: function(response) {
        //         // Redirect to /users_list if the submission is successful
        //         swal({
        //           title: "Submission Success",
        //           text: "Create new data is success",
        //           icon: "success",
        //           buttons: {
        //             confirm: {
        //               text: "OK",
        //               className: "btn btn-success",
        //             },
        //           },
        //         }).then(() => {
        //           // Redirect to /users_list after the user clicks "OK"
        //           window.location.href = "/users_list";
        //         });
        //       },
        //       error: function(xhr, status, error) {
        //         // Show SweetAlert error if submission fails
        //         swal({
        //           title: "Submission Failed",
        //           text: "An error occurred while submitting the form. Please try again.",
        //           icon: "error",
        //           buttons: {
        //             confirm: {
        //               text: "OK",
        //               className: "btn btn-danger",
        //             },
        //           },
        //         });
        //       }
        //     });
        //     } else {
        //       swal.close();
        //     }
        //   });
        // });

        // // GET DATA USER FOR EDIT
        // $(document).on('click', '.userEditBtn', function() {
        //   const id = $(this).data('id');
        //   $.ajax({
        //     url: `/user/edit/${id}`,
        //     method: 'GET',
        //     success: function (data) {
        //       $('#fullname').val(data.fullname);
        //       $('#username').val(data.username);
        //       $('#password').val(data.password); // Reset or leave blank for security
        //       $('#id_level').val(data.id_level);
        //       $('#is_active').val(data.is_active);
        //       $('#hidden_id_user').val(data.id);
        //       $('#app').val(data.app);
        //     },
        //     error: function() {
        //       swal("Error", "Failed to load user data.", "error");
        //     } 
        //   });
        // });

        // // UPDATE USER DATA
        // $(document).on('click', '#editUpdateButton', function() {
        //   const userId = $('#hidden_id_user').val();
        //   $.ajax({
        //     url: `/user/update/${userId}`,
        //     method: 'PUT',
        //     data: {
        //       fullname: $('#fullname').val(),
        //       username: $('#username').val(),
        //       password: $('#password').val(),
        //       id_level: $('#id_level').val(),
        //       is_active: $('#is_active').val(),
        //       app: $('#app').val()
        //     },
        //     success: function() {
        //       $('#editUserModal').modal('hide');
        //       swal("Success", "User updated successfully", "success").then(() => {
        //         window.location.reload(); // Refresh or update your data table as needed
        //       });
        //     },
        //     error: function() {
        //       swal("Error", "Could not update user", "error");
        //     }
        //   });
        // });

        // // HAPUS DATA USER
        // $(document).on('click', '.userDelBtn', function(e) {
        //   e.preventDefault();
        //   const id_del = $(this).data('id');

        //   swal({
        //     title: "Are you sure?",
        //     text: "Do you want to delete this data?",
        //     icon: "warning",
        //     buttons: {
        //       confirm: {
        //         text: "Yes, delete it!",
        //         className: "btn btn-success",
        //       },
        //       cancel: {
        //         text: "Cancel",
        //         visible: true,
        //         className: "btn btn-danger",
        //       },
        //     },
        //   }).then((willSubmit) => {
        //     if (willSubmit) {
        //       // If the user confirms, submit the form using AJAX
        //       $.ajax({
        //         url: `/user/delete/${id_del}`, // Use template literal correctly
        //         method: 'DELETE',
        //         success: function(response) {
        //           // Show success message
        //           swal({
        //             title: "Deletion Successful",
        //             text: "The data has been successfully deleted.",
        //             icon: "success",
        //             buttons: {
        //               confirm: {
        //                 text: "OK",
        //                 className: "btn btn-success",
        //               },
        //             },
        //           }).then(() => {
        //             // Redirect to /users_list after the user clicks "OK"
        //             window.location.href = "/users_list";
        //           });
        //         },
        //         error: function(xhr, status, error) {
        //           // Show SweetAlert error if deletion fails
        //           swal({
        //             title: "Failed to delete data",
        //             text: "An error occurred while deleting the data. Please try again.",
        //             icon: "error",
        //             buttons: {
        //               confirm: {
        //                 text: "OK",
        //                 className: "btn btn-danger",
        //               },
        //             },
        //           });
        //         }
        //       });
        //     } else {
        //       swal.close();
        //     }
        //   });
        // });

        // // GET DATA MENU FOR EDIT
        // $(document). on('click', '.menuEditBtn', function() {
        //   const id = $(this).data('id');
        //   $.ajax({
        //     url: `/menu/edit/${id}`,
        //     type: "GET",
        //     success: function(data) {
        //       $('#nama_menu').val(data.nama_menu);
        //       $('#link').val(data.link);
        //       $('#icon').val(data.icon);
        //       $('#urutan').val(data.urutan);
        //       $('#is_active').val(data.is_active);
        //       $('#hidden_id_menu').val(data.id_menu);
        //     }, error: function() {
        //       swal("Error", "Failed to load user data.", "error");
        //     }
        //   });
        // });

        // // GET MAX URUTAN MENU
        // $.ajax({
        //   url: '/menu/get_max',
        //   type: "GET",
        //   success: function(data) {
        //     // console.log(data); // Data 'max' dari server akan dicetak di sini
        //     $('#urutan').val(data + 1); // Opsional: Setel nilai input ke hasil
        //   },
        //   error: function(xhr, status, error) {
        //     console.error('Error:', error); // Menangani error
        //   }
        // });

        // // CREATE MENU
        // $('#form_menu').submit(function(e) {
        //   e.preventDefault(); // Prevent the default form submission
          
        //   swal({
        //     title: "Are you sure?",
        //     text: "Do you want to submit this form?",
        //     icon: "warning",
        //     buttons: {
        //       confirm: {
        //         text: "Yes, submit it!",
        //         className: "btn btn-success",
        //       },
        //       cancel: {
        //         text: "Cancel",
        //         visible: true,
        //         className: "btn btn-danger",
        //       },
        //     },
        //   }).then((willSubmit) => {
        //     if (willSubmit) {
        //      // If the user confirms, submit the form using AJAX
        //     $.ajax({
        //       url: "/create_menu", // Form submission URL
        //       type: "POST",
        //       data: $("#form_menu").serialize(), // Serialize form data
        //       success: function(response) {
        //         // Redirect to /users_list if the submission is successful
        //         swal({
        //           title: "Submission Success",
        //           text: "Create new data is success",
        //           icon: "success",
        //           buttons: {
        //             confirm: {
        //               text: "OK",
        //               className: "btn btn-success",
        //             },
        //           },
        //         }).then(() => {
        //           // Redirect to /users_list after the user clicks "OK"
        //           window.location.href = "/menu_list";
        //         });
        //       },
        //       error: function(xhr, status, error) {
        //         // Show SweetAlert error if submission fails
        //         swal({
        //           title: "Submission Failed",
        //           text: "An error occurred while submitting the form. Please try again.",
        //           icon: "error",
        //           buttons: {
        //             confirm: {
        //               text: "OK",
        //               className: "btn btn-danger",
        //             },
        //           },
        //         });
        //       }
        //     });
        //     } else {
        //       swal.close();
        //     }
        //   });
        // });

        // // UPDATE MENU
        // $(document).on('click', '#menuUpdateButton', function() {
        //   const menuId = $('#hidden_id_menu').val();
        //   console.log(menuId);
        //   $.ajax({
        //     url: `/menu/update/${menuId}`,
        //     type: "PUT",
        //     data: {
        //       nama_menu: $('#nama_menu').val(),
        //       link: $('#link').val(),
        //       icon: $('#icon').val(),
        //       urutan: $('#urutan').val(),
        //       is_active: $('#is_active').val()
        //     },
        //     success: function(data) {
        //       $('#editUserModal').modal('hide');
        //       swal("Success", "Menu updated successfully", "success").then(() => {
        //         window.location.reload(); // Refresh or update your data table as needed
        //       });
        //     }, error() {
        //       swal("Error", "Could not update menu", "error");
        //     }
        //   });
        // });

        // // DELETE MENU
        // $(document).on('click', '.menuDelBtn', function(e) {
        //   e.preventDefault();
        //   const id_menu = $(this).data('id');

        //   swal({
        //     title: "Are you sure?",
        //     text: "Do you want to delete this data?",
        //     icon: "warning",
        //     buttons: {
        //       confirm: {
        //         text: "Yes, delete it!",
        //         className: "btn btn-success",
        //       },
        //       cancel: {
        //         text: "Cancel",
        //         visible: true,
        //         className: "btn btn-danger",
        //       },
        //     },
        //   }).then((willSubmit) => {
        //     if (willSubmit) {
        //       // If the user confirms, submit the form using AJAX
        //       $.ajax({
        //         url: `/menu/delete/${id_menu}`, // Use template literal correctly
        //         method: 'DELETE',
        //         success: function(response) {
        //           // Show success message
        //           swal({
        //             title: "Deletion Successful",
        //             text: "The data has been successfully deleted.",
        //             icon: "success",
        //             buttons: {
        //               confirm: {
        //                 text: "OK",
        //                 className: "btn btn-success",
        //               },
        //             },
        //           }).then(() => {
        //             // Redirect to /users_list after the user clicks "OK"
        //             window.location.href = "/menu_list";
        //           });
        //         },
        //         error: function(xhr, status, error) {
        //           // Show SweetAlert error if deletion fails
        //           swal({
        //             title: "Failed to delete data",
        //             text: "An error occurred while deleting the data. Please try again.",
        //             icon: "error",
        //             buttons: {
        //               confirm: {
        //                 text: "OK",
        //                 className: "btn btn-danger",
        //               },
        //             },
        //           });
        //         }
        //       });
        //     } else {
        //       swal.close();
        //     }
        //   });
        // });

});