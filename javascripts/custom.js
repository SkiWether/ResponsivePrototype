//--CUSTOM JAVASCRIPT AND JQUERY for the COMPONENT EDITOR PROTOTYPE

//--JAVASCRIPT -VANILLA

/*/--JAVASCRIPT injects the new spreadsheet component into a new location
 ----- /*/
function addComp() {
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    var newComp = document.createElement("spreadsheet");
    //newComp.innerHTML = "View the source to see the new web component here.";
    newComp.setAttribute("url", 'http://urltospreadsheet');
    newComp.setAttribute("sheet", 'myData');
    var div = document.getElementById("newLocation");
    insertAfter(div, newComp);
}
//-- On click of submit for ADD COMPONENT, run the above function.
//document.getElementById("submitAdd").onclick = addComp;
var addButton = document.getElementById("submitAdd");
if (addButton !== null)
    addButton.onclick = addComp;
//--END


/*/--JAVASCRIPT enumerates the spreadsheet component properties
 ----- /*/
function processComponentData() {
    var compData = document.getElementsByTagName('spreadsheet');
    var message = 'The component has the following attribute data: \n\n';
    for (var i = 0; i < compData.length; i++) {
        message += compData[i].tagName + " element with 'url' attribute = '" + compData[i].getAttribute('url') + "' AND 'sheet' attribute = '" + compData[i].getAttribute('sheet') + "'\n";
        var sheetInfo = compData[i].getAttribute('sheet');
        var urlInfo = compData[i].getAttribute('url');
    }
    console.log(message);
    //console.log(sheetInfo);
    //console.log(urlInfo);
    //if (compData !== null)
        function ReplaceContentInContainer(id,content) {
            var container = document.getElementById(id);
            container.innerHTML = content;
        }
        ReplaceContentInContainer('urlContent', urlInfo);
        ReplaceContentInContainer('dataContent', sheetInfo);
}
var urlPathName = window.location.pathname;
var filename = urlPathName.substring(urlPathName.lastIndexOf('/') + 1);
console.log("Filename: " + filename);
//--Output data properties from component only if at the Edit Component page
if (filename == "openTemplate.html")
    processComponentData();
/*
var showDataButton = document.getElementById("showData");
if (showDataButton !== null)
    showDataButton.onclick = processComponentData;
*/
//--END


//--jQUERY
$(function () {

    //--POPOVERS
    $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        'placement': 'top'
    });

    //--TABS -- ADD COMPONENT
    $("#locationAdd a.next").click(function(e){
        $('#addComponentTab a:eq(1)').tab('show');
    });
    $("#typeAdd a.previous").click(function(e){
        $('#addComponentTab a:eq(0)').tab('show');
    });
    $("#typeAdd a.next").click(function(e){
        $('#addComponentTab a:eq(2)').tab('show');
    });
    $("#urlAdd a.previous").click(function(e){
        $('#addComponentTab a:eq(1)').tab('show');
    });

    //--TABS -- EDIT COMPONENT
    $("#type a.next").click(function(e){
        $('#myTab a:last').tab('show');
    });
    $("#url a.previous").click(function(e){
        $('#myTab a:first').tab('show');
    });

    //--SELECT COMPONENT
    //--Highlight component if selected and display edit button group --//
    $("input:radio").click(function () {
        $("input:not(:checked)").parent().removeClass("activeComponent");
        $("input:not(:checked)").siblings(".btnGroupContainer").css({"display":"none"});
        $("input:checked").parent().addClass("activeComponent");
        //$("input:checked").parent().addClass("activeComponent");
        $("input:checked").siblings(".btnGroupContainer").css({"display":"block"});
        //-CLOSE OPEN CONTAINERS
        //$(".editComponent").hide("slow");
        $(".moveComponent").hide("slow");
    });
    $("input:radio:checked").parent().addClass("activeComponent");
    $("input:checked").siblings(".btnGroupContainer").css({"display":"block"});

    //--ADD COMPONENT
    //--Clicking the Add button --//
    $(".addBtn").click(function () {
        $(".addComponentContainer").show("slow");
        $(".selectComponent").hide("slow");
    });
    $(".cancelAdd").click(function () {
        location.reload();
    });

    //--ADD COMPONENT -- ON THE NEW.HTML PAGE
    //--Clicking the Add button --//
    $(".newAddBtn").click(function () {
        $(".sidePanel").show();
        $(".addComponentContainer").show("slow");
        $(".mainPanel").addClass("col-sm-7 col-md-8");
    });

    //--EDIT COMPONENT
    //--Clicking the Edit button --//
    $(".btnGroupContainer .editBtn").click(function () {
        $(".editComponent").show("slow");
        $(".moveComponent").hide("slow");
    });
    $(".cancelEdit").click(function () {
        $(".editComponent").hide("slow");
    });

    //--MOVE COMPONENT
    $(".btnGroupContainer .moveBtn").click(function () {
        $(".moveComponent").show("slow");
        $(".editComponent").hide("slow");
    });
    $(".cancelMove").click(function () {
        $(".moveComponent").hide("slow");
    });

    //--MODAL -- LOAD SEPARATE MODALS.HTML FILE AS AN INCLUDE
    //$('#includeModals').load('modals.html');

    //--MODAL -- UPDATE COMPONENT
    //--on submit display success message for a few seconds, close modal, then refresh parent page --//
    $("#submitContent").click(function(){
        $("p").hide();
        $(".alert-success").show();
        window.setTimeout(function(){
            $('#modalGetContent').modal('hide');
            $('#modalGetContent').on('hidden.bs.modal', function (e) {
                location.reload(true);
            })
        }, 3000);
    });

    //--MODAL -- DELETE COMPONENT
    //--on submit show success message for a few seconds, close modal, then refresh parent page --//
    $("#submitDelete").click(function(){
        $(".alert-warning").hide();
        $(".alert-success").show();
        window.setTimeout(function(){
            $('#modalDelete').modal('hide');
            $('#modalDelete').on('hidden.bs.modal', function (e) {
                location.reload(true);
            })
        }, 3000);
    });

    //--MODAL -- MOVE COMPONENT
    //--on submit show success message for a few seconds, close modal, then refresh parent page --//
    $("#submitMove").click(function(){
        $(".alert-success").show();
        window.setTimeout(function(){
            $('#modalMove').modal('hide');
            $('#modalMove').on('hidden.bs.modal', function (e) {
                location.reload(true);
            })
        }, 3000);
    });

});
