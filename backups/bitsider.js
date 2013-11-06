 $(document).ready(function() {				
	var url='http://search.twitter.com/search.json?callback=?&q=vine.co';
    $.getJSON(url,function(data){
		console.log(data);
		// go through each item in the object array
		// and scrape out the links -- use regex to identify https:// and then use word boundaries to get each url
		// and then embed the videos in an iframe like that one guy did
	});
});	