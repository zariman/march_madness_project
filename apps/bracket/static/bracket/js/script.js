new fullpage('#wrapper', {
    interlockedSlides: true,
    interlockedSlidesKey: 'bG9jYWxob3N0X0tVYmFXNTBaWEpzYjJOclpXUlRiR2xrWlhNPTl4Ng',
    loopHorizontal: false,
});


// $.fn.fullpage.setAllowScrolling(false);

// $('.team').click(function(){
//     $('#myModal').modal()
// })
var grab;

$('.team').on('click', function(event){
    fullpage_api.setMouseWheelScrolling(false);
    $('.dropdown-content').not($(this).children('.dropdown-content')).removeClass('show');
    if(!$(this).children('.dropdown-content').hasClass('show')){
        $(this).children('.dropdown-content').addClass("show");
    }
    if(!$(event.currentTarget).find('.dropdown-content').length){
        if($(event.currentTarget).parent().hasClass("bottom")){
            $.get({
                url: '/dropup',
                success: function(response){
                    $(event.currentTarget).html(response);
                    $('.searchInput', event.currentTarget).focus();

                }
            });
        }else{
            $.get({
                url: '/dropdown',
                success: function(response){
                    $(event.currentTarget).html(response);
                    $('.searchInput', event.currentTarget).focus();
                }
            });
        }
    }
    if(!$(event.target).hasClass('searchInput')){
        filterFunctionReset($(this));
    }
    if($(event.target).is('a')){
        fullpage_api.setMouseWheelScrolling(true);
        $('.dropdown-content').removeClass("show");
        $('.searchInput').val('');
    }
    // $(event.target).find('.searchInput').focus();
});

// TODO: reset scrollbar position to top after exiting dropdown list
$(document).on('click', function() {
    fullpage_api.setMouseWheelScrolling(true);
    $('.dropdown-content').removeClass("show");
    console.log($('.list:first'));
    // $(".list").prop({ scrollTop: $(".list").prop("scrollHeight") });
    $('.searchInput').val('');
});

$('.team').click(function(e){
    e.stopPropagation();
});

// $('.dropdown-content').on('shown', function(){
//     $('body').css('overflow', 'hidden');
// }).on('hidden', function(){
//     $('body').css('overflow', 'auto');
// })

$(document).on('keyup', '.searchInput', function(){ 
    var filter, ul, li, a, i;
    filter = this.value.toUpperCase();
    div = $(this).siblings('.list').children();
    a = div;

    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
});

function filterFunctionReset($element){
    var filter, ul, li, a, i;
    input = $element.find('.searchInput');
    filter = '';
    div = input.siblings('.list').children();
    a = div;

    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
