# lolbox
A basic jQuery modal plugin 

See a demo - https://danjohnson95.github.com/lolbox/

## Source Code

The unminified source code can be found in /src.
The main JS file is here - https://github.com/danjohnson95/lolbox/blob/master/src/js/lolbox.js

This repo uses Gulp to compile SCSS and minify files.

## Installation

Download `lolbox.css` and `lolbox.js`, and place them in your project.

````html
<link rel="stylesheet" href="lolbox.css">
<script src="lolbox.js"></script>
````
    
> This plugin requires jQuery, so make sure you've included jQuery before including the lolbox.js file.

## Usage

Lolbox will open when initialised.

````javascript
$(document).lolbox();
````
    
## Options

There are multiple options you can pass through to customise your modal.

````javascript
var opt = {
    contents: "Your modal body goes here",
    zindex: 1234, // Incase you want to manually specify the z-index
    ajax: {
      // If your modal needs to grab content via ajax,
      use: true,
      url: '/file.php', // the file where your contents are located
      method: 'get', // the HTTP method to use
      dataType: 'json', // the dataType you're expecting
      data: {key: value}, // any data you need to pass
      callback: function(){
          // incase you want to call something once AJAX is complete
      },
      head: {
          use: true, // If you want the header to show
          close: true, // If you want the top right close button to show
          title: 'Lolbox Title', // The modal title
      },
      foot: {
          use: true, // If you want to display a footer
          close: {
              use: true, // If you want to display a close button on the footer
              text: 'Close', // The text to be used on the footer close button
              callback: function(){
                  // incase you want to call something when the close button is clicked
              }
          },
          conf: {
              use: true, // If you want a confirmation button on the footer
              text: 'Save Changes', // The text to be used on the footer confirm button
              callback: function(){
                  // incase you want to call something when the confirm button is clicked
              }
          }
      }
  };
  
  $(document).lolbox(opt);
````
