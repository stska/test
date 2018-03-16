$('.tab_left li').on('click', function (event) {

    $('.tab').stop(false, true).hide('slow');

    if ($(this).data('tab') === "one") {
        $('#tab1').stop(false, true).show('slow');

    } else if ($(this).data('tab') === "two") {
        $('#tab2').stop(false, true).show('slow');
    } else if ($(this).data('tab') === "three") {
        $('#tab3').stop(false, true).show('slow');
    } else $('#tab4').stop(false, true).show('slow');

});

//creating the left side bar
$('.pull_tab').on('click', function (event) {
    var p = $('.nav-side');
    var position = p.position();
    console.log(position.left);
    if (position.left > 0) {
        $('.nav-side').animate({

            right: 3000,
            left: -2000
        }, 1000),
            $('.pull_tab').animate({
                left: 458.500,
                right: 1411.500
            }, 100);
    }


    else {
        $('.nav-side').animate({

            right: 1300,
            left: 453
        }, 1000),
            $('.pull_tab').animate({
                left: 950
            }, 100);
    }
});


var cartCount = 0;
$('.ul_countries > li a').on('click', function (event) {
    var data = this;

    $('.cart').append($('<p></p>'));
    var list = $('.cart p:last-child');
    list.text(data.dataset.country + " " + data.dataset.cost);
})
$('.ul_countries li').draggable();

//------------------------------------------------------
//set up the permission for drag and drop elemets
$('.good').draggable({
    helper: 'clone',
    revert: true,
    appendTo: 'body',
    start: function (e, ui) {
        $(this).addClass('fade');
        ui.helper.css('background', '#ddd');
    },
    stop: function (e, ui) {
        $(this).removeClass('fade');
        ui.helper.css('background', 'transparent');
    }
});


$('.carts').droppable({
    drop: function (e, ui) {
        $('.carts').animate({
            backgroundColor: 'gray'
        })

        ui.draggable.appendTo(this);
        sss(ui);
    }

})
//to sum up the money
var summ = 0;

function sss(set) {
    summ = 0;
    var flag = false;
    var grasped = set.draggable[0];
    var dataCost = grasped.dataset.cost;

    $('.carts > div').each(function (t) {
        summ = summ + (+this.dataset.cost);
        flag = true;
    })
    $('.money').text(summ + " $");
    return flag;

}


//-------------
$('.goodsGallery').droppable({
    drop: function (e, ui) {
        $('.carts').animate({
            backgroundColor: 'gray'
        })
        ui.draggable.appendTo(this);
        sss(ui);
    }
});
$('.cart .good').draggable({
    helper: 'clone',
    revert: true,
    appendTo: 'body',
    start: function (e, ui) {
        $(this).addClass('fade');
        ui.helper.css('background', '#ddd');
    },
    stop: function (e, ui) {
        $(this).removeClass('fade');
        ui.helper.css('background', 'transparent');
    }
});
//----------------------------------------------------------

//datepicker
$('.date_birth').datepicker({
    dateFormat: "yy-mm-dd",
    minDate: new Date($('#hiddendelivdate').val()),
    monthNames:
        ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    firstDay: 1,
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
});

$(function () {
    var dialog, form,

        // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        name = $("#name"),
        email = $("#email"),
        password = $("#password"),
        allFields = $([]).add(name).add(email).add(password),
        tips = $(".validateTips");

    function updateTips(t) {
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Length of " + n + " must be between " +
                min + " and " + max + ".");
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp(o, regexp, n) {
        if (!( regexp.test(o.val()) )) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }


    function addUser() {
        var valid = true;
        allFields.removeClass("ui-state-error");

        valid = valid && checkLength(name, "username", 3, 16);
        valid = valid && checkLength(email, "email", 6, 80);
        valid = valid && checkLength(password, "password", 5, 16);

        valid = valid && checkRegexp(name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
        valid = valid && checkRegexp(email, emailRegex, "eg. ui@jquery.com");
        valid = valid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");

        if (valid) {
            $("#users tbody").append("<tr>" +
                "<td>" + name.val() + "</td>" +
                "<td>" + email.val() + "</td>" +
                "<td>" + password.val() + "</td>" +
                "</tr>");
            dialog.dialog("close");
        }
        return valid;
    }

    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Create an account": addUser,
            Cancel: function () {
                dialog.dialog("close");
            }
        },
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        addUser();
    });

    $("#create-user").button().on("click", function () {
        dialog.dialog("open");
    });
});

$("#accordion").accordion({
    collapsible: true
});

//create a dialog box for errors and submited
$("#dialog").dialog({
    autoOpen: false,
    show: {
        effect: "blind",
        duration: 1000
    },
    hide: {
        effect: "explode",
        duration: 1000
    }
})

$("#dialog2").dialog({
    autoOpen: false,
    show: {
        effect: "blind",
        duration: 1000
    },
    hide: {
        effect: "explode",
        duration: 1000
    }
})


$(".submit").on("click", function () {
    $("#dialog").dialog("open");
});
$("#buy").on("click", function () {
    if ($('.carts > div').is('div')) {
        $("#dialog2").dialog("open");
    } else $("#dialog").dialog("open");
});


$(".widget input[type=submit], .widget a, .widget button").button();
$("button, input, a").click(function (event) {
    event.preventDefault();
});



