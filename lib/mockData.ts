export interface Product {
  id: string
  name: string
  description: string
  type: string
  material: string
  sizes: string[]
  basePrice: number
  slug: string
  image: string
  category: string
  subcategory?: string
  features: string[]
  applications: string[]
  certifications: string[]
}

export interface Lead {
  id: string
  customerName: string
  company?: string
  phone: string
  email: string
  address?: string
  productInterest: string
  size?: string
  quantity?: number
  notes?: string[]
  status: "รอติดต่อ" | "กำลังเจรจา" | "ปิดการขาย"
  createdAt: string
}

// ข้อมูลสินค้าครบถ้วนจากไฟล์ JSON พร้อมการจัดหมวดหมู่
export const products: Product[] = [
  // Explosion-Proof Series
  {
    id: "1",
    name: "Conduit Bodies - Explosion-Proof Type C",
    description: "Conduit Body แบบป้องกันการระเบิด Type C สำหรับงานอุตสาหกรรมหนัก ทนทานต่อสภาพแวดล้อมที่รุนแรง",
    type: "C",
    material: "Aluminum",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3", "4"],
    basePrice: 1250,
    slug: "conduit-bodies-explosion-proof-type-c",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645510095/Products/EGSMC100ACG/IMG_49445199_IDW_IMAGE_2d77fde0c55a6c826fdb7d2e00104a29b4910f599013803c078c2dc743779ab3.jpg",
    category: "Explosion-Proof",
    subcategory: "Type C",
    features: ["ป้องกันการระเบิด", "ทนทานต่อสภาพแวดล้อมรุนแรง", "วัสดุอลูมิเนียมคุณภาพสูง"],
    applications: ["โรงงานเคมี", "โรงกลั่นน้ำมัน", "พื้นที่เสี่ยงต่อการระเบิด"],
    certifications: ["UL Listed", "NEMA Standard", "Explosion-Proof Certified"],
  },
  {
    id: "2",
    name: "Conduit Bodies - Explosion-Proof Type LB",
    description: "Conduit Body แบบป้องกันการระเบิด Type LB สำหรับงานอุตสาหกรรมหนัก",
    type: "LB",
    material: "Aluminum",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3", "4"],
    basePrice: 1350,
    slug: "conduit-bodies-explosion-proof-type-lb",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645510095/Products/EGSMC100ACG/IMG_49445199_IDW_IMAGE_2d77fde0c55a6c826fdb7d2e00104a29b4910f599013803c078c2dc743779ab3.jpg",
    category: "Explosion-Proof",
    subcategory: "Type LB",
    features: ["ป้องกันการระเบิด", "เปลี่ยนทิศทางได้", "ทนทานสูง"],
    applications: ["โรงงานเคมี", "โรงกลั่นน้ำมัน", "พื้นที่เสี่ยงต่อการระเบิด"],
    certifications: ["UL Listed", "NEMA Standard", "Explosion-Proof Certified"],
  },

  // Standard Type C Series
  {
    id: "3",
    name: "Conduit Bodies - Type C Standard",
    description: "Conduit Body แบบ C เหมาะสำหรับการเชื่อมต่อท่อร้อยสายไฟแบบตรง ติดตั้งง่าย",
    type: "C",
    material: "Aluminum",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3", "4"],
    basePrice: 380,
    slug: "conduit-bodies-type-c-standard",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645511625/Products/EGSMC100/IMG_49444383_IDW_IMAGE_512ab2473abe920fef83da8864935dda2a610bccc610e480e963402e27a51d18.jpg",
    category: "Standard",
    subcategory: "Type C",
    features: ["เชื่อมต่อแบบตรง", "ติดตั้งง่าย", "วัสดุอลูมิเนียม"],
    applications: ["อาคารสำนักงาน", "โรงงานทั่วไป", "งานไฟฟ้าภายในอาคาร"],
    certifications: ["UL Listed", "NEMA Standard"],
  },
  {
    id: "4",
    name: "Conduit Bodies - Type C Heavy Duty",
    description: "Conduit Body แบบ C สำหรับงานหนัก ทนทานพิเศษ",
    type: "C",
    material: "Iron",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2"],
    basePrice: 320,
    slug: "conduit-bodies-type-c-heavy-duty",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645511625/Products/EGSMC100/IMG_49444383_IDW_IMAGE_512ab2473abe920fef83da8864935dda2a610bccc610e480e963402e27a51d18.jpg",
    category: "Heavy Duty",
    subcategory: "Type C",
    features: ["วัสดุเหล็ก", "ทนทานพิเศษ", "ราคาประหยัด"],
    applications: ["โรงงานอุตสาหกรรม", "งานก่อสร้าง", "พื้นที่กลางแจ้ง"],
    certifications: ["UL Listed", "NEMA Standard"],
  },

  // Type LB Series
  {
    id: "5",
    name: "Conduit Bodies - Type LB Premium",
    description: "Conduit Body แบบ LB สำหรับงานไฟฟ้าอุตสาหกรรม ทนทานต่อสภาพแวดล้อม มาตรฐาน UL",
    type: "LB",
    material: "Aluminum",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3", "3-1/2", "4"],
    basePrice: 450,
    slug: "conduit-bodies-type-lb-premium",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645510069/Products/EGSMLB100/IMG_49446327_IDW_IMAGE_aa8a4665eaff920149934aa899ec1ec11d1b2d44cf0cd451a22cdb3e2eea59cf.jpg",
    category: "Premium",
    subcategory: "Type LB",
    features: ["เปลี่ยนทิศทาง 90 องศา", "ฝาเปิดได้", "วัสดุอลูมิเนียมคุณภาพสูง"],
    applications: ["โรงงานอุตสาหกรรม", "อาคารสูง", "ระบบไฟฟ้าหลัก"],
    certifications: ["UL Listed", "NEMA Standard", "CSA Approved"],
  },
  {
    id: "6",
    name: "Conduit Bodies - Type LB Standard",
    description: "Conduit Body แบบ LB มาตรฐาน เหมาะสำหรับงานทั่วไป",
    type: "LB",
    material: "Iron",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2"],
    basePrice: 350,
    slug: "conduit-bodies-type-lb-standard",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645510069/Products/EGSMLB100/IMG_49446327_IDW_IMAGE_aa8a4665eaff920149934aa899ec1ec11d1b2d44cf0cd451a22cdb3e2eea59cf.jpg",
    category: "Standard",
    subcategory: "Type LB",
    features: ["เปลี่ยนทิศทาง 90 องศา", "วัสดุเหล็ก", "ราคาประหยัด"],
    applications: ["อาคารพาณิชย์", "โรงงานขนาดเล็ก", "งานบ้านอยู่อาศัย"],
    certifications: ["UL Listed", "NEMA Standard"],
  },

  // Type LL Series
  {
    id: "7",
    name: "Conduit Bodies - Type LL Premium",
    description: "Conduit Body แบบ LL สำหรับการเปลี่ยนทิศทางท่อแบบโค้ง ออกแบบเพื่อความสะดวกในการติดตั้ง",
    type: "LL",
    material: "Aluminum",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3"],
    basePrice: 480,
    slug: "conduit-bodies-type-ll-premium",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645510044/Products/EGSMLL100/IMG_49446444_IDW_IMAGE_9ba1e9a2da872b3cb2446bf7f4cb7270fdfac9748e174bc4a9edb7f83c9c1e82.jpg",
    category: "Premium",
    subcategory: "Type LL",
    features: ["เปลี่ยนทิศทางแบบโค้ง", "ลดการสูญเสียสัญญาณ", "ติดตั้งง่าย"],
    applications: ["ระบบสื่อสาร", "งานไฟฟ้าแรงสูง", "โรงงานอิเล็กทรอนิกส์"],
    certifications: ["UL Listed", "NEMA Standard", "CSA Approved"],
  },
  {
    id: "8",
    name: "Conduit Bodies - Type LL Standard",
    description: "Conduit Body แบบ LL มาตรฐาน สำหรับงานทั่วไป",
    type: "LL",
    material: "Iron",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2"],
    basePrice: 380,
    slug: "conduit-bodies-type-ll-standard",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645510044/Products/EGSMLL100/IMG_49446444_IDW_IMAGE_9ba1e9a2da872b3cb2446bf7f4cb7270fdfac9748e174bc4a9edb7f83c9c1e82.jpg",
    category: "Standard",
    subcategory: "Type LL",
    features: ["เปลี่ยนทิศทางแบบโค้ง", "วัสดุเหล็ก", "ราคาเหมาะสม"],
    applications: ["อาคารพาณิชย์", "โรงงานขนาดเล็ก", "งานบ้านอยู่อาศัย"],
    certifications: ["UL Listed", "NEMA Standard"],
  },

  // Type LR Series
  {
    id: "9",
    name: "Conduit Bodies - Type LR Premium",
    description: "Conduit Body แบบ LR สำหรับการเปลี่ยนทิศทางท่อไปทางขวา คุณภาพมาตรฐานสากล",
    type: "LR",
    material: "Aluminum",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3"],
    basePrice: 480,
    slug: "conduit-bodies-type-lr-premium",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645510916/Products/EGSMLR100/IMG_49446479_IDW_IMAGE_982d9b8f3dbe033b918fc068c45edf926ef12a3f7b62974e8d43fa25c0bbaff1.jpg",
    category: "Premium",
    subcategory: "Type LR",
    features: ["เปลี่ยนทิศทางไปทางขวา", "ฝาเปิดได้", "วัสดุอลูมิเนียมคุณภาพสูง"],
    applications: ["ระบบไฟฟ้าซับซ้อน", "โรงงานอุตสาหกรรม", "อาคารสูง"],
    certifications: ["UL Listed", "NEMA Standard", "CSA Approved"],
  },
  {
    id: "10",
    name: "Conduit Bodies - Type LR Standard",
    description: "Conduit Body แบบ LR มาตรฐาน เหมาะสำหรับงานทั่วไป",
    type: "LR",
    material: "Iron",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2"],
    basePrice: 380,
    slug: "conduit-bodies-type-lr-standard",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645510916/Products/EGSMLR100/IMG_49446479_IDW_IMAGE_982d9b8f3dbe033b918fc068c45edf926ef12a3f7b62974e8d43fa25c0bbaff1.jpg",
    category: "Standard",
    subcategory: "Type LR",
    features: ["เปลี่ยนทิศทางไปทางขวา", "วัสดุเหล็ก", "ราคาประหยัด"],
    applications: ["อาคารพาณิชย์", "โรงงานขนาดเล็ก", "งานบ้านอยู่อาศัย"],
    certifications: ["UL Listed", "NEMA Standard"],
  },

  // Type T Series
  {
    id: "11",
    name: "Conduit Bodies - Type T Premium",
    description: "Conduit Body แบบ T สำหรับการแยกสายไฟ 3 ทิศทาง เหมาะสำหรับงานระบบไฟฟ้าที่ซับซ้อน",
    type: "T",
    material: "Aluminum",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3", "4"],
    basePrice: 520,
    slug: "conduit-bodies-type-t-premium",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1718688021/Products/EGSMOZGT27/IMG_54630238_Z_Gedney_T17.jpg",
    category: "Premium",
    subcategory: "Type T",
    features: ["แยกสายไฟ 3 ทิศทาง", "ฝาเปิดได้", "วัสดุอลูมิเนียมคุณภาพสูง"],
    applications: ["ระบบไฟฟ้าหลัก", "โรงงานอุตสาหกรรม", "อาคารสูง"],
    certifications: ["UL Listed", "NEMA Standard", "CSA Approved"],
  },
  {
    id: "12",
    name: "Conduit Bodies - Type T Standard",
    description: "Conduit Body แบบ T มาตรฐาน สำหรับงานทั่วไป",
    type: "T",
    material: "Iron",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2"],
    basePrice: 420,
    slug: "conduit-bodies-type-t-standard",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1718688021/Products/EGSMOZGT27/IMG_54630238_Z_Gedney_T17.jpg",
    category: "Standard",
    subcategory: "Type T",
    features: ["แยกสายไฟ 3 ทิศทาง", "วัสดุเหล็ก", "ราคาเหมาะสม"],
    applications: ["อาคารพาณิชย์", "โรงงานขนาดเล็ก", "งานบ้านอยู่อาศัย"],
    certifications: ["UL Listed", "NEMA Standard"],
  },

  // Type TB Series
  {
    id: "13",
    name: "Conduit Bodies - Type TB Premium",
    description: "Conduit Body แบบ TB สำหรับงานพิเศษ ออกแบบเพื่อการใช้งานที่หลากหลาย",
    type: "TB",
    material: "Aluminum",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3"],
    basePrice: 580,
    slug: "conduit-bodies-type-tb-premium",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645511545/Products/EGSMTB100/IMG_49447163_IDW_IMAGE_f93320ac7280ea0110a9f9e64e437104d4ca2ff7a2bdc8417fb9d673787e45e9.jpg",
    category: "Premium",
    subcategory: "Type TB",
    features: ["งานพิเศษ", "ใช้งานหลากหลาย", "วัสดุอลูมิเนียมคุณภาพสูง"],
    applications: ["งานพิเศษ", "โรงงานอุตสาหกรรม", "ระบบไฟฟ้าซับซ้อน"],
    certifications: ["UL Listed", "NEMA Standard", "CSA Approved"],
  },
  {
    id: "14",
    name: "Conduit Bodies - Type TB Standard",
    description: "Conduit Body แบบ TB มาตรฐาน สำหรับงานทั่วไป",
    type: "TB",
    material: "Iron",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2"],
    basePrice: 480,
    slug: "conduit-bodies-type-tb-standard",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645511545/Products/EGSMTB100/IMG_49447163_IDW_IMAGE_f93320ac7280ea0110a9f9e64e437104d4ca2ff7a2bdc8417fb9d673787e45e9.jpg",
    category: "Standard",
    subcategory: "Type TB",
    features: ["งานพิเศษ", "วัสดุเหล็ก", "ราคาเหมาะสม"],
    applications: ["อาคารพาณิชย์", "โรงงานขนาดเล็ก", "งานบ้านอยู่อาศัย"],
    certifications: ["UL Listed", "NEMA Standard"],
  },

  // Type UB Series
  {
    id: "15",
    name: "Conduit Bodies - Type UB Premium",
    description: "Conduit Body แบบ UB สำหรับการใช้งานเฉพาะทาง ทนทานและใช้งานได้ยาวนาน",
    type: "UB",
    material: "Aluminum",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3"],
    basePrice: 620,
    slug: "conduit-bodies-type-ub-premium",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645510958/Products/EGSMUB6X125M/IMG_49447788_O_Z_Gedney_C8X_125MG.jpg",
    category: "Premium",
    subcategory: "Type UB",
    features: ["การใช้งานเฉพาะทาง", "ทนทานสูง", "วัสดุอลูมิเนียมคุณภาพสูง"],
    applications: ["งานเฉพาะทาง", "โรงงานอุตสาหกรรม", "ระบบไฟฟ้าพิเศษ"],
    certifications: ["UL Listed", "NEMA Standard", "CSA Approved"],
  },
  {
    id: "16",
    name: "Conduit Bodies - Type UB Standard",
    description: "Conduit Body แบบ UB มาตรฐาน สำหรับงานทั่วไป",
    type: "UB",
    material: "Iron",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2"],
    basePrice: 520,
    slug: "conduit-bodies-type-ub-standard",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645510958/Products/EGSMUB6X125M/IMG_49447788_O_Z_Gedney_C8X_125MG.jpg",
    category: "Standard",
    subcategory: "Type UB",
    features: ["การใช้งานเฉพาะทาง", "วัสดุเหล็ก", "ราคาเหมาะสม"],
    applications: ["อาคารพาณิชย์", "โรงงานขนาดเล็ก", "งานบ้านอยู่อาศัย"],
    certifications: ["UL Listed", "NEMA Standard"],
  },

  // Type X Series
  {
    id: "17",
    name: "Conduit Bodies - Type X Premium",
    description: "Conduit Body แบบ X สำหรับการเชื่อมต่อแบบไขว้ 4 ทิศทาง เหมาะสำหรับงานที่ซับซ้อน",
    type: "X",
    material: "Aluminum",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3"],
    basePrice: 750,
    slug: "conduit-bodies-type-x-premium",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645511612/Products/EGSMX100/IMG_49447809_IDW_IMAGE_f73729d3bc6cc9baf8c0cfd4720658f5736c9d3bfc21750fb0570c9a4a9dbc98.jpg",
    category: "Premium",
    subcategory: "Type X",
    features: ["เชื่อมต่อแบบไขว้ 4 ทิศทาง", "งานซับซ้อน", "วัสดุอลูมิเนียมคุณภาพสูง"],
    applications: ["ระบบไฟฟ้าซับซ้อน", "โรงงานอุตสาหกรรม", "อาคารสูง"],
    certifications: ["UL Listed", "NEMA Standard", "CSA Approved"],
  },
  {
    id: "18",
    name: "Conduit Bodies - Type X Standard",
    description: "Conduit Body แบบ X มาตรฐาน สำหรับงานทั่วไป",
    type: "X",
    material: "Iron",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2"],
    basePrice: 650,
    slug: "conduit-bodies-type-x-standard",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645511612/Products/EGSMX100/IMG_49447809_IDW_IMAGE_f73729d3bc6cc9baf8c0cfd4720658f5736c9d3bfc21750fb0570c9a4a9dbc98.jpg",
    category: "Standard",
    subcategory: "Type X",
    features: ["เชื่อมต่อแบบไขว้ 4 ทิศทาง", "วัสดุเหล็ก", "ราคาเหมาะสม"],
    applications: ["อาคารพาณิชย์", "โรงงานขนาดเล็ก", "งานบ้านอยู่อาศัย"],
    certifications: ["UL Listed", "NEMA Standard"],
  },

  // Covers Series
  {
    id: "19",
    name: "Conduit Body Covers - Premium",
    description: "ฝาปิด Conduit Body คุณภาพสูง ป้องกันฝุ่นและความชื้น เหมาะสำหรับการบำรุงรักษา",
    type: "Cover",
    material: "Aluminum",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3", "4"],
    basePrice: 150,
    slug: "conduit-body-covers-premium",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645511426/Products/EGSMBC100G/IMG_49444958_IDW_IMAGE_2d59c8962b7988491f6ada1278c6721564f10aee3b060bac87d329da5b5b37d5.jpg",
    category: "Accessories",
    subcategory: "Covers",
    features: ["ป้องกันฝุ่นและความชื้น", "เปิดปิดง่าย", "วัสดุอลูมิเนียม"],
    applications: ["การบำรุงรักษา", "ป้องกันสิ่งแวดล้อม", "งานทุกประเภท"],
    certifications: ["UL Listed", "NEMA Standard"],
  },
  {
    id: "20",
    name: "Conduit Body Covers - Standard",
    description: "ฝาปิด Conduit Body มาตรฐาน สำหรับงานทั่วไป",
    type: "Cover",
    material: "Iron",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3"],
    basePrice: 120,
    slug: "conduit-body-covers-standard",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645511426/Products/EGSMBC100G/IMG_49444958_IDW_IMAGE_2d59c8962b7988491f6ada1278c6721564f10aee3b060bac87d329da5b5b37d5.jpg",
    category: "Accessories",
    subcategory: "Covers",
    features: ["ป้องกันฝุ่นและความชื้น", "วัสดุเหล็ก", "ราคาประหยัด"],
    applications: ["การบำรุงรักษา", "งานทั่วไป", "อาคารพาณิชย์"],
    certifications: ["UL Listed", "NEMA Standard"],
  },

  // Gaskets Series
  {
    id: "21",
    name: "Conduit Body Gaskets - Premium",
    description: "ปะเก็น Conduit Body คุณภาพสูง ป้องกันการรั่วซึม ทนทานต่อสภาพอากาศ",
    type: "Gasket",
    material: "Rubber",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3", "4"],
    basePrice: 80,
    slug: "conduit-body-gaskets-premium",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1717565811/Products/EGSMMGC300/IMG_49446459_O_Z_Gedney_MKG100A.jpg",
    category: "Accessories",
    subcategory: "Gaskets",
    features: ["ป้องกันการรั่วซึม", "ทนทานต่อสภาพอากาศ", "ยางคุณภาพสูง"],
    applications: ["ป้องกันน้ำ", "งานกลางแจ้ง", "สภาพแวดล้อมรุนแรง"],
    certifications: ["UL Listed", "Weather Resistant"],
  },
  {
    id: "22",
    name: "Conduit Body Gaskets - Standard",
    description: "ปะเก็น Conduit Body มาตรฐาน สำหรับงานทั่วไป",
    type: "Gasket",
    material: "Rubber",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2", "2-1/2", "3"],
    basePrice: 60,
    slug: "conduit-body-gaskets-standard",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1717565811/Products/EGSMMGC300/IMG_49446459_O_Z_Gedney_MKG100A.jpg",
    category: "Accessories",
    subcategory: "Gaskets",
    features: ["ป้องกันการรั่วซึม", "ยางมาตรฐาน", "ราคาประหยัด"],
    applications: ["งานทั่วไป", "อาคารพาณิชย์", "โรงงานขนาดเล็ก"],
    certifications: ["UL Listed"],
  },

  // Stainless Steel Series
  {
    id: "23",
    name: "Conduit Bodies - Type C Stainless Steel",
    description: "Conduit Body แบบ C วัสดุสแตนเลส ทนทานต่อการกัดกร่อน",
    type: "C",
    material: "Stainless Steel",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2"],
    basePrice: 680,
    slug: "conduit-bodies-type-c-stainless-steel",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645511625/Products/EGSMC100/IMG_49444383_IDW_IMAGE_512ab2473abe920fef83da8864935dda2a610bccc610e480e963402e27a51d18.jpg",
    category: "Stainless Steel",
    subcategory: "Type C",
    features: ["ทนทานต่อการกัดกร่อน", "วัสดุสแตนเลส", "ใช้งานได้ยาวนาน"],
    applications: ["โรงงานอาหาร", "โรงงานเคมี", "สภาพแวดล้อมกัดกร่อน"],
    certifications: ["UL Listed", "NEMA Standard", "Food Grade"],
  },
  {
    id: "24",
    name: "Conduit Bodies - Type LB Stainless Steel",
    description: "Conduit Body แบบ LB วัสดุสแตนเลส ทนทานต่อการกัดกร่อน",
    type: "LB",
    material: "Stainless Steel",
    sizes: ["1/2", "3/4", "1", "1-1/4", "1-1/2", "2"],
    basePrice: 750,
    slug: "conduit-bodies-type-lb-stainless-steel",
    image:
      "https://res.cloudinary.com/mcrey/image/upload/f_auto,q_auto/w_190/v1645510069/Products/EGSMLB100/IMG_49446327_IDW_IMAGE_aa8a4665eaff920149934aa899ec1ec11d1b2d44cf0cd451a22cdb3e2eea59cf.jpg",
    category: "Stainless Steel",
    subcategory: "Type LB",
    features: ["ทนทานต่อการกัดกร่อน", "วัสดุสแตนเลส", "เปลี่ยนทิศทางได้"],
    applications: ["โรงงานอาหาร", "โรงงานเคมี", "สภาพแวดล้อมกัดกร่อน"],
    certifications: ["UL Listed", "NEMA Standard", "Food Grade"],
  },
]

export const mockLeads: Lead[] = [
  {
    id: "1",
    customerName: "สมชาย วิศวกร",
    company: "บริษัท ABC เอ็นจิเนียริ่ง จำกัด",
    phone: "081-234-5678",
    email: "somchai@abc-eng.com",
    address: "123 ถนนสุขุมวิท กรุงเทพฯ 10110",
    productInterest: "Conduit Bodies - Type LB Premium",
    size: "1",
    quantity: 50,
    notes: ["ลูกค้าสนใจสั่งซื้อจำนวนมาก", "ขอใบเสนอราคาพิเศษ"],
    status: "กำลังเจรจา",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    customerName: "นิรันดร์ ช่างไฟฟ้า",
    company: "บริษัท XYZ คอนสตรัคชั่น จำกัด",
    phone: "082-345-6789",
    email: "nirand@xyz-const.com",
    address: "456 ถนนพหลโยธิน นนทบุรี 11000",
    productInterest: "Conduit Bodies - Type C Standard",
    size: "3/4",
    quantity: 20,
    notes: ["ต้องการของเร็ว ภายใน 3 วัน"],
    status: "รอติดต่อ",
    createdAt: "2024-01-16T14:15:00Z",
  },
  {
    id: "3",
    customerName: "ประยุทธ์ หัวหน้าโครงการ",
    company: "บริษัท DEF อินดัสเตรียล จำกัด",
    phone: "083-456-7890",
    email: "prayuth@def-ind.com",
    productInterest: "Conduit Bodies - Type T Premium",
    size: "2",
    quantity: 10,
    notes: ["โครงการใหญ่ อาจสั่งเพิ่ม", "ปิดการขายเรียบร้อย ส่งของแล้ว"],
    status: "ปิดการขาย",
    createdAt: "2024-01-14T09:20:00Z",
  },
  {
    id: "4",
    customerName: "วิชัย ผู้จัดการ",
    company: "ห้างหุ้นส่วน GHI อิเล็คทริค",
    phone: "084-567-8901",
    email: "wichai@ghi-elec.com",
    productInterest: "Conduit Bodies - Type LL Premium",
    size: "1-1/2",
    quantity: 30,
    notes: ["ลูกค้าประจำ ให้ราคาพิเศษ"],
    status: "กำลังเจรจา",
    createdAt: "2024-01-17T11:45:00Z",
  },
  {
    id: "5",
    customerName: "สุรชัย ช่างเทคนิค",
    phone: "085-678-9012",
    email: "surachai@email.com",
    productInterest: "Conduit Bodies - Type LR Premium",
    size: "1/2",
    quantity: 5,
    notes: [],
    status: "รอติดต่อ",
    createdAt: "2024-01-18T16:30:00Z",
  },
]
