const body = document.querySelector('#body');
const sd = document.querySelector('#sd');
const sentBtn = document.querySelector('#sentBtn');
const msg = document.querySelector('#msg');
const prof = document.querySelector('#profile');
const profilePicture = document.querySelector('#profilePicture');
const usernameL = document.querySelector('#usernameL');
const idL = document.querySelector('#idL');
const bgI = document.querySelector('#bgI');
const fgI = document.querySelector('#fgI');

bgI.addEventListener('change',()=>{
	ud.bg=bgI.value;
});
fgI.addEventListener('change',()=>{
	ud.fg=fgI.value;
});

const fC = {
  apiKey: "AIzaSyBWPLhifWzVgL8SblP7d-VBwvbbyzq_HLk",
  authDomain: "mezalidatacenter.firebaseapp.com",
  databaseURL: "https://mezalidatacenter-default-rtdb.firebaseio.com",
  projectId: "mezalidatacenter",
  storageBucket: "mezalidatacenter.appspot.com",
  messagingSenderId: "25535720477",
  appId: "1:25535720477:web:caeed226d7f99aae1eeaf4",
  measurementId: "G-K0K18WXXC6"
};

firebase.initializeApp(fC);
prof.style.display='none';
sd.style.display='none';

let list,ddbb;
let chat,me;
let url = location.href;
let paramaters = (new URL(url)).searchParams;
const userdata = {};
const ud = 
{
	chat:"",
	data:{
		username:"unknown",
		id:404,
		config:{
			bg:"skyblue",
			fg:"white",
		},
		img:"https://icons.iconarchive.com/icons/aha-soft/free-large-boss/512/Admin-icon.png",
	},
};

//app start here
user();
loadData();

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

const pgo = document.querySelector('#profilego');
	//styling the profile go button
pgo.style=`
	border-radius:20px;
	background-color:wheat;
	width:50px;
	height:50px;
`;

pgo.onclick=()=>{
	profileShow();
}
function user(){
	if (paramaters.get("chat")){
		let x=paramaters.get("chat")+'=';
		let enc = atob(x);
		let userD = JSON.parse(enc);
		ud.id=userD.data.id;
		ud.name=userD.data.username;
		ud.bg=userD.data.config.bg;
		ud.fg= userD.data.config.fg;
		ud.img= userD.data.img;
		ud.chat=userD.chat
		
		sd.style.display='flex';
		ddbb = firebase.database().ref().child('chats').child(ud.chat);
	}
}

async function load(){
	while (body.firstChild) {
		body.removeChild(body.lastChild);
	}
	for (let i = 1;i<=list.length;i++) {
		let box = document.createElement('div');
		let br = document.createElement('br');
		if(ud.id==list[i].from.id) {
			box.className='box02';
			box.style=`background-color:${list[i].config.bg};display:flex;justify-content:flex-end;`;
			box.innerHTML=`
			<label style='color:${list[i].config.fg};'><span style='font-size:40px;'>${list[i].message}</span><br> <span style='font-size:20px;'> ${list[i].time.ds} -  ${list[i].time.ts} user id : ${list[i].from.id} name: ${list[i].from.name}</span></label>
			<img src="${list[i].PP}" alt="${list[i].from.name}'s photo" width="50px" height="50px" class="pp">
			`;
		} else {
			box.className='box01';
			box.style=`background-color:${list[i].config.bg};display:flex;justify-content:flex-start;`;
			box.innerHTML=`
			<img src="${list[i].PP}" alt="${list[i].from.name}'s photo" width="50px" height="50px" class="pp">
			<label style='color:${list[i].config.fg};'><span style='font-size:40px;'>${list[i].message}</span><br> <span style='font-size:20px;'> ${list[i].time.ds} -  ${list[i].time.ts} user id : ${list[i].from.id} name: ${list[i].from.name}</span></label>
			`;
		}
		
		body.appendChild(box);
		body.appendChild(br);
	}
}
var now;
function create(l){
	now = new Date();
    var hour =()=>{
		let x = now.getHours();
		let minute = now.getMinutes();
		let second = now.getSeconds();
		if(x>12){
			return (x-12)+`:${minute}:${second} PM`;
		}else{
			return x+`:${minute}:${second} AM`;
		}
	}
	
	ddbb.update({
		length:l+1,
	});
	ddbb.child(l+1).set({
	config:{
		bg:ud.bg,
		fg:ud.fg,
	},
	message:`${msg.value}`,
	from:{
		id:ud.id,
		name:ud.name,
	},
	PP:`${ud.img}`,
	encrypted:false,
	time:{
		ds:`${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`,
		ts:`${hour()}`,
	},
	});
	msg.value='';
}

function send(){
	ddbb.child('length').get().then((snapshot)=>{
	if (snapshot.exists()) {
		let leng =snapshot.val();
		console.log(leng);
		create(leng);
	  } else {
		console.log("No data available");
	  }
	}).catch((error) => {
	  console.error(error);
	}
	);
}

sentBtn.onclick= ()=>{
	send();
}

function profileShow(){
	//prof.style.display='flex';
	//prof.className='profile';
}

msg.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      send();
    }
});

ddbb.on('child_added', (snapshot) => {
	loadData();
});


