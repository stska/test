$( document ).tooltip();

//creating the top menu
$('.dws-menu ul li').hover(function () {

    $(this).children('ul').stop(false, true).show('slow');
}, function () {

    $(this).children('ul').stop(false, true).hide('slow');
});
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

//getting the array with cities
var self = this;
var array = [];
$.getJSON("https://raw.githubusercontent.com/stska/test/master/kladr.json", function (data) {
    var items = [];
    $.each(data, function (key, val) {
        array.push(val);
    });
});

/* Не использовал готовое api или autocomplete из принципа, хотелось самому что-то организовать, но к сажалению не успел закончить. Но идея следующая. Я зараннее при загрузки страницы получаю массив из Json файла в массив array затем набирая от 3х символов и выше, при каждом новом символе прохожу по массиву и хахожу
соответствия, найденные города подгружал бы в список который вываливался из инпута. Сейчас же он просто записывает все с один li и доделать уже не успеваю, так как каждый раз переделывал по другому.   */
$('#query').keyup(function () {
    var Value = $('#query').val();
    var reg = new RegExp("^(" + Value + ")");
    console.log(reg);
    if (Value.length >= 3) {
        for (var i = 0; i < array.length; i++) {
            console.log(array[i].City);
            console.log(reg);
            var te = array[i].City;
            var test = reg.test(te);
            if (test == true) {
                console.log(te);
                $('.list_new li a').append(te);

                let list = (e) =>
                {
                    let list = e.children[1], step = list.clientHeight;
                    [...list_1.querySelectorAll("[data-scroll]")
                ].
                    forEach(e => e.addEventListener("click", () => list.scrollTop += Number(e.dataset.scroll) ? step : -step
                ))
                    ;
                }
                list(list_1);
            }
        }
        $('.list_res').remove();
    }

})
/*
var cartCount=0;
$('.ul_countries > li a').on('click',function (event) {
    var data =this;

    $('.cart').append($('<p></p>'));
    var list= $('.cart p:last-child');
    list.text(data.dataset.country+ " " + data.dataset.cost);
})
$('.ul_countries li').draggable();
*/
//------------------------------------------------------

$('.good').draggable({
    helper : 'clone',
    revert : true,
    appendTo: 'body',
    start: function(e,ui){
        $(this).addClass('fade');
        ui.helper.css('background','#ddd');
    },
    stop: function(e,ui){
        $(this).removeClass('fade');
        ui.helper.css('background','transparent');
    }
});
// var i=0;
// var sum=[];
// var names;
// var arra=[];

$('.carts').droppable({
    drop: function (e,ui) {
        $('.carts').animate({
            backgroundColor: 'gray'
        })
       // ui.draggable.draggable('disable').appendTo(this);
        ui.draggable.appendTo(this);
        sss(ui);
    }

})
var summ=0;
function sss(set) {
     summ=0;
    /*var collect=$('.carts > div');

    if(collect.length>0) {
        for (var i = 0; i < collect.length; i++) {
            var dat = collect[i].attributes[1].nodeValue;
            summ = summ + (+dat);
            console.log(dat);
        }
   } else summ=0;
    */
 var grasped=set.draggable[0];
 var dataCost=grasped.dataset.cost;
// console.log(grasped);
    $('.carts > div').each(function (t) {
        // console.log(this.dataset.cost);
         summ=summ+(+this.dataset.cost);
     })
    $('.money').text(summ+" $");


}


    // $('.money').text(summ);


//-------------
$('.goodsGallery').droppable({
    drop: function (e,ui) {
        $('.carts').animate({
            backgroundColor: 'gray'
        })
        ui.draggable.appendTo(this);
        sss(ui);
    }
});
$('.cart .good').draggable({
    helper : 'clone',
    revert : true,
    appendTo: 'body',
    start: function(e,ui){
        $(this).addClass('fade');
        ui.helper.css('background','#ddd');
    },
    stop: function(e,ui){
        $(this).removeClass('fade');
        ui.helper.css('background','transparent');
    }
});
//----------------------------------------------------------


//------------------------------------------------------------------





$('.date_birth').datepicker();

  $( function() {
           var dialog, form,

               // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
               emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
               name = $( "#name" ),
               email = $( "#email" ),
               password = $( "#password" ),
               allFields = $( [] ).add( name ).add( email ).add( password ),
               tips = $( ".validateTips" );

           function updateTips( t ) {
               tips
                   .text( t )
                   .addClass( "ui-state-highlight" );
               setTimeout(function() {
                   tips.removeClass( "ui-state-highlight", 1500 );
               }, 500 );
           }

           function checkLength( o, n, min, max ) {
               if ( o.val().length > max || o.val().length < min ) {
                   o.addClass( "ui-state-error" );
                   updateTips( "Length of " + n + " must be between " +
                       min + " and " + max + "." );
                   return false;
               } else {
                   return true;
               }
           }

           function checkRegexp( o, regexp, n ) {
               if ( !( regexp.test( o.val() ) ) ) {
                   o.addClass( "ui-state-error" );
                   updateTips( n );
                   return false;
               } else {
                   return true;
               }
           }


           function addUser() {
               var valid = true;
               allFields.removeClass( "ui-state-error" );

               valid = valid && checkLength( name, "username", 3, 16 );
               valid = valid && checkLength( email, "email", 6, 80 );
               valid = valid && checkLength( password, "password", 5, 16 );

               valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
               valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
               valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

               if ( valid ) {
                   $( "#users tbody" ).append( "<tr>" +
                       "<td>" + name.val() + "</td>" +
                       "<td>" + email.val() + "</td>" +
                       "<td>" + password.val() + "</td>" +
                       "</tr>" );
                   dialog.dialog( "close" );
               }
               return valid;
           }

           dialog = $( "#dialog-form" ).dialog({
               autoOpen: false,
               height: 400,
               width: 350,
               modal: true,
               buttons: {
                   "Create an account": addUser,
                   Cancel: function() {
                       dialog.dialog( "close" );
                   }
               },
               close: function() {
                   form[ 0 ].reset();
                   allFields.removeClass( "ui-state-error" );
               }
           });

           form = dialog.find( "form" ).on( "submit", function( event ) {
               event.preventDefault();
               addUser();
           });

           $( "#create-user" ).button().on( "click", function() {
               dialog.dialog( "open" );
           });
       } );

$( "#accordion" ).accordion({
    collapsible: true
});

