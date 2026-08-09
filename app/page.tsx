"use client";

import { useMemo, useState } from "react";

const people = [
  {
    name: "周桂英",
    years: "1938 — 2021",
    place: "江苏 · 南京",
    role: "纺织女工",
    quote: "她把一辈子的耐心，都缝进了日子里。",
    image: "https://img.huffingtonpost.com/asset/5c63b085230000ed02226aaf.jpeg?ops=1200_630",
    tone: "warm",
  },
  {
    name: "陈德山",
    years: "1946 — 2018",
    place: "广东 · 江门",
    role: "乡村教师",
    quote: "三十八年，他教会两代孩子写下自己的名字。",
    image: "https://fj.people.com.cn/NMediaFile/2017/0428/LOCAL201704281532210910796284412.jpg",
    tone: "soft",
  },
  {
    name: "林秀兰",
    years: "1951 — 至今",
    place: "福建 · 泉州",
    role: "裁缝",
    quote: "我的历史不宏大，但每一针都有来处。",
    image: "https://i.wfolio.com/x/D48ScH1DA6jxU_uSH-Or-C0cJClpP-QP/lEAL128xEMPGM2o_rKw_kMPHKR9vAJ80/2yHULJRenX4hOfzl_c9ygOLd0IjyvKC1/GMuh9cfCQuAZ3__5uHmyox2PgZSdO4Pr/TqXwsDsLq-nI-TweGVM-Ig.jpg",
    tone: "deep",
  },
];

const eras = ["全部年代", "1930年代", "1940年代", "1950年代", "1960年代"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [era, setEra] = useState("全部年代");
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => {
    const key = query.trim().toLowerCase();
    if (!key) return people;
    return people.filter((person) =>
      [person.name, person.place, person.role].some((item) => item.toLowerCase().includes(key)),
    );
  }, [query]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  };

  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="多数人的历史首页">
          <span className="brand-mark">史</span>
          <span>
            <strong>多数人的历史</strong>
            <small>THE HISTORY OF US</small>
          </span>
        </a>
        <nav aria-label="主要导航">
          <a className="active" href="#museum">人物馆</a>
          <a href="#family">家族脉络</a>
          <a href="#about">关于我们</a>
        </nav>
        <button className="nav-action" onClick={() => showNotice("创建入口将在下一版开放")}>记录我的人生</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">普通人的历史博物馆</p>
          <h1>每一个平凡的人，<br /><em>都值得被历史记住。</em></h1>
          <p className="lead">这里收藏的不是王侯将相，而是父亲的手艺、母亲的歌、祖辈走过的路，以及我们真正生活过的证据。</p>
          <div className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索一个名字、地方或职业"
              aria-label="搜索人物"
            />
            <button onClick={() => document.querySelector("#museum")?.scrollIntoView({ behavior: "smooth" })}>寻找记忆</button>
          </div>
          <div className="hero-meta">
            <span><b>12,684</b> 份生命档案</span>
            <span><b>327</b> 座城市</span>
            <span><b>4</b> 代人的记忆</span>
          </div>
        </div>

        <div className="archive-collage" aria-label="一组家庭老照片">
          <div className="stamp">民间<br />记忆</div>
          <figure className="photo-main">
            <img src="https://nfassetoss.southcn.com/__asset/05611100f3/4a3bab62b4.jpg?t=1683374302365" alt="一张三代人的家庭老照片" />
            <figcaption>陈家全家福 · 广东台山 · 1956</figcaption>
          </figure>
          <div className="note-card">
            <span>一九五六年秋</span>
            <p>这是全家第一次，也是唯一一次一起走进照相馆。</p>
          </div>
          <span className="archive-id">档案编号 M-1956-00827</span>
        </div>
      </section>

      <section className="museum" id="museum">
        <div className="section-heading">
          <div>
            <p className="eyebrow">正在被记住的人</p>
            <h2>从一个名字，走进一段人生</h2>
          </div>
          <button className="text-link" onClick={() => showNotice("更多人物档案正在整理中")}>浏览全部人物 <span>→</span></button>
        </div>

        <div className="filter-row" role="group" aria-label="按年代筛选">
          {eras.map((item) => (
            <button key={item} className={era === item ? "selected" : ""} onClick={() => setEra(item)}>{item}</button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="people-grid">
            {filtered.map((person, index) => (
              <article className={`person-card ${person.tone}`} key={person.name} onClick={() => showNotice(`${person.name}的人生档案将在下一页展开`)} tabIndex={0}>
                <div className="portrait-wrap">
                  <img src={person.image} alt={`${person.name}的肖像`} />
                  <span className="card-index">0{index + 1}</span>
                </div>
                <div className="person-info">
                  <div className="person-title">
                    <h3>{person.name}</h3>
                    <span>{person.years}</span>
                  </div>
                  <p className="person-tags">{person.place}<i />{person.role}</p>
                  <blockquote>“{person.quote}”</blockquote>
                  <span className="read-story">翻开他的故事 <b>↗</b></span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">暂时没有找到这个名字。也许，你愿意成为第一个记录他的人。</div>
        )}
      </section>

      <section className="family-strip" id="family">
        <div className="family-copy">
          <p className="eyebrow">鲜活的在线族谱</p>
          <h2>一个人的故事，<br />会连接起一个家族。</h2>
          <p>从一张照片、一段口述开始，慢慢找回名字之间的关系。每个人是一页，连起来，就是一个家庭穿过时代的轨迹。</p>
          <button onClick={() => showNotice("家族脉络演示将在下一版开放")}>看看家族如何连接 <span>→</span></button>
        </div>
        <div className="family-tree" aria-label="陈氏家族三代关系示意">
          <div className="tree-label">陈氏家族 · 三代记忆</div>
          <div className="tree-row top"><span>陈德山<small>1946—2018</small></span><span>林素贞<small>1949—至今</small></span></div>
          <div className="tree-line" />
          <div className="tree-row bottom"><span>陈建国<small>1972—至今</small></span><span>陈晓梅<small>1976—至今</small></span><span className="add-person">＋<small>补充一位家人</small></span></div>
        </div>
      </section>

      <section className="manifesto" id="about">
        <span className="seal">记<br />录</span>
        <p>“如果我们不记录，普通人的一生，<br />就会像从未发生过一样。”</p>
        <h2>历史从我们这里开始记录。</h2>
        <button onClick={() => showNotice("生命档案创建入口将在下一版开放")}>创建一份生命档案</button>
      </section>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark">史</span><span><strong>多数人的历史</strong><small>为每一个普通人保存一生的故事</small></span></div>
        <p>本页人物与故事为产品演示内容</p>
        <p>© 2026 多数人的历史</p>
      </footer>

      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  );
}
