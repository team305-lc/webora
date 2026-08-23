document.addEventListener("DOMContentLoaded", () => {
  const ALBUM = {
    travel: {
      label: "旅行",
      sections: [
        {
          label: "北海道",
          items: [
            {
              src: "../img/album/travel/hokkaido/1.jpg",
              alt: "北海道旅行の一枚",
              caption:
                "北海道・富良野のラベンダー畑に行ってきました。見渡す限りの紫色と甘い香りに包まれて、時間を忘れて写真を撮りまくっちゃいました。丘の上から見る景色が本当に絶景で、また絶対に<span class=\"nb\">来たい場所になりました。</span>",
            },
            {
              src: "../img/album/travel/hokkaido/2.jpg",
              alt: "北海道旅行の一枚",
              caption:
                "羊ヶ丘展望台で「Boys, be ambitious」のクラーク像を発見。青空に向かって腕を伸ばすポーズを真似して、友だちと一緒に大きくガッツポーズ。広大な牧草地の景色も気持ちよかったです。",
            },
            {
              src: "../img/album/travel/hokkaido/3.jpg",
              alt: "北海道旅行の一枚",
              caption:
                "札幌の街中にある時計台にも立ち寄りました。ビルに囲まれた中にひっそり佇む姿がなんだか可愛くて、友だちと並んで記念撮影。北海道開拓の歴史を感じるスポットでした。",
            },
          ],
        },
        {
          label: "石川",
          items: [
            {
              src: "../img/album/travel/ishikawa/1.jpg",
              alt: "石川旅行の一枚",
              caption:
                "近江町市場で新鮮な魚介類にテンションが上がりました。ずわいがにや甘えび、のどぐろがずらりと並ぶ光景は圧巻で、金沢に来たら絶対に外せないスポットだと実感しました。",
            },
            {
              src: "../img/album/travel/ishikawa/2.jpg",
              alt: "石川旅行の一枚",
              caption:
                "石川旅行の夜は、みんなでお揃いの浴衣に着替えて温泉宿へ。地元の名酒「加賀鳶」で乾杯しながら味わう海鮮づくしに大満足で、旅の思い出がまたひとつ増えました。",
            },
            {
              src: "../img/album/travel/ishikawa/3.jpg",
              alt: "石川旅行の一枚",
              caption:
                "金沢城の石垣と白壁の<span class=\"nb\">コントラスト</span>が美しくて、しばらく見とれてしまいました。夕方の柔らかい光に照らされたお城は、昼間とはまた違った表情を見せてくれました。",
            },
            {
              src: "../img/album/travel/ishikawa/4.jpg",
              alt: "石川旅行の一枚",
              caption:
                "石川・金沢城を友だちと観光しました。立派な白壁と石垣に圧倒されっぱなしで、歴史を感じるお散歩コースでした。晴天にお城が映えて、写真映え<span class=\"nb\">スポットとしても</span><span class=\"nb\">大満足でした。</span>",
            },
            {
              src: "../img/album/travel/ishikawa/5.jpg",
              alt: "石川旅行の一枚",
              caption:
                "日本三名園のひとつ、兼六園にも足を延ばしました。池に映る緑と、手入れの行き届いた庭園の美しさにうっとり。友だちとのセルフィーも良い記念になりました。",
            },
            {
              src: "../img/album/travel/ishikawa/6.jpg",
              alt: "石川旅行の一枚",
              caption:
                "兼六園のシンボル、徽軫灯籠（ことじとうろう）を独り占め。静かな水面に緑が映り込んで、時間がゆっくり流れているような感覚になりました。何度でも<span class=\"nb\">見に来たい景色です。</span>",
            },
          ],
        },
        {
          label: "滋賀",
          items: [
            {
              src: "../img/album/travel/shiga/1.jpg",
              alt: "滋賀旅行の一枚",
              caption:
                "滋賀・琵琶湖のほとりまでドライブ。まるで海みたいに広い湖に、友だちと思わずはしゃいでしまいました。山々に囲まれた景色がとにかく開放的でした。",
            },
            {
              src: "../img/album/travel/shiga/2.jpg",
              alt: "滋賀旅行の一枚",
              caption:
                "透き通った琵琶湖の水と山並みの<span class=\"nb\">コントラスト</span>に見とれてしまいました。波の音を聞きながらのんびり過ごせて、リフレッシュできた旅でした。",
            },
            {
              src: "../img/album/travel/shiga/3.jpg",
              alt: "滋賀旅行の一枚",
              caption:
                "琵琶湖畔で友だちと両手を広げて記念撮影。空も湖も真っ青で、思いっきり深呼吸したくなるような開放感でした。この一枚は3人のお気に入りです。",
            },
          ],
        },
        {
          label: "三重",
          items: [
            {
              src: "../img/album/travel/mie/1.jpg",
              alt: "伊勢神宮・五十鈴川の一枚",
              caption:
                "伊勢神宮の五十鈴川でひと休み。参拝前に手を清める御手洗場としても知られる場所で、透明度抜群の清らかな流れに思わずしゃがみ込んで水に触れてみました。<span class=\"nb\">日頃の疲れが</span>すっと<span class=\"nb\">抜けていくようでした。</span>",
            },
            {
              src: "../img/album/travel/mie/2.jpg",
              alt: "伊勢神宮参拝の一枚",
              caption:
                "五十鈴川で身を清めたあとは、友だちと一緒に大きな鳥居をくぐって参道の奥へ。凛とした空気の中で手を合わせる瞬間は<span class=\"nb\">身が引き締まる思いでした。</span>今年一年の感謝と、これからのことをそっと祈りました。",
            },
            {
              src: "../img/album/travel/mie/3.jpg",
              alt: "おはらい町の一枚",
              caption:
                "参拝のあとは、おはらい町をぶらぶら食べ歩き。名物の串グルメを頬張りながら、昔ながらの街並みを友だちとのんびり散策しました。伊勢うどんの<span class=\"nb\">のぼりを見つけると</span>、つい足が<span class=\"nb\">止まってしまいます。</span>",
            },
          ],
        },
      ],
    },

    friend: {
      label: "友達",
      sections: [
        {
          label: null,
          items: [
            {
              src: "../img/album/friend/1.jpg",
              alt: "友だちとの一枚",
              caption:
                "仕事終わりに友だちと近所の居酒屋に集合！枝豆とだし巻き玉子をつまみながら、最近の恋バナから将来の話まで気づけば3時間ノンストップ。乾杯の瞬間が一番楽しい、いつものメンバーでの女子会でした。",
            },
            {
              src: "../img/album/friend/2.jpg",
              alt: "友だちとの一枚",
              caption:
                "4人揃っての飲み会は特別感が違います！全員分のグラスで乾杯した瞬間が一番テンション上がる瞬間。唐揚げも枝豆もあっという間になくなって、やっぱりこの4人で集まると賑やかで楽しいです。",
            },
            {
              src: "../img/album/friend/3.jpg",
              alt: "友だちとの一枚",
              caption:
                "友だちとパスタ屋さんでランチ会。写真映えするピザとパスタを注文して、お互いの一皿をシェアしながらワイワイ。次の旅行の計画で盛り上がって、気づけばお店で一番長居している組でした。",
            },
            {
              src: "../img/album/friend/4.jpg",
              alt: "友だちとの一枚",
              caption:
                "日本酒好きの友だちと、日本酒メニューが豊富なお店を新規開拓。飲み比べしながら「これ好みかも」「私はこっちが好き」なんて言い合って、気づけばグラスが何杯も並んでいました。",
            },
            {
              src: "../img/album/friend/5.jpg",
              alt: "友だちとの一枚",
              caption:
                "提灯が並ぶ夜の飲み屋街で、友だちと軽く一杯。仕事の愚痴から恋バナまで話題は尽きなくて、気づけば終電ギリギリまで盛り上がっていました。",
            },
            {
              src: "../img/album/friend/6.jpg",
              alt: "友だちとの一枚",
              caption:
                "いつもの居酒屋での一枚。ハイボール片手に近況報告会、なんでもない話で笑い合える友だちの存在がやっぱり<span class=\"nb\">一番の癒しです。</span>",
            },
            {
              src: "../img/album/friend/7.jpg",
              alt: "友だちとの一枚",
              caption:
                "ファミレスでハンバーグとパスタを分け合いながらのランチ会。何を頼むか迷っている時間も含めて楽しくて、気づけばまた<span class=\"nb\">長居してしまいました。</span>",
            },
            {
              src: "../img/album/friend/8.jpg",
              alt: "友だちとの一枚",
              caption:
                "夕暮れ時のカフェで友だちとまったり。モンブランとショートケーキ、2種類のケーキを分け合って、贅沢な時間を過ごしました。窓の外が茜色に染まっていくのを眺めながらのおしゃべりは格別です。",
            },
          ],
        },
      ],
    },

    food: {
      label: "グルメ",
      sections: [
        {
          label: "カフェ",
          items: [
            {
              src: "../img/album/food/cafe/1.jpg",
              alt: "カフェの一枚",
              caption:
                "落ち着いたカフェでひと休み。<span class=\"nb\">アイスティー</span>の渋みと香りがすっきりしていて、木の温もりのある店内の雰囲気と合わさって、心までほぐれるひとときでした。",
            },
            {
              src: "../img/album/food/cafe/2.jpg",
              alt: "カフェの一枚",
              caption:
                "お気に入りのカフェがオープンする時間に合わせて訪問。香り高い茶葉を使ったアイスティーはすっきりとした後味で、目が覚めるような美味しさでした。お花が飾られた店内も可愛くて、また来たくなるお店です。",
            },
            {
              src: "../img/album/food/cafe/3.jpg",
              alt: "カフェの一枚",
              caption:
                "クレープリーでいちごたっぷりのパフェをオーダー。生クリームの甘さといちごの酸味のバランスが絶妙で、見た目のかわいさに写真を撮る手が止まりませんでした。",
            },
            {
              src: "../img/album/food/cafe/4.jpg",
              alt: "カフェの一枚",
              caption:
                "暑い日にぴったりの自家製レモネード。爽やかな酸味とミントの香りで一気に<span class=\"nb\">リフレッシュ</span>できました。氷がたっぷりで最後までひんやり楽しめたのも<span class=\"nb\">嬉しいポイントです。</span>",
            },
            {
              src: "../img/album/food/cafe/5.jpg",
              alt: "カフェの一枚",
              caption:
                "見た目も可愛いモンブラン風のムースケーキと、爽やかなアイスレモンティーでひと休み。甘さと酸味のバランスが絶妙で、写真を撮る手が止まりませんでした。",
            },
            {
              src: "../img/album/food/cafe/6.jpg",
              alt: "カフェの一枚",
              caption:
                "素敵な外観に惹かれて入ってみたカフェ。本日のおすすめは特製スパイスカレーとのことで、次回は絶対に食べに来ようと心に決めました。",
            },
          ],
        },
        {
          label: "ファーストフード",
          items: [
            {
              src: "../img/album/food/firstfood/1.jpg",
              alt: "ファーストフード",
              caption:
                "気になっていた<span class=\"nb\">モスバーガー</span>の新メニューに初挑戦。ジューシーなパティとレタスのシャキシャキ感が絶妙で、ポテトとコーヒーも合わせて大満足の一食でした。",
            },
          ],
        },
        {
          label: "おうちごはん",
          items: [
            {
              src: "../img/album/food/house/1.jpg",
              alt: "おうちごはんの一枚",
              caption:
                "バターがじゅわっと染み込む焼きたて<span class=\"nb\">トースト</span>と、バナナ入り<span class=\"nb\">ヨーグルト</span>、<span class=\"nb\">アイスコーヒー</span>のモーニングセット。シンプルだけど、この組み合わせが<span class=\"nb\">一番好きな朝ごはんです。</span>",
            },
            {
              src: "../img/album/food/house/2.jpg",
              alt: "おうちごはんの一枚",
              caption:
                "今日食べる用に気合を入れて作ったお弁当。唐揚げと卵焼き、ポテトサラダの鉄板メンバーに、梅干しごはんでさっぱりと。自分で作ったお弁当を開ける瞬間はいつもちょっと嬉しくなります。",
            },
            {
              src: "../img/album/food/house/3.jpg",
              alt: "おうちごはんの一枚",
              caption:
                "体調がいまいちな日は、卵と長ねぎたっぷりの雑炊でほっとひと息。優しい出汁の味が染みわたって、食べ終わる頃には身体がぽかぽかになりました。",
            },
            {
              src: "../img/album/food/house/4.jpg",
              alt: "おうちごはんの一枚",
              caption:
                "お気に入りのカップでいただく淹れたて<span class=\"nb\">コーヒー</span>と、トースト＆スクランブルエッグの朝ごはん。カーテン越しの光が気持ちよくて、慌ただしい日でも朝だけはゆっくり過ごすようにしています。",
            },
            {
              src: "../img/album/food/house/5.jpg",
              alt: "おうちごはんの一枚",
              caption:
                "夏の朝ごはんは冷やしておいたスイカと<span class=\"nb\">ヨーグルト</span>で決まり。甘くてみずみずしいスイカと、ブラックコーヒーの苦みの組み合わせがちょうど良くて、爽やかな一日の<span class=\"nb\">スタートになりました。</span>",
            },
            {
              src: "../img/album/food/house/6.jpg",
              alt: "おうちごはんの一枚",
              caption:
                "今日のお弁当はふりかけごはんに卵焼き、ウインナー、豚肉の炒め物、ポテトサラダを詰め込みました。彩りも良くできて、開けた瞬間にちょっと自分を褒めたくなる出来栄えです。",
            },
          ],
        },
        {
          label: "レストラン",
          items: [
            {
              src: "../img/album/food/restaurant/1.jpg",
              alt: "レストランの一枚",
              caption:
                "贅沢に海鮮丼を注文。ウニとイクラがどっさり乗った豪華な一杯に、食べる前から<span class=\"nb\">テンション</span>が上がりました。どれから食べようか迷うくらい、ネタが<span class=\"nb\">どれも新鮮でした。</span>",
            },
            {
              src: "../img/album/food/restaurant/2.jpg",
              alt: "レストランの一枚",
              caption:
                "焼き鳥屋さんでジョッキ生ビールとねぎま串を堪能。炭火の香ばしい匂いと、キンキンに冷えたビールの組み合わせは反則級に美味しいです。",
            },
            {
              src: "../img/album/food/restaurant/3.jpg",
              alt: "レストランの一枚",
              caption:
                "市場直送のネタが並ぶお寿司屋さんで<span class=\"nb\">ランチ。</span>大トロから金箔がのったお寿司まで、一貫ごとに違う美味しさで、あっという間に完食してしまいました。",
            },
          ],
        },
        {
          label: "屋台",
          items: [
            {
              src: "../img/album/food/stand/1.jpg",
              alt: "屋台グルメの一枚",
              caption:
                "お祭りの屋台でかき氷をゲット。いちごとメロンの2色がけで、見た目もテンション上がる可愛さでした。暑い中歩き回った後の一杯は、格別の美味しさでした。",
            },
            {
              src: "../img/album/food/stand/2.jpg",
              alt: "屋台グルメの一枚",
              caption:
                "今度は抹茶に白玉と粒あんをのせたかき氷に挑戦。ほろ苦い抹茶シロップと優しい甘さのあんこの組み合わせがたまらなくて、あっという間に完食してしまいました。",
            },
          ],
        },
      ],
    },

    cosplay: {
      label: "コスプレ",
      sections: [
        {
          label: "メイド",
          items: [
            {
              src: "../img/album/cosplay/maid/1.jpg",
              alt: "メイドコスプレ",
              caption:
                "お帰りなさいませ、ご主人様♡ 今日もお仕事お疲れさまでした。紅茶とお菓子を用意していますので、ゆっくり休んでいってくださいね。",
            },
            {
              src: "../img/album/cosplay/maid/2.jpg",
              alt: "メイドコスプレ",
              caption:
                "あら、そんなに見つめられると照れちゃいます…♡ ご主人様のために目一杯おもてなしさせていただきますね。今日は何をして遊びましょうか？",
            },
            {
              src: "../img/album/cosplay/maid/3.jpg",
              alt: "メイドコスプレ",
              caption:
                "ふふっ、気になりますか？ このリボン、ご主人様のために選んだんですよ。今日はずっとおそばにいますから、安心してくださいね。",
            },
          ],
        },
        {
          label: "七夕",
          items: [
            {
              src: "../img/album/cosplay/miko/1.jpg",
              alt: "七夕衣装コスプレ",
              caption:
                "星空の下、短冊にそっと願いを込めました。「webora」で最初のお仕事を任せてもらえますように…。もしよかったら、あなたの夢もひとつ、星に<span class=\"nb\">届けてみませんか？</span>",
            },
          ],
        },
        {
          label: "看護師",
          items: [
            {
              src: "../img/album/cosplay/nurse/1.jpg",
              alt: "看護師コスプレ",
              caption:
                "具合はいかがですか？ちょっとチクッとしますけど、我慢してくださいね。注射が終わったら、頑張った<span class=\"nb\">ご褒美に飴をあげます♡</span>",
            },
            {
              src: "../img/album/cosplay/nurse/2.jpg",
              alt: "看護師コスプレ",
              caption:
                "深呼吸してくださいね、胸の音を聞かせてもらいます。緊張しなくて大丈夫ですよ、私がちゃんとそばに<span class=\"nb\">ついていますから。</span>",
            },
            {
              src: "../img/album/cosplay/nurse/3.jpg",
              alt: "看護師コスプレ",
              caption:
                "はい、お布団しっかりかけますね。今夜はゆっくり眠れるように、私がそばで<span class=\"nb\">見ていますから。</span>何かあったら、いつでも呼んでくださいね。",
            },
          ],
        },
        {
          label: "CA",
          items: [
            {
              src: "../img/album/cosplay/ca/1.jpg",
              alt: "CAコスプレ",
              caption:
                "本日はご搭乗いただき誠にありがとうございます。ただいまお飲み物をお持ちいたしますので、フライトの間どうぞごゆっくりお寛ぎくださいませ。",
            },
            {
              src: "../img/album/cosplay/ca/2.jpg",
              alt: "CAコスプレ",
              caption:
                "揺れることもございますので、お座席にいる間はシートベルトをお締めください。何かございましたら、いつでもお呼びくださいね。",
            },
            {
              src: "../img/album/cosplay/ca/3.jpg",
              alt: "CAコスプレ",
              caption:
                "お飲み物はいかがですか？コーヒー、紅茶、お茶をご用意しております。<span class=\"nb\">ごゆっくり</span>フライトをお楽しみいただけるよう、私が責任を持って<span class=\"nb\">お世話させていただきますね。</span>",
            },
          ],
        },
        {
          label: "ウェディング",
          items: [
            {
              src: "../img/album/cosplay/weding/1.jpg",
              alt: "ウェディングコスプレ",
              caption:
                "今日という日をずっと夢見ていました。真っ白なドレスを纏った私を、しっかり見ていてくださいね。これから先の人生、あなたとずっと<span class=\"nb\">歩んでいきたいです。</span>",
            },
            {
              src: "../img/album/cosplay/weding/2.jpg",
              alt: "ウェディングコスプレ",
              caption:
                "指輪を受け取ってくれて、ありがとう。少し手が震えちゃいましたが、これで私たちは夫婦ですね。これからもずっと、<span class=\"nb\">よろしくお願いします。</span>",
            },
            {
              src: "../img/album/cosplay/weding/3.jpg",
              alt: "ウェディングコスプレ",
              caption:
                "誓いのキス、緊張しました…♡ でもあなたと交わす初めてのキスは、これまでで一番幸せな瞬間でした。この気持ち、<span class=\"nb\">一生忘れません。</span>",
            },
          ],
        },
        {
          label: "チア",
          items: [
            {
              src: "../img/album/cosplay/cheer/1.jpg",
              alt: "チアガールコスプレ",
              caption:
                "見て見て、精一杯応援してるよ！ポンポンを振る手にも力が入っちゃいます。今日はあなたの活躍、しっかり<span class=\"nb\">見届けるからね。</span>頑張れー！",
            },
            {
              src: "../img/album/cosplay/cheer/2.jpg",
              alt: "チアガールコスプレ",
              caption:
                "ひざをついて気合を入れ直し中。緊張してる？大丈夫、私が全力で応援してるから、思いっきり<span class=\"nb\">実力を出し切ってきてね！</span>",
            },
            {
              src: "../img/album/cosplay/cheer/3.jpg",
              alt: "チアガールコスプレ",
              caption:
                "声が枯れるまで応援するのが私の役目。あなたが勝った瞬間は、真っ先に駆け寄ってお祝いさせてください。最後まで<span class=\"nb\">一緒に戦うよ！</span>",
            },
          ],
        },
        {
          label: "アニメ",
          items: [
            {
              src: "../img/album/cosplay/anime/spy_family/1.jpg",
              alt: "アニメキャラクターコスプレ",
              caption:
                "その視線、意外と鋭いですね。でも安心してください、私は味方ですから。今日はゆっくりしていってください…油断は禁物ですけど。",
            },
            {
              src: "../img/album/cosplay/anime/spy_family/2.jpg",
              alt: "アニメキャラクターコスプレ",
              caption:
                "隙あり、なんて言わせません。伊達に得物を握っているわけじゃないので。さ、次はあなたの番ですよ？",
            },
          ],
        },
      ],
    },

    view: {
      label: "景色",
      sections: [
        {
          label: null,
          items: [
            {
              src: "../img/album/view/1.jpg",
              alt: "景色の一枚",
              caption:
                "山頂で迎えた御来光。雲海の向こうから昇る太陽があまりにも綺麗で、早起きした疲れも一瞬で吹き飛びました。人生でも指折りの絶景でした。",
            },
            {
              src: "../img/album/view/2.jpg",
              alt: "景色の一枚",
              caption:
                "どこまでも透き通った海の色に、しばらく言葉を忘れて見入ってしまいました。波の音だけが聞こえる時間は、日々の忙しさをすっかり忘れさせてくれます。",
            },
            {
              src: "../img/album/view/3.jpg",
              alt: "景色の一枚",
              caption:
                "川沿いから眺めた花火大会。水面に映る色とりどりの光がとても幻想的で、夏の夜を締めくくるのにぴったりの景色でした。",
            },
            {
              src: "../img/album/view/4.jpg",
              alt: "景色の一枚",
              caption:
                "どこまでも続くひまわり畑を、友だちと手を繋いで散策。夏らしい青空と黄色いひまわりのコントラストが眩しくて、思わず何枚も写真を撮ってしまいました。",
            },
            {
              src: "../img/album/view/5.jpg",
              alt: "景色の一枚",
              caption:
                "仕事帰りにふと見上げた空が、オレンジ色に染まっていました。ビル街の合間に沈んでいく夕日を眺めていると、忙しかった一日の疲れもちょっと癒される気がします。",
            },
            {
              src: "../img/album/view/6.jpg",
              alt: "景色の一枚",
              caption:
                "夏らしい入道雲と刷毛で描いたような筋雲が広がる空を見上げて、しばらく足を止めてしまいました。木々の緑と空の青のコントラストが気持ちよかったです。",
            },
            {
              src: "../img/album/view/7.jpg",
              alt: "景色の一枚",
              caption:
                "軒先に吊るした桜柄の風鈴が、風に揺れてチリンと涼しい音を響かせています。夏の暑さの中にも、こういう小さな癒しがあるとほっとします。",
            },
            {
              src: "../img/album/view/8.jpg",
              alt: "景色の一枚",
              caption:
                "木々の隙間から見上げた花火。葉っぱのシルエットと打ち上げ花火のコントラストが綺麗で、いつもと違う角度から見る花火も新鮮でした。",
            },
          ],
        },
      ],
    },
  };

  const CATEGORY_ORDER = ["travel", "friend", "food", "cosplay", "view"];

  const sectionsContainer = document.getElementById("albumSections");
  const emptyState = document.getElementById("albumEmpty");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!sectionsContainer) return;

  const createThumb = (item, categoryKey, categoryLabel, sectionLabel) => {
    const figure = document.createElement("figure");
    figure.className = "album-item";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "album-thumb";
    btn.dataset.full = item.src;
    btn.dataset.alt = item.alt;
    btn.dataset.caption = item.caption;
    btn.dataset.tag = sectionLabel ? `${categoryLabel}・${sectionLabel}` : categoryLabel;

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    img.loading = "lazy";

    btn.appendChild(img);
    figure.appendChild(btn);
    return figure;
  };

  const render = (filter) => {
    sectionsContainer.innerHTML = "";

    if (filter === "all") {
      const grid = document.createElement("div");
      grid.className = "album-grid";
      CATEGORY_ORDER.forEach((key) => {
        const category = ALBUM[key];
        category.sections.forEach((section) => {
          section.items.forEach((item) => {
            grid.appendChild(createThumb(item, key, category.label, section.label));
          });
        });
      });
      sectionsContainer.appendChild(grid);
      emptyState.classList.remove("show");
      return;
    }

    const category = ALBUM[filter];
    if (!category) {
      emptyState.classList.add("show");
      return;
    }

    if (filter === "cosplay") {
      const notice = document.createElement("p");
      notice.className = "album-notice";
      notice.textContent = "※コスプレ写真はすべてAIで生成した画像です。";
      sectionsContainer.appendChild(notice);
    }

    let itemCount = 0;
    category.sections.forEach((section) => {
      if (!section.items.length) return;
      itemCount += section.items.length;

      const block = document.createElement("div");
      block.className = "album-section";

      if (section.label) {
        const heading = document.createElement("h3");
        heading.className = "album-section-title";
        heading.textContent = section.label;
        block.appendChild(heading);
      }

      const grid = document.createElement("div");
      grid.className = "album-grid";
      section.items.forEach((item) => {
        grid.appendChild(createThumb(item, filter, category.label, section.label));
      });
      block.appendChild(grid);

      sectionsContainer.appendChild(block);
    });

    emptyState.classList.toggle("show", itemCount === 0);
  };

  const modal = document.getElementById("albumModal");
  const modalImage = document.getElementById("albumModalImage");
  const modalCaption = document.getElementById("albumModalCaption");
  const modalTag = document.getElementById("albumModalTag");
  const modalImageWrap = document.getElementById("albumModalImageWrap");
  const modalPrev = modal ? modal.querySelector(".album-modal-prev") : null;
  const modalNext = modal ? modal.querySelector(".album-modal-next") : null;

  let currentList = [];
  let currentIndex = -1;

  const showThumb = (thumb) => {
    modalImage.src = thumb.dataset.full;
    modalImage.alt = thumb.dataset.alt || "";
    modalTag.textContent = thumb.dataset.tag || "";
    modalCaption.innerHTML = thumb.dataset.caption || "";
  };

  const openModal = (thumb) => {
    const grid = thumb.closest(".album-grid");
    currentList = grid ? Array.from(grid.querySelectorAll(".album-thumb")) : [thumb];
    currentIndex = currentList.indexOf(thumb);

    showThumb(thumb);
    modal.classList.toggle("has-nav", currentList.length > 1);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    modalImage.src = "";
    currentList = [];
    currentIndex = -1;
  };

  const goTo = (direction) => {
    if (currentList.length <= 1) return;
    currentIndex = (currentIndex + direction + currentList.length) % currentList.length;
    showThumb(currentList[currentIndex]);
  };

  sectionsContainer.addEventListener("click", (e) => {
    const thumb = e.target.closest(".album-thumb");
    if (thumb) openModal(thumb);
  });

  if (modal) {
    modal.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });

    if (modalPrev) modalPrev.addEventListener("click", () => goTo(-1));
    if (modalNext) modalNext.addEventListener("click", () => goTo(1));

    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("open")) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goTo(-1);
      if (e.key === "ArrowRight") goTo(1);
    });

    if (modalImageWrap) {
      let touchStartX = null;

      modalImageWrap.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.touches[0].clientX;
        },
        { passive: true }
      );

      modalImageWrap.addEventListener(
        "touchend",
        (e) => {
          if (touchStartX === null) return;
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          touchStartX = null;
          const SWIPE_THRESHOLD = 40;
          if (deltaX > SWIPE_THRESHOLD) goTo(-1);
          else if (deltaX < -SWIPE_THRESHOLD) goTo(1);
        },
        { passive: true }
      );
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.filter);
    });
  });

  render("all");
});
