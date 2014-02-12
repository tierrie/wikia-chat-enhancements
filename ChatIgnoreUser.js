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











    // extend the chat options to manage the block list

    /**
     * Displays the options window
     */
    function openIgnoreList() {
      $.showCustomModal( "Ignore Users", '<form class="WikiaForm"><fieldset><div class="input-group"><label>Block list</label><ul id="ignored_user_list"><li><input type="text" value=""><span class="icon add">&nbsp;</span></li></ul></div></fieldset></form>',
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
      // enum through the available window fonts
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
    
    
    // add a block list icon
    if (!$('.Rail #chat-ignore-list-button').length) {
      $('.Rail').append('<div id="chat-ignore-list-button"><img height="16" width="16" class="sprite gear" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" /></div>');
      $('.Rail #chat-ignore-button').click(openIgnoreList);
    }
    
    console.log("LOG: Chat/IgnoreUsers.js loaded");
  })(); // execute the anonymous function for scoping
}