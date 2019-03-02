(function($) {
    $.PaginationCalculator = function(maxentries, opts) { this.maxentries = maxentries;
        this.opts = opts; }
    $.extend($.PaginationCalculator.prototype, { numPages: function() {
            return Math.ceil(this.maxentries / this.opts.items_per_page); }, getInterval: function(current_page) {
            var ne_half = Math.floor(this.opts.num_display_entries / 2);
            var np = this.numPages();
            var upper_limit = np - this.opts.num_display_entries;
            var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
            var end = current_page > ne_half ? Math.min(current_page + ne_half + (this.opts.num_display_entries % 2), np) : Math.min(this.opts.num_display_entries, np);
            return { start: start, end: end }; } });
    $.PaginationRenderers = {}
    $.PaginationRenderers.defaultRenderer = function(maxentries, opts) { this.maxentries = maxentries;
        this.opts = opts;
        this.pc = new $.PaginationCalculator(maxentries, opts); }
    $.extend($.PaginationRenderers.defaultRenderer.prototype, {
        createLink: function(page_id, current_page, appendopts) {
            var lnk, np = this.pc.numPages();
            page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1);
            appendopts = $.extend({ text: page_id + 1, classes: "" }, appendopts || {});
            if (page_id == current_page) { lnk = $("<a class='current'>" + appendopts.text + "</a>"); } else { lnk = $("<a>" + appendopts.text + "</a>").attr('href', this.opts.link_to.replace(/__id__/, page_id)); }
            if (appendopts.classes) { lnk.addClass(appendopts.classes); }
            lnk.data('page_id', page_id);
            return lnk;
        },
        appendRange: function(container, current_page, start, end, opts) {
            var i;
            for (i = start; i < end; i++) { this.createLink(i, current_page, opts).appendTo(container); } },
        getLinks: function(current_page, eventHandler) {
            var begin, end, interval = this.pc.getInterval(current_page),
                np = this.pc.numPages(),
                fragment = $("<div class='pagination'></div>");
            if (this.opts.prev_text && (current_page > 0 || this.opts.prev_show_always)) { fragment.append(this.createLink(current_page - 1, current_page, { text: this.opts.prev_text, classes: "prev" })); }
            if (interval.start > 0 && this.opts.num_edge_entries > 0) {
                end = Math.min(this.opts.num_edge_entries, interval.start);
                this.appendRange(fragment, current_page, 0, end, { classes: 'sp' });
                if (this.opts.num_edge_entries < interval.start && this.opts.ellipse_text) { $("<span class='pagination-break'>" + this.opts.ellipse_text + "</span>").appendTo(fragment); }
            }
            this.appendRange(fragment, current_page, interval.start, interval.end);
            if (interval.end < np && this.opts.num_edge_entries > 0) {
                if (np - this.opts.num_edge_entries > interval.end && this.opts.ellipse_text) { $("<span class='pagination-break'>" + this.opts.ellipse_text + "</span>").appendTo(fragment); }
                begin = Math.max(np - this.opts.num_edge_entries, interval.end);
                this.appendRange(fragment, current_page, begin, np, { classes: 'ep' });
            }
            if (this.opts.next_text && (current_page < np - 1 || this.opts.next_show_always)) { fragment.append(this.createLink(current_page + 1, current_page, { text: this.opts.next_text, classes: "next" })); }
            $('a', fragment).click(eventHandler);
            return fragment;
        }
    });
    $.fn.pagination = function(maxentries, opts) {
        opts = $.extend({ items_per_page: 1, num_display_entries: 4, current_page: 0, num_edge_entries: 1, link_to: "#", prev_text: "<i></i>上一页", next_text: "下一页 <i></i>", ellipse_text: "...", prev_show_always: true, next_show_always: true, renderer: "defaultRenderer", show_if_single_page: false, load_first_page: false, callback: function() {
                return false; } }, opts || {});
        var containers = this,
            renderer, links, current_page;
        $(".page-btn").one("click", function() {
            var allPage = $(".allPage").text();
            var goPage = $(".page-go input").val() - 1;
            if (goPage > -1 && goPage < allPage) { opts.current_page = goPage;
                $("#Pagination").pagination(allPage, opts); } else { $("#Pagination").pagination(allPage); }
            $(".page-go input").val("");
        });

        function paginationClickHandler(evt) {
            var links, new_current_page = $(evt.target).data('page_id'),
                continuePropagation = selectPage(new_current_page);
            if (!continuePropagation) { evt.stopPropagation(); }
            return continuePropagation;
        }

        function selectPage(new_current_page) { containers.data('current_page', new_current_page);
            links = renderer.getLinks(new_current_page, paginationClickHandler);
            containers.empty();
            links.appendTo(containers);
            var continuePropagation = opts.callback(new_current_page, containers);
            return continuePropagation; }
        current_page = parseInt(opts.current_page);
        containers.data('current_page', current_page);
        maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
        opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;
        if (!$.PaginationRenderers[opts.renderer]) {
            throw new ReferenceError("Pagination renderer '" + opts.renderer + "' was not found in jQuery.PaginationRenderers object."); }
        renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);
        var pc = new $.PaginationCalculator(maxentries, opts);
        var np = pc.numPages();
        containers.bind('setPage', { numPages: np }, function(evt, page_id) {
            if (page_id >= 0 && page_id < evt.data.numPages) { selectPage(page_id);
                return false; } });
        containers.bind('prevPage', function(evt) {
            var current_page = $(this).data('current_page');
            if (current_page > 0) { selectPage(current_page - 1); }
            return false;
        });
        containers.bind('nextPage', { numPages: np }, function(evt) {
            var current_page = $(this).data('current_page');
            if (current_page < evt.data.numPages - 1) { selectPage(current_page + 1); }
            return false;
        });
        links = renderer.getLinks(current_page, paginationClickHandler);
        containers.empty();
        if (np > 1 || opts.show_if_single_page) { links.appendTo(containers); }
        if (opts.load_first_page) { opts.callback(current_page, containers); }
    }
})(jQuery);
