import { useState, useMemo } from "react";

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

const VIEWS = { HOME: "home", RECIPE: "recipe", CART: "cart", SHOPPING: "shopping" };

function mergeIngredients(cartDishes) {
  const map = {};
  cartDishes.forEach((dish) => {
    dish.ingredients.forEach(({ item, qty }) => {
      const key = item.toLowerCase().trim();
      if (map[key]) {
        map[key].sources.push({ dish: dish.name, qty });
      } else {
        map[key] = { item, qty, sources: [{ dish: dish.name, qty }] };
      }
    });
  });
  return Object.values(map);
}

export default function App() {
  const [view, setView] = useState(VIEWS.HOME);
  const [selected, setSelected] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [cart, setCart] = useState([]);
  const [checked, setChecked] = useState({});

  const cartDishes = dishes.filter((d) => cart.includes(d.id));
  const mergedList = useMemo(() => mergeIngredients(cartDishes), [cart]);
  const cartCount = cart.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const toggleCart = (dish) => {
    setCart((prev) =>
      prev.includes(dish.id) ? prev.filter((id) => id !== dish.id) : [...prev, dish.id]
    );
  };

  const openDish = (dish) => {
    setSelected(dish);
    setActiveStep(0);
    setView(VIEWS.RECIPE);
  };

  const toggleCheck = (key) => setChecked((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div style={S.root}>
      {/* HEADER */}
      <header style={S.header}>
        <div style={S.headerInner}>
          {view !== VIEWS.HOME ? (
            <button style={S.backBtn} onClick={() => setView(VIEWS.HOME)}>← Retour</button>
          ) : (
            <span style={S.logo}>🍽 MesRecettes</span>
          )}
          <div style={S.headerRight}>
            {view === VIEWS.HOME && (
              <button
                style={cartCount > 0 ? S.cartBtnActive : S.cartBtn}
                onClick={() => cartCount > 0 && setView(VIEWS.CART)}
              >
                🛒 {cartCount > 0 ? `${cartCount} plat${cartCount > 1 ? "s" : ""}` : "Panier vide"}
              </button>
            )}
            {view === VIEWS.RECIPE && (
              <button style={S.cartBtnActive} onClick={() => setView(VIEWS.CART)}>
                🛒 Panier {cartCount > 0 && `(${cartCount})`}
              </button>
            )}
            {view === VIEWS.CART && cartCount > 0 && (
              <button style={S.cartBtnActive} onClick={() => setView(VIEWS.SHOPPING)}>
                📋 Liste de courses
              </button>
            )}
            {view === VIEWS.SHOPPING && (
              <span style={S.shoppingCount}>{checkedCount}/{mergedList.length}</span>
            )}
          </div>
        </div>
      </header>

      {/* HOME */}
      {view === VIEWS.HOME && (
        <main style={S.main}>
          <div style={S.hero}>
            <h1 style={S.heroTitle}>Qu'est-ce qu'on<br />mange ce soir ?</h1>
            <p style={S.heroSub}>Ajoutez des plats au panier pour obtenir une liste de courses combinée.</p>
          </div>
          <div style={S.grid}>
            {dishes.map((dish) => {
              const inCart = cart.includes(dish.id);
              return (
                <div key={dish.id} style={S.cardWrap}>
                  <button style={S.card} onClick={() => openDish(dish)}>
                    <div style={S.cardImgWrap}>
                      <img src={dish.image} alt={dish.name} style={S.cardImg} />
                      <div style={S.cardOverlay} />
                      <div style={S.cardBadges}>
                        {dish.tags.map((t) => <span key={t} style={S.badge}>{t}</span>)}
                      </div>
                      {inCart && <div style={S.inCartBadge}>✓ Dans le panier</div>}
                    </div>
                    <div style={S.cardBody}>
                      <h2 style={S.cardName}>{dish.name}</h2>
                      <p style={S.cardSub}>{dish.subtitle}</p>
                      <div style={S.cardMeta}>
                        <span style={S.metaItem}>⏱ {dish.time}</span>
                        <span style={S.metaItem}>👤 {dish.servings} pers.</span>
                        <span style={S.metaItem}>🔥 {dish.calories}</span>
                        <span style={{ ...S.metaItem, ...S.diffBadge }}>{dish.difficulty}</span>
                      </div>
                    </div>
                  </button>
                  <button
                    style={{ ...S.addToCartBtn, ...(inCart ? S.addToCartBtnActive : {}) }}
                    onClick={() => toggleCart(dish)}
                  >
                    {inCart ? "✓ Retirer du panier" : "+ Ajouter au panier"}
                  </button>
                </div>
              );
            })}
            {[...Array(3)].map((_, i) => (
              <div key={i} style={S.placeholder}>
                <span style={S.placeholderIcon}>＋</span>
                <span style={S.placeholderText}>Prochaine recette</span>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* RECIPE */}
      {view === VIEWS.RECIPE && selected && (
        <main style={S.main}>
          <div style={S.recipeHero}>
            <img src={selected.image} alt={selected.name} style={S.recipeHeroImg} />
            <div style={S.recipeHeroGrad} />
            <div style={S.recipeHeroContent}>
              <h1 style={S.recipeTitle}>{selected.name}</h1>
              <div style={S.recipeMeta}>
                <span style={S.metaItem}>⏱ {selected.time}</span>
                <span style={S.metaItem}>👤 {selected.servings} pers.</span>
                <span style={S.metaItem}>🔥 {selected.calories}</span>
              </div>
            </div>
          </div>
          <div style={S.stepsWrap}>
            <button
              style={{ ...S.addToCartBtn, width: "100%", marginBottom: 28, borderRadius: 12, borderTop: `1px solid ${C.border}`, ...(cart.includes(selected.id) ? S.addToCartBtnActive : {}) }}
              onClick={() => toggleCart(selected)}
            >
              {cart.includes(selected.id) ? "✓ Dans le panier — Retirer" : "+ Ajouter au panier"}
            </button>

            <h2 style={S.sectionTitle}>Étapes de la recette</h2>
            <div style={S.progressBar}>
              {selected.steps.map((_, i) => (
                <button key={i} style={{ ...S.progressDot, ...(i <= activeStep ? S.progressDotActive : {}) }} onClick={() => setActiveStep(i)}>{i + 1}</button>
              ))}
              <div style={{ ...S.progressLine, width: `${(activeStep / (selected.steps.length - 1)) * 100}%` }} />
            </div>

            <div style={S.stepCard}>
              <div style={S.stepNum}>Étape {selected.steps[activeStep].num}</div>
              <h3 style={S.stepTitle}>{selected.steps[activeStep].title}</h3>
              <p style={S.stepDesc}>{selected.steps[activeStep].desc}</p>
            </div>

            <div style={S.stepNav}>
              <button style={{ ...S.navBtn, opacity: activeStep === 0 ? 0.3 : 1 }} disabled={activeStep === 0} onClick={() => setActiveStep((p) => p - 1)}>← Précédent</button>
              {activeStep < selected.steps.length - 1
                ? <button style={{ ...S.navBtn, ...S.navBtnPrimary }} onClick={() => setActiveStep((p) => p + 1)}>Suivant →</button>
                : <button style={{ ...S.navBtn, ...S.navBtnSuccess }}>✓ Terminé !</button>
              }
            </div>

            <h2 style={{ ...S.sectionTitle, marginTop: 8 }}>Toutes les étapes</h2>
            {selected.steps.map((s, i) => (
              <div key={i} style={{ ...S.stepRow, ...(i === activeStep ? S.stepRowActive : {}) }} onClick={() => setActiveStep(i)}>
                <div style={{ ...S.stepRowNum, ...(i === activeStep ? S.stepRowNumActive : {}) }}>{s.num}</div>
                <div>
                  <div style={S.stepRowTitle}>{s.title}</div>
                  <div style={S.stepRowDesc}>{s.desc.substring(0, 60)}…</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* CART */}
      {view === VIEWS.CART && (
        <main style={S.main}>
          <div style={S.hero}>
            <h1 style={S.heroTitle}>Mon panier</h1>
            <p style={S.heroSub}>{cartCount} plat{cartCount > 1 ? "s" : ""} sélectionné{cartCount > 1 ? "s" : ""}</p>
          </div>
          {cartCount === 0 ? (
            <div style={S.emptyCart}>
              <span style={{ fontSize: 48 }}>🛒</span>
              <p style={{ color: C.muted, margin: "12px 0 0" }}>Votre panier est vide</p>
              <button style={{ ...S.navBtnPrimary, marginTop: 16 }} onClick={() => setView(VIEWS.HOME)}>Voir les recettes</button>
            </div>
          ) : (
            <>
              <div style={S.cartList}>
                {cartDishes.map((dish) => (
                  <div key={dish.id} style={S.cartItem}>
                    <img src={dish.image} alt={dish.name} style={S.cartItemImg} />
                    <div style={S.cartItemInfo}>
                      <div style={S.cartItemName}>{dish.name}</div>
                      <div style={S.cartItemMeta}>⏱ {dish.time} · 👤 {dish.servings} pers. · {dish.ingredients.length} ingrédients</div>
                    </div>
                    <button style={S.removeBtn} onClick={() => toggleCart(dish)}>✕</button>
                  </div>
                ))}
              </div>
              <div style={S.cartSummary}>
                <div style={S.cartSummaryRow}>
                  <span style={S.cartSummaryLabel}>Plats sélectionnés</span>
                  <span style={S.cartSummaryValue}>{cartCount}</span>
                </div>
                <div style={S.cartSummaryRow}>
                  <span style={S.cartSummaryLabel}>Articles à acheter</span>
                  <span style={S.cartSummaryValue}>{mergedList.length}</span>
                </div>
              </div>
              <button style={S.shoppingCTA} onClick={() => setView(VIEWS.SHOPPING)}>
                📋 Voir la liste de courses globale ({mergedList.length} articles)
              </button>
            </>
          )}
        </main>
      )}

      {/* SHOPPING */}
      {view === VIEWS.SHOPPING && (
        <main style={S.main}>
          <div style={S.shoppingHeader}>
            <h1 style={S.shoppingTitle}>📋 Liste de courses</h1>
            <p style={S.shoppingSub}>{cartDishes.map((d) => d.name).join(" + ")}</p>
            <div style={S.progressPill}>
              <div style={{ ...S.progressFill, width: `${mergedList.length ? (checkedCount / mergedList.length) * 100 : 0}%` }} />
            </div>
            <span style={S.progressLabel}>{checkedCount} / {mergedList.length} articles</span>
          </div>

          <div style={S.ingredientList}>
            {mergedList.map((ing, i) => {
              const key = `ing-${i}`;
              const isChecked = checked[key];
              return (
                <button key={key} style={{ ...S.ingredientRow, ...(isChecked ? S.ingredientChecked : {}) }} onClick={() => toggleCheck(key)}>
                  <div style={{ ...S.checkCircle, ...(isChecked ? S.checkCircleActive : {}) }}>{isChecked && "✓"}</div>
                  <div style={S.ingredientInfo}>
                    <span style={{ ...S.ingredientName, ...(isChecked ? S.ingredientNameDone : {}) }}>{ing.item}</span>
                    {ing.sources.length > 1 && (
                      <span style={S.ingredientSources}>{ing.sources.map((s) => s.dish).join(" · ")}</span>
                    )}
                  </div>
                  <div style={S.ingredientQtyWrap}>
                    {ing.sources.map((s, j) => (
                      <span key={j} style={S.ingredientQty}>{s.qty}</span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {checkedCount === mergedList.length && mergedList.length > 0 && (
            <div style={S.allDone}>
              <span style={{ fontSize: 48 }}>🎉</span>
              <p style={{ fontSize: 18, color: C.text, margin: 0 }}>Tout est dans le panier !</p>
              <button style={S.navBtnPrimary} onClick={() => setView(VIEWS.HOME)}>Voir les recettes →</button>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

const C = {
  bg: "#f0ede8",
  card: "#ffffff",
  accent: "#2d5a3d",
  text: "#1a2e22",
  muted: "#7a8a80",
  border: "#ddd8d0",
  green: "#2d5a3d",
};

const S = {
  root: { fontFamily: "'Futura','Century Gothic','Trebuchet MS',sans-serif", background: C.bg, minHeight: "100vh", color: C.text },
  header: { position: "sticky", top: 0, zIndex: 100, background: "rgba(240,237,232,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "0 20px", height: 56, display: "flex", alignItems: "center" },
  headerInner: { width: "100%", maxWidth: 640, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" },
  headerRight: { display: "flex", gap: 8, alignItems: "center" },
  logo: { fontSize: 18, fontWeight: "bold", letterSpacing: "0.02em", color: C.accent },
  backBtn: { background: "none", border: "none", color: C.accent, fontSize: 15, cursor: "pointer", fontFamily: "inherit", padding: 0 },
  cartBtn: { background: "none", border: `1px solid ${C.border}`, borderRadius: 20, color: C.muted, fontSize: 13, padding: "6px 14px", cursor: "default", fontFamily: "inherit" },
  cartBtnActive: { background: C.accent, border: "none", borderRadius: 20, color: "#fff", fontWeight: "bold", fontSize: 13, padding: "6px 14px", cursor: "pointer", fontFamily: "inherit" },
  shoppingCount: { fontSize: 13, color: C.accent, fontWeight: "bold" },
  main: { maxWidth: 640, margin: "0 auto", padding: "0 16px 80px" },
  hero: { padding: "40px 0 24px" },
  heroTitle: { fontSize: 34, fontWeight: "normal", lineHeight: 1.2, margin: "0 0 10px", letterSpacing: "-0.02em", color: C.text },
  heroSub: { fontSize: 15, color: C.muted, margin: 0 },
  grid: { display: "flex", flexDirection: "column", gap: 16 },
  cardWrap: { display: "flex", flexDirection: "column" },
  card: { background: C.card, border: `1px solid ${C.border}`, borderRadius: "16px 16px 0 0", overflow: "hidden", cursor: "pointer", textAlign: "left", padding: 0 },
  cardImgWrap: { position: "relative", height: 200 },
  cardImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  cardOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)" },
  cardBadges: { position: "absolute", top: 12, left: 12, display: "flex", gap: 6 },
  badge: { background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#fff", letterSpacing: "0.04em" },
  inCartBadge: { position: "absolute", top: 12, right: 12, background: C.accent, color: "#fff", borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: "bold" },
  cardBody: { padding: "16px 18px 18px" },
  cardName: { fontSize: 20, fontWeight: "bold", margin: "0 0 4px", color: C.text },
  cardSub: { fontSize: 13, color: C.muted, margin: "0 0 12px" },
  cardMeta: { display: "flex", flexWrap: "wrap", gap: 8 },
  metaItem: { fontSize: 12, color: C.muted, letterSpacing: "0.02em" },
  diffBadge: { background: C.accent + "18", color: C.accent, padding: "2px 8px", borderRadius: 10 },
  addToCartBtn: { width: "100%", padding: "13px", background: C.bg, border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 16px 16px", color: C.accent, fontWeight: "bold", fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em", textTransform: "uppercase" },
  addToCartBtnActive: { background: C.accent + "12", borderColor: C.accent },
  placeholder: { background: C.card, border: `1px dashed ${C.border}`, borderRadius: 16, height: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 },
  placeholderIcon: { fontSize: 24, color: C.border },
  placeholderText: { fontSize: 12, color: C.border },
  recipeHero: { position: "relative", height: 260, margin: "0 -16px" },
  recipeHeroImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  recipeHeroGrad: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(240,237,232,1) 0%, rgba(240,237,232,0.2) 60%, transparent 100%)" },
  recipeHeroContent: { position: "absolute", bottom: 20, left: 16, right: 16 },
  recipeTitle: { fontSize: 26, fontWeight: "bold", margin: "0 0 8px", color: C.text },
  recipeMeta: { display: "flex", gap: 16 },
  stepsWrap: { padding: "24px 0" },
  sectionTitle: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, margin: "0 0 20px" },
  progressBar: { display: "flex", alignItems: "center", position: "relative", marginBottom: 24, padding: "0 4px" },
  progressDot: { width: 32, height: 32, borderRadius: "50%", background: C.bg, border: `2px solid ${C.border}`, color: C.muted, fontSize: 13, fontWeight: "bold", cursor: "pointer", zIndex: 1, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", marginRight: 24 },
  progressDotActive: { borderColor: C.accent, color: C.accent, background: C.accent + "18" },
  progressLine: { position: "absolute", left: 4, height: 2, background: C.accent, transition: "width 0.4s", top: 15, zIndex: 0 },
  stepCard: { background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.accent}`, borderRadius: 12, padding: "20px", marginBottom: 16 },
  stepNum: { fontSize: 11, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 },
  stepTitle: { fontSize: 18, fontWeight: "bold", margin: "0 0 12px", color: C.text },
  stepDesc: { fontSize: 14, lineHeight: 1.7, color: "#4a5e52", margin: 0 },
  stepNav: { display: "flex", gap: 10, marginBottom: 32 },
  navBtn: { flex: 1, padding: "12px", borderRadius: 10, background: C.card, border: `1px solid ${C.border}`, color: C.text, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  navBtnPrimary: { background: C.accent, border: "none", color: "#fff", fontWeight: "bold", padding: "12px 20px", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "inherit", display: "inline-block" },
  navBtnSuccess: { background: C.accent + "18", border: `1px solid ${C.accent}`, color: C.accent },
  stepRow: { display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" },
  stepRowActive: { opacity: 1 },
  stepRowNum: { width: 28, height: 28, borderRadius: "50%", background: C.border, color: C.muted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold", flexShrink: 0 },
  stepRowNumActive: { background: C.accent + "28", color: C.accent },
  stepRowTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 2, color: C.text },
  stepRowDesc: { fontSize: 12, color: C.muted },
  emptyCart: { display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 0" },
  cartList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 },
  cartItem: { display: "flex", alignItems: "center", gap: 14, background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", padding: "0 16px 0 0" },
  cartItemImg: { width: 72, height: 72, objectFit: "cover", flexShrink: 0 },
  cartItemInfo: { flex: 1 },
  cartItemName: { fontSize: 15, fontWeight: "bold", color: C.text, marginBottom: 3 },
  cartItemMeta: { fontSize: 12, color: C.muted },
  removeBtn: { background: "none", border: "none", color: C.muted, fontSize: 16, cursor: "pointer", padding: "4px 8px", fontFamily: "inherit" },
  cartSummary: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 20px", marginBottom: 16 },
  cartSummaryRow: { display: "flex", justifyContent: "space-between", padding: "6px 0" },
  cartSummaryLabel: { fontSize: 14, color: C.muted },
  cartSummaryValue: { fontSize: 14, fontWeight: "bold", color: C.text },
  shoppingCTA: { width: "100%", background: C.accent, border: "none", borderRadius: 12, color: "#fff", fontWeight: "bold", fontSize: 15, padding: "16px", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em", textTransform: "uppercase" },
  shoppingHeader: { padding: "28px 0 20px" },
  shoppingTitle: { fontSize: 26, fontWeight: "bold", margin: "0 0 4px", color: C.text },
  shoppingSub: { fontSize: 13, color: C.muted, margin: "0 0 16px" },
  progressPill: { height: 6, background: C.border, borderRadius: 10, overflow: "hidden", marginBottom: 6 },
  progressFill: { height: "100%", background: C.green, borderRadius: 10, transition: "width 0.3s" },
  progressLabel: { fontSize: 12, color: C.muted },
  ingredientList: { display: "flex", flexDirection: "column", gap: 2 },
  ingredientRow: { display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, cursor: "pointer", textAlign: "left", transition: "opacity 0.2s" },
  ingredientChecked: { opacity: 0.4 },
  checkCircle: { width: 24, height: 24, borderRadius: "50%", border: `2px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", flexShrink: 0, transition: "all 0.2s" },
  checkCircleActive: { background: C.green, borderColor: C.green },
  ingredientInfo: { flex: 1, display: "flex", flexDirection: "column", gap: 2 },
  ingredientName: { fontSize: 15, color: C.text, fontFamily: "inherit" },
  ingredientNameDone: { textDecoration: "line-through", color: C.muted },
  ingredientSources: { fontSize: 11, color: C.muted, fontStyle: "italic" },
  ingredientQtyWrap: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 },
  ingredientQty: { fontSize: 13, color: C.accent, fontWeight: "bold" },
  allDone: { textAlign: "center", padding: "32px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 },
};
