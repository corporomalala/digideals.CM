/*** DATA ***/
	var tagTrackerForm = document.querySelector(".js-trackerForm"),
		tagTrackerInput = document.querySelector(".js-trackerInput"),
		tagTrackerMessage = document.querySelector(".js-trackerMessage");
		
	var tagVoucherForm = document.querySelector(".js-voucherForm"),
		tagVoucherInput = document.querySelector(".js-voucherInput"),
		tagVoucherMessage = document.querySelector(".js-voucherMessage");

	var tagPrimeForm = document.querySelector(".js-primeForm"),
		tagPrimeInput = document.querySelector(".js-primeInput"),
		tagPrimeMap = document.querySelector(".js-primeMap"),
		tagPrimeText = document.querySelector(".js-primeText");
/*** END DATA ***/

/*** LIBRARY ==> map ***/
        var map = L.map('map').setView([-26.2041, 28.0473], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        const locations = {
            "Partner 1 - HF": { lat: -26.1234, lng: 28.1234 },
            "Partner 2 - CC": { lat: -26.2041, lng: 28.0473 }
        };

        function haversine(coord1, coord2) {
            const R = 6371; // Radius of the Earth in kilometers
            const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
            const dLon = (coord2.lng - coord1.lng) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
                      Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.asin(Math.sqrt(a));
            return R * c; // Distance in kilometers
        }

        function checkDelivery(e) {
			e.preventDefault();
			
            const address = tagPrimeInput.value;
            const resultElement = tagPrimeText;
            resultElement.innerText = ""; // Clear previous results

            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
                .then(response => response.json())
                .then(data => {
					tagPrimeMap.classList.add("is-active");
					
                    if (data.length > 0) {
                        const addressCoords = {
                            lat: parseFloat(data[0].lat),
                            lng: parseFloat(data[0].lon)
                        };

                        // Check distance from both locations
                        let results = [];
                        for (const [locationName, coords] of Object.entries(locations)) {
                            const distance = haversine(addressCoords, coords);
                            results.push(`${locationName}: ${distance.toFixed(2)} km - ${distance <= 7 ? "Within delivery area" : "Outside delivery area"}`);
                        }
						
						tagPrimeMap.classList.remove("is-grey");
						tagPrimeMap.classList.remove("is-color");

                        // Display results
//                        resultElement.innerText = results.join('\n');
						
						// Display results
						if (results.some(result => result.includes("Within"))) {
							resultElement.innerText = "Wonderful, your address is eligible for Prime courier with DigiDeals.";
							tagPrimeMap.classList.add("is-color");
						} else {
							resultElement.innerText = "Unfortunately, you are not eligible for Prime courier with DigiDeals. Your address is not near a DigiDeals warehouse.";
							tagPrimeMap.classList.add("is-grey");
						}

                        L.marker(addressCoords).addTo(map).bindPopup(address).openPopup();
                        map.setView(addressCoords, 13); // Center the map on the address
                    } else {
                        resultElement.innerText = "Address not found. Double-check or be more specific. Add the city, for example.";
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    resultElement.innerText = "An error occurred while geocoding the address.";
                });
        }

        tagPrimeForm.addEventListener('submit', checkDelivery);
/*** END LIBRARY ==> map ***/

/*** PROMO CODE ***/
	var aVouchers = [{"NEW-NOW-1234": "2025-01-26"}, {"NEW-FEB-1234": "2025-02-01"}];
	function checkVoucher(e) {
		e.preventDefault();

		if(tagVoucherInput.value == "") {
			tagVoucherMessage.textContent = "";
		}
		else {
			var iVoucherCheck = false;
			for (var i = 0; i < aVouchers.length; i++) {
				var iVoucher = aVouchers[i],
					iCode = Object.keys(iVoucher)[0];

				if (iCode === tagVoucherInput.value) { iVoucherCheck = true; break; }
			}
			
			if (iVoucherCheck === true) {
				tagVoucherMessage.textContent = "Your voucher code is still valid.";
			}
			else {
				tagVoucherMessage.textContent = "Code is invalid or expired.";
			}
		}
	}
	tagVoucherForm.addEventListener("submit", checkVoucher);
/*** END PROMO CODE ***/

/*** ORDER TRACKER ***/
	var aOrders = [{"0001234": "RECEIVED"}, {"0004567": "DELIVERED"}];
	function trackOrderID(e) {
		e.preventDefault();

		if(tagTrackerInput.value == "") {
			tagTrackerMessage.textContent = "";
		}
		else {
			var iTrackerCheck = false;
			for (var i = 0; i < aOrders.length; i++) {
				var iTracker = aOrders[i],
					iID = Object.keys(iTracker)[0];

				if (iID === tagTrackerInput.value) { iTrackerCheck = true; break; }
			}
			
			if (iTrackerCheck === true) {
				tagTrackerMessage.textContent = "Your order ID is still valid.";
			}
			else {
				tagTrackerMessage.textContent = "ID is non-existent.";
			}
		}
	}
	tagTrackerForm.addEventListener("submit", trackOrderID);
/*** END ORDER TRACKER ***/