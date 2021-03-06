module.exports={
  html:function(boards,circles_list){
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>

      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="description" content="">
      <meta name="author" content="">

      <title>Blog Home - Start Bootstrap Template</title>

      <!-- Bootstrap core CSS -->
      <link href="/static/home/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

      <!-- Custom styles for this template -->
      <link href="/static/home/css/blog-home.css" rel="stylesheet">

    </head>

    <body>

      <!-- Navigation -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
          <a class="navbar-brand" href="/">Circle Management Service</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/reserv_main?location=reservation&type=1">Facility reservation</a>
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/logout_process">Logout</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Page Content -->
      <div class="container">

        <div class="row">

          <!-- Blog Entries Column -->
          <div class="col-md-8">

            <h1 class="my-4">CMS
              <small>동아리프로젝트</small>
            </h1>

            <!-- Blog Post -->

            ${boards}

            <!-- Pagination -->
            <ul class="pagination justify-content-center mb-4">
              <li class="page-item">
                <a class="page-link" href="#">&larr; Older</a>
              </li>
              <li class="page-item disabled">
                <a class="page-link" href="#">Newer &rarr;</a>
              </li>
            </ul>

          </div>

          <!-- Sidebar Widgets Column -->
          <div class="col-md-4">

            <!-- Search Widget -->
            <div class="card my-4">
              <h5 class="card-header">Search</h5>
              <div class="card-body">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search for...">
                  <span class="input-group-btn">
                    <button class="btn btn-secondary" type="button">Go!</button>
                  </span>
                </div>
              </div>
            </div>

            <!-- Categories Widget -->
            <div class="card my-4">
              <h5 class="card-header">Categories</h5>
              <div class="card-body">
                <div class="row">
                    ${circles_list}
                </div>
              </div>
            </div>

            <!-- Side Widget -->
            <div class="card my-4">
            <h5 class="card-header">CMS 중앙 동아리 관리 시스템</h5>
            <div class="card-body">
              중앙 동아리 관리/등록/활동을 도와주는 CMS 중앙 동아리 관리 시스템입니다 ^^
            </div>
              <button type="submit" class="btn btn-primary" onclick="location.href='/board_page/create?location=main'">전체게시판 글쓰기</button>
            </div>
          </div>

        </div>
        <!-- /.row -->

      </div>
      <!-- /.container -->

      <!-- Footer -->
      <footer class="py-5 bg-dark">
        <div class="container">
          <p class="m-0 text-center text-white">Copyright &copy; Your Website 2019</p>
        </div>
        <!-- /.container -->
      </footer>

      <!-- Bootstrap core JavaScript -->
      <script src="/static/home/vendor/jquery/jquery.min.js"></script>
      <script src="/static/home/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    </body>

    </html>
    `;
  },
  boardPointer:function(title,author,image,id,location,date){

    return `
    <!-- Blog Post -->
    <div class="card mb-4">
      <img class="card-img-top" src="/data/image/${image}"width="750" height="300 alt="Card image cap">
      <div class="card-body">
        <h2 class="card-title">${title}</h2>
        <a href="/board_page?id=${id}&location=${location}" class="btn btn-primary">Read More &rarr;</a>
      </div>
      <div class="card-footer text-muted">
        Posted on ${date} by
        <a href="#">${author}</a>
      </div>
    </div>
    `
  }
};
