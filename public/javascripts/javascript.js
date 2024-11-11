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
        $("#form_users").submit(function (e) {
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
        url: "/create_user", // Form submission URL
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
            window.location.href = "/users_list";
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

        $(document).on('click', '.userBtn', function() {
          const userId = $(this).data('id');
          console.log(userId);
        });

});