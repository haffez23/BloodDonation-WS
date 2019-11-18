module.exports = function(app){
	const multer = require('multer');
	
	var storage = multer.diskStorage({
		destination: (req, file, cb) => {
		  cb(null,"'C:\Users\haffe\AndroidStudioProjects\BloodDonationApp\BloodDonationWebServices\'")
		},
		filename: (req, file, cb) => {
		  cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
		}
	});
	
	var upload = multer({storage: storage});
	
	app.post('/api/uploadfile', upload.single("image"), (req, res) => {
	  console.log(req.file);
	  res.json({'msg': 'File uploaded successfully!'+ __dirname, 'file': req.file});
	});
}