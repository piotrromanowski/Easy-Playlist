$(document).ready(function() {
  performSearch();
  var searchBox = $("#searchBox");
  searchBox.keyup(performSearch);

  $("#isMusic").on('change', function(){
      performSearch();
  });
});

function performSearch() {
  var searchTerm = $("#searchBox").val();
  var queryMusic = $("#isMusic").is(':checked');

    if (queryMusic) {
        // TODO: Figure out how to use video category instead
        searchTerm = searchTerm  + ' music';
    }
    data = {part: "snippet", q: searchTerm, key: "AIzaSyDOeBvCcjFxfGnvcrS4a4RZ7dgqi3kbGKc", type: 'video'};

    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      // TODO: add category to request data
      data : data,
      success: function (data) {
        var videos = data.items;
        if (videos) {
            updateVideoDisplay(videos);
        } else {
            console.log("Nothing found");
        }
      }
    });
}

function changeVideo (video) {
    var embedUrl = 'https://www.youtube.com/embed/' + video.id.videoId + '?autoplay=1&showinfo=0&enablejsapi=1&version=3&autohide=1';
    $('iframe').attr('src',embedUrl);
}

function updateVideoDisplay(videos) {
  changeVideo(videos[0]);

  var playlist = $("<ul>").attr("id", "playlist").attr('class', 'list-group');

  $(videos).each(function(index, video) {
      var id = video.id.videoId;
      var img = $('<img>').attr('src', video.snippet.thumbnails.default.url);
      var title = $('<h4>').attr('class', 'list-group-item-heading').html(video.snippet.title);
      var description = $('<p>').attr('class', 'list-group-item-text').html(video.snippet.description);
      var videoElement = $('<li>').attr('class', 'list-group-item');
      playlist.append(videoElement.append(img).append(title).append(description));
  });

  var playlistWrapper = $("#playlistWrapper");
  $("#playlist").remove();
  playlistWrapper.append(playlist);
}
