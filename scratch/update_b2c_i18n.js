const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join('c:', 'Users', 'Admin', 'OneDrive - THE HACIENDAS COMPANY (M365)', 'Documentos', 'CLAUDE CLAW', 'daotalenthubv5', 'messages');

const translations = {
  es: {
    authModal: {
      title: "Iniciar Sesión",
      subtitle: "Accede a tu plataforma B2B/B2C",
      loggedIn: "Sesión Iniciada",
      goToDash: "Ir al Dashboard",
      disconnect: "Desconectar",
      btnEmail: "Email / Google",
      btnEmailDesc: "Recomendado para B2C",
      btnGithub: "GitHub",
      btnGithubDesc: "Obligatorio para Validaciones",
      btnConnecting: "Conectando...",
      orWallet: "O usa tu Wallet Web3",
      walletDesc: "Wallet Descentralizada"
    },
    b2cDashboard: {
      title: "Panel de Talento B2C",
      subtitle: "Gestiona tu identidad, credenciales y misiones on-chain.",
      profile: {
        title: "Identidad & KYC",
        desc: "Completa tu perfil para acceder a mejores oportunidades B2B.",
        btn: "Ir a Perfil"
      },
      passport: {
        title: "Talent Passport (SBT)",
        desc: "Tus credenciales y habilidades validadas por IA en la cadena.",
        btn: "Ver Credenciales"
      },
      missions: {
        title: "Mission Center",
        desc: "Encuentra retos técnicos y bounties publicados por empresas B2B.",
        btn: "Explorar Misiones"
      },
      staking: {
        title: "Staking $TAL",
        desc: "Haz stake de tus tokens para ganar recompensas y aumentar tu multiplicador de Match Score.",
        btn: "Gestionar Staking"
      }
    }
  },
  en: {
    authModal: {
      title: "Sign In",
      subtitle: "Access your B2B/B2C platform",
      loggedIn: "Signed In",
      goToDash: "Go to Dashboard",
      disconnect: "Disconnect",
      btnEmail: "Email / Google",
      btnEmailDesc: "Recommended for B2C",
      btnGithub: "GitHub",
      btnGithubDesc: "Required for Validations",
      btnConnecting: "Connecting...",
      orWallet: "Or use your Web3 Wallet",
      walletDesc: "Decentralized Wallet"
    },
    b2cDashboard: {
      title: "B2C Talent Panel",
      subtitle: "Manage your identity, credentials, and on-chain missions.",
      profile: {
        title: "Identity & KYC",
        desc: "Complete your profile to access better B2B opportunities.",
        btn: "Go to Profile"
      },
      passport: {
        title: "Talent Passport (SBT)",
        desc: "Your AI-validated credentials and skills on-chain.",
        btn: "View Credentials"
      },
      missions: {
        title: "Mission Center",
        desc: "Find technical challenges and bounties posted by B2B companies.",
        btn: "Explore Missions"
      },
      staking: {
        title: "$TAL Staking",
        desc: "Stake your tokens to earn rewards and increase your Match Score multiplier.",
        btn: "Manage Staking"
      }
    }
  },
  ru: {
    authModal: {
      title: "Войти",
      subtitle: "Доступ к платформе B2B/B2C",
      loggedIn: "Вы вошли",
      goToDash: "Перейти в панель",
      disconnect: "Отключиться",
      btnEmail: "Email / Google",
      btnEmailDesc: "Рекомендуется для B2C",
      btnGithub: "GitHub",
      btnGithubDesc: "Обязательно для проверок",
      btnConnecting: "Подключение...",
      orWallet: "Или используйте Web3 Wallet",
      walletDesc: "Децентрализованный кошелек"
    },
    b2cDashboard: {
      title: "Панель талантов B2C",
      subtitle: "Управляйте своей личностью, учетными данными и миссиями on-chain.",
      profile: {
        title: "Личность и KYC",
        desc: "Заполните профиль для доступа к лучшим B2B-возможностям.",
        btn: "Перейти в профиль"
      },
      passport: {
        title: "Talent Passport (SBT)",
        desc: "Ваши учетные данные и навыки, проверенные ИИ on-chain.",
        btn: "Смотреть учетные данные"
      },
      missions: {
        title: "Mission Center",
        desc: "Находите технические задачи и баунти от B2B-компаний.",
        btn: "Смотреть миссии"
      },
      staking: {
        title: "Стейкинг $TAL",
        desc: "Вносите токены в стейкинг, чтобы зарабатывать вознаграждения и увеличивать свой Match Score.",
        btn: "Управление стейкингом"
      }
    }
  },
  zh: {
    authModal: {
      title: "登录",
      subtitle: "访问您的 B2B/B2C 平台",
      loggedIn: "已登录",
      goToDash: "转到仪表板",
      disconnect: "断开连接",
      btnEmail: "电子邮件 / Google",
      btnEmailDesc: "B2C 推荐",
      btnGithub: "GitHub",
      btnGithubDesc: "验证所必需",
      btnConnecting: "正在连接...",
      orWallet: "或使用您的 Web3 钱包",
      walletDesc: "去中心化钱包"
    },
    b2cDashboard: {
      title: "B2C 人才面板",
      subtitle: "管理您的身份、凭证和链上任务。",
      profile: {
        title: "身份与 KYC",
        desc: "完善您的个人资料以获得更好的 B2B 机会。",
        btn: "转到个人资料"
      },
      passport: {
        title: "人才护照 (SBT)",
        desc: "您的 AI 验证凭证和链上技能。",
        btn: "查看凭证"
      },
      missions: {
        title: "任务中心",
        desc: "查找 B2B 公司发布的重难点挑战和悬赏。",
        btn: "探索任务"
      },
      staking: {
        title: "$TAL 质押",
        desc: "质押您的代币以赚取奖励并增加您的匹配分数乘数。",
        btn: "管理质押"
      }
    }
  },
  ko: {
    authModal: {
      title: "로그인",
      subtitle: "B2B/B2C 플랫폼에 접속하세요",
      loggedIn: "로그인됨",
      goToDash: "대시보드로 이동",
      disconnect: "연결 해제",
      btnEmail: "이메일 / Google",
      btnEmailDesc: "B2C 권장",
      btnGithub: "GitHub",
      btnGithubDesc: "검증에 필수",
      btnConnecting: "연결 중...",
      orWallet: "또는 Web3 지갑 사용",
      walletDesc: "탈중앙화 지갑"
    },
    b2cDashboard: {
      title: "B2C 인재 패널",
      subtitle: "신원, 자격 증명 및 온체인 임무를 관리하세요.",
      profile: {
        title: "신원 및 KYC",
        desc: "프로필을 완성하여 더 나은 B2B 기회에 접근하세요.",
        btn: "프로필로 이동"
      },
      passport: {
        title: "인재 여권 (SBT)",
        desc: "AI가 검증한 온체인 자격 증명 및 기술.",
        btn: "자격 증명 보기"
      },
      missions: {
        title: "미션 센터",
        desc: "B2B 기업이 게시한 기술 과제 및 현상금을 찾으세요.",
        btn: "미션 탐색"
      },
      staking: {
        title: "$TAL 스테이킹",
        desc: "토큰을 스테이킹하여 보상을 얻고 매치 점수 배수를 높이세요.",
        btn: "스테이킹 관리"
      }
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
  
  if (!content.b2cV2) {
    content.b2cV2 = {};
  }
  
  content.b2cV2 = translations[locale];
  
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  console.log(`Updated ${locale}.json with b2cV2`);
});
