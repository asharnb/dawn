/**
 * Created by Krishna on 29/8/16.
 */

(function ($) {
    'use strict';
    // function to get csrf token
    function getCsrfToken(callback) {
        $
            .get(Drupal.url('rest/session/token'))
            .done(function (data) {
                callback(data);
            });
    }


    /*
     *  Send approve/reject request to the server.
     */
    function qcOperation(csrfToken, node, init) {
        $.ajax({
            url: Drupal.url('qc/operation/' + init + '/post?_format=json'),
            method: 'POST',
            headers: {
                'Content-Type': 'application/hal+json',
                'X-CSRF-Token': csrfToken
            },
            data: JSON.stringify(node),
            success: function (response) {
                console.log(response);
                //alert('success');

                swal({
                    title: "Response",
                    text: response.message,
                    type: response.type,
                    showConfirmButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    timer:3000
                });

            },
            error: function(){
                alert('Failed!');
            }

        });
    }

    /*
     *  Process approve or reject request before sending it to server.
     */
    function approveOrRejectRequestProcess(product,session, imgs, state){
        var data = {
            _links: {
                type: {
                    href: Drupal.url.toAbsolute(drupalSettings.path.baseUrl + 'rest/type/node/test')
                }
            },
            "body": [
                {
                    "value": {
                        "pid": product,
                        "sid": session,
                        "images": imgs

                    },
                    "format": null,
                    "summary": null
                }
            ],
            "type":[{"target_id":"test"}]
        };

        getCsrfToken(function (csrfToken) {
            qcOperation(csrfToken, data, state);
        });

    }

    // click event for approve all.
    // todo change selector based on what is there in template.
    $(".approve-all").click(function () {

        // todo get following information from specific tags saved or updated from ajax.
        var product = document.getElementById('selected-pid').value;
        var session = '';

        var container, inputs, index;
        var dup_holder = [];

        // Get the container element
        container = document.getElementById('imagecontainer');

        // Find its child `input` elements
        inputs = container.getElementsByTagName('input');

        var inc = 1;
        for (index = 0; index < inputs.length; ++index) {
            // deal with inputs[index] element.
            if(inputs[index].type == 'hidden'){
                dup_holder.push(inputs[index].value);
            }
        }



        var state = 'approve_all';
        var pid = document.getElementById('selected-pid').value;

        swal({
            title: "Approve All?",
            text: "Are you sure you want to approve all images?",
            type: "success",
            showCancelButton: true,
            confirmButtonColor: "#00b9e5",
            confirmButtonText: "Approve",
            closeOnConfirm: true
        },function () {
            approveOrRejectRequestProcess(pid,session, dup_holder, state)
        });
    });

    // click event for reject all.
    // todo change selector based on what is there in template.
    $(".reject-all").click(function () {

        // todo get following information from specific tags saved or updated from ajax.
        var product = document.getElementById('selected-pid').value;
        var session = '';
        var state = 'reject_all';


        var container, inputs, index;
        var dup_holder = [];

        // Get the container element
        container = document.getElementById('imagecontainer');

        // Find its child `input` elements
        inputs = container.getElementsByTagName('input');

        var inc = 1;
        for (index = 0; index < inputs.length; ++index) {
            // deal with inputs[index] element.
            if(inputs[index].type == 'hidden'){
                dup_holder.push(inputs[index].value);
            }
        }


        swal({
            title: "Reject All?",
            text: "Are you sure you want to reject all images?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Reject",
            closeOnConfirm: true
        },function () {
            approveOrRejectRequestProcess(product,session, dup_holder, state)
        });
    });



})(jQuery);
