/**
 * ChatIgnore
 * Extends the Block User functionality to also ignore users in channel
 * Allows users to manage their block list
 *
 * Credits:
 * Based on original code by Joeytje50 and Madnessfan34537
 *
 * @version 1.0.0
 */
 
if(wgCanonicalSpecialPageName == 'Chat') {
  (function(){
    
    // create the style tag with the css hiding the blocked user's chat
    $.getJSON('/index.php?action=ajax&rs=ChatAjax&method=getListOfBlockedPrivate', function(response) {
      $('head').append('<style type="text/css" id="chat_ignored_list">li[data-user="'+response.blockedChatUsers.join('"], li[data-user="')+'"] {display:none;} #Rail li[data-user] {display:list-item !important;}</style>');
    });

    /**
     * Displays the IgnoreList window
     */
    function openIgnoreList() {
      $.showCustomModal( "Blocked User List", '<form class="WikiaForm"><fieldset><div class="input-group"><label>Ignored users</label><ul id="ignored_user_list"></ul><ul id="ignore_user_add"><li><input type="text" value="" name="ignore_user_add_input"><a class="icon add">&nbsp;</a></li></ul></div></fieldset></form>',
      {
        id: "chat_ignore_list_dialog",
        width: 450,
        buttons: [
          {
            id: "chat_ignore_list_dialog_cancel",
            message: "Close",
            handler: function () {
              closeIgnoreList();
            }
          }
        ]
      });
      
      // get the list of ignored users and display it
      $.getJSON('/index.php?action=ajax&rs=ChatAjax&method=getListOfBlockedPrivate', function(response) {
        for (var i=0;i<response.blockedChatUsers.length;i++) {
          $('#ignored_user_list').append('<li class="ignored_user" data-blocked-user="' + response.blockedChatUsers[i] + '"><span>' + response.blockedChatUsers[i] + '</span><a class="icon remove">&nbsp;</a></li>');
        }
      });
      
      // hook the delete button to removing the user from the block list
      $(document).on('click', '#ignored_user_list a.icon.remove', function () {
        $(this).parent().slideUp(100, function() {
          mainRoom.allowPrivate({name: $(this).data("blocked-user")});
      	  $(this).remove();
        });
      });
      
      function ignoreUser(name) {
        if ( $('#ignore_user_add input[type=text]').val().length != 0 ) {
          mainRoom.blockPrivate({name: $('#ignore_user_add input[type=text]').val()});
          
          $('#ignored_user_list').append('<li class="ignored_user" data-blocked-user="' + $('#ignore_user_add input[type=text]').val() + '"><span>' + $('#ignore_user_add input[type=text]').val() + '</span><a class="icon remove">&nbsp;</a></li>');
          
          $('#ignored_user_list').find('li:last').hide();
          $('#ignored_user_list').find('li:last').slideDown(200);
          $('#ignore_user_add input[type=text]').val('');
        }
      }
      
      // hook the add button to add an entry to the list
      $(document).on('click', '#ignore_user_add a.icon.add', ignoreUser);
      
      // hook the enter button
      $('#ignore_user_add input[type=text]').on('keypress', function(e) {
        if (e.keyCode === 13) {
          ignoreUser();
          e.preventDefault();
        }
      });
    }
    
    /**
     * Close the options window without saving any changes
     */
    function closeIgnoreList() {
      $('#chat_ignore_list_dialog').remove();
      $('.blackout').remove();
    } // end closeOptions()
    
    
    // hook onto the function that handles blocking PM so that it also hides main chat messages
    NodeChatController.prototype.blockAllowPrivateAjax = function (name, dir, callback) {
      $.ajax({
        type: 'POST',
        url: wgScript + '?action=ajax&rs=ChatAjax&method=blockOrBanChat',
        data: {
          userToBan : name,
          dir: dir
        },
        success: function(data, textStatus, jqXHR) {
          if ( typeof callback == 'function' ) { callback(data, textStatus, jqXHR); }
          $.getJSON('/index.php?action=ajax&rs=ChatAjax&method=getListOfBlockedPrivate', function(response) {
            $('#chat_ignored_list').html('li[data-user="'+response.blockedChatUsers.join('"], li[data-user="')+'"] {display:none;} #Rail li[data-user] {display:list-item !important;}');
          })
        }
      });
    }
    
    /*
    // add the icon to open ignore list
    if (!$("#chat-ignore-list-button").length) {
      //$('#chat-plugin-footer').append('<div id="chat-ignore-list-button"><img height="16" width="16" class="sprite gear" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" /></div>');
      $("#chat-ignore-list-button")$('#chat-ignore-list-button').click(openIgnoreList);
    }*/
    
    // delegate the hook to #chat-ignore-list-button
    $(document).on('click', '#chat-ignore-list-button', openIgnoreList);
    
    console.log("LOG: Chat/IgnoreUsers.js loaded");
  })(); // execute the anonymous function for scoping
}
