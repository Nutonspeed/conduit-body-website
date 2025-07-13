"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Grid, List } from "lucide-react"
import { products } from "@/lib/mockData"
import { FadeInSection, SlideInSection } from "@/components/AnimatedComponents"
import { useQuoteCartStore } from "@/lib/store"

type SortOption = "name" | "price-low" | "price-high" | "type"
type ViewMode = "grid" | "list"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const { addItem } = useQuoteCartStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState<SortOption>("name")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [filteredProducts, setFilteredProducts] = useState(products)

  const productTypes = [...new Set(products.map((p) => p.type))]
  const materials = [...new Set(products.map((p) => p.material))]
  const categories = [...new Set(products.map((p) => p.category))]

  useEffect(() => {
    // Handle URL parameters
    const typeParam = searchParams.get("type")
    const categoryParam = searchParams.get("category")

    if (typeParam) {
      setSelectedTypes([typeParam])
    }
    if (categoryParam) {
      setSelectedCategories([categoryParam])
    }
  }, [searchParams])

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type)
      const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(product.material)
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesPrice = product.basePrice >= priceRange[0] && product.basePrice <= priceRange[1]

      return matchesSearch && matchesType && matchesMaterial && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price-low":
          return a.basePrice - b.basePrice
        case "price-high":
          return b.basePrice - a.basePrice
        case "type":
          return a.type.localeCompare(b.type)
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [searchTerm, selectedTypes, selectedMaterials, selectedCategories, priceRange, sortBy])

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes((prev) => [...prev, type])
    } else {
      setSelectedTypes((prev) => prev.filter((t) => t !== type))
    }
  }

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setSelectedMaterials((prev) => [...prev, material])
    } else {
      setSelectedMaterials((prev) => prev.filter((m) => m !== material))
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category])
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category))
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTypes([])
    setSelectedMaterials([])
    setSelectedCategories([])
    setPriceRange([0, 2000])
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-sarabun">
              สินค้า O-Z/Gedney Conduit Body
            </h1>
            <p className="text-lg text-gray-600 font-sarabun">
              สินค้าคุณภาพสูงสำหรับงานไฟฟ้าอุตสาหกรรม จำหน่ายโดย KDP Engineering & Supply
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 font-sarabun">
                    <Filter className="w-5 h-5" />
                    ตัวกรอง
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    ล้างทั้งหมด
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium mb-2 font-sarabun">ค้นหา</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="ค้นหาสินค้า..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2 font-sarabun">
                    ช่วงราคา: ฿{priceRange[0].toLocaleString()} - ฿{priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                </div>

                {/* Product Types */}
                <div>
                  <label className="block text-sm font-medium mb-2 font-sarabun">ประเภทสินค้า</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {productTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                        />
                        <label htmlFor={`type-${type}`} className="text-sm font-sarabun cursor-pointer">
                          {type} ({products.filter((p) => p.type === type).length})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <label className="block text-sm font-medium mb-2 font-sarabun">วัสดุ</label>
                  <div className="space-y-2">
                    {materials.map((material) => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={`material-${material}`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={(checked) => handleMaterialChange(material, checked as boolean)}
                        />
                        <label htmlFor={`material-${material}`} className="text-sm font-sarabun cursor-pointer">
                          {material} ({products.filter((p) => p.material === material).length})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium mb-2 font-sarabun">หมวดหมู่</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
                        <label htmlFor={`category-${category}`} className="text-sm font-sarabun cursor-pointer">
                          {category} ({products.filter((p) => p.category === category).length})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 font-sarabun">
                  แสดง {filteredProducts.length} จาก {products.length} รายการ
                </span>
                {(selectedTypes.length > 0 || selectedMaterials.length > 0 || selectedCategories.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {selectedTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="font-sarabun">
                        {type}
                        <button onClick={() => handleTypeChange(type, false)} className="ml-1 hover:text-red-600">
                          ×
                        </button>
                      </Badge>
                    ))}
                    {selectedMaterials.map((material) => (
                      <Badge key={material} variant="secondary" className="font-sarabun">
                        {material}
                        <button
                          onClick={() => handleMaterialChange(material, false)}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {selectedCategories.map((category) => (
                      <Badge key={category} variant="secondary" className="font-sarabun">
                        {category}
                        <button
                          onClick={() => handleCategoryChange(category, false)}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">เรียงตามชื่อ</SelectItem>
                    <SelectItem value="price-low">ราคาต่ำ-สูง</SelectItem>
                    <SelectItem value="price-high">ราคาสูง-ต่ำ</SelectItem>
                    <SelectItem value="type">เรียงตามประเภท</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg font-sarabun">ไม่พบสินค้าที่ตรงกับเงื่อนไขการค้นหา</p>
                <Button onClick={clearFilters} className="mt-4">
                  ล้างตัวกรอง
                </Button>
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredProducts.map((product, index) => (
                  <SlideInSection key={product.id} delay={index * 50}>
                    {viewMode === "grid" ? (
                      <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                        <CardHeader className="p-4">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div className="flex gap-2 mb-2">
                            <Badge variant="outline">{product.type}</Badge>
                            <Badge variant="secondary">{product.material}</Badge>
                          </div>
                          <CardTitle className="text-lg font-sarabun line-clamp-2">{product.name}</CardTitle>
                          <CardDescription className="font-sarabun line-clamp-2">{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {product.sizes.slice(0, 4).map((size) => (
                                <Badge key={size} variant="secondary" className="text-xs">
                                  {size}"
                                </Badge>
                              ))}
                              {product.sizes.length > 4 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{product.sizes.length - 4}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xl font-bold text-blue-600 mb-4">
                              เริ่มต้น ฿{product.basePrice.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild className="flex-1" size="sm">
                              <Link href={`/products/${product.slug}`}>ดูรายละเอียด</Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                addItem({
                                  productId: product.id,
                                  productName: product.name,
                                  size: product.sizes[0],
                                  quantity: 1,
                                  price: product.basePrice,
                                })
                              }
                            >
                              เพิ่มลงคำขอ
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={96}
                                height={96}
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-2 mb-2">
                                <Badge variant="outline">{product.type}</Badge>
                                <Badge variant="secondary">{product.material}</Badge>
                                <Badge variant="outline">{product.category}</Badge>
                              </div>
                              <h3 className="text-lg font-semibold mb-2 font-sarabun">{product.name}</h3>
                              <p className="text-gray-600 text-sm mb-2 font-sarabun line-clamp-2">
                                {product.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {product.sizes.slice(0, 6).map((size) => (
                                  <Badge key={size} variant="secondary" className="text-xs">
                                    {size}"
                                  </Badge>
                                ))}
                                {product.sizes.length > 6 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{product.sizes.length - 6}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right flex flex-col justify-between">
                              <p className="text-xl font-bold text-blue-600">฿{product.basePrice.toLocaleString()}</p>
                              <div className="flex flex-col gap-2">
                                <Button asChild size="sm">
                                  <Link href={`/products/${product.slug}`}>ดูรายละเอียด</Link>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    addItem({
                                      productId: product.id,
                                      productName: product.name,
                                      size: product.sizes[0],
                                      quantity: 1,
                                      price: product.basePrice,
                                    })
                                  }
                                >
                                  เพิ่มลงคำขอ
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </SlideInSection>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
