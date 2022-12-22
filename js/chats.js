const fC = {
    apiKey: "AIzaSyBWPLhifWzVgL8SblP7d-VBwvbbyzq_HLk",
    authDomain: "mezalidatacenter.firebaseapp.com",
    databaseURL: "https://mezalidatacenter-default-rtdb.firebaseio.com",
    projectId: "mezalidatacenter",
    storageBucket: "mezalidatacenter.appspot.com",
    messagingSenderId: "25535720477",
    appId: "1:25535720477:web:caeed226d7f99aae1eeaf4",
    measurementId: "G-K0K18WXXC6"
}
  
firebase.initializeApp(fC)
firebase.auth().onAuthStateChanged(user => {
	if(user){
        UID = user.uid;
    }else{
        let $ = s=>atob(s);firebase.auth().signInWithEmailAndPassword($('eWVhZXRoYXdlQGdtYWlsLmNvbQ=='),$('KysrKys9'))
    }
});

//app start here
const body = document.querySelector('body')

firebase.database().ref().child('chats').get().then(s=>{if(s.exists()){run(s.val())}else{console.log('false')}})

let data;
function run(d){
    let con = document.createElement('div')
    con.className="container"
    let c = document.createElement('ul')
    c.className="list-group"
    data=d
    for (i in d){
        let p = document.createElement('li')
        let a = document.createElement('a')
        a.target='_blank'
        p.className="list-group-item"
        a.textContent=i
        p.onmouseover=()=>{
            p.className="list-group-item active"
        }
        p.onmouseleave=()=>{
            p.className="list-group-item"
        }
        p.appendChild(a)
        c.appendChild(p)
    }
    body.appendChild(con)
    con.appendChild(c)
}