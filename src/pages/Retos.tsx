import { useState } from 'react';
import { Trophy, Target, Award, CheckCircle, Clock, Crown, Gift as GiftIcon, Star, ShoppingBag, TrendingUp, Users, Zap } from 'lucide-react';
import { useApp, type Challenge } from '../context/AppContext';
import './Retos.css';

const levelConfig = {
  Bronce: { 
    color: '#cd7f32', 
    gradient: 'linear-gradient(135deg, #cd7f32, #8b5a2b)', 
    icon: '🥉', 
    minSpend: 0,
    spendLabel: '0€',
    benefits: ['1 punto por cada € gastado', 'Ofertas exclusivas miembros', 'Puntos de bienvenida: 50'],
  },
  Plata: { 
    color: '#94a3b8', 
    gradient: 'linear-gradient(135deg, #94a3b8, #64748b)', 
    icon: '🥈', 
    minSpend: 200,
    spendLabel: '200€',
    benefits: ['1.2 puntos por €', 'Envío gratis (+30€)', 'Acceso a productos canjeables'],
  },
  Oro: { 
    color: '#eab308', 
    gradient: 'linear-gradient(135deg, #eab308, #ca8a04)', 
    icon: '🥇', 
    minSpend: 500,
    spendLabel: '500€',
    benefits: ['1.5 puntos por €', 'Envío gratis siempre', 'Más productos canjeables'],
  },
  Platino: { 
    color: '#64748b', 
    gradient: 'linear-gradient(135deg, #64748b, #334155)', 
    icon: '💎', 
    minSpend: 1500,
    spendLabel: '1.500€',
    benefits: ['2 puntos por €', 'Envío express gratis', 'Productos premium canjeables'],
  },
  Esmeralda: { 
    color: '#10b981', 
    gradient: 'linear-gradient(135deg, #10b981, #059669)', 
    icon: '💚', 
    minSpend: 3000,
    spendLabel: '3.000€',
    benefits: ['2.5 puntos por €', 'Envío express 24h', 'Productos exclusivos', 'Early access a ofertas'],
  },
  Diamante: { 
    color: '#06b6d4', 
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)', 
    icon: '✨', 
    minSpend: 5000,
    spendLabel: '5.000€',
    benefits: ['3 puntos por €', 'Envío express 24h gratis', 'Asesoramiento personal', 'Invitaciones VIP', 'Productos únicos'],
  },
};

const howItWorks = [
  { icon: '🛒', title: 'Compra', description: 'Gasta 1€ y earn 1 punto' },
  { icon: '📈', title: 'Sube nivel', description: 'Más puntos = mejores beneficios' },
  { icon: '🎁', title: 'Canjea', description: 'Usa puntos por descuentos y productos' },
];

const rewards = [
  { id: 1, name: 'Bálsamo labial', points: 150, icon: '💋', description: 'Variedad de sabores', category: 'bebe-mama', stock: 50 },
  { id: 2, name: 'Gel hidroalcoholico 50ml', points: 200, icon: '🧴', description: 'Pack de 2 unidades', category: 'higiene', stock: 100 },
  { id: 3, name: 'Protector solar mini 30ml', points: 350, icon: '☀️', description: 'SPF 50, travel size', category: 'solar', stock: 30 },
  { id: 4, name: 'Colirio monodosis', points: 250, icon: '👁️', description: 'Alivio ojos secos', category: 'optica', stock: 80 },
  { id: 5, name: 'Tiritas pack 20u', points: 100, icon: '🩹', description: 'Variados colores', category: 'primeros-auxilios', stock: 200 },
  { id: 6, name: 'Spray nasal', points: 180, icon: '👃', description: 'Alivio congestión', category: 'medicamentos', stock: 60 },
  { id: 7, name: 'Pastillas garganta', points: 120, icon: '🫁', description: 'Pack de 3 blisters', category: 'medicamentos', stock: 150 },
  { id: 8, name: 'Compresa post-parto', points: 200, icon: '👶', description: 'Pack de 10 unidades', category: 'bebe-mama', stock: 40 },
  { id: 9, name: 'Termómetro digital', points: 500, icon: '🌡️', description: 'Rápido y preciso', category: 'primeros-auxilios', stock: 25 },
  { id: 10, name: 'Pasta dental infantil', points: 180, icon: '🦷', description: 'Sabor frutal', category: 'higiene', stock: 70 },
  { id: 11, name: 'Chupete neonatal', points: 250, icon: '🍼', description: 'Silicona медицинская', category: 'bebe-mama', stock: 35 },
  { id: 12, name: 'Gasa estéril 5u', points: 80, icon: '🩺', description: '10x10cm', category: 'primeros-auxilios', stock: 300 },
  { id: 13, name: 'Pañuelos desechables', points: 90, icon: '🧻', description: 'Pack de 3 cajas', category: 'higiene', stock: 180 },
  { id: 14, name: 'Crema manos', points: 220, icon: '✋', description: 'Hidratante intensiva', category: 'cosmetica-belleza', stock: 50 },
  { id: 15, name: 'Bolsa frío instantáneo', points: 300, icon: '❄️', description: 'Para lesiones', category: 'primeros-auxilios', stock: 45 },
];

const typeIcons: Record<string, string> = {
  daily: '📅',
  weekly: '📆',
  purchase: '🛒',
  referral: '👥',
  streak: '🔥',
};

export default function Retos() {
  const { user, challenges, completeChallenge } = useApp();
  const [activeTab, setActiveTab] = useState<'desafios' | 'canjes' | 'niveles'>('desafios');

  const currentLevel = user.level || 'Bronce';
  const levelData = levelConfig[currentLevel as keyof typeof levelConfig];
  
  const nextLevel = currentLevel === 'Bronce' ? 'Plata' : 
                    currentLevel === 'Plata' ? 'Oro' : 
                    currentLevel === 'Oro' ? 'Platino' : 
                    currentLevel === 'Platino' ? 'Esmeralda' :
                    currentLevel === 'Esmeralda' ? 'Diamante' : null;
  const nextLevelData = nextLevel ? levelConfig[nextLevel as keyof typeof levelConfig] : null;
  
  const currentSpend = user.totalPoints;
  const pointsToNextLevel = nextLevelData ? nextLevelData.minSpend - currentSpend : 0;
  const progressToNext = nextLevelData ? ((currentSpend - levelData.minSpend) / (nextLevelData.minSpend - levelData.minSpend)) * 100 : 100;
  
  const dailyChallenges = challenges.filter(c => c.type === 'daily');
  const weeklyChallenges = challenges.filter(c => c.type === 'weekly');
  const purchaseChallenges = challenges.filter(c => c.type === 'purchase');

  const unlockedAchievements = user.achievements.filter(a => a.unlocked);
  const lockedAchievements = user.achievements.filter(a => !a.unlocked);

  const getPointsMultiplier = (level: string): number => {
    switch(level) {
      case 'Bronce': return 1;
      case 'Plata': return 1.2;
      case 'Oro': return 1.5;
      case 'Platino': return 2;
      case 'Esmeralda': return 2.5;
      case 'Diamante': return 3;
      default: return 1;
    }
  };

  const handleRedeem = (_rewardId: number) => {
    alert('¡Premio canjeado! Recibirás tu código por email.');
  };

  return (
    <div className="page-container retos-page">
      {/* Hero Banner */}
      <div className="club-hero" style={{ '--level-gradient': levelData.gradient } as React.CSSProperties}>
        <div className="club-hero-content">
          <div className="club-level-badge">
            <span className="level-icon">{levelData.icon}</span>
            <span className="level-name">{currentLevel}</span>
          </div>
          <h1>MF POINTS</h1>
          <p className="club-tagline">Gana puntos con cada compra y canjéalos por premios exclusivos</p>
          
          <div className="club-stats">
            <div className="stat-box">
              <span className="stat-value">{user.totalPoints.toLocaleString()}</span>
              <span className="stat-label">Puntos Totales</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{user.streak}</span>
              <span className="stat-label">Días de Racha</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{unlockedAchievements.length}</span>
              <span className="stat-label">Logros</span>
            </div>
          </div>
        </div>
        
        {nextLevelData && (
            <div className="next-level-card">
            <div className="next-level-header">
              <Crown size={18} />
              <span>Siguiente nivel: {nextLevel}</span>
            </div>
            <div className="progress-bar-wrapper">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.min(progressToNext, 100)}%` }}></div>
              </div>
              <span className="progress-text">{pointsToNextLevel > 0 ? `¡Gasta ${pointsToNextLevel}€ más para alcanzar ${nextLevel}!` : `¡Has alcanzado el nivel ${nextLevel}!`}</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="club-tabs">
        <button 
          className={`tab-btn ${activeTab === 'desafios' ? 'active' : ''}`}
          onClick={() => setActiveTab('desafios')}
        >
          <Target size={18} />
          Desafíos
        </button>
        <button 
          className={`tab-btn ${activeTab === 'canjes' ? 'active' : ''}`}
          onClick={() => setActiveTab('canjes')}
        >
          <GiftIcon size={18} />
          Canjea tus Puntos
        </button>
        <button 
          className={`tab-btn ${activeTab === 'niveles' ? 'active' : ''}`}
          onClick={() => setActiveTab('niveles')}
        >
          <Crown size={18} />
          Niveles y Beneficios
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'desafios' && (
        <div className="tab-content">
          {/* Purchase Challenges */}
          <section className="challenges-section">
            <div className="section-header">
              <h2><Target size={20} /> Retos por Compra</h2>
            </div>
            <div className="challenges-grid">
              {purchaseChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} onComplete={completeChallenge} />
              ))}
            </div>
          </section>

          {/* Daily Challenges */}
          <section className="challenges-section">
            <div className="section-header">
              <h2><Clock size={20} /> Retos Diarios</h2>
              <span className="expires-tag">¡Vence hoy!</span>
            </div>
            <div className="challenges-grid">
              {dailyChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} onComplete={completeChallenge} />
              ))}
            </div>
          </section>

          {/* Weekly Challenges */}
          <section className="challenges-section">
            <div className="section-header">
              <h2><Award size={20} /> Retos Semanales</h2>
            </div>
            <div className="challenges-list">
              {weeklyChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} onComplete={completeChallenge} horizontal />
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section className="challenges-section">
            <div className="section-header">
              <h2><Trophy size={20} /> Tus Logros</h2>
            </div>
            <div className="achievements-grid">
              {unlockedAchievements.map(achievement => (
                <div key={achievement.id} className="achievement-card unlocked">
                  <span className="achievement-icon">{achievement.icon}</span>
                  <div className="achievement-info">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                  <CheckCircle size={20} className="unlocked-check" />
                </div>
              ))}
              {lockedAchievements.map(achievement => (
                <div key={achievement.id} className="achievement-card locked">
                  <span className="achievement-icon">{achievement.icon}</span>
                  <div className="achievement-info">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                    {achievement.progress !== undefined && achievement.maxProgress && (
                      <div className="achievement-progress">
                        <div className="mini-progress">
                          <div className="mini-progress-fill" style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}></div>
                        </div>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'canjes' && (
        <div className="tab-content">
          <section className="rewards-section">
            <div className="section-header">
              <h2><GiftIcon size={20} /> Canjea tus Puntos</h2>
              <span className="points-balance">Tienes <strong>{user.totalPoints}</strong> puntos</span>
            </div>
            <div className="rewards-grid">
              {rewards.map(reward => (
                <div key={reward.id} className="reward-card">
                  <span className="reward-icon">{reward.icon}</span>
                  <div className="reward-details">
                    <h4>{reward.name}</h4>
                    <p>{reward.description}</p>
                  </div>
                  <button 
                    className={`redeem-btn ${user.totalPoints >= reward.points ? '' : 'disabled'}`}
                    onClick={() => handleRedeem(reward.id)}
                    disabled={user.totalPoints < reward.points}
                  >
                    {reward.points} pts
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'niveles' && (
        <div className="tab-content">
          <section className="levels-section">
            <div className="section-header">
              <h2><Crown size={20} /> Niveles y Beneficios</h2>
            </div>
            
            <div className="levels-showcase">
              {Object.entries(levelConfig).map(([level, data]) => (
                <div 
                  key={level} 
                  className={`level-card ${currentLevel === level ? 'current' : ''} ${levelConfig[currentLevel as keyof typeof levelConfig].minPoints < data.minPoints ? 'locked' : ''}`}
                >
                  <div className="level-header" style={{ background: data.gradient }}>
                    <span className="level-icon-large">{data.icon}</span>
                    <h3>{level}</h3>
                    {currentLevel === level && <span className="current-badge">Tu nivel</span>}
                  </div>
                  <div className="level-benefits">
                    <ul>
                      {benefitsByLevel[level as keyof typeof benefitsByLevel].map((benefit, i) => (
                        <li key={i}>
                          <CheckCircle size={14} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="level-requirement">
                    <span>Desde {data.minPoints.toLocaleString()} puntos</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function ChallengeCard({ challenge, onComplete, horizontal = false }: { 
  challenge: Challenge; 
  onComplete: (id: string) => void;
  horizontal?: boolean;
}) {
  const progress = Math.min((challenge.progress / challenge.target) * 100, 100);

  if (horizontal) {
    return (
      <div className={`challenge-card horizontal ${challenge.completed ? 'completed' : ''}`}>
        <span className="challenge-icon">{typeIcons[challenge.type]}</span>
        <div className="challenge-content">
          <h4>{challenge.title}</h4>
          <p>{challenge.description}</p>
          {challenge.reward && <span className="reward-badge">🎁 {challenge.reward}</span>}
        </div>
        <div className="challenge-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span>{challenge.progress}/{challenge.target}</span>
        </div>
        <div className="challenge-action">
          <span className="points-value">+{challenge.points} pts</span>
          {challenge.completed ? (
            <CheckCircle size={24} className="completed-icon" />
          ) : (
            <button onClick={() => onComplete(challenge.id)} className="complete-btn">
              Completar
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`challenge-card ${challenge.completed ? 'completed' : ''}`}>
      <div className="challenge-top">
        <span className="challenge-icon">{typeIcons[challenge.type]}</span>
        <span className="points-badge">+{challenge.points} pts</span>
      </div>
      <h4>{challenge.title}</h4>
      <p>{challenge.description}</p>
      <div className="challenge-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span>{challenge.progress}/{challenge.target}</span>
      </div>
      {challenge.completed && (
        <div className="completed-overlay">
          <CheckCircle size={24} />
          <span>Completado</span>
        </div>
      )}
    </div>
  );
}
