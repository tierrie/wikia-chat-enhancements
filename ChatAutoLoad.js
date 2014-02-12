// import the scripts and stylesheets from scripts repo
importScriptPage('Chat/Options.js', 'scripts');
importStylesheetPage('Chat/Chat.css', 'scripts');

// import local versions of the scripts and stylesheets
importScript('MediaWiki:Chat.js');
importScript('User:'+wgUserName+'/Chat.js');
importStylesheet('MediaWiki:Chat.css');
importStylesheet('User:'+wgUserName+'/Chat.css');
var onNewMessage = [];