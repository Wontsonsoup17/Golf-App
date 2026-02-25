// ==================== COURSE DATA ====================
const COURSES = [
  {
    id: 'sprain-lake', name: 'Sprain Lake',
    address: '290 E Grassy Sprain Rd, Yonkers, NY 10710', phone: '(914) 231-3481', par: 70,
    link: 'https://golf.westchestergov.com/sprain-lake/sprain_course-layout/#',
    overview: 'https://golf.westchestergov.com/wp-content/uploads/2022/01/sprain_layout.jpg',
    tees: {
      blue:  { label: 'Blue',  yards: 5950, rating: 68.7, slope: 125 },
      white: { label: 'White', yards: 5555, rating: 67.3, slope: 116 },
      gold:  { label: 'Gold',  yards: 4792, rating: 64.0, slope: 98  }
    },
    holes: [
      { num:1,  par:4, blue:359, white:339, gold:301, hcp:6,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-1.gif' },
      { num:2,  par:4, blue:380, white:360, gold:334, hcp:2,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-2.gif' },
      { num:3,  par:4, blue:358, white:328, gold:306, hcp:12, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-34.gif' },
      { num:4,  par:3, blue:135, white:130, gold:118, hcp:18, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-34.gif' },
      { num:5,  par:4, blue:300, white:276, gold:248, hcp:14, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-5.gif' },
      { num:6,  par:4, blue:320, white:281, gold:249, hcp:10, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-6.gif' },
      { num:7,  par:4, blue:386, white:370, gold:312, hcp:4,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-7.gif' },
      { num:8,  par:4, blue:346, white:318, gold:270, hcp:8,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-8.gif' },
      { num:9,  par:3, blue:170, white:155, gold:130, hcp:16, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-9.gif' },
      { num:10, par:5, blue:510, white:465, gold:415, hcp:7,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-10.gif' },
      { num:11, par:4, blue:347, white:311, gold:193, hcp:11, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-11.gif' },
      { num:12, par:4, blue:392, white:370, gold:250, hcp:5,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-1213.gif' },
      { num:13, par:3, blue:165, white:160, gold:135, hcp:17, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-1213.gif' },
      { num:14, par:4, blue:320, white:304, gold:270, hcp:13, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-14.gif' },
      { num:15, par:4, blue:414, white:390, gold:320, hcp:3,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-15.gif' },
      { num:16, par:3, blue:165, white:150, gold:144, hcp:15, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-16.gif' },
      { num:17, par:5, blue:455, white:433, gold:399, hcp:9,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-17.gif' },
      { num:18, par:4, blue:428, white:415, gold:398, hcp:1,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SprainLake_Hole-18.gif' }
    ]
  },
  {
    id: 'dunwoodie', name: 'Dunwoodie',
    address: '1 Wasylenko Ln, Yonkers, NY 10701', phone: '(914) 231-3490', par: 70,
    link: 'https://golf.westchestergov.com/dunwoodie/dunwoodie-course-layout/',
    overview: 'https://golf.westchestergov.com/wp-content/uploads/2021/04/course_dunwoodie.png',
    tees: {
      black: { label: 'Black', yards: 5622, rating: 67.4, slope: 120 },
      blue:  { label: 'Blue',  yards: 5254, rating: 65.5, slope: 115 },
      green: { label: 'Green', yards: 4484, rating: 62.5, slope: 106 }
    },
    holes: [
      { num:1,  par:4, black:263, blue:235, green:213, hcp:13, img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/01dunwoodie.gif' },
      { num:2,  par:4, black:320, blue:296, green:282, hcp:9,  img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/02dunwoodie.gif' },
      { num:3,  par:4, black:362, blue:338, green:251, hcp:7,  img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/03dunwoodie.gif' },
      { num:4,  par:4, black:370, blue:319, green:295, hcp:1,  img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/04dunwoodie.gif' },
      { num:5,  par:4, black:321, blue:294, green:287, hcp:5,  img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/05dunwoodie.gif' },
      { num:6,  par:5, black:506, blue:483, green:355, hcp:11, img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/06dunwoodie.gif' },
      { num:7,  par:3, black:162, blue:148, green:128, hcp:17, img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/07dunwoodie.gif' },
      { num:8,  par:4, black:375, blue:343, green:284, hcp:3,  img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/08dunwoodie.gif' },
      { num:9,  par:4, black:237, blue:232, green:213, hcp:15, img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/09dunwoodie.gif' },
      { num:10, par:3, black:165, blue:151, green:124, hcp:14, img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/10dunwoodie.gif' },
      { num:11, par:5, black:483, blue:469, green:355, hcp:8,  img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/11dunwoodie.gif' },
      { num:12, par:3, black:128, blue:122, green:117, hcp:16, img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/12-13-dunwoodie.gif' },
      { num:13, par:4, black:316, blue:302, green:245, hcp:6,  img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/12-13-dunwoodie.gif' },
      { num:14, par:3, black:158, blue:148, green:135, hcp:12, img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/14dunwoodie.gif' },
      { num:15, par:4, black:394, blue:371, green:335, hcp:4,  img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/15dunwoodie.gif' },
      { num:16, par:5, black:503, blue:485, green:397, hcp:10, img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/16dunwoodie.gif' },
      { num:17, par:4, black:402, blue:385, green:342, hcp:2,  img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/17dunwoodie.gif' },
      { num:18, par:3, black:157, blue:133, green:126, hcp:18, img:'https://golf.westchestergov.com/wp-content/uploads/2020/09/18dunwoodie.gif' }
    ]
  },
  {
    id: 'saxon-woods', name: 'Saxon Woods',
    address: '315 Mamaroneck Rd, Scarsdale, NY', phone: '(914) 231-3461', par: 72,
    link: 'https://golf.westchestergov.com/saxon-woods/saxon_course-layout/',
    overview: 'https://golf.westchestergov.com/wp-content/uploads/2022/01/saxon_layout1.jpg',
    tees: {
      blue:  { label: 'Blue',  yards: 6300, rating: 71.4, slope: 126 },
      white: { label: 'White', yards: 6038, rating: 69.5, slope: 122 },
      gold:  { label: 'Gold',  yards: 5375, rating: 66.0, slope: 113 }
    },
    holes: [
      { num:1,  par:4, blue:315, white:300, gold:270, hcp:11, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-1.gif' },
      { num:2,  par:4, blue:300, white:285, gold:260, hcp:9,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-2.gif' },
      { num:3,  par:5, blue:511, white:495, gold:450, hcp:3,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-34.gif' },
      { num:4,  par:3, blue:168, white:155, gold:135, hcp:17, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-34.gif' },
      { num:5,  par:4, blue:390, white:375, gold:340, hcp:1,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-5.gif' },
      { num:6,  par:4, blue:311, white:295, gold:265, hcp:13, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-6.gif' },
      { num:7,  par:3, blue:168, white:155, gold:135, hcp:15, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-7.gif' },
      { num:8,  par:5, blue:508, white:490, gold:445, hcp:5,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-8.gif' },
      { num:9,  par:4, blue:366, white:350, gold:320, hcp:7,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-9.gif' },
      { num:10, par:4, blue:460, white:440, gold:395, hcp:4,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-10.gif' },
      { num:11, par:4, blue:308, white:290, gold:265, hcp:14, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-11.gif' },
      { num:12, par:4, blue:380, white:365, gold:330, hcp:8,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-1213.gif' },
      { num:13, par:5, blue:460, white:445, gold:405, hcp:6,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-1213.gif' },
      { num:14, par:4, blue:366, white:350, gold:315, hcp:12, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-14.gif' },
      { num:15, par:4, blue:375, white:360, gold:325, hcp:10, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-15.gif' },
      { num:16, par:3, blue:152, white:140, gold:120, hcp:18, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-16.gif' },
      { num:17, par:4, blue:402, white:385, gold:350, hcp:2,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-17.gif' },
      { num:18, par:4, blue:360, white:345, gold:315, hcp:16, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/SaxonWoods_Hole-18.gif' }
    ]
  },
  {
    id: 'hudson-hills', name: 'Hudson Hills',
    address: '400 Croton Dam Rd, Ossining, NY', phone: '(914) 864-3000', par: 71,
    link: 'https://golf.westchestergov.com/hudson-hills/',
    overview: 'https://golf.westchestergov.com/wp-content/uploads/2021/08/hudson-hills-course.jpg',
    tees: {
      black: { label: 'Black', yards: 6935, rating: 74.0, slope: 136 },
      green: { label: 'Green', yards: 6324, rating: 71.2, slope: 130 },
      blue:  { label: 'Blue',  yards: 5555, rating: 67.8, slope: 123 },
      gold:  { label: 'Gold',  yards: 5102, rating: 70.7, slope: 127 }
    },
    holes: [
      { num:1,  par:4, black:444, green:405, blue:372, gold:300, hcp:7,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-1.jpg' },
      { num:2,  par:5, black:530, green:502, blue:469, gold:427, hcp:5,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-2.jpg' },
      { num:3,  par:3, black:171, green:151, blue:135, gold:119, hcp:17, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-3.jpg' },
      { num:4,  par:4, black:456, green:423, blue:393, gold:324, hcp:3,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-4.jpg' },
      { num:5,  par:4, black:371, green:340, blue:285, gold:275, hcp:11, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-5.jpg' },
      { num:6,  par:3, black:155, green:127, blue:107, gold:85,  hcp:15, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-6.jpg' },
      { num:7,  par:5, black:564, green:514, blue:490, gold:455, hcp:1,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-7.jpg' },
      { num:8,  par:4, black:389, green:369, blue:326, gold:287, hcp:9,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-8.jpg' },
      { num:9,  par:3, black:152, green:138, blue:122, gold:105, hcp:13, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-9.jpg' },
      { num:10, par:5, black:521, green:491, blue:452, gold:413, hcp:8,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-10.jpg' },
      { num:11, par:3, black:200, green:174, blue:151, gold:120, hcp:16, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-11.jpg' },
      { num:12, par:4, black:435, green:400, blue:362, gold:313, hcp:4,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-12.jpg' },
      { num:13, par:4, black:474, green:424, blue:380, gold:337, hcp:6,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-13.jpg' },
      { num:14, par:3, black:187, green:163, blue:140, gold:97,  hcp:18, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-14.jpg' },
      { num:15, par:5, black:568, green:532, blue:502, gold:464, hcp:2,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-15.jpg' },
      { num:16, par:4, black:407, green:375, blue:351, gold:324, hcp:14, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-16.jpg' },
      { num:17, par:4, black:458, green:393, blue:348, gold:316, hcp:12, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-17.jpg' },
      { num:18, par:4, black:453, green:403, blue:370, gold:341, hcp:10, img:'https://golf.westchestergov.com/wp-content/uploads/2021/08/HudsonHills_Hole-18.jpg' }
    ]
  },
  {
    id: 'mohansic', name: 'Mohansic',
    address: '1500 Baldwin Rd, Yorktown Heights, NY 10598', phone: '(914) 862-5283', par: 70,
    link: 'https://golf.westchestergov.com/mohansic/mohansic-course-layout/',
    overview: 'https://golf.westchestergov.com/wp-content/uploads/2021/04/mohansic-course.jpg',
    tees: {
      white: { label: 'White', yards: 6548, rating: 72.5, slope: 133 },
      blue:  { label: 'Blue',  yards: 6285, rating: 70.7, slope: 130 },
      red:   { label: 'Red',   yards: 5456, rating: 72.6, slope: 125 }
    },
    holes: [
      { num:1,  par:4, white:353, blue:340, red:310, hcp:13, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/01mohansic.gif' },
      { num:2,  par:4, white:382, blue:370, red:330, hcp:7,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/02mohansic.gif' },
      { num:3,  par:4, white:425, blue:410, red:365, hcp:3,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/34-mohansic.gif' },
      { num:4,  par:4, white:442, blue:425, red:375, hcp:1,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/34-mohansic.gif' },
      { num:5,  par:3, white:140, blue:130, red:115, hcp:17, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/05mohansic.gif' },
      { num:6,  par:4, white:383, blue:370, red:325, hcp:9,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/06mohansic.gif' },
      { num:7,  par:3, white:168, blue:155, red:140, hcp:15, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/07mohansic.gif' },
      { num:8,  par:4, white:344, blue:330, red:295, hcp:11, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/08mohansic.gif' },
      { num:9,  par:5, white:592, blue:570, red:505, hcp:5,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/09mohansic.gif' },
      { num:10, par:5, white:495, blue:480, red:430, hcp:18, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/10mohansic.gif' },
      { num:11, par:4, white:428, blue:415, red:370, hcp:4,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/11mohansic.gif' },
      { num:12, par:4, white:395, blue:380, red:340, hcp:10, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/1213mohansic.gif' },
      { num:13, par:3, white:208, blue:195, red:165, hcp:14, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/1213mohansic.gif' },
      { num:14, par:4, white:432, blue:420, red:370, hcp:2,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/14mphansic.gif' },
      { num:15, par:4, white:373, blue:360, red:320, hcp:8,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/15mohansic.gif' },
      { num:16, par:4, white:395, blue:380, red:340, hcp:6,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/16mohansic.gif' },
      { num:17, par:4, white:402, blue:390, red:345, hcp:12, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/17mohansic.gif' },
      { num:18, par:3, white:191, blue:180, red:155, hcp:16, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/18mohansic.gif' }
    ]
  },
  {
    id: 'maple-moor', name: 'Maple Moor',
    address: '1128 North St, White Plains, NY 10605', phone: '(914) 995-9200', par: 71,
    link: 'https://golf.westchestergov.com/maple-moor/maple-moor_course-layout/',
    overview: 'https://golf.westchestergov.com/wp-content/uploads/2021/04/maple-moor-layout.jpg',
    tees: {
      blue:  { label: 'Blue',  yards: 6360, rating: 71.2, slope: 130 },
      white: { label: 'White', yards: 6065, rating: 69.4, slope: 128 },
      gold:  { label: 'Gold',  yards: 5645, rating: 65.0, slope: 117 },
      red:   { label: 'Red',   yards: 5289, rating: 72.0, slope: 127 }
    },
    holes: [
      { num:1,  par:4, blue:383, white:365, gold:340, red:320, hcp:7,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/01maplemoor.gif' },
      { num:2,  par:3, blue:190, white:175, gold:160, red:145, hcp:15, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/02maplemoor.gif' },
      { num:3,  par:5, blue:548, white:530, gold:490, red:460, hcp:3,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/34MapleMoor.gif' },
      { num:4,  par:4, blue:334, white:320, gold:295, red:275, hcp:17, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/34MapleMoor.gif' },
      { num:5,  par:4, blue:401, white:385, gold:355, red:335, hcp:9,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/05maplemoor.gif' },
      { num:6,  par:5, blue:470, white:455, gold:420, red:395, hcp:1,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/06maplemoor.gif' },
      { num:7,  par:3, blue:202, white:185, gold:170, red:155, hcp:13, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/07maplemoor.gif' },
      { num:8,  par:4, blue:378, white:360, gold:335, red:315, hcp:11, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/08maplemoor.gif' },
      { num:9,  par:4, blue:434, white:420, gold:390, red:365, hcp:5,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/09maplemoor.gif' },
      { num:10, par:4, blue:442, white:425, gold:395, red:370, hcp:6,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/10maplemoor.gif' },
      { num:11, par:3, blue:142, white:130, gold:115, red:100, hcp:18, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/11maplemoor.gif' },
      { num:12, par:5, blue:489, white:475, gold:445, red:420, hcp:16, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/1213maplemoor.gif' },
      { num:13, par:4, blue:265, white:250, gold:230, red:215, hcp:2,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/1213maplemoor.gif' },
      { num:14, par:4, blue:400, white:385, gold:355, red:335, hcp:8,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/14maplemoor.gif' },
      { num:15, par:3, blue:202, white:185, gold:165, red:150, hcp:10, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/15maplemoor.gif' },
      { num:16, par:4, blue:348, white:335, gold:310, red:290, hcp:12, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/16maplemoor.gif' },
      { num:17, par:4, blue:349, white:335, gold:310, red:290, hcp:14, img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/17maplemoor.gif' },
      { num:18, par:4, blue:383, white:370, gold:345, red:325, hcp:4,  img:'https://golf.westchestergov.com/wp-content/uploads/2021/04/18maplemooor.gif' }
    ]
  }
];

// ==================== STORAGE ====================
const STORAGE_KEY = 'westchester-golf-v2';

function loadRounds() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved).rounds || [];
    // migrate from v1
    const old = localStorage.getItem('westchester-golf-tracker');
    if (old) {
      const parsed = JSON.parse(old);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ rounds: parsed.rounds || [] }));
      return parsed.rounds || [];
    }
  } catch(e) {}
  return [];
}

function saveRounds(rounds) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ rounds }));
}

function getActiveRound() {
  try {
    const data = localStorage.getItem('active-round-v2');
    return data ? JSON.parse(data) : null;
  } catch(e) { return null; }
}

function setActiveRound(round) {
  localStorage.setItem('active-round-v2', JSON.stringify(round));
}

function clearActiveRound() {
  localStorage.removeItem('active-round-v2');
}

function getCourse(courseId) {
  return COURSES.find(c => c.id === courseId);
}

// ==================== MOBILE KEYBOARD FIX ====================
// iOS standalone web apps auto-focus the first input on page load,
// which pops open the keyboard. Blur any focused input across multiple
// events and timings to catch all iOS auto-focus behaviors.
(function() {
  function blurActiveInput() {
    var el = document.activeElement;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT')) {
      el.blur();
    }
  }
  // Try on multiple events — iOS may auto-focus at different points
  document.addEventListener('DOMContentLoaded', blurActiveInput);
  window.addEventListener('load', blurActiveInput);
  window.addEventListener('pageshow', blurActiveInput);
  // Repeated checks to catch late auto-focus
  setTimeout(blurActiveInput, 50);
  setTimeout(blurActiveInput, 150);
  setTimeout(blurActiveInput, 300);
  setTimeout(blurActiveInput, 500);
})();

// ==================== HELPERS ====================
function getScoreClass(score, par) {
  if (!score) return '';
  const diff = score - par;
  if (diff <= -2) return 'eagle';
  if (diff === -1) return 'birdie';
  if (diff === 0) return 'par-score';
  if (diff === 1) return 'bogey';
  return 'double-plus';
}

function getScoreLabel(score, par) {
  if (!score) return '';
  const diff = score - par;
  if (diff <= -3) return 'Albatross';
  if (diff === -2) return 'Eagle';
  if (diff === -1) return 'Birdie';
  if (diff === 0) return 'Par';
  if (diff === 1) return 'Bogey';
  if (diff === 2) return 'Double';
  if (diff === 3) return 'Triple';
  return '+' + diff;
}

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });
}

function formatDiff(total, par) {
  const diff = total - par;
  if (diff === 0) return 'E';
  return diff > 0 ? '+' + diff : diff.toString();
}

// Create blank tracking data for a player (18 holes)
function createPlayerTracking() {
  return {
    putts: new Array(18).fill(0),
    fairway: new Array(18).fill(false),   // hit fairway?
    gir: new Array(18).fill(false),       // green in regulation?
    mulligans: new Array(18).fill(0),
    penalties: new Array(18).fill(0)
  };
}

// ==================== USER HEADER ====================
function renderUserHeader(user) {
  const header = document.getElementById('userHeader');
  if (!header || !user) return;
  const name = user.displayName || user.email.split('@')[0];
  const initial = name.charAt(0).toUpperCase();
  const avatarUrl = getUserAvatar(user.uid);
  const avatarContent = avatarUrl
    ? '<img src="' + avatarUrl + '" class="user-avatar-img">'
    : initial;
  header.innerHTML =
    '<div class="user-info">' +
      '<div class="user-avatar' + (avatarUrl ? ' has-image' : '') + '" onclick="document.getElementById(\'avatarInput\').click()" title="Change photo">' +
        avatarContent +
        '<div class="avatar-edit-hint">&#128247;</div>' +
      '</div>' +
      '<div><div class="user-name">' + name + '</div></div>' +
    '</div>' +
    '<input type="file" id="avatarInput" accept="image/*" style="display:none" onchange="handleAvatarUpload(this)">' +
    '<button class="signout-btn" onclick="signOut()">Sign Out</button>';
}

function handleAvatarUpload(input) {
  var file = input.files && input.files[0];
  if (!file) return;
  var user = getCurrentUser();
  if (!user) return;
  processProfileImage(file)
    .then(function(dataUrl) {
      setUserAvatar(user.uid, dataUrl);
      renderUserHeader(user);
    })
    .catch(function(err) {
      alert(err.message || 'Could not process image.');
    });
  input.value = '';
}

// ==================== NAV ====================
function renderBottomNav(activePage) {
  const nav = document.getElementById('bottomNav');
  if (!nav) return;
  var groupCode = localStorage.getItem('active-group-code');
  var liveHref = groupCode ? 'live-game.html?group=' + groupCode : 'live-game.html';
  var playHref = groupCode ? 'scorecard.html?group=' + groupCode : 'scorecard.html';
  const pages = [
    { id: 'courses', label: 'Courses', icon: '&#9971;', href: 'index.html' },
    { id: 'play',    label: 'Play',    icon: '&#127948;', href: playHref },
    { id: 'live',    label: 'Live',    icon: '&#127942;', href: liveHref },
    { id: 'history', label: 'History', icon: '&#128203;', href: 'history.html' },
    { id: 'stats',   label: 'Stats',   icon: '&#128202;', href: 'stats.html' }
  ];
  nav.innerHTML = pages.map(p => `
    <a href="${p.href}" class="${p.id === activePage ? 'active' : ''}">
      <span class="nav-icon">${p.icon}</span>
      ${p.label}
    </a>
  `).join('');
}

function renderActiveRoundBanner() {
  const banner = document.getElementById('activeRoundBanner');
  if (!banner) return;

  // Check for active group round first
  const groupCode = localStorage.getItem('active-group-code');
  if (groupCode) {
    banner.innerHTML = `
      <a href="scorecard.html?group=${groupCode}" class="active-round-banner">
        <span>&#127948; Live Group Round [${groupCode}]</span>
        <span>Resume &rarr;</span>
      </a>
    `;
    return;
  }

  // Check for solo active round
  const active = getActiveRound();
  if (active) {
    const course = getCourse(active.courseId);
    const holesScored = active.players.reduce((max, p) => {
      const count = active.scores[p].filter(s => s > 0).length;
      return Math.max(max, count);
    }, 0);
    banner.innerHTML = `
      <a href="scorecard.html" class="active-round-banner">
        <span>&#127948; Live: ${course ? course.name : 'Round'} (${holesScored}/18)</span>
        <span>Resume &rarr;</span>
      </a>
    `;
  } else {
    banner.innerHTML = '';
  }
}

// ==================== PROFILE PICTURE ====================
function processProfileImage(file) {
  return new Promise(function(resolve, reject) {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please select an image file.'));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      reject(new Error('Image is too large. Please choose one under 10MB.'));
      return;
    }
    var reader = new FileReader();
    reader.onerror = function() { reject(new Error('Could not read file.')); };
    reader.onload = function(e) {
      var img = new Image();
      img.onerror = function() { reject(new Error('Could not load image.')); };
      img.onload = function() {
        var SIZE = 128;
        var canvas = document.createElement('canvas');
        canvas.width = SIZE;
        canvas.height = SIZE;
        var ctx = canvas.getContext('2d');
        // Center-crop to square
        var sx, sy, sSize;
        if (img.width > img.height) {
          sSize = img.height;
          sx = (img.width - sSize) / 2;
          sy = 0;
        } else {
          sSize = img.width;
          sx = 0;
          sy = (img.height - sSize) / 2;
        }
        ctx.drawImage(img, sx, sy, sSize, sSize, 0, 0, SIZE, SIZE);
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
