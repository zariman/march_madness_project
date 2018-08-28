$(document).ready(function(){
    new fullpage('#wrapper', {
        interlockedSlides: true,
        interlockedSlidesKey: 'bG9jYWxob3N0X0tVYmFXNTBaWEpzYjJOclpXUlRiR2xrWlhNPTl4Ng',
        loopHorizontal: false,
    }
    );
});

// $('.team').click(function(){
//     $('#myModal').modal()
// })

$('.team').click(function(event){
    console.log(event.currentTarget);
    $('.dropdown-content').not($(this).children('.dropdown-content')).removeClass('show');
    if(!$(this).children('.dropdown-content').hasClass('show')){
        console.log("Hello");
        $(this).children('.dropdown-content').addClass("show");
    }
    if(!$(event.currentTarget).find('.dropdown-content').length){
        // $(this).html("<div id='myDropdown' class='dropdown-content show'><input type='text' placeholder='Search..' class='searchInput'><a href='#about'>About</a><a href='#base'>Base</a><a href='#blog'>Blog</a><a href='#contact'>Contact</a><a href='#custom'>Custom</a><a href='#support'>Support</a><a href='#tools'>Tools</a></div>");
        $.get({
            url: '/dropdown',
            success: function(response){
                $(event.currentTarget).html(response);
                console.log($(this));
            }
        })
    }
    if(!$(event.target).hasClass('searchInput')){
        filterFunctionReset($(this));
    }
    if($(event.target).is('a')){
        console.log("Child was clicked");
        $('.dropdown-content').removeClass("show");
        $('.searchInput').val('');
    }
});

$(document).on('click', function() {
    $('.dropdown-content').removeClass("show");
    $('.searchInput').val('');
});

$('.team').click(function(e){
    e.stopPropagation();
});

$(document).on('keyup', '.searchInput', function(){ 
    var filter, ul, li, a, i;
    filter = this.value.toUpperCase();
    div = $(this).siblings();
    a = div;

    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
});

// TODO: fix reset search
function filterFunctionReset($element){
    var filter, ul, li, a, i;
    input = $element.find('.searchInput');
    filter = '';
    div = input.siblings();
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
