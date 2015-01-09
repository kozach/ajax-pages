$(function() {
  var $main = $("#ajax-content");
  var $title = document.title;
  var $body = $("body");

  var loadPage = function(href) {
    $body.addClass('ajax-loading');
    setTimeout(function() {
      $main.load(href + " #ajax-content > *", function(response, status, xhr) {
        if (status === 'success') {
          $title = response.match(/<title>(.*?)<\/title>/)[1]
        } else {
          loadPage('/404.html');
        }
        $body.removeClass('ajax-loading');
        document.title = $title;
        $('a.ajax-link').each(function() {
          $(this).removeClass('active');
          if ($(this).attr('href') === href) {
            $(this).addClass('active');
          }
        });
      })
    }, 300);
  }

  $(document).on("click", "a.ajax-link", function() {
    var href = $(this).attr("href");
    console.log(location);
    if (href.indexOf('://') === -1 && href.indexOf('#') === -1 && href !== location.pathname) {
      history.pushState({}, '', href);
      loadPage(href);
    }
    return false;
  });

  $(window).on("popstate", function(e) {
    // if (e.originalEvent.state !== null) {
    //   loadPage(location.href);
    // }
    loadPage(location.pathname);
  });

});