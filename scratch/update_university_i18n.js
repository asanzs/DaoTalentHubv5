const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join('c:', 'Users', 'Admin', 'OneDrive - THE HACIENDAS COMPANY (M365)', 'Documentos', 'CLAUDE CLAW', 'daotalenthubv5', 'messages');

const translations = {
  es: {
    hub: {
      title: "Hub Universitario DAO",
      subtitle: "Aprende para ganar. Enseña para multiplicar. La academia Web3 gobernada por el talento.",
      students: {
        title: "Alumnos (Learn-to-Earn)",
        desc: "Domina las tecnologías más demandadas por el mercado B2B.",
        course1: "Ruta Web3 & Smart Contracts",
        course2: "Fundamentos de IA y LLMs",
        badge: "Subvencionado por tus comisiones futuras",
        btn: "Iniciar Ruta"
      },
      teachers: {
        title: "Profesores (Teach-to-Earn)",
        desc: "Monetiza tu conocimiento creando contenido para la próxima generación de élite.",
        lockText: "Requiere SBT Nivel Senior Validado",
        btn: "Crea tu Academia y Gana $TAL"
      }
    },
    course: {
      backBtn: "Volver al Hub",
      titleM1: "Desarrollo de Smart Contracts Avanzados",
      titleAI: "Fundamentos de Inteligencia Artificial",
      desc: "Completa este módulo para obtener tu credencial SBT inmutable. Las empresas buscan activamente talento con esta certificación y los Match Scores aumentan en un 40%.",
      challengeTitle: "Reto Final: Verificación por IA",
      challengeDesc: "Escribe un contrato inteligente seguro que pase todas las aserciones de nuestro Auditor de IA.",
      placeholder: "// Conecta tu entorno para ser auditado por la IA...",
      btnConnect: "Conectar GitHub / DevEnv",
      btnConnecting: "Conectando Entorno...",
      btnAudit: "Enviar Código al Agente IA",
      btnAuditing: "La IA está auditando tu código...",
      modalSuccess: "¡Auditoría Superada! 100/100",
      modalDesc: "Tu código es matemáticamente seguro. Hemos minteado tu credencial (SBT) en Base Network. Las empresas B2B ahora pueden verte como Talento Verificado.",
      btnDashboard: "Ir al Dashboard B2C",
      sidebarTitle: "Contenido del Curso",
      unlockPass: "Desbloquea todos los módulos con el Pase Fundador.",
      btnPass: "Ver Suscripción Fundador"
    }
  },
  en: {
    hub: {
      title: "DAO University Hub",
      subtitle: "Learn to earn. Teach to multiply. The Web3 academy governed by talent.",
      students: {
        title: "Students (Learn-to-Earn)",
        desc: "Master the most in-demand technologies by the B2B market.",
        course1: "Web3 & Smart Contracts Path",
        course2: "AI & LLMs Fundamentals",
        badge: "Subsidized by your future commissions",
        btn: "Start Path"
      },
      teachers: {
        title: "Teachers (Teach-to-Earn)",
        desc: "Monetize your knowledge by creating content for the next elite generation.",
        lockText: "Requires Validated Senior Level SBT",
        btn: "Create your Academy & Earn $TAL"
      }
    },
    course: {
      backBtn: "Back to Hub",
      titleM1: "Advanced Smart Contract Development",
      titleAI: "Artificial Intelligence Fundamentals",
      desc: "Complete this module to get your immutable SBT credential. Companies actively seek talent with this certification, boosting Match Scores by 40%.",
      challengeTitle: "Final Challenge: AI Verification",
      challengeDesc: "Write a secure smart contract that passes all assertions of our AI Auditor.",
      placeholder: "// Connect your environment to be audited by AI...",
      btnConnect: "Connect GitHub / DevEnv",
      btnConnecting: "Connecting Environment...",
      btnAudit: "Send Code to AI Agent",
      btnAuditing: "AI is auditing your code...",
      modalSuccess: "Audit Passed! 100/100",
      modalDesc: "Your code is mathematically secure. We've minted your SBT credential on Base Network. B2B companies can now see you as Verified Talent.",
      btnDashboard: "Go to B2C Dashboard",
      sidebarTitle: "Course Content",
      unlockPass: "Unlock all modules with the Founder Pass.",
      btnPass: "View Founder Subscription"
    }
  },
  ru: {
    hub: {
      title: "DAO University Hub",
      subtitle: "Учись, чтобы зарабатывать. Преподавай, чтобы преумножать. Академия Web3 под управлением талантов.",
      students: {
        title: "Студенты (Learn-to-Earn)",
        desc: "Освойте технологии, наиболее востребованные на рынке B2B.",
        course1: "Путь Web3 и Смарт-контракты",
        course2: "Основы ИИ и LLM",
        badge: "Субсидируется вашими будущими комиссиями",
        btn: "Начать Путь"
      },
      teachers: {
        title: "Преподаватели (Teach-to-Earn)",
        desc: "Монетизируйте свои знания, создавая контент для следующего элитного поколения.",
        lockText: "Требуется Подтвержденный SBT Уровня Senior",
        btn: "Создать Академию и Заработать $TAL"
      }
    },
    course: {
      backBtn: "Вернуться в Hub",
      titleM1: "Продвинутая разработка смарт-контрактов",
      titleAI: "Основы искусственного интеллекта",
      desc: "Завершите этот модуль, чтобы получить свою неизменяемую учетную запись SBT. Компании активно ищут таланты с этим сертификатом (Match Score +40%).",
      challengeTitle: "Финальный вызов: ИИ-верификация",
      challengeDesc: "Напишите безопасный смарт-контракт, который пройдет все проверки нашего ИИ-аудитора.",
      placeholder: "// Подключите свою среду для ИИ-аудита...",
      btnConnect: "Подключить GitHub / DevEnv",
      btnConnecting: "Подключение среды...",
      btnAudit: "Отправить код ИИ-Агенту",
      btnAuditing: "ИИ проверяет ваш код...",
      modalSuccess: "Аудит пройден! 100/100",
      modalDesc: "Ваш код математически безопасен. Мы отчеканили ваш SBT в Base Network. Компании B2B теперь видят вас как проверенного таланта.",
      btnDashboard: "Перейти в B2C Dashboard",
      sidebarTitle: "Содержание курса",
      unlockPass: "Разблокируйте все модули с Founder Pass.",
      btnPass: "Посмотреть Подписку Founder"
    }
  },
  zh: {
    hub: {
      title: "DAO 大学中心",
      subtitle: "边学边赚。边教边增值。由人才治理的 Web3 学院。",
      students: {
        title: "学生 (Learn-to-Earn)",
        desc: "掌握 B2B 市场最抢手的技术。",
        course1: "Web3 & 智能合约路径",
        course2: "AI 和 LLM 基础",
        badge: "由您未来的佣金补贴",
        btn: "开始路径"
      },
      teachers: {
        title: "教师 (Teach-to-Earn)",
        desc: "通过为下一代精英创建内容来将您的知识变现。",
        lockText: "需要验证高级别 SBT",
        btn: "创建您的学院并赚取 $TAL"
      }
    },
    course: {
      backBtn: "返回中心",
      titleM1: "高级智能合约开发",
      titleAI: "人工智能基础",
      desc: "完成此模块以获取您不可篡改的 SBT 凭证。企业积极寻找具有此认证的人才，匹配分数提高 40%。",
      challengeTitle: "最终挑战：AI 验证",
      challengeDesc: "编写一个安全的智能合约，通过我们的 AI 审计员的所有断言。",
      placeholder: "// 连接您的环境以进行 AI 审计...",
      btnConnect: "连接 GitHub / DevEnv",
      btnConnecting: "正在连接环境...",
      btnAudit: "将代码发送给 AI 代理",
      btnAuditing: "AI 正在审计您的代码...",
      modalSuccess: "审计通过！ 100/100",
      modalDesc: "您的代码在数学上是安全的。我们在 Base Network 铸造了您的凭证 (SBT)。B2B 企业现在将您视为经过验证的人才。",
      btnDashboard: "转到 B2C 仪表板",
      sidebarTitle: "课程内容",
      unlockPass: "使用创始人通行证解锁所有模块。",
      btnPass: "查看创始人订阅"
    }
  },
  ko: {
    hub: {
      title: "DAO 대학 허브",
      subtitle: "배우면서 수익을 창출하세요. 가르치면서 가치를 높이세요. 인재가 관리하는 Web3 아카데미.",
      students: {
        title: "학생 (Learn-to-Earn)",
        desc: "B2B 시장에서 가장 수요가 많은 기술을 마스터하세요.",
        course1: "Web3 및 스마트 컨트랙트 경로",
        course2: "AI 및 LLM 기초",
        badge: "미래의 커미션으로 보조금 지원",
        btn: "경로 시작"
      },
      teachers: {
        title: "강사 (Teach-to-Earn)",
        desc: "차세대 엘리트 인재를 위한 콘텐츠를 제작하여 지식을 수익화하세요.",
        lockText: "검증된 시니어 레벨 SBT 필요",
        btn: "아카데미 개설 및 $TAL 획득"
      }
    },
    course: {
      backBtn: "허브로 돌아가기",
      titleM1: "고급 스마트 컨트랙트 개발",
      titleAI: "인공 지능 기초",
      desc: "이 모듈을 완료하여 변경 불가능한 SBT 자격 증명을 얻으세요. 기업들은 이 인증을 가진 인재를 적극적으로 찾고 있으며 매치 점수가 40% 증가합니다.",
      challengeTitle: "최종 과제: AI 검증",
      challengeDesc: "당사의 AI 감사기의 모든 검증을 통과하는 안전한 스마트 컨트랙트를 작성하세요.",
      placeholder: "// AI 감사를 받으려면 개발 환경을 연결하세요...",
      btnConnect: "GitHub / DevEnv 연결",
      btnConnecting: "환경 연결 중...",
      btnAudit: "AI 에이전트에 코드 보내기",
      btnAuditing: "AI가 코드를 감사 중입니다...",
      modalSuccess: "감사 통과! 100/100",
      modalDesc: "당신의 코드는 수학적으로 안전합니다. Base Network에서 SBT 자격 증명을 생성했습니다. B2B 기업들은 이제 당신을 검증된 인재로 봅니다.",
      btnDashboard: "B2C 대시보드로 이동",
      sidebarTitle: "코스 내용",
      unlockPass: "창립자 패스로 모든 모듈을 잠금 해제하세요.",
      btnPass: "창립자 구독 보기"
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
  
  if (!content.universityV2) {
    content.universityV2 = {};
  }
  
  content.universityV2 = translations[locale];
  
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  console.log(`Updated ${locale}.json with universityV2`);
});
