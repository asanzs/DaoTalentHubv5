const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join('c:', 'Users', 'Admin', 'OneDrive - THE HACIENDAS COMPANY (M365)', 'Documentos', 'CLAUDE CLAW', 'daotalenthubv5', 'messages');

const translations = {
  es: {
    socialProof: "Confiado por empresas líderes Web3 y Web2",
    howItWorks: {
      title: "Contratación sin fricción, <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5]\">Cero Riesgo</span>",
      subtitle: "Unimos la velocidad del SaaS Web2 con la transparencia y seguridad de los Smart Contracts Web3.",
      step1Title: "1. Validación On-Chain",
      step1Desc: "El talento no sube un CV vacío. Pasan pruebas de IA y reciben un <strong class=\"text-white\">SBT (Soulbound Token)</strong> inmutable que certifica sus habilidades reales.",
      step2Title: "2. Smart Match AI",
      step2Desc: "Nuestro algoritmo analiza el stack técnico de la empresa y los SBTs del talento para hacer el cruce perfecto en menos de 48 horas. Sin sesgos humanos.",
      step3Title: "3. Custodia (Escrow)",
      step3Desc: "La empresa deposita los fondos en un Smart Contract. El talento trabaja con seguridad. El pago se libera automáticamente tras la entrega."
    },
    engine: {
      tag: "Inteligencia Artificial",
      title: "El Motor de Reclutamiento <br />Definitivo",
      desc: "DAO Talent Hub despliega modelos cuánticos y LLMs predictivos para auditar no solo GitHub, sino contribuciones en Hugging Face, Kaggle, papers de arXiv y arquitecturas de computación cuántica. Construimos un perfil on-chain irrefutable del 1% del talento élite global, eliminando el riesgo de contratación.",
      bullet1: "Análisis predictivo de desempeño",
      bullet2: "Matching por cultura de código",
      bullet3: "Eliminación del 100% del sesgo de contratación",
      link: "Leer Whitepaper Técnico"
    },
    tokenomics: {
      title: "Gobierno y Recompensas On-Chain",
      subtitle: "El talento retiene el 100% de su valor. Los inversores financian el motor. Todos ganan con $TAL.",
      card1Title: "Reputación Líquida",
      card1Desc: "Cada proyecto finalizado exitosamente suma experiencia on-chain, aumentando el nivel de tu SBT y desbloqueando clientes premium.",
      card2Title: "Token $TAL Airdrops",
      card2Desc: "Early adopters, nodos validadores y talento Top 1% reciben airdrops periódicos y poder de voto sobre las comisiones de la DAO."
    },
    cta: {
      title: "Es hora de construir el futuro del trabajo.",
      btnB2B: "Soy Empresa",
      btnB2C: "Soy Talento"
    }
  },
  en: {
    socialProof: "Trusted by leading Web3 and Web2 companies",
    howItWorks: {
      title: "Frictionless Hiring, <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5]\">Zero Risk</span>",
      subtitle: "We merge the speed of Web2 SaaS with the transparency and security of Web3 Smart Contracts.",
      step1Title: "1. On-Chain Validation",
      step1Desc: "Talent doesn't upload empty CVs. They pass AI tests and receive an immutable <strong class=\"text-white\">SBT (Soulbound Token)</strong> that certifies their real skills.",
      step2Title: "2. Smart Match AI",
      step2Desc: "Our algorithm analyzes the company's tech stack and talent SBTs to make the perfect match in under 48 hours. Zero human bias.",
      step3Title: "3. Escrow Custody",
      step3Desc: "The company deposits funds in a Smart Contract. Talent works securely. Payment is released automatically upon delivery."
    },
    engine: {
      tag: "Artificial Intelligence",
      title: "The Ultimate <br />Recruitment Engine",
      desc: "DAO Talent Hub deploys quantum models and predictive LLMs to audit not just GitHub, but contributions on Hugging Face, Kaggle, arXiv papers, and quantum computing architectures. We build an irrefutable on-chain profile of the top 1% elite global talent, eliminating hiring risk.",
      bullet1: "Predictive performance analysis",
      bullet2: "Code culture matching",
      bullet3: "100% elimination of hiring bias",
      link: "Read Technical Whitepaper"
    },
    tokenomics: {
      title: "On-Chain Governance & Rewards",
      subtitle: "Talent retains 100% of their value. Investors fund the engine. Everyone wins with $TAL.",
      card1Title: "Liquid Reputation",
      card1Desc: "Each successfully completed project adds on-chain experience, leveling up your SBT and unlocking premium clients.",
      card2Title: "$TAL Token Airdrops",
      card2Desc: "Early adopters, validator nodes, and Top 1% talent receive periodic airdrops and voting power over DAO fees."
    },
    cta: {
      title: "It's time to build the future of work.",
      btnB2B: "I'm a Company",
      btnB2C: "I'm Talent"
    }
  },
  ru: {
    socialProof: "Нам доверяют ведущие компании Web3 и Web2",
    howItWorks: {
      title: "Найм без проблем, <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5]\">Ноль Рисков</span>",
      subtitle: "Мы объединяем скорость Web2 SaaS с прозрачностью и безопасностью смарт-контрактов Web3.",
      step1Title: "1. Ончейн-валидация",
      step1Desc: "Кандидаты не загружают пустые резюме. Они проходят тесты ИИ и получают неизменяемый <strong class=\"text-white\">SBT (Soulbound Token)</strong>, подтверждающий их реальные навыки.",
      step2Title: "2. Smart Match AI",
      step2Desc: "Наш алгоритм анализирует технологический стек компании и SBT талантов, чтобы создать идеальную пару менее чем за 48 часов. Никакой предвзятости.",
      step3Title: "3. Условное депонирование (Escrow)",
      step3Desc: "Компания депонирует средства в смарт-контракт. Талант работает в безопасности. Оплата производится автоматически после сдачи проекта."
    },
    engine: {
      tag: "Искусственный Интеллект",
      title: "Идеальная <br />Машина Рекрутинга",
      desc: "DAO Talent Hub развертывает квантовые модели и предиктивные LLM для аудита не только GitHub, но и вкладов на Hugging Face, Kaggle, публикаций arXiv и архитектур квантовых вычислений. Мы создаем неопровержимый ончейн-профиль 1% элитных талантов по всему миру, устраняя риски при найме.",
      bullet1: "Предиктивный анализ производительности",
      bullet2: "Совместимость по культуре кода",
      bullet3: "100% устранение предвзятости при найме",
      link: "Читать Технический Whitepaper"
    },
    tokenomics: {
      title: "Ончейн-управление и Вознаграждения",
      subtitle: "Таланты сохраняют 100% своей ценности. Инвесторы финансируют движок. Все выигрывают с $TAL.",
      card1Title: "Ликвидная Репутация",
      card1Desc: "Каждый успешно завершенный проект добавляет опыт ончейн, повышая уровень вашего SBT и открывая доступ к премиум-клиентам.",
      card2Title: "Аирдропы токена $TAL",
      card2Desc: "Ранние пользователи, узлы-валидаторы и 1% лучших талантов получают периодические аирдропы и право голоса по комиссиям DAO."
    },
    cta: {
      title: "Пришло время строить будущее работы.",
      btnB2B: "Я Компания",
      btnB2C: "Я Талант"
    }
  },
  zh: {
    socialProof: "深受领先 Web3 和 Web2 公司的信任",
    howItWorks: {
      title: "无摩擦招聘，<span class=\"text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5]\">零风险</span>",
      subtitle: "我们将 Web2 SaaS 的速度与 Web3 智能合约的透明度和安全性结合起来。",
      step1Title: "1. 链上验证",
      step1Desc: "人才不上传空洞的简历。他们通过 AI 测试并获得不可篡改的 <strong class=\"text-white\">SBT (灵魂绑定代币)</strong>，证明其真实技能。",
      step2Title: "2. 智能匹配 AI",
      step2Desc: "我们的算法分析公司的技术栈和人才的 SBT，在48小时内完成完美匹配。没有任何人为偏见。",
      step3Title: "3. 托管 (Escrow)",
      step3Desc: "公司将资金存入智能合约。人才安全地工作。项目交付后自动释放付款。"
    },
    engine: {
      tag: "人工智能",
      title: "终极<br />招聘引擎",
      desc: "DAO Talent Hub 部署量子模型和预测性 LLM，不仅审计 GitHub，还审计 Hugging Face、Kaggle、arXiv 论文和量子计算架构上的贡献。我们为全球前 1% 的精英人才构建无可辩驳的链上档案，消除招聘风险。",
      bullet1: "预测性绩效分析",
      bullet2: "代码文化匹配",
      bullet3: "100% 消除招聘偏见",
      link: "阅读技术白皮书"
    },
    tokenomics: {
      title: "链上治理与奖励",
      subtitle: "人才保留 100% 的价值。投资者为引擎提供资金。所有人通过 $TAL 获益。",
      card1Title: "流动声誉",
      card1Desc: "每个成功完成的项目都会增加链上经验，提升你的 SBT 等级并解锁优质客户。",
      card2Title: "$TAL 代币空投",
      card2Desc: "早期采用者、验证节点和排名前 1% 的人才将获得定期空投和对 DAO 费用的投票权。"
    },
    cta: {
      title: "是时候构建工作的未来了。",
      btnB2B: "我是公司",
      btnB2C: "我是人才"
    }
  },
  ko: {
    socialProof: "선도적인 Web3 및 Web2 기업의 신뢰",
    howItWorks: {
      title: "마찰 없는 채용, <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5]\">제로 리스크</span>",
      subtitle: "Web2 SaaS의 속도와 Web3 스마트 컨트랙트의 투명성 및 보안을 결합합니다.",
      step1Title: "1. 온체인 검증",
      step1Desc: "인재는 빈 이력서를 업로드하지 않습니다. 그들은 AI 테스트를 통과하고 실제 기술을 증명하는 변경 불가능한 <strong class=\"text-white\">SBT (소울바운드 토큰)</strong>를 받습니다.",
      step2Title: "2. 스마트 매치 AI",
      step2Desc: "당사의 알고리즘은 기업의 기술 스택과 인재의 SBT를 분석하여 48시간 이내에 완벽한 매칭을 만듭니다. 인간의 편견이 없습니다.",
      step3Title: "3. 에스크로 (Escrow)",
      step3Desc: "기업은 스마트 컨트랙트에 자금을 예치합니다. 인재는 안전하게 일합니다. 프로젝트가 완료되면 자동으로 결제가 해제됩니다."
    },
    engine: {
      tag: "인공 지능",
      title: "궁극의 <br />채용 엔진",
      desc: "DAO Talent Hub는 양자 모델과 예측 LLM을 배포하여 GitHub뿐만 아니라 Hugging Face, Kaggle, arXiv 논문 및 양자 컴퓨팅 아키텍처에 대한 기여도를 감사합니다. 우리는 글로벌 상위 1% 엘리트 인재에 대한 반박할 수 없는 온체인 프로필을 구축하여 채용 리스크를 제거합니다.",
      bullet1: "예측 성과 분석",
      bullet2: "코드 문화 매칭",
      bullet3: "채용 편견 100% 제거",
      link: "기술 백서 읽기"
    },
    tokenomics: {
      title: "온체인 거버넌스 및 보상",
      subtitle: "인재는 자신의 가치를 100% 유지합니다. 투자자는 엔진에 자금을 지원합니다. 모두가 $TAL로 승리합니다.",
      card1Title: "유동적 평판",
      card1Desc: "성공적으로 완료된 각 프로젝트는 온체인 경험을 추가하여 SBT 레벨을 높이고 프리미엄 클라이언트를 잠금 해제합니다.",
      card2Title: "$TAL 토큰 에어드랍",
      card2Desc: "초기 사용자, 검증자 노드 및 상위 1% 인재는 정기적인 에어드랍과 DAO 수수료에 대한 투표권을 받습니다."
    },
    cta: {
      title: "업무의 미래를 구축할 때입니다.",
      btnB2B: "기업용",
      btnB2C: "인재용"
    }
  }
};

const locales = ['es', 'en', 'ru', 'zh', 'ko'];

locales.forEach(locale => {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  let content = {};
  if (fs.existsSync(filePath)) {
    content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  
  if (!content.index) {
    content.index = {};
  }
  
  // Merge the new translations into content.index
  content.index.expanded = translations[locale];
  
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  console.log(`Updated ${locale}.json`);
});
