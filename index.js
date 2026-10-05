const flowSteps = [
  "요구사항 분석",
  "API 개발",
  "코드 검증",
  "Git / Pull Request",
  "GitHub Actions",
  "Build / Package",
  "Container Image",
  "Registry Push",
  "ArgoCD 배포",
  "Kubernetes",
  "Pod Health Check",
  "운영 상태 확인"
];

const agentUseCases = [
  "API Search Agent",
  "Source Code Analysis Agent",
  "DTO Analysis Agent",
  "Code Generation Agent",
  "Compile Validation Agent",
  "Git / Pull Request Agent",
  "CI/CD Agent",
  "Deployment Agent",
  "Kubernetes Operations Agent",
  "Rollout Restart Agent",
  "Log Analysis Agent",
  "Transaction Error Analysis Agent",
  "Health Check Agent"
];

const skillGroups = {
  Backend: ["Java 21", "Spring Boot", "Spring Cloud", "OpenFeign", "REST API", "Swagger / OpenAPI", "Maven", "JGit"],
  "Database / Messaging": ["PostgreSQL", "Redis", "Kafka"],
  DevOps: ["Git", "GitHub", "GitHub Actions", "Docker", "ArgoCD", "CI/CD"],
  "Cloud / Kubernetes": ["Azure", "AKS", "ACR", "Kubernetes", "ServiceAccount", "RBAC"],
  "AI / Agent": ["LLM Application", "LangGraph", "RAG", "Multi-Agent Architecture", "Agent Orchestration", "Prompt Engineering", "Code Generation", "Human-in-the-Loop", "Context / Evidence Management"]
};

const issues = [
  "CrashLoopBackOff",
  "ImagePullBackOff",
  "Container Image Pull 실패",
  "Kubernetes 403 Forbidden",
  "ServiceAccount 권한 오류",
  "Spring Boot Startup Failure",
  "Java Agent Loading Failure",
  "ArgoCD Sync 오류",
  "GitHub Actions 인증 오류",
  "Azure OIDC 인증 오류",
  "Federated Identity 설정 오류",
  "Container Registry 인증 오류",
  "GitHub SAML / Permission 오류",
  "Maven Repository Dependency Resolution 오류",
  "ArgoCD Deployment 실패 분석"
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
