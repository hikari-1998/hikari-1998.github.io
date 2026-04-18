import re

with open('work/graphic6/index.html', 'r') as f:
    content = f.read()

# Replace titles and meta
content = content.replace('証券会社ランキング', 'ちくカードパーク')
content = content.replace('コンペ：バナー制作', 'ロゴ制作')
content = content.replace('コンペ', '実務')
content = content.replace('バナー', 'ロゴ')
content = content.replace('graphic1.jpg', 'graphic6_logo_yoko.jpg')
content = content.replace('graphic1', 'graphic6')
# remove modal-graphic1 if needed, we'll replace with modal-graphic6 later but we replaced the ID.

# Set the URL
content = re.sub(r'<a[^>]+href="#" target="_blank">非公開</a>', r'<a class="fade-work" href="https://chikucardpark.com/" target="_blank">https://chikucardpark.com/</a>', content)
content = re.sub(r'非公開', r'https://chikucardpark.com/', content) # fallback

# Update summary text
content = re.sub(r'<h2>制作概要</h2>[\s\S]*?</div>', r'<h2>制作概要</h2>\n                <p>\n                    「ちくカードパーク」様のサイトロゴデザイン制作。<br>\n                    カードゲームをイメージさせる親しみやすいデザインを意識しました。\n                </p>\n            </div>', content)

# Remove the works__list data or modify
content = re.sub(r'<dl class="works__list">[\s\S]*?</dl>', r'''<dl class="works__list">
                <div class="works__column fade-work">
                    <dt class="works__topic">デザイン</dt>
                    <dd class="works__txt fade-work">
                        <ul>
                            <li><strong>ビジュアルコンセプト</strong>：親しみやすさとカードの手軽さを表現したデザイン。</li>
                            <li><strong>カラー</strong>：サイトのトーン＆マナーに合わせた配色。</li>
                        </ul>
                    </dd>
                </div>
                <div class="works__column fade-work">
                    <dt class="works__topic fade-work">担当範囲・ツール</dt>
                    <dd class="works__txt fade-work">
                        <ul>
                            <li><strong>担当：デザインのみ（ロゴ制作）</strong></li>
                            <li>使用ツール：Illustrator / Figma</li>
                        </ul>
                    </dd>
                </div>
            </dl>''', content)

with open('work/graphic6/index.html', 'w') as f:
    f.write(content)
