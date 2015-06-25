// Initialize global user 
// (a good idea to store the information you need
// when sending messages here)
var uid = "322824cbada6280c";
var id = "b332cc36548878065abe5af5b4c5312afadcf60511e53f3f86a4753b9240d640ba880ac5e6303096670b232be9b6e07dccf7eaf435279bcfdf414caf08365f69";
var isLogin = false;
var storedMsg = [];

// sendMessage() sends a message to the API
function sendMessage(message) {
    $.ajax ({
        url : 'http://chat-app.brainstation.io/messages',
        type : 'POST',
        xhrFields: { withCredentials:true },
        data: { 'message' : message,
                'userID': "322824cbada6280c",
                },
        success: function(data) {
            console.log(data);
        },
        error: function(data){
            error(data,'noooooo');  
        }

    })
       
}

//sendMessage(CURRENT_USER, myMessage);
// getMessages() gets all messages from the API.
// we can use diff() to get only the new ones.
function getMessages() {
    $.ajax({
        url: 'http://chat-app.brainstation.io/messages',
        type: 'GET',
        xhrFields: { withCredentials:true },
        data: {},
        success: function(data) {
        	htmlize(diff(data,storedMsg));
            if(data != storedMsg){
                storedMsg = data;
                scrollBottom($('.messageDisplay'),300);

            };
            console.log('get msg success');         
        },
        error: function() {
            console.log('get msg error');
        }
    });    
}
var htmlize = function(arr) {
    var output = "";
    for(var i = 0; i < arr.length; i++){
    output += '<li class="text">';
    output += arr[i].username + ': ' + arr[i].message + '<br>';
    output += '</li>';
    }
    $('#messages').append(output);
}
//signup(); //This signup works and has signed me up already
// login() logs in a user by creating a session
function login() {
	$.ajax({
		url : 'http://chat-app.brainstation.io/users/login',
		type: 'POST',
		xhrFields: { withCredentials:true },
		data:{
			username:'Steve',
			password:'bobbly'
		},
		success:function(result){
			console.log(result);
            isLogin = true;
		},
		error:function(result){
			console.log('login error' + result);
		}
	})
}
//creates an account that we can sign in with
function signup() {
	$.ajax({
		url : 'http://chat-app.brainstation.io/users',
		type: 'POST',
		xhrFields: { withCredentials:true },
		data:{
			username: 'Steve',
			password: 'bobbly'
		},
		success:function(result){
			console.log('success' + result);
		},
		error:function(result){
			console.log("error: " + result.errors);
		}
	})
}



login();
setInterval(getMessages,1000);

//sendMessage(id,uid,"Nevermind I'm happy now");
$('#chatMessage').submit(function(){
    event.preventDefault();
    sendMessage($('#textBox').val());
    $('#textBox').val("");
});
// $('#textBox').keypress(function(keyStroke){
//     if(keyStroke == 13){
//     event.preventDefault();
//     sendMessage($('#textBox').val());
//     $('#textBox').val("");
//     }else{
//         console.log('not enterkey')
//     }
// })

// HELPERS -------
// You can use these and modify them to fit your needs. 
// If you are going to use them, make sure you understand
// how they work!

// Helper - returns all elements in an array A, that are not in B
function diff(a, b) {
    var bIds = {}
    b.forEach(function(obj) {
        bIds[obj.id] = obj;
    });
    return a.filter(function(obj) {
        return !(obj.id in bIds);
    });
}

// Helper - scrolls to the bottom of the messages div
function scrollBottom(element, duration) {
    element.animate({
        scrollTop: element[0].scrollHeight
    }, duration);
}

// Gets time stamp
function getTimeStamp(){
    var date = new Date();
    var time = date.getTime();
    return time;
}

// Helper - turns JavaScript timestamp into something useful
function getReadableTime(getTimeStamp) {
    var time = new Date()
    time.setTime(stamp)
    return time.getMonth() + "/" + time.getDate() + " " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2);
}

// Helper - pads a number with zeros to a certain size. Useful for time values like 10:30.
function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = s + "0";
    return s;
}

// Prints a useful error message to the console. Used when AJAX fails. A message can help us find the problem
function error(data, message) {
    console.log('Error ' + message + ': ' + JSON.stringify(JSON.parse(data.responseText)))
}
