let status = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
};

let users_json = [{
		userId: 1,
		name: "Jon Snow",
		profilePicture:
		"https://mir-s3-cdn-cf.behance.net/project_modules/fs/6a3f5237411193.573f25019c8bf.jpg",
		statusMessage: "We become what we think about!",
		presence: 1,
	},
	{
		userId: 2,
		name: "Daenerys Targaryen",
		profilePicture:
			"https://preview.redd.it/hlxen8gtwpm01.jpg?width=640&crop=smart&auto=webp&v=enabled&s=a3c43bcbfc1db31d542ef67071559264358b3d2b",
		statusMessage: "A positive mindset brings positivethings.",
		presence: 3,
	},
	{
		userId: 3,
		name: "Tyrion Lannister",
		profilePicture:
			"https://mir-s3-cdn-cf.behance.net/project_modules/fs/6a3f5237411193.573f25019c8bf.jpg",
		statusMessage: "One small positive thought can change your whole day",
		presence: 3,
	},
	{
		userId: 4,
		name: "Jaime Lannister",
		profilePicture:
			"https://images.nightcafe.studio/jobs/mWfF1s7OOVg5DMTYiNZ8/mWfF1s7OOVg5DMTYiNZ8--4--qccau.jpg?tr=w-1600,c-at_max",
		statusMessage: "I am a rockstar",
		presence: 1,
	},
	{
		userId: 5,
		name: "Arya Stark",
		profilePicture:
			"https://64.media.tumblr.com/21de4501827aba1c6463ce2ae6a36780/tumblr_ps5le9xxRb1w9a5vgo1_1280.jpg",
		statusMessage: "I am using Gradious messenger",
		presence: 4,
}];

// display the whole table

function displayAll(){
		const usersContainer = document.getElementById("root")
		usersContainer.innerHTML=""
		users_json.forEach((info)=>{
			const userContainer = document.createElement("div")
			userContainer.classList.add("user");
			let presenceClass;
			switch (info.presence) {
				case 1:
					presenceClass = "one";
					break;
				case 2:
					presenceClass = "two";
					break;
				case 3:
					presenceClass = "three";
					break;
				case 4:
					presenceClass = "four";
					break;
			}
	
			userContainer.innerHTML =
			`<div class="img-container">
				<img src=${info.profilePicture} class='user-image ${presenceClass}' alt="user image" />
				</div>
				<div class="user-detail">
				<p class="user-name">${info.name}</p>
				<p class="user-message">${info.statusMessage}</p>
				</div>
				<div class='three-btn'>
					<div class="dropdown">
						<a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></a>
						<ul class="dropdown-menu">
							<li><button id='${info.userId}' onclick='deleteItem(${info.userId})'class="dropdown-item ">Delete</button></li>
							<li><button  id='update-${info.userId}' onclick='updateItem("${info.userId}")'class="dropdown-item ">Update</button></li>
						</ul>
					</div>
				</div>`
			usersContainer.appendChild(userContainer)
		})
}

const messageBox = document.getElementById("messagebox");

const addUserForm = document.getElementById("addUserForm");
document.getElementById("adduserbutton").addEventListener('click', () => {
    isupdate = false; // Reset isupdate flag
    visibleUserForm(); // Show form with add user functionality
    addUserForm.reset(); // Clear the form fields

});

const formSubmitbtn = document.getElementById("submitBtn");
var isupdate = false
var currentId = null
formSubmitbtn.addEventListener('click', (event) => {
		event.preventDefault(); 
	
		if(isupdate){
			updateUser()
		}
		else{
			addUser();
		}
		
})
//add user
function addUser(){

	const userName = document.getElementById("name");
	const statusMessage = document.getElementById("statusMessage");
	const profilePictureLink = document.getElementById("profilePicLink");
	const presence = document.getElementById("presence");
	var user = {
		userId : users_json.length+1,
		name : userName.value.trim(),
		profilePicture: profilePictureLink.value.trim(),
		statusMessage : statusMessage.value.trim(),
		presence: parseInt(presence.value),
	}
	users_json.unshift(user);
	addUserForm.style.display = "none";
	messageBox.style.display = "flex";

	// console.log("user added")

	displayAll()
};


//update the user

function updateUser(){
	const userName = document.getElementById("name");
	const statusMessage = document.getElementById("statusMessage");
	const profilePictureLink = document.getElementById("profilePicLink");
	const presence = document.getElementById("presence");
	var updatedUser = {
		userId : currentId,
		name : userName.value.trim(),
		profilePicture: profilePictureLink.value.trim(),
		statusMessage : statusMessage.value.trim(),
		presence: parseInt(presence.value),
	}
	if(currentId>5){
		currentId = users_json.length-currentId;
	}else{
		currentId= currentId-1;
	}
	users_json[currentId] = updatedUser;
	// console.log("user updated")
	isupdate = false
	addUserForm.style.display = "none";
	messageBox.style.display = "flex";

	displayAll()
}
// updateItem

function updateItem(userId){
	// console.log("update item")
	currentId = userId;
	if(userId>5){
		userId = users_json.length-userId;
	}else{
		userId= userId-1;
	}
	let user = users_json[userId]
	isupdate = true
	visibleUserForm()
	document.getElementById("name").value = user.name;
	document.getElementById("statusMessage").value = user.statusMessage;
	document.getElementById("profilePicLink").value = user.profilePicture;
	document.getElementById("presence").value = user.presence;
	
}
//show form (add user form)
function visibleUserForm() {
	if(isupdate){
		// console.log("update form")
		formSubmitbtn.textContent = "Update User"
	}
	else{
		// console.log("add  form")
		formSubmitbtn.textContent = "Add User"
	}
	addUserForm.style.display = "block";
	messageBox.style.display = "none";
}
// delete the user
function deleteItem(userId){
	const userindex = users_json.findIndex(user => user.userId===userId)
	if(userindex!==-1){
		users_json.splice(userindex,1);
	}
	displayAll();
}

displayAll()