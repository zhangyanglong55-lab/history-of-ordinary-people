"use client";

import { useMemo, useState } from "react";

type Person = {
  name: string; years: string; birth: number; place: string; role: string; quote: string;
  image: string; intro: string; memory: string; milestones: [string, string][];
};

const people: Person[] = [
  { name:"周桂英", years:"1938 — 2021", birth:1938, place:"江苏 · 南京", role:"纺织女工", quote:"她把一辈子的耐心，都缝进了日子里。", image:"/person-01.jpg", intro:"周桂英在南京的一家纺织厂工作了三十六年。她不善言辞，却把四个孩子和一个热闹的家照料得井井有条。退休后，她最喜欢坐在窗边替孙辈缝补衣裳。", memory:"她做的青团总比别人家的软。清明前一周，整条巷子都能闻到她家蒸笼里的艾草香。", milestones:[["1938","出生于江苏高淳"],["1957","进入南京第二棉纺厂"],["1962","与王守义成家"],["1993","退休，开始照顾孙辈"],["2021","在家人陪伴中安静离世"]] },
  { name:"陈德山", years:"1946 — 2018", birth:1946, place:"广东 · 江门", role:"乡村教师", quote:"三十八年，他教会两代孩子写下自己的名字。", image:"/person-02.jpg", intro:"陈德山十八岁站上村小的讲台。最初学校只有两间瓦房，他既教语文，也修课桌、敲上下课钟。后来许多学生离开村子，每逢春节仍会回来喊他一声陈老师。", memory:"他总在黑板右下角留一句话：字要写正，人也要站正。", milestones:[["1946","出生于广东台山"],["1964","成为村里第一位民办教师"],["1978","组织修建新校舍"],["2002","从教三十八年后退休"],["2018","学生们送他走完最后一程"]] },
  { name:"林秀兰", years:"1951 — 至今", birth:1951, place:"福建 · 泉州", role:"裁缝", quote:"我的历史不宏大，但每一针都有来处。", image:"/person-03.jpg", intro:"林秀兰十六岁跟着姨母学裁衣。她记得街坊每个人的尺寸，也记得哪件衣服是为婚礼、远行或孩子满月做的。现在她正在亲口讲述自己的故事。", memory:"踩缝纫机的时候，我总爱哼南音。孩子们说，听见机器声就知道我在家。", milestones:[["1951","出生于泉州西街"],["1967","开始学习裁缝"],["1984","开了自己的小裁缝铺"],["2016","把旧缝纫机送给外孙女"],["2026","开始记录自己的生命档案"]] },
  { name:"赵有福", years:"1935 — 2010", birth:1935, place:"河北 · 保定", role:"木匠", quote:"他做过几百扇门，也守住了自己的家。", image:"/person-05.jpg", intro:"赵有福从父亲手里接过一套木工工具，走村串户做了四十多年木匠。谁家的柜子、谁家的嫁妆，他都能说出来。", memory:"父亲刨木头时从不戴手套。他说手要摸得到木纹，才知道该往哪个方向用力。", milestones:[["1935","出生于保定清苑"],["1952","跟随父亲学习木工"],["1960","为自己家做了第一张饭桌"],["1998","把工具交给小儿子"],["2010","安葬于故乡"]] },
  { name:"吴秋月", years:"1942 — 2023", birth:1942, place:"四川 · 乐山", role:"乡村医生", quote:"她背着药箱，走过了山里每一条小路。", image:"/person-06.jpg", intro:"吴秋月是附近几个村最早的赤脚医生。下雨天，她用塑料布包好药箱；深夜有人敲门，她总会立刻披衣起身。", memory:"奶奶的药箱有一股淡淡的酒精味。小时候我以为，只要它在，所有人都会好起来。", milestones:[["1942","出生于四川乐山"],["1969","成为乡村医生"],["1981","参加县城医护培训"],["2007","最后一次出诊"],["2023","家人整理她留下的药箱"]] },
  { name:"许长河", years:"1954 — 至今", birth:1954, place:"黑龙江 · 哈尔滨", role:"铁路工人", quote:"四十年里，他记住了每一趟列车的声音。", image:"/person-09.jpg", intro:"许长河在铁路边长大，也在铁路上工作了一辈子。从蒸汽机车到高铁，他保存了许多旧车票、徽章和工作笔记。", memory:"冬天巡线最冷的时候，眉毛都会结霜。但远远看见车灯过来，心里一下就踏实了。", milestones:[["1954","出生于哈尔滨"],["1972","进入哈尔滨铁路局"],["1988","成为线路工班长"],["2014","退休并开始整理铁路收藏"],["2026","录下第一段口述史"]] },
  { name:"何素芳", years:"1931 — 2019", birth:1931, place:"湖南 · 湘潭", role:"农民", quote:"她没离开过故乡，却见过故乡变了许多次。", image:"/person-03.jpg", intro:"何素芳一生生活在湘潭的一个村庄。她会认天气、育秧苗，也记得村里已经消失的地名和旧路。", memory:"外婆总说，认得一块田，就要记得它旱过、涝过，也丰收过。", milestones:[["1931","出生于湘潭石鼓村"],["1948","与何清明成家"],["1976","带领家人修建砖瓦房"],["2009","第一次坐火车去长沙"],["2019","长眠于村后的山坡"]] },
  { name:"马振华", years:"1949 — 2020", birth:1949, place:"山东 · 青岛", role:"公交司机", quote:"他开过同一条线路，也送过一座城的清晨。", image:"/person-06.jpg", intro:"马振华开了二十九年公交车。每天第一班车五点四十分出发，他熟悉沿途每个上学的孩子和赶早市的老人。", memory:"爸爸从不按喇叭催老人。他说，车晚一分钟没什么，人摔一下就是大事。", milestones:[["1949","出生于山东即墨"],["1975","成为公交驾驶员"],["1987","驾驶第一批无人售票车"],["2004","安全行驶百万公里退休"],["2020","家人保存了他的旧工牌"]] },
  { name:"叶文清", years:"1962 — 至今", birth:1962, place:"云南 · 大理", role:"邮递员", quote:"二十七年，她把远方送进每一户人家。", image:"/person-01.jpg", intro:"叶文清年轻时骑着绿色自行车送信。山路不好走，她会把信件包进帆布袋，雨天就藏在蓑衣下面。", memory:"有些信我送了很多年，后来写信的人回了家，信就少了。能团圆，总是一件好事。", milestones:[["1962","出生于云南大理"],["1981","成为乡邮员"],["1996","换上第一辆邮政摩托车"],["2008","参与汶川赈灾邮件转运"],["2026","与女儿共同整理旧信封"]] },
];

const eras = ["全部年代", "1930年代", "1940年代", "1950年代", "1960年代"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [era, setEra] = useState("全部年代");
  const [selected, setSelected] = useState<Person | null>(null);
  const [showFamily, setShowFamily] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => {
    const key = query.trim().toLowerCase();
    return people.filter((person) => {
      const matchesQuery = !key || [person.name, person.place, person.role].some((item) => item.toLowerCase().includes(key));
      const matchesEra = era === "全部年代" || Math.floor(person.birth / 10) * 10 === Number(era.slice(0, 4));
      return matchesQuery && matchesEra;
    });
  }, [query, era]);

  const showNotice = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2400); };
  const closeLayer = () => { setSelected(null); setShowFamily(false); setShowCreate(false); };

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
      <div className="archive-collage" aria-label="一组家庭老照片"><div className="stamp">民间<br/>记忆</div><figure className="photo-main"><img src="/person-09.jpg" alt="一张三代人的家庭老照片"/><figcaption>陈家全家福 · 广东台山 · 1956</figcaption></figure><div className="note-card"><span>一九五六年秋</span><p>这是全家第一次，也是唯一一次一起走进照相馆。</p></div><span className="archive-id">档案编号 M-1956-00827</span></div>
    </section>

    <section className="museum" id="museum">
      <div className="section-heading"><div><p className="eyebrow">正在被记住的人</p><h2>从一个名字，走进一段人生</h2></div><span className="result-count">共找到 {filtered.length} 份档案</span></div>
      <div className="filter-row" role="group" aria-label="按年代筛选">{eras.map(item=><button key={item} className={era===item?"selected":""} onClick={()=>setEra(item)}>{item}</button>)}</div>
      {filtered.length ? <div className="people-grid">{filtered.map((person,index)=><article className="person-card" key={person.name} onClick={()=>setSelected(person)} onKeyDown={(e)=>e.key==="Enter"&&setSelected(person)} tabIndex={0}><div className="portrait-wrap" data-initial={person.name[0]}><img src={person.image} alt={`${person.name}的肖像`}/><span className="card-index">{String(index+1).padStart(2,"0")}</span></div><div className="person-info"><div className="person-title"><h3>{person.name}</h3><span>{person.years}</span></div><p className="person-tags">{person.place}<i/>{person.role}</p><blockquote>“{person.quote}”</blockquote><span className="read-story">翻开{person.name.at(-1)==="兰"||person.name.at(-1)==="英"||person.name.at(-1)==="芳"||person.name.at(-1)==="月"||person.name.at(-1)==="清"?"她":"他"}的故事 <b>↗</b></span></div></article>)}</div>:<div className="empty-state">暂时没有找到这个名字。也许，你愿意成为第一个记录他的人。</div>}
    </section>

    <section className="family-strip" id="family"><div className="family-copy"><p className="eyebrow">鲜活的在线族谱</p><h2>一个人的故事，<br/>会连接起一个家族。</h2><p>从一张照片、一段口述开始，慢慢找回名字之间的关系。每个人是一页，连起来，就是一个家庭穿过时代的轨迹。</p><button onClick={()=>setShowFamily(true)}>打开陈氏家族脉络 <span>→</span></button></div><MiniTree/></section>

    <section className="manifesto" id="about"><span className="seal">记<br/>录</span><p>“如果我们不记录，普通人的一生，<br/>就会像从未发生过一样。”</p><h2>历史从我们这里开始记录。</h2><button onClick={()=>{setCreateStep(1);setShowCreate(true)}}>创建一份生命档案</button><div className="create-features"><span>本人记录</span><i/><span>替家人记录</span><i/><span>完整资料可导出</span></div></section>
    <footer><div className="brand footer-brand"><span className="brand-mark">史</span><span><strong>多数人的历史</strong><small>为每一个普通人保存一生的故事</small></span></div><p>本页人物与故事为产品演示内容</p><p>© 2026 多数人的历史</p></footer>

    {selected&&<div className="layer" onMouseDown={(e)=>e.target===e.currentTarget&&closeLayer()}><section className="profile-panel" role="dialog" aria-modal="true" aria-label={`${selected.name}的人生档案`}><button className="close" onClick={closeLayer} aria-label="关闭">×</button><div className="profile-hero"><img src={selected.image} alt=""/><div><p className="eyebrow">生命档案 · 已公开</p><h2>{selected.name}</h2><p>{selected.years} · {selected.place} · {selected.role}</p><blockquote>“{selected.quote}”</blockquote></div></div><div className="profile-body"><article><p className="chapter">第一章 · 他是谁</p><h3>一个普通人的一生</h3><p>{selected.intro}</p><div className="voice-card"><span className="play">▶</span><div><strong>听听家人怎样说起他</strong><small>家人口述 · 01:42</small></div><button onClick={()=>showNotice("口述录音演示")}>播放</button></div><p className="chapter">家人记忆</p><div className="memory-quote">“{selected.memory}”<small>—— 家人回忆</small></div></article><aside><p className="chapter">人生时间线</p>{selected.milestones.map(([year,text])=><div className="timeline-item" key={year}><b>{year}</b><span>{text}</span></div>)}<button className="outline-btn" onClick={()=>showNotice("二维码已生成，可用于墓碑或纪念册")}>查看纪念二维码</button></aside></div></section></div>}
    {showFamily&&<div className="layer" onMouseDown={(e)=>e.target===e.currentTarget&&closeLayer()}><section className="family-panel" role="dialog" aria-modal="true" aria-label="陈氏家族脉络"><button className="close light" onClick={closeLayer}>×</button><p className="eyebrow">家族脉络</p><h2>陈氏家族 · 四代人的记忆</h2><p className="panel-lead">点击一个名字进入他的生命档案。虚线框代表仍在等待补充的家人。</p><div className="large-tree"><div className="generation"><small>第一代</small><button onClick={()=>{setShowFamily(false);setSelected(people[1])}}>陈德山<span>1946—2018 · 乡村教师</span></button><button>林素贞<span>1949—至今 · 农民</span></button></div><div className="connector"/><div className="generation"><small>第二代</small><button>陈建国<span>1972—至今 · 工程师</span></button><button>陈晓梅<span>1976—至今 · 护士</span></button></div><div className="connector short"/><div className="generation"><small>第三代</small><button>陈一帆<span>2001—至今 · 学生</span></button><button className="ghost" onClick={()=>showNotice("已发起补充家人申请")}>＋ 补充一位家人<span>等待家人共同完善</span></button></div></div><div className="tree-summary"><span><b>7</b> 位家人</span><span><b>68</b> 张照片</span><span><b>4</b> 段口述</span><span><b>1934</b> 年最早记忆</span></div></section></div>}
    {showCreate&&<div className="layer" onMouseDown={(e)=>e.target===e.currentTarget&&closeLayer()}><section className="create-panel" role="dialog" aria-modal="true" aria-label="创建生命档案"><button className="close" onClick={closeLayer}>×</button><div className="step-indicator"><b>0{createStep}</b><span/><small>共 03 步</small></div>{createStep===1&&<><p className="eyebrow">开始记录</p><h2>这份生命档案，是为谁创建？</h2><p className="panel-lead">不必一次写完。先从一个名字开始，以后可以慢慢补充。</p><div className="choice-grid"><button onClick={()=>setCreateStep(2)}><b>为自己记录</b><span>亲口讲述自己走过的人生</span><em>我本人 →</em></button><button onClick={()=>setCreateStep(2)}><b>为家人记录</b><span>替父母、祖辈或逝去的亲人保存故事</span><em>我的家人 →</em></button></div></>}{createStep===2&&<><p className="eyebrow">基本信息</p><h2>先写下他的名字</h2><div className="form-grid"><label>姓名<input placeholder="例如：陈德山"/></label><label>出生年份<input placeholder="例如：1946" inputMode="numeric"/></label><label>生活地区<input placeholder="省份 · 城市"/></label><label>身份或职业<input placeholder="例如：乡村教师"/></label></div><button className="primary-btn" onClick={()=>setCreateStep(3)}>继续，添加人生故事 →</button></>}{createStep===3&&<><div className="complete-mark">✓</div><h2>一份生命档案，<br/>已经有了开始。</h2><p className="panel-lead">接下来可以添加人生时间线、照片、声音和家族成员。Demo 暂不保存你填写的信息。</p><div className="next-list"><span>01　写下人生经历</span><span>02　上传珍贵照片</span><span>03　连接家族成员</span></div><button className="primary-btn" onClick={()=>{closeLayer();showNotice("生命档案演示创建完成")}}>回到人物馆</button></>}</section></div>}
    {notice&&<div className="toast" role="status">{notice}</div>}
  </main>;
}

function MiniTree(){return <div className="family-tree" aria-label="陈氏家族三代关系示意"><div className="tree-label">陈氏家族 · 三代记忆</div><div className="tree-row top"><span>陈德山<small>1946—2018</small></span><span>林素贞<small>1949—至今</small></span></div><div className="tree-line"/><div className="tree-row bottom"><span>陈建国<small>1972—至今</small></span><span>陈晓梅<small>1976—至今</small></span><span className="add-person">＋<small>补充一位家人</small></span></div></div>}
