import { useState, useMemo } from "react";

const dishes = [
  {
    id: 1,
    name: "Saumon glacé miel & gingembre",
    subtitle: "Riz • Courgettes • Sauce asiatique",
    time: "25 min", servings: 2, difficulty: "Facile", calories: "722 kcal",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
    tags: ["Poisson", "Asiatique", "Équilibré"],
    ingredients: [
      { item: "Riz", qty: "150 g" }, { item: "Filets de saumon avec peau", qty: "2 pièces" },
      { item: "Courgette", qty: "2 pièces" }, { item: "Sauce asiatique sucrée", qty: "1 sachet" },
      { item: "Purée de gingembre", qty: "1 sachet" }, { item: "Oignon", qty: "1 pièce" },
      { item: "Gousse d'ail", qty: "1 pièce" }, { item: "Cube de bouillon de légumes", qty: "½ pièce" },
      { item: "Graines de sésame", qty: "1 sachet" }, { item: "Miel", qty: "2 cc" },
      { item: "Beurre", qty: "2 cs" }, { item: "Huile de tournesol", qty: "selon goût" },
      { item: "Poivre et sel", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "L'art de la découpe", desc: "Préchauffez votre four à 200°C sur le mode grill. Émincez finement l'oignon. Portez une grande casserole d'eau salée à ébullition pour le riz. Râpez l'ail. Coupez les courgettes en fines demi-lunes." },
      { num: 2, title: "Le riz en ébullition", desc: "Faites cuire le riz 12–14 min dans la casserole, ou jusqu'à ce qu'il soit tendre. Égouttez-le, ajoutez la moitié de la purée de gingembre ainsi qu'une noisette de beurre et réservez-le à couvert." },
      { num: 3, title: "On enfourne le poisson", desc: "Mélangez le reste de la purée de gingembre avec la sauce asiatique sucrée, 1 cc de miel et 1½ cs d'eau par personne. Badigeonnez les filets de saumon, roulez-les dans les graines de sésame. Enfournez 10–12 min." },
      { num: 4, title: "Ding, c'est prêt !", desc: "Faites chauffer un filet d'huile de tournesol. Ajoutez l'oignon, les courgettes et l'ail, faites cuire 7–8 min. Servez le riz, les courgettes et le saumon dans les assiettes avec le reste de la sauce." },
    ],
  },
  {
    id: 2,
    name: "Nouilles sautées aux crevettes",
    subtitle: "Carotte • Poireau • Sauce soja",
    time: "25 min", servings: 2, difficulty: "Facile", calories: "632 kcal",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
    tags: ["Crevettes", "Asiatique", "Rapide"],
    ingredients: [
      { item: "Nouilles de blé", qty: "1 paquet" }, { item: "Crevettes", qty: "1 paquet" },
      { item: "Poireau", qty: "1 pièce" }, { item: "Oignon", qty: "1 pièce" },
      { item: "Carotte", qty: "1 pièce" }, { item: "Gousse d'ail", qty: "1 pièce" },
      { item: "Gingembre frais", qty: "1 cm" }, { item: "Piment", qty: "¾ pièce" },
      { item: "Coriandre", qty: "1 sachet" }, { item: "Sauce soja", qty: "1 sachet" },
      { item: "Sauce asiatique sucrée", qty: "1 sachet" }, { item: "Huile de tournesol", qty: "1½ cs" },
      { item: "Poivre et sel", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Atelier découpe", desc: "Tamponnez les crevettes avec de l'essuie-tout. Faites chauffer un petit filet d'huile de tournesol dans une sauteuse. Faites-y cuire les crevettes des deux côtés 2–3 min, ou jusqu'à ce qu'elles soient bien colorées. Épluchez la carotte et coupez-la en fines demi-lunes. Coupez le poireau en deux dans l'épaisseur, lavez-le bien, puis coupez-le en fines demi-lunes. Ciselez finement l'oignon." },
      { num: 2, title: "Ça chauffe !", desc: "Portez une grande casserole d'eau salée à ébullition pour les nouilles. Réservez les crevettes hors de la sauteuse, puis faites-y revenir la carotte, le poireau et l'oignon à couvert 7–10 min avec ¾ cs d'eau par personne. Ajoutez, râpez l'ail et le gingembre. Épicez avec le piment (ça pique !). Remuez régulièrement." },
      { num: 3, title: "La sauce qui fait la diff", desc: "Faites cuire les nouilles dans l'eau bouillante 2–3 min. Égouttez-les et passez-les sous l'eau froide pour éviter qu'elles ne collent. Égouttez-les à nouveau. Ajoutez les crevettes, la moitié de la coriandre, la quantité indiquée de sauce soja et la sauce asiatique sucrée. Remuez quelques secondes." },
      { num: 4, title: "Sur la route des saveurs", desc: "Incorporez les nouilles à la sauteuse et mélangez bien 2 min pour qu'elles s'imprègnent de la sauce. Servez-les dans des assiettes creuses. Saupoudrez le reste de coriandre et ajustez l'assaisonnement en poivre." },
    ],
  },
  {
    id: 3,
    name: "Curry de poulet au lait de coco",
    subtitle: "Riz • Cacahuètes • Citron",
    time: "30 min", servings: 2, difficulty: "Moyen", calories: "3418 kcal",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
    tags: ["Poulet", "Asiatique", "Épicé"],
    ingredients: [
      { item: "Riz", qty: "150 g" }, { item: "Blanc de poulet", qty: "1 paquet" },
      { item: "Cacahuètes non salées", qty: "1 sachet" }, { item: "Curry vert", qty: "¾ sachet" },
      { item: "Lait de coco", qty: "1 paquet" }, { item: "Sauce poisson", qty: "1 sachet" },
      { item: "Citron", qty: "1 pièce" }, { item: "Oignon", qty: "1 pièce" },
      { item: "Poireau", qty: "1 pièce" }, { item: "Gousse d'ail", qty: "2 pièces" },
      { item: "Gingembre frais", qty: "1 cm" }, { item: "Coriandre", qty: "¼ sachet" },
      { item: "Huile de tournesol", qty: "1 cs" }, { item: "Poivre et sel", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Opération découpe", desc: "Portez une grande casserole d'eau salée à ébullition pour le riz. Ciselez finement l'oignon. Râpez l'ail et le gingembre. Coupez le poireau en deux dans l'épaisseur, lavez-le bien et coupez-le en fines demi-lunes. Effeuillez la coriandre et ciselez-la selon votre goût. Dosez-le selon votre goût. Concassez les cacahuètes si vous le souhaitez." },
      { num: 2, title: "Le riz passe à la casserole", desc: "Recoupez le poulet en plus petits dés si nécessaire. Faites cuire le riz 12–14 min dans la casserole, ou jusqu'à ce qu'il soit tendre. Égouttez-le et réservez-le à couvert." },
      { num: 3, title: "Au tour du poulet", desc: "Pendant ce temps, faites chauffer un filet d'huile de tournesol à feu moyen-vif dans un wok ou une sauteuse. Faites-y dorer le poulet 3–4 min sur tous les côtés (il ne doit pas encore être totalement cuit à ce stade). Salez et poivrez. Réservez-le hors du wok, mais conservez ce dernier avec les jus de cuisson." },
      { num: 4, title: "Le curry s'invite", desc: "Faites revenir l'oignon, l'ail, le gingembre et ¾ sachet de curry par personne dans le wok à feu moyen, en remuez et faites-le cuire 9–11 min de plus à couvert, ou jusqu'à ce qu'il soit bien réduit et qu'il n'y ait plus d'eau dans le wok. Versez un filet d'huile si les légumes accrochent." },
      { num: 5, title: "Le secret est dans la sauce", desc: "Secouez le paquet de lait de coco afin que les éventuels grumeaux se décomposent. Ajoutez-le ainsi que ¼ cs de sauce poisson par personne (voir LASTUCE). Mélangez, puis couvrez et laissez mijoter 5 min, ou jusqu'à ce que le poulet soit cuit à cœur." },
      { num: 6, title: "Direction la Thaïlande !", desc: "Servez le riz et le curry Thai au poulet dans des assiettes creuses. Disposez quelques gouttes au-dessus de son plat selon votre goût. Saupoudrez du tout de coriandre et de cacahuètes. Pressez ¼ citron par personne dans chaque assiette afin que chacun puisse en presser selon son goût." },
    ],
  },
  {
    id: 4,
    name: "Quesadillas tex-mex",
    subtitle: "Pommes de terre • Haricots • Guacamole",
    time: "35 min", servings: 2, difficulty: "Facile", calories: "4979 kcal",
    image: "https://images.unsplash.com/photo-1628191011227-522c7c1a765b?w=600&q=80",
    tags: ["Végétarien", "Mexicain", "Gourmand"],
    ingredients: [
      { item: "Pommes de terre", qty: "500 g" }, { item: "Haricots rouges", qty: "1 paquet" },
      { item: "Chair de tomates", qty: "1 pièce" }, { item: "Oignon rouge", qty: "1 pièce" },
      { item: "Gousse d'ail", qty: "1 pièce" }, { item: "Haricots de terre", qty: "1 pièce" },
      { item: "Cheddar râpé", qty: "1 sachet" }, { item: "Épices mexicaines", qty: "1 sachet" },
      { item: "Tortillas de blé complet", qty: "4 pièces" }, { item: "Guacamole", qty: "80 g" },
      { item: "Origan séché", qty: "¼ sachet" }, { item: "Sucrine", qty: "1 sachet" },
      { item: "Huile d'olive", qty: "2 cc" }, { item: "Vinaigre de vin rouge ou de cidre", qty: "3 cs" },
      { item: "Sucre", qty: "2 cc" }, { item: "Poivre et sel", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Ça donne la frite !", desc: "Préchauffez le four à 220°C (200°C chaleur tournante). Épluchez et coupez les pommes de terre en frites entières (non épluchées), ou jusqu'à ce qu'elles soient tendres. Placez les frites sur une plaque recouverte de papier sulfurisé. Mélangez-les avec un filet d'huile d'olive, du sel et du poivre. Enfournez-les 25–30 min avec une gousse d'ail entière." },
      { num: 2, title: "En rang d'oignon", desc: "Coupez l'oignon en très fines demi-lunes et placez-les dans un bol. Ajoutez une pincée de sel, puis 1 cc de vinaigre de vin rouge (ou vinaigre de cidre) par personne. Mélangez la chair de tomate avec, par personne : ½ cc de sucre, une pincée d'origan séché, du sel et du poivre." },
      { num: 3, title: "Mélange gourmand", desc: "Dans un autre bol, mélangez la moitié des haricots rouges avec la moitié du cheddar râpé et, par personne : ½ sachet d'épices mexicaines et la moitié de la sauce tomate. Avec une fourchette, écrasez le mélange de sorte à former une pâte. Ajoutez le reste des haricots rouges sans les écraser et mélangez." },
      { num: 4, title: "Un tour au four", desc: "Lorsqu'il reste 10 min de cuisson aux pommes de terre, écrasez la gousse d'ail pour en faire sortir la pulpe et mélangez-la aux frites. Disposez les tortillas sur une plaque recouverte de papier sulfurisé. Badigeonnez chaque tortilla d'un filet d'huile d'olive, répartissez la farce et appuyez doucement avec une spatule pour l'enfermer. Repliez chaque tortilla sur la farce et recouvrez-les avec le reste du cheddar râpé." },
      { num: 5, title: "Cheese comme on aime", desc: "Enfournez les quesadillas 5–8 min, ou jusqu'à ce que le fromage ait fondu et que les tortillas soient dorées. Pendant ce temps, mélangez le guacamole avec un filet d'huile d'olive. Dans un saladier, coupez la sucrine en lanières. Salez et poivrez. Dans un saladier, préparez une vinaigrette en mélangeant un filet d'huile de tournesol, le vinaigre balsamique, du sel et du poivre." },
      { num: 6, title: "Un pas vers le Mexique", desc: "Répartissez les quesadillas dans les assiettes. Servez avec les frites, la salade et le reste de sauce tomate." },
    ],
  },
  {
    id: 5,
    name: "Fusilli pesto, lardons & champignons",
    subtitle: "Crème • Poireau • Ail",
    time: "25 min", servings: 2, difficulty: "Facile", calories: "2950 kcal",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80",
    tags: ["Pâtes", "Forestier", "Crémeux"],
    ingredients: [
      { item: "Fusilli complets", qty: "1 paquet" }, { item: "Champignons de Paris", qty: "250 g" },
      { item: "Lardons fumés sans nitrite", qty: "180 g" }, { item: "Poireau", qty: "1 pièce" },
      { item: "Gousse d'ail", qty: "1 pièce" }, { item: "Pesto de champignons", qty: "1 sachet" },
      { item: "Crème liquide", qty: "1 paquet" }, { item: "Poivre et sel", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Mission découpe activée !", desc: "Portez une grande casserole d'eau salée à ébullition pour les pâtes. Nettoyez les champignons et coupez-les en quartiers (voir l'ASTUCE). Lavez bien le poireau, puis coupez-le en fines rondelles, puis coupez-les en quartiers (voir LASTUCE). Ciselez l'ail." },
      { num: 2, title: "Les pâtes au bain", desc: "Faites cuire les fusilli 12–15 min dans la casserole d'eau bouillante, ou jusqu'à ce qu'il soit tendre. Égouttez-les et réservez-les pour l'étape suivante. Réserver ¼ louche d'eau de cuisson par personne." },
      { num: 3, title: "Ça chauffe !", desc: "Pendant ce temps, faites chauffer une sauteuse à feu moyen-vif. Ajoutez les fusilli, le pesto aux champignons et la crème. Faites-y revenir les lardons, le poireau, les champignons et l'ail 6–8 min. Remuez bien et faites chauffer 1–2 min, ou jusqu'à ce que le tout soit bien mélangé et les pâtes crémeuses." },
      { num: 4, title: "Showtime !", desc: "Goûtez et ajustez l'assaisonnement si besoin (attention à ne pas vous brûler !). Servez aussitôt les fusilli au poireau et lardons dans les assiettes." },
    ],
  },
  {
    id: 6,
    name: "Porc sauté sauce sriracha",
    subtitle: "Riz • Concombre • Carotte • Mayo soja",
    time: "25 min", servings: 2, difficulty: "Facile", calories: "3961 kcal",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
    tags: ["Porc", "Asiatique", "Piquant"],
    ingredients: [
      { item: "Riz", qty: "150 g" }, { item: "Chair à saucisse", qty: "1 paquet" },
      { item: "Carotte", qty: "1 pièce" }, { item: "Concombre", qty: "1 pièce" },
      { item: "Gingembre frais", qty: "1 cm" }, { item: "Citron", qty: "½ pièce" },
      { item: "Sauce soja réduite en sel", qty: "20 ml" }, { item: "Sauce sriracha", qty: "1 sachet" },
      { item: "Mayonnaise", qty: "1 sachet" }, { item: "Sucre", qty: "1 cc" },
      { item: "Huile de tournesol", qty: "1 cs" }, { item: "Poivre et sel", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Casserole en action", desc: "Portez une casserole d'eau salée à ébullition. Faites cuire le riz dans la casserole 12–14 min, ou jusqu'à ce qu'il soit tendre. Lavez bien le citron et prélevez-en le zeste avec une râpe fine. Coupez-le en quartiers." },
      { num: 2, title: "Atelier découpe", desc: "Pendant ce temps, coupez le concombre en fines demi-lunes. Épluchez et râpez la carotte avec une râpe à gros grains. Dans un bol, ajoutez le concombre, la carotte, le gingembre, le jus de ¼ citron par personne, du sel et du poivre. Dosez-le selon votre goût. Mélangez et réservez." },
      { num: 3, title: "Le porc y passe", desc: "Faites chauffer un filet d'huile de tournesol dans une sauteuse à feu moyen-vif. Faites-y cuire la chair à saucisse la sriracha (ça pique !). Dosez-la selon votre goût et ½ cc de sucre par personne. Faites revenir 1–2 min, ou jusqu'à ce que la sauce devienne légèrement sirupeuse. Salez et poivrez." },
      { num: 4, title: "Le grand final", desc: "Mélangez la mayonnaise avec le reste de la sauce soja dans un petit bol. Servez le riz dans des assiettes creuses. Servez le porc à côté. Répartissez la salade de crudités à côté. Nappez la mayo au soja par-dessus." },
    ],
  },
  {
    id: 7,
    name: "Keftas d'agneau & semoule",
    subtitle: "Carottes • Épinards • Yaourt grec",
    time: "30 min", servings: 2, difficulty: "Moyen", calories: "2799 kcal",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80",
    tags: ["Agneau", "Moyen-Orient", "Épicé"],
    ingredients: [
      { item: "Viande hachée au bœuf", qty: "150 g" }, { item: "Mélange d'épices du Moyen-Orient", qty: "1 sachet" },
      { item: "Épinards", qty: "1 paquet" }, { item: "Semoule", qty: "1 pot" },
      { item: "Yaourt à la grecque", qty: "1 pot" }, { item: "Carotte", qty: "1 pièce" },
      { item: "Oignon", qty: "1 pièce" }, { item: "Gousse d'ail", qty: "1 pièce" },
      { item: "Menthe", qty: "1 pièce" }, { item: "Citron", qty: "1 pièce" },
      { item: "Cube de bouillon de bœuf", qty: "1 cc" }, { item: "Lait", qty: "1 cc" },
      { item: "Huile d'olive", qty: "1 cc" }, { item: "Poivre et sel", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Les carottes sont cuites", desc: "Épluchez et coupez la carotte en fines demi-lunes. Ciselez finement l'oignon. Faites chauffer un petit filet d'huile d'olive dans une grande sauteuse à feu moyen. Faites-y revenir la carotte et les ⅔ de l'oignon (gardez le reste pour les keftas) 10–15 min avec un filet d'eau pour qu'ils commencent à devenir fondants." },
      { num: 2, title: "Keftas en construction", desc: "Lavez bien le citron et prélevez-en le zeste avec une râpe fine, puis coupez-le en quartiers. Effeuillez et ciselez l'ail. Dans un saladier, mélangez le bœuf avec le reste des épices du Moyen-Orient par personne, la moitié de l'ail, ⅓ de la menthe, du zeste de citron (ça pique), une pincée d'origan, du sel, du poivre. Dosez-les selon votre goût. Formez 3 boulettes allongées et légèrement aplaties par personne ; tassez-les bien." },
      { num: 3, title: "Hop, à la poêle !", desc: "Faites chauffer un petit filet d'huile de tournesol dans une petite poêle à feu moyen-vif. Faites-y revenir les keftas 4–5 min de chaque côté, ou jusqu'à ce qu'ils soient cuits à cœur (conservez le jus de cuisson)." },
      { num: 4, title: "La cuisson, la suite", desc: "Dans une casserole, ajoutez par personne : ¼ de cube de cuisson des légumes, ¼ de la menthe et 1 cc d'eau. Portez à ébullition. Après avoir lavé les mains, ajoutez ½ reste de l'ail, ⅔ des épices du Moyen-Orient, déchirez-les avec vos mains par-dessus. Baissez le feu sur doux, puis couvrez et laissez cuire 8–10 min. Salez et poivrez et ajustez." },
      { num: 5, title: "Plouf dans la casserole !", desc: "Retirez le bouillon du feu et ajoutez-y la semoule. Couvrez et laissez reposer jusqu'à ce que l'eau soit bien absorbée. Égrenez-la avec une fourchette, et assaisonnez-la avec le jus de citron (selon votre goût), quelques gouttes de jus de citron des légumes cuits, quelques gouttes de jus de cuisson des keftas, de la menthe, du sel et du poivre." },
      { num: 6, title: "Sur la route des saveurs", desc: "Dans un petit bol, mélangez le yaourt avec quelques gouttes de jus de citron et une pincée de menthe. Servez la semoule dans des assiettes creuses. Disposez les frites (légumes), les keftas. Saupoudrez du tout de persil haché. Ajoutez le lait ainsi que la sauce ravigote et le tout dessus. Arrosez de le tour de sauce." },
    ],
  },
  {
    id: 8,
    name: "Lieu noir, purée carotte & lardons",
    subtitle: "Pommes de terre • Sauce ravigote • Persil",
    time: "35 min", servings: 2, difficulty: "Moyen", calories: "2264 kcal",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    tags: ["Poisson", "Français", "Réconfortant"],
    ingredients: [
      { item: "Tranches de poitrine fumée", qty: "1 paquet" }, { item: "Filet de lieu noir", qty: "200 g" },
      { item: "Pommes de terre", qty: "125 g" }, { item: "Carotte", qty: "2 pièces" },
      { item: "Persil", qty: "1 sachet" }, { item: "Paprika en poudre", qty: "¾ sachet" },
      { item: "Salade", qty: "1 sachet" }, { item: "Sauce ravigote", qty: "1 sachet" },
      { item: "Huile d'olive", qty: "2 cc" }, { item: "Vinaigre balsamique noir", qty: "1 cc" },
      { item: "Beurre", qty: "2 cs" }, { item: "Poivre et sel", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Plouf, dans l'eau bouillante !", desc: "Préchauffez le four à 200°C (180°C chaleur tournante). Épluchez et coupez les carottes et les pommes de terre en tronçons de 1–2 cm. Placez-les dans une casserole, versez de l'eau à mi-hauteur et faites cuire 15–17 min, ou jusqu'à ce que la pointe d'un couteau y rentre facilement. Réservez un peu d'eau de cuisson, puis égouttez-les." },
      { num: 2, title: "Session bronzage", desc: "Séparez les tranches de poitrine fumée et disposez-les sur une plaque recouverte de papier sulfurisé. Enfournez-les 8–10 min, ou jusqu'à ce qu'elles soient bien croustillantes. Effeuillez la poitrine fumée grillée, puis coupez-la en petites lanières." },
      { num: 3, title: "Un A/R pour le poisson", desc: "Épongez le lieu avec de l'essuie-tout, puis assaisonnez-le d'une pincée de paprika et poivrez-le généreusement. Lorsqu'il reste 5 min de chaque côté, faites chauffer une poêle à feu moyen-vif avec un filet d'huile d'olive et faites-y cuire le lieu 1–2 min de chaque côté, ou jusqu'à ce qu'il soit cuit à cœur." },
      { num: 4, title: "L'art de la vinaigrette", desc: "En attendant, dans un saladier, faites une vinaigrette en mélangeant un filet de vinaigre balsamique et un généreux filet d'huile d'olive. Salez et poivrez. Ajoutez la salade au moment de servir." },
      { num: 5, title: "Purée en cours", desc: "Écrasez les pommes de terre et les carottes avec un presse-purée. Ajoutez une généreuse noix de beurre. Mélangez et ajustez légèrement, poivrez et mélangez. Si besoin, ajoutez également un peu de liquide de cuisson pour l'onctuosité." },
      { num: 6, title: "Miam, miam !", desc: "Servez la purée dans les assiettes. Saupoudrez le poisson de chips de lard et de persil ciselé. Ajoutez le lieu ainsi que la sauce ravigote et la salade dessus." },
    ],
  },
  {
    id: 9,
    name: "Gratin tortelloni poireaux & cantal",
    subtitle: "Crème • Gouda • Thym",
    time: "30 min", servings: 2, difficulty: "Facile", calories: "3615 kcal",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    tags: ["Pâtes", "Gratiné", "Réconfortant"],
    ingredients: [
      { item: "Tortelloni ricotta-épinards", qty: "300 g" }, { item: "Poireau", qty: "1½ pièce" },
      { item: "Gouda râpé", qty: "¼ sachet" }, { item: "Cantal râpé", qty: "1 pièce" },
      { item: "Crème liquide (AOP)", qty: "1 sachet" }, { item: "Persil", qty: "1 paquet" },
      { item: "Oignon", qty: "1 pièce" }, { item: "Gousse d'ail", qty: "1 pièce" },
      { item: "Thym séché", qty: "¼ sachet" }, { item: "Moutarde", qty: "1 cs" },
      { item: "Vinaigre de vin blanc", qty: "1 cc" }, { item: "Beurre", qty: "1 cs" },
      { item: "Cube de bouillon de légumes", qty: "½ pièce" }, { item: "Huile d'olive", qty: "1 cs" },
      { item: "Poivre et sel", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Opération découpe", desc: "Préchauffez le four à 220°C sur le mode grill. Effeuillez et ciselez finement le persil. Lavez-les bien, coupez les poireaux en deux dans la longueur, puis coupez-les en fines demi-lunes. Ciselez l'ail et l'oignon." },
      { num: 2, title: "On fond pour les poireaux", desc: "Faites fondre une noix de beurre dans une sauteuse à feu moyen-vif. Faites-y revenir l'oignon, l'ail et le poireau 2 min. Déglacez avec l'eau et ¼ cs de vinaigre de vin blanc par personne ; ½ cs de moutarde, par personne. Versez le l'eau à mi-hauteur et ajoutez, par personne : ¼ cube de bouillon et ¾ cc de thym séché. Salez et poivrez. Couvrez et prolongez la cuisson de 5–7 min. Remuez régulièrement." },
      { num: 3, title: "Touche gourmande", desc: "Une fois le poireau cuit, ajoutez la crème, le gouda et du persil à la sauteuse. Mélangez jusqu'à ce que l'ensemble soit homogène. Si le cantal se défait trop au moment de le râper, vous pouvez le tailler en petits cubes." },
      { num: 4, title: "Dans l'eau bouillante", desc: "Portez une casserole d'eau salée à ébullition. Faites-y cuire les tortelloni 1 min. Égouttez-les." },
      { num: 5, title: "Hop, au four !", desc: "Dans un plat à four préalablement huilé, disposez la moitié de la fondue de poireau, puis les tortelloni et terminez avec le reste de fondue de poireau. Recouvrez le tout de cantal. Enfournez 10–12 min dans la partie haute du four, ou jusqu'à ce que le fromage soit gratiné." },
      { num: 6, title: "Chaud devant !", desc: "Servez le gratin de tortelloni dans les assiettes. Saupoudrez du reste de persil." },
    ],
  },
  {
    id: 10,
    name: "Poulet pané croustillant & brocoli",
    subtitle: "Pommes de terre • Chapelure panko • Salade",
    time: "35 min", servings: 2, difficulty: "Facile", calories: "4021 kcal",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&q=80",
    tags: ["Poulet", "Croustillant", "Équilibré"],
    ingredients: [
      { item: "Filet de poulet", qty: "500 g" }, { item: "Brocoli", qty: "1 pièce" },
      { item: "Pommes de terre", qty: "5 brin(s)" }, { item: "Gousse d'ail", qty: "1 pièce" },
      { item: "Romarin", qty: "1 sachet" }, { item: "Chapelure panko", qty: "1 sachet" },
      { item: "Mayonnaise", qty: "1 sachet" }, { item: "Moutarde", qty: "1 cs" },
      { item: "Œuf", qty: "1 pièce" }, { item: "Farine", qty: "3 cs" },
      { item: "Salade", qty: "1 sachet" }, { item: "Huile de tournesol", qty: "1 cs" },
      { item: "Vinaigre balsamique blanc ou de riz", qty: "1 cc" }, { item: "Poivre et sel", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Hop, en cuisine !", desc: "Portez une casserole d'eau salée à ébullition. Épluchez et coupez les pommes de terre en 4, voire en 3 morceaux. Coupez le brocoli en 2, voire en 3 morceaux. Effeuillez le romarin, puis hachez-le très finement. Ciselez l'ail. Posez votre main à plat sur le poulet et coupez-le horizontalement pour obtenir deux tranches fines." },
      { num: 2, title: "Mission cuisson activée", desc: "Faites cuire les pommes de terre dans la casserole d'eau bouillante 8–10 min. Ajoutez-y le brocoli et faites cuire le tout 6–10 min de plus à la pointe d'un couteau, ou jusqu'à ce que les légumes soient tendres. Égouttez-les et faites-les refroidir jusqu'au moment de servir, réservez-les à couvert." },
      { num: 3, title: "Enrobage doré", desc: "Pendant ce temps, dans une assiette creuse, mélangez la farine avec du sel. Dans une deuxième assiette, battez l'œuf et, dans une troisième assiette, mélangez la chapelure panko et une généreuse pincée de sel, puis dans un bol, mélangez le romarin, la chapelure panko et une généreuse pincée de sel. Trempez successivement le poulet dans la farine, puis dans l'œuf et terminez dans la chapelure panko jusqu'à ce qu'il soit entièrement recouvert." },
      { num: 4, title: "Tenue crousti-chic", desc: "Faites chauffer environ 2 mm d'huile de tournesol dans une grande poêle ou une grande quantité suffisante pour en recouvrir le fond. Lorsque l'huile est chaude, faites-y cuire le poulet 2–4 min de chaque côté, ou jusqu'à ce qu'il soit doré et cuit à cœur. Réservez-le sur une assiette recouverte d'essuie-tout." },
      { num: 5, title: "L'art de l'assaisonnement", desc: "Dans un saladier, mélangez la moutarde (voir LASTUCE) avec la mayonnaise (voir LASTUCE), un filet d'huile d'olive et de vinaigre balsamique, du sel et du poivre. Ajoutez les pommes de terre, le brocoli et la salade. Mélangez délicatement." },
      { num: 6, title: "On dresse, on savoure !", desc: "Servez la salade dans les assiettes. Placez le poulet pané à côté." },
    ],
  },
  {
    id: 11,
    name: "Ravioli gratinés aubergine & ricotta",
    subtitle: "Tomates concassées • Pecorino • Basilic",
    time: "35 min", servings: 2, difficulty: "Facile", calories: "3418 kcal",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    tags: ["Végétarien", "Italien", "Gratiné"],
    ingredients: [
      { item: "Raviolis", qty: "1 paquet" }, { item: "Aubergine", qty: "1 pièce" },
      { item: "Ricotta", qty: "¾ pot" }, { item: "Crème de basilic", qty: "1 pot" },
      { item: "Chair de tomates", qty: "300 g" }, { item: "Pecorino Romano AOP râpé", qty: "¼ sachet" },
      { item: "Girasoli tomate & mozzarella", qty: "1 paquet" }, { item: "Origan séché", qty: "1 sachet" },
      { item: "Sucre", qty: "1 cc" }, { item: "Huile d'olive", qty: "2 cs" },
      { item: "Poivre et sel", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "À vos couteaux !", desc: "Préchauffez le four à 230°C (210°C chaleur tournante) sur le mode grill. Coupez l'aubergine en petits dés de 1 cm." },
      { num: 2, title: "On enfourne", desc: "Dans un plat à four, mélangez l'aubergine avec un généreux filet d'huile d'olive, du sel et du poivre. Enfournez-les 20–25 min dans la partie haute du four, ou jusqu'à ce que les aubergines soient dorées et fondantes. Prolongez la cuisson si nécessaire." },
      { num: 3, title: "Ça gratine", desc: "Mélangez ¾ pot de ricotta par personne avec la moitié de la crème de basilic dans un petit bol. Poivrez. Une fois les aubergines cuites, sortez-les du four (attention à ne pas vous brûler !), ajoutez-y les raviolis cuits, ¾ sachet d'origan séché, et 2 cs d'eau. Mélangez ; puis ajoutez-y les tomates concassées et, par personne : ¼ cc de sucre. Puis ajoutez-y les raviolis et recouvrez-les du tout de pecorino. Prolongez la cuisson de 5–6 min, ou jusqu'à ce que le tout de pecorino et les raviolis cuits." },
      { num: 4, title: "Miam, miam !", desc: "Servez les ravioli gratinés dans les assiettes. Versez le restant de crème de basilic par-dessus. Dégustez sans attendre." },
    ],
  },
  {
    id: 25,
    name: "Quiche lorraine",
    subtitle: "Lardons • Comté • Crème fraîche",
    time: "50 min", servings: 4, difficulty: "Très facile", calories: "580 kcal",
    image: "https://images.unsplash.com/photo-1568051243858-533a607809a5?w=600&q=80",
    tags: ["Tarte", "Français", "Classique"],
    ingredients: [
      { item: "Pâte brisée", qty: "1 rouleau" },
      { item: "Lardons", qty: "200 g" },
      { item: "Comté en lamelles", qty: "80 g" },
      { item: "Œufs", qty: "6 pièces" },
      { item: "Crème fraîche épaisse", qty: "40 cl" },
      { item: "Noix de muscade", qty: "2 pincées" },
      { item: "Sel et poivre", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Préchauffage & pâte", desc: "Préchauffez le four à 210°C (thermostat 7). Étalez la pâte dans un moule à tarte, piquez le fond avec une fourchette puis faites cuire la pâte à blanc pendant 10 minutes." },
      { num: 2, title: "Les lardons", desc: "Pendant ce temps, faites dorer les lardons dans une poêle bien chaude. Réservez." },
      { num: 3, title: "La migaine", desc: "Mélangez les œufs avec la crème fraîche. Ajoutez le sel, le poivre et les 2 pincées de noix de muscade. Fouettez jusqu'à obtenir un appareil bien homogène." },
      { num: 4, title: "Montage & cuisson", desc: "Sur le fond de tarte précuit, disposez les lamelles de comté, puis les lardons. Versez la migaine par-dessus. Enfournez 30 minutes à 180°C jusqu'à ce que la quiche soit bien dorée et que l'appareil soit pris." },
    ],
  },
  {
    id: 21,
    name: "Pasta Toscana",
    subtitle: "Paccheri • Chair à saucisse • Fenouil",
    time: "60 min", servings: 4, difficulty: "Facile", calories: "680 kcal",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80",
    tags: ["Pâtes", "Italien", "Gourmand"],
    ingredients: [
      { item: "Paccheri (ou pâtes courtes)", qty: "400 g" },
      { item: "Chair à saucisse", qty: "300 g" },
      { item: "Tomates pelées San Marzano", qty: "2 boîtes 500 g" },
      { item: "Oignon jaune", qty: "1 pièce" },
      { item: "Graines de fenouil", qty: "1 poignée" },
      { item: "Vin blanc", qty: "1 verre" },
      { item: "Pecorino", qty: "selon goût" },
      { item: "Huile d'olive", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "La base", desc: "Faites revenir l'oignon haché dans de l'huile d'olive. Ajoutez les graines de fenouil (gardez-en quelques-unes pour la déco) et faites-les dorer. Ajoutez la chair à saucisse pour qu'elle dore, sans la laisser s'émietter de fenouil." },
      { num: 2, title: "La sauce tomate", desc: "Versez le vin blanc. Ajoutez la chair à saucisse, mélangez puis ajoutez les tomates entières (elles vont réduire d'elles-mêmes à la cuisson). Laissez mijoter tranquillement pendant 45 minutes au moins." },
      { num: 3, title: "Les pâtes", desc: "Faites cuire les pâtes dans un grand volume d'eau salée. Quand elles sont cuites, mélangez-les à la sauce et servez en ajoutant des copeaux de pecorino et les graines de fenouil restantes." },
      { num: 4, title: "Dressage", desc: "Servez bien chaud avec un généreux tour de pecorino râpé par-dessus. La sauce doit être bien concentrée et enrober parfaitement chaque pâte." },
    ],
  },
  {
    id: 22,
    name: "Couscous d'épeautre aux légumes",
    subtitle: "Courgettes • Carottes • Pois chiches",
    time: "55 min", servings: 4, difficulty: "Facile", calories: "420 kcal",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&q=80",
    tags: ["Végétarien", "Maghrébin", "Équilibré"],
    ingredients: [
      { item: "Couscous d'épeautre complet", qty: "500 g" },
      { item: "Courgettes", qty: "2 pièces" },
      { item: "Carottes", qty: "4 pièces" },
      { item: "Tomate", qty: "1 pièce" },
      { item: "Oignon", qty: "1 pièce" },
      { item: "Branche de céleri", qty: "1 pièce" },
      { item: "Pois chiches en conserve", qty: "200 g" },
      { item: "Huile d'olive", qty: "2 cs" },
      { item: "Cubes de bouillon de légumes", qty: "2 pièces" },
      { item: "Persil", qty: "¼ bouquet" },
      { item: "Sel, poivre", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "La découpe", desc: "Coupez les courgettes et les carottes en tronçons de 3 ou 4 cm et la tomate en dés. Émincez l'oignon et le céleri. Égouttez et rincez les pois chiches." },
      { num: 2, title: "Le bouillon de légumes", desc: "Dans une cocotte, faites revenir l'oignon et le céleri avec 1 cs d'huile d'olive et 1 pincée de sel. Versez 1 l d'eau, ajoutez les cubes de bouillon émiettés, portez à ébullition. Ajoutez la tomate et les carottes, laissez cuire 20 min. Ajoutez les courgettes et les pois chiches, puis poursuivez la cuisson 5 ou 6 min." },
      { num: 3, title: "La semoule", desc: "Faites bouillir 50 cl d'eau, mettez la semoule dans un saladier, salez et poivrez. Versez par-dessus l'eau chaude et le reste d'huile. Couvrez et attendez 2 min que le couscous gonfle. Égrainez-le à la fourchette." },
      { num: 4, title: "Dressage", desc: "Hachez grossièrement le persil et ajoutez-le aux légumes. Servez la semoule avec les légumes et du jus de cuisson. Pour une note épicée, mélangez le couscous avec 1 ou 2 cc de ras el-hanout avant d'y verser l'eau." },
    ],
  },
  {
    id: 23,
    name: "Curry vert de crevettes au combava",
    subtitle: "Lait de coco • Lentilles corail • Gingembre",
    time: "45 min", servings: 4, difficulty: "Moyen", calories: "480 kcal",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
    tags: ["Crevettes", "Thaï", "Épicé"],
    ingredients: [
      { item: "Crevettes crues", qty: "16 à 24 pièces" },
      { item: "Pâte de curry vert", qty: "2–3 cc" },
      { item: "Feuilles de combava", qty: "4 pièces" },
      { item: "Oignons", qty: "2 pièces" },
      { item: "Gousses d'ail", qty: "2 pièces" },
      { item: "Sauce soja", qty: "6 cs" },
      { item: "Huile de tournesol", qty: "2 cs" },
      { item: "Sucre de coco", qty: "2 cc" },
      { item: "Lait de coco", qty: "40 cl" },
      { item: "Gingembre frais", qty: "5 cm" },
      { item: "Petits pois surgelés", qty: "150 g" },
      { item: "Lentilles corail", qty: "4 cs" },
      { item: "Coriandre fraîche", qty: "quelques brins" },
    ],
    steps: [
      { num: 1, title: "La préparation", desc: "Décortiquez les crevettes. Coupez les oignons en fines lamelles. Hachez l'ail. Râpez le gingembre. Ciselez les feuilles de combava." },
      { num: 2, title: "La base curry", desc: "Dans une poêle chaude, faites griller la pâte de curry. Ajoutez 3 cs de sauce soja et l'huile, laissez cuire 1 min, puis ajoutez les oignons et baissez le feu. Dès que les oignons commencent à dorer, ajoutez le reste de sauce soja et le sucre de coco, puis faites caraméliser 4 min à feu doux." },
      { num: 3, title: "Les crevettes & la sauce", desc: "Mettez les crevettes dans la poêle et faites-les revenir 5 min. Ajoutez l'ail, versez le lait de coco, déposez les feuilles de combava ciselées et le gingembre râpé. Ajoutez les petits pois et les lentilles, mélangez, puis couvrez. Laissez mijoter 20 min à feu doux." },
      { num: 4, title: "Dressage", desc: "Parsemez de coriandre ciselée et dégustez en plat unique ou avec du riz. Attention, la pâte de curry vert est très épicée — ajustez la quantité selon votre tolérance !" },
    ],
  },
  {
    id: 24,
    name: "Poulet sauté au curry & noix de cajou",
    subtitle: "Champignons • Sauce soja • Cives",
    time: "30 min", servings: 4, difficulty: "Facile", calories: "440 kcal",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c7?w=600&q=80",
    tags: ["Poulet", "Wok", "Rapide"],
    ingredients: [
      { item: "Blancs de poulet", qty: "400 g" },
      { item: "Curry en poudre", qty: "1 cs" },
      { item: "Noix de cajou non salées", qty: "100 g" },
      { item: "Fécule de maïs", qty: "2 cs" },
      { item: "Oignon", qty: "1 pièce" },
      { item: "Champignons de Paris", qty: "250 g" },
      { item: "Huile de tournesol", qty: "2 cs" },
      { item: "Sauce soja", qty: "2 cs" },
      { item: "Cives ou oignons de printemps", qty: "2 pièces" },
    ],
    steps: [
      { num: 1, title: "La préparation", desc: "Coupez les blancs de poulet en cubes et roulez-les dans la fécule de maïs. Détaillez l'oignon en morceaux et émincez les champignons." },
      { num: 2, title: "Le wok", desc: "Faites chauffer l'huile dans un wok et faites-y dorer le poulet avec l'oignon. Saupoudrez de curry, remuez, puis ajoutez les champignons et faites sauter 5 min." },
      { num: 3, title: "La sauce", desc: "Ajoutez la sauce soja et les noix de cajou, versez un peu d'eau et faites cuire encore 5 min." },
      { num: 4, title: "Dressage", desc: "Servez parsemé de cives émincées. Accompagnez de riz blanc ou de nouilles selon votre envie." },
    ],
  },
  {
    id: 20,
    name: "Salade au halloumi grillé",
    subtitle: "Roquette • Bresaola • Vinaigrette zaatar",
    time: "16 min", servings: 2, difficulty: "Facile", calories: "520 kcal",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    tags: ["Salade", "Levantine", "Estivale"],
    ingredients: [
      { item: "Halloumi", qty: "200 g" },
      { item: "Roquette", qty: "1 sachet" },
      { item: "Pois chiches égouttés", qty: "200 g" },
      { item: "Bresaola", qty: "6 tranches" },
      { item: "Concombre", qty: "1 pièce" },
      { item: "Tomates séchées", qty: "6 pièces" },
      { item: "Pistaches ou pignons", qty: "30 g" },
      { item: "Huile d'olive (vinaigrette)", qty: "3 cs" },
      { item: "Citron (jus)", qty: "1 pièce" },
      { item: "Zaatar", qty: "2 cs" },
      { item: "Miel châtaigne ou lavande", qty: "1 cc + ½ cc" },
      { item: "Ail en poudre", qty: "1 cc" },
      { item: "Huile d'olive (halloumi)", qty: "1 cs" },
    ],
    steps: [
      { num: 1, title: "La vinaigrette zaatar", desc: "Dans un grand saladier, mélanger l'huile d'olive et le jus de citron. Ajouter le zaatar, 1 cc de miel et l'ail en poudre. Fouetter jusqu'à obtenir une vinaigrette homogène." },
      { num: 2, title: "Composer la salade", desc: "Couper le concombre en demi-lunes. Ajouter dans le saladier avec les tomates séchées, la roquette, les pistaches (ou pignons), les pois chiches et la bresaola. Mélanger délicatement pour bien enrober de vinaigrette." },
      { num: 3, title: "Griller le halloumi", desc: "Couper le halloumi en tranches épaisses. Faire chauffer l'huile dans une poêle à feu vif. Cuire 2 à 3 min de chaque côté jusqu'à belle dorure. Verser un filet de miel (½ cc) en fin de cuisson." },
      { num: 4, title: "Dresser et servir", desc: "Déposer le halloumi encore chaud sur la salade. Servir immédiatement pour conserver le côté fondant-croustillant du fromage." },
    ],
  },
  {
    id: 19,
    name: "Pâtes au thon de Loulou Kitchen",
    subtitle: "Linguine • Crème • Câpres & olives",
    time: "25 min", servings: 2, difficulty: "Facile", calories: "650 kcal",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80",
    tags: ["Pâtes", "Thon", "Crémeux"],
    ingredients: [
      { item: "Linguine", qty: "200–250 g" },
      { item: "Thon en boîte", qty: "1 boîte" },
      { item: "Steak de thon frais (optionnel)", qty: "1 pièce" },
      { item: "Oignon rouge", qty: "½ pièce" },
      { item: "Gousses d'ail", qty: "2–3 pièces" },
      { item: "Concentré de tomate", qty: "1 cs" },
      { item: "Crème liquide entière", qty: "20 cl" },
      { item: "Olives vertes dénoyautées", qty: "1 poignée" },
      { item: "Câpres", qty: "1 cs" },
      { item: "Jus de citron", qty: "½ citron" },
      { item: "Persil frais", qty: "quelques brins" },
      { item: "Huile d'olive", qty: "selon goût" },
      { item: "Sel, poivre", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Les pâtes", desc: "Faites cuire les linguine dans une grande quantité d'eau salée selon les indications du paquet. Avant de les égoutter, gardez une louche d'eau de cuisson — elle sera précieuse pour la sauce." },
      { num: 2, title: "La base", desc: "Dans une poêle, faites revenir l'oignon rouge finement haché dans un filet d'huile d'olive jusqu'à ce qu'il devienne translucide. Ajoutez l'ail haché et le concentré de tomate, faites revenir 1 minute supplémentaire." },
      { num: 3, title: "La sauce crémeuse", desc: "Versez la crème liquide, ajoutez les olives et les câpres. Laissez mijoter à feu doux 5 minutes. Si vous utilisez du thon frais, saisissez-le rapidement à la poêle (1–2 min de chaque côté) puis émiettez-le grossièrement avant de l'ajouter à la sauce. Incorporez ensuite le thon en boîte égoutté." },
      { num: 4, title: "Le grand final", desc: "Ajoutez les pâtes directement dans la sauce avec un peu d'eau de cuisson pour bien les enrober. Mélangez. Hors du feu, ajoutez le jus de citron et le persil ciselé. Goûtez et ajustez sel et poivre. Servez immédiatement !" },
    ],
  },
  {
    id: 14,
    name: "Salade César",
    subtitle: "Poulet • Croûtons ail • Sauce anchois",
    time: "40 min", servings: 4, difficulty: "Moyen", calories: "520 kcal",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80",
    tags: ["Poulet", "Salade", "Classique"],
    ingredients: [
      { item: "Sucrines", qty: "5 pièces" },
      { item: "Filet de poulet", qty: "400 g" },
      { item: "Parmesan en copeaux", qty: "150 g" },
      { item: "Pain pour croûtons", qty: "100 g" },
      { item: "Gousse d'ail", qty: "1 pièce" },
      { item: "Huile de tournesol (cuisson)", qty: "1 cs" },
      { item: "Huile de tournesol (pain)", qty: "1 cc" },
      { item: "Parmesan en poudre (sauce)", qty: "20 g" },
      { item: "Anchois", qty: "10 g" },
      { item: "Lait", qty: "70 ml" },
      { item: "Crème liquide entière", qty: "30 g" },
      { item: "Mayonnaise", qty: "60 g" },
      { item: "Jus de citron", qty: "5 cl" },
      { item: "Vinaigre de xérès", qty: "1 cc" },
      { item: "Gousse d'ail (sauce)", qty: "1 pièce" },
      { item: "Huile d'olive (sauce)", qty: "1 cs" },
      { item: "Sel, poivre", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Les sucrines", desc: "Enlevez la base blanche des sucrines, coupez-les en 4 dans la longueur, puis en 3 dans la largeur." },
      { num: 2, title: "Les croûtons à l'ail", desc: "Mélangez la cuillerée à café d'huile de tournesol et l'ail ciselé finement. Frottez le pain avec la sauce ainsi obtenue. Salez puis taillez-le en petits dés pour obtenir des croûtons. Enfournez-les à 180°C pendant 7 minutes." },
      { num: 3, title: "La sauce César", desc: "Mixez le lait, les anchois, l'ail, le vinaigre et l'huile d'olive. Ajoutez ensuite la crème, puis le parmesan en poudre, la mayonnaise, du sel, un tour de moulin à poivre et le jus de citron. La sauce peut paraître liquide au moment où vous terminez de la mixer mais elle va beaucoup s'épaissir." },
      { num: 4, title: "Vérification", desc: "Vérifiez l'assaisonnement en goûtant (il faut toujours goûter quand on cuisine, c'est un devoir ET un plaisir)." },
      { num: 5, title: "Le poulet", desc: "Faites cuire les filets 5 à 7 minutes dans une poêle bien chaude avec la cuillerée à soupe d'huile de tournesol, salez et poivrez. Taillez les filets en lamelles plutôt fines." },
      { num: 6, title: "Dressage !", desc: "À vos marques ! Prêt ? Dressez ! Disposez les sucrines, les lamelles de poulet, la sauce onctueuse, parsemez de copeaux de parmesan et éparpillez les croûtons encore chauds !" },
    ],
  },
  {
    id: 15,
    name: "Tataki de saumon & mangue fraîche",
    subtitle: "Riz japonais • Marinade miel & sésame",
    time: "30 min", servings: 4, difficulty: "Moyen", calories: "480 kcal",
    image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600&q=80",
    tags: ["Saumon", "Japonais", "Marinade"],
    ingredients: [
      { item: "Pavés de saumon", qty: "4 pièces" },
      { item: "Riz japonais", qty: "280 g" },
      { item: "Chair de mangue", qty: "240 g" },
      { item: "Sauce soja sucrée", qty: "5 cs" },
      { item: "Graines de sésame doré", qty: "selon goût" },
      { item: "Basilic frais", qty: "1 botte" },
      { item: "Miel d'acacia", qty: "2 cc" },
      { item: "Citrons verts", qty: "2 pièces" },
      { item: "Huile de sésame", qty: "quelques gouttes" },
    ],
    steps: [
      { num: 1, title: "La marinade", desc: "Lavez et séchez le basilic. Réalisez la marinade en mélangeant la sauce soja sucrée, l'huile de sésame, le jus des citrons et le basilic. Mixez l'ensemble, puis faites-y mariner le saumon pendant 24 heures." },
      { num: 2, title: "Le riz japonais", desc: "Rincez le riz japonais au moins 3 fois à l'eau claire. Égouttez et recouvrez-le avec environ 1,2 fois son volume d'eau (336 ml). Portez les moins boués en calcul mental à la casserole et posez-la sur un feu vif. Aux premiers bouillons, baissez à feu moyen et comptez 10 minutes. Quand il n'y a plus d'eau, éteignez le feu et laissez reposer à couvert 10 minutes." },
      { num: 3, title: "Le tataki", desc: "Placez les pavés de saumon dans un plat et faites-les colorer au four 2 minutes à 210°C. Détaillez les tronçons en tranches fines façon tataki et parsemez les graines de sésame doré." },
      { num: 4, title: "Dressage", desc: "Coupez la mangue en dés. Dressez le riz, le saumon, la mangue et accompagnez de sauce soja sucrée." },
    ],
  },
  {
    id: 16,
    name: "Bœuf sauté à la thaïe",
    subtitle: "Riz • Échalotes • Basilic thaï • Sriracha",
    time: "45 min", servings: 4, difficulty: "Moyen", calories: "560 kcal",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80",
    tags: ["Bœuf", "Thaï", "Épicé"],
    ingredients: [
      { item: "Bavettes de bœuf", qty: "2 pièces (~450 g)" },
      { item: "Riz thaï", qty: "400 g" },
      { item: "Poivron rouge", qty: "1 pièce" },
      { item: "Échalotes", qty: "10 pièces" },
      { item: "Basilic thaï", qty: "1 botte" },
      { item: "Sauce soja salée", qty: "2 cs" },
      { item: "Sauce d'huître", qty: "2 cc" },
      { item: "Sauce sriracha", qty: "2 cc" },
      { item: "Sauce nuoc-mâm", qty: "2 cs" },
      { item: "Jus de citron vert", qty: "1 citron" },
      { item: "Ail semoule", qty: "1 pincée" },
      { item: "Cassonade", qty: "1 cc" },
      { item: "Huile de tournesol", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Les légumes", desc: "Épluchez et émincez les échalotes et le poivron rouge. Ciselez le basilic thaï." },
      { num: 2, title: "Le bœuf", desc: "Émincez les bavettes en lamelles, puis faites-les sauter à la poêle dans un fond d'huile, mais pas trop car elles finiront de cuire avec la sauce." },
      { num: 3, title: "Le riz", desc: "Faites cuire le riz thaï dans une fois et demie son volume d'eau, soit 600 ml, ou selon les conseils p.79." },
      { num: 4, title: "Les légumes sautés", desc: "Faites revenir les échalotes et le poivron dans un trait d'huile. Ajoutez l'ail semoule et le sucre puis laissez colorer." },
      { num: 5, title: "La sauce", desc: "Versez ensuite la sauce soja salée puis la sauce d'huître et la sauce sriracha. Laissez fondre les échalotes et le poivron dedans." },
      { num: 6, title: "Le grand final", desc: "Ajoutez la viande reposée et son jus. Terminez votre plat en versant le nuoc-mâm et le jus de citron vert en fin de cuisson. Dressez de belles assiettes pour vous régaler !" },
    ],
  },
  {
    id: 17,
    name: "Poulet aux champignons & lardons",
    subtitle: "Riz thaï • Crème • Persil frais",
    time: "40 min", servings: 4, difficulty: "Facile", calories: "610 kcal",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c7?w=600&q=80",
    tags: ["Poulet", "Crémeux", "Réconfortant"],
    ingredients: [
      { item: "Filets de poulet fermier", qty: "4 pièces" },
      { item: "Riz thaï", qty: "300 g" },
      { item: "Lardons fumés", qty: "100 g" },
      { item: "Champignons de Paris", qty: "170 g" },
      { item: "Oignon jaune", qty: "1 pièce" },
      { item: "Crème liquide entière", qty: "240 ml" },
      { item: "Persil frais", qty: "½ botte" },
      { item: "Huile de tournesol", qty: "selon goût" },
      { item: "Sel, poivre", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Les champignons", desc: "À l'aide d'un petit couteau, grattez les champignons pour les nettoyer sans les passer sous l'eau, puis émincez-les." },
      { num: 2, title: "L'oignon", desc: "Détaillez grossièrement l'oignon." },
      { num: 3, title: "Le poulet", desc: "Coupez les filets de poulet en 2 dans la longueur, puis en cubes de la taille d'une touche de clavier d'ordinateur." },
      { num: 4, title: "La poêle", desc: "Poêlez les lardons et le poulet avec un peu d'huile. Ajoutez l'oignon et les champignons, puis déglacez. Ajoutez la crème lorsque le tout se colore. Laissez réduire." },
      { num: 5, title: "L'assaisonnement", desc: "Ajoutez un chouia de sel (les lardons sont déjà très salés) et un tour de moulin à poivre." },
      { num: 6, title: "Le riz", desc: "Faites cuire le riz selon notre recette p.79, si vous ne la connaissez pas encore par cœur." },
      { num: 7, title: "Dressage", desc: "Dans chaque assiette, disposez du riz, du mélange au poulet et ciselez du persil par-dessus. Servez chaud !" },
    ],
  },
  {
    id: 18,
    name: "Cabillaud, concassée tomates & gingembre",
    subtitle: "Épinards • Lait de coco • Curry vert",
    time: "45 min", servings: 4, difficulty: "Facile", calories: "390 kcal",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    tags: ["Poisson", "Épicé", "Léger"],
    ingredients: [
      { item: "Cabillaud (4 filets)", qty: "480 g" },
      { item: "Riz thaï", qty: "270 g" },
      { item: "Pousses d'épinard", qty: "45 g" },
      { item: "Oignon rouge épluché", qty: "40 g" },
      { item: "Concassée de tomates", qty: "350 g" },
      { item: "Lait de coco", qty: "380 ml" },
      { item: "Jus de citron vert", qty: "30 ml" },
      { item: "Gingembre frais râpé", qty: "3,5 g" },
      { item: "Pâte de curry vert", qty: "1 cc" },
      { item: "Curry en poudre", qty: "1 pincée" },
      { item: "Huile de tournesol", qty: "1 cs" },
      { item: "Sel, poivre", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "La découpe", desc: "Lavez les pousses d'épinard, ciselez-les. Émincez l'oignon rouge." },
      { num: 2, title: "Le riz", desc: "Faites cuire le riz thaï comme on vous l'indique p.79." },
      { num: 3, title: "La sauce", desc: "Faites revenir l'oignon et les épices dans un peu d'huile de tournesol. Déglacez avec le lait de coco et le jus de citron vert et laissez frémir environ 25 minutes. Vérifiez l'assaisonnement, puis ajoutez la concassée de tomates et mélangez." },
      { num: 4, title: "Le cabillaud", desc: "Faites cuire le cabillaud dans le four préchauffé à 200°C pendant 4 à 6 minutes selon la puissance du four." },
      { num: 5, title: "Dressage", desc: "Sur un lit de riz, déposez les pousses d'épinards et le poisson. Versez la sauce et léchez la cuillère, vous en avez le droit." },
    ],
  },
  {
    id: 12,
    name: "Salade de bœuf thaïe",
    subtitle: "Bavette • Pousses de soja • Sauce thaï",
    time: "20 min", servings: 2, difficulty: "Facile", calories: "420 kcal",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    tags: ["Bœuf", "Thaï", "Salade"],
    ingredients: [
      { item: "Bavette de bœuf", qty: "200 g" },
      { item: "Pousses de soja", qty: "125 g" },
      { item: "Poivron rouge", qty: "½ pièce" },
      { item: "Chou rouge", qty: "¼ pièce" },
      { item: "Coriandre fraîche", qty: "½ botte" },
      { item: "Gingembre frais", qty: "5 g" },
      { item: "Ail", qty: "½ gousse" },
      { item: "Citron vert", qty: "½ pièce" },
      { item: "Sauce soja salée", qty: "22 ml" },
      { item: "Sauce nuoc-mâm", qty: "22 ml" },
      { item: "Vinaigre de riz", qty: "20 ml" },
      { item: "Huile de sésame", qty: "10 ml" },
      { item: "Cassonade", qty: "1,5 pincée" },
      { item: "Huile d'olive", qty: "1 filet" },
      { item: "Fleur de sel et poivre", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Atelier découpe", desc: "Lavez tous les légumes. Émincez finement le chou rouge et le poivron. Hachez grossièrement la coriandre, tiges comprises. Râpez le gingembre. Épluchez puis écrasez l'ail. Mélangez les légumes et les pousses de soja dans un grand saladier." },
      { num: 2, title: "Sauce thaï maison", desc: "Dans un mixeur ou un bol, ajoutez le gingembre, l'ail, le jus du citron vert, la sauce soja, le nuoc-mâm, le vinaigre de riz et l'huile de sésame. Ajoutez la cassonade. Mixez ou fouettez jusqu'à obtenir une sauce bien lisse. Goûtez et ajustez l'assaisonnement avec du poivre." },
      { num: 3, title: "Le bœuf entre en scène", desc: "Faites chauffer un filet d'huile d'olive dans une grande poêle à feu vif. Faites cuire la bavette 2–3 min par face selon l'épaisseur. La viande doit être bien colorée à l'extérieur et encore tendre à cœur. Salez légèrement. Laissez reposer la viande 2 min avant de la couper en fines lamelles dans le sens de la fibre." },
      { num: 4, title: "Le grand final", desc: "Répartissez la salade de légumes dans des assiettes creuses. Disposez les lamelles de bœuf par-dessus. Versez généreusement la sauce thaï. Parsemez du reste de coriandre. Servez immédiatement." },
    ],
  },
  {
    id: 13,
    name: "Salade quinoa, grenade, feta & menthe",
    subtitle: "Boulgour • Grenade • Vinaigrette xérès",
    time: "25 min", servings: 2, difficulty: "Facile", calories: "510 kcal",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    tags: ["Végétarien", "Frais", "Céréales"],
    ingredients: [
      { item: "Quinoa blond", qty: "100 g" },
      { item: "Boulgour", qty: "85 g" },
      { item: "Feta", qty: "100 g" },
      { item: "Grenade", qty: "1 pièce" },
      { item: "Menthe fraîche", qty: "½ botte" },
      { item: "Vinaigre de xérès", qty: "10 ml" },
      { item: "Huile d'olive", qty: "2 cs" },
      { item: "Huile de tournesol", qty: "1 cs" },
      { item: "Sel", qty: "selon goût" },
    ],
    steps: [
      { num: 1, title: "Herbes & fraîcheur", desc: "Lavez puis séchez la menthe. Effeuillez-la puis ciselez-la finement. Émiettez la feta dans un bol. Coupez la grenade en deux." },
      { num: 2, title: "Les céréales en action", desc: "Faites cuire le quinoa dans une casserole d'eau bouillante salée pendant 10–12 min. Faites cuire le boulgour séparément selon les indications du paquet. Égouttez bien les deux céréales. Laissez-les refroidir quelques minutes." },
      { num: 3, title: "Atelier grenade", desc: "Tapotez le dos des demi-grenades avec une cuillère en bois pour faire tomber les graines. Retirez les éventuelles membranes blanches. Mélangez les graines avec le quinoa et le boulgour." },
      { num: 4, title: "Le grand mélange", desc: "Ajoutez la menthe ciselée et la feta émiettée aux céréales. Dans un petit bol, mélangez le vinaigre de xérès avec l'huile d'olive et l'huile de tournesol. Salez légèrement. Versez la vinaigrette sur la salade puis mélangez délicatement." },
    ],
  },
];

const VIEWS = { HOME: "home", RECIPE: "recipe", CART: "cart", SHOPPING: "shopping" };

function mergeIngredients(cartDishes) {
  const map = {};
  cartDishes.forEach((dish) => {
    dish.ingredients.forEach(({ item, qty }) => {
      const key = item.toLowerCase().trim();
      if (map[key]) { map[key].sources.push({ dish: dish.name, qty }); }
      else { map[key] = { item, qty, sources: [{ dish: dish.name, qty }] }; }
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

  const toggleCart = (dish) => setCart((p) => p.includes(dish.id) ? p.filter((id) => id !== dish.id) : [...p, dish.id]);
  const openDish = (dish) => { setSelected(dish); setActiveStep(0); setView(VIEWS.RECIPE); };
  const toggleCheck = (key) => setChecked((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div style={S.root}>
      <header style={S.header}>
        <div style={S.headerInner}>
          {view !== VIEWS.HOME
            ? <button style={S.backBtn} onClick={() => setView(VIEWS.HOME)}>← Retour</button>
            : <span style={S.logo}>🍽 MesRecettes</span>}
          <div style={S.headerRight}>
            {view === VIEWS.HOME && (
              <button style={cartCount > 0 ? S.cartBtnActive : S.cartBtn} onClick={() => cartCount > 0 && setView(VIEWS.CART)}>
                🛒 {cartCount > 0 ? `${cartCount} plat${cartCount > 1 ? "s" : ""}` : "Panier vide"}
              </button>
            )}
            {view === VIEWS.RECIPE && <button style={S.cartBtnActive} onClick={() => setView(VIEWS.CART)}>🛒 Panier {cartCount > 0 && `(${cartCount})`}</button>}
            {view === VIEWS.CART && cartCount > 0 && <button style={S.cartBtnActive} onClick={() => setView(VIEWS.SHOPPING)}>📋 Liste de courses</button>}
            {view === VIEWS.SHOPPING && <span style={S.shoppingCount}>{checkedCount}/{mergedList.length}</span>}
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
                      <div style={S.cardBadges}>{dish.tags.map((t) => <span key={t} style={S.badge}>{t}</span>)}</div>
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
                  <button style={{ ...S.addToCartBtn, ...(inCart ? S.addToCartBtnActive : {}) }} onClick={() => toggleCart(dish)}>
                    {inCart ? "✓ Retirer du panier" : "+ Ajouter au panier"}
                  </button>
                </div>
              );
            })}
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
            <button style={{ ...S.addToCartBtn, width: "100%", marginBottom: 28, borderRadius: 12, borderTop: `1px solid ${C.border}`, ...(cart.includes(selected.id) ? S.addToCartBtnActive : {}) }} onClick={() => toggleCart(selected)}>
              {cart.includes(selected.id) ? "✓ Dans le panier — Retirer" : "+ Ajouter au panier"}
            </button>

            {/* INGREDIENTS SECTION */}
            <h2 style={S.sectionTitle}>Ingrédients · {selected.servings} personnes</h2>
            <div style={S.ingredientGrid}>
              {selected.ingredients.map((ing, i) => (
                <div key={i} style={S.ingredientChip}>
                  <span style={S.ingredientChipQty}>{ing.qty}</span>
                  <span style={S.ingredientChipName}>{ing.item}</span>
                </div>
              ))}
            </div>

            <h2 style={{ ...S.sectionTitle, marginTop: 28 }}>Étapes de la recette</h2>
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
                : <button style={{ ...S.navBtn, ...S.navBtnSuccess }}>✓ Terminé !</button>}
            </div>
            <h2 style={{ ...S.sectionTitle, marginTop: 8 }}>Toutes les étapes</h2>
            {selected.steps.map((s, i) => (
              <div key={i} style={{ ...S.stepRow, ...(i === activeStep ? S.stepRowActive : {}) }} onClick={() => setActiveStep(i)}>
                <div style={{ ...S.stepRowNum, ...(i === activeStep ? S.stepRowNumActive : {}) }}>{s.num}</div>
                <div><div style={S.stepRowTitle}>{s.title}</div><div style={S.stepRowDesc}>{s.desc.substring(0, 60)}…</div></div>
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
                <div style={S.cartSummaryRow}><span style={S.cartSummaryLabel}>Plats sélectionnés</span><span style={S.cartSummaryValue}>{cartCount}</span></div>
                <div style={S.cartSummaryRow}><span style={S.cartSummaryLabel}>Articles à acheter</span><span style={S.cartSummaryValue}>{mergedList.length}</span></div>
              </div>
              <button style={S.shoppingCTA} onClick={() => setView(VIEWS.SHOPPING)}>📋 Voir la liste de courses globale ({mergedList.length} articles)</button>
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
            <div style={S.progressPill}><div style={{ ...S.progressFill, width: `${mergedList.length ? (checkedCount / mergedList.length) * 100 : 0}%` }} /></div>
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
                    {ing.sources.length > 1 && <span style={S.ingredientSources}>{ing.sources.map((s) => s.dish).join(" · ")}</span>}
                  </div>
                  <div style={S.ingredientQtyWrap}>
                    {ing.sources.map((s, j) => <span key={j} style={S.ingredientQty}>{s.qty}</span>)}
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

const C = { bg: "#f5f5f5", card: "#ffffff", accent: "#12c91b", text: "#1a1a1a", muted: "#888888", border: "#e0e0e0", green: "#12c91b" };

const S = {
  root: { fontFamily: "'Futura','Century Gothic','Trebuchet MS',sans-serif", background: C.bg, minHeight: "100vh", color: C.text },
  header: { position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "0 20px", height: 56, display: "flex", alignItems: "center" },
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
  recipeHero: { position: "relative", height: 260, margin: "0 -16px" },
  recipeHeroImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  recipeHeroGrad: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(245,245,245,1) 0%, rgba(245,245,245,0.2) 60%, transparent 100%)" },
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
  stepDesc: { fontSize: 14, lineHeight: 1.7, color: "#555555", margin: 0 },
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
  ingredientGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 },
  ingredientChip: { display: "flex", flexDirection: "column", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", gap: 2 },
  ingredientChipQty: { fontSize: 13, fontWeight: "bold", color: C.accent },
  ingredientChipName: { fontSize: 13, color: C.text },
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
