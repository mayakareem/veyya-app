export const getServiceImage = (serviceName: string, categoryName: string): string => {
  const lowerName = serviceName.toLowerCase();
  const lowerCategory = categoryName.toLowerCase();

  // Beauty services
  if (lowerName.includes("classic facial")) return "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80";
  if (lowerName.includes("anti-aging facial")) return "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80";
  if (lowerName.includes("hydrating facial")) return "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&q=80";
  if (lowerName.includes("acne")) return "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80";
  if (lowerName.includes("brightening")) return "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80";
  if (lowerName.includes("full face waxing")) return "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80";
  if (lowerName.includes("eyebrow waxing")) return "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80";
  if (lowerName.includes("upper lip waxing")) return "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80";
  if (lowerName.includes("full body waxing")) return "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80";
  if (lowerName.includes("eyebrow threading")) return "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80";
  if (lowerName.includes("upper lip threading")) return "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80";
  if (lowerName.includes("full face threading")) return "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80";
  if (lowerName.includes("classic eyelash")) return "https://images.unsplash.com/photo-1583001952003-421b25e94e7a?w=600&q=80";
  if (lowerName.includes("volume eyelash")) return "https://images.unsplash.com/photo-1592621385645-e41659e8aabe?w=600&q=80";
  if (lowerName.includes("lash refill")) return "https://images.unsplash.com/photo-1583512603806-077998240c7a?w=600&q=80";
  if (lowerName.includes("lash removal")) return "https://images.unsplash.com/photo-1588956270607-1ea489bfdf67?w=600&q=80";

  // Nails services
  if (lowerName.includes("basic manicure")) return "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80";
  if (lowerName.includes("gel manicure")) return "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80";
  if (lowerName.includes("french manicure")) return "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&q=80";
  if (lowerName.includes("luxury spa manicure")) return "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&q=80";
  if (lowerName.includes("basic pedicure")) return "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&q=80";
  if (lowerName.includes("gel pedicure")) return "https://images.unsplash.com/photo-1599948128020-9a44d19e2c0f?w=600&q=80";
  if (lowerName.includes("spa pedicure")) return "https://images.unsplash.com/photo-1588896601339-a1e0e2ee2f81?w=600&q=80";
  if (lowerName.includes("acrylic")) return "https://images.unsplash.com/photo-1606135321446-f0c21d1e2a91?w=600&q=80";
  if (lowerName.includes("nail extensions - gel")) return "https://images.unsplash.com/photo-1611329532992-4e4b7d4b155f?w=600&q=80";
  if (lowerName.includes("extension refill")) return "https://images.unsplash.com/photo-1598948485421-78246cb4d6f5?w=600&q=80";
  if (lowerName.includes("nail art - simple")) return "https://images.unsplash.com/photo-1604654895440-50b9e1dd4ea4?w=600&q=80";
  if (lowerName.includes("nail art - complex")) return "https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?w=600&q=80";
  if (lowerName.includes("chrome")) return "https://images.unsplash.com/photo-1603420432309-ba3e2900ae3d?w=600&q=80";
  if (lowerName.includes("ombre")) return "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=600&q=80";

  // Hair services
  if (lowerName.includes("women's haircut")) return "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80";
  if (lowerName.includes("men's haircut")) return "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80";
  if (lowerName.includes("kids haircut")) return "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&q=80";
  if (lowerName.includes("hair wash")) return "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80";
  if (lowerName.includes("full color")) return "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80";
  if (lowerName.includes("root touch up")) return "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80";
  if (lowerName.includes("balayage")) return "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80";
  if (lowerName.includes("highlights - full")) return "https://images.unsplash.com/photo-1528920304568-7aa06b3dda8b?w=600&q=80";
  if (lowerName.includes("highlights - partial")) return "https://images.unsplash.com/photo-1562004760-acb5342a1bc0?w=600&q=80";
  if (lowerName.includes("keratin")) return "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80";
  if (lowerName.includes("deep conditioning")) return "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80";
  if (lowerName.includes("scalp treatment")) return "https://images.unsplash.com/photo-1498843053639-170ff2122f35?w=600&q=80";
  if (lowerName.includes("hair perm")) return "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=600&q=80";
  if (lowerName.includes("hair straightening")) return "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80";
  if (lowerName.includes("updo styling")) return "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&q=80";
  if (lowerName.includes("bridal hair")) return "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80";

  // Makeup services
  if (lowerCategory === "makeup") {
    if (lowerName.includes("bridal makeup")) return "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80";
    if (lowerName.includes("engagement")) return "https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=600&q=80";
    if (lowerName.includes("party makeup")) return "https://images.unsplash.com/photo-1522337294455-ffcc97a5eefe?w=600&q=80";
    if (lowerName.includes("natural day")) return "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80";
    if (lowerName.includes("editorial")) return "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80";
    if (lowerName.includes("hd makeup")) return "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80";
    if (lowerName.includes("airbrush")) return "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80";
    if (lowerName.includes("makeup lesson - basic")) return "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80";
    if (lowerName.includes("makeup lesson - advanced")) return "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80";
    if (lowerName.includes("brow")) return "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80";
    if (lowerName.includes("lash tinting")) return "https://images.unsplash.com/photo-1588896624203-0358a88614fb?w=600&q=80";
    return "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80";
  }

  // Pet Care services
  if (lowerName.includes("small dog bath")) return "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=600&q=80";
  if (lowerName.includes("medium dog bath")) return "https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=600&q=80";
  if (lowerName.includes("large dog bath")) return "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&q=80";
  if (lowerName.includes("small dog full")) return "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80";
  if (lowerName.includes("medium dog full")) return "https://images.unsplash.com/photo-1616817012509-51dbb17d1a90?w=600&q=80";
  if (lowerName.includes("large dog full")) return "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=600&q=80";
  if (lowerName.includes("cat grooming")) return "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600&q=80";
  if (lowerName.includes("nail trimming - dog")) return "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80";
  if (lowerName.includes("nail trimming - cat")) return "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80";
  if (lowerName.includes("teeth cleaning")) return "https://images.unsplash.com/photo-1591768575492-c7b0d877d7de?w=600&q=80";
  if (lowerName.includes("de-shedding")) return "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80";
  if (lowerName.includes("dog walking - 30")) return "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80";
  if (lowerName.includes("dog walking - 60")) return "https://images.unsplash.com/photo-1601758123927-4b2686cb5c9e?w=600&q=80";
  if (lowerName.includes("pet sitting - half")) return "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80";
  if (lowerName.includes("pet sitting - full")) return "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=600&q=80";
  if (lowerName.includes("overnight pet")) return "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=600&q=80";

  // Cleaning services
  if (lowerName.includes("basic house cleaning - small")) return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80";
  if (lowerName.includes("basic house cleaning - medium")) return "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80";
  if (lowerName.includes("basic house cleaning - large")) return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80";
  if (lowerName.includes("deep cleaning - small")) return "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80";
  if (lowerName.includes("deep cleaning - medium")) return "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80";
  if (lowerName.includes("deep cleaning - large")) return "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80";
  if (lowerName.includes("move-in/out cleaning - small")) return "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80";
  if (lowerName.includes("move-in/out cleaning - medium")) return "https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?w=600&q=80";
  if (lowerName.includes("move-in/out cleaning - large")) return "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=600&q=80";
  if (lowerName.includes("office cleaning - small")) return "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80";
  if (lowerName.includes("office cleaning - medium")) return "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80";
  if (lowerName.includes("office cleaning - large")) return "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80";
  if (lowerName.includes("kitchen deep")) return "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&q=80";
  if (lowerName.includes("bathroom deep")) return "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&q=80";
  if (lowerName.includes("window")) return "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80";
  if (lowerName.includes("carpet")) return "https://images.unsplash.com/photo-1624704430746-3c0ff912ec8e?w=600&q=80";

  // Wellness services
  if (lowerName.includes("deep tissue massage - 60")) return "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&q=80";
  if (lowerName.includes("deep tissue massage - 90")) return "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80";
  if (lowerName.includes("thai massage - 60")) return "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80";
  if (lowerName.includes("thai massage - 90")) return "https://images.unsplash.com/photo-1596178060810-36b36a979fb4?w=600&q=80";
  if (lowerName.includes("thai massage - 120")) return "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80";
  if (lowerName.includes("swedish massage - 60")) return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80";
  if (lowerName.includes("swedish massage - 90")) return "https://images.unsplash.com/photo-1591343395902-bae4d26b17c4?w=600&q=80";
  if (lowerName.includes("hot stone massage - 60")) return "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=600&q=80";
  if (lowerName.includes("hot stone massage - 90")) return "https://images.unsplash.com/photo-1604084861171-e816e86964d1?w=600&q=80";
  if (lowerName.includes("aromatherapy massage - 60")) return "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=600&q=80";
  if (lowerName.includes("aromatherapy massage - 90")) return "https://images.unsplash.com/photo-1564072804087-14909b932e27?w=600&q=80";
  if (lowerName.includes("sports massage")) return "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80";
  if (lowerName.includes("prenatal")) return "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=600&q=80";
  if (lowerName.includes("couples")) return "https://images.unsplash.com/photo-1552693673-1bf958298229?w=600&q=80";
  if (lowerName.includes("head & shoulder")) return "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80";
  if (lowerName.includes("foot reflexology")) return "https://images.unsplash.com/photo-1598662779094-e58c92e7af56?w=600&q=80";

  // Fitness services
  if (lowerName.includes("personal training - single")) return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80";
  if (lowerName.includes("personal training - 5")) return "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80";
  if (lowerName.includes("personal training - 10")) return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80";
  if (lowerName.includes("group training")) return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80";
  if (lowerName.includes("yoga class - beginner")) return "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80";
  if (lowerName.includes("yoga class - intermediate")) return "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80";
  if (lowerName.includes("yoga class - advanced")) return "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&q=80";
  if (lowerName.includes("private yoga")) return "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80";
  if (lowerName.includes("pilates class")) return "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80";
  if (lowerName.includes("private pilates")) return "https://images.unsplash.com/photo-1591258370814-01609b0ba27f?w=600&q=80";
  if (lowerName.includes("hiit")) return "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80";
  if (lowerName.includes("boxing")) return "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=80";
  if (lowerName.includes("nutrition consultation")) return "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80";
  if (lowerName.includes("fitness assessment")) return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80";
  if (lowerName.includes("meal planning")) return "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80";

  // Healthcare services - Lab Tests
  if (lowerName.includes("complete blood count") || lowerName.includes("cbc")) return "/images/healthcare/cbc-test.svg";
  if (lowerName.includes("lipid profile")) return "/images/healthcare/lipid-profile.svg";
  if (lowerName.includes("diabetes panel") || lowerName.includes("hba1c")) return "/images/healthcare/diabetes-panel.svg";
  if (lowerName.includes("thyroid function") || lowerName.includes("tsh")) return "/images/healthcare/thyroid-test.svg";
  if (lowerName.includes("liver function")) return "/images/healthcare/liver-function.svg";
  if (lowerName.includes("kidney function")) return "/images/healthcare/kidney-function.svg";
  if (lowerName.includes("vitamin d")) return "/images/healthcare/vitamin-d.svg";

  // Healthcare services - IV Therapy
  if (lowerName.includes("hydration iv")) return "/images/healthcare/hydration-iv.svg";
  if (lowerName.includes("immunity boost iv") || lowerName.includes("immunity iv")) return "/images/healthcare/immunity-iv.svg";
  if (lowerName.includes("energy boost iv") || lowerName.includes("energy iv")) return "/images/healthcare/energy-iv.svg";
  if (lowerName.includes("beauty glow iv") || lowerName.includes("glutathione")) return "/images/healthcare/beauty-iv.svg";

  // Healthcare services - Doctor Consultations
  if (lowerName.includes("general practitioner")) return "/images/healthcare/gp-consultation.svg";
  if (lowerName.includes("pediatrician")) return "/images/healthcare/pediatrician.svg";

  // Healthcare services - Vaccines
  if (lowerName.includes("flu vaccine")) return "/images/healthcare/flu-vaccine.svg";
  if (lowerName.includes("covid-19 vaccine") || lowerName.includes("covid vaccine")) return "/images/healthcare/covid-vaccine.svg";
  if (lowerName.includes("hepatitis b")) return "/images/healthcare/hepatitis-b.svg";

  // Healthcare services - Nurse Care
  if (lowerName.includes("nurse visit") && lowerName.includes("2 hour")) return "/images/healthcare/nurse-visit-2h.svg";
  if (lowerName.includes("nurse visit") && lowerName.includes("4 hour")) return "/images/healthcare/nurse-visit-4h.svg";
  if (lowerName.includes("wound care")) return "/images/healthcare/wound-care.svg";
  if (lowerName.includes("post-surgery care")) return "/images/healthcare/post-surgery.svg";

  // Healthcare services - Physiotherapy
  if (lowerName.includes("general physiotherapy")) return "/images/healthcare/physiotherapy-general.svg";
  if (lowerName.includes("sports injury rehabilitation") || lowerName.includes("sports rehab")) return "/images/healthcare/sports-rehab.svg";
  if (lowerName.includes("post-stroke rehabilitation") || lowerName.includes("stroke rehab")) return "/images/healthcare/stroke-rehab.svg";

  // Healthcare services - Psychotherapy
  if (lowerName.includes("individual therapy")) return "/images/healthcare/individual-therapy.svg";
  if (lowerName.includes("couples therapy")) return "/images/healthcare/couples-therapy.svg";
  if (lowerName.includes("family therapy")) return "/images/healthcare/family-therapy.svg";
  if (lowerName.includes("cognitive behavioral therapy") || lowerName.includes("cbt")) return "/images/healthcare/cbt-therapy.svg";
  if (lowerName.includes("anxiety") && lowerName.includes("depression")) return "/images/healthcare/anxiety-depression.svg";

  // Pet Care services - Grooming (Dogs)
  if (lowerName.includes("basic grooming") && lowerName.includes("dog")) return "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80";
  if (lowerName.includes("full grooming") && lowerName.includes("dog")) return "https://images.unsplash.com/photo-1616013476506-12be68c3179f?w=800&q=80";
  if (lowerName.includes("bath") && lowerName.includes("dog")) return "https://images.unsplash.com/photo-1585559700398-1385b3a8aeb6?w=800&q=80";
  if (lowerName.includes("nail") && lowerName.includes("dog")) return "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=800&q=80";

  // Pet Care services - Grooming (Cats)
  if (lowerName.includes("basic grooming") && lowerName.includes("cat")) return "https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?w=800&q=80";
  if (lowerName.includes("full grooming") && lowerName.includes("cat")) return "https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=800&q=80";
  if (lowerName.includes("bath") && lowerName.includes("cat")) return "https://images.unsplash.com/photo-1611003228941-98852ba62227?w=800&q=80";
  if (lowerName.includes("nail") && lowerName.includes("cat")) return "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80";

  // Pet Care services - Walking
  if (lowerName.includes("15") && lowerName.includes("walk")) return "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80";
  if (lowerName.includes("30") && lowerName.includes("walk")) return "https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&q=80";
  if (lowerName.includes("60") && lowerName.includes("walk")) return "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80";

  // Pet Care services - Sitting
  if (lowerName.includes("pet sitting")) return "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80";
  if (lowerName.includes("day care")) return "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=800&q=80";
  if (lowerName.includes("home check")) return "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80";

  // Pet Care services - Training
  if (lowerName.includes("puppy training")) return "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&q=80";
  if (lowerName.includes("behavior consultation")) return "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=80";

  // Default fallback images by category
  if (lowerCategory === "beauty") return "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80";
  if (lowerCategory === "nails") return "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80";
  if (lowerCategory === "hair") return "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80";
  if (lowerCategory === "makeup") return "https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=600&q=80";
  if (lowerCategory === "pet care") return "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80";
  if (lowerCategory === "cleaning") return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80";
  if (lowerCategory === "wellness") return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80";
  if (lowerCategory === "fitness") return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80";
  if (lowerCategory === "healthcare") return "/images/healthcare/gp-consultation.svg";

  // Ultimate fallback
  return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80";
};
