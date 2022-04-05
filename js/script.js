const body = document.querySelector('#body');
const sd = document.querySelector('#sd');
const sentBtn = document.querySelector('#sentBtn');
const msg = document.querySelector('#msg');

const firebaseConfig = {
  apiKey: "AIzaSyBWPLhifWzVgL8SblP7d-VBwvbbyzq_HLk",
  authDomain: "mezalidatacenter.firebaseapp.com",
  databaseURL: "https://mezalidatacenter-default-rtdb.firebaseio.com",
  projectId: "mezalidatacenter",
  storageBucket: "mezalidatacenter.appspot.com",
  messagingSenderId: "25535720477",
  appId: "1:25535720477:web:caeed226d7f99aae1eeaf4",
  measurementId: "G-K0K18WXXC6"
};

firebase.initializeApp(firebaseConfig);
let url = location.href;
let paramaters = (new URL(url)).searchParams;
let chat= paramaters.get("chat");
let me = paramaters.get("me");
var list;
const ddbb = firebase.database().ref().child('chats').child(chat);
const userdata={};

async function loadData(){
	ddbb.get().then((snapshot)=>{
		if (snapshot.exists()) {
		list =snapshot.val();
		load()
	  } else {
		console.log("No data available");
	  }
	}).catch((error) => {
	  console.error(error);
	}
	);
}
sd.style.display='none';
function user(){
	if(me=="YeaeThawe"){
		userdata.id=2;
		sd.style.display='flex';
		userdata.bg='skyblue';
		userdata.fg='white';
		userdata.img= 'https://cdn-icons-png.flaticon.com/128/560/560216.png';
	}else if (me=="NyanKaungSet"){
		userdata.id=3;
		sd.style.display='flex';
		userdata.bg='orange';
		userdata.fg='white';
		userdata.img= 'https://cdn-icons-png.flaticon.com/128/2922/2922510.png';
	}else{
		userdata.id=anonymous;
		sd.style.display='flex';
		userdata.bg='#822323';
		userdata.fg='white';
		userdata.img= 'https://cdn-icons-png.flaticon.com/128/1534/1534072.png';
	}
}

function load(){
	while (body.firstChild) {
		body.removeChild(body.lastChild);
	}
	for (let i = 1;i<=list.length;i++) {
		let box = document.createElement('div');
		let br = document.createElement('br');
		box.className='box01';
		if(userdata.id==list[i].from.id) {
			box.style=`background-color:${list[i].config.bg};display:flex;justify-content:flex-end;`;
			box.innerHTML=`
			<img src="${list[i].PP}" alt="${list[i].from.name}'s photo" width="50px" height="50px" style="border-radius:20px;font-size:10px;padding:5px;background-color:skyblue;">
			<label style='color:${list[i].config.fg};'><span style='font-size:18px;'>${list[i].message}</span><br> <span style='font-size:10px;'> ${list[i].time.ds} -  ${list[i].time.ts} user id : ${list[i].from.id} name: ${list[i].from.name}</span></label>
			`;
		} else {
			box.style=`background-color:${list[i].config.bg};display:flex;justify-content:flex-start;`;
			box.innerHTML=`
			<img src="${list[i].PP}" alt="${list[i].from.name}'s photo" width="50px" height="50px" style="border-radius:20px;font-size:10px;padding:5px;background-color:skyblue;">
			<label style='color:${list[i].config.fg};'><span style='font-size:18px;'>${list[i].message}</span><br> <span style='font-size:10px;'> ${list[i].time.ds} -  ${list[i].time.ts} user id : ${list[i].from.id} name: ${list[i].from.name}</span></label>
			`;
		}
		
		body.appendChild(box);
		body.appendChild(br);
	}
}
var now;
function create(l){
	now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
	ddbb.update({
		length:l+1,
	});
	ddbb.child(l+1).set({
	config:{
		bg:userdata.bg,
		fg:userdata.fg,
	},
	message:`${msg.value}`,
	from:{
		id:userdata.id,
		name:me,
	},
	PP:`${userdata.img}`,
	encrypted:false,
	time:{
		ds:`${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`,
		ts:`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
	},
	});
}

if (me){
	user();
	loadData();
}else{
	let na = prompt('What is your name?');
	location.href=`index.html?chat=${chat}&me=${na}`;
}

ddbb.on('child_added', (snapshot) => {
    loadData();
});

sentBtn.onclick= ()=>{
	ddbb.child('length').get().then((snapshot)=>{
	if (snapshot.exists()) {
		let leng =snapshot.val();
		console.log(leng);
		create(leng);
		//loadData();
	  } else {
		console.log("No data available");
	  }
	}).catch((error) => {
	  console.error(error);
	}
	);
}


