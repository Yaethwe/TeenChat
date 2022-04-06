const GN={
	status:false
};
let loginDivStyle = `
position:absolute;
display:flex;
flex-direction:column;
background-color:white;
border:0px;
border-radius:10px;
width:50vw;
min-height:400px;
box-shadow:10px 10px 10px 10px gray;
top:50px;
left:25vw;
`;
let coverStyle = `
background-color:black;
opacity:0.7;
position:absolute;
width:100vw;
height:100vh;
top:0;
left:0;
`;
let btnStyle = `
color:white;
background-color:blue;
border:0px;
border-radius:10px;
font-family:sans-serif;
font-size:20px;
padding:5px;
margin:10px;
`;
let inputStyle = `
color:blue;
background-color:wheat;
border:0px;
border-radius:10px;
font-family:sans-serif;
font-size:20px;
padding:5px;
margin:10px;
`;
let logolabelStyle = `
display:flex;
align-self:center;
color:orange;
font-family:sans-serif;
font-size:30px;
`;
let errtxt =`
color:red;
font-family:sans-serif;
font-size:16px;
padding:10px;
`;
const firebaseConfig = {
	apiKey: "AIzaSyBaPvnzqor_4HfPZg6ayk30Tb1RpcMBWfo",
	authDomain: "test-66b58.firebaseapp.com",
	projectId: "test-66b58",
	storageBucket: "test-66b58.appspot.com",
	messagingSenderId: "39985206495",
	appId: "1:39985206495:web:c4200c42a6e7bad4da456a",
	measurementId: "G-G1RBDR6H1S"
};
firebase.initializeApp(firebaseConfig);
let userdata = {};
async function getUserData(x) {
  firebase.database().ref().child("users").child(x).get().then((snapshot) => {
    if (snapshot.exists()) {
      userdata = snapshot.val();
    } else {
      console.warn("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}
class GardenNet{
    constructor(selectedDiv, firebase){
        this.selectedDiv = selectedDiv;
		this.firebase = firebase;
    }
	init(){
		firebase.database().ref("id").child("id").get().then((snapshot) => {
		  if (snapshot.exists()) {
			this.idget = snapshot.val();
			console.log(snapshot.val());
		  } else {
			alert("No Internet Connection");
		  }
		}).catch((error) => {
		  console.error(error);
		  console.log(this.idget);
		});
	}
    login(){
        const sD = document.querySelector(this.selectedDiv);
        const cover = document.createElement('div');
        const loginDiv = document.createElement('div');
        const userIDInput = document.createElement('input');
        const passwordInput = document.createElement('input');
        const loginBtn = document.createElement('button');
		const logolabel = document.createElement('label');
		const errorlabel = document.createElement('label');
		errorlabel.textContent="UserID or password didn't match.";
		logolabel.textContent="GardenNet";
		loginBtn.textContent='LOGIN';
		logolabel.setAttribute('style', logolabelStyle);
		errorlabel.setAttribute('style', errtxt);
        loginBtn.setAttribute('style', btnStyle);
        userIDInput.setAttribute('type', 'number');
		userIDInput.setAttribute('style', inputStyle);
        passwordInput.setAttribute('type', 'password');
		passwordInput.setAttribute('style', inputStyle);
        cover.setAttribute('style', coverStyle);
        loginDiv.setAttribute('style', loginDivStyle);
		loginDiv.appendChild(logolabel);
		loginDiv.appendChild(userIDInput);
		loginDiv.appendChild(passwordInput);
		loginDiv.appendChild(loginBtn);
        sD.appendChild(cover);
        sD.appendChild(loginDiv);
		async function LogIn(i,p) {
		  if (i=='') {
			alert("Enter your user id and try again.")
		  }else{
			getUserData(i);
			setTimeout(()=>{
				if(userdata.password==p){
					sD.removeChild(loginDiv);
					sD.removeChild(cover);
					gnststus("success",userdata);
				}else{
					gnststus(false);
					loginDiv.appendChild(errorlabel);
				}
			}, 1000);
		  }
		}
		loginBtn.onclick=()=>{
			this.u = userIDInput.value,
			this.p = passwordInput.value;
			LogIn(this.u,this.p);
			//clearInputs();
		}
		
		userIDInput.onchange=()=> {
			loginDiv.removeChild(errorlabel);
		}
		passwordInput.onchange=()=> {
			loginDiv.removeChild(errorlabel);
		}
		function clearInputs(){
			userIDInput.value='';
			passwordInput.value='';
		}
		
    }
}
function gnststus(x,d){
	GN.status=x;
	if(x){
		GN.user=userdata;
	}
};