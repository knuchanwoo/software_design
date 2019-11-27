module.exports={
    html:function(){
        return `
        <link rel="stylesheet" type="text/css" href="./css/login.css">

        <div class="join-page">
          <div class="form">
            <div class="register-form">
              <form action="/create_process" method="post"  id="register">
                <input type="text" name="ID" placeholder="ID"/>
                <input type="password" name="password" placeholder="password"/>
                <input type="text" name="name" placeholder="name"/>
                <div class="col-md-4">
                <label><input type="checkbox" name="authority" value="Master">Master</label>
                </div>
                <div class="col-md-4">
                <label><input type="checkbox" name="authority" value="Member">Member</label>
                </div>
              </form>
              <button  type="submit" form="register">create</button>
              <p class="message">Already registered? <a href="/login">Sign In</a></p>
            </div>
          </div>
        </div>
        `;
    }
}