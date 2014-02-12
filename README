wikia-chat-enhancements
=======================
A Javascript framework to handle plugins and add-ons for use with Wikia's chat. 

Do not link directly to the scripts on this repo as GitHub frowns on that kind of stuff. Instead, look http://scripts.wikia.com/ for a Wikia mirror of the code.


Installation
------------
1. Edit your wiki's MediaWiki:Chat-edit-count to include the following code:
  <img src="http://images.wikia.com/common/skins/common/blank.gif" onload="if ($(this).is('header img')&&$('script[src*=\'Chat/AutoLoad.js\']').length==0) {var b=document.createElement('script');b.setAttribute('src','http://scripts.wikia.com/index.php?title=Chat/AutoLoad.js&action=raw&ctype=text/javascript');b.setAttribute('type','text/javascript');document.getElementsByTagName('head')[0].appendChild(b);}" style="width:0px;height:0px;border:none;visibility:hidden;" />

2. (Optional) Add the following classes to your wiki's MediaWiki:Chat.css file
  /* default chat colors */
  .chat_color_reset { border: 1px solid rgb(212,212,212); }
  .chat_font_color_default       { background-color: rgb(212,212,212); } /* note that the font color is retrieved from the div's background-color and not color */
  .chat_surround_color_default   { background-color: rgb(0,0,0); }
  .chat_selfpost_color_default   { background-color: rgb(33,33,33); }
  .chat_background_color_default { background-color: rgb(24,24,24); }


Credits
-------
Credits go to Sactage (https://github.com/sactage) for his ChatOptions.js from wikia-js-snippets from which this project was forked.