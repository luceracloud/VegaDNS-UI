var React = require('react');
var URI = require('URIjs');
var PagerInnerPage = require('./PagerInnerPage.react');
var VegaDNSActions = require('../actions/VegaDNSActions');

var Pager = React.createClass({
    handleClick: function(page) {
        this.props.callback(page);
    },

    buildUrl: function(page) {
        // Copy params before we modify them
        var newParams = {};
        for (var key in this.props.params) {
            newParams[key] = this.props.params[key];
        }
        newParams["page"] = page;

        var hashUrl = "#" + this.props.route;
        var fakeQueryUrl = URI("index.php");
        for (var key in newParams) {
            fakeQueryUrl.addQuery(key, newParams[key]);
        }
        return hashUrl + fakeQueryUrl.search();
    },

    findPageRange: function(currentPage, showPages, pageCount) {
        // Use ints
        var currentPage = parseInt(currentPage, 10);
        var showPages = parseInt(showPages, 10);

        // Figure out paging range to show
        var pagesEnd = currentPage + Math.floor(showPages / 2);
        if (pagesEnd > pageCount) {
            pagesEnd = pageCount;
        }
        var pagesStart = pagesEnd - showPages;

        if (pagesStart < 1) {
            pagesStart = 1;
        }

        // Fill in beginning
        var pages = pagesEnd - pagesStart;
        while(pages < (showPages - 1) && pagesEnd < (pageCount - 1)) {
            pagesEnd++;
            pages++;
        }

        var pageRange = [];
        for (var i = pagesStart; i <= pagesEnd; i++) {
            pageRange.push(i);
        }

        return pageRange;
    },

    render: function() {
        // Determine key pages and ranges
        var currentPage = this.props.page;
        var showPages = 10;
        var pageCount = Math.ceil(this.props.total / this.props.perpage);
        var pageRange = this.findPageRange(currentPage, showPages, pageCount);
        var prevPage = currentPage > 1 ? currentPage - 1 : 1;
        var nextPage = currentPage < pageCount ? currentPage + 1 : currentPage;

        // Build edge urls
        var firstPageUrl = this.buildUrl(1);
        var prevPageUrl = this.buildUrl(prevPage);
        var nextPageUrl = this.buildUrl(nextPage);
        var lastPageUrl = this.buildUrl(pageCount);

        // Build inner page range
        var innerPages = [];
        for (var i = 0; i < pageRange.length; i++) {
            innerPages.push(
                <PagerInnerPage
                    key={pageRange[i]}
                    page={pageRange[i]}
                    currentPage={currentPage}
                    url={this.buildUrl(pageRange[i])}
                    params={this.props.params}
                    callback={this.props.callback}
                />
            );
        }

        // Render out
        return (
            <nav>
                <ul className="pagination">
                    <li>
                        <a href={firstPageUrl} onClick={this.handleClick.bind(this, 1)} aria-label="First">
                            <span aria-hidden="true">&lt;</span>
                        </a>
                    </li>
                    <li>
                        <a href={prevPageUrl} onClick={this.handleClick.bind(this, prevPage)} aria-label="Previous">
                            <span aria-hidden="true">&lt;&lt;</span>
                        </a>
                    </li>
                    {innerPages}
                    <li>
                        <a href={nextPageUrl} onClick={this.handleClick.bind(this, nextPage)} aria-label="Next">
                            <span aria-hidden="true">&gt;&gt;</span>
                        </a>
                    </li>
                    <li>
                        <a href={lastPageUrl} onClick={this.handleClick.bind(this, pageCount)} aria-label="Last">
                            <span aria-hidden="true">&gt;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
});

module.exports = Pager;
