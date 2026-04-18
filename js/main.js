// モーダル開閉
$(function () {
    const $body = $('body');

    // モーダルを開く
    $('.modal-open-button').on('click', function (e) {
        e.preventDefault();
        const targetId = $(this).data('target');

        // 他のモーダルを閉じる
        $('.modal').removeClass('show');

        // 対象モーダルを開く
        $('#' + targetId).addClass('show');
        $body.css('overflow', 'hidden'); // スクロールロック
    });

    // モーダルを閉じる（×ボタン or 背景クリック）
    $('.modal, .modal .close').on('click', function (e) {
        if ($(e.target).is('.modal') || $(e.target).hasClass('close')) {
            $(this).closest('.modal').removeClass('show');

            // 全モーダルが閉じたらスクロール復活
            if ($('.modal.show').length === 0) {
                $body.css('overflow', '');
            }
        }
    });

});


$(function () {
    var $header = $("#header");
    var $trigger = $("#works-trigger");

    function isInView($el) {
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var offsetTop = $el.offset().top;
        return (offsetTop < scrollTop + windowHeight);
    }

    $(window).on("load scroll", function () {
        if (isInView($trigger)) {
            $header.addClass("scroll");
        } else {
            $header.removeClass("scroll");
        }
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const about = document.querySelector(".about");

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            about.classList.add("fixed");
            about.classList.remove("unfixed");
        } else {
            about.classList.remove("fixed");
            about.classList.add("unfixed");
        }
    }, {
        threshold: 0.5 // 50%表示されたらトリガー
    });

    observer.observe(about);
});


document.addEventListener('DOMContentLoaded', () => {
    const borders = document.querySelectorAll('footer .border1, footer .border2, footer .border3, footer .border4');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const index = el.dataset.index;
                el.style.animationDelay = `${index * 0.1}s`;
                el.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2
    });

    borders.forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-heading-wrapper');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const heading = entry.target.querySelector('.section-heading');
                const sub = entry.target.querySelector('.section-sub');
                heading.classList.add('show');
                setTimeout(() => {
                    sub.classList.add('show');
                }, 200); // 少し遅らせて出現
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));
});

document.addEventListener('DOMContentLoaded', () => {
    const headings = document.querySelectorAll('.web_site_heading');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 1.0
    });

    headings.forEach(h => observer.observe(h));
});

// ハンバーガーメニュー開閉
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.header-nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        nav.classList.toggle('open');
    });
});


// モーダル表示中、スクロールロック
$(function () {
    const $body = $('body');

    $('.modal-open-button').on('click', function (e) {
        e.preventDefault();
        const targetId = $(this).data('target');
        const $targetModal = $('#' + targetId);
        $targetModal.addClass('show');
        $body.css('overflow', 'hidden');
    });

    $('.modal').on('click', function (e) {
        if ($(e.target).is('.modal') || $(e.target).hasClass('close')) {
            $(this).removeClass('show');

            if ($('.modal.show').length === 0) {
                $body.css('overflow', '');
            }
        }
    });
});

// スライダー
$(document).ready(function () {
    const $images = $('.about-photo-slider img');
    const total = $images.length;
    let current = 0;

    $images.eq(current).addClass('active');

    // 自動スライド
    let interval = setInterval(() => {
        $images.eq(current).removeClass('active');
        current = (current + 1) % total;
        $images.eq(current).addClass('active');
    }, 3500);

    // 手動スライド：右クリック
    $('.right-zone').on('click', function () {
        $images.eq(current).removeClass('active');
        current = (current + 1) % total;
        $images.eq(current).addClass('active');
    });

    // 手動スライド：左クリック
    $('.left-zone').on('click', function () {
        $images.eq(current).removeClass('active');
        current = (current - 1 + total) % total;
        $images.eq(current).addClass('active');
    });
});

// ホバー切り替え
$(document).ready(function () {
    $(".image").each(function () {
        const $img = $(this);
        const originalSrc = $img.attr("src");
        const hoverSrc = $img.data("hover");

        if (hoverSrc) {
            $img.hover(
                function () {
                    $img.stop(true, true).fadeOut(200, function () {
                        $img.attr("src", hoverSrc).fadeIn(200);
                    });
                },
                function () {
                    $img.stop(true, true).fadeOut(200, function () {
                        $img.attr("src", originalSrc).fadeIn(200);
                    });
                }
            );
        }
    });
});

// 私について
$(function () {
    function showOnScroll() {
        $('.about-introduction').each(function () {
            const $section = $(this);
            const scrollTop = $(window).scrollTop();
            const offsetTop = $section.offset().top;
            const windowHeight = $(window).height();

            if (scrollTop + windowHeight > offsetTop + 50) {
                // 画像先に表示
                $section.find('.fade-photo').addClass('visible');

                const $steps = $section.find('.fade-step');
                const delayStart = 800; // ← 画像が表示された後に h2 を出す

                $steps.each(function (i) {
                    const $el = $(this);
                    setTimeout(() => {
                        $el.addClass('visible');
                    }, delayStart + i * 400);
                });
            }
        });
    }

    showOnScroll();
    $(window).on('scroll', showOnScroll);
});

// 私について。きっかけ
document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector('.about-text-box');

    if (!target) return;

    const spans = target.querySelectorAll('.fade-detail');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                spans.forEach((el, i) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, i * 500);
                });

                obs.unobserve(entry.target); // 一度だけ表示
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(target);
});

// 私についてのできること動き
document.addEventListener('DOMContentLoaded', () => {
    const fadeSkills = document.querySelectorAll('.fade-skill');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 表示対象グループを取得（近い親の skills-wrapper）
                const group = entry.target.closest('.skills-wrapper');
                if (!group) return;

                const items = group.querySelectorAll('.fade-skill');
                items.forEach((el, i) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, i * 400); // 順番に400ms間隔で表示
                });

                obs.unobserve(entry.target); // 一度だけ
            }
        });
    }, {
        threshold: 0.3
    });

    // 最初の要素だけ監視（グループ単位）
    document.querySelectorAll('.skills-wrapper').forEach(wrapper => {
        const first = wrapper.querySelector('.fade-skill');
        if (first) observer.observe(first);
    });
});

// works 動き
document.addEventListener('DOMContentLoaded', () => {
    const fadeItems = document.querySelectorAll('.fade-work, .works__column');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                setTimeout(() => {
                    el.classList.add('visible');
                }, i * 150);

                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.2
    });

    fadeItems.forEach(item => observer.observe(item));
});

// top,私について動き
document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector('.about-photo-wrapper');
    if (!target) return;

    const img = target.querySelector('.fade-photo');
    const names = target.querySelectorAll('.fade-name');
    const copy = document.querySelector('.fade-copy');
    const link = document.querySelector('.fade-link');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                img.classList.add('visible');

                // 名前を早めに順番表示
                names.forEach((el, i) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, 200 + i * 150);
                });

                // コピーとリンクも早めに表示
                setTimeout(() => {
                    copy.classList.add('visible');
                }, 600);

                setTimeout(() => {
                    link.classList.add('visible');
                }, 900);

                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(target);
});

// コンタクトフォーム
const form = document.getElementById('contactForm');
const confirmArea = document.getElementById('confirmArea');
const thankYouMessage = document.getElementById('thankYouMessage');

const nameInput = form.name;
const emailInput = form.email;
const messageInput = form.message;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // 入力内容を確認画面に反映
    document.getElementById('confirmName').textContent = nameInput.value;
    document.getElementById('confirmEmail').textContent = emailInput.value;
    document.getElementById('confirmMessage').textContent = messageInput.value;

    form.classList.add('hidden');
    confirmArea.classList.remove('hidden');
});

document.getElementById('backButton').addEventListener('click', () => {
    confirmArea.classList.add('hidden');
    form.classList.remove('hidden');
});

document.getElementById('submitButton').addEventListener('click', async () => {
    const formData = new FormData(form);

    // Formspree送信先を指定
    const response = await fetch('https://formspree.io/f/xxxxxx', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    confirmArea.classList.add('hidden');
    thankYouMessage.classList.remove('hidden');
});

