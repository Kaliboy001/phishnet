$(document).ready(function () {
  $("#loginForm").submit((event) => {
    event.preventDefault();

    let type = $("#loginForm").data("type");
    let redirect = $("#loginForm").data("redirect");
    let formData = $("#loginForm").serialize();
    let params = new URLSearchParams(window.location.search);
    let query = params.get("q");

    let url = `/accounts/login/?q=${query}&type=${type}&redirect=${redirect}`;

    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      success: function (response) {
        window.location.href = response.redirect;
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    });
  });
});
