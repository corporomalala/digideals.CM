/*** GLOBAL COMMUNITY ***/
	/*** cookies ***/
	var vCookies,
		vUserID,
		vPage;

//	setCookie(19, "Hello!");
	function setCookie(uID, uState) {
		if(vUserID == null) {
			document.cookie = "DigiDeals: " + uID + "=" + uState + "; expires=Thu, 01, Jan 2099 00:00:01 GMT;";
			
			vUserID = "here";
		}
	}
	
	checkState();
	function checkState() {
		vCookies = document.cookie.split(";");
		var vCookie;
		for(var i = 0; i < vCookies.length; i++) {
			vCookie = vCookies[i].trim();
			if(vCookie.startsWith("DigiDeals: ")) {
				// User/Client is here.
				vUserID = vCookie.replace("DigiDeals: ", "");
				vUserID = vUserID.split("=", 1);

//				alert(document.getElementsByClassName("js-uMessage"));
//				document.getElementsByClassName("js-uMessage").textContent = "Welcome back, Client N* ";
//				alert("Welcome back, Client N* " + vUserID);
			}
		}
		
		if(vUserID == null) {
			vPage = document.querySelector("html").getAttribute("attr-page");
			
			if(vPage != "community") {
				// Redirect new clients to log in page
			} else {
				// Click log in button
				alert("Hello, New Client! Kindly log in!");
			}
		}
	}
/*** END GLOBAL COMMUNITY ***/