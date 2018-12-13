'use strict';

document.addEventListener('DOMContentLoaded', function()
{

    if( document.querySelectorAll('.socialfoo').length > 0 )
    {
        [].forEach.call(document.querySelectorAll('.socialfoo'), function(el)
        { 
            
            var item_url = el.getAttribute('data-url'),
                item_title = el.getAttribute('data-title'),
                item_image = el.getAttribute('data-image');

            el.insertAdjacentHTML('afterbegin',
                '<div class="socialfoo__inner">\
                    <div class="socialfoo__total">\
                        <span class="socialfoo__total-count"></span>\
                        <label class="socialfoo__total-label">Shares</label>\
                    </div>\
                    <a class="socialfoo__list-toggle" href="#">Share</a>\
                    <ul class="socialfoo__list"></ul>\
                </div>'
            );

            el.querySelector('.socialfoo__list-toggle').addEventListener('click', function(e)
            {
                if( !el.querySelector('.socialfoo__list').classList.contains('socialfoo__list--active') )
                {
                    if( document.querySelectorAll('.socialfoo__list--active').length > 0 )
                    {
                        [].forEach.call(document.querySelectorAll('.socialfoo__list--active'), function(siblings__value)
                        {
                            siblings__value.classList.remove('socialfoo__list--active');
                        });
                    }
                    el.querySelector('.socialfoo__list').classList.add('socialfoo__list--active');
                }
                else
                {
                    el.querySelector('.socialfoo__list').classList.remove('socialfoo__list--active');
                }
                e.preventDefault();
            }, false);

            ['google', 'facebook', 'xing', 'linkedin', 'twitter', 'pinterest', 'whatsapp', 'mail'].forEach(function(item)
            {
                var href = '#';
                if( item == 'google' ) { href = 'https://plus.google.com/share?url='+encodeURIComponent(item_url)+''; }
                if( item == 'facebook' ) { href = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(item_url)+''; }
                if( item == 'xing' ) { href = 'https://www.xing.com/app/user?op=share&amp;url='+encodeURIComponent(item_url)+';title='+encodeURIComponent(item_title)+''; }
                if( item == 'linkedin' ) { href = 'https://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(item_url)+'&title='+encodeURIComponent(item_title)+'&summary=&source='; }
                if( item == 'twitter' ) { href = 'https://twitter.com/intent/tweet?text='+encodeURIComponent(item_title+' - '+item_url)+''; }
                if( item == 'whatsapp' ) { href = 'whatsapp://send?text='+encodeURIComponent(item_title+' - '+item_url)+''; }
                if( item == 'mail' ) { href = 'mailto:?subject='+item_title+'&body='+item_url+''; }
                if( item == 'pinterest' ) {
                    if( el.getAttribute('data-pinterest-image') !== null ) { item_image = el.getAttribute('data-pinterest-image'); }
                    if( el.getAttribute('data-pinterest-description') !== null ) { item_title = el.getAttribute('data-pinterest-description'); }
                    if( item_image === null ) { return; }
                    href = 'https://www.pinterest.de/pin/create/button/?url='+encodeURIComponent(item_url)+'&media='+encodeURIComponent(item_image)+'&description='+encodeURIComponent(item_title)+'';
                }

                // show whatsapp only on mobile
                if( item == 'whatsapp' && window.innerWidth >= 750 )
                {
                    return;
                }

                el.querySelector('.socialfoo__list').insertAdjacentHTML('beforeend',
                    '<li class="socialfoo__list-item socialfoo__list-item--'+item+'">\
                        <a class="socialfoo__link"'+((item !== 'mail')?(' target="_blank"'):(''))+' title="'+item.toUpperCase()+'" rel="nofollow" href="'+href+'">\
                            <label class="socialfoo__label">'+item+'</label>\
                            <span class="socialfoo__count"></span>\
                        </a>\
                    </li>'
                );

            });

            var xhr = new XMLHttpRequest();
            xhr.el = el;
            var curPath = '';
            [].forEach.call(document.getElementsByTagName('script'), function(el)
            {
                if( el.src.indexOf('socialfoo') > -1 )
                {
                    curPath = el.src.substring(0, el.src.lastIndexOf('/'));
                }
            });
            xhr.open('POST', curPath+'/socialfoo.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.onreadystatechange = function()
            {
                var self = this;
                if (self.readyState != 4 || self.status != 200)
                {
                    return;
                }
                var data = JSON.parse(this.responseText);

                // set total
                self.el.querySelector('.socialfoo__total-count').innerHTML = data['total'];

                // set individual
                ['google', 'facebook', 'xing', 'linkedin', 'twitter', 'pinterest'].forEach(function(network__value)
                {
                    if( self.el.querySelector('.socialfoo__list-item--' + network__value + ' .socialfoo__count') !== null && data[network__value] !== undefined )
                    {
                        self.el.querySelector('.socialfoo__list-item--' + network__value + ' .socialfoo__count').innerHTML = data[network__value];
                    }
                });

                // set column count
                self.el.querySelector('.socialfoo__list').setAttribute('data-cols',self.el.querySelectorAll('.socialfoo__list-item').length);

                // show
                self.el.style.display = 'inline-block';
            }
            xhr.send('url='+item_url);

        });
    }

});
