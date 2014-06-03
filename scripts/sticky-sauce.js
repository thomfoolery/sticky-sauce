(function($) {

  var $header      = $('header')
    , $stickies    = $('.affix-top:not(.affix)')
    , headerHeight = 0
    , scrollTop    = $( window ).scrollTop() + headerHeight

    , hasBootstrap  = !! ( $('.device-xs.visible-xs,.device-sm.visible-sm').size() == 2 )
    ;

  // detect media breakpoint
  function isBreakpoint( alias ) {
    return hasBootstrap && $('.device-' + alias).is(':visible');
  }

  function resetAffixed () {
    $stickies
      .removeClass('affix')
      .css({
        "top": 'null',
        "marginTop": ''
      });
  }

  function onScroll ( e ) {
    var $affixed    = []
      , $notAffixed = []
      , $curr
      , diff
      ;

    scrollTop = $( window ).scrollTop() + headerHeight;

    $stickies.each( function ( index, el ) {
      var $el = $( el );
      $el.css('marginTop', $el.parent().css('marginTop') );
      if ( scrollTop > $el.data('offset-top' ) ) {
        $affixed.push( $el.addClass('affix').css('top', headerHeight ) );
        return;
      }
      $notAffixed.push( $el.removeClass('affix').css('top', '' ) );
    });

    if ( $notAffixed.length == $stickies.size() )
      return; // exit

    $curr = $affixed.pop();
    $.each( $affixed, function ( index, el ) {
      var $el = $( el );
      return $el.css('marginTop', - $el.outerHeight() );
    });

    if ( ! $notAffixed.length )
      return; // exit

    diff = $notAffixed[0].offset().top - scrollTop;
    if ( diff < $curr.outerHeight() )
      $curr.css('marginTop', diff - $curr.outerHeight() + parseInt( $curr.parent().css('marginTop'), 10 ) );

  }

  // on READY
  $( document ).ready( function () {

    $stickies.each( function ( index, el ) {
      var $el = $( el )
        , $wrap = $('<div class="sticky-wraps"/>')
        ;

      $wrap.css({
        'marginTop': $el.css('marginTop'),
        'marginBottom': $el.css('marginBottom')
      });

      $el
        .wrap( $wrap )
        .css({
          'marginTop': 0,
          'marginBottom': 0
        });
    });

    $( window ).on('resize', function ( e ) {

      if ( $header.css('position') == 'fixed' )
        headerHeight = $header.outerHeight();

      $stickies.each( function ( index, el ) {
        var $el = $( el );
        $el.parent().height( $el.outerHeight() );
        $el.data('offset-top', $el.parent().offset().top );
      });

      if ( isBreakpoint('sm') || isBreakpoint('xs') ) {
        resetAffixed();
        $( document ).off('scroll.stickysauce');
      }
      else {
        $( document ).on('scroll.stickysauce', onScroll ).trigger('scroll');
      }

    }).trigger('resize');

    // when images are loaded re-init
    $( window ).on('load', function () {
      $( window ).resize();
    });

  });

})(jQuery);