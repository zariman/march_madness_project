new fullpage('#wrapper', {
    interlockedSlides: true,
    interlockedSlidesKey: 'bG9jYWxob3N0X0tVYmFXNTBaWEpzYjJOclpXUlRiR2xrWlhNPTl4Ng',
    loopHorizontal: false,
});


// $.fn.fullpage.setAllowScrolling(false);

// $('.team').click(function(){
//     $('#myModal').modal()
// })

// Insert teams for each round of tournament
function insert_teams(region, response){
    $("#"+region+' .round1 .team').each(function(i, team) {
        $(team).html('<div class="school-score"><div class="school '+response[region]["round1"][i][2]+'">'+response[region]["round1"][i][0]+'</div><div class="score">'+response[region]["round1"][i][1]+'</div></div>');
    });
    $("#"+region+' .round2 .team').each(function(i, team) {
        $(team).html('<div class="school-score"><div class="school '+response[region]["round2"][i][2]+'">'+response[region]["round2"][i][0]+'</div><div class="score">'+response[region]["round2"][i][1]+'</div></div>');             
    });
    $("#"+region+' .round3 .team').each(function(i, team) {
        $(team).html('<div class="school-score"><div class="school '+response[region]["round3"][i][2]+'">'+response[region]["round3"][i][0]+'</div><div class="score">'+response[region]["round3"][i][1]+'</div></div>');
    });
    $("#"+region+' .round4 .team').each(function(i, team) {
        $(team).html('<div class="school-score"><div class="school '+response[region]["round4"][i][2]+'">'+response[region]["round4"][i][0]+'</div><div class="score">'+response[region]["round4"][i][1]+'</div></div>');
    });
}

// Submits ajax form
$('#choose_year').submit(function(e){
    e.preventDefault()

    $.ajax({
        url: $(this).attr('action'),
        method: 'POST',
        data: $(this).serialize(),
        success: function(serverResponse){
            response = serverResponse["march_madness_data"];
            insert_teams("south", response);
            insert_teams("east", response);
            insert_teams("west", response);
            insert_teams("midwest", response);
        }
    })
});


// Clicking on choose_year select submits a form
$('#choose_year').change(function(){
    // $('input[name=page_number]').val($(this).attr('data-value'))
    $('#choose_year').submit();
    return false;
});

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
                    $(event.currentTarget).prepend(response);
                    $('.searchInput', event.currentTarget).focus();
                }
            });
        }else{
            $.get({
                url: '/dropdown',
                success: function(response){
                    $(event.currentTarget).prepend(response);
                    $('.searchInput', event.currentTarget).focus();
                }
            });
        }
    }
    $('.searchInput', event.currentTarget).focus();
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
