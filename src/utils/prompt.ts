export interface FewShotExample {
  user: string;
  assistant: string;
}
export const KERALA_SYSTEM_PROMPT = `
You are "Krishi Sakhi" (meaning "Farming Friend" in Malayalam), a digital farming assistant specifically designed for smallholder farmers in Kerala, India.

CORE RESPONSIBILITIES:
1. Provide personalized, practical farming advice based on the farmer's specific context
2. Focus on Kerala's unique agricultural conditions: tropical climate, monsoon patterns, local crops
3. Offer guidance suitable for small-scale farming with limited resources
4. Be culturally appropriate and respectful of traditional farming knowledge
5. Provide actionable steps that farmers can implement immediately

SPECIALIZED KNOWLEDGE:
- Kerala crops: Rice (including Pokkali), coconut, banana, rubber, spices (pepper, cardamom, vanilla), vegetables, tapioca
- Regional variations: Kuttanad (rice bowl), Palakkad (paddy), Idukki (spices), Wayanad (coffee, spices)
- Malayalam month-based agricultural calendar (Kollavarsham)
- Local pest and disease management
- Organic farming practices suitable for Kerala
- Water management for monsoon and dry seasons
- Government schemes available for Kerala farmers

COMMUNICATION STYLE:
- Friendly, empathetic, and encouraging
- Use simple, clear language (avoid technical jargon)
- Be concise but thorough
- Use bullet points or numbered steps for complex advice
- Always consider the farmer's economic constraints
- Acknowledge when you don't know something and suggest alternatives

IMPORTANT: All responses will be translated to Malayalam by the system, so keep sentences clear and avoid idioms that don't translate well.
`;

/**
 * Few-shot learning examples for Kerala-specific farming scenarios
 */
export const FEW_SHOT_EXAMPLES : FewShotExample[] = [
  {
    user: "My rice field in Kuttanad is waterlogged after heavy rain. What should I do?",
    assistant:
      "For waterlogged rice fields in Kuttanad:\n\n1. Check drainage channels immediately and clear any blockages\n2. If water is stagnant for more than 3 days, create temporary drains\n3. Avoid fertilizer application until water recedes\n4. Monitor for root rot symptoms - yellowing leaves, stunted growth\n5. Once water drains, apply Trichoderma bio-fungicide to prevent diseases\n6. Consider raised bed cultivation for future planting",
  },
  {
    user: "I want to plant brinjal next week in Thrissur. Any specific advice?",
    assistant:
      "For brinjal cultivation in Thrissur:\n\n1. Soil preparation: Ensure well-drained soil with compost mixed (2kg/sq.m)\n2. Variety selection: Choose Suhasini or Swetha varieties resistant to shoot borer\n3. Spacing: 60cm between plants, 75cm between rows\n4. Watering: Light watering every evening for first 2 weeks\n5. Pest protection: Use neem-based spray weekly to prevent fruit borer\n6. Harvest: First harvest in 60-70 days, continue for 3-4 months\n\nBest planting time: Early morning or late afternoon",
  },
  {
    user: "There's a pest outbreak in my banana farm in Palakkad. Leaves are turning yellow with black spots.",
    assistant:
      "This sounds like Sigatoka leaf spot disease. Immediate actions:\n\n1. Remove and burn severely infected leaves\n2. Apply Bordeaux mixture (1%) or Mancozeb (0.2%) spray\n3. Improve air circulation by removing excess suckers\n4. Ensure proper drainage to reduce humidity\n5. For organic control: Use neem oil spray with garlic extract\n6. Maintain soil health with potassium-rich fertilizers\n\nSpray every 15 days until controlled. Avoid water on leaves during irrigation.",
  },
  {
    user: "Monsoon is expected next week in Kozhikode. Should I fertilize my coconut trees now?",
    assistant:
      "Postpone fertilizer application until after heavy rains subside. Instead:\n\n1. Focus on drainage: Create trenches around trees to prevent waterlogging\n2. Mulching: Apply coconut husk or dry leaves around base to conserve moisture\n3. Support young trees with stakes to prevent wind damage\n4. After rains: Apply 1kg organic manure + 500g NPK mixture per tree\n5. For bearing trees: Add 1kg salt per tree to improve copra quality\n\nWait for 7-10 days after heavy rain before fertilizing.",
  },
  {
    user: "How much irrigation is needed for my tomato crop in Thiruvananthapuram during summer?",
    assistant:
      "Summer tomato irrigation in Thiruvananthapuram:\n\n1. Frequency: Water every 2-3 days depending on soil moisture\n2. Method: Drip irrigation is best, otherwise water at plant base\n3. Morning watering: 6-8 AM to reduce evaporation\n4. Quantity: 4-5 liters per plant per watering\n5. Mulching: Use straw or plastic mulch to conserve moisture\n6. Signs of stress: Wilting leaves need immediate watering\n\nReduce frequency if rainfall occurs. Avoid waterlogging.",
  },
  {
    user: "My pepper vines in Idukki are showing poor growth. What nutrients are missing?",
    assistant:
      "Pepper vines in Idukki often need these nutrients:\n\n1. Nitrogen: For leaf growth (apply compost or urea)\n2. Magnesium: Yellowing between veins (apply Epsom salt)\n3. Zinc: Small leaves (apply zinc sulfate)\n4. Organic matter: Apply 10kg farmyard manure per vine annually\n\nImmediate action:\n- Soil test for exact deficiencies\n- Apply 500g NPK 12:32:16 mixture per vine\n- Foliar spray with micronutrients\n- Ensure good drainage and support system",
  },
  {
    user: "My tapioca plants in Pathanamthitta have curled leaves and stunted growth. What could be wrong?",
    assistant:
      "These are symptoms of mite or mosaic virus attack.\n\n1. Inspect underside of leaves for red mites\n2. Spray neem oil (3%) with soap solution weekly\n3. Remove and destroy infected plants\n4. Improve spacing and air circulation\n5. Apply compost or well-rotted manure to improve soil\n6. Use virus-resistant varieties next season (e.g., Sree Vijaya)",
  },
  {
    user: "Planning to grow groundnut in Alappuzha after paddy. Any tips?",
    assistant:
      "For groundnut cultivation in Alappuzha:\n\n1. Soil: Light sandy loam with good drainage\n2. Seed rate: 100-120kg per hectare\n3. Variety: Use TMV-7 or Kadiri 6 for higher yield\n4. Spacing: 30cm between rows, 10cm between plants\n5. Irrigation: Light watering every 7–10 days\n6. Harvest: In 90-100 days, when leaves start yellowing",
  },
  {
    user: "My bitter gourd plants in Kannur are not flowering well. What should I do?",
    assistant:
      "Poor flowering in bitter gourd is often due to excess nitrogen or lack of sunlight.\n\n1. Reduce nitrogen fertilizers, increase phosphorus\n2. Apply bone meal or superphosphate (20g/plant)\n3. Ensure 6+ hours of sunlight\n4. Spray borax (0.1%) weekly to promote flowering\n5. Train vines vertically to increase light exposure\n6. Hand-pollinate if bee activity is low",
  },
  {
    user: "Is it a good time to plant turmeric in Malappuram this month?",
    assistant:
      "Yes, post-monsoon (September) is ideal for turmeric.\n\n1. Land: Well-drained loamy soil with partial shade\n2. Rhizomes: Use healthy mother rhizomes (25-30g each)\n3. Spacing: 30cm between rows, 25cm between plants\n4. Manure: Apply 25 tons FYM per hectare before planting\n5. Mulching: Use green leaves or straw after planting\n6. Watering: Weekly during dry spells",
  },
  {
    user: "My okra in Kollam has holes in leaves. What pest is this and how to control?",
    assistant:
      "Likely a flea beetle or leafhopper infestation.\n\n1. Spray neem oil (3%) with soap every 7 days\n2. Apply ash or turmeric powder on leaves early morning\n3. Use sticky traps to catch flying insects\n4. Remove and destroy infected leaves\n5. Avoid over-fertilizing with nitrogen\n6. Rotate crop to prevent buildup of pests",
  },
  {
    user: "I want to try ginger farming in Wayanad. Where do I start?",
    assistant:
      "For ginger farming in Wayanad:\n\n1. Select gently sloped land with partial shade\n2. Use healthy, disease-free rhizomes (20-25g)\n3. Treat rhizomes with Trichoderma before planting\n4. Spacing: 25cm x 20cm with raised beds\n5. Apply 25 tons FYM + neem cake (2.5kg/bed)\n6. Mulch after planting and repeat after 45 days",
  },
  {
    user: "How can I control weeds in my paddy field in Kasaragod?",
    assistant:
      "Weed control in paddy (wetland) fields:\n\n1. Manual weeding: 2 times – at 20 and 40 days\n2. Mechanical: Use conoweeder or rotary weeder\n3. Chemical: Apply Butachlor 1.5kg/ha 3 days after transplanting\n4. Maintain proper water level (2-3cm) to suppress weed growth\n5. Rotate crops to reduce weed population\n6. Avoid over-fertilization which boosts weed growth",
  },
  {
    user: "Can I grow cowpea in Ernakulam during this season?",
    assistant:
      "Yes, cowpea is suitable for Ernakulam in post-monsoon season.\n\n1. Use varieties like Kairali or Bhagyalakshmi\n2. Sow seeds 30cm apart in rows\n3. Add 5 tons FYM per acre before sowing\n4. Inoculate seeds with Rhizobium for better nitrogen fixation\n5. Water once in 3-4 days during dry spells\n6. Harvest green pods in 50-60 days",
  },
  {
    user: "My arecanut palms in Thrissur show yellowing leaves. What's the issue?",
    assistant:
      "Yellowing in arecanut palms could be due to iron/magnesium deficiency or root rot.\n\n1. Apply magnesium sulfate (100g/tree) and zinc sulfate (50g/tree)\n2. Ensure proper drainage to avoid root rot\n3. Mulch around base to retain moisture\n4. Avoid waterlogging – create drainage channels\n5. Apply 1kg compost + 150g NPK mix per tree\n6. Conduct soil test for confirmation",
  },
  {
    user: "Planning to intercrop turmeric with coconut in Kozhikode. Is it a good idea?",
    assistant:
      "Yes, turmeric grows well as intercrop with coconut.\n\n1. Choose shade-tolerant turmeric varieties (e.g., Suguna)\n2. Plant turmeric 1m away from coconut base\n3. Apply FYM + neem cake before planting\n4. Water twice a week in dry period\n5. Use mulch to reduce weeds and retain moisture\n6. Harvest turmeric after 8–9 months",
  },
  {
    user: "I see black mold on my mango leaves in Kasaragod. How do I treat it?",
    assistant:
      "Black mold is often due to sooty mold from sap-sucking insects.\n\n1. Check for aphids, scales, mealybugs\n2. Spray neem oil or soap solution (weekly)\n3. Wipe off mold with cloth dipped in baking soda water\n4. Apply horticultural oil if infestation is heavy\n5. Prune dense canopy for better airflow\n6. Avoid excessive nitrogen fertilizer",
  },
  {
    user: "My chili plants in Palakkad are dropping flowers. What’s wrong?",
    assistant:
      "Flower drop in chili is caused by stress or pest attack.\n\n1. Avoid overwatering or underwatering\n2. Spray borax (0.1%) once in 10 days\n3. Apply balanced NPK (prefer 5:10:10)\n4. Check for thrips and aphids; use neem spray\n5. Avoid overhead watering\n6. Ensure minimum 5 hours of sunlight",
  },
  {
    user: "Should I prune my guava tree in Idukki after harvest?",
    assistant:
      "Yes, pruning after harvest improves next yield.\n\n1. Remove dead, diseased, crossing branches\n2. Prune light to medium – retain strong outward branches\n3. Apply cow dung paste on cuts to prevent infection\n4. Add compost around base after pruning\n5. Water lightly for next few days\n6. Spray micronutrients to boost regrowth",
  },
  {
    user: "Can I grow snake gourd vertically in my small yard in Alappuzha?",
    assistant:
      "Yes, snake gourd thrives with vertical support.\n\n1. Use bamboo trellis or wire mesh (6–7 ft tall)\n2. Sow seeds in pits with compost (30cm apart)\n3. Train vines upward from early stage\n4. Water every 2–3 days during flowering\n5. Spray neem extract to control pests\n6. Harvest in 60 days – when fruits are young and tender",
  },
  {
    user: "What organic fertilizer can I use for cabbage in Wayanad?",
    assistant:
      "Organic options for cabbage nutrition:\n\n1. Apply 20 tons FYM per hectare before planting\n2. Use neem cake (2kg per 10 sq.m)\n3. Vermicompost: 500g per plant\n4. Panchagavya spray every 15 days\n5. Cow dung slurry at 20-day intervals\n6. Add wood ash for potassium boost",
  },
  {
    user: "Is drumstick (moringa) suitable for hilly areas like Idukki?",
    assistant:
      "Yes, moringa grows well in Idukki if soil drains well.\n\n1. Choose variety like PKM-1 or local tall types\n2. Plant on slopes with terrace bunds\n3. Use compost and wood ash in planting pits\n4. Prune after 6 months to encourage branching\n5. Water weekly during dry months\n6. Harvest leaves every 30–40 days",
  },
  {
    user: "I want to set up a kitchen garden in Kannur. What vegetables should I start with?",
    assistant:
      "For a beginner-friendly kitchen garden:\n\n1. Start with tomatoes, chilies, spinach, okra, and long beans\n2. Use grow bags or raised beds with compost-rich soil\n3. Water daily in morning\n4. Use neem spray to prevent pests\n5. Harvest spinach in 25–30 days, tomatoes in 60 days\n6. Practice crop rotation every 2-3 months",
  },
  {
    user: "My pumpkin vines in Malappuram are drying at the base. What is this?",
    assistant:
      "Likely a stem rot or wilt disease.\n\n1. Check for fungal growth near soil line\n2. Apply Trichoderma paste at base\n3. Improve drainage, avoid overhead watering\n4. Mulch with dry leaves to prevent splash infection\n5. Remove infected vines immediately\n6. Use resistant varieties next time (e.g., Arka Chandan)",
  },
  {
    user: "Planning to grow beetroot in Thiruvananthapuram. Any tips?",
    assistant:
      "Beetroot grows well in cool post-monsoon weather.\n\n1. Sow seeds 2cm deep, 10cm apart\n2. Use raised beds with sandy loam soil\n3. Add compost and wood ash before sowing\n4. Thin plants after 2 weeks to avoid crowding\n5. Water twice a week\n6. Harvest in 50–60 days when bulbs are 5-6cm wide",
  },
  {
    user: "What should I do before planting yam in Kollam?",
    assistant:
      "Yam needs deep, loose soil and good nutrition.\n\n1. Dig pits (60x60x60cm), fill with compost and sand mix\n2. Use healthy tuber pieces (300–500g)\n3. Apply neem cake to pits before planting\n4. Support with bamboo stakes for vines\n5. Water weekly until monsoon starts\n6. Harvest in 8–10 months after planting",
  }



  {
    question:
      "How can I control banana weevil (Odoiporus longicollis) in my plantation without chemicals?",
    answer:
      "Regularly remove and destroy weevil-infested pseudostems and corms. Use pheromone traps by placing rolled banana leaves with weevil pheromone near plants. Introduce beneficial nematodes (Steinernema spp.) in the soil. Maintain good field hygiene and avoid leaving residues that harbor pests.",
  },
  {
    question:
      "Which rice variety is best suited for low-lying paddy fields prone to flooding during monsoon in Kerala?",
    answer:
      "Cultivate ‘Jyothi’ or ‘Uma’, which are submergence-tolerant. Use direct-seeded rice method for better establishment. Raise seedlings in nursery beds, then transplant at 25 cm x 25 cm spacing. Apply green leaf manure to enhance soil organic carbon.",
  },
  {
    question:
      "How do I schedule irrigation for vegetables during the dry season in Kollam?",
    answer:
      "Water early in the morning and late afternoon to reduce evaporation. Use drip irrigation or water channels to supply 2–3 l per plant per day. Mulch with straw or dried palm fronds to conserve moisture. Monitor soil moisture by feeling the soil at 5 cm depth—if it’s dry, irrigate.",
  },
  {
    question:
      "What natural methods can I use to improve sandy soil in Kasaragod?",
    answer:
      "Incorporate well-decomposed compost or farmyard manure at least 10 t/ha. Add green manure crops like sunn hemp or sesbania and plough them in before flowering. Apply rice husk or coir pith to increase water retention. Use biofertilisers such as Azospirillum and phosphate-solubilizing bacteria.",
  },
  {
    question:
      "How can I protect my pepper vines from Phytophthora foot rot during the monsoon?",
    answer:
      "Ensure proper drainage around vines; create raised beds. Apply neem cake or Trichoderma viride at 2 kg/vine base every 3 months. Use Bordeaux mixture spray (1%) in early monsoon. Avoid waterlogging by weeding and mulching with coconut husk.",
  },
  {
    question:
      "When should I apply lime to acid soils in Wayanad tea plantations?",
    answer:
      "Test soil pH; if below 4.8, apply fine calcitic lime at 1 t/ha before the monsoon. Broadcast evenly and incorporate into topsoil, then irrigate lightly to activate. Recheck soil pH after 6 months and reapply if still below 5. Naming soil improvement to support better nutrient uptake.",
  },
  {
    question: "How can I control stem borer in maize organically?",
    answer:
      "Inspect plants weekly and remove egg masses. Release Trichogramma chilonis locally. Install light traps to catch adults. Intercrop with sesame or apply neem oil (5%) spray during early infestations. Maintain field sanitation by destroying stubbles post-harvest.",
  },
  {
    question:
      "Which cover crops help improve soil fertility in rubber plantations in Thrissur?",
    answer:
      "Grow legumes like sunn hemp, cowpea, and groundnut between rubber rows. Sow during monsoon, and incorporate them as green manure before flowering—it adds nitrogen and improves soil structure.",
  },
  {
    question:
      "How do I prepare for unpredictable monsoon rains when planting vegetable seedlings?",
    answer:
      "Raise seedlings in shade-protected trays with well-drained media. Harden off seedlings by gradually exposing them to rain over 3–5 days. Install rain shelters or temporary plastic covers. Monitor weather alerts via local agri services and adjust transplanting schedules accordingly.",
  },
  {
    question:
      "What is the best way to manage root-knot nematodes in tapioca fields without chemicals?",
    answer:
      "Practice crop rotation with marigold or cowpea. Apply neem cake (1 t/ha) to the soil during land preparation. Use Trichoderma harzianum biofungicide. Solarize soil by covering with transparent plastic sheets during dry, sunny months for 4–6 weeks.",
  },
  {
    question:
      "How can I conserve soil moisture in dry coconut groves during summer?",
    answer:
      "Apply 10 cm of mulch—coir pith or dry leaves—around each palm. Use basin irrigation to concentrate water. Apply 100 g neem seed kernel powder at the basin. Cover trenches with mulch to minimize evaporation and gradually release moisture.",
  },
  {
    question:
      "Which fodder crops grow well under irrigated conditions in central Kerala?",
    answer:
      "Plant Napier grass, guinea grass, or desmanthus. Sow in 2–meter strips or around field perimeters. Provide irrigation 2–3 times a week, fertilise with FYM at 20 t/ha, and cut at 60 cm height for regrowth.",
  },
  {
    question:
      "How do I use drip irrigation efficiently for tomato cultivation in Palakkad?",
    answer:
      "Install drip laterals with 30 cm emitter spacing. Start with 1 l/hour emitters. Irrigate daily for two weeks after transplanting, then every alternate day. Monitor soil moisture manually or using tensiometers to adjust frequency.",
  },
  {
    question:
      "Which indigenous methods help repel leaf-eating caterpillars in okra and brinjal?",
    answer:
      "Spray a garlic–chili infusion (crush 20 garlic cloves + 10 chilies in 10 l water, ferment 24 h, strain and add 20 ml soap) every 5–7 days. Use eggplant stem traps and collect caterpillars manually. Encourage yellow sticky traps near plants.",
  },
  {
    question: "How can I increase organic matter in clay soils of Kottayam?",
    answer:
      "Apply compost or farmyard manure at 15 t/ha annually. Grow green manure such as sunn hemp or sesbania between seasons and plough them in. Use vermicompost in planting holes (500 g per pit) for each fruit plant.",
  },
  {
    question:
      "How to time fertiliser application for maize under rainfed conditions in Idukki?",
    answer:
      "Apply half of urea and single super phosphate at planting. Apply remaining urea in 2 split doses—one at 30 days and one at 60 days after sowing. Mix with irrigation water or apply on moist soil before rains come.",
  },
  {
    question:
      "What pest-control methods help reduce stem borers in turmeric organically?",
    answer:
      "Remove affected rhizomes and bury them. Use Trichoderma enriched biofertilizer around planting holes. Apply neem seed kernel powder at planting and send down soil.",
  },
  {
    question:
      "How can I reduce water use in paddy fields when irrigation is limited?",
    answer:
      "Use alternate wetting and drying (AWD): allow field to dry till cracks appear or water depth drops to 10 cm, then refill. This decreases water usage by up to 30% and improves root aeration.",
  },
  {
    question:
      "Which drought-tolerant vegetable varieties should I grow during summer?",
    answer:
      "Choose okra, ridge gourd, sponge gourd, and snake gourd—they need less water and perform well under warm, dry conditions. Use mulching to preserve soil moisture.",
  },
  {
    question:
      "What steps help manage leaf spot disease in rubber nurseries naturally?",
    answer:
      "Remove and destroy diseased leaves. Spray 0.5% neem oil plus 0.1% soap solution weekly. Improve air circulation by thinning. Apply Trichoderma powder in nursery media.",
  },
  {
    question:
      "How can I improve soil pH in acidic vegetable gardens in Kerala’s highlands?",
    answer:
      "Mix finely powdered lime or dolomite at 500 kg/ha during dry season. Incorporate into soil. Retest after 6 months and repeat if pH is still under 5.5.",
  },
  {
    question:
      "How do I schedule sowing of green manures in fallow land before planting paddy?",
    answer:
      "During the end of monsoon (September–October), broadcast sunn hemp seeds at 20 kg/ha and allow them to grow for 40 days. Plough them in two weeks before planting paddy to enrich organic matter.",
  },
  {
    question: "What natural methods help control mealybugs on areca nut palms?",
    answer:
      "Spray a mixture of 5 kg lime, 5 kg ash, and 1 kg thiourea in 100 l water. Use horticultural soap. Encourage predator beetles by planting flowering border crops like marigold.",
  },
  {
    question:
      "How do I irrigate cassava during dry months without wasting water?",
    answer:
      "Create basins around each plant. Apply 20 l water per plant once every 7–10 days, depending on weather. Mulch with dried leaves to conserve moisture and reduce frequency.",
  },
  {
    question:
      "How to select the right vegetable mix for intercropping with banana?",
    answer:
      "Choose shade-tolerant crops like turmeric, ginger, or amaranth—plant in spaces between bunches. Ensure good drainage. Space at 30–40 cm. Apply compost and water lightly until established.",
  },
  {
    question:
      "What are the organic solutions for controlling bud rot in banana plants?",
    answer:
      "Cut and destroy infected bunches and pseudostems. Improve drainage. Apply Trichoderma harzianum or neem cake (1 kg per plant) at monthly intervals. Avoid water logging.",
  },
  {
    question:
      "How can I improve nitrogen content in soil using homemade compost?",
    answer:
      "Include green vegetable kitchen waste, legume residues, and cow dung in compost pile. Turn it every 2 weeks to aerate. Compost well‑rotted before applying at 5 t/ha to fields.",
  },
  {
    question:
      "How do I plan irrigation during late monsoon for fodder production?",
    answer:
      "After rains, resume irrigation with 20 mm water weekly. Use furrow or channel methods. Monitor and adjust depending on rainfall received.",
  },
  {
    question:
      "What practices aid in controlling whitefly in vegetable gardens using eco‑friendly means?",
    answer:
      "Introduce yellow sticky traps near vulnerable crops. Spray water mixed with a drop of soap to knock off adults. Use neem oil spray (3%) every 7 days.",
  },
  {
    question:
      "Which soil amendment helps reduce soil compaction in rubber nurseries?",
    answer:
      "Mix river sand or cocopeat (30%) with existing nursery soil. Integrate perlite or compost for better porosity and drainage, promoting root growth.",
  },
  {
    question:
      "How do I prepare for pest outbreaks after the first monsoon showers?",
    answer:
      "Scout fields daily for increased pest activity. Deploy pheromone traps and yellow sticky cards. Maintain barrier crops like marigold. Spray neem seed decoctions preemptively when pests first appear.",
  },
  {
    question: "How can I use banana pseudostem mulch in my field effectively?",
    answer:
      "Cut stable sections of pseudostem into strips. Lay them around plants as mulch—it retains moisture, suppresses weeds, and decomposes to enrich organic matter.",
  },
  {
    question:
      "What irrigation approach is best for betel vine cultivation in Vypeen?",
    answer:
      "Use basin irrigation with 10–15 l water per clump every 3–4 days. Include organic mulch around root zone. Use neem cake weekly at 100 g per plant during monsoon.",
  },
  {
    question: "How do I assess soil fertility without lab facilities?",
    answer:
      "Use a DIY soil test: mix soil with vinegar—if it fizzes, it's alkaline; use citric acid: fast fizzing means alkaline soil. Incorporate compost regardless. Observe plant vigor and leaf color—yellow leaves suggest nitrogen deficiency.",
  },
  {
    question:
      "What are the steps to manage rodent damage in lowland farms near paddy fields?",
    answer:
      "Remove weeds and field trash. Set up live-capture traps. Build bund walls around fields. Grow aromatic plants like lemongrass along borders to repel rodents naturally.",
  },
  {
    question:
      "Which legumes should I include in crop rotation to fix nitrogen for paddy?",
    answer:
      "Rotate paddy with cowpea, green gram, or mung bean during dry season. Incorporate the crop residues into soil after harvest to release nitrogen.",
  },
  {
    question: "How to protect young coconut seedlings from drought stress?",
    answer:
      "Water seedlings every other day at 2 l each until established. Apply coir pith mulch around the base. Add 20 g neem cake per seedling in every 3 weeks until rainy season.",
  },
  {
    question: "What organic method controls thrips in onion beds?",
    answer:
      "Spray garlic–tamarind mixture (crush 10 garlic cloves + soak tamarind extract in 10 l water). Strain and apply weekly. Apply neem oil at 3 ml/l where needed. Keep beds weed-free and well aired.",
  },
  {
    question: "How do I manage waterlogging in low-lying vegetable plots?",
    answer:
      "Raise beds 20–25 cm above ground. Create shallow drains around beds. Apply gypsum (250 kg/ha) to improve infiltration. Mulch with coir pith to reduce pooling.",
  },
  {
    question: "Which cash crops grow well under rubber canopy?",
    answer:
      "Under store rubber shade, plant medicinal ginger, turmeric, and ashwagandha. Provide light irrigation and mulch. Use vermicompost in each hole before planting.",
  },
  {
    question:
      "How can I forecast local rainfall to plan sowing and harvesting?",
    answer:
      "Use Kerala Agricultural University’s daily agromet advisories via SMS or mobile app. Observe morning dew and cloud patterns—thunder indicates likely afternoon rain, but clear sky suggests dryness.",
  },
  {
    question:
      "What are eco‑friendly methods to manage banana bunchy top virus?",
    answer:
      "Use disease-free suckers for planting. Roguing infected plants immediately. Disinfect tools with 10% lime wash. Encourage natural aphid predators like ladybugs.",
  },
  {
    question:
      "How do I conduct efficient composting in warm humid conditions of Kerala?",
    answer:
      "Pile organic waste in shaded area. Keep moisture at 50–60%. Turn every 10 days. Use a mix of leafy greens and dry coconut waste to balance C:N ratio.",
  },
  {
    question:
      "How can I reduce post‑harvest losses of cassava in humid rural settings?",
    answer:
      "Wash and sun-dry harvested roots for 1‑2 hours. Store in ventilated sheds on raised racks. Use clean, dry gunny bags instead of plastic.",
  },
  {
    question: "What are the natural ways to control stem rot in ginger fields?",
    answer:
      "Avoid waterlogging by planting on raised beds. Apply Trichoderma harzianum powder and neem cake at planting. Rotate with cereals to break disease cycle.",
  },
  {
    question:
      "How do I manage water scarcity during peak flowering of coconut palms?",
    answer:
      "Target basin irrigation with 20 l water per palm weekly. Apply mulches and 100 g neem cake to improve soil moisture retention and root health.",
  },
  {
    question: "Which traditional indicators help predict rain onset in Kerala?",
    answer:
      "Observe local abiotic cues—early morning cool temperature, ant lines visible, ‘thick’ clouds from the west, and recurring ‘thunder sounds’ by 9 am typically signal rain within hours.",
  },
  {
    question: "How can farmers reuse their organic crop residues effectively?",
    answer:
      "Chop residues like banana pseudostems and incorporate them into compost piles. Use as mulch around new plantings. They return nutrients slowly and improve moisture retention.",
  },
  {
    question: "How do I manage stem rot in turmeric with indigenous methods?",
    answer:
      "Ensure raised bed planting. Apply neem cake (1 t/ha) and Trichoderma powder at planting. Remove and bake infected rhizomes in the sun before discarding.",
  },
  {
    question:
      "What’s the best way to capture and use rainwater on small farms in Kerala?",
    answer:
      "Build a check dam or bund across minor drains. Divert rain runoff into farm ponds. Use collected water via buckets or gravity flow to irrigate gardens during dry spells.",
  },
  {
    question:
      "How can I check if my soil is too saline for planting vegetables?",
    answer:
      "Take a pinch of soil, mix with water—if a white crust forms after drying, it indicates salinity. Leach with extra irrigation or apply gypsum to reduce salt concentration.",
  },
  {
    question:
      "How do I encourage beneficial insects in my mixed cropping system?",
    answer:
      "Plant flower strips with marigold, cosmos, and coriander to attract predators. Avoid broad spectrum pesticides. Provide shade and small water sources like damp cloths to sustain beneficial insects.",
  },
  {
    question:
      "What measures can I take to reduce lodging in tall paddy varieties during wind storms?",
    answer:
      "Fertilize using split nitrogen doses rather than full basal applications. Apply zinc and silica sprays. Plant at recommended spacing and maintain healthy root systems through continual soil moisture.",
  },
  {
    question: "How can mulch help control weeds in pepper gardens?",
    answer:
      "Apply 5–10 cm thick mulch of rice straw or coir pith between vines. It suppresses weeds, retains moisture, and gradually adds organic matter as it decomposes.",
    },
  {
    "user": "How can I control the spread of leaf spot in my banana plantation during the monsoon?",
    "assistant": "Remove and destroy infected leaves. Ensure proper drainage to avoid water stagnation. Spray a 1% Bordeaux mixture every 20 days during the rainy season."
  },
  {
    "user": "What should I do to improve soil fertility in my rice field in Kuttanad?",
    "assistant": "Apply farmyard manure at 5 tons/acre during field preparation. Use green manure like dhaincha before transplanting. Avoid overuse of chemical fertilizers."
  },
  {
    "user": "My coconut palms are not producing nuts. What could be wrong?",
    "assistant": "Check for adequate watering, especially during summer. Apply balanced nutrients—use 50 kg FYM, 500g urea, 800g super phosphate, and 1 kg muriate of potash per palm annually, split into two doses."
  },
  {
    "user": "What is the best variety of banana for high yield in central Kerala?",
    "assistant": "Nendran and Poovan are widely cultivated for both yield and market value. For shorter duration and better resistance, choose varieties like Grand Naine."
  },
  {
    "user": "How can I manage red palm weevil in my coconut farm?",
    "assistant": "Regularly clean the crown area. Place pheromone traps to monitor adults. Apply neem oil emulsion or fill leaf axils with insecticidal mixture like chlorantraniliprole if infestation is found."
  },
  {
    "user": "What is the ideal time to plant rice in Wayanad?",
    "assistant": "June–July is best for the main kharif season. Use short-duration varieties if there’s a chance of late monsoon or early drought."
  },
  {
    "user": "How do I manage wilt disease in my vegetable garden organically?",
    "assistant": "Use raised beds with good drainage. Apply Trichoderma viride with compost to the root zone. Rotate crops and avoid planting the same family of vegetables consecutively."
  },
  {
    "user": "Which vegetables can I grow in the summer season in Kerala with limited water?",
    "assistant": "Grow drought-tolerant vegetables like okra, cowpea, bitter gourd, and ash gourd. Use mulch and drip irrigation to conserve water."
  },
  {
    "user": "How often should I irrigate banana plants during summer?",
    "assistant": "Irrigate once every 3–4 days with 20–30 liters per plant. Use basin irrigation or drip system and apply mulch to retain soil moisture."
  },
  {
    "user": "What organic fertilizers can I use to improve pepper yield?",
    "assistant": "Apply compost, neem cake (1–2 kg per vine), and biofertilizers like Azospirillum and phosphate solubilizing bacteria. Mulch the base with dry leaves and irrigate during dry spells."
  },
  {
    "user": "My paddy plants are falling before maturity. What causes this?",
    "assistant": "This could be due to lodging caused by overuse of nitrogen or wind. Use recommended fertilizer doses and choose shorter, sturdy varieties. Drain excess water during maturity."
  },
  {
    "user": "How can I prevent bud rot in coconut during rainy season?",
    "assistant": "Keep the crown area clean. Apply Bordeaux paste or copper oxychloride paste to the infected area. Ensure good drainage around the palm base."
  },
  {
    "user": "What is the best method to control stem borers in rice?",
    "assistant": "Use pheromone traps and light traps to monitor adult moths. Release egg parasitoids like Trichogramma. Avoid excessive nitrogen fertilizer."
  },
  {
    "user": "My vegetable plants are turning yellow. What does this mean?",
    "assistant": "Yellowing could be due to nitrogen deficiency or poor drainage. Apply well-rotted compost or urea and ensure proper water management."
  },
  {
    "user": "How can I grow tapioca organically in Kerala?",
    "assistant": "Plant disease-free stem cuttings during May–June. Apply farmyard manure (10 tons/ha), neem cake (500 kg/ha), and mulch with dry leaves. Use Trichoderma for disease control."
  },
  {
    "user": "What is the best way to harvest and store rice to prevent spoilage?",
    "assistant": "Harvest when grains are mature and hard. Dry the grains to 14% moisture and store in jute bags in a dry, airy location off the ground."
  },
  {
    "user": "Can I intercrop vegetables with banana in Kerala?",
    "assistant": "Yes, grow shade-tolerant crops like ginger, turmeric, or colocasia. Ensure enough spacing and apply additional nutrients for both crops."
  },
  {
    "user": "My coconut leaves are showing yellowing along the edges. What is the issue?",
    "assistant": "It could be potassium deficiency. Apply muriate of potash (1 kg per palm/year) in two split doses along with irrigation."
  },
  {
    "user": "How can I control fruit fly in my bitter gourd crop?",
    "assistant": "Use pheromone traps (methyl eugenol), cover fruits with bags, and spray neem seed kernel extract (5%) weekly."
  },
  {
    "user": "What is the best soil type for paddy cultivation?",
    "assistant": "Clayey loam or alluvial soil with good water-holding capacity is ideal. Maintain pH between 5.5 and 6.5 for optimal growth."
  },
  {
    "user": "How do I prepare compost using farm waste?",
    "assistant": "Layer green waste, dry leaves, and cow dung in a pit. Turn every 15 days. Compost will be ready in 2–3 months."
  },
  {
    "user": "How can I control aphids in my okra crop?",
    "assistant": "Spray neem oil (5 ml/litre) or garlic-chili extract. Avoid overwatering and remove weeds regularly to reduce pest hiding spots."
  },
  {
    "user": "What is the best method to irrigate paddy fields in water-scarce areas?",
    "assistant": "Use alternate wetting and drying (AWD). Allow the field to dry for 2–3 days before next irrigation. This saves water and improves yield."
  },
  {
    "user": "My banana plant has a bunch but no fruits are forming. What’s wrong?",
    "assistant": "This may be due to poor pollination or nutrient deficiency. Apply a mixture of DAP and potash and maintain regular watering."
  },
  {
    "user": "Can I use green manure before planting vegetables?",
    "assistant": "Yes. Grow sunhemp or cowpea, plough it in before flowering (around 40 days). Wait 2 weeks before planting vegetables."
  },
  {
    "user": "What are common pests in tapioca and how to control them?",
    "assistant": "Mealybugs and red spider mites are common. Use neem oil spray (5%) and apply ash on leaf undersides to reduce mite infestation."
  },
  {
    "user": "How can I prevent fungal disease in brinjal during monsoon?",
    "assistant": "Ensure proper spacing and drainage. Apply Trichoderma mixed with compost at planting. Avoid overhead watering."
  },
  {
    "user": "When should I apply lime to my acidic vegetable field?",
    "assistant": "Apply lime during the dry season, 1 month before sowing. Mix well into the topsoil and irrigate lightly after application."
  },
  {
    "user": "Is mulching beneficial in Kerala's vegetable farms?",
    "assistant": "Yes. Mulching with dry leaves or straw helps retain soil moisture, suppress weeds, and reduce temperature fluctuations."
  },
  {
    "user": "My rice field has patches with stunted growth. What is the reason?",
    "assistant": "It could be zinc deficiency. Apply zinc sulfate at 25 kg/ha. Ensure uniform leveling and avoid water stagnation."
  },
  {
    "user": "How do I manage water logging in vegetable gardens during monsoon?",
    "assistant": "Plant on raised beds, provide side drains, and cover soil with mulch. Avoid heavy irrigation during rainy spells."
  },
  {
    "user": "How can I store harvested coconuts safely during rainy season?",
    "assistant": "Store in a dry, well-ventilated shed. Keep coconuts on a raised bamboo platform or wooden rack to avoid ground moisture."
  },
  {
    "user": "What spacing is ideal for planting okra in Kerala?",
    "assistant": "Maintain spacing of 30 cm between plants and 45 cm between rows for good air circulation and sunlight."
  },
  {
    "user": "How do I manage rat infestation in my paddy fields?",
    "assistant": "Use bait traps with rice mixed with zinc phosphide. Keep bunds clean and plug rat holes regularly."
  },
  {
    "user": "Can I grow vegetables in old rubber plantations?",
    "assistant": "Yes, shade-tolerant crops like ginger, turmeric, and colocasia can be grown. Apply organic manure and ensure irrigation."
  },
  {
    "user": "What is the best fertilizer schedule for Nendran banana?",
    "assistant": "Apply 10 kg FYM, 200 g N, 100 g P, and 300 g K per plant in 3 split doses—after planting, at 3rd month, and 5th month."
  },
  {
    "user": "How do I improve soil structure in sandy soil areas?",
    "assistant": "Add compost, cow dung, and green manure crops. Incorporate coir pith and biochar to retain moisture and nutrients."
  },
  {
    "user": "What is the best time for transplanting rice seedlings in lowland Kerala?",
    "assistant": "Transplant 20–25 day old seedlings during early monsoon (June–July). Maintain proper water depth (2–3 cm) initially."
  },
  {
    "user": "Can I grow ginger organically in Kerala?",
    "assistant": "Yes. Use disease-free seed rhizomes. Apply compost, neem cake, and Trichoderma. Mulch heavily and irrigate moderately."
  },
  {
    "user": "How do I control shoot borer in brinjal?",
    "assistant": "Remove and destroy infested shoots. Spray neem oil or Bacillus thuringiensis (Bt) weekly during the flowering stage."
  },
  {
    "user": "How can I protect young banana plants from wind damage?",
    "assistant": "Support the plant with bamboo stakes. Plant windbreak trees on borders. Avoid overcrowding and ensure strong root anchoring."
  }


];
