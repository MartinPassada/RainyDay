var idForum = getCurrentID();
checkAfterEnter(idForum);

addAcceptAndRejectMembersEvent();


function addAcceptAndRejectMembersEvent() {
    var acceptButtons = document.querySelectorAll('.acceptMemberButton');
    acceptButtons.forEach(b => {
        b.addEventListener('click', function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            let targetMemberText = target.parentElement.firstChild.textContent.replace(/\s/g, '');
            let targetMemberElement = target.parentElement.firstChild;
            let forumID = getCurrentID();
            let actionClicked = 'accepted';
            //agrega miembro al grupo
            acceptOrRejectMember(
                response => {
                    EraseFromTable(targetMemberElement);
                }, targetMemberText, forumID, actionClicked
            );

        }, false);
    });

    var rejectButtons = document.querySelectorAll('.rejectMemberButton');
    rejectButtons.forEach(b => {
        b.addEventListener('click', function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;

            let targetMemberText = target.parentElement.firstChild.textContent.replace(/\s/g, '');
            let targetMemberElement = target.parentElement.firstChild;
            let forumID = getCurrentID();
            let actionClicked = 'rejected';
            //raja el miembro de request
            acceptOrRejectMember(
                response => {
                    EraseFromTable(targetMemberElement);
                }, targetMemberText, forumID, actionClicked
            );
        }, false);
    });

}

function EraseFromTable(targetMemberElement) {
    let table = document.getElementById('requestTable');
    let row = targetMemberElement.parentNode.parentNode;

    row.parentNode.removeChild(row);

    let firstRow = table.children[0].children[1];

    if (firstRow == undefined) {
        let requestListTitle = document.getElementById('requestListTitle');
        table.remove();
        requestListTitle.remove();

    }


}