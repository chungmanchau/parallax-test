var GlintManager, GlintPart;

GlintPart = (function() {
    function GlintPart(el) {
        this.glintParentOffset = $(el).parent().prev().offset().top;
        this.glintOffset = $(el).offset().top;
        this.el = el;
        // console.log($(el).parent().prev());
    }

    GlintPart.prototype.update = function(scrollY, i) {
        var pageOffset = scrollY;
        var distance = -(this.glintParentOffset - pageOffset);
        var glintIndex = 1 / (parseInt(i) + 1);
        var glintDistance = this.glintOffset / (distance / glintIndex);
        var glintPerc = (1 / glintDistance) * 100;
        console.log("Glint Offset" + this.glintOffset);
        console.log("Percent Move" + glintDistance);
        console.log("-----");
        this.setYTransform(glintPerc.toFixed(1));
    };

    GlintPart.prototype.setYTransform = function(val) {
        this.el.style.left =  val + "%";
    };

    return GlintPart;

})();

GlintManager = (function() {
    GlintManager.prototype.parts = [];

    function GlintManager(elements) {
        if (typeof elements === 'array' && elements.length) {
            this.elements = elements;
        }
        if (typeof elements === 'object' && elements.item) {
            this.elements = Array.prototype.slice.call(elements);
        } else if (typeof elements === 'string') {
            this.elements = document.querySelectorAll(elements);
            if (this.elements.length === 0) {
                throw new Error("Parallax: No elements found");
            }
            this.elements = Array.prototype.slice.call(this.elements);
        } else {
            throw new Error("Parallax: Element variable is not a querySelector string, Array, or NodeList");
        }
        for (var i in this.elements) {
            this.parts.push(new GlintPart(this.elements[i]));
        }
        window.addEventListener("scroll", this.onScroll.bind(this));
    }

    GlintManager.prototype.onScroll = function() {
        window.requestAnimationFrame(this.scrollHandler.bind(this));
    };

    GlintManager.prototype.scrollHandler = function() {
        var scrollY = Math.max(window.pageYOffset, 0);
        for (var i in this.parts) {
            this.parts[i].update(scrollY, i);
        }
    };

    return GlintManager;

})();

new GlintManager('.glint');
