/* ============================================================
   summDy.github.io — 站点逻辑
   依赖：marked (v4) / highlight.js (11.x)，均为本地 vendor 文件
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var state = { site: {}, articles: [], projects: [], tag: 'all', query: '' };
  var lastRoute = 'home';

  /* ---------------- 工具 ---------------- */

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function slugify(s) {
    return String(s || '').trim().toLowerCase()
      .replace(/[`*_~\[\]()#!]/g, '')
      .replace(/[^\w一-龥]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'sec';
  }

  function tagsOf(a) {
    if (Array.isArray(a.tags) && a.tags.length) return a.tags;
    if (a.tag) return [a.tag];
    return [];
  }

  function fmtDate(d) {
    if (!d) return '';
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(d));
    return m ? m[1] + '.' + m[2] + '.' + m[3] : String(d);
  }

  function readingTime(md) {
    var text = String(md || '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/[#>*`_\-[\]()!|]/g, ' ');
    var cjk = (text.match(/[一-龥]/g) || []).length;
    var words = (text.replace(/[一-龥]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
    return Math.max(1, Math.round(cjk / 400 + words / 200));
  }

  function loadJSON(path) {
    return fetch(path, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error(path + ' HTTP ' + r.status);
      return r.json();
    });
  }

  /* ---------------- 主题 ---------------- */

  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('theme', t); } catch (e) {}
    var light = $('#hljs-light'), dark = $('#hljs-dark');
    if (light) light.disabled = (t === 'dark');
    if (dark) dark.disabled = (t !== 'dark');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0a0d15' : '#ffffff');
  }

  function initTheme() {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    $('#themeToggle').addEventListener('click', function () {
      setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------------- 首页渲染 ---------------- */

  function renderSite(site) {
    var name = site.name || 'summDy';
    document.title = name + ' · ' + (site.role || '个人站点');

    var initial = (name.trim().charAt(0) || 'S').toUpperCase();
    var mark = $('#brandMark');
    if (site.avatar) {
      mark.outerHTML = '<img class="brand-mark" id="brandMark" src="' + esc(site.avatar) + '" alt="">';
    } else {
      mark.textContent = initial;
    }
    $('#brandText').textContent = name;

    $('#heroEyebrow').textContent = site.eyebrow || '';
    $('#heroName').textContent = name;
    $('#heroRole').textContent = site.role || '';
    $('#heroTagline').textContent = site.tagline || '';
    $('#aboutText').textContent = site.intro || '';
    $('#footerLeft').innerHTML = '© ' + new Date().getFullYear() + ' ' + esc(name);

    var gh = (site.socials || []).filter(function (s) { return /github/i.test(s.url || ''); })[0];
    if (gh) $('#heroGithub').href = gh.url;

    // 终端装饰
    var lines = site.terminal || [];
    $('#termBody').innerHTML = lines.map(function (l) {
      return '<div class="t-' + esc(l.type || 'out') + '">' + esc(l.text) + '</div>';
    }).join('');

    // 技能
    $('#skillGroups').innerHTML = (site.skills || []).map(function (g) {
      var items = (g.items || []).map(function (i) {
        return '<span class="pill">' + esc(i) + '</span>';
      }).join('');
      return '<div class="skill-group"><h3>' + esc(g.group) + '</h3>' +
             '<div class="pill-row">' + items + '</div></div>';
    }).join('');
  }

  function renderProjects(list) {
    var box = $('#projectCards');
    if (!list.length) {
      box.innerHTML = '<div class="empty"><p>还没有项目，编辑 <code>data/projects.json</code> 添加。</p></div>';
      return;
    }
    box.innerHTML = list.map(function (p) {
      var tags = (p.tags || []).map(function (t) {
        return '<span class="pill">' + esc(t) + '</span>';
      }).join('');
      return '' +
        '<a class="card" href="' + esc(p.link || '#') + '" target="_blank" rel="noopener">' +
          '<div class="card-top">' +
            '<span class="card-title">' + esc(p.title) + '</span>' +
            '<span class="card-year">' + esc(p.year || '') + '</span>' +
          '</div>' +
          '<p class="card-summary">' + esc(p.summary) + '</p>' +
          '<div class="card-tags">' + tags + '</div>' +
          '<span class="btn-text">查看</span>' +
        '</a>';
    }).join('');
  }

  /* ---------------- 文章列表 ---------------- */

  function allTags() {
    var seen = {}, out = [];
    state.articles.forEach(function (a) {
      tagsOf(a).forEach(function (t) { if (!seen[t]) { seen[t] = 1; out.push(t); } });
    });
    return out.sort();
  }

  function renderTagFilter() {
    var tags = allTags();
    var box = $('#tagFilter');
    if (!tags.length) { box.innerHTML = ''; return; }
    var html = '<button class="tag-chip' + (state.tag === 'all' ? ' is-active' : '') +
               '" data-tag="all">全部</button>';
    html += tags.map(function (t) {
      return '<button class="tag-chip' + (state.tag === t ? ' is-active' : '') +
             '" data-tag="' + esc(t) + '">' + esc(t) + '</button>';
    }).join('');
    box.innerHTML = html;
  }

  function visibleArticles() {
    var q = state.query.trim().toLowerCase();
    return state.articles.filter(function (a) {
      if (state.tag !== 'all' && tagsOf(a).indexOf(state.tag) < 0) return false;
      if (!q) return true;
      var hay = (a.title + ' ' + (a.summary || '') + ' ' + tagsOf(a).join(' ')).toLowerCase();
      return hay.indexOf(q) >= 0;
    });
  }

  function renderPosts() {
    var list = visibleArticles();
    var box = $('#postList');
    $('#blogToolbar').hidden = state.articles.length === 0;

    if (!state.articles.length) {
      box.innerHTML = '<div class="empty"><p>还没有文章。在 <code>articles/</code> 里新建 .md，' +
        '再到 <code>data/articles.json</code> 登记一条即可。</p></div>';
      return;
    }
    if (!list.length) {
      box.innerHTML = '<div class="empty"><p>没有匹配的文章，换个关键词或标签试试。</p></div>';
      return;
    }

    box.innerHTML = list.map(function (a) {
      var tags = tagsOf(a).map(function (t) {
        return '<span class="tag-mini">' + esc(t) + '</span>';
      }).join('');
      return '' +
        '<a class="post-item" href="#/post/' + encodeURIComponent(a.file) + '">' +
          '<span class="post-date">' + esc(fmtDate(a.date)) + '</span>' +
          '<span class="post-main">' +
            '<span class="post-title" style="display:block">' + esc(a.title) + '</span>' +
            '<span class="post-summary" style="display:block">' + esc(a.summary || '') + '</span>' +
            '<span class="post-tags">' + tags + '</span>' +
          '</span>' +
        '</a>';
    }).join('');
  }

  /* ---------------- 文章详情 ---------------- */

  function showHome() {
    $('#viewPost').hidden = true;
    $('#viewHome').hidden = false;
    if (lastRoute === 'post') window.scrollTo(0, 0);
    lastRoute = 'home';
    updateProgress();
  }

  function showPost(file) {
    $('#viewHome').hidden = true;
    $('#viewPost').hidden = false;
    lastRoute = 'post';

    var meta = state.articles.filter(function (a) { return a.file === file; })[0] || {};
    $('#postTitle').textContent = meta.title || file.replace(/\.md$/, '');

    $('#postMeta').innerHTML = '<span>' + esc(fmtDate(meta.date)) + '</span><span class="sep">/</span>' +
      '<span id="rtMeta">…</span>' + (tagsOf(meta).length
        ? '<span class="sep">/</span><span>' + tagsOf(meta).map(esc).join(' · ') + '</span>' : '');

    var body = $('#postBody');
    body.innerHTML = '<p style="color:var(--text-3)">加载中…</p>';
    $('#postToc').hidden = true;

    fetch('articles/' + encodeURIComponent(file), { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (md) {
        var html = window.marked ? window.marked.parse(md) : '<pre>' + esc(md) + '</pre>';
        body.innerHTML = html;
        /* 正文首行 H1 与页面标题重复，去掉（仅当内容一致时） */
        var h1 = body.querySelector('h1');
        if (h1 && h1.textContent.trim() === ($('#postTitle').textContent || '').trim()) h1.remove();
        decorateCode();
        buildToc();
        var rt = readingTime(md);
        var el = $('#rtMeta');
        if (el) el.textContent = '约 ' + rt + ' 分钟';
        updateProgress();
      })
      .catch(function (err) {
        body.innerHTML = '<div class="empty"><p>文章加载失败：' + esc(err.message) +
          '<br>确认 <code>articles/' + esc(file) + '</code> 存在，' +
          '并且是通过 http 服务访问（不要用 file:// 直接打开）。</p></div>';
      });

    window.scrollTo(0, 0);
  }

  function decorateCode() {
    $$('#postBody pre').forEach(function (pre) {
      var code = pre.querySelector('code');
      if (window.hljs && code) {
        var langMatch = /language-([\w#+-]+)/.exec(code.className || '');
        var lang = langMatch ? langMatch[1] : '';

        if (!lang) {
          /* 无语言标注：不让 hljs 自动猜，纯文本常被误判成 scss/css */
          code.className = 'language-plaintext';
          lang = 'plaintext';
        }

        if (lang !== 'plaintext' && !window.hljs.getLanguage(lang)) {
          /* 未收录的语言（如 ld 链接脚本）：降级为纯文本，保留 hljs 统一样式 */
          code.className = 'language-plaintext';
          code.dataset.fallbackLang = lang;
        }

        try { window.hljs.highlightElement(code); } catch (e) {}
      }
      if (pre.parentNode.classList.contains('code-block')) return;
      var wrap = document.createElement('div');
      wrap.className = 'code-block';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      /* 语言标签：降级块显示原始语言名，纯文本块不显示 */
      if (code) {
        var shown = code.dataset.fallbackLang || (/language-([\w#+-]+)/.exec(code.className || '') || [])[1] || '';
        if (shown && shown !== 'plaintext') {
          wrap.classList.add('has-lang');
          var tag = document.createElement('span');
          tag.className = 'code-lang';
          tag.textContent = shown;
          wrap.appendChild(tag);
        }
      }

      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.textContent = '复制';
      btn.addEventListener('click', function () {
        var text = pre.innerText;
        var done = function () { btn.textContent = '已复制'; setTimeout(function () { btn.textContent = '复制'; }, 1600); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, fallback);
        } else { fallback(); }
        function fallback() {
          var ta = document.createElement('textarea');
          ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); done(); } catch (e) {}
          document.body.removeChild(ta);
        }
      });
      wrap.appendChild(btn);
    });
  }

  function buildToc() {
    var heads = $$('#postBody h2, #postBody h3');
    var box = $('#postToc'), nav = $('#tocNav');

    if (heads.length < 2) { box.hidden = true; nav.innerHTML = ''; return; }

    var used = {}, html = '';
    heads.forEach(function (h) {
      var base = slugify(h.textContent);
      var id = base, n = 2;
      while (used[id] || document.getElementById(id)) { id = base + '-' + (n++); }
      used[id] = 1;
      h.id = id;
      html += '<a class="d-' + h.tagName.charAt(1) + '" href="#' + id + '">' +
              esc(h.textContent) + '</a>';
    });

    nav.innerHTML = html;
    box.hidden = false;

    if ('IntersectionObserver' in window) {
      var links = $$('#tocNav a');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (l) {
            l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id);
          });
        });
      }, { rootMargin: '-80px 0px -70% 0px' });
      heads.forEach(function (h) { io.observe(h); });
    }
  }

  /* ---------------- 滚动相关 ---------------- */

  function updateProgress() {
    var bar = $('#progressBar');
    if (lastRoute !== 'post') { bar.style.width = '0%'; return; }
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  }

  function initScroll() {
    var nav = $('#nav'), toTop = $('#toTop');
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        nav.classList.toggle('is-scrolled', y > 8);
        toTop.classList.toggle('is-on', y > 480);
        updateProgress();
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onScroll();
  }

  function initReveal() {
    var els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- 路由 ---------------- */

  function handleRoute() {
    var h = location.hash || '';
    var m = /^#\/post\/(.+)$/.exec(h);

    if (m) { showPost(decodeURIComponent(m[1])); return; }

    showHome();
    if (h.length > 1 && h.charAt(1) !== '/') {
      var el = document.getElementById(h.slice(1));
      if (el) requestAnimationFrame(function () {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  /* ---------------- 启动 ---------------- */

  function boot() {
    initTheme();
    initScroll();

    $('#tagFilter').addEventListener('click', function (e) {
      var b = e.target.closest('.tag-chip');
      if (!b) return;
      state.tag = b.dataset.tag;
      renderTagFilter();
      renderPosts();
    });

    $('#searchInput').addEventListener('input', function (e) {
      state.query = e.target.value;
      renderPosts();
    });

    window.addEventListener('hashchange', handleRoute);

    Promise.all([
      loadJSON('data/site.json'),
      loadJSON('data/projects.json'),
      loadJSON('data/articles.json')
    ]).then(function (res) {
      state.site = res[0] || {};
      state.projects = res[1] || [];
      state.articles = (res[2] || []).slice().sort(function (a, b) {
        return String(b.date || '').localeCompare(String(a.date || ''));
      });

      renderSite(state.site);
      renderProjects(state.projects);
      renderTagFilter();
      renderPosts();
      initReveal();
      handleRoute();
    }).catch(function (err) {
      $('#postList').innerHTML = '<div class="empty"><p>数据加载失败：' + esc(err.message) +
        '<br>请通过本地 http 服务访问，例如在项目根目录执行 ' +
        '<code>python -m http.server 8080</code>。</p></div>';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
