const flowSteps = [
  "요구사항 분석",
  "Source Code 검색",
  "API / DTO Context 구성",
  "LLM Code Generation",
  "Compile Validation",
  "Git Branch / Commit / PR",
  "CI/CD & Image Build",
  "ArgoCD / Kubernetes Deploy",
  "Pod Health Check",
  "Failure Tracking / Rollback",
  "운영 결과 반환",
  "Evidence 관리"
];

const agentUseCases = [
  "Source Code 검색 Agent",
  "API 검색 Agent",
  "DTO 분석 Agent",
  "Code Generation Agent",
  "Compile Validation Agent",
  "Git / Pull Request Agent",
  "CI/CD Agent",
  "Kubernetes Deployment Agent",
  "Rollout Restart Agent",
  "Transaction Error Analysis Agent",
  "Log Analysis Agent",
  "Deployment Health Check Agent"
];

const skillGroups = {
  Backend: ["Java 21", "Spring Boot", "REST API", "OpenFeign", "Maven", "OpenAPI / Swagger", "JGit"],
  "AI / Agent": ["LLM Application", "LangGraph", "Multi-Agent Architecture", "Agent Orchestration", "RAG", "Prompt Engineering", "Context / Evidence Management", "Human-in-the-Loop"],
  Architecture: ["Event Driven Architecture", "Async Processing", "Kafka", "Redis", "PostgreSQL", "Idempotency", "Workflow Orchestration"],
  "DevOps / Cloud": ["GitHub", "GitHub Actions", "Docker", "ArgoCD", "Kubernetes", "Azure AKS", "Azure Container Registry", "RBAC", "CI/CD"]
};

const issues = [
  "Kubernetes RBAC / ServiceAccount 권한 오류",
  "Deployment / Pod CrashLoopBackOff",
  "ImagePullBackOff",
  "Container Registry 인증 문제",
  "Java Agent Loading Failure",
  "Spring Boot Startup Failure",
  "Maven Dependency Resolution 오류",
  "GitHub Actions 인증 오류",
  "Azure OIDC / Federated Identity 오류",
  "ArgoCD Deployment / Sync 오류",
  "Pod / Event / Log 기반 장애 분석"
];

const flow = document.querySelector("#flow");
const agentList = document.querySelector("#agentList");
const skillsGrid = document.querySelector("#skillsGrid");
const issueGrid = document.querySelector("#issueGrid");

flowSteps.forEach((step, index) => {
  const item = document.createElement("div");
  item.className = "flow-step";
  item.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>${step}</strong>`;
  flow.appendChild(item);
});

agentUseCases.forEach((agent) => {
  const item = document.createElement("span");
  item.className = "agent-pill";
  item.textContent = agent;
  agentList.appendChild(item);
});

Object.entries(skillGroups).forEach(([group, skills]) => {
  const card = document.createElement("article");
  card.className = "skill-card";
  card.innerHTML = `<h3>${group}</h3>${skills.map((skill) => `<span>${skill}</span>`).join("")}`;
  skillsGrid.appendChild(card);
});

issues.forEach((issue) => {
  const card = document.createElement("article");
  card.className = "issue-card";
  card.textContent = issue;
  issueGrid.appendChild(card);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".project-card, .skill-card, .issue-card, .flow-step, .metric").forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(14px)";
  element.style.transition = "opacity 500ms ease, transform 500ms ease";
  observer.observe(element);
});

const style = document.createElement("style");
style.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);
