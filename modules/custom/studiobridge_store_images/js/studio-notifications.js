(function ($) {
    var currentcount = 0;
    var currenttotal;
    var currentproduct = '';

//needs fix: if new notification is over 5, then notification stops





    function triggerit(hit){
        $.get(Drupal.url('studio/notifications/current_user_open_notifications?_format=json'), function(data, status){

            var notifications = data.data;
            //$('#notification-dropdown').innerHTML('');
            document.getElementById('notification-dropdown').innerHTML = '';
            document.getElementById('notification-count').innerHTML = notifications.length;

            //check if a new notification has been added

            Object.keys(notifications).forEach(function (key) {
                //console.log(notifications[key].message);
                addNotification(notifications[key].id, notifications[key].message, notifications[key].link, notifications[key].created);

                //if last product id is not the same as previous, generate notification
                //check product against current last product


            });

            if(notifications[0].id != currentproduct){
              if(hit != 1){
                animateNewNotification();
              }
              currentproduct = notifications[0].id
            }



        });

    }

    function addNotification(id, message, link, created){
        var ago = timeConverter(created);
        var link_action = Drupal.url('notification/click/'+ id + '?link='+link);
//        var li = '<li id="notification-'+id+'"><a href="'+ link +'"><div><i class="fa fa-exclamation-triangle text-danger fa-fw"></i> ' + message  +'<span class="pull-right text-muted small"><time class="timeago" datetime="'+ago+'"></time></span></div></a></li>';

        var li = '<li id="notification-'+id+'"><div class="dropdown-messages-box"><a href="profile.html" class="pull-left"><img alt="image" class="img-circle" src="/themes/studiobridge/images/users/anahita_hashmani.jpg" style="margin-right: 5px; width: 38px;height: 38px;"></a><div class="media-body">' + message  +'. <br><small class="text-muted"><time class="timeago" datetime="'+ago+'"></time></small></div></div></li><li class="divider"></li>'
        $('#notification-dropdown').append(li);
        jQuery("time.timeago").timeago();
    }


    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    function animateNewNotification(){

      // $(".theme-config-box").toggleClass("show");
      //    setTimeout(function(){
      //      // toggle back after 1 second
      //      if($(".theme-config-box").hasClass("show")){
      //        $(".theme-config-box").toggleClass("show");
      //      }
      //
      //    },5000);

      Command: toastr["warning"]("You have a new QC notification")

      toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "10000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }

    }


})(jQuery);
