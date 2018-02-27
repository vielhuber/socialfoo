'use strict';

document.addEventListener('DOMContentLoaded', function() {

    if( document.querySelectorAll('.socialfoo').length > 0 ) {
    	[].forEach.call(document.querySelectorAll('.socialfoo'), function(el) { 
    		
    		var socialfoo_div = document.createElement('div');
    		socialfoo_div.className = 'socialfoo-container';
    		var socialfoo_ul = document.createElement('ul');
    		socialfoo_div.appendChild(socialfoo_ul);
    		el.parentNode.insertBefore(socialfoo_div, el);
    		el.parentNode.removeChild(el);

			var item_url = el.getAttribute('data-url');
			var item_title = el.getAttribute('data-title');
			var item_image = el.getAttribute('data-image');

			// total
			var socialfoo_item_total_li = document.createElement('li');
			var socialfoo_item_total_label = document.createElement('label');
			var socialfoo_item_total_span = document.createElement('span');
			socialfoo_item_total_label.innerHTML = 'Total:';
			socialfoo_item_total_span.setAttribute('class','count');
			socialfoo_item_total_li.setAttribute('class','total');
			socialfoo_item_total_li.appendChild(socialfoo_item_total_label);
			socialfoo_item_total_li.appendChild(socialfoo_item_total_span);
			socialfoo_ul.appendChild(socialfoo_item_total_li);
			
			['google', 'facebook', 'xing', 'linkedin', 'twitter', 'pinterest', 'mail'].forEach(function(item) {
				var href = '#';
				if( item == 'google' ) { href = 'https://plus.google.com/share?url='+encodeURIComponent(item_url)+''; }
				if( item == 'facebook' ) { href = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(item_url)+''; }
				if( item == 'xing' ) { href = 'https://www.xing.com/app/user?op=share&amp;url='+encodeURIComponent(item_url)+';title='+encodeURIComponent(item_title)+''; }
				if( item == 'linkedin' ) { href = 'https://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(item_url)+'&title='+encodeURIComponent(item_title)+'&summary=&source='; }
				if( item == 'twitter' ) { href = 'https://twitter.com/home?status='+encodeURIComponent(item_title+' - '+item_url)+''; }
				if( item == 'mail' ) { href = 'mailto:?subject='+item_title+'&body='+item_url+''; }
				if( item == 'pinterest' ) { if( item_image === null ) { return; } href = 'https://www.pinterest.de/pin/create/button/?url='+encodeURIComponent(item_url)+'&media='+encodeURIComponent(item_image)+'&description='+encodeURIComponent(item_title)+''; }
				var socialfoo_item_li = document.createElement('li');
				var socialfoo_item_a = document.createElement('a');
				var socialfoo_item_label = document.createElement('label');
				var socialfoo_item_span = document.createElement('span');
				socialfoo_item_li.setAttribute('class',item);
				socialfoo_item_a.setAttribute('target','_blank');
				socialfoo_item_a.setAttribute('title',item.toUpperCase());
				socialfoo_item_a.setAttribute('rel','nofollow');
				socialfoo_item_a.setAttribute('href',href);
				socialfoo_item_label.innerHTML = item;
				socialfoo_item_span.setAttribute('class','count');
				socialfoo_item_a.appendChild(socialfoo_item_label);
				socialfoo_item_a.appendChild(socialfoo_item_span);
				socialfoo_item_li.appendChild(socialfoo_item_a);
				socialfoo_ul.appendChild(socialfoo_item_li);
			});

			var xhr = new XMLHttpRequest();
			xhr.socialfoo_div = socialfoo_div;
			xhr.open('POST', window.location.protocol + '//' + window.location.host + '/socialfoo.php', true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.onreadystatechange = function() {
				var self = this;
				if (self.readyState != 4 || self.status != 200) return;
				var data = JSON.parse(this.responseText);

				// set total
				self.socialfoo_div.querySelector('.total .count').innerHTML = data['total'];

				// set individual
				['google', 'facebook', 'xing', 'linkedin', 'twitter', 'pinterest'].forEach(function(item) {
					if( self.socialfoo_div.querySelector('.' + item + ' .count') !== null ) {
						self.socialfoo_div.querySelector('.' + item + ' .count').innerHTML = data[item];
					}
				});

				// set count
				self.socialfoo_div.setAttribute('data-cols',self.socialfoo_div.querySelectorAll('li').length-1);

				// show
				self.socialfoo_div.style.display = 'block';
			}
			xhr.send('url='+item_url);

    	});
    }

});
