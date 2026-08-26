"use client";

import { useEffect, useMemo, useState } from "react";

type Person = {
  name: string; years: string; birth: number; place: string; role: string; quote: string;
  image: string; intro: string; memory: string; milestones: [string, string][];
};

const people: Person[] = [
  { name:"周桂英", years:"1938 — 2021", birth:1938, place:"江苏 · 南京", role:"纺织女工", quote:"她把一辈子的耐心，都缝进了日子里。", image:"/images/portraits/elderly-woman-profile.jpg", intro:"周桂英在南京的一家纺织厂工作了三十六年。她不善言辞，却把四个孩子和一个热闹的家照料得井井有条。退休后，她最喜欢坐在窗边替孙辈缝补衣裳。", memory:"她做的青团总比别人家的软。清明前一周，整条巷子都能闻到她家蒸笼里的艾草香。", milestones:[["1938","出生于江苏高淳"],["1957","进入南京第二棉纺厂"],["1962","与王守义成家"],["1993","退休，开始照顾孙辈"],["2021","在家人陪伴中安静离世"]] },
  { name:"陈德山", years:"1946 — 2018", birth:1946, place:"广东 · 江门", role:"乡村教师", quote:"三十八年，他教会两代孩子写下自己的名字。", image:"/images/portraits/chen-deshan.jpg", intro:"陈德山十八岁站上村小的讲台。最初学校只有两间瓦房，他既教语文，也修课桌、敲上下课钟。后来许多学生离开村子，每逢春节仍会回来喊他一声陈老师。", memory:"他总在黑板右下角留一句话：字要写正，人也要站正。", milestones:[["1946","出生于广东台山"],["1964","成为村里第一位民办教师"],["1978","组织修建新校舍"],["2002","从教三十八年后退休"],["2018","学生们送他走完最后一程"]] },
  { name:"林秀兰", years:"1951 — 至今", birth:1951, place:"福建 · 泉州", role:"裁缝", quote:"我的历史不宏大，但每一针都有来处。", image:"/images/portraits/smiling-elderly-woman.jpg", intro:"林秀兰十六岁跟着姨母学裁衣。她记得街坊每个人的尺寸，也记得哪件衣服是为婚礼、远行或孩子满月做的。现在她正在亲口讲述自己的故事。", memory:"踩缝纫机的时候，我总爱哼南音。孩子们说，听见机器声就知道我在家。", milestones:[["1951","出生于泉州西街"],["1967","开始学习裁缝"],["1984","开了自己的小裁缝铺"],["2016","把旧缝纫机送给外孙女"],["2026","开始记录自己的生命档案"]] },
  { name:"赵有福", years:"1935 — 2010", birth:1935, place:"河北 · 保定", role:"木匠", quote:"他做过几百扇门，也守住了自己的家。", image:"/images/portraits/vintage-family-woman.jpg", intro:"赵有福从父亲手里接过一套木工工具，走村串户做了四十多年木匠。谁家的柜子、谁家的嫁妆，他都能说出来。", memory:"父亲刨木头时从不戴手套。他说手要摸得到木纹，才知道该往哪个方向用力。", milestones:[["1935","出生于保定清苑"],["1952","跟随父亲学习木工"],["1960","为自己家做了第一张饭桌"],["1998","把工具交给小儿子"],["2010","安葬于故乡"]] },
  { name:"吴秋月", years:"1942 — 2023", birth:1942, place:"四川 · 乐山", role:"乡村医生", quote:"她背着药箱，走过了山里每一条小路。", image:"/images/portraits/vintage-family-child.jpg", intro:"吴秋月是附近几个村最早的赤脚医生。下雨天，她用塑料布包好药箱；深夜有人敲门，她总会立刻披衣起身。", memory:"奶奶的药箱有一股淡淡的酒精味。小时候我以为，只要它在，所有人都会好起来。", milestones:[["1942","出生于四川乐山"],["1969","成为乡村医生"],["1981","参加县城医护培训"],["2007","最后一次出诊"],["2023","家人整理她留下的药箱"]] },
  { name:"许长河", years:"1954 — 至今", birth:1954, place:"黑龙江 · 哈尔滨", role:"铁路工人", quote:"四十年里，他记住了每一趟列车的声音。", image:"/images/archive/chen-family-1956.jpg", intro:"许长河在铁路边长大，也在铁路上工作了一辈子。从蒸汽机车到高铁，他保存了许多旧车票、徽章和工作笔记。", memory:"冬天巡线最冷的时候，眉毛都会结霜。但远远看见车灯过来，心里一下就踏实了。", milestones:[["1954","出生于哈尔滨"],["1972","进入哈尔滨铁路局"],["1988","成为线路工班长"],["2014","退休并开始整理铁路收藏"],["2026","录下第一段口述史"]] },
  { name:"何素芳", years:"1931 — 2019", birth:1931, place:"湖南 · 湘潭", role:"农民", quote:"她没离开过故乡，却见过故乡变了许多次。", image:"/images/portraits/smiling-elderly-woman.jpg", intro:"何素芳一生生活在湘潭的一个村庄。她会认天气、育秧苗，也记得村里已经消失的地名和旧路。", memory:"外婆总说，认得一块田，就要记得它旱过、涝过，也丰收过。", milestones:[["1931","出生于湘潭石鼓村"],["1948","与何清明成家"],["1976","带领家人修建砖瓦房"],["2009","第一次坐火车去长沙"],["2019","长眠于村后的山坡"]] },
  { name:"马振华", years:"1949 — 2020", birth:1949, place:"山东 · 青岛", role:"公交司机", quote:"他开过同一条线路，也送过一座城的清晨。", image:"/images/portraits/vintage-family-child.jpg", intro:"马振华开了二十九年公交车。每天第一班车五点四十分出发，他熟悉沿途每个上学的孩子和赶早市的老人。", memory:"爸爸从不按喇叭催老人。他说，车晚一分钟没什么，人摔一下就是大事。", milestones:[["1949","出生于山东即墨"],["1975","成为公交驾驶员"],["1987","驾驶第一批无人售票车"],["2004","安全行驶百万公里退休"],["2020","家人保存了他的旧工牌"]] },
  { name:"叶文清", years:"1962 — 至今", birth:1962, place:"云南 · 大理", role:"邮递员", quote:"二十七年，她把远方送进每一户人家。", image:"/images/portraits/elderly-woman-profile.jpg", intro:"叶文清年轻时骑着绿色自行车送信。山路不好走，她会把信件包进帆布袋，雨天就藏在蓑衣下面。", memory:"有些信我送了很多年，后来写信的人回了家，信就少了。能团圆，总是一件好事。", milestones:[["1962","出生于云南大理"],["1981","成为乡邮员"],["1996","换上第一辆邮政摩托车"],["2008","参与汶川赈灾邮件转运"],["2026","与女儿共同整理旧信封"]] },
];

const eras = ["全部年代", "1930年代", "1940年代", "1950年代", "1960年代"];

const expandedStories: Record<string, { title: string; text: string }[]> = {
  周桂英: [
    { title:"童年与离乡", text:"周桂英出生在高淳湖边的一个农家。家里六个孩子，她排行第二，很早便学会挑水、烧饭和照看弟妹。她只读过三年小学，却一直珍惜能认字的机会，后来厂里发下来的通知和孩子们的课本，她总要慢慢读上一遍。十九岁那年，她第一次离开村庄，坐船又换汽车来到南京。" },
    { title:"纺织厂里的三十六年", text:"1957年，她成为南京第二棉纺厂的一名挡车工。车间里机器声很大，工人说话要贴近耳边。她负责看管数台纺纱机，接断头、换纱锭、检查棉线，一站就是八个小时。她做事细，极少出次品，后来成了班组里带新人的老师傅。夜班结束时，她常与同事骑车穿过还未完全醒来的南京城。" },
    { title:"她经营的家", text:"周桂英和王守义结婚后，先后养育四个孩子。家里并不宽裕，她会把旧衣服拆开重做，把零碎布头拼成书包和被面。逢年过节，她坚持一家人坐在同一张桌上吃饭。孩子们长大离家以后，她仍保留着每个人常用的碗筷，谁回来就能立刻开饭。" },
    { title:"晚年与留下的东西", text:"退休后，她照看孙辈，也开始在阳台种葱、薄荷和凤仙花。她没有写过自传，留下来的历史藏在一本粮票册、几枚厂徽、一台旧缝纫机和家人的记忆里。2021年去世后，孩子们整理出四百多张照片，并把她做青团、哼小调和缝衣服的故事一一记录下来。" },
  ],
  陈德山: [
    { title:"在村小长大的孩子", text:"陈德山出生在广东台山一个普通农家。父亲识字不多，却坚持让他把小学读完。村里的学校只有两间瓦房，雨大时屋顶会漏水。陈德山喜欢把读过的课文讲给弟妹听，也常帮邻居写信。十七岁那年，老校长问他愿不愿意留下来教低年级，他从此与那所学校结下了一生的缘分。" },
    { title:"第一次站上讲台", text:"1964年，十八岁的陈德山成为民办教师。学校缺老师，他上午教一年级识字，下午给高年级讲算术，放学后还要修桌椅、刻蜡纸、敲钟。没有现成教具，他就用竹片做尺子，用河边的石子教加减法。最困难的时候，学生们轮流从家里带煤油，保证晚上的扫盲班能够点灯。" },
    { title:"三十八年的乡村教育", text:"陈德山最看重的不是考试名次，而是让每个孩子都能读完信、写清自己的名字。他挨家挨户劝说家长不要让孩子过早辍学，也用自己的工资替困难学生垫过书本费。1978年，他带着村民烧砖、运木料，修起三间新教室。后来从这里走出去的学生中，有医生、工人、商贩，也有人回乡成为新的老师。" },
    { title:"退休以后", text:"2002年退休后，他仍住在学校附近。每天傍晚，他会到操场转一圈，帮孩子改作文，或替年轻教师讲一讲村里的旧事。他保存着历届毕业照、点名册和学生来信。2018年他去世时，许多已经年过半百的学生从外地赶回。家人把他的教案、木尺和手摇铃保留下来，作为这份生命档案最早的一批实物。" },
  ],
  林秀兰: [
    { title:"西街上的童年", text:"林秀兰出生在泉州西街。小时候家门口商铺密集，她熟悉裁衣铺的剪刀声、南音馆的琵琶声和清晨寺院的钟声。家境有限，她读完小学便开始帮母亲做事，但一直喜欢看颜色和花样，常把包装纸上的图案描下来收藏。" },
    { title:"学会一门手艺", text:"十六岁时，她跟姨母学习裁缝。从量体、画粉线到锁扣眼，每一步都要反复练习。她做的第一件成衣是一件蓝布学生装，袖子一长一短，拆了三次才改好。几年后，她能只看一眼便估出尺寸，也渐渐有了自己的熟客。" },
    { title:"一间裁缝铺和一条街", text:"1984年，林秀兰在家门口开起小裁缝铺。她做过新娘的红衣、孩子的满月衫，也替出远门的人缝过藏钱的小口袋。街坊搬走又回来，总有人带着旧衣找她修改。对她而言，每件衣服都与一个具体的人、一段具体的生活联系在一起。" },
    { title:"亲自讲述自己的历史", text:"如今她已很少接活，但那台脚踏缝纫机仍放在窗边。她开始在女儿帮助下整理账本、布样和老照片，并用录音讲述西街几十年的变化。她说自己的一生并不宏大，但那些被认真穿过、修补过、保存过的衣服，就是她与时代发生联系的证据。" },
  ],
  赵有福: [
    { title:"木屑里的童年", text:"赵有福在保定清苑长大，父亲是远近闻名的木匠。他从小负责给刨子磨刃、替父亲背工具箱，也在一次次敲打和测量中认识木材。十七岁正式拜父亲为师后，他先学三年基本功，直到能闭着眼摸出木纹方向，才被允许独自做一把椅子。" },
    { title:"走村串户的木匠", text:"那时很少有成品家具，谁家盖房、娶亲或添孩子，都要请木匠上门。赵有福带着锯、凿、墨斗和刨子，在不同村庄一住就是十几天。他做门窗、箱柜、饭桌，也替学校修课桌。每完成一件家具，他会在不起眼处刻下年份和一个小小的“福”字。" },
    { title:"手艺和家庭", text:"他与妻子养育三个孩子。农忙时他回家下地，农闲时外出做活，所得工钱大都交给妻子安排。1960年做成的榆木饭桌陪伴一家人五十年，桌面上的刀痕、烫痕和孩子写字留下的墨迹，都被家人视作生活的一部分。" },
    { title:"最后一只工具箱", text:"晚年机器家具逐渐普及，找他做活的人少了。他没有抱怨，只把更多时间用来教小儿子修复旧家具。1998年，他把常用工具装进亲手制作的木箱交给儿子。去世后，家人在工具箱夹层发现一张纸，记着几十户人家的姓名和他曾替他们做过的物件。" },
  ],
  吴秋月: [
    { title:"为什么学医", text:"吴秋月成长在乐山山区。小时候村里缺医少药，母亲一次重病要走十多里山路求医，这段经历让她很早就希望学会治病救人。她在生产队劳动之余跟随老中医辨认草药，后来被推荐参加县里的短期医护培训。" },
    { title:"背着药箱出诊", text:"1969年，她成为乡村医生。药箱里装着体温计、听诊器、纱布和最常用的药片。山路不通车，她靠双脚往返几个村庄；遇到雨天，就用塑料布裹住药箱。深夜敲门的人很多，她几乎从不问远近，总是先披衣出发。" },
    { title:"与村庄共同生活", text:"她不仅看病，也负责疫苗登记、产妇随访和卫生宣传。许多孩子出生时见到的第一个村外人就是她。谁家经济困难，她会先记账，秋收以后再说。她清楚自己的能力边界，遇到重症便坚持让家属送县医院，从不为了面子耽误病情。" },
    { title:"药箱成为纪念", text:"2007年，她完成最后一次正式出诊，但邻居仍习惯来家里量血压、问用药。2023年去世后，家人整理药箱，发现几十本字迹密密麻麻的出诊记录。那些姓名、日期和体温数字，让一个乡村医生半个世纪的工作变得可以被重新看见。" },
  ],
  许长河: [
    { title:"铁路边的少年", text:"许长河出生在哈尔滨一个铁路家属院。童年最熟悉的是汽笛、煤烟和冬天扳道工挥动的信号旗。他常趴在窗边辨认不同机车，也会跟着父亲沿线路捡拾掉落的螺栓。中学毕业后，他如愿进入铁路系统，从最基础的养路工作做起。" },
    { title:"风雪巡线", text:"线路工的工作大多发生在旅客看不见的地方。许长河要检查钢轨、道岔和路基，夏天防胀轨，冬天清积雪。哈尔滨最冷的时候，眉毛和围巾都会结霜，但巡查不能中断。他说，只有看见列车平稳通过，悬着的心才能放下来。" },
    { title:"从蒸汽机车到高铁", text:"四十多年里，他经历了蒸汽机车退役、内燃机车普及和电气化改造。技术变化很快，他一直坚持做笔记，把每次故障和维修方法记录下来。成为工班长后，他要求年轻工人先理解安全规程背后的原因，而不是只会背条文。" },
    { title:"收藏一条铁路的记忆", text:"2014年退休后，他开始整理旧车票、工作证、徽章和线路图。许多物件在别人眼中并不起眼，对他却对应着具体的车站、同事和年月。如今他正与女儿录制口述史，希望把铁路人的日常劳动留给后来者。" },
  ],
  何素芳: [
    { title:"一生没有离开故乡", text:"何素芳出生在湘潭石鼓村，家门前是稻田，屋后是竹山。她读书不多，却能准确说出每块田的名字、土质和水路。少女时代，她学会育秧、插田、喂猪和织布，也经历过粮食紧张的年月。" },
    { title:"土地与季节", text:"她的一年按照节气展开：惊蛰修田埂，清明浸种，芒种插秧，白露收谷。天气预报尚未普及时，她会看云、听蛙声、观察燕子飞行的高度判断雨水。村里年轻人遇到庄稼问题，常来问她。" },
    { title:"把一家人拉扯大", text:"何素芳与丈夫养育五个孩子。丈夫常年在外做工，她承担了大部分农活和家务。1976年，全家终于把土坯房改成砖瓦房，她把第一块新砖保留在灶台下面。孩子陆续进城后，她仍留守老屋，替所有人守着一个可以回来的地方。" },
    { title:"村庄变化的见证者", text:"晚年她第一次坐火车去长沙，回家后讲了很多次车窗外的景象。她见过土路变成水泥路、煤油灯换成电灯、年轻人一个个离开村庄。2019年去世时，后辈把她关于旧地名、农事和家族来历的讲述录成八段音频。" },
  ],
  马振华: [
    { title:"海边城市的青年", text:"马振华出生在即墨，年轻时到青岛工作。他最初是修理厂学徒，熟悉发动机和底盘，后来考取驾驶资格进入公交公司。第一次独立开车时，他提前一小时到场，把方向盘和每一面车窗都擦得干干净净。" },
    { title:"每天五点四十分", text:"他驾驶的线路连接工人新村、早市、医院和火车站。第一班车五点四十分发出，他四点多便起床。几十年下来，他认识许多固定乘客：提菜篮的老人、赶早班的护士、背书包的孩子。有人几天没出现，他也会惦记。" },
    { title:"安全比准点更重要", text:"马振华开车平稳，很少急刹车。他从不按喇叭催行动缓慢的老人，也常提醒年轻司机不要把准点率看得比人重要。1987年线路改成无人售票，他耐心教乘客投币、换乘，帮助许多人适应城市交通的新变化。" },
    { title:"百万公里之后", text:"2004年退休时，他累计安全行驶超过百万公里。公司送给他一只纪念方向盘，他却最珍惜那枚磨掉漆的旧工牌。2020年去世后，家人从抽屉里找到一本小册子，上面记着多年间帮助过他的乘客和同事。" },
  ],
  叶文清: [
    { title:"从一封信开始", text:"叶文清在大理山区长大。姐姐外出工作后，每月寄回一封信，她总是全家读得最认真的那一个。高中毕业时，乡邮所招人，她因为熟悉附近村寨、会骑自行车又做事细心，被选为当地少数几位女乡邮员之一。" },
    { title:"风雨中的邮路", text:"她每天把信件按路线装进绿色帆布袋，骑车走几十公里。不能骑的山路就推车或步行，雨天把信藏在蓑衣下面。地址写得不清楚时，她会沿路打听，从不轻易把信退回。对等待消息的人来说，一封信可能比什么都重要。" },
    { title:"替远方抵达", text:"她送过录取通知书、汇款单、家书和从部队寄来的平安信。有人不识字，她会在征得同意后帮忙念信，也替他们写回信。村里通电话、通公路以后，普通信件逐渐减少，但快递、报刊和养老金通知又成为新的工作。" },
    { title:"保存消失中的书信", text:"退休后，叶文清留下了一批无法投递、又经规定处理后允许保存的旧信封，以及自己多年的工作日记。她与女儿整理这些材料时，重新画出当年的邮路地图。她希望后人知道，在即时通信出现以前，人们曾怎样等待一张纸从远方抵达。" },
  ],
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [era, setEra] = useState("全部年代");
  const [selected, setSelected] = useState<Person | null>(null);
  const [showFamily, setShowFamily] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get("person");
    const person = people.find((item) => item.name === name);
    if (person) setSelected(person);
  }, []);

  const filtered = useMemo(() => {
    const key = query.trim().toLowerCase();
    return people.filter((person) => {
      const matchesQuery = !key || [person.name, person.place, person.role].some((item) => item.toLowerCase().includes(key));
      const matchesEra = era === "全部年代" || Math.floor(person.birth / 10) * 10 === Number(era.slice(0, 4));
      return matchesQuery && matchesEra;
    });
  }, [query, era]);

  const showNotice = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2400); };
  const closeLayer = () => {
    window.speechSynthesis?.cancel();
    setPlaying(false); setShowQr(false); setSelected(null); setShowFamily(false); setShowCreate(false);
  };

  const playMemory = () => {
    if (!selected || !("speechSynthesis" in window)) return showNotice("当前浏览器不支持语音播放");
    if (playing) { window.speechSynthesis.cancel(); setPlaying(false); return; }
    const voice = new SpeechSynthesisUtterance(`${selected.name}的家人回忆：${selected.memory}`);
    voice.lang = "zh-CN"; voice.rate = .86; voice.pitch = .92;
    voice.onend = () => setPlaying(false); voice.onerror = () => setPlaying(false);
    setPlaying(true); window.speechSynthesis.speak(voice);
  };

  return <main>
    <header className="nav-shell">
      <a className="brand" href="#top" aria-label="多数人的历史首页"><span className="brand-mark">史</span><span><strong>多数人的历史</strong><small>THE HISTORY OF US</small></span></a>
      <nav aria-label="主要导航"><a className="active" href="#museum">人物馆</a><button onClick={() => setShowFamily(true)}>家族脉络</button><a href="#about">关于我们</a></nav>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy"><p className="eyebrow">普通人的历史博物馆</p><h1>每一个平凡的人，<br/><em>都值得被历史记住。</em></h1><p className="lead">这里收藏的不是王侯将相，而是父亲的手艺、母亲的歌、祖辈走过的路，以及我们真正生活过的证据。</p>
        <div className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="搜索一个名字、地方或职业" aria-label="搜索人物"/><button onClick={()=>document.querySelector("#museum")?.scrollIntoView({behavior:"smooth"})}>寻找记忆</button></div>
        <div className="hero-meta"><span><b>12,684</b> 份生命档案</span><span><b>327</b> 座城市</span><span><b>4</b> 代人的记忆</span></div>
      </div>
      <div className="archive-collage" aria-label="一组家庭老照片"><div className="stamp">民间<br/>记忆</div><figure className="photo-main"><img src="/images/archive/chen-family-1956.jpg" alt="一张三代人的家庭老照片"/><figcaption>陈家全家福 · 广东台山 · 1956</figcaption></figure><div className="note-card"><span>一九五六年秋</span><p>这是全家第一次，也是唯一一次一起走进照相馆。</p></div><span className="archive-id">档案编号 M-1956-00827</span></div>
    </section>

    <section className="museum" id="museum">
      <div className="section-heading"><div><p className="eyebrow">正在被记住的人</p><h2>从一个名字，走进一段人生</h2></div><span className="result-count">共找到 {filtered.length} 份档案</span></div>
      <div className="filter-row" role="group" aria-label="按年代筛选">{eras.map(item=><button key={item} className={era===item?"selected":""} onClick={()=>setEra(item)}>{item}</button>)}</div>
      {filtered.length ? <div className="people-grid">{filtered.map((person,index)=><article className="person-card" key={person.name} onClick={()=>setSelected(person)} onKeyDown={(e)=>e.key==="Enter"&&setSelected(person)} tabIndex={0}><div className="portrait-wrap" data-initial={person.name[0]}><img src={person.image} alt={`${person.name}的肖像`}/><span className="card-index">{String(index+1).padStart(2,"0")}</span></div><div className="person-info"><div className="person-title"><h3>{person.name}</h3><span>{person.years}</span></div><p className="person-tags">{person.place}<i/>{person.role}</p><blockquote>“{person.quote}”</blockquote><span className="read-story">翻开{person.name.at(-1)==="兰"||person.name.at(-1)==="英"||person.name.at(-1)==="芳"||person.name.at(-1)==="月"||person.name.at(-1)==="清"?"她":"他"}的故事 <b>↗</b></span></div></article>)}</div>:<div className="empty-state">暂时没有找到这个名字。也许，你愿意成为第一个记录他的人。</div>}
    </section>

    <section className="family-strip" id="family"><div className="family-copy"><p className="eyebrow">鲜活的在线族谱</p><h2>一个人的故事，<br/>会连接起一个家族。</h2><p>从一张照片、一段口述开始，慢慢找回名字之间的关系。每个人是一页，连起来，就是一个家庭穿过时代的轨迹。</p><button onClick={()=>setShowFamily(true)}>打开陈氏家族脉络 <span>→</span></button></div><MiniTree/></section>

    <section className="manifesto" id="about"><span className="seal">记<br/>录</span><p>“如果我们不记录，普通人的一生，<br/>就会像从未发生过一样。”</p><h2>历史从我们这里开始记录。</h2><button onClick={()=>{setCreateStep(1);setShowCreate(true)}}>创建一份生命档案</button><div className="create-features"><span>本人记录</span><i/><span>替家人记录</span><i/><span>完整资料可导出</span></div></section>
    <footer><div className="brand footer-brand"><span className="brand-mark">史</span><span><strong>多数人的历史</strong><small>为每一个普通人保存一生的故事</small></span></div><p>本页人物与故事为产品演示内容</p><p>© 2026 多数人的历史</p></footer>

    {selected&&<div className="layer" onMouseDown={(e)=>e.target===e.currentTarget&&closeLayer()}>
      <section className="profile-panel" role="dialog" aria-modal="true" aria-label={`${selected.name}的人生档案`}>
        <button className="close" onClick={closeLayer} aria-label="关闭">×</button>
        <div className="profile-hero"><img src={selected.image} alt={`${selected.name}肖像`}/><div><p className="eyebrow">生命档案 · 已公开</p><h2>{selected.name}</h2><p>{selected.years} · {selected.place} · {selected.role}</p><blockquote>“{selected.quote}”</blockquote></div></div>
        <div className="profile-body">
          <article>
            <p className="chapter">人物小传</p><h3>一个普通人的一生</h3><p>{selected.intro}</p>
            <div className={`voice-card ${playing?"is-playing":""}`}><span className="play">{playing?"Ⅱ":"▶"}</span><div><strong>听听家人怎样说起{selected.name}</strong><small>AI朗读家人已确认的文字 · 约 35 秒</small></div><button onClick={playMemory}>{playing?"暂停":"播放"}</button></div>
            <p className="chapter">家人记忆</p><div className="memory-quote">“{selected.memory}”<small>—— 家人回忆</small></div>
            <div className="long-biography">{expandedStories[selected.name].map((section,index)=><section key={section.title}><span>0{index+1}</span><div><h3>{section.title}</h3><p>{section.text}</p></div></section>)}</div>
            <div className="archive-sources"><p className="chapter">档案来源</p><span>家人口述 4 段</span><span>历史照片 18 张</span><span>个人物件 6 件</span><span>文字资料 9 页</span></div>
          </article>
          <aside><p className="chapter">人生时间线</p>{selected.milestones.map(([year,text])=><div className="timeline-item" key={year}><b>{year}</b><span>{text}</span></div>)}<button className="outline-btn" onClick={()=>setShowQr(true)}>查看纪念二维码</button><button className="aside-link" onClick={()=>{setSelected(null);setShowFamily(true)}}>查看相关家族脉络 →</button></aside>
        </div>
      </section>
    </div>}
    {showQr&&selected&&<div className="qr-layer" role="dialog" aria-modal="true" aria-label="纪念二维码"><div className="qr-card"><button className="close" onClick={()=>setShowQr(false)}>×</button><p className="eyebrow">永久纪念入口</p><h2>{selected.name}的生命档案</h2><p>将二维码放在纪念册或墓碑铭牌上，扫码即可回到这份生命档案。</p><img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=16&data=${encodeURIComponent(`https://history-of-ordinary-people.verasimedazi0.chatgpt.site/?person=${selected.name}`)}`} alt={`${selected.name}生命档案二维码`}/><small>档案编号：M-{selected.birth}-{selected.name.charCodeAt(0)}</small><div><button className="primary-btn" onClick={()=>{navigator.clipboard?.writeText(`https://history-of-ordinary-people.verasimedazi0.chatgpt.site/?person=${selected.name}`);showNotice("档案链接已复制")}}>复制档案链接</button><button className="outline-btn" onClick={()=>window.open(`https://api.qrserver.com/v1/create-qr-code/?size=900x900&margin=32&data=${encodeURIComponent(`https://history-of-ordinary-people.verasimedazi0.chatgpt.site/?person=${selected.name}`)}`,"_blank")}>下载大图</button></div></div></div>}
    {showFamily&&<div className="layer" onMouseDown={(e)=>e.target===e.currentTarget&&closeLayer()}>
      <section className="family-panel" role="dialog" aria-modal="true" aria-label="陈氏家族脉络">
        <button className="close light" onClick={closeLayer}>×</button><p className="eyebrow">家族脉络</p><h2>陈氏家族 · 四代人的记忆</h2><p className="panel-lead">从陈德山的父母到曾孙辈，档案已整理四代、十六位家人。点击陈德山可进入他的完整生命档案。</p>
        <div className="family-origin"><b>家族原居地</b><span>广东省台山市水步镇</span><i/> <b>最早记录</b><span>陈文海出生于 1918 年</span></div>
        <div className="large-tree full-tree">
          <div className="generation"><small>第一代</small><button>陈文海<span>1918—1987 · 木匠</span></button><span className="couple">×</span><button>李月娥<span>1922—2004 · 农民</span></button></div>
          <div className="connector trunk"/>
          <div className="generation"><small>第二代</small><button onClick={()=>{setShowFamily(false);setSelected(people[1])}}>陈德山<span>1946—2018 · 乡村教师</span></button><span className="couple">×</span><button>林素贞<span>1949—至今 · 农民</span></button><button>陈德海<span>1950—2011 · 建筑工人</span></button><button>陈小云<span>1956—至今 · 会计</span></button></div>
          <div className="connector wide"/>
          <div className="generation"><small>第三代</small><button>陈建国<span>1972—至今 · 工程师</span></button><button>陈晓梅<span>1976—至今 · 护士</span></button><button>陈建平<span>1979—至今 · 个体经营</span></button><button>陈丽娟<span>1982—至今 · 教师</span></button></div>
          <div className="connector extra-wide"/>
          <div className="generation"><small>第四代</small><button>陈一帆<span>2001—至今 · 研究生</span></button><button>陈雨晴<span>2004—至今 · 学生</span></button><button>陈子墨<span>2008—至今 · 学生</span></button><button>陈思远<span>2012—至今 · 学生</span></button><button className="ghost" onClick={()=>showNotice("补充家人入口已打开")}>＋ 补充家人<span>共同完善家族记忆</span></button></div>
        </div>
        <div className="family-notes"><article><b>家族迁徙</b><p>1918—1988 年主要生活在台山；1990 年后，第三代陆续迁往广州、深圳和珠海。</p></article><article><b>共同记忆</b><p>每年清明回乡祭扫，春节保留拍摄全家福和由长辈讲述家族旧事的习惯。</p></article><article><b>资料整理</b><p>现存族谱残页、书信、毕业照与家庭录像共 126 件，由四位家庭成员共同维护。</p></article></div>
        <div className="tree-summary"><span><b>16</b> 位家人</span><span><b>126</b> 张照片</span><span><b>11</b> 段口述</span><span><b>1918</b> 年最早记录</span></div>
      </section>
    </div>}
    {showCreate&&<div className="layer" onMouseDown={(e)=>e.target===e.currentTarget&&closeLayer()}><section className="create-panel" role="dialog" aria-modal="true" aria-label="创建生命档案"><button className="close" onClick={closeLayer}>×</button><div className="step-indicator"><b>0{createStep}</b><span/><small>共 03 步</small></div>{createStep===1&&<><p className="eyebrow">开始记录</p><h2>这份生命档案，是为谁创建？</h2><p className="panel-lead">不必一次写完。先从一个名字开始，以后可以慢慢补充。</p><div className="choice-grid"><button onClick={()=>setCreateStep(2)}><b>为自己记录</b><span>亲口讲述自己走过的人生</span><em>我本人 →</em></button><button onClick={()=>setCreateStep(2)}><b>为家人记录</b><span>替父母、祖辈或逝去的亲人保存故事</span><em>我的家人 →</em></button></div></>}{createStep===2&&<><p className="eyebrow">基本信息</p><h2>先写下他的名字</h2><div className="form-grid"><label>姓名<input placeholder="例如：陈德山"/></label><label>出生年份<input placeholder="例如：1946" inputMode="numeric"/></label><label>生活地区<input placeholder="省份 · 城市"/></label><label>身份或职业<input placeholder="例如：乡村教师"/></label></div><button className="primary-btn" onClick={()=>setCreateStep(3)}>继续，添加人生故事 →</button></>}{createStep===3&&<><div className="complete-mark">✓</div><h2>一份生命档案，<br/>已经有了开始。</h2><p className="panel-lead">接下来可以添加人生时间线、照片、声音和家族成员。Demo 暂不保存你填写的信息。</p><div className="next-list"><span>01　写下人生经历</span><span>02　上传珍贵照片</span><span>03　连接家族成员</span></div><button className="primary-btn" onClick={()=>{closeLayer();showNotice("生命档案演示创建完成")}}>回到人物馆</button></>}</section></div>}
    {notice&&<div className="toast" role="status">{notice}</div>}
  </main>;
}

function MiniTree(){return <div className="family-tree" aria-label="陈氏家族三代关系示意"><div className="tree-label">陈氏家族 · 三代记忆</div><div className="tree-row top"><span>陈德山<small>1946—2018</small></span><span>林素贞<small>1949—至今</small></span></div><div className="tree-line"/><div className="tree-row bottom"><span>陈建国<small>1972—至今</small></span><span>陈晓梅<small>1976—至今</small></span><span className="add-person">＋<small>补充一位家人</small></span></div></div>}
