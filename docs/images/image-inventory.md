# Public image inventory

Generated deterministically by `node scripts/image-inventory.mjs --write`.

## URL preservation and asset disposition

- Existing public URLs are preserved. Oversized blog PNGs are optimized in place, and `/images/og-default.jpg` remains the default social-preview URL.
- “Unreferenced” means no exact static URL occurs under `src/`; it does not prove that an asset has no external or future use.
- Unreferenced product images are retained as a potentially valuable catalog pool. Review product/content mapping before any future migration or deletion.
- Unreferenced brand SVGs are also retained; the current brand strip renders names as text rather than loading these files.
- This inventory records technical metadata only. It makes no assertion about copyright, licensing, provenance, or usage rights.

## Inventory

| Public URL | Detected MIME | Dimensions | Bytes | Usage |
|---|---:|---:|---:|---|
| `/images/blog/beginners-guide.jpg` | image/jpeg | 800×450 | 60292 | Unreferenced (retained) |
| `/images/blog/choosingfirststrength.png` | image/png | 1200×670 | 406716 | Referenced: `src/content/blog/p003-beginner-guide-strength.json` |
| `/images/blog/flavorsforbeginners.png` | image/png | 1200×670 | 398614 | Referenced: `src/content/blog/p010-best-flavors-beginners.json` |
| `/images/blog/former_smokers.png` | image/png | 1200×670 | 443476 | Referenced: `src/content/blog/p009-best-for-ex-smokers.json` |
| `/images/blog/gumvspatches.png` | image/png | 1200×670 | 427252 | Referenced: `src/content/blog/p007-pouches-vs-gum-patches.json` |
| `/images/blog/health-comparison.jpg` | image/jpeg | 800×450 | 53133 | Unreferenced (retained) |
| `/images/blog/howlong.png` | image/png | 1200×670 | 428342 | Referenced: `src/content/blog/p004-how-long-to-keep.json` |
| `/images/blog/howmany.png` | image/png | 1200×670 | 443464 | Referenced: `src/content/blog/p005-how-many-per-day.json` |
| `/images/blog/howtostore.png` | image/png | 1200×670 | 402655 | Referenced: `src/content/blog/p012-storage-freshness.json` |
| `/images/blog/pouchesvsvaping.png` | image/png | 1200×670 | 442136 | Referenced: `src/content/blog/p006-pouches-vs-vaping.json` |
| `/images/blog/sideeffects.png` | image/png | 1200×670 | 498002 | Referenced: `src/content/blog/p008-side-effects.json` |
| `/images/blog/stainteeth.png` | image/png | 1200×670 | 441142 | Referenced: `src/content/blog/p011-teeth-staining.json` |
| `/images/blog/strengthexplained.png` | image/png | 1200×670 | 391688 | Referenced: `src/content/blog/p002-strength-explained.json` |
| `/images/blog/switchfromcigarettes.png` | image/png | 1200×670 | 448128 | Referenced: `src/content/blog/p001-switch-from-cigarettes.json` |
| `/images/blog/velo-vs-zyn.jpg` | image/jpeg | 800×450 | 45502 | Unreferenced (retained) |
| `/images/brands/lyft.svg` | image/svg+xml | 120×40 | 211 | Unreferenced (retained) |
| `/images/brands/nordic-spirit.svg` | image/svg+xml | 180×40 | 214 | Unreferenced (retained) |
| `/images/brands/pablo.svg` | image/svg+xml | 120×40 | 212 | Referenced: `src/content/brands/pablo.json` |
| `/images/brands/velo.svg` | image/svg+xml | 120×40 | 211 | Referenced: `src/content/brands/velo.json` |
| `/images/brands/zyn.svg` | image/svg+xml | 120×40 | 210 | Referenced: `src/content/brands/zyn.json` |
| `/images/generated/blog-choosingfirststrength-1200.webp` | image/webp | 1200×670 | 31454 | Unreferenced (retained) |
| `/images/generated/blog-choosingfirststrength-320.webp` | image/webp | 320×178 | 5020 | Unreferenced (retained) |
| `/images/generated/blog-choosingfirststrength-480.webp` | image/webp | 480×268 | 8632 | Unreferenced (retained) |
| `/images/generated/blog-choosingfirststrength-640.webp` | image/webp | 640×358 | 12398 | Unreferenced (retained) |
| `/images/generated/blog-choosingfirststrength-800.webp` | image/webp | 800×446 | 16910 | Unreferenced (retained) |
| `/images/generated/blog-choosingfirststrength-900.webp` | image/webp | 900×502 | 20342 | Unreferenced (retained) |
| `/images/generated/blog-flavorsforbeginners-1200.webp` | image/webp | 1200×670 | 24398 | Unreferenced (retained) |
| `/images/generated/blog-flavorsforbeginners-320.webp` | image/webp | 320×178 | 4010 | Unreferenced (retained) |
| `/images/generated/blog-flavorsforbeginners-480.webp` | image/webp | 480×268 | 6794 | Unreferenced (retained) |
| `/images/generated/blog-flavorsforbeginners-640.webp` | image/webp | 640×358 | 9966 | Unreferenced (retained) |
| `/images/generated/blog-flavorsforbeginners-800.webp` | image/webp | 800×446 | 13430 | Unreferenced (retained) |
| `/images/generated/blog-flavorsforbeginners-900.webp` | image/webp | 900×502 | 15808 | Unreferenced (retained) |
| `/images/generated/blog-former_smokers-1200.webp` | image/webp | 1200×670 | 30382 | Unreferenced (retained) |
| `/images/generated/blog-former_smokers-320.webp` | image/webp | 320×178 | 4080 | Unreferenced (retained) |
| `/images/generated/blog-former_smokers-480.webp` | image/webp | 480×268 | 7132 | Unreferenced (retained) |
| `/images/generated/blog-former_smokers-640.webp` | image/webp | 640×358 | 10432 | Unreferenced (retained) |
| `/images/generated/blog-former_smokers-800.webp` | image/webp | 800×446 | 14294 | Unreferenced (retained) |
| `/images/generated/blog-former_smokers-900.webp` | image/webp | 900×502 | 17846 | Unreferenced (retained) |
| `/images/generated/blog-gumvspatches-1200.webp` | image/webp | 1200×670 | 28498 | Unreferenced (retained) |
| `/images/generated/blog-gumvspatches-320.webp` | image/webp | 320×178 | 3986 | Unreferenced (retained) |
| `/images/generated/blog-gumvspatches-480.webp` | image/webp | 480×268 | 6760 | Unreferenced (retained) |
| `/images/generated/blog-gumvspatches-640.webp` | image/webp | 640×358 | 9964 | Unreferenced (retained) |
| `/images/generated/blog-gumvspatches-800.webp` | image/webp | 800×446 | 13776 | Unreferenced (retained) |
| `/images/generated/blog-gumvspatches-900.webp` | image/webp | 900×502 | 16978 | Unreferenced (retained) |
| `/images/generated/blog-howlong-1200.webp` | image/webp | 1200×670 | 25112 | Unreferenced (retained) |
| `/images/generated/blog-howlong-320.webp` | image/webp | 320×178 | 3792 | Unreferenced (retained) |
| `/images/generated/blog-howlong-480.webp` | image/webp | 480×268 | 6620 | Unreferenced (retained) |
| `/images/generated/blog-howlong-640.webp` | image/webp | 640×358 | 9572 | Unreferenced (retained) |
| `/images/generated/blog-howlong-800.webp` | image/webp | 800×446 | 13124 | Unreferenced (retained) |
| `/images/generated/blog-howlong-900.webp` | image/webp | 900×502 | 15842 | Unreferenced (retained) |
| `/images/generated/blog-howmany-1200.webp` | image/webp | 1200×670 | 30362 | Unreferenced (retained) |
| `/images/generated/blog-howmany-320.webp` | image/webp | 320×178 | 4440 | Unreferenced (retained) |
| `/images/generated/blog-howmany-480.webp` | image/webp | 480×268 | 7768 | Unreferenced (retained) |
| `/images/generated/blog-howmany-640.webp` | image/webp | 640×358 | 11574 | Unreferenced (retained) |
| `/images/generated/blog-howmany-800.webp` | image/webp | 800×446 | 15712 | Unreferenced (retained) |
| `/images/generated/blog-howmany-900.webp` | image/webp | 900×502 | 19072 | Unreferenced (retained) |
| `/images/generated/blog-howtostore-1200.webp` | image/webp | 1200×670 | 24548 | Unreferenced (retained) |
| `/images/generated/blog-howtostore-320.webp` | image/webp | 320×178 | 4094 | Unreferenced (retained) |
| `/images/generated/blog-howtostore-480.webp` | image/webp | 480×268 | 6904 | Unreferenced (retained) |
| `/images/generated/blog-howtostore-640.webp` | image/webp | 640×358 | 10118 | Unreferenced (retained) |
| `/images/generated/blog-howtostore-800.webp` | image/webp | 800×446 | 13478 | Unreferenced (retained) |
| `/images/generated/blog-howtostore-900.webp` | image/webp | 900×502 | 16020 | Unreferenced (retained) |
| `/images/generated/blog-pouchesvsvaping-1200.webp` | image/webp | 1200×670 | 22810 | Unreferenced (retained) |
| `/images/generated/blog-pouchesvsvaping-320.webp` | image/webp | 320×178 | 3390 | Unreferenced (retained) |
| `/images/generated/blog-pouchesvsvaping-480.webp` | image/webp | 480×268 | 5678 | Unreferenced (retained) |
| `/images/generated/blog-pouchesvsvaping-640.webp` | image/webp | 640×358 | 8332 | Unreferenced (retained) |
| `/images/generated/blog-pouchesvsvaping-800.webp` | image/webp | 800×446 | 11372 | Unreferenced (retained) |
| `/images/generated/blog-pouchesvsvaping-900.webp` | image/webp | 900×502 | 13876 | Unreferenced (retained) |
| `/images/generated/blog-sideeffects-1200.webp` | image/webp | 1200×670 | 17300 | Unreferenced (retained) |
| `/images/generated/blog-sideeffects-320.webp` | image/webp | 320×178 | 2812 | Unreferenced (retained) |
| `/images/generated/blog-sideeffects-480.webp` | image/webp | 480×268 | 5032 | Unreferenced (retained) |
| `/images/generated/blog-sideeffects-640.webp` | image/webp | 640×358 | 7660 | Unreferenced (retained) |
| `/images/generated/blog-sideeffects-800.webp` | image/webp | 800×446 | 10148 | Unreferenced (retained) |
| `/images/generated/blog-sideeffects-900.webp` | image/webp | 900×502 | 11934 | Unreferenced (retained) |
| `/images/generated/blog-stainteeth-1200.webp` | image/webp | 1200×670 | 11068 | Unreferenced (retained) |
| `/images/generated/blog-stainteeth-320.webp` | image/webp | 320×178 | 2038 | Unreferenced (retained) |
| `/images/generated/blog-stainteeth-480.webp` | image/webp | 480×268 | 3208 | Unreferenced (retained) |
| `/images/generated/blog-stainteeth-640.webp` | image/webp | 640×358 | 4606 | Unreferenced (retained) |
| `/images/generated/blog-stainteeth-800.webp` | image/webp | 800×446 | 6162 | Unreferenced (retained) |
| `/images/generated/blog-stainteeth-900.webp` | image/webp | 900×502 | 7322 | Unreferenced (retained) |
| `/images/generated/blog-strengthexplained-1200.webp` | image/webp | 1200×670 | 25640 | Unreferenced (retained) |
| `/images/generated/blog-strengthexplained-320.webp` | image/webp | 320×178 | 4136 | Unreferenced (retained) |
| `/images/generated/blog-strengthexplained-480.webp` | image/webp | 480×268 | 7124 | Unreferenced (retained) |
| `/images/generated/blog-strengthexplained-640.webp` | image/webp | 640×358 | 10468 | Unreferenced (retained) |
| `/images/generated/blog-strengthexplained-800.webp` | image/webp | 800×446 | 13964 | Unreferenced (retained) |
| `/images/generated/blog-strengthexplained-900.webp` | image/webp | 900×502 | 16590 | Unreferenced (retained) |
| `/images/generated/blog-switchfromcigarettes-1200.webp` | image/webp | 1200×670 | 29978 | Unreferenced (retained) |
| `/images/generated/blog-switchfromcigarettes-320.webp` | image/webp | 320×178 | 4700 | Unreferenced (retained) |
| `/images/generated/blog-switchfromcigarettes-480.webp` | image/webp | 480×268 | 7836 | Unreferenced (retained) |
| `/images/generated/blog-switchfromcigarettes-640.webp` | image/webp | 640×358 | 11102 | Unreferenced (retained) |
| `/images/generated/blog-switchfromcigarettes-800.webp` | image/webp | 800×446 | 15284 | Unreferenced (retained) |
| `/images/generated/blog-switchfromcigarettes-900.webp` | image/webp | 900×502 | 18490 | Unreferenced (retained) |
| `/images/generated/products-cuba_hardcore-1200.webp` | image/webp | 900×900 | 21188 | Unreferenced (retained) |
| `/images/generated/products-cuba_hardcore-320.webp` | image/webp | 320×320 | 9092 | Unreferenced (retained) |
| `/images/generated/products-cuba_hardcore-480.webp` | image/webp | 480×480 | 14272 | Unreferenced (retained) |
| `/images/generated/products-cuba_hardcore-640.webp` | image/webp | 640×640 | 19570 | Unreferenced (retained) |
| `/images/generated/products-cuba_hardcore-800.webp` | image/webp | 800×800 | 24536 | Unreferenced (retained) |
| `/images/generated/products-cuba_hardcore-900.webp` | image/webp | 900×900 | 21188 | Unreferenced (retained) |
| `/images/generated/products-iceberg_strong-1200.webp` | image/webp | 900×900 | 50370 | Unreferenced (retained) |
| `/images/generated/products-iceberg_strong-320.webp` | image/webp | 320×320 | 16106 | Unreferenced (retained) |
| `/images/generated/products-iceberg_strong-480.webp` | image/webp | 480×480 | 26246 | Unreferenced (retained) |
| `/images/generated/products-iceberg_strong-640.webp` | image/webp | 640×640 | 36162 | Unreferenced (retained) |
| `/images/generated/products-iceberg_strong-800.webp` | image/webp | 800×800 | 47536 | Unreferenced (retained) |
| `/images/generated/products-iceberg_strong-900.webp` | image/webp | 900×900 | 50370 | Unreferenced (retained) |
| `/images/generated/products-pablo_medium-1200.webp` | image/webp | 500×500 | 46244 | Unreferenced (retained) |
| `/images/generated/products-pablo_medium-320.webp` | image/webp | 320×320 | 21690 | Unreferenced (retained) |
| `/images/generated/products-pablo_medium-480.webp` | image/webp | 480×480 | 44380 | Unreferenced (retained) |
| `/images/generated/products-pablo_medium-640.webp` | image/webp | 500×500 | 46244 | Unreferenced (retained) |
| `/images/generated/products-pablo_medium-800.webp` | image/webp | 500×500 | 46244 | Unreferenced (retained) |
| `/images/generated/products-pablo_medium-900.webp` | image/webp | 500×500 | 46244 | Unreferenced (retained) |
| `/images/generated/products-pablo_strong-1200.webp` | image/webp | 900×900 | 31798 | Unreferenced (retained) |
| `/images/generated/products-pablo_strong-320.webp` | image/webp | 320×320 | 13112 | Unreferenced (retained) |
| `/images/generated/products-pablo_strong-480.webp` | image/webp | 480×480 | 20858 | Unreferenced (retained) |
| `/images/generated/products-pablo_strong-640.webp` | image/webp | 640×640 | 28372 | Unreferenced (retained) |
| `/images/generated/products-pablo_strong-800.webp` | image/webp | 800×800 | 35666 | Unreferenced (retained) |
| `/images/generated/products-pablo_strong-900.webp` | image/webp | 900×900 | 31798 | Unreferenced (retained) |
| `/images/generated/products-velo_easy-1200.webp` | image/webp | 900×900 | 25290 | Unreferenced (retained) |
| `/images/generated/products-velo_easy-320.webp` | image/webp | 320×320 | 10242 | Unreferenced (retained) |
| `/images/generated/products-velo_easy-480.webp` | image/webp | 480×480 | 15914 | Unreferenced (retained) |
| `/images/generated/products-velo_easy-640.webp` | image/webp | 640×640 | 21778 | Unreferenced (retained) |
| `/images/generated/products-velo_easy-800.webp` | image/webp | 800×800 | 27638 | Unreferenced (retained) |
| `/images/generated/products-velo_easy-900.webp` | image/webp | 900×900 | 25290 | Unreferenced (retained) |
| `/images/generated/products-zyn_easy-1200.webp` | image/webp | 900×900 | 28398 | Unreferenced (retained) |
| `/images/generated/products-zyn_easy-320.webp` | image/webp | 320×320 | 10950 | Unreferenced (retained) |
| `/images/generated/products-zyn_easy-480.webp` | image/webp | 480×480 | 16690 | Unreferenced (retained) |
| `/images/generated/products-zyn_easy-640.webp` | image/webp | 640×640 | 23260 | Unreferenced (retained) |
| `/images/generated/products-zyn_easy-800.webp` | image/webp | 800×800 | 30080 | Unreferenced (retained) |
| `/images/generated/products-zyn_easy-900.webp` | image/webp | 900×900 | 28398 | Unreferenced (retained) |
| `/images/og-default.jpg` | image/jpeg | 1200×630 | 91207 | Referenced: `src/components/home/BlogPreview.astro`, `src/config/site.ts`, `src/pages/en/blog/[slug].astro`, `src/pages/en/blog/index.astro`, `src/pages/ro/blog/[slug].astro`, `src/pages/ro/blog/index.astro`, `src/pages/ru/blog/[slug].astro`, `src/pages/ru/blog/index.astro` |
| `/images/products/.gitkeep` | sentinel | — | 353 | Repository sentinel |
| `/images/products/baron_77.jpg` | image/jpeg | 1280×1280 | 40591 | Unreferenced (retained) |
| `/images/products/baron_classic_70.jpg` | image/jpeg | 1000×1000 | 120532 | Unreferenced (retained) |
| `/images/products/baron_eucalyptus_70.jpg` | image/jpeg | 1000×1000 | 121716 | Unreferenced (retained) |
| `/images/products/baron_fruitcocktail_70.jpg` | image/jpeg | 1000×1000 | 121273 | Unreferenced (retained) |
| `/images/products/baron_menthol_70.jpg` | image/jpeg | 1000×1000 | 115080 | Unreferenced (retained) |
| `/images/products/baron_wintergreen_70.jpg` | image/jpeg | 1000×1000 | 121529 | Unreferenced (retained) |
| `/images/products/cuba_applejuice_150.jpg` | image/jpeg | 1000×1000 | 75570 | Unreferenced (retained) |
| `/images/products/cuba_cherry_150.jpg` | image/jpeg | 1000×1000 | 73484 | Unreferenced (retained) |
| `/images/products/cuba_grape_150.jpg` | image/jpeg | 1000×1000 | 73101 | Unreferenced (retained) |
| `/images/products/cuba_hardcore.png` | image/png | 900×900 | 120193 | Referenced: `src/content/products/cuba-hardcore.json` |
| `/images/products/cubablack_66.jpg` | image/jpeg | 1280×1280 | 58503 | Unreferenced (retained) |
| `/images/products/cubaninja_150.jpg` | image/jpeg | 1280×1280 | 51583 | Unreferenced (retained) |
| `/images/products/cubawhite_16.jpg` | image/jpeg | 1280×1280 | 53135 | Unreferenced (retained) |
| `/images/products/iceberg_strong.png` | image/png | 900×900 | 203754 | Referenced: `src/content/products/iceberg-strong.json` |
| `/images/products/pablo_bluemint_50.jpg` | image/jpeg | 560×445 | 19198 | Unreferenced (retained) |
| `/images/products/pablo_icecold_15.jpg` | image/jpeg | 500×500 | 22416 | Unreferenced (retained) |
| `/images/products/pablo_icecold_30.jpg` | image/jpeg | 500×500 | 53068 | Unreferenced (retained) |
| `/images/products/pablo_medium.png` | image/png | 500×500 | 368004 | Referenced: `src/content/products/pablo-medium.json` |
| `/images/products/pablo_strong.png` | image/png | 900×900 | 114525 | Referenced: `src/content/products/pablo-strong.json` |
| `/images/products/pabloexclusive_50.jpg` | image/jpeg | 1280×1280 | 60097 | Unreferenced (retained) |
| `/images/products/pabloxxl_30.jpg` | image/jpeg | 1280×1280 | 51880 | Unreferenced (retained) |
| `/images/products/placeholder.svg` | image/svg+xml | 200×200 | 487 | Referenced: `src/components/product/ProductCard.astro`, `src/components/product/ProductDetail.astro`, `src/components/product/ProductLineCard.astro` |
| `/images/products/velo_6_17.jpg` | image/jpeg | 1280×1280 | 30615 | Unreferenced (retained) |
| `/images/products/velo_breezymango_10.9.jpg` | image/jpeg | 992×1090 | 75855 | Unreferenced (retained) |
| `/images/products/velo_cherryice_10.jpg` | image/jpeg | 992×1090 | 93160 | Unreferenced (retained) |
| `/images/products/velo_crispypeppermint_10.jpg` | image/jpeg | 992×1090 | 83261 | Unreferenced (retained) |
| `/images/products/velo_easy.png` | image/png | 900×900 | 142470 | Referenced: `src/content/products/velo-easy.json` |
| `/images/products/velo_eucalyptusstorm_17.jpg` | image/jpeg | 992×1090 | 103034 | Unreferenced (retained) |
| `/images/products/velo_groovygrape_10.9.jpg` | image/jpeg | 992×1090 | 75237 | Unreferenced (retained) |
| `/images/products/velo_mangoflame_14.jpg` | image/jpeg | 992×1090 | 91072 | Unreferenced (retained) |
| `/images/products/velo_mclaren_7.jpg` | image/jpeg | 1165×1280 | 119209 | Unreferenced (retained) |
| `/images/products/velo_mightypeppermint_10.9.jpg` | image/jpeg | 992×1090 | 85027 | Unreferenced (retained) |
| `/images/products/velo_mightypeppermint_17.jpg` | image/jpeg | 992×1090 | 79610 | Unreferenced (retained) |
| `/images/products/velo_orangespark_17.jpg` | image/jpeg | 1165×1280 | 120278 | Unreferenced (retained) |
| `/images/products/velo_spiffyspearmint_10.jpg` | image/jpeg | 992×1090 | 83189 | Unreferenced (retained) |
| `/images/products/velo_spiffyspearmint_17.jpg` | image/jpeg | 992×1090 | 66046 | Unreferenced (retained) |
| `/images/products/velo_strawberryice_10.jpg` | image/jpeg | 992×1090 | 99325 | Unreferenced (retained) |
| `/images/products/velo_tropicalmango_14.jpg` | image/jpeg | 1165×1280 | 100980 | Unreferenced (retained) |
| `/images/products/velo_wintrywatermelon_10.jpg` | image/jpeg | 1165×1280 | 114848 | Unreferenced (retained) |
| `/images/products/zyn_6_16.5.jpg` | image/jpeg | 1280×1280 | 24365 | Unreferenced (retained) |
| `/images/products/zyn_blackcherry_11.jpg` | image/jpeg | 1240×1000 | 60701 | Unreferenced (retained) |
| `/images/products/zyn_blackcurrantfrost_11.jpg` | image/jpeg | 1240×1000 | 62851 | Unreferenced (retained) |
| `/images/products/zyn_coolmint_11.jpg` | image/jpeg | 1240×1000 | 63150 | Unreferenced (retained) |
| `/images/products/zyn_coolmintice_16.5.jpg` | image/jpeg | 1240×1000 | 65524 | Unreferenced (retained) |
| `/images/products/zyn_easy.png` | image/png | 900×900 | 135699 | Referenced: `src/content/products/zyn-easy.json` |
| `/images/products/zyn_mentholice_11.jpg` | image/jpeg | 1240×1000 | 62303 | Unreferenced (retained) |
| `/images/products/zyn_mentholice_13.5.jpg` | image/jpeg | 1240×1000 | 63163 | Unreferenced (retained) |
| `/images/products/zyn_spearmint_11.jpg` | image/jpeg | 1240×1000 | 59677 | Unreferenced (retained) |

