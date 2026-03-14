const firebaseConfig = {
             apiKey: "AIzaSyBnQl8uR6Dhb95-V2jJjqqaVE96lewT9RU",
                authDomain: "absen-periode-4-maret-2026.firebaseapp.com",
                databaseURL: "https://absen-periode-4-maret-2026-default-rtdb.firebaseio.com",
                projectId: "absen-periode-4-maret-2026",
                storageBucket: "absen-periode-4-maret-2026.firebasestorage.app",
                messagingSenderId: "853195810700",
                appId: "1:853195810700:web:44987fa2984bcf05b218a9",
                measurementId: "G-YKCEB5DEPK"
            };

firebase.initializeApp(firebaseConfig);
const db = firebase.database();




// FUNCTION UPLOAD
function uploadImage() {

  

 const file = document.getElementById("imageFile").files[0];
 const loading = document.getElementById("loading");

 imageUrl = null;

// cek jika file kosong 
if(!file){ 
  alert("Photo Selfie Masih Kosong !!,silahkan Ambil Photo Selfie.."); 
return; }

  loading.style.display = "block"; // tampilkan loading

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Absen-wika");


let xhr = new XMLHttpRequest();



  fetch("https://api.cloudinary.com/v1_1/deybh6pja/image/upload", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {

    // URL CLOUDINARY
    const imageUrl = data.secure_url;
    const now = new Date();
    const nama = localStorage.getItem("username");
    const jabatan = "Site Manager of Administratif";
    const tanggal = now.getDate()+String(new Date().getMonth() + 1).padStart(2,'0')+now.getFullYear();

    // PREVIEW
    document.getElementById("preview").src = imageUrl;

    // SIMPAN KE FIREBASE
    firebase.database().ref("absen/"+tanggal).push({
       photo: imageUrl,
        waktu: now.getHours() + ":" + String(new Date().getMinutes()).padStart(2, '0') + ":" + now.getSeconds(),
        date: now.getDate()+String(new Date().getMonth() + 1).padStart(2,'0')+now.getFullYear(),
        nama : nama
     
    });
    loading.style.display = "none"; // hilangkan loading
    alert("Photo Berhasil di Upload !!");
   
    document.getElementById("btnupload").style.display = "none";


  });

}