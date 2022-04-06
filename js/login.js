const auth = new GardenNet('body');
auth.init();
auth.login();
function setup(){
	localStorage.setItem('GardenNet',JSON.stringify(userdata));
	setTimeout(2000);
	location.href='../index.html';
}