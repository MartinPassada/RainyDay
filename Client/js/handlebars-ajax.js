function checkSessionStatus(success, failure) {

    req = new XMLHttpRequest();

    req.onload = function() {

        let respObj = this.response;

        if (this.status == 200) {

            success(respObj);

        } else {

            failure(respObj.error);
        }
    }

    req.open("GET", "/checkSessionStatus");
    req.send();

}