
/*jshint esversion: 6 */
module.exports = function(app) { //함수로 만들어 객체 router을 전달받음
  var express = require('express');
  var fs = require('fs');
  var path = require('path');
  var qs = require('querystring');
  var bodyParser = require('body-parser');
  var sanitizeHtml = require('sanitize-html');
  var compression = require('compression');
  var loginTemplate = require('../lib/loginTemplate.js');
  var circleMainTemplate = require('../lib/circleMainTemplate.js');
  var circleTemplate = require('../lib/circleTemplate.js');
  var boardTemplate = require('../lib/boardTemplate.js');
  var homeTemplate = require('../lib/homeTemplate.js');
  var helmet = require('helmet');
  var cookieParser = require('cookie-parser');
  var router = express.Router();
  var mysql = require('mysql');
  var multer = require('multer');
	var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'data/image');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});

  var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'CIRCLE',
    port: '3300'
  });
  db.connect();
  router.use('/static', express.static(__dirname + '/public'));

  router.use(cookieParser());
  router.use(bodyParser.urlencoded({
    extended: false
  }));

  // router.get('/general', function(request, response) {
  //   db.query(`SELECT * FROM board WHERE location = ?`, [request.query.location], function(error, result) {
  //     var boards = ``;
  //     for (var i = result.length - 1; i >= 0; i--) {
  //       var boardPointer = circleMainTemplate.boardPointer(result[i].title, result[i].author, result[i].id, result[i].description, request.query.location,request.query.type);
  //       boards += boardPointer;
  //     }
	//
  //     var html = circleMainTemplate.html(request.query.location, boards, '');
  //     response.send(html);
  //   });
  // });

  ////////안들어옴
  router.get('/create', function(request, response) {
    console.log("circle_main/create");
    var date; //title,author,date,image,body,list,comment, create_form
    var html = circleMainTemplate.html(request.query.location,request.query.type , `

			  <form action="/circle_main/create_process?location=${request.query.location}&type=${request.query.type}" method="post" enctype="multipart/form-data">
			      <div class="card my-4">
  						<h5 class="card-header">게시글 작성</h5>
  						<select name="post_type">
    						<option value="1">공지사항</option>
    						<option value="2" selected>일반 게시물</option>
  						</select>
							<div class="card-body">
							<input type="text" class="form-control" name="title" placeholder="title">
			      <textarea class="form-control" name="description" rows="10"placeholder="description"></textarea>
            <input type='file' name='file'><br><br>
			    <button type="submit" class="btn btn-primary">Submit</button>
					</div>
				</div>
			  </form>
		  `, '');
    response.send(html);
  });

  router.post('/create_process', upload.single('file'),function(request, response) {
    var post = request.body;
    var title = post.title;
    var description = post.description;
    var date = post.date;
    var author = request.cookies.name;
    var location = request.query.location;
		var type = post.post_type;
    var image = 'none.jpg';
    if(request.file)
			image = request.file.originalname;
			console.log(location);
    db.query(`
      INSERT INTO board (title, author, date, image, description, location, type)
				VALUES(?, ?, NOW(), ?, ?, ?, ?)`,
			[title, author,image, description, location, type],
      function(error, result) {
        if (error) {
          throw error;
        }
        	response.redirect(`/circle_main?location=${request.query.location}&type=${type}`);
      });
  });

  router.get('/update', function(request, response) {
    var date;
    var id = request.query.id;
    db.query('SELECT * FROM board', function(error, topics) {
      if (error) {
        throw error;
      }
      db.query(`
				SELECT * FROM board WHERE id = ?`, [id], function(error, result) {
        if (error) {
          throw error;
        }
        var html = boardTemplate.html(``, `${result[0].author}`, '', '', `
					<div class="card my-4">
						<form action="/circle_main/update_process" method="post">
							  <input type="hidden" name="id" value="${id}">
								<div class="card my-4">
									<h5 class="card-header">게시글 작성</h5>
									<div class="card-body">
									<input type="text" class="form-control" name="title" placeholder="title" value = "${result[0].title}">
								<textarea class="form-control" name="description" rows="10"placeholder="description">${result[0].description}</textarea>
							<button type="submit" class="btn btn-primary">Submit</button>
							</div>
						</div>
						</form>
					</div>
					`, '');
        response.send(html);
      });
    });
  });

  router.post('/update_process', function(request, response) {
    var post = request.body;
    db.query('UPDATE board SET title=?, description=?,date=NOW() WHERE id=?', [post.title, post.description, post.id], function(error, result) {
      response.redirect(`/circle_main?id=${post.id}`);
    });
  });


  router.post('/delete_process', function(request, response) {
    var id = request.query.id;
    db.query('DELETE FROM board WHERE id=?', [id], function(error, result) {
      response.redirect(`/`);
    });
  });

  return router; //라우터를 리턴
};
