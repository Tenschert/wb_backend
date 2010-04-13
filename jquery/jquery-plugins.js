$(document).ready(function()
{
        if($(".jcalendar").length) {
            $.insert(WB_URL+"/include/jscalendar/calendar-system.css");
          }

        if($(".jsadmin").length) {
            $.insert(WB_URL+"/modules/jsadmin/backend.css");
          }
        
        if($(".fluid").length) {
            $.insert(THEME_URL+"/jquery/jquery-cookie.js");
            $(".fluid").toggle(function () {
                $("#admin_header").width('85%');
                $(".menu").width('100%');
                $("#content_container").width('85%');
                $.cookie('fluid', 'percent', { 
                    path: '/', expires: 28 });
            }, function() {
                $("#admin_header").width(950);
                $(".menu").width(950);
                $("#content_container").width(950);
                $.cookie('fluid', null, {
                    path: '/', expires: 28 
                });
            });
            var fluid = $.cookie('fluid');
            if (fluid == 'percent') {
                $("#admin_header").width('85%');
                $(".menu").width('100%');
                $("#content_container").width('85%');
            }; 
        }
                 
        if($("#unzip").length) {
            $("input#unzip").click(function(){
                for (var i=2; i<=10; i++) {
                    $("#file"+i).toggle(function () {
                        $("#upload td").css({"padding":"0"});
                    });
                }
                $("#delzip").toggle();
            });
        }
        
        if($("#settingtabs").length) {
            $.insert(THEME_URL+"/jquery/jquery-ui-all.css");
            $.insert(THEME_URL+"/jquery/jquery.ui.core.min.js");
            $.insert(THEME_URL+"/jquery/jquery.ui.widget.min.js");
            $.insert(THEME_URL+"/jquery/jquery.ui.tabs.min.js");
            $("#settingtabs").tabs();
            $(".display_advanced").hide();
            $(".show_advanced").toggle(function(){
                $(this).addClass("active"); 
                }, function () {
                $(this).removeClass("active");
            });
            $(".show_advanced").click(function(){
                $(this).next(".display_advanced").slideToggle("fast");
            });
            $(".show_advanced").toggle(function(){
                $(".display_advanced").show(); 
                $(this).next(".display_advanced");
                }, function () {
                $(".display_advanced").hide();
                $(this).next(".display_advanced");
            });
        }
        
	    //Add external link class to external links -
	    $('a[href^="http://"]').filter(function() {
            //Compare the anchor tag's host name with location's host name
            return this.hostname && this.hostname !== location.hostname;
        }).addClass("external").attr("target", "_blank");

	    /* Add internal link class to external links -   */
        $('a[href^="http://"]').filter(function() {
            //Compare the anchor tag's host name with location's host name
	        return this.hostname && this.hostname == location.hostname;
        }).addClass("internal");
});