$(document).ready(function () {
    var MOBILE_WIDTH = 991;
    kendo.culture("en-GB");

    function setMenu() {
        var windowWidth = $(window).width();
        $('#Menu').kendoMenu().data('kendoMenu').destroy();

        if (windowWidth <= MOBILE_WIDTH) {
            $('#Menu').kendoMenu({
                openOnClick: true,
                closeOnClick: true
            });
        } else {
            $("#Menu").kendoMenu();
        }

        $("#Menu").show();
    }

    setMenu();

    $(window).resize(function() {
        setMenu();
    });

    $(".noJavascriptMenu").removeClass("noJavascriptMenu");

    var tooltipTimeout;
    $(".userPanel").on("mouseenter", ".menuIcon", function(e) {
        e.preventDefault();
        var $that = $(this);
        tooltipTimeout = setTimeout(function() { $that.children(".name").fadeIn(); }, 500);
    });

    $(".userPanel").on("mouseleave", ".menuIcon", function(e) {
        e.preventDefault();
        clearTimeout(tooltipTimeout);
        $(this).children(".name").css("display", "none");
    });

    jQuery("time.timeago").timeago();

    // Open external links in new tab
    $("#MainContainer a").each(function () {
        var a = new RegExp("/" + window.location.host + "/");
        if (!a.test(this.href) && this.href && this.href != "#") {
            $(this).click(function (event) {
                event.preventDefault();
                event.stopPropagation();
                window.open(this.href, "_blank");
            });
        }
    });
    
    $("#MainHeader").on("click", function () {
        document.location.href = "/";
    });
});

function htmlEditorShow(elementId) {
    kendoEditorShow(elementId);
}

function kendoEditorShow(elementId) {
    $("#" + elementId).css("height", "400px").kendoEditor({
        tools: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "justifyFull",
            "insertUnorderedList",
            "insertOrderedList",
            "indent",
            "outdent",
            "createLink",
            "unlink",
            "insertImage",
            "insertFile",
            "subscript",
            "superscript",
            "createTable",
            "addRowAbove",
            "addRowBelow",
            "addColumnLeft",
            "addColumnRight",
            "deleteRow",
            "deleteColumn",
            "viewHtml",
            "formatting",
            "cleanFormatting",
            "fontName",
            "fontSize",
            "foreColor",
            "backColor"
        ]
    });;
}

function showDatePicker(elementId, minYear, maxYear) {
    var oldValue = $("#" + elementId).val();
    $("#" + elementId).kendoDatePicker({
        format: "dd/MM/yyyy",
        start: "century",
        depth: "month",
        min: new Date(minYear, 0, 1),
        max: new Date(maxYear, 0, 1),
        value: new Date(minYear, 0, 1),
    });
    if (oldValue == "01/01/1900") oldValue = "";
    if (oldValue == "01/01/0001") oldValue = "";
    $("#" + elementId).val(oldValue);

    $("#" + elementId).click(function () {
        $(this).data("kendoDatePicker").open();
    });
}

function showDateTimePicker(elementId) {
    var oldValue = $("#" + elementId).val();

    var hours = [
        new Date(2013, 02, 11, 8)
    ];
    var hoursCount = 8;
    for (var i = 9; i <= 40; i++) {
        if (i % 2 == 0) {
            hours[i - 8] = new Date(0, 0, 0, hoursCount, 0, 0, 0);
        }
        else {
            hours[i - 8] = new Date(0, 0, 0, hoursCount, 30, 0);
            hoursCount++;
        }
    }

    hours[32] = new Date(0, 0, 0, 23, 59, 59);
    hours[33] = new Date(0, 0, 0, 0, 0, 0);

    $("#" + elementId).kendoDateTimePicker({
        parseFormats: ["MMMM yyyy", "HH:mm"],
        format: "dd/MM/yyyy HH:mm:ss",
        timeFormat: "HH:mm:ss",
        start: "month",
        depth: "month",
        width: "1000px",
        dates: hours,
    });

    if (oldValue == "01/01/1900") oldValue = "";
    if (oldValue == "01/01/0001") oldValue = "";

    $("#" + elementId).val(oldValue);

    $("#" + elementId).on("click", function () {
        $(this).data("kendoDateTimePicker").open();
    });
}

function showTimePicker(elementId) {
    $("#" + elementId).kendoTimePicker({
        format: "HH:mm:ss"
    });

    //$("#" + elementId).data("KendoTimePicker").min("8:00 AM");
    //$("#" + elementId).data("KendoTimePicker").min("23:59 PM");

    $("#" + elementId).click(function () {
        $(this).data("kendoTimePicker").open();
    });
}

function showDropDownList(elementId) {
    $("#" + elementId).kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
    });
}

function displayAllValidationMessagesForGrid(nameOfTheGrid) {
    return function(e) {
        if (e.errors) {
            var grid = $("#" + nameOfTheGrid).data("kendoGrid");
            var errors = e.errors;
            for (var err in errors) {
                if (err == "alert" || err == "") {
                    var errorMessageDisplayedToUser = "Грешки:";
                    var errorMessages = errors[err].errors;

                    for (var i = 0, len = errorMessages.length; i < len; i++) {
                        errorMessageDisplayedToUser += "\n" + errorMessages[i];
                    }

                    alert(errorMessageDisplayedToUser);
                    this.cancelChanges();
                }
            }

            grid.one("dataBinding", function(event) {
                event.preventDefault();
                $.each(e.errors, function(propertyName) {
                    showValidationMessageTemplateForPopUpEditing(grid.editable.element, propertyName, this.errors);
                });
            });
        }
    }
}

function showValidationMessageTemplateForPopUpEditing(container, name, errors) {
    //add the validation message to the form
    var validationMessageTmpl = kendo.template($("#validationMessageTemplateForPopUpEditing").html());

    container.find("[data-valmsg-for=" + name + "],[data-val-msg-for=" + name + "]")
        .replaceWith(validationMessageTmpl({ field: name, message: errors[0] }));
}