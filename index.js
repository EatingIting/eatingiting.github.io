(function(){
  const $ = (s, p=document) => p.querySelector(s);
  const $$ = (s, p=document) => [...p.querySelectorAll(s)];

  // Year
  $("#year").textContent = new Date().getFullYear();

  // Theme
  const themeBtn = $("#themeBtn");
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.body.setAttribute("data-theme", saved);
  } else {
    document.body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }

  themeBtn.addEventListener("click", () => {
    const cur = document.body.getAttribute("data-theme");
    const next = (cur === "dark") ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

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
- 공공데이터포털 API 기반 데이터 처리와 사용자 경험을 동시에 고려했습니다.
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
- Spring Security와 SSE 기능을 담당했습니다.
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
  const hamburger = document.getElementById("menuBtn");
  const nav = document.getElementById("mobileNav");

  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("is-open");
  });

  nav.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    nav.classList.remove("is-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
    });
  });

  const projectScreenshots = {
    p1: [
      {
        src :'p1/login.png',
        desc : '로그인 페이지'
      },
      {
        src : 'p1/register.png',
        desc : '회원가입 페이지'
      },
      {
        src : 'p1/main.png',
        desc : '로그인 후 메인페이지'},
      {
        src : 'p1/marker_detail.png',
        desc : '마커 클릭 후 디테일 페이지'},
      {
        src : 'p1/scroll.png', 
        desc : '디테일 스크롤 후'
      }
    ],
    p2: [
      {
        src : 'p2/main.png',
        desc : '쇼핑몰 메인페이지'},
      {  
        src : 'p2/login_modal.png',
        desc : '로그인 모달창'},
      {
        src : 'p2/register.png',
        desc : '회원가입창'},
      {
        src : 'p2/email_verify.png',
        desc : '이메일 인증 버튼을 누르면 3분의 유효시간'},
      {
        src : 'p2/email.png',
        desc : 'SMTP서버 이용하여, 실제 이메일 전송'},
      {
        src : 'p2/email_ok.png',
        desc : `인증번호를 입력 후 '확인' 버튼을 누름`},
      {
        src : 'p2/login_ok.png',
        desc : '로그인 후 로그아웃으로 바뀐 페이지'}
    ],
    p3: [
      {
        src: 'p3/login1.png',
        desc: 'Java Bean 카페 서비스의 기본 로그인 화면으로, 이메일과 비밀번호를 통한 일반 로그인을 제공합니다.'
      },
      {
        src: 'p3/login2.png',
        desc: '카카오 계정을 이용한 소셜 로그인 화면으로, 외부 인증 API 연동을 통해 간편 로그인을 지원합니다.'
      },
      {
        src: 'p3/general_login.png',
        desc: '일반적인 로그인을 할 수 있는 로그인 화면입니다.'
      },
      {
        src: 'p3/register1.png',
        desc: '카카오, 네이버, 구글 등 소셜 계정을 활용한 회원가입 화면으로, 간편한 가입 절차를 제공합니다.'
      },
      {
        src: 'p3/general_register.png',
        desc: '일반 회원가입 화면으로, 이메일·비밀번호·닉네임 입력을 통해 신규 회원을 등록합니다.'
      },
      {
        src: 'p3/main.png',
        desc: '로그인 성공 후 메인 화면으로, 이전 주문 내역과 스탬프·쿠폰 정보를 확인할 수 있습니다.'
      },
      {
        src: 'p3/select_store.png',
        desc: '주문 전 지점을 선택하는 화면으로, 사용자가 원하는 매장을 선택해 주문할 수 있습니다.'
      },
      {
        src: 'p3/menu.png',
        desc: '카테고리별 메뉴 목록 화면으로, 커피·음료·디저트 등의 메뉴를 한눈에 확인할 수 있습니다.'
      },
      {
        src: 'p3/search.png',
        desc: '메뉴 검색 화면으로, 키워드를 입력해 원하는 메뉴를 빠르게 찾을 수 있습니다.'
      },
      {
        src: 'p3/menu_detail.png',
        desc: '메뉴 상세 화면으로, ICE/HOT 선택, 옵션 설정, 수량 조절 후 장바구니 또는 바로 주문이 가능합니다.'
      },
      {
        src: 'p3/cart1.png',
        desc: '장바구니 화면으로, 선택한 메뉴와 수량을 확인하고 포장/매장 여부를 선택할 수 있습니다.'
      },
      {
        src: 'p3/cart2.png',
        desc: '요청사항 입력, 결제 수단 선택 및 최종 결제 금액을 확인합니다.'
      },
      {
        src: 'p3/admin_order.png',
        desc: '관리자 주문 관리 화면으로, 실시간으로 들어오는 주문을 확인하고 주문 상태를 관리합니다.'
      },
      {
        src: 'p3/admin_menu_management.png',
        desc: '관리자 메뉴 관리 화면으로, 메뉴 추가·수정·삭제 및 카테고리와 가격을 관리할 수 있습니다.'
      },
      {
        src: 'p3/admin_revenue.png',
        desc: '관리자 매출 관리 화면으로, 날짜별 매출 조회와 주문 금액 통계를 확인할 수 있습니다.'
      }
    ],
    p4: [
      {
        src: 'p4/start.png',
        desc: '게임 시작 화면으로, 닉네임 입력 후 방 생성 또는 방 참여를 선택할 수 있습니다.'
      },
      {
        src: 'p4/create_room.png',
        desc: '방 생성 화면에서 로비 이름, 게임 모드, 비밀번호 설정 등 방 옵션을 구성할 수 있습니다.'
      },
      {
        src: 'p4/room_list.png',
        desc: '현재 생성된 방 목록을 확인하고, 원하는 방에 입장할 수 있는 대기실 화면입니다.'
      },
      {
        src: 'p4/waiting_room.png',
        desc: '게임 시작 전 대기 화면으로, 참여자 목록과 채팅을 통해 대기 상태를 확인할 수 있습니다.'
      },
      {
        src: 'p4/chat_bubble.png',
        desc: '대기 중 채팅을 입력하면 사용자 캐릭터 옆에 말풍선 형태로 실시간 표시됩니다.'
      },
      {
        src: 'p4/drawing_turn.png',
        desc: '출제자가 제시어에 맞는 그림을 실시간으로 그리는 게임 진행 화면입니다.'
      },
      {
        src: 'p4/guessing_turn.png',
        desc: '참여자가 그림을 보고 채팅으로 정답을 입력하는 턴 화면입니다.'
      },
      {
        src: 'p4/time_progress.png',
        desc: '라운드 제한 시간에 따라 상단 타이머 프로그레스바가 실시간으로 감소합니다.'
      },
      {
        src: 'p4/game_end.png',
        desc: '모든 플레이어가 나가거나 게임이 종료되었을 때 표시되는 종료 안내 화면입니다.'
      },
      {
        src: 'p4/word_chain_start.png',
        desc: '끝말잇기 모드 시작 화면으로, 턴과 제한 시간이 명확히 표시됩니다.'
      },
      {
        src: 'p4/word_chain_play.png',
        desc: '끝말잇기 진행 중 화면으로, 입력 단어와 턴 교체 로그가 실시간 반영됩니다.'
      },
      {
        src: 'p4/word_chain_result.png',
        desc: '끝말잇기 라운드 결과 화면으로, 성공·실패 여부와 점수가 정리되어 표시됩니다.'
      },
      {
        src: 'p4/vote_progress.png',
        desc: '라운드 종료 후 그림 투표가 진행되는 화면으로, 남은 투표 시간이 표시됩니다.'
      },
      {
        src: 'p4/vote_result.png',
        desc: '투표 결과에 따라 점수와 순위가 집계되어 시각적으로 표시됩니다.'
      },
      {
        src: 'p4/hall_of_fame.png',
        desc: '월별 명예의 전당 화면으로, 인기 그림과 득표 수를 확인할 수 있습니다.'
      }
    ]
  };

  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalTitle = document.getElementById('modalTitle');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('[data-shot]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.dataset.shot;
      openScreenshotModal(key);
    });
  });

  function openScreenshotModal(key) {
    const images = projectScreenshots[key];
    if (!images) return;

    modalTitle.textContent = '프로젝트 스크린샷';

    modalBody.innerHTML = createCarousel(images);

    modal.setAttribute('data-shot', key);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    initCarousel(images);
  }

  modalClose.addEventListener('click', closeModal);

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');

    // ✅ cleanup
    modal.removeAttribute('data-shot');
  }

  function createCarousel(images) {
    return `
      <div class="carousel">
        <button class="carousel-btn left" aria-label="이전">‹</button>

        <!-- viewport : 보이는 영역 -->
        <div class="carousel-viewport">
          <div class="carousel-track">
            ${images.map(img => {
              const isWeb = img.src.includes('admin');
              return `
                <div class="carousel-slide ${isWeb ? 'web' : 'mobile'}">
                  <img src="${img.src}" alt="스크린샷">
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <button class="carousel-btn right" aria-label="다음">›</button>

        <div class="carousel-dots">
          ${images.map((_, i) => `<span data-dot="${i}"></span>`).join('')}
        </div>

        <div class="carousel-caption" id="carouselCaption"></div>
      </div>
    `;
  }

  function initCarousel(images) {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots span');
    const btnLeft = document.querySelector('.carousel-btn.left');
    const btnRight = document.querySelector('.carousel-btn.right');
    const caption = document.getElementById('carouselCaption');

    let index = 0;

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      dots[index].classList.add('active');

      if (caption && images[index]?.desc) {
        caption.textContent = images[index].desc;
      }
    }

    btnLeft.onclick = () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    };

    btnRight.onclick = () => {
      index = (index + 1) % slides.length;
      update();
    };

    dots.forEach(dot => {
      dot.onclick = () => {
        index = Number(dot.dataset.dot);
        update();
      };
    });

    update();
  }

});