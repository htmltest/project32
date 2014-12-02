var speedSlider     = 500;  // скорость прокрутки слайдера
var periodSlider    = 5000; // период автоматической прокрутки слайдера (0 - автопрокрутки нет)

var timerSlider     = null;

(function($) {

    $(document).ready(function() {

        // иконка выбранного языка
        $('.header-lang span').BlackAndWhite({hoverEffect: false});

        // поле поиска
        $('.top-search-input input').each(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.top-search-input input').focus(function() {
            $(this).parent().find('span').css({'display': 'none'});
        });

        $('.top-search-input input').blur(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        // слайдер на главной
        $('.slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);

            var newHTML = '';
            curSlider.find('.slider-item').each(function() {
                newHTML += '<a href="#"></a>';
            });
            $('.slider-ctrl').html(newHTML);
            $('.slider-ctrl a:first').addClass('active');
            $('.slider-ctrl').css({'margin-left': -$('.slider-ctrl').width() / 2});

            if (curSlider.find('li').length > 1 && periodSlider > 0) {
                timerSlider = window.setTimeout(nextSlider, periodSlider);
            }

        });

        $('.slider').on('click', '.slider-ctrl a', function(e) {
            if (!$(this).hasClass('active')) {
                window.clearTimeout(timerSlider);
                timerSlider = null;

                var curSlider = $('.slider');
                if (curSlider.data('disableAnimation')) {
                    var curIndex = curSlider.data('curIndex');
                    var newIndex = $('.slider-ctrl a').index($(this));

                    $('.slider-ctrl a.active').removeClass('active');
                    $('.slider-ctrl a').eq(newIndex).addClass('active');

                    curSlider.data('disableAnimation', false);
                    curSlider.find('.slider-item').eq(curIndex).css({'z-index': 2});
                    curSlider.find('.slider-item').eq(newIndex).css({'z-index': 1}).show();
                    curSlider.find('.slider-item').eq(curIndex).fadeOut(speedSlider, function() {
                        curSlider.data('curIndex', newIndex);
                        curSlider.data('disableAnimation', true);
                        if (periodSlider > 0) {
                            timerSlider = window.setTimeout(nextSlider, periodSlider);
                        }
                    });
                }
            }

            e.preventDefault();
        });

        function nextSlider() {
            window.clearTimeout(timerSlider);
            timerSlider = null;

            var curSlider = $('.slider');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex >= curSlider.find('.slider-item').length) {
                    newIndex = 0;
                }

                $('.slider-ctrl a.active').removeClass('active');
                $('.slider-ctrl a').eq(newIndex).addClass('active');

                curSlider.data('disableAnimation', false);
                curSlider.find('.slider-item').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-item').eq(newIndex).css({'z-index': 1}).show();
                curSlider.find('.slider-item').eq(curIndex).fadeOut(speedSlider, function() {
                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', true);
                    if (periodSlider > 0) {
                        timerSlider = window.setTimeout(nextSlider, periodSlider);
                    }
                });
            }
        }

        // партнеры на главной
        $('.main-partners-content ul li a div').BlackAndWhite();

        $('.main-partners-list').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);

            curSlider.find('.main-partners-prev').css({'display': 'none'});
            if (curSlider.find('li').length < 7) {
                curSlider.find('.main-partners-next').css({'display': 'none'});
            }

            curSlider.find('ul').width(curSlider.find('li:first').width() * curSlider.find('li').length);
        });

        $('.main-partners-next').click(function(e) {
            var curSlider = $(this).parent();

            if (curSlider.data('disableAnimation')) {
                curSlider.find('.main-partners-prev').css({'display': 'block'});

                var curIndex = curSlider.data('curIndex');
                curIndex += 6;

                if (curIndex >= curSlider.find('li').length - 6) {
                    curIndex = curSlider.find('li').length - 6;
                    curSlider.find('.main-partners-next').css({'display': 'none'});
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

        $('.main-partners-prev').click(function(e) {
            var curSlider = $(this).parent();

            if (curSlider.data('disableAnimation')) {
                curSlider.find('.main-partners-next').css({'display': 'block'});

                var curIndex = curSlider.data('curIndex');
                curIndex -= 6;

                if (curIndex <= 0) {
                    curIndex = 0;
                    curSlider.find('.main-partners-prev').css({'display': 'none'});
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * curSlider.find('li:first').width()}, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

        $('.main-partners-content li a').click(function(e) {
            var curItem = $(this).parent();

            $('.main-partners-icon img').attr('src', curItem.find('img').attr('src'));
            $('.main-partners-text').html(curItem.find('.main-partners-detail').html());

            e.preventDefault();
        });

        $('.main-study-title a').click(function(e) {
            $('.main-study-content').slideToggle();

            e.preventDefault();
        });

        // проекты на главной
        $('.main-projects').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
        });

        $('.main-projects-next').click(function(e) {
            var curSlider = $('.main-projects');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex > curSlider.find('.main-projects-item').length - 1) {
                    newIndex = 0;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);
                curSlider.find('.main-projects-item').eq(curIndex).fadeOut(function() {
                    curSlider.find('.main-projects-item').eq(newIndex).fadeIn(function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }
            e.preventDefault();
        });

        $('.main-projects-prev').click(function(e) {
            var curSlider = $('.main-projects');
            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex - 1;
                if (newIndex < 0) {
                    newIndex = curSlider.find('.main-projects-item').length - 1;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);
                curSlider.find('.main-projects-item').eq(curIndex).fadeOut(function() {
                    curSlider.find('.main-projects-item').eq(newIndex).fadeIn(function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }
            e.preventDefault();
        });

        // галерея в контенте
        $('.content-gallery').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);

            if (curSlider.find('li').length < 2) {
                curSlider.find('.content-gallery-next, .content-gallery-prev').hide();
            }
        });

        $('.content-gallery-next').click(function(e) {
            var curSlider = $(this).parent();

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex++;
                if (curIndex == curSlider.find('li').length) {
                    curIndex = 0;
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('li:visible').fadeOut(function() {
                    curSlider.find('li').eq(curIndex).fadeIn(function() {
                        curSlider.data('curIndex', curIndex);
                        curSlider.data('disableAnimation', true);
                    });
                });
            }

            e.preventDefault();
        });

        $('.content-gallery-prev').click(function(e) {
            var curSlider = $(this).parent();

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex--;
                if (curIndex == -1) {
                    curIndex = curSlider.find('li').length - 1;
                }

                curSlider.find('li:visible').fadeOut(function() {
                    curSlider.find('li').eq(curIndex).fadeIn(function() {
                        curSlider.data('curIndex', curIndex);
                        curSlider.data('disableAnimation', true);
                    });
                });
            }

            e.preventDefault();
        });

        // новости в проекте
        $('.project-news-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('disableAnimation', true);

            var curPages = Math.ceil(curSlider.find('li').length / 4);
            if (curPages > 1) {
                var newHTML = '';
                for (var i = 0; i < curPages; i++) {
                    newHTML += '<a href="#"></a>';
                }
                $('.project-news-ctrl').html(newHTML);
                $('.project-news-ctrl a:first').addClass('active');
            }
        });

        $('.project-news').on('click', '.project-news-ctrl a', function(e) {
            var curSlider = $('.project-news-slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = $('.project-news-ctrl a').index($(this));

                $('.project-news-ctrl a.active').removeClass('active');
                $('.project-news-ctrl a').eq(curIndex).addClass('active');

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').fadeOut(function() {
                    curSlider.find('li').hide();
                    curSlider.find('li').eq(curIndex * 4).show();
                    curSlider.find('li').eq(curIndex * 4 + 1).show();
                    curSlider.find('li').eq(curIndex * 4 + 2).show();
                    curSlider.find('li').eq(curIndex * 4 + 3).show();
                    curSlider.find('ul').fadeIn(function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }

            e.preventDefault();
        });

        // архив
        $('.articles-archive-select-value').click(function() {
            var curSelect = $(this).parents().filter('.articles-archive-select');
            if (curSelect.hasClass('articles-archive-select-open')) {
                curSelect.removeClass('articles-archive-select-open');
            } else {
                $('.articles-archive-select-open').removeClass('articles-archive-select-open');
                curSelect.addClass('articles-archive-select-open');
            }
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.articles-archive-select').length == 0) {
                $('.articles-archive-select-open').removeClass('articles-archive-select-open');
            }
        });

        $('.video-list .articles-item-img a, .video-list .articles-item-name a').fancybox({
            padding : 20,
            helpers : {
                media : true,
                title : {
                    type : 'inside'
                }
            },
            tpl : {
                closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            }
        });

        // клиенты
        $('.clients-menu a').click(function(e) {
            var curLi = $(this).parent();

            if (!curLi.hasClass('active')) {
                var curIndex = $('.clients-menu li').index(curLi);
                $('.clients-menu li.active').removeClass('active');
                curLi.addClass('active');
                $('.clients-item.active').removeClass('active');
                $('.clients-item').eq(curIndex).addClass('active');
            }

            e.preventDefault();
        });

        // фотогалерея
        $('.photo-detail-list').each(function() {
            $(window).load(function() {
                var newHTML = '<ul>';
                $('.articles-item a').each(function() {
                    newHTML += '<li><a href="' + $(this).attr('href') + '"><img src="' + $(this).attr('rel') + '" alt="" width="60" height="40" /><span></span></a></li>';
                });
                newHTML += '</ul>';
                $('.item-gallery-list').prepend(newHTML);
                $('.item-gallery-list li:first').addClass('active');

                $('.item-gallery-list').each(function() {
                    var curSlider = $(this);
                    curSlider.data('curIndex', 0);
                    curSlider.data('disableAnimation', true);

                    curSlider.find('.item-gallery-list-prev').css({'display': 'none'});
                    if (curSlider.find('li').length < 11) {
                        curSlider.find('.item-gallery-list-next').css({'display': 'none'});
                    }
                    curSlider.find('li').eq(9).css({'visibility': 'hidden'});

                    curSlider.find('ul').width(80 * curSlider.find('li').length);
                });

            });
        });

        $('.articles-item a').click(function(e) {
            var windowWidth     = $(window).width();
            var windowHeight    = $(window).height();
            var curScrollTop    = $(window).scrollTop();

            $('body').css({'width': windowWidth, 'height': windowHeight, 'overflow': 'hidden'});
            $(window).scrollTop(0);
            $('.wrapper').css({'top': -curScrollTop});
            $('.wrapper').data('scrollTop', curScrollTop);

            var curIndex = $('.articles-item a').index($(this));
            $('.item-gallery-list ul li a').eq(curIndex).click();

            $('.item-gallery').addClass('item-gallery-open');

            e.preventDefault();
        });

        $('.item-gallery-close').click(function(e) {
            itemGalleryClose();
            e.preventDefault();
        });

        $('body').keyup(function(e) {
            if (e.keyCode == 27) {
                itemGalleryClose();
            }
        });

        function itemGalleryClose() {
            if ($('.item-gallery-open').length > 0) {
                $('.wrapper').css({'top': 'auto'});
                $('body').css({'width': 'auto', 'height': 'auto', 'overflow': 'visible'});
                $(window).scrollTop($('.wrapper').data('scrollTop'));

                $('.item-gallery').removeClass('item-gallery-open');
            }
        }

        $(window).bind('load resize', function() {
            var contentHeight   = $(window).height() - ($('.item-gallery-text').height() + $('.item-gallery-list').height());
            $('.item-gallery-big').css({'height': contentHeight, 'line-height': contentHeight + 'px'});

            $('.item-gallery-big img').width('auto');
            $('.item-gallery-big img').height('auto');

            var curWidth = $('.item-gallery-big').width();
            var curHeight = $('.item-gallery-big').height();

            var imgWidth = $('.item-gallery-big img').width();
            var imgHeight = $('.item-gallery-big img').height();

            var newWidth = curWidth;
            var newHeight = imgHeight * newWidth / imgWidth;

            if (newHeight > curHeight) {
                newHeight = curHeight;
                newWidth = imgWidth * newHeight / imgHeight;
            }

            $('.item-gallery-big img').width(newWidth);
            $('.item-gallery-big img').height(newHeight);

            $('.item-gallery-big strong').height($('.item-gallery-big img').height());
        });

        $('.item-gallery').on('click', '.item-gallery-list ul li a', function(e) {
            $('.item-gallery-loading').show();
            var curLink = $(this);
            var curLi   = curLink.parent();

            var contentHeight   = $(window).height() - $('.item-gallery-list').height() - 73;
            $('.item-gallery-big').css({'height': contentHeight, 'line-height': contentHeight + 'px'});

            var curIndex = $('.item-gallery-list ul li').index(curLi);
            $('.item-gallery-load img').attr('src', curLink.attr('href'));
            $('.item-gallery-load img').load(function() {
                $('.item-gallery-big img').attr('src', curLink.attr('href'));
                $('.item-gallery-big img').width('auto');
                $('.item-gallery-big img').height('auto');

                var curWidth = $('.item-gallery-big').width();
                var curHeight = $('.item-gallery-big').height();

                var imgWidth = $('.item-gallery-big img').width();
                var imgHeight = $('.item-gallery-big img').height();

                var newWidth = curWidth;
                var newHeight = imgHeight * newWidth / imgWidth;

                if (newHeight > curHeight) {
                    newHeight = curHeight;
                    newWidth = imgWidth * newHeight / imgHeight;
                }

                $('.item-gallery-big img').width(newWidth);
                $('.item-gallery-big img').height(newHeight);

                $('.item-gallery-big strong').height($('.item-gallery-big img').height());
                $('.item-gallery-big strong').css({'visibility': 'visible'});

                $('.item-gallery-loading').hide();
            });
            $('.item-gallery-list ul li.active').removeClass('active');
            curLi.addClass('active');

            e.preventDefault();
        });

        $('.item-gallery-prev').click(function(e) {
            var curIndex = $('.item-gallery-list ul li').index($('.item-gallery-list ul li.active'));
            curIndex--;
            if (curIndex < 0) {
                curIndex = $('.item-gallery-list ul li').length - 1;
            }
            $('.item-gallery-list ul li').eq(curIndex).find('a').click();
            if (curIndex < $('.item-gallery-list').data('curIndex') + 1) {
                $('.item-gallery-list-prev').click();
            }

            e.preventDefault();
        });

        $('.item-gallery-next').click(function(e) {
            var curIndex = $('.item-gallery-list ul li').index($('.item-gallery-list ul li.active'));
            curIndex++;
            if (curIndex >= $('.item-gallery-list ul li').length) {
                curIndex = 0;
            }
            $('.item-gallery-list ul li').eq(curIndex).find('a').click();
            if (curIndex > $('.item-gallery-list').data('curIndex') + 8) {
                $('.item-gallery-list-next').click();
            }

            e.preventDefault();
        });

        $('.item-gallery-list-next').click(function(e) {
            var curSlider = $('.item-gallery-list');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex += 8;
                curSlider.find('.item-gallery-list-prev').css({'display': 'block'});
                curSlider.find('li').css({'visibility': 'visible'});
                if (curIndex >= curSlider.find('li').length - 10) {
                    curIndex = curSlider.find('li').length - 10;
                    curSlider.find('.item-gallery-list-next').css({'display': 'none'});
                }
                curSlider.find('li').eq(curIndex + 9).css({'visibility': 'hidden'});
                curSlider.find('li').eq(curIndex).css({'visibility': 'hidden'});
                if (curIndex == curSlider.find('li').length - 10) {
                    curSlider.find('li').eq(curIndex + 9).css({'visibility': 'visible'});
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * 80}, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

        $('.item-gallery-list-prev').click(function(e) {
            var curSlider = $('.item-gallery-list');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex -= 8;
                curSlider.find('.item-gallery-list-next').css({'display': 'block'});
                curSlider.find('li').css({'visibility': 'visible'});
                if (curIndex <= 0) {
                    curIndex = 0;
                    curSlider.find('.item-gallery-list-prev').css({'display': 'none'});
                }
                curSlider.find('li').eq(curIndex).css({'visibility': 'hidden'});
                curSlider.find('li').eq(curIndex + 9).css({'visibility': 'hidden'});
                if (curIndex == 0) {
                    curSlider.find('li').eq(curIndex).css({'visibility': 'visible'});
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * 80}, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

    });

    $(window).bind('load resize', function() {
        $('.info-block-bg').each(function() {
            var curImg   = $(this);
            var curBlock = curImg.parent();

            var blockWidth  = curBlock.width();
            var blockHeight = curBlock.height();

            curImg.css({'width': 'auto', 'height': 'auto'});
            var curWidth  = curImg.width();
            var curHeight = curImg.height();

            var newWidth = blockWidth;
            var newHeight = newWidth / curWidth * curHeight;

            if (newHeight < blockHeight) {
                newHeight = blockHeight;
                newWidth = newHeight / curHeight * curWidth;
            }

            curImg.css({'width': newWidth, 'height': newHeight, 'margin-left': -(newWidth / 2) + 'px', 'margin-top': -(newHeight / 2) + 'px', 'visibility': 'visible'});
        });
    });

    $(window).load(function() {

        $('.leaders-list').each(function() {
            var curBlock = $(this);
            var curHeight = 0;
            curBlock.find('.leaders-item').each(function() {
                if (curHeight < $(this).height()) {
                    curHeight = $(this).height();
                }
            });
            curBlock.find('.leaders-item').css({'min-height': curHeight});
        });

        $('.articles-list').each(function() {
            var curBlock = $(this);

            curBlock.find('.articles-item').css({'min-height': 0});
            curBlock.find('.articles-item:nth-child(3n)').each(function() {
                var curItem   = $(this);
                var curIndex  = curBlock.find('.articles-item').index(curItem);
                var prevItem  = curBlock.find('.articles-item').eq(curIndex - 1);
                var firstItem = curBlock.find('.articles-item').eq(curIndex - 2);

                if (curItem.find('.articles-item-event-content').length > 0) {
                    var curHeight = curItem.find('.articles-item-event-content').height();

                    if (prevItem.find('.articles-item-event-content').height() > curHeight) {
                        curHeight = prevItem.find('.articles-item-event-content').height();
                    }

                    if (firstItem.find('.articles-item-event-content').height() > curHeight) {
                        curHeight = firstItem.find('.articles-item-event-content').height();
                    }

                    curItem.find('.articles-item-event-content').css({'min-height': curHeight});
                    prevItem.find('.articles-item-event-content').css({'min-height': curHeight});
                    firstItem.find('.articles-item-event-content').css({'min-height': curHeight});
                }

                if (curItem.find('.articles-item-event-options').length > 0) {
                    var curHeight = curItem.find('.articles-item-event-options').height();

                    if (prevItem.find('.articles-item-event-options').height() > curHeight) {
                        curHeight = prevItem.find('.articles-item-event-options').height();
                    }

                    if (firstItem.find('.articles-item-event-options').height() > curHeight) {
                        curHeight = firstItem.find('.articles-item-event-options').height();
                    }

                    curItem.find('.articles-item-event-options').css({'min-height': curHeight});
                    prevItem.find('.articles-item-event-options').css({'min-height': curHeight});
                    firstItem.find('.articles-item-event-options').css({'min-height': curHeight});
                }

                var curHeight = curItem.height();

                if (prevItem.height() > curHeight) {
                    curHeight = prevItem.height();
                }

                if (firstItem.height() > curHeight) {
                    curHeight = firstItem.height();
                }

                curItem.css({'min-height': curHeight});
                prevItem.css({'min-height': curHeight});
                firstItem.css({'min-height': curHeight});
            });

            if (curBlock.find('.articles-item').length % 3 == 2) {
                var curItem   = curBlock.find('.articles-item:last');
                var curIndex  = curBlock.find('.articles-item').index(curItem);
                var prevItem  = curBlock.find('.articles-item').eq(curIndex - 1);

                if (curItem.find('.articles-item-event-content').length > 0) {
                    var curHeight = curItem.find('.articles-item-event-content').height();

                    if (prevItem.find('.articles-item-event-content').height() > curHeight) {
                        curHeight = prevItem.find('.articles-item-event-content').height();
                    }

                    curItem.find('.articles-item-event-content').css({'min-height': curHeight});
                    prevItem.find('.articles-item-event-content').css({'min-height': curHeight});
                }

                if (curItem.find('.articles-item-event-options').length > 0) {
                    var curHeight = curItem.find('.articles-item-event-options').height();

                    if (prevItem.find('.articles-item-event-options').height() > curHeight) {
                        curHeight = prevItem.find('.articles-item-event-options').height();
                    }

                    curItem.find('.articles-item-event-options').css({'min-height': curHeight});
                    prevItem.find('.articles-item-event-options').css({'min-height': curHeight});
                }

                var curHeight = curItem.height();

                if (prevItem.height() > curHeight) {
                    curHeight = prevItem.height();
                }

                curItem.css({'min-height': curHeight});
                prevItem.css({'min-height': curHeight});
            }
        });

        $('.job-list').each(function() {
            var curBlock = $(this);

            curBlock.find('.job-item').css({'min-height': 0});
            curBlock.find('.job-item:nth-child(2n)').each(function() {
                var curItem   = $(this);
                var curIndex  = curBlock.find('.job-item').index(curItem);
                var prevItem  = curBlock.find('.job-item').eq(curIndex - 1);

                var curHeight = curItem.height();

                if (prevItem.height() > curHeight) {
                    curHeight = prevItem.height();
                }

                curItem.css({'min-height': curHeight});
                prevItem.css({'min-height': curHeight});
            });
        });

        $('.top-sale').each(function() {
            var curBlock = $(this);

            curBlock.find('.top-sale-item').css({'min-height': 0});
            curBlock.find('.top-sale-item:nth-child(3n)').each(function() {
                var curItem   = $(this);
                var curIndex  = curBlock.find('.top-sale-item').index(curItem);
                var prevItem  = curBlock.find('.top-sale-item').eq(curIndex - 1);
                var firstItem = curBlock.find('.top-sale-item').eq(curIndex - 2);

                var curHeight = curItem.height();

                if (prevItem.height() > curHeight) {
                    curHeight = prevItem.height();
                }

                if (firstItem.height() > curHeight) {
                    curHeight = firstItem.height();
                }

                curItem.css({'min-height': curHeight});
                prevItem.css({'min-height': curHeight});
                firstItem.css({'min-height': curHeight});
            });

            if (curBlock.find('.top-sale-item').length % 3 == 2) {
                var curItem   = curBlock.find('.top-sale-item:last');
                var curIndex  = curBlock.find('.top-sale-item').index(curItem);
                var prevItem  = curBlock.find('.top-sale-item').eq(curIndex - 1);

                var curHeight = curItem.height();

                if (prevItem.height() > curHeight) {
                    curHeight = prevItem.height();
                }

                curItem.css({'min-height': curHeight});
                prevItem.css({'min-height': curHeight});
            }
        });

        $('.responses').each(function() {
            var curBlock = $(this);

            curBlock.find('.response').css({'min-height': 0});
            curBlock.find('.response:nth-child(3n)').each(function() {
                var curItem   = $(this);
                var curIndex  = curBlock.find('.response').index(curItem);
                var prevItem  = curBlock.find('.response').eq(curIndex - 1);
                var firstItem = curBlock.find('.response').eq(curIndex - 2);

                var curHeight = curItem.find('.response-text').height();

                if (prevItem.find('.response-text').height() > curHeight) {
                    curHeight = prevItem.find('.response-text').height();
                }

                if (firstItem.find('.response-text').height() > curHeight) {
                    curHeight = firstItem.find('.response-text').height();
                }

                curItem.find('.response-text').css({'min-height': curHeight});
                prevItem.find('.response-text').css({'min-height': curHeight});
                firstItem.find('.response-text').css({'min-height': curHeight});
            });

            if (curBlock.find('.response').length % 3 == 2) {
                var curItem   = curBlock.find('.response:last');
                var curIndex  = curBlock.find('.response').index(curItem);
                var prevItem  = curBlock.find('.response').eq(curIndex - 1);

                var curHeight = curItem.find('.response-text').height();

                if (prevItem.find('.response-text').height() > curHeight) {
                    curHeight = prevItem.find('.response-text').height();
                }

                curItem.find('.response-text').css({'min-height': curHeight});
                prevItem.find('.response-text').css({'min-height': curHeight});
            }
        });

        $('.clients-menu ul li').each(function() {
            $(this).find('a span').css({'border-top-width': $(this).height() / 2, 'border-bottom-width': $(this).height() / 2});
        });

    });

})(jQuery);