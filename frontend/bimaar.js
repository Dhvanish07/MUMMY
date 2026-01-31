/**
 * BIMAAR HU - Mummy Care Mode
 * A caring, non-medical guide for home care
 */

const BIMAAR_CONDITIONS = {
    cold: {
        name: "Cold / Cough",
        hindi: "सर्दी / खांसी",
        emoji: "🤧",
        sections: {
            remedies: {
                title: "🏠 Home Remedies",
                content: [
                    "Haldi doodh (Warm milk with turmeric) - drink before bed",
                    "Ginger-lemon-honey water - 2-3 times a day",
                    "Steam inhalation - helps with congestion",
                    "Jeera water - soothes throat",
                    "Warm water gargles with salt",
                    "Rest in a warm room",
                    "Keep body warm with blankets"
                ]
            },
            day_plan: {
                title: "🗓️ Plan My Day (When I'm Not Well)",
                content: [
                    {
                        time: "🌅 Morning (6-8 AM)",
                        activities: [
                            "Light warm water + honey",
                            "Rest for 1-2 hours after waking",
                            "Light breakfast: khichdi, upma, or porridge",
                            "Avoid cold things"
                        ]
                    },
                    {
                        time: "🌞 Afternoon (12-2 PM)",
                        activities: [
                            "Light lunch: dal-rice, soft veggies, warm broth",
                            "Ginger-lemon-honey water",
                            "Rest or light indoor activity",
                            "Avoid going out in cold wind"
                        ]
                    },
                    {
                        time: "🌤️ Evening (4-6 PM)",
                        activities: [
                            "Light snack: warm milk, herbal tea",
                            "Short walk indoors if feeling better",
                            "Steam inhalation before bed"
                        ]
                    },
                    {
                        time: "🌙 Night (8-10 PM)",
                        activities: [
                            "Haldi doodh 1-2 hours before bed",
                            "Keep room warm and humid",
                            "Sleep early for recovery",
                            "Use extra blankets"
                        ]
                    }
                ]
            },
            doctor_questions: {
                title: "🩺 Do I Need to See a Doctor?",
                questions: [
                    "Are you coughing for more than 2-3 weeks continuously?",
                    "Is your fever above 100°F (38°C) alongside cough?",
                    "Are you having difficulty breathing?",
                    "Is the cough accompanied by chest pain?",
                    "Are you coughing up blood or very dark phlegm?"
                ]
            },
            eat_drink: {
                title: "🥣 What to Eat & Drink",
                content: [
                    "Warm milk with turmeric and ginger",
                    "Chicken or vegetable broth",
                    "Khichdi (rice + dal)",
                    "Soft rice with light curry",
                    "Honey (raw, if available)",
                    "Ginger-lemon tea (without sugar if possible)",
                    "Warm water - drink frequently",
                    "Soup with soft vegetables",
                    "Soft fruits: banana, papaya (warm them if needed)"
                ]
            },
            avoid: {
                title: "⛔ What to Avoid",
                content: [
                    "Cold drinks, ice cream, cold water",
                    "Sugary foods and beverages",
                    "Outside food and street food",
                    "Heavy, oily, spicy food",
                    "Dairy (except warm milk) - it can increase mucus",
                    "Excess salt",
                    "Going out in cold or windy weather",
                    "Touching eyes and face frequently"
                ]
            },
            mummy_says: {
                title: "❤️ MUMMY Says",
                content: "Aaram kar beta, ye sardi-khansi to aati-jati rahti hai. Thoda paani pee le, garam reh, aur sone de apne aap ko. Main hoon na, main dekh lungi. Ghar ka khana kha, bahar ka bakwas nahi! 💚 Jaldi theek ho jaayega tu."
            }
        }
    },
    fever: {
        name: "Fever",
        hindi: "बुखार",
        emoji: "🌡️",
        sections: {
            remedies: {
                title: "🏠 Home Remedies",
                content: [
                    "Rest completely - body is fighting infection",
                    "Drink plenty of fluids - water, juices, broth",
                    "Cool compress on forehead and back of neck",
                    "Tulsi (basil) tea - 2-3 times daily",
                    "Neem leaves in warm water - drink small sips",
                    "Keep room well-ventilated",
                    "Light, cotton clothing",
                    "Wet cloth on wrists can help cool body"
                ]
            },
            day_plan: {
                title: "🗓️ Plan My Day (When I'm Not Well)",
                content: [
                    {
                        time: "🌅 Morning (6-8 AM)",
                        activities: [
                            "Drink warm water with lemon and honey",
                            "Rest in bed - don't force yourself up",
                            "Light breakfast if hungry: milk, toast, banana",
                            "Monitor temperature (take note, don't obsess)"
                        ]
                    },
                    {
                        time: "🌞 Afternoon (12-2 PM)",
                        activities: [
                            "Tulsi or neem water",
                            "Light, liquid meal: dal-paani, thin rice-water",
                            "Continue resting",
                            "Cool compress if temperature feels high"
                        ]
                    },
                    {
                        time: "🌤️ Evening (4-6 PM)",
                        activities: [
                            "Warm broth or light soup",
                            "Drink plenty of water and juices",
                            "Gentle rest - no TV or screens",
                            "Light walk in room if feeling slightly better"
                        ]
                    },
                    {
                        time: "🌙 Night (8-10 PM)",
                        activities: [
                            "Light dinner: soft rice with simple gravy",
                            "Tulsi tea before bed",
                            "Wear light clothing, keep room cool",
                            "Sleep deeply - recovery happens in sleep"
                        ]
                    }
                ]
            },
            doctor_questions: {
                title: "🩺 Do I Need to See a Doctor?",
                questions: [
                    "Is fever above 103°F (39.4°C)?",
                    "Has fever been continuous for more than 3-5 days?",
                    "Are you experiencing severe headache, neck stiffness, or confusion?",
                    "Do you have difficulty breathing or chest pain?",
                    "Are you unable to drink water or keep food down?"
                ]
            },
            eat_drink: {
                title: "🥣 What to Eat & Drink",
                content: [
                    "Water - drink as much as comfortable",
                    "Fresh fruit juices: orange, pomegranate (no added sugar)",
                    "Coconut water",
                    "Warm rice-water (congee)",
                    "Dal-paani (thin lentil soup)",
                    "Light vegetable broth",
                    "Warm milk with honey",
                    "Tulsi or ginger tea",
                    "Soft fruits: banana, papaya, grapes"
                ]
            },
            avoid: {
                title: "⛔ What to Avoid",
                content: [
                    "Heavy foods - focus on liquids",
                    "Oily, spicy, and fried foods",
                    "Cold drinks and ice",
                    "Caffeine (coffee, strong tea)",
                    "Sugar and sweets",
                    "Outside food",
                    "Strenuous activity or exercise",
                    "Hot baths - use cool water instead"
                ]
            },
            mummy_says: {
                title: "❤️ MUMMY Says",
                content: "Beta, bukhar iska matlab hai tera sharir kuch lad raha hai. Aaram kar, paani pee, aur acha khana kha. Mummy sab samhal legi. Dar mat, ye sab theek ho jayega! Main hoon na tere paas. 💚"
            }
        }
    },
    stomach: {
        name: "Stomach upset",
        hindi: "पेट खराब",
        emoji: "🤢",
        sections: {
            remedies: {
                title: "🏠 Home Remedies",
                content: [
                    "Jeera water - soothes digestive system",
                    "Ajwain (carom seeds) water",
                    "Light salt with warm water",
                    "Ginger-lemon water - aids digestion",
                    "Rest and light movement only",
                    "Keep stomach warm with a hot water bottle",
                    "Fennel seeds tea",
                    "Mint leaves in warm water"
                ]
            },
            day_plan: {
                title: "🗓️ Plan My Day (When I'm Not Well)",
                content: [
                    {
                        time: "🌅 Morning (6-8 AM)",
                        activities: [
                            "Start with light water + salt + sugar",
                            "Rest in bed or on couch",
                            "If hungry: plain crackers or toast, nothing else",
                            "Jeera water - sip slowly"
                        ]
                    },
                    {
                        time: "🌞 Afternoon (12-2 PM)",
                        activities: [
                            "Light bland meal: plain rice + salt only",
                            "Buttermilk (if available) - aids digestion",
                            "Rest after eating",
                            "Continue light water sipping"
                        ]
                    },
                    {
                        time: "🌤️ Evening (4-6 PM)",
                        activities: [
                            "Light snack: banana or toast",
                            "Mint or fennel tea",
                            "Gentle walk in room if feeling better",
                            "Keep stomach area warm"
                        ]
                    },
                    {
                        time: "🌙 Night (8-10 PM)",
                        activities: [
                            "Light dinner: khichdi or dal-rice",
                            "Small meal - eat slowly",
                            "Ginger tea before bed",
                            "Sleep on left side for better digestion"
                        ]
                    }
                ]
            },
            doctor_questions: {
                title: "🩺 Do I Need to See a Doctor?",
                questions: [
                    "Are you having severe stomach pain or cramping?",
                    "Is vomiting continuous (not stopping for hours)?",
                    "Do you see blood in vomit or stool?",
                    "Have you had no bowel movement for more than 3 days?",
                    "Are you unable to keep down even water?"
                ]
            },
            eat_drink: {
                title: "🥣 What to Eat & Drink",
                content: [
                    "Plain water - sip slowly",
                    "Buttermilk",
                    "Plain rice",
                    "Khichdi (soft rice + dal)",
                    "Plain crackers or toast",
                    "Banana (soft, mashed)",
                    "Boiled vegetables: carrot, potato",
                    "Jeera or fennel tea",
                    "Light dal-paani (thin lentil soup)"
                ]
            },
            avoid: {
                title: "⛔ What to Avoid",
                content: [
                    "Oil, ghee, and butter",
                    "Spicy food",
                    "Dairy except buttermilk",
                    "Fried and heavy foods",
                    "Fruits (except banana) - too rough on stomach",
                    "Cold drinks",
                    "Vegetables (except boiled soft ones)",
                    "Eating too much or too fast"
                ]
            },
            mummy_says: {
                title: "❤️ MUMMY Says",
                content: "Arey beta, pet kuch na kuch khata hai! Thoda pet ko aaram de, saada khana kha, paani pee. Zyada pareshaan mat ho, ye sab theek ho jayega. Main hoon na, khana bana dungi light-light. 💚"
            }
        }
    },
    weakness: {
        name: "Weakness",
        hindi: "कमजोरी",
        emoji: "😴",
        sections: {
            remedies: {
                title: "🏠 Home Remedies",
                content: [
                    "Complete rest - don't push yourself",
                    "Milk with ghee and jaggery",
                    "Dates with milk - gives quick energy",
                    "Banana - natural energy boost",
                    "Almonds soaked overnight",
                    "Warm milk with honey before bed",
                    "Short, gentle walks (not exercise)",
                    "Massage with oil (light, relaxing)"
                ]
            },
            day_plan: {
                title: "🗓️ Plan My Day (When I'm Not Well)",
                content: [
                    {
                        time: "🌅 Morning (6-8 AM)",
                        activities: [
                            "Wake up slowly, don't rush",
                            "Warm milk with dates and ghee",
                            "Light breakfast: bread-butter, egg, banana",
                            "Rest for 1-2 hours after waking"
                        ]
                    },
                    {
                        time: "🌞 Afternoon (12-2 PM)",
                        activities: [
                            "Nutritious lunch: dal-rice, soft meat if possible",
                            "Ghee in food - helps with strength",
                            "Rest after lunch",
                            "Light snack: milk, banana, or nuts"
                        ]
                    },
                    {
                        time: "🌤️ Evening (4-6 PM)",
                        activities: [
                            "Tea with milk and sugar",
                            "Light snack: biscuits, fruits",
                            "Gentle movement - stretch lightly in room",
                            "No strenuous activity"
                        ]
                    },
                    {
                        time: "🌙 Night (8-10 PM)",
                        activities: [
                            "Nutritious dinner with ghee",
                            "Warm milk with honey before bed",
                            "Early sleep - body needs rest to recover",
                            "Sleep 8-9 hours"
                        ]
                    }
                ]
            },
            doctor_questions: {
                title: "🩺 Do I Need to See a Doctor?",
                questions: [
                    "Has weakness lasted more than 1-2 weeks?",
                    "Are you dizzy or fainting frequently?",
                    "Do you have fever along with weakness?",
                    "Have you noticed sudden significant weight loss?",
                    "Are you unable to do basic daily activities?"
                ]
            },
            eat_drink: {
                title: "🥣 What to Eat & Drink",
                content: [
                    "Warm milk with ghee and jaggery",
                    "Dates (energy-rich)",
                    "Banana",
                    "Almonds and walnuts",
                    "Eggs (if non-vegetarian)",
                    "Dal with ghee",
                    "Chicken or mutton broth",
                    "Whole milk pudding",
                    "Honey in warm milk"
                ]
            },
            avoid: {
                title: "⛔ What to Avoid",
                content: [
                    "Skipping meals",
                    "Too much tea and coffee",
                    "Junk food and chips",
                    "Strenuous exercise",
                    "Heavy outdoor work",
                    "Late nights - sleep early",
                    "Stress and overthinking",
                    "Cold drinks"
                ]
            },
            mummy_says: {
                title: "❤️ MUMMY Says",
                content: "Beta, tu kaise kaamzor ho gaya! Acha khana kha, aaram kar, aur jaldi so ja. Mummy teri strength theek kar degi ghee-milk se. Tu strong hai, bas thoda rest chahiye. 💚"
            }
        }
    },
    headache: {
        name: "Headache",
        hindi: "सिरदर्द",
        emoji: "🤕",
        sections: {
            remedies: {
                title: "🏠 Home Remedies",
                content: [
                    "Cool compress on forehead and temples",
                    "Ginger tea - helps relieve pain",
                    "Rest in a dark, quiet room",
                    "Massage temples gently with oil",
                    "Peppermint or eucalyptus oil - smell or light massage",
                    "Avoid bright lights and loud sounds",
                    "Drink plenty of water - dehydration causes headache",
                    "Warm water with lemon and honey"
                ]
            },
            day_plan: {
                title: "🗓️ Plan My Day (When I'm Not Well)",
                content: [
                    {
                        time: "🌅 Morning (6-8 AM)",
                        activities: [
                            "Wake slowly - don't jump out of bed",
                            "Warm water with lemon and honey",
                            "Cool compress on forehead for 10-15 minutes",
                            "Light breakfast: mild and not heavy"
                        ]
                    },
                    {
                        time: "🌞 Afternoon (12-2 PM)",
                        activities: [
                            "Continue cool compress sessions",
                            "Light meal: khichdi, soft rice",
                            "Rest in dark room",
                            "No screens - TV, phone, computer"
                        ]
                    },
                    {
                        time: "🌤️ Evening (4-6 PM)",
                        activities: [
                            "Ginger tea or peppermint tea",
                            "Gentle neck massage with oil",
                            "Quiet activity - no excitement or stress",
                            "More water, frequent sips"
                        ]
                    },
                    {
                        time: "🌙 Night (8-10 PM)",
                        activities: [
                            "Light dinner",
                            "Warm milk before bed",
                            "Sleep in cool, dark room",
                            "Use pillow to support neck properly"
                        ]
                    }
                ]
            },
            doctor_questions: {
                title: "🩺 Do I Need to See a Doctor?",
                questions: [
                    "Is headache accompanied by vision changes or confusion?",
                    "Do you have high fever along with severe headache and stiff neck?",
                    "Has this headache lasted continuously for more than 5-7 days?",
                    "Is it the worst headache you've ever had?",
                    "Do you see unexplained weakness or numbness?"
                ]
            },
            eat_drink: {
                title: "🥣 What to Eat & Drink",
                content: [
                    "Plenty of water - drink slowly",
                    "Coconut water",
                    "Ginger tea",
                    "Peppermint tea",
                    "Warm milk with honey",
                    "Vegetable broth",
                    "Light meals: khichdi, soft rice",
                    "Banana (energy without heaviness)",
                    "Fresh fruit juice (no added sugar)"
                ]
            },
            avoid: {
                title: "⛔ What to Avoid",
                content: [
                    "Bright light and strong sunlight",
                    "Loud sounds and TV/movies",
                    "Heavy, oily food",
                    "Caffeine - coffee and tea (except medicinal)",
                    "Sugary foods",
                    "Dehydration - drink water frequently",
                    "Stress and mental exertion",
                    "Alcohol"
                ]
            },
            mummy_says: {
                title: "❤️ MUMMY Says",
                content: "Arey beta, tera sar dard ho gaya! Aaram kar, andheri room mein so, aur paani pee. Ginger ka chai piyo, cool compress laga. Sab theek ho jayega, tension mat le! 💚"
            }
        }
    },
    body_pain: {
        name: "Body pain",
        hindi: "शरीर में दर्द",
        emoji: "😩",
        sections: {
            remedies: {
                title: "🏠 Home Remedies",
                content: [
                    "Complete rest - body is recovering",
                    "Warm oil massage (sesame or mustard oil)",
                    "Hot water fomentation - warm cloth on painful areas",
                    "Ginger and turmeric paste - apply to joints",
                    "Epsom salt bath (warm water)",
                    "Herbal tea with ginger and cinnamon",
                    "Light stretching - don't force",
                    "Adequate sleep for muscle recovery"
                ]
            },
            day_plan: {
                title: "🗓️ Plan My Day (When I'm Not Well)",
                content: [
                    {
                        time: "🌅 Morning (6-8 AM)",
                        activities: [
                            "Warm ginger tea",
                            "Gentle massage of painful areas with warm oil",
                            "Light stretching if comfortable",
                            "Warm breakfast: milk, toast, eggs"
                        ]
                    },
                    {
                        time: "🌞 Afternoon (12-2 PM)",
                        activities: [
                            "Rest - avoid strenuous activity",
                            "Warm fomentation on painful joints",
                            "Light, nutritious lunch with ghee",
                            "More oil massage if needed"
                        ]
                    },
                    {
                        time: "🌤️ Evening (4-6 PM)",
                        activities: [
                            "Warm herbal tea",
                            "Gentle walk in room if pain decreases",
                            "Light stretching",
                            "Rest legs and arms"
                        ]
                    },
                    {
                        time: "🌙 Night (8-10 PM)",
                        activities: [
                            "Warm milk before bed",
                            "Final massage with oil",
                            "Hot water bottle on painful area (before sleep)",
                            "Sleep early for recovery"
                        ]
                    }
                ]
            },
            doctor_questions: {
                title: "🩺 Do I Need to See a Doctor?",
                questions: [
                    "Is pain severe and unbearable?",
                    "Is there visible swelling or redness?",
                    "Can you not move or are movement extremely restricted?",
                    "Is pain accompanied by fever or chills?",
                    "Has body pain continued for more than 5-7 days?"
                ]
            },
            eat_drink: {
                title: "🥣 What to Eat & Drink",
                content: [
                    "Warm milk with turmeric and ghee",
                    "Chicken or vegetable broth",
                    "Dal with ghee",
                    "Ginger-cinnamon tea",
                    "Warm water frequently",
                    "Nutritious meals: eggs, meat (if non-vegetarian)",
                    "Dal-rice with ghee",
                    "Honey in warm milk",
                    "Fresh juice (orange, pomegranate)"
                ]
            },
            avoid: {
                title: "⛔ What to Avoid",
                content: [
                    "Heavy lifting or strenuous activity",
                    "Cold wind and cold environment",
                    "Cold water - use warm water",
                    "Spicy and heavy food",
                    "Excess salt",
                    "Cold drinks",
                    "Repetitive movements",
                    "Stress and anxiety"
                ]
            },
            mummy_says: {
                title: "❤️ MUMMY Says",
                content: "Beta, tu tera sharir to theek karne de! Aaram kar, massage karvao, aur garam khana kha. Ye sab time pass hoga. Mummy tere sab pain jaanti hai, theek kar dunga! 💚"
            }
        }
    },
    acidity: {
        name: "Acidity / Gas",
        hindi: "एसिडिटी / गैस",
        emoji: "🔥",
        sections: {
            remedies: {
                title: "🏠 Home Remedies",
                content: [
                    "Jeera water - best remedy for acidity",
                    "Sauf (fennel seeds) water - soothes stomach",
                    "Baking soda + water - instant relief",
                    "Milk - drink warm and slowly",
                    "Coconut water - very effective",
                    "Jaggery (gur) - helps digestion",
                    "Ginger in water - reduces gas",
                    "Buttermilk - aids digestion"
                ]
            },
            day_plan: {
                title: "🗓️ Plan My Day (When I'm Not Well)",
                content: [
                    {
                        time: "🌅 Morning (6-8 AM)",
                        activities: [
                            "Empty stomach water with baking soda",
                            "Wait 30 minutes before breakfast",
                            "Light breakfast: plain toast or rice",
                            "Jeera water after breakfast"
                        ]
                    },
                    {
                        time: "🌞 Afternoon (12-2 PM)",
                        activities: [
                            "Light lunch: simple dal-rice",
                            "No oily or spicy food",
                            "Rest after eating",
                            "Sauf water after 1 hour"
                        ]
                    },
                    {
                        time: "🌤️ Evening (4-6 PM)",
                        activities: [
                            "Light snack: milk and biscuits",
                            "Ginger tea without sugar",
                            "Light walking",
                            "No heavy eating"
                        ]
                    },
                    {
                        time: "🌙 Night (8-10 PM)",
                        activities: [
                            "Light dinner 2-3 hours before bed",
                            "Warm milk with honey",
                            "Sleep on left side (aids digestion)",
                            "Elevate head with extra pillow"
                        ]
                    }
                ]
            },
            doctor_questions: {
                title: "🩺 Do I Need to See a Doctor?",
                questions: [
                    "Is acidity accompanied by severe chest pain?",
                    "Are you vomiting or have blood in vomit?",
                    "Has acidity lasted continuously for more than 2 weeks?",
                    "Do you have black or tarry stools?",
                    "Is weight loss happening without reason?"
                ]
            },
            eat_drink: {
                title: "🥣 What to Eat & Drink",
                content: [
                    "Jeera water frequently",
                    "Buttermilk - best for acidity",
                    "Coconut water",
                    "Warm milk",
                    "Plain rice with simple dal",
                    "Boiled vegetables",
                    "Banana (very good for acidity)",
                    "Jaggery (in moderation)",
                    "Ginger tea (light, no sugar)"
                ]
            },
            avoid: {
                title: "⛔ What to Avoid",
                content: [
                    "Spicy food",
                    "Oily and fried foods",
                    "Coffee and tea (excess)",
                    "Citrus fruits and orange juice",
                    "Tomatoes and tomato-based dishes",
                    "Chocolates",
                    "Alcohol",
                    "Eating too much at once",
                    "Eating right before bed"
                ]
            },
            mummy_says: {
                title: "❤️ MUMMY Says",
                content: "Arey beta, acidity to sab ko kabhi-kabhi hoti hai! Khaana theek kar, jeera-pani pee, aur tension mat le. Mummy dekhegi ki tu theek khana kha raha hai. Aaram aur saada khana, sab theek ho jayega! 💚"
            }
        }
    },
    constipation: {
        name: "Constipation",
        hindi: "कब्ज",
        emoji: "💩",
        sections: {
            remedies: {
                title: "🏠 Home Remedies",
                content: [
                    "Warm water with lemon in morning - instant relief",
                    "Chia seeds or isabgol in warm milk",
                    "Prunes (soaked overnight)",
                    "Castor oil - 1 tsp before bed",
                    "Eat plenty of fiber-rich foods",
                    "Drink lots of water - at least 8 glasses",
                    "Exercise and walking - helps digestion",
                    "Massage abdomen gently clockwise"
                ]
            },
            day_plan: {
                title: "🗓️ Plan My Day (When I'm Not Well)",
                content: [
                    {
                        time: "🌅 Morning (6-8 AM)",
                        activities: [
                            "Start with warm water + lemon",
                            "Walk around for 15-20 minutes",
                            "Light breakfast: fruits, yogurt, or oats",
                            "Sit for toilet naturally, don't strain"
                        ]
                    },
                    {
                        time: "🌞 Afternoon (12-2 PM)",
                        activities: [
                            "Lunch with high-fiber food",
                            "Vegetables, whole grains, dal",
                            "Drink water slowly",
                            "Light walk after eating"
                        ]
                    },
                    {
                        time: "🌤️ Evening (4-6 PM)",
                        activities: [
                            "Fruits: apple, pear, banana",
                            "More water",
                            "Gentle abdominal massage",
                            "Light movement and stretching"
                        ]
                    },
                    {
                        time: "🌙 Night (8-10 PM)",
                        activities: [
                            "Light dinner with fiber",
                            "Castor oil or milk with isabgol before bed",
                            "Sleep on left side",
                            "Morning will be better!"
                        ]
                    }
                ]
            },
            doctor_questions: {
                title: "🩺 Do I Need to See a Doctor?",
                questions: [
                    "Has constipation lasted for more than a week?",
                    "Is there blood or mucus in stool?",
                    "Do you have severe abdominal pain?",
                    "Have you lost weight recently?",
                    "Is there pain during bowel movement?"
                ]
            },
            eat_drink: {
                title: "🥣 What to Eat & Drink",
                content: [
                    "Lots of water - minimum 8-10 glasses",
                    "Fruits: papaya, apple, pear, banana",
                    "Vegetables: spinach, pumpkin, bottle gourd",
                    "Whole grains: brown rice, oats",
                    "Dal and pulses",
                    "Yogurt and buttermilk",
                    "Prunes and dry fruits",
                    "Fibrous foods",
                    "Warm liquids"
                ]
            },
            avoid: {
                title: "⛔ What to Avoid",
                content: [
                    "White bread and refined flour",
                    "Junk and fried foods",
                    "Cheese and excessive dairy",
                    "Bananas (if very ripe)",
                    "Tea and coffee (excess)",
                    "Dehydration - drink water!",
                    "Sitting idle for too long",
                    "Ignoring urge to go toilet"
                ]
            },
            mummy_says: {
                title: "❤️ MUMMY Says",
                content: "Beta, kabz to sab ko problem hota hai! Thoda pani pee, fruits kha, aur hilna-dul ja. Jaldi theek ho jayega. Mummy sab kuch arrange kar degi, tu bas theek se kha-pee! 💚"
            }
        }
    },
    sore_throat: {
        name: "Sore Throat",
        hindi: "गले में दर्द",
        emoji: "😫",
        sections: {
            remedies: {
                title: "🏠 Home Remedies",
                content: [
                    "Warm salt water gargles - 4-5 times daily",
                    "Honey in warm water - soothing",
                    "Turmeric milk - anti-inflammatory",
                    "Ginger-lemon tea with honey",
                    "Steam inhalation - loosens mucus",
                    "Avoid talking excessively - rest voice",
                    "Keep throat warm with scarf",
                    "Coconut water - very soothing"
                ]
            },
            day_plan: {
                title: "🗓️ Plan My Day (When I'm Not Well)",
                content: [
                    {
                        time: "🌅 Morning (6-8 AM)",
                        activities: [
                            "Warm salt water gargle",
                            "Warm milk with honey",
                            "Light breakfast: soft foods",
                            "Avoid talking unnecessarily"
                        ]
                    },
                    {
                        time: "🌞 Afternoon (12-2 PM)",
                        activities: [
                            "Warm soup or broth",
                            "Ginger-lemon tea",
                            "Gargle again",
                            "Rest voice - whisper if needed"
                        ]
                    },
                    {
                        time: "🌤️ Evening (4-6 PM)",
                        activities: [
                            "Coconut water or warm milk",
                            "Steam inhalation for 10 minutes",
                            "Honey dissolved in warm water",
                            "Warm scarf around neck"
                        ]
                    },
                    {
                        time: "🌙 Night (8-10 PM)",
                        activities: [
                            "Turmeric milk before bed",
                            "Final gargle with salt water",
                            "Sleep well - throat heals during sleep",
                            "Sleep with elevated head"
                        ]
                    }
                ]
            },
            doctor_questions: {
                title: "🩺 Do I Need to See a Doctor?",
                questions: [
                    "Is sore throat accompanied by high fever (above 100°F)?",
                    "Do you have white patches or pus in throat?",
                    "Is it difficult to swallow food or even water?",
                    "Is there severe pain or swollen lymph nodes?",
                    "Has it lasted more than 5-7 days?"
                ]
            },
            eat_drink: {
                title: "🥣 What to Eat & Drink",
                content: [
                    "Warm milk with honey",
                    "Vegetable broth or chicken broth",
                    "Soft rice or khichdi",
                    "Coconut water",
                    "Turmeric milk",
                    "Honey (raw if possible)",
                    "Warm water with ginger",
                    "Soft fruits: banana, papaya",
                    "Soup (warm, not hot)"
                ]
            },
            avoid: {
                title: "⛔ What to Avoid",
                content: [
                    "Cold drinks and ice cream",
                    "Hard, crunchy foods",
                    "Spicy and hot foods",
                    "Citrus fruits",
                    "Smoking and secondhand smoke",
                    "Loud talking or shouting",
                    "Very hot or very cold water",
                    "Dairy products (sometimes aggravate)"
                ]
            },
            mummy_says: {
                title: "❤️ MUMMY Says",
                content: "Arey, tera gala kharab hai? Thandi hawa mat kha, garam pani pee, aur chup reh! Honey aur turmeric ka doodh de dungi. Gargle kar, aaram kar, aur sab theek ho jayega beta! 💚"
            }
        }
    },
    insomnia: {
        name: "Insomnia / Sleep Issues",
        hindi: "अनिद्रा / नींद की समस्या",
        emoji: "🌙",
        sections: {
            remedies: {
                title: "🏠 Home Remedies",
                content: [
                    "Warm milk with honey before bed - very effective",
                    "Chamomile or fennel tea",
                    "Light massage of head and feet with oil",
                    "Meditation or deep breathing exercises",
                    "Keep room dark and cool",
                    "No screens 1 hour before sleep",
                    "Avoid caffeine after noon",
                    "Exercise during day, not evening"
                ]
            },
            day_plan: {
                title: "🗓️ Plan My Day (When I'm Not Well)",
                content: [
                    {
                        time: "🌅 Morning (6-8 AM)",
                        activities: [
                            "Wake at same time daily (habit building)",
                            "Get morning sunlight",
                            "Light exercise or yoga",
                            "Healthy breakfast"
                        ]
                    },
                    {
                        time: "🌞 Afternoon (12-2 PM)",
                        activities: [
                            "Normal lunch",
                            "Short walk after eating",
                            "Avoid long naps (max 20 minutes)",
                            "Stay active"
                        ]
                    },
                    {
                        time: "🌤️ Evening (4-6 PM)",
                        activities: [
                            "Light activity only",
                            "Avoid heavy exercise",
                            "Reduce screen time gradually",
                            "Relax and calm mind"
                        ]
                    },
                    {
                        time: "🌙 Night (8-10 PM)",
                        activities: [
                            "Light dinner 2-3 hours before bed",
                            "Warm milk with honey 1 hour before sleep",
                            "Head and feet oil massage",
                            "Meditation or breathing - then sleep!"
                        ]
                    }
                ]
            },
            doctor_questions: {
                title: "🩺 Do I Need to See a Doctor?",
                questions: [
                    "Has insomnia lasted continuously for more than 2 weeks?",
                    "Are you experiencing anxiety or depression?",
                    "Do you snore loudly or stop breathing during sleep?",
                    "Is daytime sleepiness affecting your work?",
                    "Are you relying on sleeping pills regularly?"
                ]
            },
            eat_drink: {
                title: "🥣 What to Eat & Drink",
                content: [
                    "Warm milk with honey - must-have before bed",
                    "Chamomile tea",
                    "Fennel seed water",
                    "Banana (has natural sleep compounds)",
                    "Warm water with ginger",
                    "Light dinner: rice, dal",
                    "Oatmeal before bed",
                    "Almonds (soaked overnight)",
                    "Herbal tea without caffeine"
                ]
            },
            avoid: {
                title: "⛔ What to Avoid",
                content: [
                    "Coffee and tea after 2 PM",
                    "Heavy, spicy food at night",
                    "Chocolate and sugary foods",
                    "Mobile phones and TV 1 hour before sleep",
                    "Bright lights in bedroom",
                    "Daytime naps (more than 20 min)",
                    "Alcohol (disrupts sleep quality)",
                    "Exciting or stressful activities before bed",
                    "Sleeping with noise"
                ]
            },
            mummy_says: {
                title: "❤️ MUMMY Says",
                content: "Arey beta, neend nahi aa rahi? Doodh-shodu pee, thoda oil massage karvao, aur meditation kar. Mummy jaanti hai neend kitni zaruri hai. Tu aaram kar, sab theek ho jayega. Tension nahi, bas so ja beta! 💚"
            }
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderConditionSelector();
    selectCondition('cold'); // Select first condition by default
});

// Render condition selector cards
function renderConditionSelector() {
    const selector = document.getElementById('conditionSelector');
    selector.innerHTML = '';

    Object.entries(BIMAAR_CONDITIONS).forEach(([key, condition]) => {
        const card = document.createElement('div');
        card.className = 'condition-card';
        card.dataset.condition = key;
        card.onclick = () => selectCondition(key);
        
        card.innerHTML = `
            <div class="condition-emoji">${condition.emoji}</div>
            <div class="condition-name">${condition.name}</div>
            <div class="condition-hindi">${condition.hindi}</div>
        `;
        
        selector.appendChild(card);
    });
}

// Select condition and display content
function selectCondition(conditionKey) {
    // Update active card
    document.querySelectorAll('.condition-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-condition="${conditionKey}"]`).classList.add('active');

    // Display care content
    renderCareContent(conditionKey);
}

// Render care content
function renderCareContent(conditionKey) {
    const condition = BIMAAR_CONDITIONS[conditionKey];
    const careContentDiv = document.getElementById('careContent');
    careContentDiv.innerHTML = '';

    // Add all sections
    const sections = condition.sections;

    // 1. Home Remedies
    let html = `
        <div class="care-section">
            <h3>${sections.remedies.title}</h3>
            <ul>
                ${sections.remedies.content.map(remedy => `<li>${remedy}</li>`).join('')}
            </ul>
        </div>
    `;

    // 2. Plan My Day
    html += `
        <div class="care-section">
            <h3>${sections.day_plan.title}</h3>
            ${sections.day_plan.content.map(plan => `
                <div class="plan-item">
                    <div class="plan-time">${plan.time}</div>
                    <div class="plan-activity">
                        <ul>
                            ${plan.activities.map(activity => `<li>${activity}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // 3. Do I Need to See a Doctor?
    html += `
        <div class="care-section">
            <h3>${sections.doctor_questions.title}</h3>
            <div id="doctorForm">
                ${sections.doctor_questions.questions.map((q, idx) => `
                    <div class="doctor-question">
                        <input type="radio" name="doctor_q${idx}" value="yes" id="q${idx}_yes">
                        <label for="q${idx}_yes">Yes - ${q}</label>
                        <br>
                        <input type="radio" name="doctor_q${idx}" value="no" id="q${idx}_no" checked>
                        <label for="q${idx}_no">No</label>
                    </div>
                `).join('')}
                <button onclick="checkDoctorVisit()" style="
                    background: var(--primary-orange);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    margin-top: 1rem;
                ">Check if I need Doctor</button>
                <div id="doctorResult"></div>
            </div>
        </div>
    `;

    // 4. What to Eat & Drink
    html += `
        <div class="care-section">
            <h3>${sections.eat_drink.title}</h3>
            <ul>
                ${sections.eat_drink.content.map(food => `<li>${food}</li>`).join('')}
            </ul>
        </div>
    `;

    // 5. What to Avoid
    html += `
        <div class="care-section">
            <h3>${sections.avoid.title}</h3>
            <ul>
                ${sections.avoid.content.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;

    // 6. MUMMY Says
    html += `
        <div class="mummy-says">
            <div class="mummy-heart">❤️</div>
            <div>"${sections.mummy_says.content}"</div>
            <div class="mummy-heart">💚</div>
        </div>
    `;

    careContentDiv.innerHTML = html;
}

// Check if doctor visit needed
function checkDoctorVisit() {
    let yesCount = 0;
    const questions = document.querySelectorAll('[name^="doctor_q"]');
    const uniqueQuestions = new Set();

    questions.forEach(q => {
        const name = q.name;
        if (!uniqueQuestions.has(name)) {
            uniqueQuestions.add(name);
            if (document.querySelector(`input[name="${name}"]:checked`).value === 'yes') {
                yesCount++;
            }
        }
    });

    const resultDiv = document.getElementById('doctorResult');
    const totalQuestions = uniqueQuestions.size;

    if (yesCount === 0) {
        resultDiv.innerHTML = `
            <div class="doctor-result safe">
                ✅ Lagta hai sab theek hai! Continue home care and rest. 
                But agar 5-7 din baad bhi theek nahi hua, toh doctor se mil lena.
            </div>
        `;
    } else if (yesCount === 1) {
        resultDiv.innerHTML = `
            <div class="doctor-result concern">
                ⚠️ Ek-do symptoms hai. Doctor ko dikha lena better rahega.
                Next 2-3 days mein agar improve nahi hua, toh pakka dikha dena.
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div class="doctor-result alert">
                🏥 Lagta hai doctor ko dikha lena chahiye, beta.
                Doctor ko dikha le jaldi - aaj ya kal. 
                Mummy ko fikar hai, par professional advice zaruri hai!
            </div>
        `;
    }
}
