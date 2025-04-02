/*** GLOBAL COMMUNITY ***/
	var vCookies,
		vUserID,
		vPage, vLastPage;

//	setCookie(19, "Hello!");
	function setCookie(uID, uState) {
		if(vUserID == null) {
			document.cookie = "DigiDeals-USER: " + uID + "=" + uState + "; path=/; expires=Thu, 01, Jan 2099 00:00:01 GMT;";
			
			vUserID = "here";
		}
	}
	
	checkState();
	function checkState() {
		vCookies = document.cookie.split(";");
		var vCookie;
		for(var i = 0; i < vCookies.length; i++) {
			vCookie = vCookies[i].trim();
			if(vCookie.startsWith("DigiDeals-USER: ")) {
				// User/Client is here.
				vUserID = vCookie.replace("DigiDeals-USER: ", "");
				vUserID = vUserID.split("=", 1);

//				alert(document.getElementsByClassName("js-uMessage"));
//				document.getElementsByClassName("js-uMessage").textContent = "Welcome back, Client N* ";
//				alert("Welcome back, Client N* " + vUserID);
			}
		}
		
		if(vUserID == null) {
			vPage = document.querySelector("html").getAttribute("attr-page");
			
			if(vPage != "community") {
				document.cookie = "DigiDeals-HREF: " + vPage + "; path=/; expires=Thu, 01, Jan 2099 00:00:01 GMT;";

				// Redirect new clients to log in page
				window.location.href = "/community/";
			} else {
				// Click log in button
				alert("Hello, New Client! Kindly log in!");
				
				if(vPage != vLastPage) {
					for(var i = 0; i < vCookies.length; i++) {
						vCookie = vCookies[i].trim();
						if(vCookie.startsWith("DigiDeals-HREF: ")) {
							vLastPage = vCookie.replace("DigiDeals-HREF: ", "");
							vLastPage = vLastPage.split(";", 1);
							alert("Redirecting to: https://localhost:4000/" + vLastPage + "/");

			//				alert(document.getElementsByClassName("js-uMessage"));
			//				document.getElementsByClassName("js-uMessage").textContent = "Welcome back, Client N* ";
			//				alert("Welcome back, Client N* " + vUserID);
						}
					}
				}
			}
		}
	}
/*** END GLOBAL COMMUNITY ***/