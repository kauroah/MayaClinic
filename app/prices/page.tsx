// app/prices/page.tsx
"use client"

import { useState, useMemo, useCallback } from "react"
import { PageHeader } from "@/components/sections/page-header"
import { CTASection } from "@/components/sections/cta-section"
import { prices, priceCategories, type PriceItem } from "@/lib/data/prices"
import { Search, Filter, X, ChevronDown, ChevronRight, Phone, Download, Printer } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Icons mapping for categories
const iconMap: Record<string, React.ReactNode> = {
  Syringe: <span className="text-xl">💉</span>,
  HeartPulse: <span className="text-xl">❤️</span>,
  Activity: <span className="text-xl">🖐️</span>,
  Droplet: <span className="text-xl">💧</span>,
  Shield: <span className="text-xl">🛡️</span>,
  Ear: <span className="text-xl">👂</span>,
  Scalpel: <span className="text-xl">🔪</span>,
  Stethoscope: <span className="text-xl">🩺</span>,
  Bone: <span className="text-xl">🦴</span>,
  TestTube: <span className="text-xl">🧪</span>,
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

export default function PricesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const [showAllPrices, setShowAllPrices] = useState(false)

  // Filter prices based on search and category
  const filteredPrices = useMemo(() => {
    let filtered = prices

    if (activeCategory) {
      filtered = filtered.filter(item => item.category === activeCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.group && item.group.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [searchQuery, activeCategory])

  // Group filtered prices by category and then by group
  const groupedPrices = useMemo(() => {
    const categoryMap = new Map<string, Map<string, PriceItem[]>>()
    
    filteredPrices.forEach(item => {
      if (!categoryMap.has(item.category)) {
        categoryMap.set(item.category, new Map())
      }
      const groupMap = categoryMap.get(item.category)!
      const group = item.group || "Без группы"
      if (!groupMap.has(group)) {
        groupMap.set(group, [])
      }
      groupMap.get(group)!.push(item)
    })

    return categoryMap
  }, [filteredPrices])

  // Get categories that have results
  const categoriesWithResults = useMemo(() => {
    return priceCategories.filter(cat => 
      filteredPrices.some(item => item.category === cat.name)
    )
  }, [filteredPrices])

  // Toggle group expansion
  const toggleGroup = useCallback((category: string, group: string) => {
    const key = `${category}-${group}`
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }, [])

  // Total prices count
  const totalPrices = prices.length
  const filteredCount = filteredPrices.length

  // Print functionality
  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <>
      <PageHeader
        title="Цены на услуги"
        description="Полный каталог цен на медицинские услуги в «Майя Клиник». Актуальные цены на все виды диагностики, лечения и хирургических вмешательств."
        breadcrumbs={[{ label: "Цены" }]}
      />

      {/* Search and Filter Bar */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по услугам и ценам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {filteredCount} из {totalPrices} услуг
              </Badge>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Печать
              </Button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            <Badge
              variant={!activeCategory ? "default" : "secondary"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setActiveCategory(null)}
            >
              Все категории
            </Badge>
            {priceCategories.map((category) => {
              const count = prices.filter(item => item.category === category.name).length
              return (
                <Badge
                  key={category.id}
                  variant={activeCategory === category.name ? "default" : "secondary"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setActiveCategory(category.name === activeCategory ? null : category.name)}
                >
                  {category.name} ({count})
                </Badge>
              )
            })}
          </div>
        </div>
      </section>

      {/* Prices Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* No Results */}
          {filteredPrices.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground mb-4">
                Попробуйте изменить параметры поиска
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory(null)
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          )}

          {/* Categories and Prices */}
          <div className="space-y-8">
            {Array.from(groupedPrices.entries()).map(([categoryName, groupMap]) => {
              const category = priceCategories.find(cat => cat.name === categoryName)
              
              return (
                <Card key={categoryName} className="overflow-hidden">
                  {/* Category Header */}
                  <div className="bg-linear-to-r from-primary/5 to-primary/10 px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {category && iconMap[category.icon] && (
                          <span className="text-2xl">{iconMap[category.icon]}</span>
                        )}
                        <div>
                          <h2 className="text-xl font-bold">{categoryName}</h2>
                          {category && (
                            <p className="text-sm text-muted-foreground">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveCategory(categoryName === activeCategory ? null : categoryName)}
                      >
                        {categoryName === activeCategory ? "Показать все" : "Только эта категория"}
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-0">
                    {Array.from(groupMap.entries()).map(([groupName, items]) => (
                      <div key={groupName} className="border-b last:border-b-0">
                        {/* Group Header */}
                        <button
                          onClick={() => toggleGroup(categoryName, groupName)}
                          className="w-full flex items-center justify-between px-6 py-3 hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {expandedGroups.has(`${categoryName}-${groupName}`) ? (
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className="font-medium text-sm">
                              {groupName}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {items.length}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            от {formatPrice(Math.min(...items.map(i => i.price)))}
                          </span>
                        </button>

                        {/* Price Items */}
                        {(expandedGroups.has(`${categoryName}-${groupName}`) || showAllPrices) && (
                          <div className="bg-accent/20">
                            {items.map((item, index) => (
                              <div
                                key={item.id}
                                className={cn(
                                  "flex items-center justify-between px-6 py-2.5 hover:bg-accent/30 transition-colors",
                                  index !== items.length - 1 && "border-b border-border/50"
                                )}
                              >
                                <span className="text-sm flex-1 mr-4">{item.name}</span>
                                <span className="text-sm font-semibold whitespace-nowrap">
                                  {formatPrice(item.price)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Show All Button */}
          {!showAllPrices && filteredPrices.length > 0 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => setShowAllPrices(true)}
              >
                Развернуть все цены
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-accent/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground text-center">
            * Цены, указанные на сайте, не являются публичной офертой и могут быть изменены. 
            Точную стоимость услуг уточняйте у администраторов клиники по телефону.
          </p>
        </div>
      </section>

      <CTASection
        title="Остались вопросы по ценам?"
        description="Позвоните нам для получения подробной консультации и уточнения стоимости интересующих вас услуг."
        primaryButtonText="Позвонить"
      />
    </>
  )
}