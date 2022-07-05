/* 	
	Version 2.0
      -- Base version since the versioning
*/


var $ajax = function() {

	this.headers = [["a","b"]];

	this.get = function(id, url, callBackFunction) {		
		return runUsingCallback(id, url, "GET", "", callBackFunction);
	}
	this.delete = function(id, url, callBackFunction) {
		return runUsingCallback(id, url, "DELETE", "", callBackFunction);
	}	
	this.post = function(id, url, payload, callBackFunction) {
		return runUsingCallback(id, url, "POST", payload, callBackFunction);
	}
	this.put = function(id, url, payload, callBackFunction) {
		return runUsingCallback(id, url, "PUT", payload, callBackFunction);
	}
	this.raw = function(id, url, method, payload, callBackFunction) {
		return runUsingCallback(id, url, method, payload, callBackFunction);
	}

	// Run a AJAX query with a callback function result
	var runUsingCallback = function(id, url, method, payload, callBackFunction) {
		
		var xx = new XMLHttpRequest();
		var h = this.headers;
		
		if (method == undefined) { method = "GET"; }
		if (payload == undefined) { payload = ""; }
		
		if (callBackFunction == undefined) {
			//SYNCHRONOUS CALL
			
			xx.open(method, url, false);	
			xx.setRequestHeader("Content-type", "application/json");
			xx.send(payload);
			
			var result = [id, xx.status, xx.responseText, tryParseJSON(xx.responseText)];
			xx = null;
			
			return result;
			
		} 
		else {
			//ASYNCHRONOUS CALL			
			xx.onreadystatechange = function() {
				switch(xx.readyState) {
					case 0:			// Request not initialized
						console.log("--- AJAX - Request not initialized ---");						
						break;
					case 1:			// Server connection established
						console.log("--- AJAX - Server connection established ---");
						console.log("Request: " + method + " : " + url);						
						console.log("Payload: " + payload);
						break;
					case 2:			// Request received
						console.log("--- AJAX - Request received ---");
						break;
					case 3:			//	Processing request
						console.log("--- AJAX - Processing request ---");
						break;
					case 4:			//	Request finished and response is ready
						console.log("--- AJAX - Request finished and response is ready ---")
						console.log("Return Code: " + xx.status);
						
						callBackFunction(id, xx.status, xx.responseText, tryParseJSON(xx.responseText));
						xx = null;
						break;
				}				
			}
			xx.open(method, url, true);	
			xx.setRequestHeader("X-API-DEBUG", "true");
			xx.setRequestHeader("Content-type", "application/json");
			console.log(h);
			for (header in h) {
				if (is_array(header)) {
				console.log("Adding additional header named " +header[0] + " with value " + header[1]);
					xx.setRequestHeader(header[0], header[1]);
				}
			}
			
			xx.send(payload);
		}
	}
	
	// Run a AJAX query with a callback function result
	this.uploadFile = function(id, url, fileObject, arrayData, callBackFunction) {		
		
		var xx = new XMLHttpRequest();
		var formData = new FormData();
		formData.append('file', fileObject);
		
		var i =0;
		for (i=0; i<arrayData.length; i++) {
			formData.append(arrayData[i][0], arrayData[i][1]);
		}
		
		
		if (callBackFunction == undefined) {
			//SYNCHRONOUS CALL
			xx.open('POST', url, false);			
			//xx.setRequestHeader("Content-type", "multipart/form-data");
			xx.send(formData);
			
			var result = [id, xx.status, xx.responseText, tryParseJSON(xx.responseText)];
			xx = null;
			
			return result;
			
		} 
		else {
			//ASYNCHRONOUS CALL			
			xx.onreadystatechange = function() {
				switch(xx.readyState) {
					case 0:			// Request not initialized
						console.log("--- AJAX - Request not initialized ---");						
						break;
					case 1:			// Server connection established
						console.log("--- AJAX - Server connection established ---");
						/*console.log("Request: " + method + " : " + url);						
						console.log("Payload: " + payload);*/
						break;
					case 2:			// Request received
						console.log("--- AJAX - Request received ---");
						break;
					case 3:			//	Processing request
						console.log("--- AJAX - Processing request ---");
						break;
					case 4:			//	Request finished and response is ready
						console.log("--- AJAX - Request finished and response is ready ---")
						console.log("Return Code: " + xx.status);
						
						callBackFunction(id, xx.status, xx.responseText, tryParseJSON(xx.responseText));
						xx = null;
						break;
				}				
			}
			xx.open('POST', url, true);				
			xx.send(formData);
		}
	}
	
	this.buildHTTPAuth = function(username, password) {
		return b64EncodeUnicode(username + ":" + password);
	}
	
	var tryParseJSON = function(text) {
	
		try {
			return JSON.parse(text);
		}
		catch(err) {
			return null;
		}
	
	}

}