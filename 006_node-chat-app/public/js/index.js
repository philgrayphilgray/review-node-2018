const socket = io();
socket.on('connect', function() {
  console.log('Connected to server.');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function(message) {
  console.log('Got new message: ', message);
  var formattedTime = moment(message.createdAt).format('h:mma');
  var li = jQuery('<li></li>');
  var em = jQuery('<em></em>');
  var fromSpan = jQuery('<span></span>');
  var strong = jQuery('<strong></strong>');
  var messageSpan = jQuery('<span></span>');
  em.text(' (' + formattedTime + '): ');
  strong.text(message.from);
  fromSpan.append(strong);
  fromSpan.append(em);
  messageSpan.text(message.text);
  li.append(fromSpan).append(messageSpan);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mma');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location.</a>');

  var em = jQuery('<em></em>');
  var fromSpan = jQuery('<span></span>');
  var strong = jQuery('<strong></strong>');
  var messageSpan = jQuery('<span></span>');
  em.text(' (' + formattedTime + '): ');
  strong.text(message.from);
  fromSpan.append(strong);
  fromSpan.append(em);
  a.attr('href', message.url);
  messageSpan.append(a);
  li.append(fromSpan);
  li.append(messageSpan);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: messageTextBox.val()
    },
    function() {
      messageTextBox.val('');
    }
  );
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr('disabled').text('Send location');

      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      alert('Unable to fetch location.');
      locationButton.removeAttr('disabled').text('Send location');
    }
  );
});
