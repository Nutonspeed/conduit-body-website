import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, VoicemailIcon as Fax } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">KDP</span>
              </div>
              <div>
                <div className="text-xl font-bold font-sarabun">KDP Engineering</div>
                <div className="text-sm text-gray-400 font-sarabun">& Supply Co., Ltd.</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4 font-sarabun">
              ผู้จำหน่าย O-Z/Gedney Conduit Body อย่างเป็นทางการ สำหรับงานไฟฟ้าอุตสาหกรรม มาตรฐาน UL และ NEMA
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-sarabun">เมนูหลัก</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors font-sarabun">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors font-sarabun">
                  สินค้า
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-gray-400 hover:text-white transition-colors font-sarabun">
                  สั่งซื้อ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors font-sarabun">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors font-sarabun">
                  ติดต่อ
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-sarabun">ประเภทสินค้า</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products?type=LB"
                  className="text-gray-400 hover:text-white transition-colors font-sarabun"
                >
                  Type LB
                </Link>
              </li>
              <li>
                <Link href="/products?type=C" className="text-gray-400 hover:text-white transition-colors font-sarabun">
                  Type C
                </Link>
              </li>
              <li>
                <Link href="/products?type=T" className="text-gray-400 hover:text-white transition-colors font-sarabun">
                  Type T
                </Link>
              </li>
              <li>
                <Link
                  href="/products?type=LL"
                  className="text-gray-400 hover:text-white transition-colors font-sarabun"
                >
                  Type LL
                </Link>
              </li>
              <li>
                <Link
                  href="/products?type=LR"
                  className="text-gray-400 hover:text-white transition-colors font-sarabun"
                >
                  Type LR
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Explosion-Proof"
                  className="text-gray-400 hover:text-white transition-colors font-sarabun"
                >
                  Explosion-Proof
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-sarabun">ติดต่อเรา</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 font-sarabun">0-2925-9633-4</span>
              </div>
              <div className="flex items-center space-x-3">
                <Fax className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 font-sarabun">0-2925-8815</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 font-sarabun">info@kdp.co.th</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <span className="text-gray-400 font-sarabun">
                  14/1763 หมู่ 13 ถนนกาญจนาภิเษก
                  <br />
                  ต.บางบัวทอง อ.บางบัวทอง
                  <br />
                  จ.นนทบุรี 11110
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400 font-sarabun">จันทร์-ศุกร์ 8:00-17:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-sarabun">© 2024 KDP Engineering & Supply Co., Ltd. สงวนลิขสิทธิ์.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors font-sarabun">
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors font-sarabun">
                ข้อกำหนดการใช้งาน
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors font-sarabun">
                แผนผังเว็บไซต์
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
