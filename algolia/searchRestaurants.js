// Algolia client. Mandatory to instantiate the Helper.
var algolia = algoliasearch('RI4I2CUV7G', 'ffc8c3e240cee5c0646f38b16becf361');

// Algolia Helper
var helper = algoliasearchHelper(algolia, 'restaurant_demo_lesspayment', {
  facets: ['Food Type', 'Stars', 'Payment Options'],
  // disjunctiveFacets: ['category', 'manufacturer'],
  highlightPreTag: "<mark>",
  highlightPostTag: "</mark>",
  hitsPerPage: 6,
  maxValuesPerFacet: 5,
  getRankingInfo: true
});

if (navigator.geolocation) {
  var success = (position) => {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    
    var helper = algoliasearchHelper(algolia, 'restaurant_demo_lesspayment', {
      facets: ['Food Type', 'Stars', 'Payment Options'],
      // disjunctiveFacets: ['category', 'manufacturer'],
      hitsPerPage: 5,
      maxValuesPerFacet: 5,
      getRankingInfo: true,
      aroundLatLng: `${lat}, ${lng}`
    });
  };

  var err = () => {};
  navigator.geolocation.getCurrentPosition(success, err);
}

// Bind the result event to a function that will update the results
helper.on("result", searchCallback);

// The different parts of the UI that we want to use in this example
var $inputfield = $("#search-box");
var $hits = $('#hits');
var $facets = $('#facets');
var $resultsHeader = $('#resultsHeader');
var $showMore = $('#showMore');
var $showLess = $('#showLess');

$facets.on('click', handleFacetClick);

$showMore.on('click', (e) => {
  e.preventDefault();
  // var current_page = helper.getPage();
  $showLess.show();
  helper.nextPage().search();
});

$showLess.on('click', (e) => {
  e.preventDefault();
  $showMore.show();
  helper.previousPage().search();
});

// When there is a new character input:
// - update the query
// - trigger the search
$inputfield.keyup(function(e) {
  helper.setQuery($inputfield.val()).search();
  // search($inputfield.val());
});

// Trigger a first search, so that we have a page with results
// from the start.
helper.search();
// search('');

// Result event callback
function searchCallback(content) {
  if (content.hits.length === 0) {
    // If there is no result we display a friendly message
    // instead of an empty page.
    $showMore.hide();
    $hits.empty().html("No results :(");
    renderResultsHeader($resultsHeader, 0, 0);
    return;
  }

  if (helper.getPage() === 0)
    $showLess.hide();

	// Hits/results rendering
  renderHits($hits, content);
  renderFacets($facets, content);
  renderResultsHeader($resultsHeader, content.nbHits, content.processingTimeMS);
}

function renderHits($hits, results) {
  // Scan all hits and display them
  var hits = results.hits.map((hit) => {
   // This is configured in our index settings
    var highlighted = hit._highlightResult;
    var attributes = $.map(highlighted, function renderAttributes(attribute, name) {
      return (
        '<span class="attribute">' +
        attribute.value +
        '</span>');
    });
    return `<div class="hit-card"><div class="card card-outline-secondary h-100">
              <div class="h-100">
                <img class="card-img-top img-fluid img-thumbnail rounded-circle" src="${hit.image_url}">
                <div class="card-block text-center card-name-block">
                  <h5 class="card-title">${attributes[0]}</h5>
                  <p class="card-text">${drawStars(hit.Stars)} (${hit.reviews_count})</p>
                </div>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">${attributes[1]}</li>
                <li class="list-group-item">${attributes[2]}</li>
                <li class="list-group-item">${hit.price_range}</li>
              </ul>
            </div></div>`;
  });
  $hits.html(hits);
}

function renderFacets($facets, results) {
  var facets = results.facets.map(function(facet) {
    var name = facet.name;
    var header = `<h4 class="card-header">
                    ${name}
                  </h4>`;
    var facetValues = results.getFacetValues(name);
    var facetsValuesList = $.map(facetValues, function(facetValue) {
      var facetValueClass = facetValue.isRefined ? 'refined'  : '';
      var valueAndCount = `
                          <div class="row">
                            <a class="col-md-8" data-attribute="${name}" data-value="${facetValue.name}" href="#">
                              ${facetValue.name}
                            </a>
                            <a class="col-md-4" data-attribute="${name}" data-value="${facetValue.name}" href="#">
                              (${facetValue.count})
                            </a>
                          </div>`;
      return '<li data-attribute="' + name + '" data-value="' + facetValue.name +'" class="list-group-item ' + facetValueClass + '">' + valueAndCount + '</li>';
    })
    return (`<div class="facet-card">
              <div class="card">
                <div class="card-block">
                  ${header}
                  <ul class="list-group list-group-flush">
                    ${facetsValuesList.join('')}
                  </ul>
                </div>
              </div>
            </div>`);
  });
  
  $facets.html(facets.join(''));
}

function handleFacetClick(e) {
  e.preventDefault();
  var target = e.target;
  var attribute = target.dataset.attribute;
  var value = target.dataset.value;
  if(!attribute || !value) return;
  helper.toggleRefine(attribute, value).search();
}

// Render the header containing speed and amt of results
var renderResultsHeader = ($resultsHeader, nbHits, processingTimeMS) => {
  $resultsHeader.html("<b>" + nbHits + " results found</b> in " + (processingTimeMS / 1000) + " seconds<hr/>");
};

// Draw rating as stars
var drawStars = (stars_count) => {
  // stars_count : Double
  var filled = `<img width="15" height="15" src="resources/graphics/stars-plain.png" />`.repeat(Math.floor(stars_count));
  var empty = `<img width="15" height="15" src="resources/graphics/star-empty.png" />`.repeat(5 - Math.floor(stars_count));
  return (`<span>${stars_count} - ${filled}${empty}</span>`);
};