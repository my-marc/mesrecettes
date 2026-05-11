import { useState } from "react";

const dishes = [
  {
    id: 1,
    name: "Saumon glacé miel & gingembre",
    subtitle: "Riz • Courgettes • Sauce asiatique",
    time: "25 min",
    servings: 2,
    difficulty: "Facile",
    calories: "722 kcal",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
    tags: ["Poisson", "Asiatique", "Équilibré"],
    ingredients: [
      { item: "Riz", qty: "150 g" },
      { item: "Filets de saumon avec peau", qty: "2 pièces" },
      { item: "Courgette", qty: "2 pièces" },
      { item: "Sauce asiatique sucrée", qty: "1 sachet" },
      { item: "Purée de gingembre", qty: "1 sachet" },
      { item: "Oignon", qty: "1 pièce" },
      { item: "Gousse d'ail", qty: "1 pièce" },
      { item: "Cube de bouillon de légumes", qty: "½ pièce" },
      { item: "Graines de sésame", qty: "1 sachet" },
      { item: "Miel", qty: "2 cc" },
      { item: "Beurre", qty: "2 cs" },
      { item: "Huile de tournesol", qty: "selon goût" },
      { item: "Poivre et sel", qty: "selon goût" },
    ],
    steps: [
      {
        num: 1,
        title: "L'art de la découpe",
        desc: "Veillez à bien respecter les quantités indiquées à gauche pour préparer votre recette. Préchauffez votre four à 200°C sur le mode grill. Émincez finement l'oignon. Portez une grande casserole d'eau salée à ébullition pour le riz. Râpez l'ail. Ciselez finement l'oignon. Coupez les courgettes en fines demi-lunes.",
      },
      {
        num: 2,
        title: "Le riz en ébullition",
        desc: "Faites cuire le riz 12–14 min dans la casserole, ou jusqu'à ce qu'il soit tendre. Égouttez-le, ajoutez la moitié de la quantité indiquée de purée de gingembre (à ajuster selon votre goût) ainsi qu'une noisette de beurre et réservez-le à couvert jusqu'au service.",
      },
      {
        num: 3,
        title: "On enfourne le poisson",
        desc: "Dans un bol, mélangez le reste de la purée de gingembre avec la sauce asiatique sucrée, 1 cc de miel et 1½ cs d'eau par personne. Badigeonnez avec un pinceau les filets de saumon avec un peu de la sauce, puis roulez-les de tous les côtés, sauf côté peau, dans les graines de sésame jusqu'à ce qu'ils soient enrobés. Placez les filets de saumon dans un plat à four. Enfournez-les 10–12 min, selon l'épaisseur des filets, ou jusqu'à ce qu'ils soient cuits à cœur.",
      },
      {
        num: 4,
        title: "Ding, c'est prêt !",
        desc: "Dans une poêle, faites chauffer un filet d'huile de tournesol. Ajoutez l'oignon, les courgettes et l'ail et faites-les cuire 7–8 min à feu moyen, jusqu'à ce qu'elles deviennent fondantes. Remuez. Servez le riz et les courgettes dans les assiettes. Placez le saumon par-dessus et répartissez le reste de la sauce dans les assiettes.",
      },
    ],
  },
];

const VIEWS = { HOME: "home", RECIPE: "recipe", SHOPPING: "shopping" };

export default function App() {
  const [view, setView] = useState(VIEWS.HOME);
  const [selected, setSelected] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [checked, setChecked] = useState({});

  const openDish = (dish) => {
    setSelected(dish);
    setActiveStep(0);
    setChecked({});
    setView(VIEWS.RECIPE);
  };

  const toggleCheck = (i) =>
    setChecked((p) => ({ ...p, [i]: !p[i] }));

  const checkedCount = selected
    ? Object.values(checked).filter(Boolean).length
    : 0;

  return (
    <div style={styles.root}>
      {/* ── HEADER ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          {view !== VIEWS.HOME ? (
            <button style={styles.backBtn} onClick={() => setView(VIEWS.HOME)}>
              ← Retour
            </button>
          ) : (
            <span style={styles.logo}>🍽 MesRecettes</span>
          )}
          {view === VIEWS.RECIPE && selected && (
            <button
              style={styles.shoppingBtn}
              onClick={() => setView(VIEWS.SHOPPING)}
            >
              🛒 Liste de courses
            </button>
          )}
          {view === VIEWS.SHOPPING && selected && (
            <span style={styles.shoppingCount}>
              {checkedCount}/{selected.ingredients.length} articles
            </span>
          )}
        </div>
      </header>

      {/* ══ HOME ══ */}
      {view === VIEWS.HOME && (
        <main style={styles.main}>
          <div style={styles.hero}>
            <h1 style={styles.heroTitle}>Qu'est-ce qu'on<br />mange ce soir ?</h1>
            <p style={styles.heroSub}>Choisissez un plat, obtenez la recette et la liste de courses.</p>
          </div>

          <div style={styles.grid}>
            {dishes.map((dish) => (
              <button key={dish.id} style={styles.card} onClick={() => openDish(dish)}>
                <div style={styles.cardImgWrap}>
                  <img src={dish.image} alt={dish.name} style={styles.cardImg} />
                  <div style={styles.cardOverlay} />
                  <div style={styles.cardBadges}>
                    {dish.tags.map((t) => (
                      <span key={t} style={styles.badge}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={styles.cardBody}>
                  <h2 style={styles.cardName}>{dish.name}</h2>
                  <p style={styles.cardSub}>{dish.subtitle}</p>
                  <div style={styles.cardMeta}>
                    <span style={styles.metaItem}>⏱ {dish.time}</span>
                    <span style={styles.metaItem}>👤 {dish.servings} pers.</span>
                    <span style={styles.metaItem}>🔥 {dish.calories}</span>
                    <span style={{ ...styles.metaItem, ...styles.diffBadge }}>{dish.difficulty}</span>
                  </div>
                </div>
              </button>
            ))}

            {/* Placeholder cards */}
            {[...Array(3)].map((_, i) => (
              <div key={`ph-${i}`} style={styles.placeholder}>
                <span style={styles.placeholderIcon}>＋</span>
                <span style={styles.placeholderText}>Prochaine recette</span>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ══ RECIPE ══ */}
      {view === VIEWS.RECIPE && selected && (
        <main style={styles.main}>
          <div style={styles.recipeHero}>
            <img src={selected.image} alt={selected.name} style={styles.recipeHeroImg} />
            <div style={styles.recipeHeroGrad} />
            <div style={styles.recipeHeroContent}>
              <h1 style={styles.recipeTitle}>{selected.name}</h1>
              <div style={styles.recipeMeta}>
                <span style={styles.metaItem}>⏱ {selected.time}</span>
                <span style={styles.metaItem}>👤 {selected.servings} pers.</span>
                <span style={styles.metaItem}>🔥 {selected.calories}</span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div style={styles.stepsWrap}>
            <h2 style={styles.sectionTitle}>Étapes de la recette</h2>

            {/* Progress bar */}
            <div style={styles.progressBar}>
              {selected.steps.map((s, i) => (
                <button
                  key={i}
                  style={{
                    ...styles.progressDot,
                    ...(i <= activeStep ? styles.progressDotActive : {}),
                  }}
                  onClick={() => setActiveStep(i)}
                >
                  {i + 1}
                </button>
              ))}
              <div
                style={{
                  ...styles.progressLine,
                  width: `${(activeStep / (selected.steps.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Active step */}
            <div style={styles.stepCard}>
              <div style={styles.stepNum}>Étape {selected.steps[activeStep].num}</div>
              <h3 style={styles.stepTitle}>{selected.steps[activeStep].title}</h3>
              <p style={styles.stepDesc}>{selected.steps[activeStep].desc}</p>
            </div>

            <div style={styles.stepNav}>
              <button
                style={{ ...styles.navBtn, opacity: activeStep === 0 ? 0.3 : 1 }}
                disabled={activeStep === 0}
                onClick={() => setActiveStep((p) => p - 1)}
              >
                ← Précédent
              </button>
              {activeStep < selected.steps.length - 1 ? (
                <button style={{ ...styles.navBtn, ...styles.navBtnPrimary }} onClick={() => setActiveStep((p) => p + 1)}>
                  Suivant →
                </button>
              ) : (
                <button style={{ ...styles.navBtn, ...styles.navBtnSuccess }}>
                  ✓ Terminé !
                </button>
              )}
            </div>

            {/* All steps condensed */}
            <h2 style={{ ...styles.sectionTitle, marginTop: 32 }}>Toutes les étapes</h2>
            {selected.steps.map((s, i) => (
              <div
                key={i}
                style={{ ...styles.stepRow, ...(i === activeStep ? styles.stepRowActive : {}) }}
                onClick={() => setActiveStep(i)}
              >
                <div style={{ ...styles.stepRowNum, ...(i === activeStep ? styles.stepRowNumActive : {}) }}>{s.num}</div>
                <div>
                  <div style={styles.stepRowTitle}>{s.title}</div>
                  <div style={styles.stepRowDesc}>{s.desc.substring(0, 60)}…</div>
                </div>
              </div>
            ))}

            <button style={styles.shoppingCTA} onClick={() => setView(VIEWS.SHOPPING)}>
              🛒 Voir la liste de courses
            </button>
          </div>
        </main>
      )}

      {/* ══ SHOPPING ══ */}
      {view === VIEWS.SHOPPING && selected && (
        <main style={styles.main}>
          <div style={styles.shoppingHeader}>
            <h1 style={styles.shoppingTitle}>🛒 Liste de courses</h1>
            <p style={styles.shoppingSub}>{selected.name} · {selected.servings} personnes</p>
            <div style={styles.progressPill}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${(checkedCount / selected.ingredients.length) * 100}%`,
                }}
              />
            </div>
            <span style={styles.progressLabel}>{checkedCount} / {selected.ingredients.length} articles</span>
          </div>

          <div style={styles.ingredientList}>
            {selected.ingredients.map((ing, i) => (
              <button
                key={i}
                style={{ ...styles.ingredientRow, ...(checked[i] ? styles.ingredientChecked : {}) }}
                onClick={() => toggleCheck(i)}
              >
                <div style={{ ...styles.checkCircle, ...(checked[i] ? styles.checkCircleActive : {}) }}>
                  {checked[i] && "✓"}
                </div>
                <span style={{ ...styles.ingredientName, ...(checked[i] ? styles.ingredientNameDone : {}) }}>
                  {ing.item}
                </span>
                <span style={styles.ingredientQty}>{ing.qty}</span>
              </button>
            ))}
          </div>

          {checkedCount === selected.ingredients.length && (
            <div style={styles.allDone}>
              <span style={styles.allDoneIcon}>🎉</span>
              <p style={styles.allDoneText}>Tout est dans le panier !</p>
              <button style={styles.navBtnPrimary} onClick={() => setView(VIEWS.RECIPE)}>
                Voir la recette →
              </button>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

const C = {
  bg: "#0f0f0f",
  card: "#1a1a1a",
  cardHover: "#222",
  accent: "#d4a843",
  accentLight: "#f0c060",
  text: "#f5f0e8",
  muted: "#888",
  border: "#2a2a2a",
  green: "#4caf6e",
};

const styles = {
  root: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: C.bg,
    minHeight: "100vh",
    color: C.text,
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(15,15,15,0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid ${C.border}`,
    padding: "0 20px",
    height: 56,
    display: "flex",
    alignItems: "center",
  },
  headerInner: {
    width: "100%",
    maxWidth: 640,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { fontSize: 18, fontWeight: "bold", letterSpacing: "0.02em", color: C.accent },
  backBtn: {
    background: "none",
    border: "none",
    color: C.accent,
    fontSize: 15,
    cursor: "pointer",
    fontFamily: "inherit",
    padding: 0,
  },
  shoppingBtn: {
    background: C.accent,
    border: "none",
    borderRadius: 20,
    color: "#000",
    fontWeight: "bold",
    fontSize: 13,
    padding: "6px 14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  shoppingCount: { fontSize: 13, color: C.accent, fontWeight: "bold" },
  main: { maxWidth: 640, margin: "0 auto", padding: "0 16px 80px" },
  hero: { padding: "40px 0 24px" },
  heroTitle: { fontSize: 34, fontWeight: "normal", lineHeight: 1.2, margin: "0 0 10px", letterSpacing: "-0.02em" },
  heroSub: { fontSize: 15, color: C.muted, margin: 0 },
  grid: { display: "flex", flexDirection: "column", gap: 16 },
  card: {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
    textAlign: "left",
    padding: 0,
    transition: "transform 0.15s, border-color 0.15s",
  },
  cardImgWrap: { position: "relative", height: 200 },
  cardImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  cardOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
  },
  cardBadges: { position: "absolute", top: 12, left: 12, display: "flex", gap: 6 },
  badge: {
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: "3px 10px",
    fontSize: 11,
    color: "#fff",
    letterSpacing: "0.04em",
  },
  cardBody: { padding: "16px 18px 18px" },
  cardName: { fontSize: 20, fontWeight: "normal", margin: "0 0 4px", letterSpacing: "-0.01em" },
  cardSub: { fontSize: 13, color: C.muted, margin: "0 0 12px" },
  cardMeta: { display: "flex", flexWrap: "wrap", gap: 8 },
  metaItem: { fontSize: 12, color: C.muted, letterSpacing: "0.02em" },
  diffBadge: {
    background: C.accent + "22",
    color: C.accent,
    padding: "2px 8px",
    borderRadius: 10,
  },
  placeholder: {
    background: C.card,
    border: `1px dashed ${C.border}`,
    borderRadius: 16,
    height: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  placeholderIcon: { fontSize: 24, color: C.border },
  placeholderText: { fontSize: 12, color: C.border },

  // Recipe
  recipeHero: { position: "relative", height: 260, margin: "0 -16px" },
  recipeHeroImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  recipeHeroGrad: {
    position: "absolute", inset: 0,
    background: "linear-gradient(to top, rgba(15,15,15,1) 0%, rgba(15,15,15,0.3) 60%, transparent 100%)",
  },
  recipeHeroContent: { position: "absolute", bottom: 20, left: 16, right: 16 },
  recipeTitle: { fontSize: 26, fontWeight: "normal", margin: "0 0 8px", letterSpacing: "-0.02em" },
  recipeMeta: { display: "flex", gap: 16 },
  stepsWrap: { padding: "24px 0" },
  sectionTitle: { fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, margin: "0 0 20px" },

  progressBar: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    position: "relative",
    marginBottom: 24,
    padding: "0 4px",
  },
  progressDot: {
    width: 32, height: 32, borderRadius: "50%",
    background: C.card, border: `2px solid ${C.border}`,
    color: C.muted, fontSize: 13, fontWeight: "bold",
    cursor: "pointer", zIndex: 1, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "inherit",
    marginRight: 24,
  },
  progressDotActive: { borderColor: C.accent, color: C.accent, background: C.accent + "22" },
  progressLine: {
    position: "absolute", left: 4, height: 2,
    background: C.accent, transition: "width 0.4s",
    top: 15, zIndex: 0,
  },

  stepCard: {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderLeft: `3px solid ${C.accent}`,
    borderRadius: 12,
    padding: "20px 20px",
    marginBottom: 16,
  },
  stepNum: { fontSize: 11, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 },
  stepTitle: { fontSize: 18, fontWeight: "normal", margin: "0 0 12px" },
  stepDesc: { fontSize: 14, lineHeight: 1.7, color: "#ccc", margin: 0 },

  stepNav: { display: "flex", gap: 10, marginBottom: 32 },
  navBtn: {
    flex: 1, padding: "12px", borderRadius: 10,
    background: C.card, border: `1px solid ${C.border}`,
    color: C.text, fontSize: 14, cursor: "pointer",
    fontFamily: "inherit",
  },
  navBtnPrimary: {
    background: C.accent, border: "none",
    color: "#000", fontWeight: "bold",
    padding: "12px 20px", borderRadius: 10,
    fontSize: 14, cursor: "pointer", fontFamily: "inherit",
    display: "inline-block",
  },
  navBtnSuccess: {
    background: C.green + "22", border: `1px solid ${C.green}`,
    color: C.green,
  },

  stepRow: {
    display: "flex", alignItems: "flex-start", gap: 14,
    padding: "14px 0", borderBottom: `1px solid ${C.border}`,
    cursor: "pointer",
  },
  stepRowActive: { opacity: 1 },
  stepRowNum: {
    width: 28, height: 28, borderRadius: "50%",
    background: C.border, color: C.muted,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12, fontWeight: "bold", flexShrink: 0,
  },
  stepRowNumActive: { background: C.accent + "33", color: C.accent },
  stepRowTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 2 },
  stepRowDesc: { fontSize: 12, color: C.muted },

  shoppingCTA: {
    width: "100%", marginTop: 28,
    background: C.accent, border: "none",
    borderRadius: 12, color: "#000",
    fontWeight: "bold", fontSize: 16,
    padding: "16px", cursor: "pointer",
    fontFamily: "inherit", letterSpacing: "0.02em",
  },

  // Shopping
  shoppingHeader: { padding: "28px 0 20px" },
  shoppingTitle: { fontSize: 26, fontWeight: "normal", margin: "0 0 4px" },
  shoppingSub: { fontSize: 13, color: C.muted, margin: "0 0 16px" },
  progressPill: {
    height: 6, background: C.border, borderRadius: 10,
    overflow: "hidden", marginBottom: 6,
  },
  progressFill: { height: "100%", background: C.green, borderRadius: 10, transition: "width 0.3s" },
  progressLabel: { fontSize: 12, color: C.muted },

  ingredientList: { display: "flex", flexDirection: "column", gap: 2 },
  ingredientRow: {
    display: "flex", alignItems: "center", gap: 14,
    padding: "14px 16px", borderRadius: 12,
    background: C.card, border: `1px solid ${C.border}`,
    cursor: "pointer", textAlign: "left",
    transition: "opacity 0.2s",
  },
  ingredientChecked: { opacity: 0.45 },
  checkCircle: {
    width: 24, height: 24, borderRadius: "50%",
    border: `2px solid ${C.border}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12, color: "#fff", flexShrink: 0,
    transition: "all 0.2s",
  },
  checkCircleActive: { background: C.green, borderColor: C.green },
  ingredientName: { flex: 1, fontSize: 15, color: C.text, fontFamily: "inherit" },
  ingredientNameDone: { textDecoration: "line-through", color: C.muted },
  ingredientQty: { fontSize: 13, color: C.accent, fontWeight: "bold" },

  allDone: {
    textAlign: "center", padding: "32px 0",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
  },
  allDoneIcon: { fontSize: 48 },
  allDoneText: { fontSize: 18, color: C.text, margin: 0 },
};
