new fullpage('#wrapper', {
    interlockedSlides: true,
    interlockedSlidesKey: 'bG9jYWxob3N0X0tVYmFXNTBaWEpzYjJOclpXUlRiR2xrWlhNPTl4Ng',
    loopHorizontal: false,
});

var csrfVar = $('meta[name="csrf-token"]').attr('content');

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

function insert_compare(){
    $('.match').each(function(i, match){
        $(match).append('<div class="compare"><form action="/compare" method="POST">'+csrfVar+'<input type="hidden" name="team1" value="'+$(match).find('.school').eq(0).text()+'"><input type="hidden" name="team2" value="'+$(match).find('.school').eq(1).text()+'"></form></div>');
    });
}

// Makes ajax call after choose_year is submitted
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
            insert_compare();
        }
    })
});


// Clicking on choose_year dropdown submits a form
$('#choose_year').change(function(){
    // $('input[name=page_number]').val($(this).attr('data-value'))
    $('#choose_year').submit();
    return false;
});

// Clicking on team shows a drop list which contains all teams
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
});


// Clicking on compare shows a drop list which shows stat comparison for opposing teams
var $element;
$(document).on('click', '.compare', function(event){
    if($(event.target).hasClass('compare')){
        fullpage_api.setMouseWheelScrolling(false);
        $('.compare-list').not($(this).children('.compare-list')).removeClass('show');
        if(!$(this).children('.compare-list').hasClass('show')){
            $(this).children('.compare-list').addClass("show");
        }
        if(!$(event.target).find('.compare-list').length){
            $element = $(this);
            $(this).submit();
        }
        return false;
    }
});

$(document).on('submit', ('form', $element), function(event){
    if($(event.target).hasClass('compare')){
        event.preventDefault()
    
        if($(event.target).hasClass("bottom")){
            $.post({
                url: $(event.target).find('form').attr('action'),
                data: $(event.target).find('form').serialize(),
                success: function(response){
                    $(event.target).append(response);
                }
            });
        }else{
            $.post({
                url: $(event.target).find('form').attr('action'),
                data: $(event.target).find('form').serialize(),
                success: function(response){
                    $(event.target).append(response);
                }
            });
        }
    }
});

$('.team').click(function(e){
    e.stopPropagation();
});

// TODO: reset scrollbar position to top after exiting dropdown list
$(document).on('click', function(event) {
    if(!$(event.target).hasClass('compare')){
        fullpage_api.setMouseWheelScrolling(true);
        $('.dropdown-content').removeClass("show");
        $('.compare-list').removeClass("show");
        // console.log($('.list:first'));
        // $(".list").prop({ scrollTop: $(".list").prop("scrollHeight") });
        $('.searchInput').val('');
    }
});

// Search team function in drop list
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
