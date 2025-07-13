"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Plus, Edit, Trash2, Eye, Globe, Smartphone, Monitor, Search, TrendingUp, Users } from "lucide-react"
import { useAuthStore, useContentStore } from "@/lib/store"

export default function ContentManagement() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { pages, banners, seoSettings, updateSEO, createPage, updatePage } = useContentStore()

  const [isPageDialogOpen, setIsPageDialogOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<any>(null)
  const [newPage, setNewPage] = useState({
    title: "",
    slug: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const handleCreatePage = () => {
    if (editingPage) {
      updatePage(editingPage.id, newPage)
    } else {
      createPage(newPage)
    }

    setNewPage({
      title: "",
      slug: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      status: "draft",
    })
    setEditingPage(null)
    setIsPageDialogOpen(false)
  }

  const handleEditPage = (page: any) => {
    setEditingPage(page)
    setNewPage({
      title: page.title,
      slug: page.slug,
      content: page.content,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      status: page.status,
    })
    setIsPageDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 font-sarabun">Content Management</h1>
            <p className="text-gray-600 font-sarabun">จัดการเนื้อหาและ SEO ของเว็บไซต์</p>
          </div>
        </div>

        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="pages" className="font-sarabun">
              หน้าเว็บ
            </TabsTrigger>
            <TabsTrigger value="banners" className="font-sarabun">
              แบนเนอร์
            </TabsTrigger>
            <TabsTrigger value="seo" className="font-sarabun">
              SEO
            </TabsTrigger>
            <TabsTrigger value="analytics" className="font-sarabun">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="performance" className="font-sarabun">
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-sarabun">จัดการหน้าเว็บ</h2>

              <Dialog open={isPageDialogOpen} onOpenChange={setIsPageDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingPage(null)
                      setNewPage({
                        title: "",
                        slug: "",
                        content: "",
                        metaTitle: "",
                        metaDescription: "",
                        status: "draft",
                      })
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    สร้างหน้าใหม่
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-sarabun">{editingPage ? "แก้ไขหน้าเว็บ" : "สร้างหน้าเว็บใหม่"}</DialogTitle>
                    <DialogDescription className="font-sarabun">กรอกข้อมูลสำหรับหน้าเว็บ</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pageTitle" className="font-sarabun">
                          ชื่อหน้า
                        </Label>
                        <Input
                          id="pageTitle"
                          value={newPage.title}
                          onChange={(e) => setNewPage((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="เช่น เกี่ยวกับเรา"
                        />
                      </div>

                      <div>
                        <Label htmlFor="pageSlug" className="font-sarabun">
                          URL Slug
                        </Label>
                        <Input
                          id="pageSlug"
                          value={newPage.slug}
                          onChange={(e) => setNewPage((prev) => ({ ...prev, slug: e.target.value }))}
                          placeholder="เช่น about-us"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="pageContent" className="font-sarabun">
                        เนื้อหา
                      </Label>
                      <Textarea
                        id="pageContent"
                        value={newPage.content}
                        onChange={(e) => setNewPage((prev) => ({ ...prev, content: e.target.value }))}
                        rows={10}
                        placeholder="เขียนเนื้อหาหน้าเว็บ..."
                      />
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-bold mb-4 font-sarabun">SEO Settings</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="metaTitle" className="font-sarabun">
                            Meta Title
                          </Label>
                          <Input
                            id="metaTitle"
                            value={newPage.metaTitle}
                            onChange={(e) => setNewPage((prev) => ({ ...prev, metaTitle: e.target.value }))}
                            placeholder="ชื่อที่จะแสดงใน Google Search"
                          />
                          <p className="text-xs text-gray-500 mt-1">{newPage.metaTitle.length}/60 ตัวอักษร</p>
                        </div>

                        <div>
                          <Label htmlFor="metaDescription" className="font-sarabun">
                            Meta Description
                          </Label>
                          <Textarea
                            id="metaDescription"
                            value={newPage.metaDescription}
                            onChange={(e) => setNewPage((prev) => ({ ...prev, metaDescription: e.target.value }))}
                            rows={3}
                            placeholder="คำอธิบายที่จะแสดงใน Google Search"
                          />
                          <p className="text-xs text-gray-500 mt-1">{newPage.metaDescription.length}/160 ตัวอักษร</p>
                        </div>

                        <div>
                          <Label htmlFor="pageStatus" className="font-sarabun">
                            สถานะ
                          </Label>
                          <Select
                            value={newPage.status}
                            onValueChange={(value) => setNewPage((prev) => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsPageDialogOpen(false)}>
                        ยกเลิก
                      </Button>
                      <Button onClick={handleCreatePage}>{editingPage ? "บันทึกการแก้ไข" : "สร้างหน้า"}</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-sarabun">ชื่อหน้า</TableHead>
                      <TableHead className="font-sarabun">URL</TableHead>
                      <TableHead className="font-sarabun">สถานะ</TableHead>
                      <TableHead className="font-sarabun">อัพเดทล่าสุด</TableHead>
                      <TableHead className="font-sarabun">จัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell className="font-medium font-sarabun">{page.title}</TableCell>
                        <TableCell className="font-sarabun">/{page.slug}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              page.status === "published"
                                ? "default"
                                : page.status === "draft"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {page.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-sarabun">
                          {new Date(page.updatedAt).toLocaleDateString("th-TH")}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleEditPage(page)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banners" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-sarabun">จัดการแบนเนอร์</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มแบนเนอร์
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((banner) => (
                <Card key={banner.id}>
                  <CardHeader>
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg font-sarabun">{banner.title}</CardTitle>
                    <CardDescription className="font-sarabun">{banner.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant={banner.active ? "default" : "secondary"}>
                        {banner.active ? "Active" : "Inactive"}
                      </Badge>
                      <Switch checked={banner.active} />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="w-4 h-4 mr-2" />
                        แก้ไข
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-sarabun">SEO Settings</CardTitle>
                <CardDescription className="font-sarabun">ตั้งค่า SEO พื้นฐานสำหรับเว็บไซต์</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="siteTitle" className="font-sarabun">
                    Site Title
                  </Label>
                  <Input
                    id="siteTitle"
                    value={seoSettings.siteTitle}
                    onChange={(e) => updateSEO({ siteTitle: e.target.value })}
                    placeholder="ชื่อเว็บไซต์"
                  />
                </div>

                <div>
                  <Label htmlFor="siteDescription" className="font-sarabun">
                    Site Description
                  </Label>
                  <Textarea
                    id="siteDescription"
                    value={seoSettings.siteDescription}
                    onChange={(e) => updateSEO({ siteDescription: e.target.value })}
                    rows={3}
                    placeholder="คำอธิบายเว็บไซต์"
                  />
                </div>

                <div>
                  <Label htmlFor="keywords" className="font-sarabun">
                    Keywords
                  </Label>
                  <Input
                    id="keywords"
                    value={seoSettings.keywords}
                    onChange={(e) => updateSEO({ keywords: e.target.value })}
                    placeholder="คำค้นหา, คั่นด้วยจุลภาค"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ogTitle" className="font-sarabun">
                      Open Graph Title
                    </Label>
                    <Input
                      id="ogTitle"
                      value={seoSettings.ogTitle}
                      onChange={(e) => updateSEO({ ogTitle: e.target.value })}
                      placeholder="ชื่อสำหรับ Social Media"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ogImage" className="font-sarabun">
                      Open Graph Image URL
                    </Label>
                    <Input
                      id="ogImage"
                      value={seoSettings.ogImage}
                      onChange={(e) => updateSEO({ ogImage: e.target.value })}
                      placeholder="URL รูปภาพสำหรับ Social Media"
                    />
                  </div>
                </div>

                <Button>บันทึกการตั้งค่า SEO</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-sarabun">SEO Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Search className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">85</div>
                    <div className="text-sm text-gray-600 font-sarabun">SEO Score</div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">+23%</div>
                    <div className="text-sm text-gray-600 font-sarabun">Organic Traffic</div>
                  </div>

                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Users className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-sm text-gray-600 font-sarabun">Monthly Visitors</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium font-sarabun">Page Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45,231</div>
                  <p className="text-xs text-muted-foreground font-sarabun">+12% จากเดือนที่แล้ว</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium font-sarabun">Unique Visitors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,847</div>
                  <p className="text-xs text-muted-foreground font-sarabun">+8% จากเดือนที่แล้ว</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium font-sarabun">Bounce Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32.5%</div>
                  <p className="text-xs text-muted-foreground font-sarabun">-5% จากเดือนที่แล้ว</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium font-sarabun">Avg. Session</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2:34</div>
                  <p className="text-xs text-muted-foreground font-sarabun">+15s จากเดือนที่แล้ว</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-sarabun">Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-sarabun">หน้า</TableHead>
                      <TableHead className="font-sarabun">Views</TableHead>
                      <TableHead className="font-sarabun">Unique Views</TableHead>
                      <TableHead className="font-sarabun">Bounce Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-sarabun">/</TableCell>
                      <TableCell>15,234</TableCell>
                      <TableCell>12,847</TableCell>
                      <TableCell>28.5%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-sarabun">/products</TableCell>
                      <TableCell>8,945</TableCell>
                      <TableCell>7,234</TableCell>
                      <TableCell>35.2%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-sarabun">/products/conduit-body-lb</TableCell>
                      <TableCell>5,678</TableCell>
                      <TableCell>4,892</TableCell>
                      <TableCell>42.1%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <Monitor className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="font-sarabun">Desktop</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">92</div>
                  <p className="text-sm text-gray-600 font-sarabun">Performance Score</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-sarabun">FCP:</span>
                      <span>1.2s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sarabun">LCP:</span>
                      <span>2.1s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sarabun">CLS:</span>
                      <span>0.05</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Smartphone className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <CardTitle className="font-sarabun">Mobile</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">78</div>
                  <p className="text-sm text-gray-600 font-sarabun">Performance Score</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-sarabun">FCP:</span>
                      <span>2.1s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sarabun">LCP:</span>
                      <span>3.2s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sarabun">CLS:</span>
                      <span>0.12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Globe className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="font-sarabun">Overall</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">85</div>
                  <p className="text-sm text-gray-600 font-sarabun">Average Score</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-sarabun">SEO:</span>
                      <span className="text-green-600">95</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sarabun">Accessibility:</span>
                      <span className="text-green-600">88</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sarabun">Best Practices:</span>
                      <span className="text-yellow-600">82</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-sarabun">Performance Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-bold text-yellow-800 font-sarabun">Optimize Images</h4>
                      <p className="text-sm text-yellow-700 font-sarabun">
                        ลดขนาดรูปภาพเพื่อเพิ่มความเร็วในการโหลด สามารถประหยัดได้ 1.2s
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-bold text-blue-800 font-sarabun">Enable Compression</h4>
                      <p className="text-sm text-blue-700 font-sarabun">
                        เปิดใช้งาน Gzip compression เพื่อลดขนาดไฟล์ที่ส่งให้ผู้ใช้
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-bold text-green-800 font-sarabun">Minify CSS/JS</h4>
                      <p className="text-sm text-green-700 font-sarabun">
                        ลดขนาดไฟล์ CSS และ JavaScript เพื่อเพิ่มประสิทธิภาพ
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
