var $setRows = $('#setRows');

$setRows.submit(function (e) {
  //preventDefault: (a태그나 버튼이 눌렸을 때)새로고침 막아줌
  e.preventDefault();
  // 한 페이지에 보이는 리스트 수 (ex. 글 목록이 3개씩 보이게)
  var rowPerPage = Number($('[name="rowPerPage"]').val())

  var zeroWarning = 'Sorry, but we cat\'t display "0" rows page. + \nPlease try again.'
  // true:1 / false:0
  if (!rowPerPage) {
    // rowPerPage가 0이면 false인데 !가 붙어있음으로 true로 다시 바뀜! 따라서 rowPerPage가 0일 때 경고창이 뜬다. 
    alert(zeroWarning);
    return;
  }
  $('#nav').remove();
  var $products = $('#products');
  // var $icon = $('[name="arrow-back-circle-outline"]');

  $products.after('<div id="nav">');

  var $tr = $($products).find('tbody tr');
  // 리스트의 총 길이
  var rowTotals = $tr.length;
  
  // nav가 생겨야 되는 수 (페이지 수)
  var pageTotal = Math.ceil(rowTotals/rowPerPage);
  var i = 0;

  for (; i < pageTotal; i++) {
    $('<a href="#"></a>')
      // rel: relation의 줄인 말 / 링크 태그에 달리는 링크가 현재 페이지와 어떤 관계를 갖는지를 설명하는 속성
      .attr('rel', i) 
      
      // 이해가 안되넴!!!


      .html(i+1)
      // .appendTo(): 선택한 요소를 다른 요소 안에 넣는다. => a태그를 #nav를 가진 div 태그 안으로 이동시킨다! 
      .appendTo('#nav');
  }

  $tr.addClass('off-screen')
  .slice(0, rowPerPage)
  .removeClass('off-screen');

  var $pagingLink = $('#nav a');
  $pagingLink.on('click', function (event) {
    event.preventDefault();
    var $this = $(this);
    if ($this.hasClass('active')) {
      return;
    }
    $pagingLink.removeClass('active');
    $this.addClass('active');

    var currPage = $this.attr('rel');
    var startItem = currPage * rowPerPage;
    var endItem = startItem + rowPerPage;

    $tr.css('opacity', '0.0')
        .addClass('off-screen')
        .slice(startItem, endItem)
        .removeClass('off-screen')
        .animate({opacity: 1}, 300);

  });

  $pagingLink.filter(':first').addClass('active');

});