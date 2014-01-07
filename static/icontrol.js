/*
 * iControl - Internet Control for Raspberry PI
 *
 */
var reconnect = false;
var last_set = false;
const LONG_POLL_DURATION = 150000; // how long should we wait? (msec)

function offline()
{
    $('#result').text("OFFLINE");
    $(".custom-label-flipswitch" ).unbind("change");
}

function online()
{
    $('#result').text("ONLINE");
    $(".custom-label-flipswitch" ).unbind("change");
    $(".custom-label-flipswitch" ).bind("change", function(event) {
        set_status();
    });
}

function poll_status() {
    $.getJSON($SCRIPT_ROOT + '/control/status', {}, function(data) {
        display_data(data);
        online()
    })
    .fail(function() {
        offline();
    })
    return false;
}

function set_status() {
    var s1 = $('#flip-checkbox-1').prop('checked') ? '1' : '0';
    var s2 = $('#flip-checkbox-2').prop('checked') ? '1' : '0';
    last_set = true;
    $.getJSON($SCRIPT_ROOT + '/control/status/' + s1 + s2, {}, function(data) {
        display_data(data);
    })
    .fail(function() {
        offline();
    })
    return false;
}

function longpoll_status() {
    var s1 = $('#flip-checkbox-1').prop('checked') ? '1' : '0';
    var s2 = $('#flip-checkbox-2').prop('checked') ? '1' : '0';
    var update_url = '/control/lstatus/' + s1 + s2;
    var success = true;
    $.ajax({url: update_url,
            dataType: 'json',
            success: function(data) {
                display_data(data);
                success = true;
            },
            error: function(request, status) {
                offline();
                setTimeout(longpoll_status, 10000);
                success = false;
            },
            complete: function () {
                if (success) {
                    online();
                    setTimeout(longpoll_status, 1000); // if success, rerun
                }
            },
            timeout:  LONG_POLL_DURATION,
           });
}

function display_data(data) {
    if (last_set) {
        last_set = false;
    }
    else {
        $('#flip-checkbox-1').prop('checked', data['state'][0] == 1);
        $('#flip-checkbox-1').flipswitch('refresh');
        $('#flip-checkbox-2').prop('checked', data['state'][1] == 1);
        $('#flip-checkbox-2').flipswitch('refresh');
    }
}

$(document).ready(function() {
    $.ajaxSetup({ cache: false }); // This part addresses an IE bug. without it, IE will only load 
    poll_status();
    setTimeout(longpoll_status, 3000);  // Delay to start long polling status.
});

