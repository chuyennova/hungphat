//
$.ajax({
      type: 'GET',
      url: '/feeds/posts/default/-/ban-may-photocopy',
      data: {
        'max-results': 4,
        'alt': 'json'
      },
      dataType: 'jsonp',
      success: function(e) {
        if (e.feed.entry) {
          for (var f = 0; f < e.feed.entry.length; f++) {
            var entry = e.feed.entry[f],
              entry_title = entry.title.$t
            for (var a = 0; a < entry.link.length; a++) {
              if (entry.link[a].rel == 'alternate') {
                var entry_alternate = entry.link[a].href
                break
              }
            }
            if ('media$thumbnail' in entry) {
              var entry_thumb = entry.media$thumbnail.url.replace('s72-c', 's1600').replace('s72-', '')
            } else {
              var st = entry.content.$t,
                at = st.indexOf("<img"),
                bt = st.indexOf('src="', at),
                ct = st.indexOf('"', bt + 5),
                dt = st.substr(bt + 5, ct - bt - 5)
              if (at != -1 && bt != -1 && ct != -1 && dt != "") entry_thumb = dt
              else entry_thumb = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgzRXPo2SiI0MayBTsXoQHxegEqdq9mBBMXmHK3YLEFABkMM-YGUWB4yOm4aSBgdFvt4X7eFzcnU9P01b0aJgEeht5NnRwoQ8d0hjMY2wmIkYaF8XqW_sqreZ3IPAEm16pFa7Fq8U_Kt4y_DZ1H_wm-RIKIkZSR6NVkvjrHjSiaOM6bzWoGsXg82KC6bUBp/s320/safe_image.png'
            }
            if ('content' in entry) {
              var summary = '',
                re = /<\S[^>]*>/g,
                post_snippet = entry.content.$t,
                post_snippet = post_snippet.replace(re, "");
              if (post_snippet.length < 80) {
                summary = post_snippet;
              } else {
                post_snippet = post_snippet.substring(0, 80);
                var quoteEnd = post_snippet.lastIndexOf(" ");
                post_snippet = post_snippet.substring(0, quoteEnd);
                summary = post_snippet;
              }
              var post_summary = post_snippet.substring(0, quoteEnd);
            }
            $('.row-ban').append('<div class="col-md-3 col-sm-6 col-xs-12"><div class="team-item thumbnail"><a class="thumb-info team" href="'+entry_alternate+'"><img src="'+entry_thumb+'" alt="'+entry_title+'"><span class="thumb-info-title"><span class="thumb-info-inner">'+entry_title+'</span></span></a></div></div>');
          }
        }
      }
    })
