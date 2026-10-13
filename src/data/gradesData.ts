import { GradeData } from '../types/physics';

export const GRADES_DATA: GradeData[] = [
  // 1-SINF
  {
    grade: 1,
    title: '1-sinf: Atrofimizdagi jismlar va harakat',
    tagline: 'Tabiatdagi dastlabki harakatlar va fizik olam',
    description: 'Kichik yoshdagi o‘quvchilar uchun jismlarning harakati, tinch holati, tovushlar va ranglar bilan ilk tanishuv.',
    ageGroup: '6-7 yosh',
    accentColor: 'from-amber-500 to-orange-500',
    stages: [
      {
        stageNumber: 1,
        stageType: 'basics',
        stageName: '1-etap: Boshlang‘ich bilimlar',
        title: 'Jismlar va ularning holati',
        description: 'Bizni o‘rab turgan narsalar qanday harakat qiladi?',
        theory: 'Atrofimizdagi hamma narsa jism deyiladi. Jismlar tinch turishi (masalan, parta, kitob) yoki harakatlanishi (yurayotgan avtomobil, uchayotgan qush) mumkin. Jism o‘z o‘rnini o‘zgartirsa, u harakat qilmoqda deyiladi.',
        keyPoints: [
          'Jism — bu atrofimizdagi har qanday narsa (qalam, tosh, daraxt).',
          'Tinch holat — o‘z joyida qimirlamay turish.',
          'Harakat — vaqt o‘tishi bilan joyini o‘zgartirish.'
        ],
        examples: [
          { problem: 'Avtobus bekatda to‘xtab turibdi. U harakatdami yoki tinchmi?', solution: 'Tinch holatda, chunki u joyidan siljimayapti.' },
          { problem: 'Daraxtdan olma yerga tushmoqda. Bu nima?', solution: 'Bu harakat, chunki olma osmondan pastga qarab tushmoqda.' }
        ],
        questions: [
          {
            id: 'g1_s1_q1',
            question: 'Agar to‘p yerda qimirlamay yotsa, uning holati qanday deyiladi?',
            options: ['Tez yugurmoqda', 'Tinch holatda', 'Osmonga uchmoqda', 'Suzmoqda'],
            correctIndex: 1,
            explanation: 'Joyidan qimirlamay turgan jism tinch holatda hisoblanadi.',
            points: 20
          },
          {
            id: 'g1_s1_q2',
            question: 'Quyidagilardan qaysi biri harakatlanayotgan jism hisoblanadi?',
            options: ['O‘rindiqda turgan sumka', 'Oqayotgan daryo suvi', 'Xonadagi devor', 'Uxlalayotgan mushuk'],
            correctIndex: 1,
            explanation: 'Daryo suvi doim oqib joyini o‘zgartirib turadi, demak u harakatda.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 2,
        stageType: 'concepts',
        stageName: '2-etap: Asosiy tushunchalar',
        title: 'Tezlik va yo‘nalish',
        description: 'Tez va sekin harakat, to‘g‘ri va egri yo‘llar',
        theory: 'Harakat turlicha bo‘lishi mumkin: toshbaqa sekin yuradi, gepard yoki poyezd esa juda tez yuguradi. Qushlar osmonga ko‘tariladi, yomg‘ir tomchilari esa yerga tushadi.',
        keyPoints: [
          'Tezlik jismning qanchalik ildam borishini ko‘rsatadi.',
          'Toshbaqa sekin, avtomashina tez harakatlanadi.',
          'Harakat to‘g‘ri yoki burilib ketadigan yo‘nalishda bo‘ladi.'
        ],
        examples: [
          { problem: 'Samolyot bilan velosiped poygalashsa, kim oldinroq yetib boradi?', solution: 'Samolyot, chunki uning tezligi ancha katta.' }
        ],
        questions: [
          {
            id: 'g1_s2_q1',
            question: 'Qaysi biri tezroq harakatlanadi?',
            options: ['Chig‘anoq (shillikqurt)', 'Toshbaqa', 'Poyezd', 'Piyoda bola'],
            correctIndex: 2,
            explanation: 'Poyezd barchasidan ancha tez harakatlanadi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 3,
        stageType: 'formulas',
        stageName: '3-etap: Formulalar va masalalar',
        title: 'Oddiy hisob-kitoblar',
        description: 'Qadamlar va masofani solishtirish',
        theory: 'Agar bir bola 5 qadam, do‘sti esa 10 qadam bossa, kim ko‘proq masofa bosib o‘tgan bo‘ladi? Fizikada masofa qadamlar, metrlar orqali o‘lchanadi.',
        keyPoints: [
          'Masofa — bosib o‘tilgan yo‘l uzunligi.',
          'Katta qadamlar bilan uzoqroqqa boriladi.'
        ],
        formulaName: 'Masofa taqqoslash',
        formulaLatex: 'S = n \\times l_{qadam}',
        examples: [
          { problem: 'Ali 3 metr, Vali 5 metr yugurdi. Jami qancha bo‘ldi?', solution: '3 + 5 = 8 metr.' }
        ],
        questions: [
          {
            id: 'g1_s3_q1',
            question: 'Ali partadan eshikkacha 4 qadam, keyin derazagacha 3 qadam bosdi. Jami necha qadam yurdi?',
            options: ['6 qadam', '7 qadam', '8 qadam', '5 qadam'],
            correctIndex: 1,
            explanation: '4 + 3 = 7 qadam bo‘ladi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 4,
        stageType: 'experiment',
        stageName: '4-etap: Amaliy tajribalar',
        title: 'Erkin dumalash tajribasi',
        description: 'Qiyalikdan to‘pchaning dumalashini kuzatish',
        theory: 'Qiyalik baland bo‘lsa, to‘pcha tezroq dumalaydi. Bu gravitatsiya va qiyalik burchagiga bog‘liq.',
        keyPoints: [
          'Tekis joyda to‘p o‘z-o‘zidan dumalamaydi.',
          'Qiyalik bo‘lsa, to‘p pastga tomon tezlashib ketadi.'
        ],
        experimentType: 'gravity',
        experimentPrompt: 'To‘pni qiyalikdan tushirib ko‘ring va tezlanishni solishtiring!',
        examples: [
          { problem: 'Tog‘dan pastga chang‘i uchganda nega tezlashib ketamiz?', solution: 'Chunki Yer kuchi bizni pastga qaratib tortadi.' }
        ],
        questions: [
          {
            id: 'g1_s4_q1',
            question: 'To‘p qaysi yuzada tezroq dumalaydi?',
            options: ['Tekis stol ustida', 'Qiyalik taxtada pastga qarab', 'Qalin qum ustida', 'Baland zinaga qarab yuqoriga'],
            correctIndex: 1,
            explanation: 'Qiyalikda yerning tortishi evaziga to‘p pastga tezroq dumalaydi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 5,
        stageType: 'exam',
        stageName: '5-etap: Yakuniy imtihon',
        title: '1-sinf yakuniy sinovi',
        description: 'Barcha mavzular bo‘yicha bilimingizni sinang',
        theory: '1-sinf bo‘yicha o‘rganganlaringizni tekshirib, sertifikat olish vaqti keldi!',
        keyPoints: [
          'Harakat va tinchlik farqi',
          'Tez va sekin jismlar',
          'Yerga tortilish hodisasi'
        ],
        examples: [],
        questions: [
          {
            id: 'g1_s5_q1',
            question: 'Yerga tushayotgan narsa nima uchun yuqoriga uchib ketmaydi?',
            options: ['Yer uni o‘ziga tortadi', 'Havo uni itaradi', 'Quyosh chaqirmoqda', 'Shamol uchiradi'],
            correctIndex: 0,
            explanation: 'Yer barcha jismlarni o‘ziga tortadi (Tortishish kuchi).',
            points: 25
          },
          {
            id: 'g1_s5_q2',
            question: 'Qaysi harakat eng sekin?',
            options: ['Avtomobil', 'Samolyot', 'Shillikqurt', 'Velosiped'],
            correctIndex: 2,
            explanation: 'Shillikqurt eng sekin harakatlanuvchi jonivorlardan biridir.',
            points: 25
          }
        ]
      }
    ]
  },

  // 2-SINF
  {
    grade: 2,
    title: '2-sinf: Yorug‘lik, soyalar va issiqlik',
    tagline: 'Quyosh nurlari, ko‘zgular va harorat sirlari',
    description: 'Yorug‘lik manbalari, soyalarning paydo bo‘lishi, issiq va sovuq jismlar o‘rtasidagi farqlar.',
    ageGroup: '7-8 yosh',
    accentColor: 'from-yellow-500 to-amber-600',
    stages: [
      {
        stageNumber: 1,
        stageType: 'basics',
        stageName: '1-etap: Boshlang‘ich bilimlar',
        title: 'Yorug‘lik manbalari',
        description: 'Biz dunyoni qanday ko‘ramiz?',
        theory: 'Yorug‘lik manbalari ikki xil bo‘ladi: tabiiy (Quyosh, yulduzlar, chaqmoq) va sun’iy (chiroq, sham, chiroqcha). Oyna orqali yorug‘lik aks etadi.',
        keyPoints: [
          'Tabiiy yorug‘lik manbai — Quyosh.',
          'Sun’iy yorug‘lik manbai — elektr lampochkasi.',
          'Yorug‘lik to‘g‘ri chiziq bo‘ylab tarqaladi.'
        ],
        examples: [
          { problem: 'Oy yorug‘lik manbaimi?', solution: 'Oy o‘zidan nur chiqarmaydi, u Quyosh nurini qaytaradi.' }
        ],
        questions: [
          {
            id: 'g2_s1_q1',
            question: 'Asosiy tabiiy yorug‘lik manbai nima?',
            options: ['Lampa', 'Quyosh', 'Ko‘cha chirog‘i', 'Telefon ekrani'],
            correctIndex: 1,
            explanation: 'Quyosh — Yer yuzidagi eng yirik tabiiy yorug‘lik va issiqlik manbaidir.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 2,
        stageType: 'concepts',
        stageName: '2-etap: Asosiy tushunchalar',
        title: 'Soya qanday hosil bo‘ladi?',
        description: 'Yorug‘lik yo‘lidagi to‘siqlar',
        theory: 'Yorug‘lik to‘g‘ri chiziq bo‘ylab tarqaladi. Agar uning yo‘liga shaffof bo‘lmagan jism (masalan, qo‘lingiz yoki kitob) tushsa, uning orqasida qorong‘i joy — soya hosil bo‘ladi.',
        keyPoints: [
          'Shaffof jism (shisha) yorug‘likni o‘tkazadi.',
          'Shaffof bo‘lmagan jism (daraxt, odam) yorug‘likni to‘sadi va soya hosil qiladi.'
        ],
        examples: [
          { problem: 'Nega shaffof oynaning soyasi tushmaydi?', solution: 'Chunki yorug‘lik nurlari shisha orqali oson o‘tib ketadi.' }
        ],
        questions: [
          {
            id: 'g2_s2_q1',
            question: 'Soya hosil bo‘lishi uchun nima kerak?',
            options: ['Faqat qorong‘ilik', 'Yorug‘lik manbai va to‘siq jism', 'Muz va suv', 'Faqat shamol'],
            correctIndex: 1,
            explanation: 'Yorug‘lik manbai va uni to‘suvchi jism bo‘lsa, soya hosil bo‘ladi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 3,
        stageType: 'formulas',
        stageName: '3-etap: Formulalar va masalalar',
        title: 'Harorat va termometr',
        description: 'Selsiy shkalasi bo‘yicha haroratni o‘lchash',
        theory: 'Jismlarning issiq yoki sovuqligi harorat bilan o‘lchanadi. O‘lchov asbobi — termometr. Harorat darajasi Selsiy (°C) birligida ifodalanadi.',
        keyPoints: [
          'Suv 0°C da muzlaydi.',
          'Suv 100°C da qaynaydi.',
          'Harorat oshganda simob yoki spirt ustuni yuqoriga ko‘tariladi.'
        ],
        formulaName: 'Harorat o‘zgarishi',
        formulaLatex: '\\Delta t = t_2 - t_1',
        examples: [
          { problem: 'Ertalab harorat 15°C edi, tushda 25°C bo‘ldi. Necha daraja ko‘tarildi?', solution: '25 - 15 = 10°C ko‘tarildi.' }
        ],
        questions: [
          {
            id: 'g2_s3_q1',
            question: 'Suv necha gradusda muzga aylanadi?',
            options: ['100°C', '50°C', '0°C', '20°C'],
            correctIndex: 2,
            explanation: 'Suv 0 gradus Selsiyda muzlaydi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 4,
        stageType: 'experiment',
        stageName: '4-etap: Amaliy tajribalar',
        title: 'Ko‘zguda aks etish tajribasi',
        description: 'Ko‘zgu orqali yorug‘lik nurini qaytarish',
        theory: 'Tekis ko‘zguga tushgan yorug‘lik xuddi shunday burchak ostida qaytadi. Buni quyosh quyonchasi deb ham atashadi.',
        keyPoints: [
          'Ko‘zgu nurni sindirmay, silliq qaytaradi.',
          'Tushish burchagi qaytish burchagiga teng.'
        ],
        experimentType: 'optics',
        experimentPrompt: 'Nur manbasini yo‘naltirib ko‘zgu orqali qaytishini ko‘ring!',
        examples: [
          { problem: 'Ko‘zguga qarasangiz nimani ko‘rasiz?', solution: 'O‘z aksingizni, chunki yorug‘lik sizdan ko‘zguga tushib qaytadi.' }
        ],
        questions: [
          {
            id: 'g2_s4_q1',
            question: 'Yorug‘lik nuri oynaga tushganda nima sodir bo‘ladi?',
            options: ['Oyna ichiga singib yo‘qoladi', 'Oynadan qaytadi', 'Muzga aylanadi', 'Yonib ketadi'],
            correctIndex: 1,
            explanation: 'Oyna silliq yuzaga ega bo‘lgani uchun yorug‘likni qaytaradi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 5,
        stageType: 'exam',
        stageName: '5-etap: Yakuniy imtihon',
        title: '2-sinf yakuniy imtihoni',
        description: 'Yorug‘lik va issiqlik bo‘yicha sinov',
        theory: 'Barcha mavzulardan savollarga javob bering va bahoyingizni oling.',
        keyPoints: ['Yorug‘lik manbalari', 'Soya xossalari', 'Termometr ko‘rsatkichlari'],
        examples: [],
        questions: [
          {
            id: 'g2_s5_q1',
            question: 'Suv necha gradusda qaynaydi?',
            options: ['0°C', '50°C', '100°C', '200°C'],
            correctIndex: 2,
            explanation: 'Oddiy sharoitda suv 100°C da qaynaydi.',
            points: 25
          },
          {
            id: 'g2_s5_q2',
            question: 'Daraxt orqasida nima sababdan soya paydo bo‘ladi?',
            options: ['Daraxt yorug‘lik nurini to‘sgani uchun', 'Chunki daraxt sovuq', 'Shamol to‘xtagani uchun', 'Chunki daraxt yashil'],
            correctIndex: 0,
            explanation: 'Daraxt shaffof emas, shuning uchun yorug‘likni to‘sadi va soya paydo bo‘ladi.',
            points: 25
          }
        ]
      }
    ]
  },

  // 3-SINF
  {
    grade: 3,
    title: '3-sinf: Kuchlar va magnitlar olami',
    tagline: 'Tortish, itarish, ishqalanish va magnit maydoni',
    description: 'Jismlarga kuch ta’siri, magnit qutblari (shimoliy va janubiy) va o‘zaro tortishish sirlari.',
    ageGroup: '8-9 yosh',
    accentColor: 'from-emerald-500 to-teal-600',
    stages: [
      {
        stageNumber: 1,
        stageType: 'basics',
        stageName: '1-etap: Boshlang‘ich bilimlar',
        title: 'Kuch nima?',
        description: 'Jismlarni harakatga keltiruvchi ta’sir',
        theory: 'Kuch — bir jismning ikkinchisiga ko‘rsatgan ta’siri. Biz eshikni ochish uchun uni tortamiz yoki itaramiz. Qanchalik ko‘p kuch sarflasak, jism shunchalik tez harakatlanadi.',
        keyPoints: [
          'Kuch itarish yoki tortish orqali namoyon bo‘ladi.',
          'Kuch jismning shaklini ham o‘zgartirishi mumkin (masalan, plastilinni ezish).',
          'Kuch Nyuton (N) birligida o‘lchanadi.'
        ],
        examples: [
          { problem: 'Koptokni tepganimizda nima bo‘ladi?', solution: 'Oyog‘imiz koptokka kuch beradi va u uchib ketadi.' }
        ],
        questions: [
          {
            id: 'g3_s1_q1',
            question: 'Harakatlanmayotgan aravachani yurdirish uchun nima qilish kerak?',
            options: ['Unga kuch bilan ta’sir qilish kerak (itarish yoki tortish)', 'Faqat unga qarab turish', 'Uning rasmini chizish', 'Hech narsa qilmaslik'],
            correctIndex: 0,
            explanation: 'Jism harakatga kelishi uchun unga kuch ta’sir qilishi lozim.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 2,
        stageType: 'concepts',
        stageName: '2-etap: Asosiy tushunchalar',
        title: 'Magnit va uning qutblari',
        description: 'N (Shimol) va S (Janub) qutblari',
        theory: 'Magnit temir, po‘lat buyumlarni o‘ziga tortadi. Magnitning 2 ta qutbi bor: Shimoliy (N) va Janubiy (S). Qarama-qarshi qutblar (N va S) bir-birini tortadi, bir xil qutblar (N va N yoki S va S) esa itaradi.',
        keyPoints: [
          'Magnit temirni tortadi, lekin yog‘och yoki plastmassani tortmaydi.',
          'Bir xil qutblar — itarishadi.',
          'Har xil qutblar — tortishadi.'
        ],
        examples: [
          { problem: 'Ikki magnitning bir xil N qutblarini yaqinlashtirsak nima bo‘ladi?', solution: 'Ular bir-birini itaradi va birlashmaydi.' }
        ],
        questions: [
          {
            id: 'g3_s2_q1',
            question: 'Magnit quyidagilardan qaysi birini o‘ziga tortadi?',
            options: ['Yog‘och qalamni', 'Temir mixni', 'Plastmassa chizg‘ichni', 'Qog‘oz parchasini'],
            correctIndex: 1,
            explanation: 'Magnit temir va po‘latdan yasalgan buyumlarni tortadi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 3,
        stageType: 'formulas',
        stageName: '3-etap: Formulalar va masalalar',
        title: 'Ishqalanish kuchi',
        description: 'Silliq va g‘adir-budur yuzalar',
        theory: 'Muz ustida sirpanish oson, lekin qum ustida qiyin. Chunki qumda ishqalanish kuchi katta. Ishqalanish harakatga to‘sqinlik qiladi.',
        keyPoints: [
          'Silliq sirtda ishqalanish kam.',
          'G‘adir-budur sirtda ishqalanish ko‘p.',
          'Avtomobil g‘ildiraklari sirpanib ketmasligi uchun naqshli qilinadi.'
        ],
        formulaName: 'Teng ta’sir etuvchi kuch',
        formulaLatex: 'F = F_1 + F_2',
        examples: [
          { problem: 'Ali 20 N, Vali esa 30 N kuch bilan aravani bir tomonga tortsa, umumiy kuch qancha?', solution: '20 + 30 = 50 N bo‘ladi.' }
        ],
        questions: [
          {
            id: 'g3_s3_q1',
            question: 'Ikki do‘st bitta shkafni bir tomonga qarab 15 N va 25 N kuch bilan itarsa, umumiy kuch necha Nyuton?',
            options: ['10 N', '40 N', '35 N', '50 N'],
            correctIndex: 1,
            explanation: '15 N + 25 N = 40 N bo‘ladi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 4,
        stageType: 'experiment',
        stageName: '4-etap: Amaliy tajribalar',
        title: 'Magnit qutblari tajribasi',
        description: 'Magnitning tortish va itarish xususiyatini o‘rganish',
        theory: 'Kompas ham kichik magnit strelkasidir. U Yerning magnit qutblari bo‘yicha yo‘naladi.',
        keyPoints: ['N va S qutblarning o‘zaro ta’siri', 'Kompas ishlash printsipi'],
        experimentType: 'density',
        experimentPrompt: 'Magnitlarni bir-biriga yaqinlashtirib qutblarini kuzating!',
        examples: [],
        questions: [
          {
            id: 'g3_s4_q1',
            question: 'Kompas strelkasi doimo qaysi tomonga qarab turadi?',
            options: ['Shimol va Janubga', 'Sharq va G‘arbga', 'Faqat Quyoshga', 'Oyga qarab'],
            correctIndex: 0,
            explanation: 'Kompas Yer magnit maydoni tufayli Shimol va Janub yo‘nalishini ko‘rsatadi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 5,
        stageType: 'exam',
        stageName: '5-etap: Yakuniy imtihon',
        title: '3-sinf yakuniy imtihoni',
        description: 'Kuch va magnitlar bo‘yicha sinov',
        theory: 'Kuchlar va magnit xossalari bo‘yicha yakuniy sinovdan o‘ting.',
        keyPoints: ['Kuch o‘lchov birligi', 'Magnit qutblari', 'Ishqalanish kuchi'],
        examples: [],
        questions: [
          {
            id: 'g3_s5_q1',
            question: 'Magnitning qarama-qarshi (N va S) qutblari bir-birini nima qiladi?',
            options: ['Itaradi', 'Tortadi', 'Hech narsa qilmaydi', 'Eritib yuboradi'],
            correctIndex: 1,
            explanation: 'Qarama-qarshi qutblar bir-birini tortadi.',
            points: 25
          },
          {
            id: 'g3_s5_q2',
            question: 'Fizikada kuch qanday harf bilan belgilanadi?',
            options: ['F', 'm', 'v', 't'],
            correctIndex: 0,
            explanation: 'Kuch inglizcha "Force" so‘zidan olingan bo‘lib, F harfi bilan belgilanadi.',
            points: 25
          }
        ]
      }
    ]
  },

  // 4-SINF
  {
    grade: 4,
    title: '4-sinf: Tovush, suv va havo xususiyatlari',
    tagline: 'To‘lqinlar, tebranishlar va atmosfera bosimi',
    description: 'Tovush qanday tarqaladi, suvda nimalar suzadi va havo nima uchun og‘irlikka ega?',
    ageGroup: '9-10 yosh',
    accentColor: 'from-blue-500 to-cyan-600',
    stages: [
      {
        stageNumber: 1,
        stageType: 'basics',
        stageName: '1-etap: Boshlang‘ich bilimlar',
        title: 'Tovush qanday hosil bo‘ladi?',
        description: 'Tebranishlar va quloqqa yetib keluvchi to‘lqinlar',
        theory: 'Tovush jismlarning tebranishi natijasida hosil bo‘ladi. Masalan, gitara torini chertganda u tebranadi va havo orqali qulog‘imizga to‘lqin sifatida yetib boradi. Bo‘shliqda (havosiz joyda) tovush eshitilmaydi!',
        keyPoints: [
          'Tovush manbai — tebranayotgan jism.',
          'Tovush qattiq jismlarda eng tez tarqaladi.',
          'Havosiz fazoda tovush tarqalmaydi.'
        ],
        examples: [
          { problem: 'Nega chaqmoq chaqqanda avval nur ko‘rinadi, keyin gumburlash eshitiladi?', solution: 'Chunki yorug‘lik tezligi (300,000 km/s) tovush tezligidan (340 m/s) million baravar tez!' }
        ],
        questions: [
          {
            id: 'g4_s1_q1',
            question: 'Tovush tarqalishi uchun nima zarur?',
            options: ['Muhit (havo, suv yoki qattiq jism)', 'To‘liq vakuum (havosizlik)', 'Faqat qorong‘ilik', 'Faqat oynalar'],
            correctIndex: 0,
            explanation: 'Tovush tebranish bo‘lgani uchun modda (havo, suv, yer) orqali tarqaladi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 2,
        stageType: 'concepts',
        stageName: '2-etap: Asosiy tushunchalar',
        title: 'Nega narsalar suvda suzadi?',
        description: 'Og‘irlik va yengillik siri',
        theory: 'Daraxt shoxi yoki koptok suvda suzadi, lekin kichik toshcha cho‘kib ketadi. Chunki jismning zichligi suvdan kichik bo‘lsa u suzadi, katta bo‘lsa cho‘kadi. Shuningdek suv jismni yuqoriga itaruvchi kuchga ega.',
        keyPoints: [
          'Zichligi kam jismlar suv yuzida suzadi.',
          'Og‘ir temir kema ichida havo ko‘p bo‘lgani uchun cho‘kmaydi.'
        ],
        examples: [
          { problem: 'Muz suvda suzadimi yoki cho‘kadimi?', solution: 'Muz suvdan yengilroq bo‘lgani uchun suv yuzida suzadi.' }
        ],
        questions: [
          {
            id: 'g4_s2_q1',
            question: 'Qaysi jism suvga tashlansa cho‘kib ketadi?',
            options: ['Quruq yog‘och bo‘lagi', 'Kichik tosh', 'Puflangan koptok', 'Penoplast'],
            correctIndex: 1,
            explanation: 'Toshning zichligi suvdan ancha katta, shuning uchun u cho‘kadi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 3,
        stageType: 'formulas',
        stageName: '3-etap: Formulalar va masalalar',
        title: 'Tovush tezligi hisobi',
        description: 'Tovushning masofani bosib o‘tishi',
        theory: 'Havoda tovush 1 sekundda taxminan 340 metr yo‘l bosadi.',
        keyPoints: [
          'v_tovush ≈ 340 m/s.',
          'S = v × t masofa formulasi.'
        ],
        formulaName: 'Tovush masofasi',
        formulaLatex: 'S = 340 \\times t',
        examples: [
          { problem: 'Chaqmoq chaqqandan 2 sekund o‘tgach momaqaldiroq ovozi eshitildi. Chaqmoq qancha uzoqlikda?', solution: 'S = 340 × 2 = 680 metr.' }
        ],
        questions: [
          {
            id: 'g4_s3_q1',
            question: 'Chaqmoq chaqnashidan 3 sekund o‘tib gumburlash ovozi eshitildi. Chaqmoq chaqqan joygacha masofa qancha (v = 340 m/s)?',
            options: ['340 metr', '680 metr', '1020 metr', '1500 metr'],
            correctIndex: 2,
            explanation: 'S = 340 * 3 = 1020 metr.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 4,
        stageType: 'experiment',
        stageName: '4-etap: Amaliy tajribalar',
        title: 'Suzuvchanlik tajribasi',
        description: 'Tuxumni toza suvda va sho‘r suvda suzdirish',
        theory: 'Suvga tuz solinsa, uning zichligi ortadi va hatto cho‘kayotgan narsa ham yuqoriga suzib chiqadi.',
        keyPoints: ['Sho‘r suvning zichligi toza suvdan katta.'],
        experimentType: 'buoyancy',
        experimentPrompt: 'Suyuqlik zichligini oshiring va jism qanday ko‘tarilishini ko‘ring!',
        examples: [],
        questions: [
          {
            id: 'g4_s4_q1',
            question: 'Suvga tuz qo‘shilsa, suvning zichligi qanday o‘zgaradi?',
            options: ['Kamayadi', 'Ortadi', 'O‘zgarmaydi', 'Nolga teng bo‘ladi'],
            correctIndex: 1,
            explanation: 'Tuz qo‘shilganda eritma zichligi ortadi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 5,
        stageType: 'exam',
        stageName: '5-etap: Yakuniy imtihon',
        title: '4-sinf yakuniy imtihoni',
        description: 'Tovush va suyuqliklar bo‘yicha sinov',
        theory: '4-sinf dasturi bo‘yicha bilimingizni yakunlang.',
        keyPoints: ['Tovush manbalari', 'Suzuvchanlik', 'Tovush tezligi'],
        examples: [],
        questions: [
          {
            id: 'g4_s5_q1',
            question: 'Fazogirlar ochiq koinotda nega bir-birlarining ovozini eshita olishmaydi?',
            options: ['Chunki u yerda havo yo‘q (bo‘shliq)', 'Chunki juda sovuq', 'Kaskalari qattiq bo‘lgani uchun', 'Yer juda uzoq bo‘lgani uchun'],
            correctIndex: 0,
            explanation: 'Tovush to‘lqinlari bo‘shliqda (vakuumda) tarqala olmaydi.',
            points: 25
          },
          {
            id: 'g4_s5_q2',
            question: 'Yorug‘lik tezligi tovush tezligidan qanday?',
            options: ['Katta', 'Kichik', 'Teng', 'Nolga teng'],
            correctIndex: 0,
            explanation: 'Yorug‘lik tezligi (300,000 km/s) tovushdan ancha katta.',
            points: 25
          }
        ]
      }
    ]
  },

  // 5-SINF
  {
    grade: 5,
    title: '5-sinf: Moddalar va ularning tuzilishi',
    tagline: 'Molekulalar, diffuziya va agregat holatlar',
    description: 'Moddaning uch xil holati: qattiq, suyuq, gaz. Zarrachalar harakati va issiqlik kengayishi.',
    ageGroup: '10-11 yosh',
    accentColor: 'from-violet-500 to-purple-600',
    stages: [
      {
        stageNumber: 1,
        stageType: 'basics',
        stageName: '1-etap: Boshlang‘ich bilimlar',
        title: 'Moddaning tuzilishi: Atom va Molekula',
        description: 'Barcha narsalar mayda zarrachalardan iborat',
        theory: 'Barcha jismlar moddalardan, moddalar esa ko‘zga ko‘rinmas mayda zarrachalar — molekulalar va atomlardan tashkil topgan. Ular to‘xtovsiz va tartibsiz harakat qiladi.',
        keyPoints: [
          'Molekula — moddaning kimyoviy xossasini saqlovchi eng kichik zarracha.',
          'Molekulalar orasida masofalar va o‘zaro tortishish-itarish kuchlari mavjud.'
        ],
        examples: [
          { problem: 'Xonaning bir burchagida atir sepsak, nega boshqa burchagida ham hidi keladi?', solution: 'Chunki atir molekulalari havo molekulalari bilan aralashib tarqaladi (Diffuziya).' }
        ],
        questions: [
          {
            id: 'g5_s1_q1',
            question: 'Moddalarning o‘z-o‘zidan bir-biriga aralashib ketish hodisasi nima deb ataladi?',
            options: ['Diffuziya', 'Konveksiya', 'Optika', 'Magnitlanish'],
            correctIndex: 0,
            explanation: 'Diffuziya — modda zarrachalarining tartibsiz harakati tufayli aralashishi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 2,
        stageType: 'concepts',
        stageName: '2-etap: Asosiy tushunchalar',
        title: 'Moddaning uch agregat holati',
        description: 'Qattiq, suyuq va gazsimon holatlar',
        theory: 'Qattiq jismlar o‘z shakli va hajmini saqlaydi. Suyuqliklar hajmini saqlaydi, lekin idish shaklini oladi. Gazlar esa butun berilgan hajmni egallaydi va shaklini saqlamaydi.',
        keyPoints: [
          'Qattiq: molekulalar qattiq bog‘langan, faqat tebranadi.',
          'Suyuq: molekulalar joyini almashtirib oqadi.',
          'Gaz: molekulalar erkin uchib yuradi, masofa katta.'
        ],
        examples: [
          { problem: 'Suvning muz va bug‘ holati qanday nomlanadi?', solution: 'Muz — qattiq holat, bug‘ — gazsimon holat.' }
        ],
        questions: [
          {
            id: 'g5_s2_q1',
            question: 'Qaysi modda o‘z shakli va hajmini aniq saqlaydi?',
            options: ['Qattiq jism', 'Suyuqlik', 'Gaz', 'Bug‘'],
            correctIndex: 0,
            explanation: 'Qattiq jismlar shakli va hajmini saqlaydi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 3,
        stageType: 'formulas',
        stageName: '3-etap: Formulalar va masalalar',
        title: 'Hajm va massani o‘lchash',
        description: 'Kubik metr, litr va grammlar',
        theory: 'Jismning egallagan o‘rni hajm (V) deyiladi. To‘g‘ri to‘rtburchakli parallelipipedning hajmi: V = a × b × c.',
        keyPoints: [
          'V = a × b × c (uzunlik × kenglik × balandlik).',
          '1 litr = 1 dm³ = 0.001 m³.'
        ],
        formulaName: 'Hajm formulasi',
        formulaLatex: 'V = a \\times b \\times c',
        examples: [
          { problem: 'Bo‘yi 2 m, eni 3 m, balandligi 2 m bo‘lgan xonaning hajmi qancha?', solution: 'V = 2 × 3 × 2 = 12 m³.' }
        ],
        questions: [
          {
            id: 'g5_s3_q1',
            question: 'O‘lchamlari 2 cm, 3 cm va 4 cm bo‘lgan yog‘och brusokning hajmi necha cm³?',
            options: ['9 cm³', '24 cm³', '14 cm³', '20 cm³'],
            correctIndex: 1,
            explanation: 'V = 2 * 3 * 4 = 24 cm³.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 4,
        stageType: 'experiment',
        stageName: '4-etap: Amaliy tajribalar',
        title: 'Issiq va sovuq suvda diffuziya',
        description: 'Haroratning zarrachalar tezligiga ta’siri',
        theory: 'Issiq suvda choy yoki bo‘yoq tezroq eriydi, chunki harorat oshganda molekulalar tezroq harakatlanadi.',
        keyPoints: ['Harorat oshsa, diffuziya tezlashadi.'],
        experimentType: 'density',
        experimentPrompt: 'Haroratni oshiring va molekulalar harakatini kuzating!',
        examples: [],
        questions: [
          {
            id: 'g5_s4_q1',
            question: 'Choy shakar solinganda qaysi suvda tezroq eriydi?',
            options: ['Muzdek sovuq suvda', 'Issiq qaynoq suvda', 'Xona haroratidagi suvda', 'Farqi yo‘q'],
            correctIndex: 1,
            explanation: 'Issiq suvda molekulalar tezroq harakatlanadi va diffuziya jadallashadi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 5,
        stageType: 'exam',
        stageName: '5-etap: Yakuniy imtihon',
        title: '5-sinf yakuniy imtihoni',
        description: 'Modda tuzilishi bo‘yicha attestatsiya',
        theory: '5-sinf bosqichlari bo‘yicha to‘liq sinov.',
        keyPoints: ['Molekula va atomlar', 'Diffuziya', 'Agregat holatlar'],
        examples: [],
        questions: [
          {
            id: 'g5_s5_q1',
            question: 'Gazlar nima uchun idish shaklini ham, hajmini ham to‘liq egallaydi?',
            options: ['Chunki ularning molekulalari erkin harakatlanadi', 'Chunki ular juda og‘ir', 'Chunki ular bir joyda qotib turadi', 'Chunki ular ko‘rinmaydi'],
            correctIndex: 0,
            explanation: 'Gaz molekulalari o‘rtasidagi masofa katta va ular betartib uchib yuradi.',
            points: 25
          },
          {
            id: 'g5_s5_q2',
            question: '1 litr necha kub detsimetrga (dm³) teng?',
            options: ['1 dm³', '10 dm³', '100 dm³', '0.1 dm³'],
            correctIndex: 0,
            explanation: '1 litr = 1 dm³.',
            points: 25
          }
        ]
      }
    ]
  },

  // 6-SINF
  {
    grade: 6,
    title: '6-sinf: Fizik o‘lchashlar va harakat asoslari',
    tagline: 'O‘lchov birliklari, aniqlik va tekis harakat',
    description: 'Xalqaro birliklar sistemasi (SI), vaqt, uzunlik, massa, zichlikka kirish va o‘lchash xatoliklari.',
    ageGroup: '11-12 yosh',
    accentColor: 'from-teal-500 to-emerald-600',
    stages: [
      {
        stageNumber: 1,
        stageType: 'basics',
        stageName: '1-etap: Boshlang‘ich bilimlar',
        title: 'Fizik kattaliklar va SI sistemasi',
        description: 'Dunyo bo‘ylab qabul qilingan o‘lchov standartlari',
        theory: 'Fizikada hodisalar o‘lchanadi. SI (Xalqaro birliklar tizimi)da uzunlik birligi metr (m), vaqt birligi sekund (s), massa birligi kilogramm (kg) deb qabul qilingan.',
        keyPoints: [
          'Uzunlik — metr [m].',
          'Vaqt — sekund [s].',
          'Massa — kilogramm [kg].'
        ],
        examples: [
          { problem: '1 kilometr necha metrga teng?', solution: '1 km = 1000 metr.' },
          { problem: '1 soat necha sekund?', solution: '1 soat = 60 minut = 3600 sekund.' }
        ],
        questions: [
          {
            id: 'g6_s1_q1',
            question: 'SI tizimida vaqtning asosiy o‘lchov birligi nima?',
            options: ['Minut', 'Soat', 'Sekund', 'Sutka'],
            correctIndex: 2,
            explanation: 'SI tizimida asosiy vaqt birligi — sekund (s).',
            points: 20
          }
        ]
      },
      {
        stageNumber: 2,
        stageType: 'concepts',
        stageName: '2-etap: Asosiy tushunchalar',
        title: 'Mexanik harakat turlari',
        description: 'Tekis va notekis harakat, trayektoriya',
        theory: 'Jismning fazodagi harakat chizig‘i trayektoriya deyiladi. Agar jism teng vaqt oraliqlarida teng masofalar bosib o‘tsa, bu tekis harakat bo‘ladi.',
        keyPoints: [
          'Trayektoriya — harakat izi (to‘g‘ri chiziqli yoki egri chiziqli).',
          'Yo‘l — trayektoriya uzunligi (skalyar kattalik).'
        ],
        examples: [
          { problem: 'Soat millarining uchi qanday trayektoriya chizadi?', solution: 'Aylana trayektoriya chizadi.' }
        ],
        questions: [
          {
            id: 'g6_s2_q1',
            question: 'Jismning harakat chizig‘i nima deb ataladi?',
            options: ['Tezlik', 'Trayektoriya', 'Vaqt', 'Inersiya'],
            correctIndex: 1,
            explanation: 'Harakatlanish chizig‘i trayektoriya deb ataladi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 3,
        stageType: 'formulas',
        stageName: '3-etap: Formulalar va masalalar',
        title: 'Tezlik formulasi',
        description: 'v = s / t bog‘lanishi',
        theory: 'Tekis harakatda tezlik v = s / t formulasi bilan topiladi. Bu yerda s — yo‘l (m), t — vaqt (s), v — tezlik (m/s).',
        keyPoints: [
          'v = s / t',
          's = v × t',
          't = s / v',
          '1 m/s = 3.6 km/h.'
        ],
        formulaName: 'Tezlik formulasi',
        formulaLatex: 'v = \\frac{s}{t}',
        examples: [
          { problem: 'Mashina 200 metr yo‘lni 10 sekundda bosib o‘tdi. Uning tezligini toping.', solution: 'v = 200 / 10 = 20 m/s.' }
        ],
        questions: [
          {
            id: 'g6_s3_q1',
            question: 'Velosipedchi 60 metr masofani 12 sekundda bosib o‘tsa, uning tezligi necha m/s?',
            options: ['5 m/s', '10 m/s', '72 m/s', '48 m/s'],
            correctIndex: 0,
            explanation: 'v = s / t = 60 / 12 = 5 m/s.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 4,
        stageType: 'experiment',
        stageName: '4-etap: Amaliy tajribalar',
        title: 'Tezlikni o‘lchash amaliyoti',
        description: 'Masofa va vaqt orqali tezlikni hisoblash',
        theory: 'Sekundomer va o‘lchov lentasi yordamida harakatdagi jism tezligini aniqlash mumkin.',
        keyPoints: ['Tajribada bir necha marta o‘lchab o‘rtacha qiymat olinadi.'],
        experimentType: 'gravity',
        experimentPrompt: 'Jismni ma’lum masofada harakatlantirib vaqtini o‘lchang!',
        examples: [],
        questions: [
          {
            id: 'g6_s4_q1',
            question: 'Tezlikni 72 km/h dan m/s ga o‘tkazsak necha bo‘ladi?',
            options: ['10 m/s', '20 m/s', '30 m/s', '50 m/s'],
            correctIndex: 1,
            explanation: '72 / 3.6 = 20 m/s.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 5,
        stageType: 'exam',
        stageName: '5-etap: Yakuniy imtihon',
        title: '6-sinf yakuniy imtihoni',
        description: 'O‘lchashlar va kinematika boshlang‘ichi',
        theory: '6-sinf kursi bo‘yicha to‘liq sinov.',
        keyPoints: ['SI birliklari', 'Trayektoriya', 'v = s / t hisoblari'],
        examples: [],
        questions: [
          {
            id: 'g6_s5_q1',
            question: 'Avtomobil 36 km/h tezlik bilan 10 sekundda qancha yo‘l bosadi?',
            options: ['100 m', '360 m', '50 m', '20 m'],
            correctIndex: 0,
            explanation: '36 km/h = 10 m/s. s = v * t = 10 * 10 = 100 m.',
            points: 25
          },
          {
            id: 'g6_s5_q2',
            question: '1 soatda necha sekund bor?',
            options: ['60 s', '600 s', '3600 s', '1000 s'],
            correctIndex: 2,
            explanation: '60 minut * 60 sekund = 3600 sekund.',
            points: 25
          }
        ]
      }
    ]
  },

  // 7-SINF
  {
    grade: 7,
    title: '7-sinf: Mexanika asoslari, zichlik va bosim',
    tagline: 'Klassik fizikaning boshlanishi: Dinamika, gidrostatika va kuchlar',
    description: 'Nyuton qonunlariga kirish, massa va og‘irlik, zichlik (ρ=m/V), qattiq jismlar va suyuqliklar bosimi (P=ρgh), Arximed qonuni.',
    ageGroup: '12-13 yosh',
    accentColor: 'from-blue-600 to-indigo-700',
    stages: [
      {
        stageNumber: 1,
        stageType: 'basics',
        stageName: '1-etap: Boshlang‘ich bilimlar',
        title: 'Inersiya va Massa',
        description: 'Nyutonning I-qonuni va materiya miqdori',
        theory: 'Agar jismga boshqa jismlar ta’sir etmasa, u tinch holatini yoki to‘g‘ri chiziqli tekis harakatini saqlaydi. Bu hodisa inersiya deyiladi. Jismning inersiyalilik o‘lchovi massa (m) deb ataladi.',
        keyPoints: [
          'Inersiya — jismning o‘z harakat holatini saqlashga intilishi.',
          'Katta massali jismni qo‘zg‘atish ham, to‘xtatish ham qiyinroq.',
          'Massa tarozi yordamida aniqlanadi.'
        ],
        examples: [
          { problem: 'Avtobus to‘satdan tormoz berganda yo‘lovchilar nima uchun oldinga egiladi?', solution: 'Inersiya tufayli yo‘lovchi tanasi o‘zining ilgarilama harakatini saqlashga intiladi.' }
        ],
        questions: [
          {
            id: 'g7_s1_q1',
            question: 'Jismning inersiyaviylik o‘lchovi qaysi fizik kattalik?',
            options: ['Tezlik', 'Kuch', 'Massa', 'Hajm'],
            correctIndex: 2,
            explanation: 'Massa — jismning inersiyaviylik va gravitatsion xossasini ifodalovchi kattalik.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 2,
        stageType: 'concepts',
        stageName: '2-etap: Asosiy tushunchalar',
        title: 'Zichlik va Og‘irlik kuchi',
        description: 'ρ = m / V va F_og‘irlik = mg',
        theory: 'Moddaning zichligi (ρ) — hajm birligidagi modda massasini ifodalaydi: ρ = m / V. Yer barcha jismlarni o‘z markaziga tortadi: F_og‘ = m × g, bu yerda g ≈ 9.8 m/s² (erkin tushish tezlanishi).',
        keyPoints: [
          'Suvning zichligi ρ_suv = 1000 kg/m³.',
          'g ≈ 9.8 m/s² (odatda hisoblarda 10 m/s² olinadi).',
          'Og‘irlik kuchi Nyutonlarda (N) o‘lchanadi.'
        ],
        examples: [
          { problem: 'Massasi 5 kg bo‘lgan toshga ta’sir qiluvchi og‘irlik kuchini toping (g=10 m/s²).', solution: 'F = m × g = 5 × 10 = 50 N.' }
        ],
        questions: [
          {
            id: 'g7_s2_q1',
            question: 'Massasi 70 kg bo‘lgan odamga Yer tomonidan ta’sir etuvchi og‘irlik kuchi qancha (g = 10 m/s²)?',
            options: ['7 N', '70 N', '700 N', '7000 N'],
            correctIndex: 2,
            explanation: 'F = m * g = 70 * 10 = 700 N.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 3,
        stageType: 'formulas',
        stageName: '3-etap: Formulalar va masalalar',
        title: 'Bosim va Arximed kuchi',
        description: 'p = F/S, p = ρgh va F_A = ρ_s g V_j',
        theory: 'Bosim birlik yuzaga tik tushuvchi kuch: p = F / S (Paskal, Pa). Suyuqlik ustuni bosimi gidrostatik bosim: p = ρgh. Arximed kuchi esa suyuqlikka botirilgan jismni yuqoriga itaradi: F_A = ρ_suyuqlik × g × V_botgan.',
        keyPoints: [
          'p = F / S [Pa = N/m²]',
          'Gidrostatik bosim: p = ρgh',
          'Arximed kuchi: F_A = ρ g V'
        ],
        formulaName: 'Arximed kuchi',
        formulaLatex: 'F_A = \\rho_{s} \\cdot g \\cdot V_{bot}',
        examples: [
          { problem: 'Yuzi 0.02 m² bo‘lgan maydonga 100 N kuch berilsa, bosim qancha?', solution: 'p = F / S = 100 / 0.02 = 5000 Pa (5 kPa).' }
        ],
        questions: [
          {
            id: 'g7_s3_q1',
            question: 'Suvga to‘liq botgan hajmi 0.002 m³ bo‘lgan jismga ta’sir qiluvchi Arximed kuchi qancha (ρ = 1000 kg/m³, g = 10 m/s²)?',
            options: ['2 N', '20 N', '200 N', '2000 N'],
            correctIndex: 1,
            explanation: 'F_A = 1000 * 10 * 0.002 = 20 N.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 4,
        stageType: 'experiment',
        stageName: '4-etap: Amaliy tajribalar',
        title: 'Arximed va suzish laboratoriyasi',
        description: 'Suyuqlik zichligi va itarish kuchini tekshirish',
        theory: 'Agar F_A > F_og‘ bo‘lsa jism yuqoriga qalqiydi, teng bo‘lsa suzib yuradi, kichik bo‘lsa cho‘kadi.',
        keyPoints: ['Suzish sharti: ρ_jism < ρ_suyuqlik.'],
        experimentType: 'buoyancy',
        experimentPrompt: 'Jism hajmi va suyuqlik zichligini o‘zgartirib kuchlar muvozanatini kuzating!',
        examples: [],
        questions: [
          {
            id: 'g7_s4_q1',
            question: 'Jism suyuqlik ichida suzib (muallaq) turishi uchun qaysi shart bajarilishi kerak?',
            options: ['F_A > F_og‘', 'F_A = F_og‘', 'F_A < F_og‘', 'F_A = 0'],
            correctIndex: 1,
            explanation: 'Muallaq turishda itarish kuchi og‘irlik kuchiga teng bo‘ladi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 5,
        stageType: 'exam',
        stageName: '5-etap: Yakuniy imtihon',
        title: '7-sinf yakuniy imtihoni',
        description: 'Mexanika, gidrostatika va bosim sinovi',
        theory: '7-sinf dasturi bo‘yicha to‘liq imtihon.',
        keyPoints: ['ρ = m/V', 'Nyuton qonunlari', 'Gidrostatik bosim p = ρgh', 'F_A = ρgV'],
        examples: [],
        questions: [
          {
            id: 'g7_s5_q1',
            question: 'Chiqarib tashlangan suyuqlik og‘irligiga teng itaruvchi kuch qaysi olim nomi bilan ataladi?',
            options: ['Paskal', 'Nyuton', 'Arximed', 'Galiley'],
            correctIndex: 2,
            explanation: 'Bu Arximed qonunidir.',
            points: 25
          },
          {
            id: 'g7_s5_q2',
            question: '10 metr chuqurlikdagi suv ostida gidrostatik bosim taxminan qancha (ρ=1000, g=10)?',
            options: ['10,000 Pa', '100,000 Pa (100 kPa)', '1,000 Pa', '100 Pa'],
            correctIndex: 1,
            explanation: 'p = ρ * g * h = 1000 * 10 * 10 = 100,000 Pa = 100 kPa.',
            points: 25
          }
        ]
      }
    ]
  },

  // 8-SINF
  {
    grade: 8,
    title: '8-sinf: Issiqlik fizikasi va Elektr hodisalari',
    tagline: 'Termodinamika asoslari, elektr zaryadlari va Om qonuni',
    description: 'Ichki energiya, solishtirma issiqlik sig‘imi Q=cmΔT, yonish issiqligi, elektr toki, kuchlanish, qarshilik, Om qonuni I=U/R, Joul-Lens qonuni.',
    ageGroup: '13-14 yosh',
    accentColor: 'from-amber-600 to-red-600',
    stages: [
      {
        stageNumber: 1,
        stageType: 'basics',
        stageName: '1-etap: Boshlang‘ich bilimlar',
        title: 'Ichki energiya va issiqlik uzatish',
        description: 'Issiqlik o‘tkazuvchanlik, konveksiya va nurlanish',
        theory: 'Jismni tashkil etgan molekulalarning harakat va o‘zaro ta’sir energiyalari yig‘indisi ichki energiya deyiladi. Issiqlik uch usulda uzatiladi: issiqlik o‘tkazuvchanlik, konveksiya (suyuqlik va gazlarda) va nurlanish.',
        keyPoints: [
          'Issiqlik miqdori Joulda (J) o‘lchanadi.',
          'Konveksiya oqimlar orqali harorat almashinishidir.',
          'Quyoshdan Yerga issiqlik nurlanish orqali keladi.'
        ],
        examples: [
          { problem: 'Nega batareyalar xonaning pastiga emas, polga yaqin qo‘yiladi?', solution: 'Chunki isigan havo yuqoriga ko‘tarilib butun xonani aylanadi (konveksiya).' }
        ],
        questions: [
          {
            id: 'g8_s1_q1',
            question: 'Quyoshdan yerga issiqlik qaysi usul bilan yetib keladi?',
            options: ['Issiqlik o‘tkazuvchanlik', 'Konveksiya', 'Nurlanish', 'Diffuziya'],
            correctIndex: 2,
            explanation: 'Vakuum orqali faqat nurlanish yo‘li bilan energiya tarqaladi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 2,
        stageType: 'concepts',
        stageName: '2-etap: Asosiy tushunchalar',
        title: 'Solishtirma issiqlik va erish-qaynash',
        description: 'Q = c m ΔT va Q = L m formulalari',
        theory: 'Jismni qizdirish uchun zarur issiqlik miqdori: Q = c × m × (t₂ - t₁). Bu yerda c — solishtirma issiqlik sig‘imi [J/(kg·°C)], m — massa [kg]. Suvning issiqlik sig‘imi juda katta: c = 4200 J/(kg·°C).',
        keyPoints: [
          'c_suv = 4200 J/(kg·°C)',
          'Erish issiqligi: Q = λm',
          'Bug‘lanish issiqligi: Q = Lm'
        ],
        examples: [
          { problem: '2 kg suvni 10°C dan 20°C ga qizdirish uchun qancha issiqlik kerak?', solution: 'Q = 4200 × 2 × 10 = 84,000 J (84 kJ).' }
        ],
        questions: [
          {
            id: 'g8_s2_q1',
            question: '1 kg suvni 1°C ga qizdirish uchun qancha issiqlik sarflanadi?',
            options: ['420 J', '4200 J', '2100 J', '1000 J'],
            correctIndex: 1,
            explanation: 'Suvning solishtirma issiqlik sig‘imi 4200 J/(kg·°C).',
            points: 20
          }
        ]
      },
      {
        stageNumber: 3,
        stageType: 'formulas',
        stageName: '3-etap: Formulalar va masalalar',
        title: 'Elektr zanjiri va Om qonuni',
        description: 'I = U / R va elektr quvvati P = U × I',
        theory: 'Zanjir qismidagi tok kuchi (I) kuchlanishga (U) to‘g‘ri proporsional, qarshilikka (R) teskari proporsional: I = U / R. Tok kuchi Amperda (A), kuchlanish Voltda (V), qarshilik Omda (Ω) o‘lchanadi.',
        keyPoints: [
          'Om qonuni: I = U / R',
          'Qarshilik: R = ρ_sol × l / S',
          'Elektr quvvati: P = U × I',
          'Joul-Lens qonuni: Q = I² R t'
        ],
        formulaName: 'Zanjir qismi uchun Om qonuni',
        formulaLatex: 'I = \\frac{U}{R}',
        examples: [
          { problem: 'Kuchlanish 220 V, qarshilik 44 Ω bo‘lsa, tok kuchini toping.', solution: 'I = 220 / 44 = 5 A.' }
        ],
        questions: [
          {
            id: 'g8_s3_q1',
            question: 'Kuchlanish 12 V va qarshilik 3 Om bo‘lgan o‘tkazgichdagi tok kuchi necha Amper?',
            options: ['4 A', '36 A', '15 A', '0.25 A'],
            correctIndex: 0,
            explanation: 'I = U / R = 12 / 3 = 4 A.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 4,
        stageType: 'experiment',
        stageName: '4-etap: Amaliy tajribalar',
        title: 'Virtual elektr zanjiri tajribasi',
        description: 'Reostat, kuchlanish va tok kuchi bog‘liqligi',
        theory: 'Kuchlanish oshganda chiroq ravshan yonadi va ampermetr ko‘rsatkichi ortadi.',
        keyPoints: ['Kuchlanish ortsa tok ortadi, qarshilik ortsa tok kamayadi.'],
        experimentType: 'ohm',
        experimentPrompt: 'Kuchlanish va qarshilikni o‘zgartirib tok kuchini kuzating!',
        examples: [],
        questions: [
          {
            id: 'g8_s4_q1',
            question: 'Agar zanjirdagi qarshilik 2 marta oshirilsa, o‘zgarmas kuchlanishda tok kuchi qanday o‘zgaradi?',
            options: ['2 marta kamayadi', '2 marta ortadi', 'O‘zgarmaydi', 'Nolga aylanadi'],
            correctIndex: 0,
            explanation: 'Tok qarshilikka teskari proporsional: I = U / R.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 5,
        stageType: 'exam',
        stageName: '5-etap: Yakuniy imtihon',
        title: '8-sinf yakuniy imtihoni',
        description: 'Issiqlik va elektr hodisalari bo‘yicha sinov',
        theory: '8-sinf mavzulari bo‘yicha to‘liq sinovdan o‘ting.',
        keyPoints: ['Q = cmΔT', 'Om qonuni I = U/R', 'P = UI quvvat'],
        examples: [],
        questions: [
          {
            id: 'g8_s5_q1',
            question: '220 V kuchlanishda ishlayotgan va 2 A tok o‘tayotgan elektr choynakning quvvati necha Vatt?',
            options: ['110 W', '440 W', '222 W', '880 W'],
            correctIndex: 1,
            explanation: 'P = U * I = 220 * 2 = 440 W.',
            points: 25
          },
          {
            id: 'g8_s5_q2',
            question: 'Elektr qarshiligi o‘lchov birligi nima?',
            options: ['Amper', 'Volt', 'Om', 'Vatt'],
            correctIndex: 2,
            explanation: 'Qarshilik Om (Ω) birligida o‘lchanadi.',
            points: 25
          }
        ]
      }
    ]
  },

  // 9-SINF
  {
    grade: 9,
    title: '9-sinf: Dinamika, tebranishlar va atom fizikasi',
    tagline: 'Nyuton qonunlari, impuls, mexanik to‘lqinlar va yadro',
    description: 'Nyutonning uchta qonuni, erkin tushish va osmon jismlari harakati, impuls saqlanish qonuni (p=mv), tebranishlar va to‘lqinlar, Rezerford tajribasi.',
    ageGroup: '14-15 yosh',
    accentColor: 'from-cyan-600 to-blue-700',
    stages: [
      {
        stageNumber: 1,
        stageType: 'basics',
        stageName: '1-etap: Boshlang‘ich bilimlar',
        title: 'Nyutonning uchta qonuni',
        description: 'Klassik dinamikaning poydevori',
        theory: '1-qonun: Inersiya qonuni. 2-qonun: Jism tezlanishi unga ta’sir qiluvchi kuchga to‘g‘ri, massasiga teskari proporsional: a = F / m (yoki F = ma). 3-qonun: Ta’sir har doim aks ta’sirga teng va qarama-qarshi: F₁ = -F₂.',
        keyPoints: [
          'F = m × a (Dinamika asosiy qonuni)',
          'Har qanday ta’sirga teng aks ta’sir mavjud.',
          'Kuchlar har doim juft holda hosil bo‘ladi.'
        ],
        examples: [
          { problem: 'Massasi 1000 kg mashina 2 m/s² tezlanish bilan harakatlanmoqda. Tortish kuchini toping.', solution: 'F = m × a = 1000 × 2 = 2000 N.' }
        ],
        questions: [
          {
            id: 'g9_s1_q1',
            question: 'Massasi 4 kg jismga 12 N kuch ta’sir etsa, u qanday tezlanish oladi?',
            options: ['3 m/s²', '48 m/s²', '8 m/s²', '0.33 m/s²'],
            correctIndex: 0,
            explanation: 'a = F / m = 12 / 4 = 3 m/s².',
            points: 20
          }
        ]
      },
      {
        stageNumber: 2,
        stageType: 'concepts',
        stageName: '2-etap: Asosiy tushunchalar',
        title: 'Impuls va Energiyaning saqlanishi',
        description: 'p = m × v va reaktiv harakat',
        theory: 'Jism massasining uning tezligiga ko‘paytmasi jism impulsi (harakat miqdori) deyiladi: p = m × v. Tashqi kuchlar ta’sir qilmagan berk tizimda to‘liq impuls o‘zgarmaydi. Raketalar aynan shu printsipda (reaktiv kuch bilan) uchadi.',
        keyPoints: [
          'Impuls: p = mv [kg·m/s]',
          'Kinetik energiya: E_k = (m v²) / 2',
          'Potensial energiya: E_p = m g h',
          'To‘liq mexanik energiya saqlanadi: E_to‘liq = E_k + E_p'
        ],
        examples: [
          { problem: 'Massasi 2 kg tosh 10 metr balandlikda turibdi. Potensial energiyasi qancha (g=10)?', solution: 'E_p = mgh = 2 × 10 × 10 = 200 Joul.' }
        ],
        questions: [
          {
            id: 'g9_s2_q1',
            question: 'Massasi 3 kg bo‘lgan to‘p 4 m/s tezlikda uchmoqda. Uning impulsi qancha?',
            options: ['12 kg·m/s', '7 kg·m/s', '1.33 kg·m/s', '24 kg·m/s'],
            correctIndex: 0,
            explanation: 'p = m * v = 3 * 4 = 12 kg·m/s.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 3,
        stageType: 'formulas',
        stageName: '3-etap: Formulalar va masalalar',
        title: 'Mexanik tebranishlar va Mayatnik',
        description: 'T = 2π√(l/g) matematik mayatnik davri',
        theory: 'Vaqt o‘tishi bilan takrorlanib turuvchi harakat tebranma harakat deyiladi. Bitta to‘liq tebranish vaqti tebranish davri (T) deyiladi. Matematik mayatnik davri ip uzunligi (l) va erkin tushish tezlanishiga (g) bog‘liq bo‘lib, jism massasiga bog‘liq EMAS!',
        keyPoints: [
          'Davr: T = t / N [sekund]',
          'Chastota: ν = 1 / T [Gerts, Hz]',
          'Matematik mayatnik: T = 2π √(l / g)'
        ],
        formulaName: 'Matematik mayatnik tebranish davri',
        formulaLatex: 'T = 2\\pi \\sqrt{\\frac{l}{g}}',
        examples: [
          { problem: 'Ip uzunligi 4 marta oshirilsa, mayatnik davri necha marta ortadi?', solution: '√4 = 2 marta ortadi.' }
        ],
        questions: [
          {
            id: 'g9_s3_q1',
            question: 'Tebranish chastotasi 50 Hz bo‘lsa, uning tebranish davri qancha?',
            options: ['0.02 s', '0.5 s', '50 s', '2 s'],
            correctIndex: 0,
            explanation: 'T = 1 / ν = 1 / 50 = 0.02 sekund.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 4,
        stageType: 'experiment',
        stageName: '4-etap: Amaliy tajribalar',
        title: 'Mayatnik laboratoriyasi',
        description: 'Ip uzunligi va gravitatsiyaning davrga ta’siri',
        theory: 'Oyda gravitatsiya 6 marta kam, shuning uchun Oyda mayatnik sekinroq tebranadi.',
        keyPoints: ['Mayatnik davri massaga bog‘liq emas, faqat l va g ga bog‘liq.'],
        experimentType: 'pendulum',
        experimentPrompt: 'Ip uzunligini va sayyorani tanlab davrni hisoblang!',
        examples: [],
        questions: [
          {
            id: 'g9_s4_q1',
            question: 'Mayatnik yukining massasi 2 marta oshirilsa, uning tebranish davri qanday o‘zgaradi?',
            options: ['O‘zgarmaydi', '2 marta oshadi', '2 marta kamayadi', '4 marta oshadi'],
            correctIndex: 0,
            explanation: 'Matematik mayatnik davri massaga mutlaqo bog‘liq emas!',
            points: 20
          }
        ]
      },
      {
        stageNumber: 5,
        stageType: 'exam',
        stageName: '5-etap: Yakuniy imtihon',
        title: '9-sinf yakuniy imtihoni',
        description: 'Dinamika, energiya va tebranishlar sinovi',
        theory: '9-sinf bo‘yicha to‘liq davlat ta’lim standarti sinovi.',
        keyPoints: ['F = ma', 'E_k = mv²/2', 'T = 2π√(l/g)', 'Rezerford atom modeli'],
        examples: [],
        questions: [
          {
            id: 'g9_s5_q1',
            question: 'Atom yadrosini va uning markazida musbat zaryad borligini qaysi olim tajribada isbotlagan?',
            options: ['Rezerford', 'Tomson', 'Bor', 'Eynshteyn'],
            correctIndex: 0,
            explanation: 'Ernest Rezerford 1911-yilda alfa-zarrachalar sochilish tajribasi orqali yadroviy modelni kashf qilgan.',
            points: 25
          },
          {
            id: 'g9_s5_q2',
            question: 'Massasi 2 kg jism 10 m/s tezlik bilan harakatlanmoqda. Uning kinetik energiyasi qancha?',
            options: ['100 J', '200 J', '20 J', '50 J'],
            correctIndex: 0,
            explanation: 'E_k = (m * v²) / 2 = (2 * 100) / 2 = 100 Joul.',
            points: 25
          }
        ]
      }
    ]
  },

  // 10-SINF
  {
    grade: 10,
    title: '10-sinf: Molekulyar fizika va Elektrodinamika',
    tagline: 'Ideal gaz qonunlari, termodinamika va elektromagnit maydon',
    description: 'MKT asosiy tenglamasi, Mendeleyev-Klapeyron tenglamasi (pV=νRT), izojarayonlar, termodinamika asoslari, Kulon qonuni va doimiy tok.',
    ageGroup: '15-16 yosh',
    accentColor: 'from-purple-600 to-indigo-800',
    stages: [
      {
        stageNumber: 1,
        stageType: 'basics',
        stageName: '1-etap: Boshlang‘ich bilimlar',
        title: 'Molekulyar-kinetik nazariya (MKT) asoslari',
        description: 'Mikrodunyo va makroskopik parametrlar',
        theory: 'MKT ning 3 ta asosiy qoidasi: 1) Barcha moddalar zarrachalardan tuzilgan; 2) Zarrachalar uzluksiz betartib harakatda; 3) Zarrachalar o‘zaro ta’sirlashadi. Makroskopik parametrlar: Bosim (p), Hajm (V), Harorat (T).',
        keyPoints: [
          'Absolyut harorat shkalasi (Kelvin): T = t + 273 K.',
          'Avogadro doimiysi: N_A = 6.02 × 10²³ mol⁻¹.',
          'Universal gaz doimiysi: R = 8.31 J/(mol·K).'
        ],
        examples: [
          { problem: '27°C harorat necha Kelvinga teng?', solution: 'T = 27 + 273 = 300 K.' }
        ],
        questions: [
          {
            id: 'g10_s1_q1',
            question: 'Mutlaq nol harorat (0 Kelvin) Selsiy shkalasida necha gradusga to‘g‘ri keladi?',
            options: ['-273.15 °C', '0 °C', '-100 °C', '-373 °C'],
            correctIndex: 0,
            explanation: '0 K = -273.15 °C da barcha molekulalarning issiqlik harakati to‘xtaydi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 2,
        stageType: 'concepts',
        stageName: '2-etap: Asosiy tushunchalar',
        title: 'Mendeleyev-Klapeyron tenglamasi va Izojarayonlar',
        description: 'pV = (m/M) RT va Boyl-Mariott, Gey-Lyussak, Sharl qonunlari',
        theory: 'Ideal gaz holat tenglamasi: pV = νRT. 1) Izotermik (T = const): pV = const; 2) Izobarik (p = const): V/T = const; 3) Izoxorik (V = const): p/T = const.',
        keyPoints: [
          'Izotermik: Boyl-Mariott (T = const)',
          'Izobarik: Gey-Lyussak (p = const)',
          'Izoxorik: Sharl (V = const)'
        ],
        examples: [
          { problem: 'Izotermik jarayonda gaz hajmi 2 marta ortsa, bosim qanday o‘zgaradi?', solution: 'Bosim 2 marta kamayadi, chunki p × V = const.' }
        ],
        questions: [
          {
            id: 'g10_s2_q1',
            question: 'Gaz hajmi o‘zgarmay qoladigan (V = const) jarayon qanday ataladi?',
            options: ['Izoxorik jarayon', 'Izotermik jarayon', 'Izobarik jarayon', 'Adiabatik jarayon'],
            correctIndex: 0,
            explanation: 'Izoxorik jarayonda jism hajmi doimiy saqlanadi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 3,
        stageType: 'formulas',
        stageName: '3-etap: Formulalar va masalalar',
        title: 'Elektrostatika: Kulon qonuni',
        description: 'F = k |q₁ q₂| / r² o‘zaro ta’sir kuchi',
        theory: 'Ikki nuqtaviy zaryadning vakuumdagi o‘zaro ta’sir kuchi zaryadlar miqdori ko‘paytmasiga to‘g‘ri, ular orasidagi masofa kvadratiga teskari proporsional: F = k × (|q₁| × |q₂|) / r². Bu yerda k = 9 × 10⁹ N·m²/C².',
        keyPoints: [
          'Kulon kuchi: F = k (|q₁ q₂|) / r²',
          'k = 9 × 10⁹ N·m²/C²',
          'Zaryad birligi — Kulon (C)'
        ],
        formulaName: 'Kulon qonuni',
        formulaLatex: 'F = k \\frac{|q_1 \\cdot q_2|}{r^2}',
        examples: [
          { problem: 'Zaryadlar orasidagi masofa 2 marta oshirilsa, Kulon kuchi qanday o‘zgaradi?', solution: 'Masofa kvadrati bo‘lgani uchun 2² = 4 marta kamayadi.' }
        ],
        questions: [
          {
            id: 'g10_s3_q1',
            question: 'Ikki nuqtaviy zaryad orasidagi masofa 3 marta kamaytirilsa, o‘zaro ta’sir kuchi necha marta ortadi?',
            options: ['3 marta', '6 marta', '9 marta', '27 marta'],
            correctIndex: 2,
            explanation: 'F ~ 1/r², shuning uchun 3² = 9 marta ortadi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 4,
        stageType: 'experiment',
        stageName: '4-etap: Amaliy tajribalar',
        title: 'Kulon kuchi va gaz bosimi simulyatsiyasi',
        description: 'Zaryadlar masofasi va hajm o‘zgarishini kuzatish',
        theory: 'Elektrostatik maydonda zaryadlar yaqinlashganda kuch jadal darajada ortadi.',
        keyPoints: ['Zaryadlar belgisi bir xil bo‘lsa itarishadi, qarama-qarshi bo‘lsa tortishadi.'],
        experimentType: 'ohm',
        experimentPrompt: 'Zaryadlar qiymati va masofasini o‘zgartirib ta’sir kuchini hisoblang!',
        examples: [],
        questions: [
          {
            id: 'g10_s4_q1',
            question: 'Ikkala zaryad ham musbat (+) bo‘lsa, ular bir-birini nima qiladi?',
            options: ['Itaradi', 'Tortadi', 'Aylantiradi', 'Hech qanday kuch hosil qilmaydi'],
            correctIndex: 0,
            explanation: 'Bir xil ishorali zaryadlar o‘zaro itarishadi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 5,
        stageType: 'exam',
        stageName: '5-etap: Yakuniy imtihon',
        title: '10-sinf yakuniy imtihoni',
        description: 'MKT, termodinamika va elektrostatika sinovi',
        theory: '10-sinf kursi bo‘yicha to‘liq imtihon.',
        keyPoints: ['pV = νRT', 'Izojarayonlar', 'Kulon qonuni', 'Termodinamikaning 1-qonuni Q = ΔU + A'],
        examples: [],
        questions: [
          {
            id: 'g10_s5_q1',
            question: 'Termodinamikaning 1-qonuni qaysi formulada to‘g‘ri ifodalangan?',
            options: ['Q = ΔU + A', 'A = Q × ΔU', 'ΔU = Q + A', 'Q = m c ΔT'],
            correctIndex: 0,
            explanation: 'Tizimga berilgan issiqlik miqdori uning ichki energiyasini oshirishga va tashqi kuchlarga qarshi ish bajarishga sarflanadi.',
            points: 25
          },
          {
            id: 'g10_s5_q2',
            question: 'Izotermik jarayonda harorat qanday bo‘ladi?',
            options: ['T = const', 'p = const', 'V = const', 'Q = 0'],
            correctIndex: 0,
            explanation: 'Izotermik jarayonda harorat o‘zgarmaydi (T = const).',
            points: 25
          }
        ]
      }
    ]
  },

  // 11-SINF
  {
    grade: 11,
    title: '11-sinf: Optika, Kvant fizikasi va Astrofizika',
    tagline: 'To‘lqin va geometrik optika, fotonlar, nisbiylik nazariyasi va koinot',
    description: 'Yorug‘lik interferensiyasi, difraksiyasi, fotoeffekt, Eynshteyn tenglamasi (E=mc²), atom yadrosi tuzilishi, radioaktivlik va koinot evolyutsiyasi.',
    ageGroup: '16-17 yosh',
    accentColor: 'from-rose-600 to-pink-700',
    stages: [
      {
        stageNumber: 1,
        stageType: 'basics',
        stageName: '1-etap: Boshlang‘ich bilimlar',
        title: 'Yorug‘likning to‘lqin va zarracha tabiati',
        description: 'Korpuskulyar-to‘lqin dualizmi',
        theory: 'Yorug‘lik ikkita tabiatga ega: tarqalishda u to‘lqin (interferensiya, difraksiya, qutblanish), moddalar bilan ta’sirlashganda esa zarrachalar (fotonlar oqimi) xossasini namoyon qiladi. Foton energiyasi: E = h × ν, bu yerda h = 6.626 × 10⁻³⁴ J·s (Plank doimiysi).',
        keyPoints: [
          'Plank formulasi: E = h ν',
          'Yorug‘lik tezligi: c = 3 × 10⁸ m/s',
          'To‘lqin uzunligi: λ = c / ν'
        ],
        examples: [
          { problem: 'Qizil va binafsha rangli nurlardan qaysi birining foton energiyasi katta?', solution: 'Binafsha rang chastotasi katta bo‘lgani uchun uning foton energiyasi yuqori.' }
        ],
        questions: [
          {
            id: 'g11_s1_q1',
            question: 'Foton energiyasi Plank formulasi bo‘yicha qanday hisoblanadi?',
            options: ['E = h ν', 'E = m g h', 'E = m v² / 2', 'E = q U'],
            correctIndex: 0,
            explanation: 'Plank kvant nazariyasiga ko‘ra E = h ν.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 2,
        stageType: 'concepts',
        stageName: '2-etap: Asosiy tushunchalar',
        title: 'Fotoeffekt va Eynshteyn tenglamasi',
        description: 'h ν = A_chiqish + (m v²_max)/2',
        theory: 'Yorug‘lik ta’sirida moddadan elektronlarning ajralib chiqishi fotoeffekt deyiladi. Eynshteynning fotoeffekt tenglamasi: tushayotgan foton energiyasi (hν) elektronning chiqish ishiga (A) va unga berilgan maksimal kinetik energiyaga sarflanadi.',
        keyPoints: [
          'Fotoeffekt uchun Eynshteyn 1921-yilda Nobel mukofotini olgan.',
          'Fotoeffekt qizil chegarasi: ν_0 = A / h',
          'Quyosh panellari fotoeffekt hodisasiga asoslangan.'
        ],
        examples: [
          { problem: 'Chiqish ishi 3 eV bo‘lgan metallga 5 eV energiyali foton tushsa, elektron qanday kinetik energiya oladi?', solution: 'E_k = 5 - 3 = 2 eV.' }
        ],
        questions: [
          {
            id: 'g11_s2_q1',
            question: 'Zamonaviy quyosh batareyalari qaysi fizik hodisaga asoslangan?',
            options: ['Fotoeffekt hodisasiga', 'Magnit induksiyasiga', 'Issiqlik konveksiyasiga', 'Diffuziyaga'],
            correctIndex: 0,
            explanation: 'Quyosh batareyalarida yorug‘lik to‘g‘ridan-to‘g‘ri fotoeffekt orqali elektr energiyasiga aylanadi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 3,
        stageType: 'formulas',
        stageName: '3-etap: Formulalar va masalalar',
        title: 'Massa va energiyaning ekvivalentligi',
        description: 'E = m c² va yadro reaksiyalari',
        theory: 'Albert Eynshteyn maxsus nisbiylik nazariyasida massa va to‘liq energiya o‘rtasidagi bog‘liqlikni kashf qildi: E = m c². Hatto 1 gramm modda to‘liq energiyaga aylansa, ulkan miqdordagi energiya ajraladi (atom stansiyalari va Quyosh nurlanishi).',
        keyPoints: [
          'E = m c²',
          'c = 300,000,000 m/s',
          'Massa defekti: Δm = [Z m_p + N m_n] - M_yadro',
          'Yadro bog‘lanish energiyasi: E_bog‘ = Δm c²'
        ],
        formulaName: 'Eynshteynning mashhur formula tenglamasi',
        formulaLatex: 'E = m \\cdot c^2',
        examples: [
          { problem: '1 kg tinch turgan moddaning to‘liq energiyasi qancha (c = 3×10⁸ m/s)?', solution: 'E = 1 × (3×10⁸)² = 9 × 10¹⁶ Joul!' }
        ],
        questions: [
          {
            id: 'g11_s3_q1',
            question: 'E = m c² formulasidagi "c" harfi nimani bildiradi?',
            options: ['Yorug‘likning vakuumdagi tezligini', 'Solishtirma issiqlik sig‘imini', 'Elektr zaryadini', 'Atom massasini'],
            correctIndex: 0,
            explanation: 'c — yorug‘likning vakuumdagi tezligi bo‘lib, taxminan 300,000 km/s ga teng.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 4,
        stageType: 'experiment',
        stageName: '4-etap: Amaliy tajribalar',
        title: 'Prizmada nurning sinishi va dispersiya',
        description: 'Oq yorug‘likning kamalak ranglariga ajralishi',
        theory: 'Nyuton prizma yordamida oq quyosh nurini 7 ta asosiy kamalak rangiga ajratgan (qizil, to‘q sariq, sariq, yashil, moviy, ko‘k, binafsha).',
        keyPoints: ['Qizil nur eng kam, binafsha nur eng ko‘p sinadi.'],
        experimentType: 'optics',
        experimentPrompt: 'Nurni prizma orqali o‘tkazib dispersiya hosil qiling!',
        examples: [],
        questions: [
          {
            id: 'g11_s4_q1',
            question: 'Oq yorug‘lik prizmadan o‘tganda qaysi rangdagi nur eng ko‘p sinadi?',
            options: ['Qizil', 'Sariq', 'Binafsha', 'Yashil'],
            correctIndex: 2,
            explanation: 'Binafsha rangning to‘lqin uzunligi qisqa bo‘lgani sababli sinish ko‘rsatkichi eng katta bo‘ladi.',
            points: 20
          }
        ]
      },
      {
        stageNumber: 5,
        stageType: 'exam',
        stageName: '5-etap: Yakuniy imtihon',
        title: '11-sinf bitiruv attestatsiyasi imtihoni',
        description: 'Maktab fizika kursining yakuniy sinovi',
        theory: 'Butun maktab fizika dasturi (1–11 sinf) bo‘yicha to‘liq sinovdan o‘ting.',
        keyPoints: ['E = mc²', 'Kvant fizikasi', 'Fotoeffekt', 'Yadro fizikasi va Quyosh energetikasi'],
        examples: [],
        questions: [
          {
            id: 'g11_s5_q1',
            question: 'Quyosh va yulduzlar markazida qanday jarayon hisobiga ulkan energiya ajralib chiqadi?',
            options: ['Termoyadroviy sintez (vodorodning geliyga aylanishi)', 'Ko‘mir va neft yonishi', 'Faqat gravitatsion siqilish', 'Kimyoviy portlashlar'],
            correctIndex: 0,
            explanation: 'Termoyadroviy sintez reaktsiyasida yengil vodorod yadrolari qo‘shilib geliy hosil qiladi va ulkan energiya ajraladi.',
            points: 25
          },
          {
            id: 'g11_s5_q2',
            question: 'Radioaktiv yemirilish turlaridan qaysi biri elektromagnit to‘lqin hisoblanadi?',
            options: ['Alfa nurlanish', 'Beta nurlanish', 'Gamma nurlanish', 'Neytron nurlanish'],
            correctIndex: 2,
            explanation: 'Gamma nurlanish — yuqori energiyali elektromagnit to‘lqindir.',
            points: 25
          }
        ]
      }
    ]
  }
];
