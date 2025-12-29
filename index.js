(function(){
  const $ = (s, p=document) => p.querySelector(s);
  const $$ = (s, p=document) => [...p.querySelectorAll(s)];

  // Year
  $("#year").textContent = new Date().getFullYear();

  // Theme
  const themeBtn = $("#themeBtn");
  const saved = localStorage.getItem("theme");
  if (saved) document.body.setAttribute("data-theme", saved);

  themeBtn.addEventListener("click", () => {
    const cur = document.body.getAttribute("data-theme") || "dark";
    const next = (cur === "dark") ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // Rotating role chip (완전히 새 디자인이지만 기존 메시지 유지)
  const roles = ["풀스택 개발자", "백엔드 개발자"];
  let r = 0;
  setInterval(() => {
    r = (r + 1) % roles.length;
    $("#roleChip").textContent = roles[r];
  }, 1400);

  // Smooth scroll
  $$(".nav a").forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      e.preventDefault();
      const el = $(href);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    });
  });

  // Active nav on scroll
  const sections = ["#home","#about","#education","#skills","#projects","#side","#contact"]
    .map(id => $(id)).filter(Boolean);
  const navLinks = $$(".nav a");

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = "#" + entry.target.id;
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });

  sections.forEach(s => io.observe(s));

  // Counter animation
  const counters = $$(".num[data-count]");
  let counterDone = false;

  function animateCount(el, target){
    const start = 0;
    const dur = 1100;
    const t0 = performance.now();
    function tick(t){
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(start + (target - start) * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterIO = new IntersectionObserver((entries) => {
    if (counterDone) return;
    if (entries.some(e => e.isIntersecting)){
      counterDone = true;
      counters.forEach(c => animateCount(c, Number(c.dataset.count)));
      counterIO.disconnect();
    }
  }, { threshold: 0.2 });

  const statsBlock = document.querySelector(".stats");
  if (statsBlock) counterIO.observe(statsBlock);

  // Skill bars
  const skillIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const box = entry.target;
      const pct = Number(box.dataset.skill || "0");
      const fill = box.querySelector(".bar > i");
      if (fill) fill.style.width = pct + "%";
      skillIO.unobserve(box);
    });
  }, { threshold: 0.35 });

  $$(".skill[data-skill]").forEach(s => skillIO.observe(s));

  // Project filter
  const pills = $$(".pill");
  const projects = $$(".project");
  pills.forEach(p => {
    p.addEventListener("click", () => {
      pills.forEach(x => x.classList.remove("active"));
      p.classList.add("active");
      const f = p.dataset.filter;

      projects.forEach(card => {
        const kinds = (card.dataset.kind || "").split(" ");
        const show = (f === "all") ? true : kinds.includes(f);
        card.style.display = show ? "flex" : "none";
      });
    });
  });

  // Modal data
  const modal = $("#modal");
  const modalTitle = $("#modalTitle");
  const modalBody = $("#modalBody");
  const modalClose = $("#modalClose");

  const projectDetails = {
    p1: {
      title: "전기차 충전소 어플 개발",
      body: `
- 기간: 2020.03-2020.12 (10개월)
- 형태: 대학 캡스톤 디자인 팀프로젝트
- 기술 스택: Android Studio, MySQL, Firebase, 공공데이터 API
- 주요 기능:
- 회원 관리 및 SNS 로그인
- 전기차 충전소 위치 표시
- 충전 가능 여부 및 시간 표시

정리 포인트:
- 지도 기반 UI에서 데이터 표기 흐름을 설계한 경험이 있습니다.
- 외부 API 기반 데이터 처리(정제/표시)와 사용자 경험을 동시에 고려했습니다.
`
    },
    p2: {
      title: "웹 쇼핑몰 홈페이지 개발",
      body: `
- 기간: 2023.11-2024.04 (5개월)
- 형태: 개인 프로젝트
- 기술 스택: Spring Boot, JPA, MySQL, JavaScript
- 주요 기능:
- 회원가입 및 로그인
- 장바구니

정리 포인트:
- 도메인 설계 및 CRUD 흐름을 직접 구성했습니다.
- 인증/세션/데이터 모델링을 함께 다뤘습니다.
`
    },
    p3: {
      title: "JAVA Bean 카페",
      body: `
- 기간: 2025.11 ~ 2025.12 (3주)
- 형태: 팀 프로젝트
- 기술 스택: Spring Boot, MyBatis, MySQL, JavaScript
- 주요 기능:
- Spring Security 회원가입 및 로그인
- 관리자 페이지 SSE 이벤트
- 웹/모바일 환경 대응

정리 포인트:
- 팀 단위로 기능을 분담하고 통합하는 과정을 경험했습니다.
- Security/SSE 기능을 담당하고 적용했습니다.
`
    },
    p4: {
      title: "Draw it!",
      body: `
- 기간: 2025.12 ~ 2025.12 (2주)
- 형태: 개인 프로젝트
- 기술 스택: Spring Boot, JPA, React, STOMP
- 주요 기능:
- STOMP 기반 실시간 그림 연동
- 실시간 채팅 연동
- 끝말잇기 모드

정리 포인트:
- WebSocket/STOMP 기반 실시간 상태 동기화를 구현했습니다.
- 실시간 그림 동기화 및 채팅, 시간 동기화 등을 담당하고 구현했습니다.
`
    }
  };

  function openModal(key){
    const d = projectDetails[key];
    if (!d) return;
    modalTitle.textContent = d.title;
    modalBody.textContent = ""; // reset
    // markdown 느낌을 유지하려고 pre 스타일로 렌더링
    const pre = document.createElement("pre");
    pre.style.whiteSpace = "pre-wrap";
    pre.style.margin = "0";
    pre.style.fontFamily = "var(--sans)";
    pre.textContent = d.body.trim();
    modalBody.appendChild(pre);

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  $$(".link[data-open]").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.open));
  });

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  // Copy helpers
  async function copyText(text){
    try{
      await navigator.clipboard.writeText(text);
      return true;
    }catch(_){
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    }
  }

  $("#copyEmail").addEventListener("click", async () => {
    const ok = await copyText($("#emailText").textContent.trim());
    alert(ok ? "이메일을 복사했습니다." : "복사에 실패했습니다.");
  });

  $("#copyPhone").addEventListener("click", async () => {
    const ok = await copyText("+82-10-2926-4698");
    alert(ok ? "전화번호를 복사했습니다." : "복사에 실패했습니다.");
  });

  $("#copyGithub").addEventListener("click", async () => {
    const ok = await copyText("https://github.com/EatingIting");
    alert(ok ? "Github 링크를 복사했습니다." : "복사에 실패했습니다.");
  });
})();

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target); // 한 번만 실행
      }
    });
  },
  {
    threshold: 0.15, // 섹션의 15%가 보이면 등장
  }
);

sections.forEach((section) => observer.observe(section));

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  if (!hamburger || !nav) return;

  // 햄버거 클릭 → nav 토글
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("is-open");
  });

  // nav 내부 클릭 시 닫히지 않음
  nav.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // 바깥 클릭 시 닫기
  document.addEventListener("click", () => {
    nav.classList.remove("is-open");
  });

  // 메뉴 클릭 시 자동 닫힘
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
    });
  });
});
