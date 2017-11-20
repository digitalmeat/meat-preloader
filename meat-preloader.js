(function($) {

    var $opLoader = {
        onStart: function() {},
        onComplete: function() {},
        onPercent: function() {}
    };

    var CONTAINER;
    var _urlImages = [];

    var startTime;
    var finishTime;

    var hiddenContainer;
    var imageCount = 0;
    var imageCalc = 0;
            
    $.fn.meatPreloader = function(options) {
        CONTAINER = this;
        if (options) $.extend($opLoader, options);
        this.find("*").each(function() {
            selectImages(this);
        });
        createLoader();
        return this;
    }

    var selectImages = function(element) {
        var url = "";
        if ($(element).css("background-image") != "none") var url = $(element).css("background-image").replace("url(", "").replace(")", "");
        else if (typeof($(element).attr("src")) != "undefined" && element.nodeName.toLowerCase() == "img") var url = $(element).attr("src");
        if (url != "") {
            _urlImages.push(url);
        }
    }

    var createLoader = function() {
        var date = new Date();
        startTime = date.getTime();
        //console.log( _urlImages );
        if (_urlImages != "") {
            CONTAINER.css({ overflow: "hidden" });
            createContainer();
            $opLoader.onStart();
        } else {
            $opLoader.onComplete();
        }
    }

    var createContainer = function() {
        hiddenContainer = $("<div></div>").appendTo(CONTAINER)
            .css({
                display: "none",
                overflow: "hidden",
                width: 0,
                height: 0
            });
        for (var i = 0; i < _urlImages.length; i++) {
            var image = new Image();
            $(image).one({
                load: function() {
                    timePercent();
                },
                error: function() {
                    timePercent();
                }
            })
            .attr("src", _urlImages[i])
            .appendTo(hiddenContainer);
        }
    }

    var timePercent = function() {
        imageCount++;
        var percent = (imageCount / _urlImages.length) * 100;
        $opLoader.onPercent( percent );
        if (imageCount == _urlImages.length) destroyLoader();
    }

    var destroyLoader = function() {
        hiddenContainer.remove();
        CONTAINER.css({ overflow: "auto" });
        $opLoader.onComplete();
    }

})(jQuery);