(function() {
  window.onload = function() {
    var socket = io.connect();
    socket.on('connect', function() {
      var term = new Terminal({
        cols: 200,
        rows: 15,
        useStyle: true,
        screenKeys: true,
        cursorBlink: false
      });

      term.on('data', function(data) {
        socket.emit('data', data);
      });

      term.on('title', function(title) {
        document.title = title;
      });

      term.open(document.getElementById('content'));


      socket.on('data', function(data) {
        term.write(data);
      });

      socket.on('disconnect', function() {
        term.destroy();
        console.log(sdfl);
      });
    });
  };
}).call(this);
