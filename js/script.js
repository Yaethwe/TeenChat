const body = document.querySelector('#body');
const sd = document.querySelector('#sd');
const sentBtn = document.querySelector('#sentBtn');
const msg = document.querySelector('#msg');
const profilePicture = document.querySelector('#profilePicture');
const usernameL = document.querySelector('#usernameL');
const idL = document.querySelector('#idL');
const ownerDiv = document.querySelector('#owner');
const functionDiv = document.querySelector('#functions');
//const D404 = document.querySelector("#404D");

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


let list,ddbb;
let chat,me;
let url = location.href;
let paramaters = (new URL(url)).searchParams;
const userdata = {};
const msgArray = [];
const ud = 
{
	chat:"",
	data:{
		username:"unknown",
		id:404,
		config:{
			bg:"blue",
			fg:"white",
		},
		img:"https://icons.iconarchive.com/icons/aha-soft/free-large-boss/512/Admin-icon.png",
	},
	owner:{
		id:404,
		pass:" ",
		name:" ",
	},
};

//app start here
user();
loadData();
sd.style.display='none';

class Message {
	constructor(index,oid){
		this.index=index;
		this.oid=oid;
	}
	dellete(){
		if(confirm('Are you sure you want to delete this message?')){
			if (this.oid==ud.id){
				ddbb.child(this.index).update({
					message:"deleted message",
					config:{
						bg:'gray',
						fg:'white'
					},
				});
			} else {
				alert('Unable to dellete.');
			}
		}
	}
	edit(){
		if (this.oid==ud.id){
			let editedTxt = prompt("Enter your edited text:");
			if (editedTxt){
			ddbb.child(this.index).update({
				message:editedTxt,
				config:{
					bg:ud.bg,
					fg:ud.fg
				},
			});
			}
		} else {
			alert('Unable to edit.');
		}
	}
}

async function loadData(){
	ddbb.get().then((snapshot)=>{
		if (snapshot.exists()) {
		list =snapshot.val();
		ownerDiv.innerHTML=`<label style="color:orange;font-family:sans-serif;font-size:30px;">${list.owner.name}'s Chat</label><label style='color:gray;font-family:sans-serif;font-size:20px;'>   user id: ${list.owner.id}</label>`;
		if(list.owner.name==ud.name){
			functionDiv.innerHTML=`
			<div style="display:flex;flex-direction:column;">
				<a style="background-color:aqua;color:red;font-family:sans-serif;font-size:30px;padding:5px;cursor:pointer;" onclick="cleanChat()">clean chat</a>
			</div>`;
		}
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

pgo.onclick=()=>{
	profileShow();
}
function user(){
	if(paramaters.get("new")){
		let x=paramaters.get("new");
		let enc = atob(x);
		let infoD = JSON.parse(enc);
		ud.name = infoD.name;
		ud.owner.id = infoD.owner.id;
		ud.owner.name = infoD.owner.name;
		ud.owner.pass = infoD.owner.pass;
		createChat(ud.name,ud.owner.id,ud.owner.name);
	}else{
		if (paramaters.get("chat")){
			let x=paramaters.get("chat");
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
			sd.style.display='flex';
		}
	}
}

async function load(){
	while (msgArray.length>0) {
		msgArray.pop()
	}
	while (body.firstChild) {
		body.removeChild(body.lastChild);
	}
	sd.style.display='flex';
	for (let i = 1;i<=list.length;i++) {
		let box = document.createElement('div');
		let br = document.createElement('br');
		msgArray.push(new Message(i,list[i].from.id));
		if(ud.id==list[i].from.id) {
			if(list[i].message=="deleted message"){
				box.className=`message mine`;
				box.innerHTML=`
						<div class="del-msg" style="background-color:${list[i].config.bg};color:${list[i].config.fg};">
							<label style='color:${list[i].config.fg};'><span style='font-size:40px;'>${list[i].message}</span><br> <span style='font-size:20px;'> ${list[i].time.ds} -  ${list[i].time.ts} name: ${list[i].from.name}</span></label>
						</div>
						<div style='display:flex;flex-direction:column;'>
							<img src="${list[i].PP}" alt="${list[i].from.name}'s photo" width="50px" height="50px" class="pp">
						</div>
				`;
			}
			else{
				box.className=`message mine`;
				box.innerHTML=`
						<div class="my-msg" style="background-color:${list[i].config.bg};color:${list[i].config.fg};">
							<label style='color:${list[i].config.fg};'><span style='font-size:40px;'>${list[i].message}</span><br> <span style='font-size:20px;'> ${list[i].time.ds} -  ${list[i].time.ts} name: ${list[i].from.name}</span></label>
						</div>
						<div style='display:flex;flex-direction:column;'>
							<img src="${list[i].PP}" alt="${list[i].from.name}'s photo" width="50px" height="50px" class="pp">
							<button onclick="msgArray[${i}-1].dellete()" style="background-color:red;color:white;border:0px;border-top-right-radius:10px;border-top-left-radius:10px;padding:5px;font-size:15px">delete message</button>
							<button onclick="msgArray[${i}-1].edit()" style="background-color:gray;color:white;border:0px;border-bottom-right-radius:10px;border-bottom-left-radius:10px;padding:5px;font-size:15px">edit message</button>
						</div>
				`;
			}
		} else {
			if(list[i].message=="deleted message"){
				box.className=`message frnd`;
				box.innerHTML=`
						<div style='display:flex;flex-direction:column;'>
							<img src="${list[i].PP}" alt="${list[i].from.name}'s photo" width="50px" height="50px" class="pp">
						</div>
						<div class="del-msg-frnd" style="background-color:${list[i].config.bg};color:${list[i].config.fg};">
							<label style='color:${list[i].config.fg};'><span style='font-size:40px;'>${list[i].message}</span><br> <span style='font-size:20px;'> ${list[i].time.ds} -  ${list[i].time.ts} name: ${list[i].from.name}</span></label>
						</div>
				`;
			}
			else{
				box.className=`message frnd`;
				box.innerHTML=`
						<div style='display:flex;flex-direction:column;'>
							<img src="${list[i].PP}" alt="${list[i].from.name}'s photo" width="50px" height="50px" class="pp">
						</div>
						<div class="frnd-msg" style="background-color:${list[i].config.bg};color:${list[i].config.fg};">
							<label style='color:${list[i].config.fg};'><span style='font-size:40px;'>${list[i].message}</span><br> <span style='font-size:20px;'> ${list[i].time.ds} -  ${list[i].time.ts} user id: encrypted name: ${list[i].from.name}</span></label>
						</div>
				`;
			}
			//user id : ${list[i].from.id}
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
function createChat(id,ownerID,ownerName){
	firebase.database().ref().child('chats').child(id).get().then(snapshot=>{
		if(snapshot.exists()){

			alert('Your chat name was already taken')
			close()
		}else{
			firebase.database().ref().child('chats').child(id).set({
				length:0,
				owner:{
					id:ownerID,
					name:ownerName,
				},
			});
			alert('Your chat was successfully created.');
			close();
		}
	});
}

function cleanChat(){
	if(confirm('Are you sure you want to clean this chat? This will dellete all of your chats in this chat box.')){
		firebase.database().ref().child('chats').child(ud.chat).set({
			length:0,
			owner:{
				id:ud.id,
				name:ud.name,
			},
		});
		alert('Chat was cleaned successfully!');
		sd.style.display='flex';
	}
}

sentBtn.onclick= ()=>{
	send();
}

msg.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      send();
    }
});

ddbb.on('child_added', (snapshot) => {
	loadData();
});

ddbb.on('child_changed', (snapshot) => {
	loadData();
});

