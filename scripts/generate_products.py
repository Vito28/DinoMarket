import json
import random
from pathlib import Path

random.seed(42)

image_sets = {
    "keyboard": [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1585079542156-2755d9c8a094?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=900&q=80"
    ],
    "mouse": [
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=900&q=80"
    ],
    "hub": [
        "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80"
    ],
    "desk_setup": [
        "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80"
    ],
    "switch": [
        "https://images.unsplash.com/photo-1612810806695-30ba02c3c5ef?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1612810806584-6b6d21942763?auto=format&fit=crop&w=900&q=80"
    ],
    "monitor_mount": [
        "https://images.unsplash.com/photo-1587613864521-5111b23b8363?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=900&q=80"
    ],
    "smart_home": [
        "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1580894906472-c92e05f2a3b3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?auto=format&fit=crop&w=900&q=80"
    ],
    "audio": [
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=900&q=80"
    ],
    "camera": [
        "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=900&q=80"
    ],
    "gaming": [
        "https://images.unsplash.com/photo-1587202372775-98927f9a68c0?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1580128637393-8a0b4eb2216a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1587202277580-2665bb0f87e2?auto=format&fit=crop&w=900&q=80"
    ],
    "wellness": [
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1589478571117-63154a9d42f9?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80"
    ],
    "pharmacy": [
        "https://images.unsplash.com/photo-1580281658629-45a89df5d87a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1584367369853-8b966cf21c4b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80"
    ],
    "nutrition": [
        "https://images.unsplash.com/photo-1514516430032-7f21c91581b3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1505253758473-96b7015fcd9b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"
    ],
    "snack": [
        "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=900&q=80"
    ],
    "coffee": [
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80"
    ],
    "tea": [
        "https://images.unsplash.com/photo-1513639725746-c5d3e861f32a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80"
    ],
    "cocoa": [
        "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1453671424686-dfef17039343?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=900&q=80"
    ],
    "syrup": [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1563371351-e53ebb744a1f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1527169402691-feff5539e52c?auto=format&fit=crop&w=900&q=80"
    ],
    "cookware": [
        "https://images.unsplash.com/photo-1466978913026-628582bda3ab?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1514516430032-7f21c91581b3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1506368083636-6defb67639a7?auto=format&fit=crop&w=900&q=80"
    ],
    "bakeware": [
        "https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1481931715705-36f55c9c3b99?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
    ],
    "kitchen_tool": [
        "https://images.unsplash.com/photo-1506368083636-6defb67639a7?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1514516430032-7f21c91581b3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
    ],
    "book": [
        "https://images.unsplash.com/photo-1455885666463-9abe65b4b098?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80"
    ],
    "stationery": [
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
    ],
    "craft": [
        "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=80"
    ],
    "toy": [
        "https://images.unsplash.com/photo-1520174691701-bc555a3404ca?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1511450160787-63c5ae6fc1e4?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1513624958121-0f3c0d2d9995?auto=format&fit=crop&w=900&q=80"
    ],
    "pet": [
        "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80"
    ],
    "outdoor": [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1529927066849-4c60c47f0951?auto=format&fit=crop&w=900&q=80"
    ],
    "travel": [
        "https://images.unsplash.com/photo-1486006920555-c77f5c1d51ff?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1496497243327-37cb1cae2c81?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80"
    ],
    "beauty": [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=900&q=80"
    ],
    "office": [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80"
    ],
    "auto": [
        "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1518555633010-21b5a3e3f9f4?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80"
    ],
    "garden": [
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1524594154900-3335071b2d65?auto=format&fit=crop&w=900&q=80"
    ],
    "cleaning": [
        "https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1598514982901-6c09ccec8272?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1584634731339-aadc5385d1b9?auto=format&fit=crop&w=900&q=80"
    ],
    "fitness": [
        "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1517964106626-460c0be8f31a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80"
    ],
    "home": [
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=900&q=80"
    ]
}

adjectives_map = {
    "tech": [
        "Aurora", "Nimbus", "Nova", "Pulse", "Lumen", "Quantum", "Atlas", "Echo", "Vertex", "Flux", "Zenith", "Spectra", "Horizon", "Momentum", "Radiant", "Velocity", "Aero", "Ion", "Prism", "Sonic", "Orbit", "Vector", "Stellar", "Neon"
    ],
    "audio": [
        "Harmony", "Resonance", "Sonata", "Cadence", "Tempo", "Lyric", "Echo", "Pulse", "Octave", "Melodic", "Vibe", "Rhythm", "Chorus", "Bassline", "Crescendo", "Beat", "Amped", "Sonic", "Tuned", "Symphony"
    ],
    "wellness": [
        "Vital", "Pure", "Renew", "Shield", "Calm", "Balance", "Harmony", "Active", "Glow", "Fresh", "Prime", "Essential", "Gentle", "Comfort", "Revive", "Energy", "Fortify", "Bright", "Ease", "Focus", "Serene", "Nurture"
    ],
    "snack": [
        "Harvest", "Golden", "Crisp", "Savory", "Sweet", "Zesty", "Crunch", "Sunny", "Roasted", "Berry", "Maple", "Cocoa", "Nutty", "Velvet", "Citrus", "Honey", "Spiced", "Toasted", "Trail", "Fusion"
    ],
    "beverage": [
        "Roastery", "Brewed", "Velvet", "Midnight", "Morning", "Sunrise", "Heritage", "Artisan", "Cascade", "Amber", "Frost", "Verdant", "Classic", "Reserve", "Cask", "Aroma", "Bloom", "Infusion", "Whisper", "Silk"
    ],
    "kitchen": [
        "Heritage", "Signature", "Chef", "Artisan", "Classic", "Premium", "Copper", "Granite", "Sizzle", "Fusion", "Pro", "Home", "Elite", "Select", "Master", "Pantry", "Bistro", "Culinary", "Urban", "Cozy"
    ],
    "book": [
        "Storyline", "Chronicle", "Atlas", "Journey", "Insight", "Legacy", "Voyage", "Echo", "Aurora", "Harbor", "Garden", "Lumen", "Canvas", "Nimbus", "Archive", "Memoir", "Origin", "Vista", "Odyssey", "Fable"
    ],
    "craft": [
        "Creative", "Artisan", "Palette", "Canvas", "Muse", "Spark", "Crafted", "Inspire", "Studio", "Imagine", "Colorwave", "Sketch", "Handmade", "Bloom", "Vivid", "Spectrum", "Workshop", "Fiber", "Thread", "Harmony"
    ],
    "kids": [
        "Playful", "Bright", "Wonder", "Discovery", "Adventure", "Galaxy", "Rainbow", "Nova", "Hero", "Whiz", "Spark", "Rocket", "Puzzle", "Magic", "Dream", "Explorer", "Fun", "Flash", "Giga", "Mini"
    ],
    "pet": [
        "Happy", "Cozy", "Tailored", "Whisker", "Pawsome", "Furry", "Gentle", "Playful", "Cuddly", "Brisk", "Wild", "Sunny", "Nature", "Joyful", "Bright", "Comfy", "Balanced", "Vital", "Sprout", "Cheer"
    ],
    "outdoor": [
        "Trail", "Summit", "Frontier", "Explorer", "Rocky", "Sierra", "Ridge", "Canyon", "Timber", "Aspen", "Voyager", "Terra", "Atlas", "Nomad", "Horizon", "Pioneer", "Range", "Adventure", "Wilderness", "Summit"
    ],
    "travel": [
        "Globe", "Voyage", "Transit", "Journey", "Nomad", "Jetset", "Roam", "Atlas", "Compass", "Passport", "Waypoint", "Odyssey", "Aero", "Skyline", "Coastal", "Urban", "Metro", "Safari", "Serene", "Summit"
    ],
    "beauty": [
        "Radiant", "Glow", "Luxe", "Velvet", "Silk", "Bloom", "Petal", "Aura", "Serenity", "Grace", "Pearl", "Amber", "Opal", "Fleur", "Divine", "Fresh", "Elegance", "Pure", "Charm", "Muse"
    ],
    "office": [
        "Pro", "Focus", "Pivot", "Core", "Urban", "Stream", "Clarity", "Task", "Matrix", "Prime", "Active", "Pulse", "Agenda", "Vision", "Sync", "Array", "Craft", "Dynamic", "Cleric", "Summit"
    ],
    "auto": [
        "Road", "Cruise", "Torque", "Velocity", "Drive", "Nitro", "Rally", "Street", "Grid", "Pilot", "Fusion", "Urban", "Peak", "Apex", "Voyage", "Turbo", "Trail", "Metro", "Bold", "Prime"
    ],
    "garden": [
        "Evergreen", "Bloom", "Verdant", "Sprout", "Harvest", "Terracotta", "Meadow", "Sunny", "Willow", "Fern", "Petal", "Gardenia", "Flourish", "Haven", "Leaf", "Stem", "Rooted", "Seedling", "Floral", "Horizon"
    ],
    "cleaning": [
        "Fresh", "Pure", "Spark", "Bright", "Crystal", "Lily", "Mint", "Citrus", "Shine", "Glow", "Clear", "Breeze", "Brisk", "Eco", "Zen", "Gentle", "Renew", "Wave", "Foam", "Revive"
    ],
    "fitness": [
        "Power", "Momentum", "Pulse", "Dyno", "Core", "Flex", "Sprint", "Endure", "Peak", "Ignite", "Forge", "Lift", "Zenith", "Velocity", "Titan", "Charge", "Stride", "Fusion", "Primal", "Rally"
    ],
    "home": [
        "Cozy", "Serene", "Harbor", "Haven", "Aurora", "Linen", "Ember", "Nest", "Warm", "Cottage", "Bliss", "Calm", "Velvet", "Soft", "Nimbus", "Tranquil", "Heritage", "Luxe", "Dream", "Retreat"
    ]
}

categories = {
    "keyboard": {
        "adjectives": adjectives_map["tech"],
        "use_cases": [
            "meningkatkan kenyamanan mengetik sepanjang hari",
            "memberikan respon cepat bagi gamer kompetitif",
            "membuat meja kerja terlihat lebih rapi"
        ],
        "highlights": [
            "switch mekanikal hot-swappable",
            "pencahayaan RGB yang dapat dikustomisasi",
            "peredam suara bawaan untuk suara yang bersih"
        ],
        "materials": [
            "housing aluminium anodized",
            "plate polycarbonate presisi",
            "keycap PBT double-shot anti pudar"
        ],
        "images": image_sets["keyboard"]
    },
    "mouse": {
        "adjectives": adjectives_map["tech"],
        "use_cases": [
            "memberi kendali presisi di setiap permukaan",
            "mengurangi kelelahan tangan saat sesi kerja panjang",
            "meningkatkan performa dalam permainan FPS"
        ],
        "highlights": [
            "sensor optik hingga 26K DPI",
            "latensi nirkabel sub-1ms",
            "baterai tahan hingga 80 jam pemakaian"
        ],
        "materials": [
            "shell ABS bertekstur lembut",
            "switch Omron tahan 50 juta klik",
            "kaki PTFE ultra-glide"
        ],
        "images": image_sets["mouse"]
    },
    "hub": {
        "adjectives": adjectives_map["tech"],
        "use_cases": [
            "membuat laptop siap terhubung ke berbagai perangkat",
            "mengurangi adaptor tambahan di setup kerja",
            "mempermudah transfer data berkecepatan tinggi"
        ],
        "highlights": [
            "port USB-C Power Delivery hingga 100W",
            "output HDMI yang mendukung 4K 60Hz",
            "slot kartu SD dan microSD berkecepatan tinggi"
        ],
        "materials": [
            "casing aluminium brushed",
            "kabel braided anti kusut",
            "pendinginan pasif tanpa kipas"
        ],
        "images": image_sets["hub"]
    },
    "desk_setup": {
        "adjectives": adjectives_map["tech"],
        "use_cases": [
            "menjaga meja tetap rapi dan terlindungi",
            "memberi kenyamanan ekstra saat bekerja",
            "melengkapi estetika setup minimalis"
        ],
        "highlights": [
            "permukaan mikro-tekstur anti selip",
            "tepi dijahit anti-fray",
            "lapisan busa memori yang empuk"
        ],
        "materials": [
            "kain poliester tahan noda",
            "basis karet natural",
            "kulit vegan yang mudah dibersihkan"
        ],
        "images": image_sets["desk_setup"]
    },
    "switch": {
        "adjectives": adjectives_map["tech"],
        "use_cases": [
            "menyesuaikan feel mengetik sesuai preferensi",
            "menghadirkan pengalaman modding yang menyenangkan",
            "meningkatkan akustik keyboard custom"
        ],
        "highlights": [
            "profil tactile dan linear yang telah dilumasi",
            "housing transparan kompatibel dengan RGB",
            "spring stainless steel yang responsif"
        ],
        "materials": [
            "housing polycarbonate berkualitas",
            "stem POM halus",
            "kit extractor stainless"
        ],
        "images": image_sets["switch"]
    },
    "monitor_mount": {
        "adjectives": adjectives_map["tech"],
        "use_cases": [
            "memberi fleksibilitas posisi layar ideal",
            "membebaskan ruang meja kerja",
            "meningkatkan ergonomi saat bekerja"
        ],
        "highlights": [
            "sistem gas spring halus",
            "manajemen kabel terintegrasi",
            "dukungan monitor hingga 32 inci"
        ],
        "materials": [
            "aluminium aircraft-grade",
            "clamp baja tebal",
            "finish powder coat anti gores"
        ],
        "images": image_sets["monitor_mount"]
    },
    "smart_home": {
        "adjectives": adjectives_map["tech"],
        "use_cases": [
            "mengotomatisasi rutinitas rumah tangga",
            "menghemat konsumsi energi harian",
            "mempermudah kontrol perangkat dari smartphone"
        ],
        "highlights": [
            "dukungan perintah suara Alexa dan Google",
            "aplikasi dengan monitoring energi",
            "jadwal otomatis dan mode away"
        ],
        "materials": [
            "shell ABS tahan panas",
            "modul Wi-Fi terintegrasi",
            "sirkuit proteksi surge"
        ],
        "images": image_sets["smart_home"]
    },
    "audio": {
        "adjectives": adjectives_map["audio"],
        "use_cases": [
            "menciptakan pengalaman audio imersif",
            "meningkatkan kejernihan panggilan konferensi",
            "menemani sesi gaming maraton"
        ],
        "highlights": [
            "driver high-resolution berlapis graphene",
            "active noise cancelling adaptif",
            "mode latensi rendah untuk gaming"
        ],
        "materials": [
            "earcup memory foam lembut",
            "headband baja fleksibel",
            "mikrofon detachable dengan windscreen"
        ],
        "images": image_sets["audio"]
    },
    "camera": {
        "adjectives": adjectives_map["tech"],
        "use_cases": [
            "menangkap momen penting dengan detail tajam",
            "menghasilkan konten profesional",
            "menunjang workflow fotografer harian"
        ],
        "highlights": [
            "sensor full-frame beresolusi tinggi",
            "stabilisasi 5-axis in-body",
            "autofocus cerdas dengan pelacakan wajah"
        ],
        "materials": [
            "bod y magnesium alloy",
            "weather sealing menyeluruh",
            "glass optik multi-coating"
        ],
        "images": image_sets["camera"]
    },
    "gaming": {
        "adjectives": adjectives_map["tech"],
        "use_cases": [
            "meningkatkan imersi saat bermain",
            "memberikan kontrol presisi di tiap sesi",
            "menjaga komunikasi tim tetap jernih"
        ],
        "highlights": [
            "mode RGB serta preset macro",
            "driver audio khusus gaming",
            "konektivitas rendah latensi"
        ],
        "materials": [
            "bahan ABS tebal",
            "foam memory breathable",
            "sensor optik kelas turnamen"
        ],
        "images": image_sets["gaming"]
    },
    "wellness": {
        "adjectives": adjectives_map["wellness"],
        "use_cases": [
            "menjaga stamina sepanjang hari",
            "mendukung imunitas keluarga",
            "membantu rutinitas relaksasi di rumah"
        ],
        "highlights": [
            "formula gizi seimbang",
            "kompleks vitamin dan mineral lengkap",
            "aroma menenangkan dari bahan alami"
        ],
        "materials": [
            "bahan baku bersertifikasi GMP",
            "botol kaca amber tahan UV",
            "kemasan ramah lingkungan"
        ],
        "images": image_sets["wellness"]
    },
    "pharmacy": {
        "adjectives": adjectives_map["wellness"],
        "use_cases": [
            "menjadi persediaan kotak P3K di rumah",
            "membantu pemulihan lebih cepat",
            "memberikan perlindungan higienis"
        ],
        "highlights": [
            "formulasi teruji klinis",
            "ukuran praktis mudah dibawa",
            "indikasi jelas dan mudah dipahami"
        ],
        "materials": [
            "kemasan steril sekali pakai",
            "tablet bebas pewarna sintetis",
            "alat bantu higienis"
        ],
        "images": image_sets["pharmacy"]
    },
    "nutrition": {
        "adjectives": adjectives_map["wellness"],
        "use_cases": [
            "mendukung performa latihan harian",
            "membantu pemulihan otot lebih cepat",
            "menjaga hidrasi selama aktivitas outdoor"
        ],
        "highlights": [
            "protein 25g per sajian",
            "mix mudah larut tanpa gumpal",
            "kandungan elektrolit seimbang"
        ],
        "materials": [
            "bahan baku susu grass-fed",
            "sweetener alami rendah kalori",
            "kemasan zip lock anti lembap"
        ],
        "images": image_sets["nutrition"]
    },
    "snack": {
        "adjectives": adjectives_map["snack"],
        "use_cases": [
            "menjadi camilan sehat di sela kerja",
            "menjaga energi tanpa gula berlebih",
            "melengkapi paket hampers keluarga"
        ],
        "highlights": [
            "bahan organik non-GMO",
            "tanpa pengawet tambahan",
            "rasa gurih manis seimbang"
        ],
        "materials": [
            "kacang dan biji pilihan",
            "buah kering alami",
            "kemasan kraft resealable"
        ],
        "images": image_sets["snack"]
    },
    "coffee": {
        "adjectives": adjectives_map["beverage"],
        "use_cases": [
            "menemani ritual pagi yang menyenangkan",
            "memberi aroma cafe di rumah",
            "dipadukan dengan manual brew favorit"
        ],
        "highlights": [
            "profil roasting medium yang seimbang",
            "notes rasa karamel dan cokelat",
            "proses washing menjaga kejernihan rasa"
        ],
        "materials": [
            "biji arabika single origin",
            "kemasan katup satu arah",
            "tumbuk segar sebelum dikirim"
        ],
        "images": image_sets["coffee"]
    },
    "tea": {
        "adjectives": adjectives_map["beverage"],
        "use_cases": [
            "mendukung momen relaksasi sore hari",
            "disajikan panas maupun dingin",
            "melengkapi hampers premium"
        ],
        "highlights": [
            "daun teh pilihan dengan aroma floral",
            "blend rempah menenangkan",
            "rendaman jernih tanpa rasa pahit"
        ],
        "materials": [
            "daun teh organik",
            "kantong biodegradable",
            "wadah kaleng kedap udara"
        ],
        "images": image_sets["tea"]
    },
    "cocoa": {
        "adjectives": adjectives_map["beverage"],
        "use_cases": [
            "masyarakatkan minuman hangat saat malam",
            "kombinasi sempurna dengan marshmallow",
            "menambah semangat anak-anak"
        ],
        "highlights": [
            "cokelat bubuk single origin",
            "diperkaya susu bubuk rendah lemak",
            "dapat diseduh hanya dalam satu menit"
        ],
        "materials": [
            "biji kakao fermentasi",
            "gula kelapa alami",
            "kemasan foil kedap udara"
        ],
        "images": image_sets["cocoa"]
    },
    "syrup": {
        "adjectives": adjectives_map["beverage"],
        "use_cases": [
            "memperkaya kreasi minuman rumahan",
            "menambah rasa pada dessert favorit",
            "mudah dipadukan dengan kopi atau teh"
        ],
        "highlights": [
            "dibuat dari ekstrak buah asli",
            "tidak mengandung pewarna buatan",
            "botol kaca dengan pourer presisi"
        ],
        "materials": [
            "gula tebu organik",
            "ekstrak vanila Madagaskar",
            "botol kaca recyclable"
        ],
        "images": image_sets["syrup"]
    },
    "cookware": {
        "adjectives": adjectives_map["kitchen"],
        "use_cases": [
            "mendukung eksplorasi resep keluarga",
            "tepat untuk kompor induksi maupun gas",
            "tahan lama untuk penggunaan intensif"
        ],
        "highlights": [
            "lapisan anti lengket bebas PFOA",
            "distribusi panas merata",
            "gagang ergonomis tahan panas"
        ],
        "materials": [
            "aluminium cast tebal",
            "lapisan keramik premium",
            "penutup kaca temper"
        ],
        "images": image_sets["cookware"]
    },
    "bakeware": {
        "adjectives": adjectives_map["kitchen"],
        "use_cases": [
            "membantu hasil baking matang merata",
            "memudahkan pelepasan kue tanpa lengket",
            "ramah dishwasher untuk perawatan mudah"
        ],
        "highlights": [
            "lapisan anti lengket food grade",
            "desain anti warping",
            "tahan panas hingga 260°C"
        ],
        "materials": [
            "baja karbon tebal",
            "coating keramik",
            "silikon BPA-free"
        ],
        "images": image_sets["bakeware"]
    },
    "kitchen_tool": {
        "adjectives": adjectives_map["kitchen"],
        "use_cases": [
            "meningkatkan efisiensi di dapur",
            "menjaga countertop tetap rapi",
            "memberikan hasil potong yang presisi"
        ],
        "highlights": [
            "set lengkap untuk kebutuhan harian",
            "finishing halus mudah dibersihkan",
            "desain modular hemat ruang"
        ],
        "materials": [
            "kayu akasia bersertifikat",
            "stainless steel anti karat",
            "silikon food grade"
        ],
        "images": image_sets["kitchen_tool"]
    },
    "book": {
        "adjectives": adjectives_map["book"],
        "use_cases": [
            "menjadi bacaan pengantar tidur",
            "menambah referensi perpustakaan rumah",
            "hadiah istimewa untuk sahabat"
        ],
        "highlights": [
            "ditulis oleh penulis best seller",
            "alur cerita yang menyentuh hati",
            "layout mudah dibaca dengan tipografi rapi"
        ],
        "materials": [
            "kertas FSC premium",
            "cover soft-touch tahan lama",
            "lem perekat berkualitas"
        ],
        "images": image_sets["book"]
    },
    "stationery": {
        "adjectives": adjectives_map["book"],
        "use_cases": [
            "mendukung produktivitas harian",
            "mengorganisir ide dan to-do list",
            "cocok sebagai hadiah kantor"
        ],
        "highlights": [
            "kertas bebas bleeding",
            "layout dengan bullet dan grid",
            "band elastis pengaman"
        ],
        "materials": [
            "kertas 100 gsm",
            "cover kulit sintetis",
            "binding jahit kuat"
        ],
        "images": image_sets["stationery"]
    },
    "craft": {
        "adjectives": adjectives_map["craft"],
        "use_cases": [
            "memantik kreativitas tanpa batas",
            "aktivitas bersama keluarga",
            "proyek DIY akhir pekan"
        ],
        "highlights": [
            "warna cerah yang mudah dicampur",
            "kit lengkap siap pakai",
            "panduan langkah demi langkah"
        ],
        "materials": [
            "pigmen non-toxic",
            "canvas katun rapat",
            "alat stainless anti karat"
        ],
        "images": image_sets["craft"]
    },
    "toy": {
        "adjectives": adjectives_map["kids"],
        "use_cases": [
            "melatih motorik dan imajinasi anak",
            "cocok untuk hadiah ulang tahun",
            "meningkatkan kemampuan STEM sejak dini"
        ],
        "highlights": [
            "material aman bersertifikasi",
            "warna cerah menarik perhatian",
            "modul edukatif yang interaktif"
        ],
        "materials": [
            "plastik BPA-free",
            "kayu FSC halus",
            "magnet neodymium tertutup"
        ],
        "images": image_sets["toy"]
    },
    "pet": {
        "adjectives": adjectives_map["pet"],
        "use_cases": [
            "memberi nutrisi seimbang untuk hewan kesayangan",
            "mengurangi stres saat grooming",
            "menemani waktu bermain di rumah"
        ],
        "highlights": [
            "resep direkomendasikan dokter hewan",
            "tekstur ramah gigi",
            "aroma alami yang disukai"
        ],
        "materials": [
            "protein hewani berkualitas",
            "serat alami",
            "bahan hypoallergenic"
        ],
        "images": image_sets["pet"]
    },
    "outdoor": {
        "adjectives": adjectives_map["outdoor"],
        "use_cases": [
            "menemani ekspedisi alam",
            "tahan cuaca ekstrem",
            "praktis dibawa bepergian"
        ],
        "highlights": [
            "material tahan air dan robek",
            "desain ringkas multifungsi",
            "kompartemen penyimpanan pintar"
        ],
        "materials": [
            "ripstop nylon",
            "resleting YKK",
            "kerangka aluminium ringan"
        ],
        "images": image_sets["outdoor"]
    },
    "travel": {
        "adjectives": adjectives_map["travel"],
        "use_cases": [
            "menjaga barang tetap rapi di koper",
            "membuat perjalanan panjang lebih nyaman",
            "mudah disesuaikan dengan gaya hidup mobile"
        ],
        "highlights": [
            "kompartemen modular",
            "bahan anti air",
            "strap elastis yang kuat"
        ],
        "materials": [
            "nylon premium",
            "mesh breathable",
            "busa memory"
        ],
        "images": image_sets["travel"]
    },
    "beauty": {
        "adjectives": adjectives_map["beauty"],
        "use_cases": [
            "menjaga kulit tetap sehat bercahaya",
            "menyempurnakan riasan harian",
            "menghadirkan sentuhan spa di rumah"
        ],
        "highlights": [
            "formula bebas paraben",
            "kaya antioksidan dan botanical",
            "tekstur ringan mudah meresap"
        ],
        "materials": [
            "kompleks hyaluronic",
            "ekstrak bunga alami",
            "kemasan pump higienis"
        ],
        "images": image_sets["beauty"]
    },
    "office": {
        "adjectives": adjectives_map["office"],
        "use_cases": [
            "meningkatkan produktivitas meja kerja",
            "membuat dokumen lebih terorganisir",
            "memberi kenyamanan saat bekerja jarak jauh"
        ],
        "highlights": [
            "desain minimalis hemat ruang",
            "fitur multi-kompartemen",
            "material premium tahan lama"
        ],
        "materials": [
            "logam powder coating",
            "kulit sintetis",
            "kertas tebal bebas asam"
        ],
        "images": image_sets["office"]
    },
    "auto": {
        "adjectives": adjectives_map["auto"],
        "use_cases": [
            "meningkatkan kenyamanan kabin",
            "menjaga kendaraan tetap bersih",
            "menambah keamanan saat berkendara"
        ],
        "highlights": [
            "material tahan panas",
            "pemasangan plug-and-play",
            "fit universal berbagai model"
        ],
        "materials": [
            "kulit sintetis premium",
            "karet anti slip",
            "serat microfiber"
        ],
        "images": image_sets["auto"]
    },
    "garden": {
        "adjectives": adjectives_map["garden"],
        "use_cases": [
            "mempermudah perawatan tanaman",
            "mendukung hobi berkebun di rumah",
            "memberikan hasil tanam yang sehat"
        ],
        "highlights": [
            "desain ergonomis ringan",
            "tanda pengukuran akurat",
            "sistem drainase pintar"
        ],
        "materials": [
            "baja karbon anti karat",
            "plastik UV resistant",
            "kompos organik"
        ],
        "images": image_sets["garden"]
    },
    "cleaning": {
        "adjectives": adjectives_map["cleaning"],
        "use_cases": [
            "menjadikan rumah berkilau tanpa residu",
            "ramah lingkungan dan aman bagi keluarga",
            "efektif mengangkat noda membandel"
        ],
        "highlights": [
            "formula biodegradable",
            "aroma menyegarkan",
            "pad microfiber berdaya serap tinggi"
        ],
        "materials": [
            "enzim pembersih alami",
            "botol refillable",
            "serat bambu lembut"
        ],
        "images": image_sets["cleaning"]
    },
    "fitness": {
        "adjectives": adjectives_map["fitness"],
        "use_cases": [
            "mendukung latihan di rumah",
            "membantu pemulihan otot",
            "memantau kemajuan kebugaran"
        ],
        "highlights": [
            "permukaan anti selip",
            "penanda progres yang jelas",
            "integrasi aplikasi kebugaran"
        ],
        "materials": [
            "karet TPE premium",
            "busa EVA padat",
            "sensor optik presisi"
        ],
        "images": image_sets["fitness"]
    },
    "home": {
        "adjectives": adjectives_map["home"],
        "use_cases": [
            "menciptakan suasana rumah yang hangat",
            "menambah kenyamanan waktu istirahat",
            "menyegarkan udara ruangan"
        ],
        "highlights": [
            "tekstur super lembut",
            "aroma aromaterapi menenangkan",
            "kontrol kelembapan otomatis"
        ],
        "materials": [
            "serat kapas premium",
            "essential oil grade terapi",
            "wadah kaca elegan"
        ],
        "images": image_sets["home"]
    }
}

type_config = {
    "keyboard": {"category": "keyboard", "noun": "Mechanical Keyboard", "price_range": (89.0, 199.0), "variants": ["60%", "TKL", "Full-Size", "Wireless", "Low-Profile"]},
    "mouse": {"category": "mouse", "noun": "Wireless Mouse", "price_range": (39.0, 149.0), "variants": ["Ergonomic", "Ultra-Light", "Gaming", "Silent", "Travel"]},
    "usb_hub": {"category": "hub", "noun": "USB-C Hub", "price_range": (29.0, 129.0), "variants": ["7-in-1", "8-in-1", "11-in-1", "Slim", "Travel"]},
    "desk_mat": {"category": "desk_setup", "noun": "Desk Mat", "price_range": (19.0, 79.0), "variants": ["XL", "XXL", "Soft Touch", "Hybrid", "Travel"]},
    "switch_set": {"category": "switch", "noun": "Switch Set", "price_range": (29.0, 119.0), "variants": ["Tactile", "Linear", "Silent", "Speed", "Clicky"]},
    "keycap_set": {"category": "switch", "noun": "Keycap Set", "price_range": (45.0, 159.0), "variants": ["PBT", "Dye-Sub", "Shine-Through", "Gradient", "Artisan"]},
    "lube_kit": {"category": "switch", "noun": "Switch Lube Kit", "price_range": (19.0, 69.0), "variants": ["Standard", "Premium", "Workshop", "Travel", "Starter"]},
    "tool_kit": {"category": "switch", "noun": "Keyboard Toolkit", "price_range": (15.0, 79.0), "variants": ["Essentials", "Pro", "Compact", "Modding", "Repair"]},
    "wrist_rest": {"category": "desk_setup", "noun": "Wrist Rest", "price_range": (19.0, 69.0), "variants": ["Memory Foam", "Wood", "Cooling", "Slim", "Travel"]},
    "monitor_arm": {"category": "monitor_mount", "noun": "Monitor Arm", "price_range": (59.0, 189.0), "variants": ["Single", "Dual", "Wall", "Heavy-Duty", "Clamp"]},
    "cable_bundle": {"category": "hub", "noun": "Cable Organizer Bundle", "price_range": (12.0, 49.0), "variants": ["Starter", "Desk", "Travel", "Studio", "XL"]},
    "charger": {"category": "hub", "noun": "GaN Charger", "price_range": (29.0, 119.0), "variants": ["65W", "100W", "4-Port", "Compact", "Travel"]},
    "hdmi_switch": {"category": "hub", "noun": "HDMI Switch", "price_range": (25.0, 129.0), "variants": ["2x1", "3x1", "4x1", "8K", "4K"]},
    "ethernet_adapter": {"category": "hub", "noun": "Ethernet Adapter", "price_range": (19.0, 79.0), "variants": ["USB-C", "USB-A", "2.5G", "Gigabit", "Compact"]},
    "smart_plug": {"category": "smart_home", "noun": "Smart Plug", "price_range": (15.0, 49.0), "variants": ["Mini", "Energy", "Outdoor", "Duo", "Travel"]},
    "smart_bulb": {"category": "smart_home", "noun": "Smart Bulb", "price_range": (12.0, 59.0), "variants": ["RGB", "Warm", "Filament", "Spotlight", "Downlight"]},
    "smart_sensor": {"category": "smart_home", "noun": "Smart Sensor", "price_range": (19.0, 69.0), "variants": ["Motion", "Door", "Water", "Air", "Multi"]},
    "router": {"category": "smart_home", "noun": "Wi-Fi Router", "price_range": (59.0, 249.0), "variants": ["Dual-Band", "Tri-Band", "Mesh", "Gaming", "Travel"]},
    "speaker": {"category": "audio", "noun": "Bluetooth Speaker", "price_range": (49.0, 249.0), "variants": ["Portable", "360°", "Soundbar", "Desk", "Outdoor"]},
    "headphone": {"category": "audio", "noun": "Wireless Headphone", "price_range": (69.0, 299.0), "variants": ["ANC", "Studio", "Travel", "Gaming", "Lightweight"]},
    "earbud": {"category": "audio", "noun": "True Wireless Earbud", "price_range": (49.0, 199.0), "variants": ["ANC", "Sport", "Compact", "Hi-Fi", "Everyday"]},
    "camera": {"category": "camera", "noun": "Mirrorless Camera", "price_range": (399.0, 2499.0), "variants": ["Starter", "Travel", "Pro", "Hybrid", "Cinema"]},
    "camera_lens": {"category": "camera", "noun": "Camera Lens", "price_range": (129.0, 1499.0), "variants": ["Prime", "Zoom", "Wide", "Telephoto", "Macro"]},
    "tripod": {"category": "camera", "noun": "Carbon Tripod", "price_range": (59.0, 299.0), "variants": ["Travel", "Studio", "Video", "Mini", "Hybrid"]},
    "camera_bag": {"category": "camera", "noun": "Camera Bag", "price_range": (45.0, 189.0), "variants": ["Backpack", "Messenger", "Sling", "Roller", "Compact"]},
    "lighting_kit": {"category": "camera", "noun": "Lighting Kit", "price_range": (79.0, 349.0), "variants": ["LED Panel", "Ring Light", "Softbox", "Portable", "RGB"]},
    "dac_amp": {"category": "audio", "noun": "DAC AMP", "price_range": (79.0, 249.0), "variants": ["Portable", "Desktop", "Balanced", "USB-C", "Hi-Res"]},
    "gaming_headset": {"category": "gaming", "noun": "Gaming Headset", "price_range": (59.0, 199.0), "variants": ["Surround", "Wireless", "Esports", "RGB", "Lightweight"]},
    "controller": {"category": "gaming", "noun": "Wireless Controller", "price_range": (49.0, 189.0), "variants": ["Pro", "Compact", "Elite", "Arcade", "Retro"]},
    "mousepad": {"category": "desk_setup", "noun": "Gaming Mousepad", "price_range": (15.0, 69.0), "variants": ["XL", "Speed", "Control", "RGB", "Artisan"]},
    "smart_thermostat": {"category": "smart_home", "noun": "Smart Thermostat", "price_range": (99.0, 249.0), "variants": ["Learning", "Touch", "Mini", "Dual-Zone", "Glass"]},
    "security_cam": {"category": "smart_home", "noun": "Security Camera", "price_range": (59.0, 219.0), "variants": ["Indoor", "Outdoor", "Pan-Tilt", "Battery", "Pro"]},
    "doorbell": {"category": "smart_home", "noun": "Video Doorbell", "price_range": (89.0, 229.0), "variants": ["Battery", "Wired", "Pro", "Compact", "Floodlight"]},
    "vitamin": {"category": "wellness", "noun": "Daily Vitamin", "price_range": (12.0, 49.0), "variants": ["Immunity", "Energy", "Kids", "Senior", "Prenatal"]},
    "supplement": {"category": "wellness", "noun": "Wellness Supplement", "price_range": (15.0, 59.0), "variants": ["Omega", "Collagen", "Probiotic", "Detox", "Focus"]},
    "essential_oil": {"category": "wellness", "noun": "Essential Oil Blend", "price_range": (9.0, 39.0), "variants": ["Calm", "Energy", "Focus", "Sleep", "Refresh"]},
    "diffuser": {"category": "wellness", "noun": "Ultrasonic Diffuser", "price_range": (29.0, 89.0), "variants": ["Ceramic", "Wood", "Travel", "Ambient", "Glass"]},
    "sleep_aid": {"category": "wellness", "noun": "Sleep Aid", "price_range": (19.0, 69.0), "variants": ["Melatonin", "Herbal", "Aromatherapy", "Spray", "Gummy"]},
    "first_aid": {"category": "pharmacy", "noun": "First Aid Kit", "price_range": (15.0, 79.0), "variants": ["Family", "Travel", "Compact", "Outdoor", "Office"]},
    "pain_relief": {"category": "pharmacy", "noun": "Pain Relief Pack", "price_range": (9.0, 39.0), "variants": ["Patch", "Gel", "Tablet", "Roll-On", "Heat"]},
    "cough_relief": {"category": "pharmacy", "noun": "Cough Relief", "price_range": (8.0, 29.0), "variants": ["Syrup", "Lozenge", "Herbal", "Immune", "Kids"]},
    "skincare": {"category": "beauty", "noun": "Skincare Serum", "price_range": (19.0, 129.0), "variants": ["Brightening", "Hydrating", "Anti-Aging", "Calming", "Clarifying"]},
    "sanitizer": {"category": "pharmacy", "noun": "Hand Sanitizer", "price_range": (3.0, 19.0), "variants": ["Spray", "Gel", "Refill", "Travel", "Kids"]},
    "protein_powder": {"category": "nutrition", "noun": "Protein Powder", "price_range": (25.0, 89.0), "variants": ["Vanilla", "Chocolate", "Mocha", "Strawberry", "Cookies"]},
    "energy_bar": {"category": "nutrition", "noun": "Energy Bar", "price_range": (5.0, 29.0), "variants": ["Almond", "Chocolate", "Sea Salt", "Peanut", "Berry"]},
    "hydration_mix": {"category": "nutrition", "noun": "Hydration Mix", "price_range": (12.0, 39.0), "variants": ["Citrus", "Berry", "Melon", "Ginger", "Tropical"]},
    "electrolyte": {"category": "nutrition", "noun": "Electrolyte Tablets", "price_range": (9.0, 29.0), "variants": ["Citrus", "Berry", "Lemon-Lime", "Orange", "Grapefruit"]},
    "meal_replacement": {"category": "nutrition", "noun": "Meal Replacement Shake", "price_range": (19.0, 59.0), "variants": ["Vanilla", "Chocolate", "Coffee", "Banana", "Berry"]},
    "organic_snack": {"category": "snack", "noun": "Organic Snack Mix", "price_range": (7.0, 29.0), "variants": ["Trail", "Nutty", "Fruit", "Savory", "Protein"]},
    "granola": {"category": "snack", "noun": "Artisan Granola", "price_range": (6.0, 24.0), "variants": ["Almond", "Coconut", "Berry", "Matcha", "Honey"]},
    "nut_butter": {"category": "snack", "noun": "Nut Butter", "price_range": (8.0, 35.0), "variants": ["Almond", "Peanut", "Cashew", "Hazelnut", "Mixed"]},
    "dried_fruit": {"category": "snack", "noun": "Dried Fruit Mix", "price_range": (6.0, 27.0), "variants": ["Tropical", "Berry", "Citrus", "Classic", "Kids"]},
    "specialty_tea": {"category": "tea", "noun": "Specialty Tea", "price_range": (9.0, 39.0), "variants": ["Oolong", "Matcha", "Chamomile", "Earl Grey", "Herbal"]},
    "specialty_coffee": {"category": "coffee", "noun": "Specialty Coffee", "price_range": (12.0, 39.0), "variants": ["Single Origin", "Espresso", "House Blend", "Cold Brew", "Dark Roast"]},
    "cocoa_mix": {"category": "cocoa", "noun": "Cocoa Mix", "price_range": (8.0, 29.0), "variants": ["Classic", "Mocha", "Peppermint", "Salted Caramel", "Vegan"]},
    "flavored_syrup": {"category": "syrup", "noun": "Flavored Syrup", "price_range": (7.0, 24.0), "variants": ["Vanilla", "Caramel", "Hazelnut", "Pumpkin", "Lavender"]},
    "coffee_grinder": {"category": "coffee", "noun": "Coffee Grinder", "price_range": (35.0, 159.0), "variants": ["Manual", "Electric", "Burr", "Travel", "Compact"]},
    "cookware": {"category": "cookware", "noun": "Cookware Set", "price_range": (59.0, 299.0), "variants": ["Starter", "Pro", "Copper", "Hybrid", "Induction"]},
    "small_appliance": {"category": "cookware", "noun": "Kitchen Appliance", "price_range": (39.0, 189.0), "variants": ["Blender", "Air Fryer", "Mixer", "Juicer", "Rice Cooker"]},
    "knife_set": {"category": "kitchen_tool", "noun": "Knife Set", "price_range": (49.0, 229.0), "variants": ["Starter", "Santoku", "Chef", "Serrated", "Utility"]},
    "utensil_set": {"category": "kitchen_tool", "noun": "Utensil Set", "price_range": (19.0, 89.0), "variants": ["Silicone", "Bamboo", "Nylon", "Stainless", "Compact"]},
    "kitchen_storage": {"category": "kitchen_tool", "noun": "Kitchen Storage", "price_range": (15.0, 69.0), "variants": ["Canister", "Jar", "Container", "Dispenser", "Organizer"]},
    "bakeware": {"category": "bakeware", "noun": "Bakeware Set", "price_range": (24.0, 149.0), "variants": ["Tray", "Mold", "Springform", "Loaf", "Muffin"]},
    "baking_mix": {"category": "bakeware", "noun": "Baking Mix", "price_range": (6.0, 29.0), "variants": ["Brownie", "Pancake", "Waffle", "Cake", "Cookie"]},
    "decorating_tool": {"category": "bakeware", "noun": "Decorating Tool", "price_range": (12.0, 59.0), "variants": ["Piping", "Stencil", "Fondant", "Scraper", "Nozzle"]},
    "spatula_set": {"category": "kitchen_tool", "noun": "Spatula Set", "price_range": (9.0, 39.0), "variants": ["Mini", "Flex", "Offset", "Silicone", "Wood"]},
    "kitchen_apron": {"category": "kitchen_tool", "noun": "Kitchen Apron", "price_range": (12.0, 49.0), "variants": ["Canvas", "Denim", "Waterproof", "Crossback", "Kids"]},
    "novel": {"category": "book", "noun": "Contemporary Novel", "price_range": (12.0, 39.0), "variants": ["Romance", "Thriller", "Drama", "Historical", "Sci-Fi"]},
    "non_fiction": {"category": "book", "noun": "Non-Fiction Book", "price_range": (14.0, 49.0), "variants": ["Biography", "Business", "Self-Help", "History", "Science"]},
    "notebook": {"category": "stationery", "noun": "Premium Notebook", "price_range": (9.0, 35.0), "variants": ["Dot Grid", "Lined", "Blank", "Weekly", "Pocket"]},
    "planner": {"category": "stationery", "noun": "Productivity Planner", "price_range": (15.0, 45.0), "variants": ["Weekly", "Monthly", "Undated", "Academic", "Project"]},
    "stationery_set": {"category": "stationery", "noun": "Stationery Set", "price_range": (12.0, 39.0), "variants": ["Minimal", "Pastel", "Retro", "Executive", "Kids"]},
    "craft_kit": {"category": "craft", "noun": "Craft Kit", "price_range": (19.0, 79.0), "variants": ["Watercolor", "Embroidery", "Clay", "Paper", "DIY Decor"]},
    "fabric_bundle": {"category": "craft", "noun": "Fabric Bundle", "price_range": (14.0, 59.0), "variants": ["Cotton", "Linen", "Denim", "Pattern", "Pastel"]},
    "paint_set": {"category": "craft", "noun": "Paint Set", "price_range": (12.0, 69.0), "variants": ["Watercolor", "Acrylic", "Gouache", "Oil", "Marker"]},
    "brush_set": {"category": "craft", "noun": "Brush Set", "price_range": (9.0, 39.0), "variants": ["Detail", "Wash", "Calligraphy", "Synthetic", "Natural"]},
    "cutting_tool": {"category": "craft", "noun": "Cutting Tool", "price_range": (8.0, 49.0), "variants": ["Rotary", "Precision", "Shear", "Trimmer", "Punch"]},
    "educational_toy": {"category": "toy", "noun": "Educational Toy", "price_range": (19.0, 79.0), "variants": ["STEM", "Puzzle", "Coding", "Math", "Language"]},
    "board_game": {"category": "toy", "noun": "Board Game", "price_range": (15.0, 69.0), "variants": ["Strategy", "Family", "Party", "Co-op", "Card"]},
    "puzzle": {"category": "toy", "noun": "Puzzle Set", "price_range": (9.0, 39.0), "variants": ["500 Piece", "1000 Piece", "3D", "Wood", "Kids"]},
    "stem_kit": {"category": "toy", "noun": "STEM Kit", "price_range": (19.0, 89.0), "variants": ["Robotics", "Electronics", "Chemistry", "Engineering", "Astronomy"]},
    "plush_toy": {"category": "toy", "noun": "Plush Toy", "price_range": (8.0, 29.0), "variants": ["Classic", "Animal", "Fantasy", "Comfort", "Mini"]},
    "pet_food": {"category": "pet", "noun": "Premium Pet Food", "price_range": (12.0, 59.0), "variants": ["Adult", "Puppy", "Senior", "Grain-Free", "Sensitive"]},
    "pet_treat": {"category": "pet", "noun": "Pet Treat", "price_range": (5.0, 24.0), "variants": ["Dental", "Soft", "Crunchy", "Freeze-Dried", "Training"]},
    "pet_toy": {"category": "pet", "noun": "Pet Toy", "price_range": (6.0, 29.0), "variants": ["Chew", "Interactive", "Plush", "Ball", "Puzzle"]},
    "grooming_tool": {"category": "pet", "noun": "Grooming Tool", "price_range": (9.0, 39.0), "variants": ["Brush", "Clipper", "Deshedder", "Glove", "Kit"]},
    "pet_accessory": {"category": "pet", "noun": "Pet Accessory", "price_range": (8.0, 34.0), "variants": ["Harness", "Leash", "Bowl", "Carrier", "Mat"]},
    "camping_gear": {"category": "outdoor", "noun": "Camping Gear", "price_range": (29.0, 199.0), "variants": ["Tent", "Sleeping Bag", "Cookset", "Chair", "Shelter"]},
    "hiking_pack": {"category": "outdoor", "noun": "Hiking Pack", "price_range": (39.0, 179.0), "variants": ["Daypack", "Overnight", "Hydration", "Ultralight", "Kid Carrier"]},
    "lantern": {"category": "outdoor", "noun": "Rechargeable Lantern", "price_range": (19.0, 89.0), "variants": ["LED", "Solar", "Camp", "Compact", "Pro"]},
    "water_bottle": {"category": "outdoor", "noun": "Insulated Bottle", "price_range": (9.0, 49.0), "variants": ["Wide Mouth", "Straw", "Collapsible", "Stainless", "Kids"]},
    "survival_tool": {"category": "outdoor", "noun": "Survival Tool", "price_range": (12.0, 69.0), "variants": ["Multi-Tool", "Knife", "Firestarter", "First Aid", "Emergency"]},
    "travel_accessory": {"category": "travel", "noun": "Travel Accessory", "price_range": (8.0, 39.0), "variants": ["Organizer", "Wallet", "Adapter", "Cable", "Laundry"]},
    "packing_cube": {"category": "travel", "noun": "Packing Cube", "price_range": (12.0, 44.0), "variants": ["Compression", "Mesh", "Shoe", "Laundry", "Kids"]},
    "luggage_tag": {"category": "travel", "noun": "Luggage Tag", "price_range": (5.0, 19.0), "variants": ["Leather", "Metal", "Silicone", "Minimal", "Custom"]},
    "toiletry_bag": {"category": "travel", "noun": "Toiletry Bag", "price_range": (15.0, 59.0), "variants": ["Hanging", "Compact", "Waterproof", "Organizer", "Family"]},
    "neck_pillow": {"category": "travel", "noun": "Neck Pillow", "price_range": (9.0, 39.0), "variants": ["Memory Foam", "Inflatable", "Cooling", "Wrap", "Kids"]},
    "makeup": {"category": "beauty", "noun": "Makeup Palette", "price_range": (19.0, 79.0), "variants": ["Warm", "Cool", "Neutral", "Glow", "Bold"]},
    "haircare": {"category": "beauty", "noun": "Haircare Set", "price_range": (14.0, 69.0), "variants": ["Repair", "Volume", "Smooth", "Clarifying", "Curl"]},
    "fragrance": {"category": "beauty", "noun": "Signature Fragrance", "price_range": (29.0, 129.0), "variants": ["Citrus", "Floral", "Woody", "Musk", "Fresh"]},
    "beauty_tool": {"category": "beauty", "noun": "Beauty Tool", "price_range": (9.0, 59.0), "variants": ["Brush", "Sponge", "Roller", "LED", "Massage"]},
    "office_supply": {"category": "office", "noun": "Office Supply Set", "price_range": (12.0, 49.0), "variants": ["Starter", "Executive", "Minimal", "Bold", "Pastel"]},
    "desk_organizer": {"category": "office", "noun": "Desk Organizer", "price_range": (19.0, 79.0), "variants": ["Stackable", "Drawer", "Wall", "Cable", "Mobile"]},
    "pen_set": {"category": "stationery", "noun": "Premium Pen Set", "price_range": (9.0, 69.0), "variants": ["Fountain", "Gel", "Roller", "Calligraphy", "Multicolor"]},
    "ergonomic_accessory": {"category": "office", "noun": "Ergonomic Accessory", "price_range": (19.0, 149.0), "variants": ["Foot Rest", "Chair Cushion", "Laptop Stand", "Monitor Riser", "Desk Converter"]},
    "car_accessory": {"category": "auto", "noun": "Car Accessory", "price_range": (12.0, 69.0), "variants": ["Organizer", "Charger", "Mount", "Cover", "Cleaner"]},
    "cleaning_supply": {"category": "cleaning", "noun": "Cleaning Supply", "price_range": (7.0, 39.0), "variants": ["Multi-Surface", "Glass", "Bathroom", "Kitchen", "Floor"]},
    "tech_mount": {"category": "auto", "noun": "Dashboard Tech Mount", "price_range": (9.0, 39.0), "variants": ["Magnetic", "Clip", "Suction", "Vent", "Wireless"]},
    "emergency_kit": {"category": "auto", "noun": "Emergency Kit", "price_range": (19.0, 89.0), "variants": ["Roadside", "Winter", "All-Weather", "Compact", "Family"]},
    "seat_cover": {"category": "auto", "noun": "Seat Cover", "price_range": (29.0, 129.0), "variants": ["Leather", "Fabric", "Heated", "Cooling", "Pet"]},
    "garden_tool": {"category": "garden", "noun": "Garden Tool", "price_range": (9.0, 59.0), "variants": ["Trowel", "Pruner", "Rake", "Hoe", "Weeder"]},
    "planter": {"category": "garden", "noun": "Planter Pot", "price_range": (12.0, 49.0), "variants": ["Ceramic", "Terracotta", "Hanging", "Self-Watering", "Indoor"]},
    "seed_kit": {"category": "garden", "noun": "Seed Kit", "price_range": (7.0, 29.0), "variants": ["Herb", "Vegetable", "Flower", "Microgreen", "Sprout"]},
    "watering_can": {"category": "garden", "noun": "Watering Can", "price_range": (12.0, 39.0), "variants": ["Metal", "Plastic", "Indoor", "Sprayer", "Long Spout"]},
    "soil_mix": {"category": "garden", "noun": "Soil Mix", "price_range": (9.0, 34.0), "variants": ["All-Purpose", "Succulent", "Seed Starting", "Orchid", "Compost"]},
    "eco_cleaner": {"category": "cleaning", "noun": "Eco Cleaner", "price_range": (7.0, 29.0), "variants": ["Multipurpose", "Kitchen", "Bathroom", "Glass", "Laundry"]},
    "laundry_supply": {"category": "cleaning", "noun": "Laundry Supply", "price_range": (9.0, 39.0), "variants": ["Detergent", "Softener", "Booster", "Sheets", "Freshener"]},
    "sponge_set": {"category": "cleaning", "noun": "Sponge Set", "price_range": (5.0, 19.0), "variants": ["Cellulose", "Scrub", "Silicone", "Reusable", "Compostable"]},
    "storage_canister": {"category": "cleaning", "noun": "Storage Canister", "price_range": (9.0, 34.0), "variants": ["Glass", "Metal", "Stackable", "Bamboo", "Acrylic"]},
    "fitness_equipment": {"category": "fitness", "noun": "Fitness Equipment", "price_range": (29.0, 199.0), "variants": ["Dumbbell", "Kettlebell", "Bench", "Suspension", "Bike"]},
    "yoga_accessory": {"category": "fitness", "noun": "Yoga Accessory", "price_range": (12.0, 69.0), "variants": ["Mat", "Block", "Wheel", "Strap", "Bolster"]},
    "resistance_band": {"category": "fitness", "noun": "Resistance Band", "price_range": (9.0, 39.0), "variants": ["Light", "Medium", "Heavy", "Loop", "Tubing"]},
    "foam_roller": {"category": "fitness", "noun": "Foam Roller", "price_range": (15.0, 49.0), "variants": ["Smooth", "Textured", "Half", "Compact", "Vibrating"]},
    "smart_watch": {"category": "fitness", "noun": "Smart Watch", "price_range": (79.0, 299.0), "variants": ["Sport", "Classic", "Outdoor", "Mini", "Pro"]},
    "bedding": {"category": "home", "noun": "Bedding Set", "price_range": (39.0, 199.0), "variants": ["Cotton", "Linen", "Bamboo", "Microfiber", "Hotel"]},
    "throw_blanket": {"category": "home", "noun": "Throw Blanket", "price_range": (19.0, 89.0), "variants": ["Chunky", "Fleece", "Weighted", "Reversible", "Travel"]},
    "aromatherapy": {"category": "home", "noun": "Aromatherapy Set", "price_range": (14.0, 59.0), "variants": ["Lavender", "Citrus", "Eucalyptus", "Vanilla", "Forest"]},
    "lighting": {"category": "home", "noun": "Ambient Lighting", "price_range": (24.0, 129.0), "variants": ["Table", "Floor", "String", "Wall", "Smart"]},
    "humidifier": {"category": "home", "noun": "Room Humidifier", "price_range": (29.0, 149.0), "variants": ["Ultrasonic", "Warm", "Cool Mist", "Desktop", "Travel"]}
}

stores = [
    {"id": 401, "name": "ByteHub Electronics", "types": [("keyboard", 6), ("mouse", 6), ("usb_hub", 4), ("desk_mat", 2), ("switch_set", 2)]},
    {"id": 402, "name": "Pixel Peripherals", "types": [("keyboard", 4), ("mouse", 4), ("monitor_arm", 4), ("cable_bundle", 4), ("desk_mat", 4)]},
    {"id": 403, "name": "Circuit Central", "types": [("usb_hub", 4), ("charger", 4), ("cable_bundle", 4), ("hdmi_switch", 4), ("ethernet_adapter", 4)]},
    {"id": 404, "name": "Gadget Grove", "types": [("smart_plug", 4), ("smart_bulb", 4), ("smart_sensor", 4), ("router", 4), ("speaker", 4)]},
    {"id": 405, "name": "Board & Switch", "types": [("switch_set", 6), ("keycap_set", 6), ("lube_kit", 4), ("tool_kit", 2), ("wrist_rest", 2)]},
    {"id": 406, "name": "Motion Audio", "types": [("headphone", 6), ("earbud", 6), ("speaker", 4), ("dac_amp", 4)]},
    {"id": 407, "name": "Lens & Frame", "types": [("camera", 6), ("camera_lens", 6), ("tripod", 4), ("camera_bag", 2), ("lighting_kit", 2)]},
    {"id": 408, "name": "Cable Connect", "types": [("usb_hub", 5), ("charger", 5), ("hdmi_switch", 4), ("ethernet_adapter", 3), ("cable_bundle", 3)]},
    {"id": 409, "name": "SmartHome Living", "types": [("smart_plug", 5), ("smart_bulb", 5), ("smart_thermostat", 4), ("security_cam", 4), ("doorbell", 2)]},
    {"id": 410, "name": "Pro Gaming Gear", "types": [("mouse", 5), ("keyboard", 5), ("gaming_headset", 4), ("controller", 4), ("mousepad", 2)]},
    {"id": 411, "name": "Urban Wellness", "types": [("vitamin", 5), ("supplement", 5), ("essential_oil", 4), ("diffuser", 3), ("sleep_aid", 3)]},
    {"id": 412, "name": "Vital Pharmacy", "types": [("first_aid", 5), ("pain_relief", 5), ("cough_relief", 4), ("skincare", 3), ("sanitizer", 3)]},
    {"id": 413, "name": "Fit Fuel", "types": [("protein_powder", 5), ("energy_bar", 5), ("hydration_mix", 4), ("electrolyte", 3), ("meal_replacement", 3)]},
    {"id": 414, "name": "Organic Choice Market", "types": [("organic_snack", 6), ("granola", 4), ("nut_butter", 4), ("dried_fruit", 4), ("specialty_tea", 2)]},
    {"id": 415, "name": "Beverage Boutique", "types": [("specialty_coffee", 6), ("specialty_tea", 6), ("cocoa_mix", 4), ("flavored_syrup", 2), ("coffee_grinder", 2)]},
    {"id": 416, "name": "Kitchen Crafter", "types": [("cookware", 5), ("small_appliance", 5), ("knife_set", 4), ("utensil_set", 3), ("kitchen_storage", 3)]},
    {"id": 417, "name": "Bake Bliss", "types": [("bakeware", 5), ("baking_mix", 5), ("decorating_tool", 4), ("spatula_set", 3), ("kitchen_apron", 3)]},
    {"id": 418, "name": "Book Nook", "types": [("novel", 5), ("non_fiction", 5), ("notebook", 4), ("planner", 3), ("stationery_set", 3)]},
    {"id": 419, "name": "Craft Corner", "types": [("craft_kit", 5), ("fabric_bundle", 5), ("paint_set", 4), ("brush_set", 3), ("cutting_tool", 3)]},
    {"id": 420, "name": "Toy Town", "types": [("educational_toy", 5), ("board_game", 5), ("puzzle", 4), ("stem_kit", 3), ("plush_toy", 3)]},
    {"id": 421, "name": "Paws & Whiskers", "types": [("pet_food", 5), ("pet_treat", 5), ("pet_toy", 4), ("grooming_tool", 3), ("pet_accessory", 3)]},
    {"id": 422, "name": "Outdoor Explorer", "types": [("camping_gear", 5), ("hiking_pack", 5), ("lantern", 4), ("water_bottle", 3), ("survival_tool", 3)]},
    {"id": 423, "name": "Travel Essentials Co.", "types": [("travel_accessory", 5), ("packing_cube", 5), ("luggage_tag", 4), ("toiletry_bag", 3), ("neck_pillow", 3)]},
    {"id": 424, "name": "Beauty Bloom", "types": [("skincare", 5), ("makeup", 5), ("haircare", 4), ("fragrance", 3), ("beauty_tool", 3)]},
    {"id": 425, "name": "Office Essentials", "types": [("office_supply", 5), ("desk_organizer", 5), ("pen_set", 4), ("notebook", 3), ("ergonomic_accessory", 3)]},
    {"id": 426, "name": "Auto Care Center", "types": [("car_accessory", 5), ("cleaning_supply", 5), ("tech_mount", 4), ("emergency_kit", 3), ("seat_cover", 3)]},
    {"id": 427, "name": "Garden Haven", "types": [("garden_tool", 5), ("planter", 5), ("seed_kit", 4), ("watering_can", 3), ("soil_mix", 3)]},
    {"id": 428, "name": "Clean Living Supplies", "types": [("eco_cleaner", 6), ("laundry_supply", 4), ("cleaning_supply", 4), ("sponge_set", 3), ("storage_canister", 3)]},
    {"id": 429, "name": "Fitness Forge", "types": [("fitness_equipment", 5), ("yoga_accessory", 5), ("resistance_band", 4), ("foam_roller", 3), ("smart_watch", 3)]},
    {"id": 430, "name": "Home Comfort Co.", "types": [("bedding", 5), ("throw_blanket", 5), ("aromatherapy", 4), ("lighting", 3), ("humidifier", 3)]}
]

def generate_name(category_cfg, type_cfg, idx):
    adjectives = category_cfg["adjectives"]
    adjective = adjectives[idx % len(adjectives)]
    variants = type_cfg.get("variants") or [""]
    variant = variants[(idx // len(adjectives)) % len(variants)]
    parts = [adjective]
    if variant and variant not in type_cfg["noun"]:
        parts.append(variant)
    parts.append(type_cfg["noun"])
    name = " ".join(part for part in parts if part)
    if idx >= len(adjectives) * len(variants):
        name += f" {idx + 1}"
    return name


def build_description(title, store_name, category_cfg):
    feature = random.choice(category_cfg["highlights"])
    use_case = random.choice(category_cfg["use_cases"])
    material = random.choice(category_cfg["materials"])
    return (
        f"{title} dari {store_name} menghadirkan {feature}. "
        f"Dibuat dengan {material} sehingga {use_case}. "
        "Setiap produk telah melalui proses kurasi dan siap mendukung aktivitas harianmu."
    )


products = []
product_id = 1

type_indices = {key: 0 for key in type_config.keys()}

for store in stores:
    local_counters = {}
    for type_key, count in store["types"]:
        cfg = type_config[type_key]
        category_cfg = categories[cfg["category"]]
        for _ in range(count):
            idx = local_counters.get(type_key, 0)
            name = generate_name(category_cfg, cfg, idx)
            price = round(random.uniform(*cfg["price_range"]), 2)
            images = category_cfg["images"]
            offset = (type_indices[type_key] + idx) % len(images)
            product_images = images[offset:] + images[:offset]
            description = build_description(name, store["name"], category_cfg)
            discount = random.choice([5, 7, 10, 12, 15, 18, 20, 22, 25])

            products.append({
                "id": product_id,
                "price": price,
                "title": name,
                "description": description,
                "images": product_images,
                "shop": {"id": store["id"], "name": store["name"]},
                "discount_percentage": discount
            })

            product_id += 1
            idx += 1
            local_counters[type_key] = idx
        type_indices[type_key] += count

output_paths = [
    Path("src/data/products.json"),
    Path("public/product.json")
]

for path in output_paths:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8")

print(f"Generated {len(products)} products across {len(stores)} stores.")
