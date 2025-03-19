/*** DATA ***/
/*** END DATA ***/

/*** LIBRARY ==> facebook ***/
/*
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
*/
/*** END LIBRARY ***/

/*** PAGE: CATALOG ***/
	/*** navigation ***/
	window.addEventListener("keydown", checkKeyPress);
	function checkKeyPress(e) {
		var vClassName = "";
		var vProductID = document.querySelector(".js-rdbs:checked").getAttribute("id").replace("rdb4", "");
		
		switch(e.key) {
			case "ArrowLeft":
				vClassName = ".js-btn" + vProductID + "_prev";
				break;
			case "ArrowRight":
				vClassName = ".js-btn" + vProductID + "_next";
				break;
		}
		document.querySelector(vClassName).click();
	}
/*** END PAGE: CATALOG ***/