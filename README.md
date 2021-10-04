# react_flask

backend : flask

frontend : react

------------------------ OS Windows 10 ---------------

--------------------------flask-----------------------

py -3 -m venv venv

venv\Scripts\activate

pip install Flask

pip install Flask-SQLAlchemy

pip install mysqlclient

pip install flask-marshmallow

pip install marshmallow-sqlalchemy

pip install greenlet

pip install Flask-Cors

-------------------------------- react-----------------

npx create-react-app react_frontend

cd react_frontend

npm install bootstrap

npm start

------------------ [HMR] Waiting for update signal from WDS...


[HMR] Waiting for update signal from WDS...

You can remove this from your console

[HMR] Waiting for update signal from WDS...

you can just go to log.js file which is present in node_modules -

> webpack -
> 
  > hot folder Under that you'll find a 
  > 
      log.js file now you have to comment the section below using ctrl+/.--
      

module.exports = function(level, msg) {

	//if (shouldLog(level)) {
	
	//	if (level === "info") {
	
	//		console.log(msg);
	
	//	} else if (level === "warning") {
	
	//		console.warn(msg);
	
	//	} else if (level === "error") {
	
	//		console.error(msg);
	
	//	}
	
	//}
}; 
