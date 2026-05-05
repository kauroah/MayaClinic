"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/sections/page-header"
import { ServiceCard } from "@/components/cards/service-card"
import { CTASection } from "@/components/sections/cta-section"
import { services } from "@/lib/data/services"
import { 
  Search, 
  Stethoscope, 
  Filter, 
  X, 
  ChevronRight,
  Clock,
  Phone,
  ArrowUp,
  Grid3X3,
  List,
  SlidersHorizontal
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ServicesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Calculate total services from subServices
  const totalServices = useMemo(() => {
    return services.reduce((acc, service) => {
      if (service.subServices) {
        return acc + service.subServices.length
      }
      // External services count as 1
      if (service.externalBooking) {
        return acc + 1
      }
      return acc
    }, 0)
  }, [])

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(services.map((s) => s.category)))
  }, [])

  // Calculate services per category
  const servicesPerCategory = useMemo(() => {
    return categories.map(category => {
      const categoryServices = services.filter(s => s.category === category)
      const count = categoryServices.reduce((acc, service) => {
        if (service.subServices) {
          return acc + service.subServices.length
        }
        if (service.externalBooking) {
          return acc + 1
        }
        return acc
      }, 0)
      return { category, count }
    })
  }, [categories])

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    let filtered = services

    if (activeCategory) {
      filtered = filtered.filter(s => s.category === activeCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(service => {
        const matchesService = 
          service.name.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query)
        
        const matchesSubService = service.subServices?.some(sub =>
          sub.name.toLowerCase().includes(query) ||
          sub.group?.toLowerCase().includes(query)
        )

        return matchesService || matchesSubService
      })
    }

    return filtered
  }, [searchQuery, activeCategory])

  // Group filtered services by category
  const groupedServices = useMemo(() => {
    const categories = Array.from(new Set(filteredServices.map(s => s.category)))
    return categories.map(category => ({
      category,
      services: filteredServices.filter(s => s.category === category)
    }))
  }, [filteredServices])

  // Scroll handler with cleanup
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery("")
    setActiveCategory(null)
  }, [])

  return (
    <>
      <PageHeader
        title="Наши услуги"
        description="Комплексные медицинские услуги, разработанные для удовлетворения всех ваших потребностей под одной крышей. Наша опытная команда и современное оборудование гарантируют вам медицинскую помощь высочайшего качества."
        breadcrumbs={[{ label: "Услуги" }]}
      />

      {/* Quick Stats & Search Bar */}
      <section className="relative border-b border-border bg-linear-to-br from-primary/5 via-background to-primary/5">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {totalServices} медицинских услуг
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  В {categories.length} категориях • {services.length} направлений
                </p>
              </div>
            </div>
            
            {/* Search and Actions */}
            <div className="flex items-center gap-3 w-full lg:w-auto flex-col sm:flex-row">
              <div className="relative flex-1 lg:flex-none lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Поиск услуг или процедур..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-background border-border/50"
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
              
              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-accent">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "grid" ? "bg-background shadow-sm" : "hover:bg-background/50"
                  )}
                  title="Сетка"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "list" ? "bg-background shadow-sm" : "hover:bg-background/50"
                  )}
                  title="Список"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid with Sidebar Layout */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-8 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Категории
                  </h3>
                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                        !activeCategory 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "hover:bg-accent text-foreground/70 hover:text-foreground"
                      )}
                    >
                      <span>Все услуги</span>
                      <Badge variant="secondary" className="text-xs">{totalServices}</Badge>
                    </button>
                    {categories.map((category) => {
                      const categoryData = servicesPerCategory.find(c => c.category === category)
                      return (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category === activeCategory ? null : category)}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group",
                            category === activeCategory
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-accent text-foreground/70 hover:text-foreground"
                          )}
                        >
                          <span>{category}</span>
                          <Badge variant="secondary" className="text-xs">
                            {categoryData?.count || 0}
                          </Badge>
                        </button>
                      )
                    })}
                  </nav>
                </div>

                {/* Quick Contact Card */}
                <div className="p-4 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-sm">Нужна помощь?</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Наши специалисты помогут подобрать подходящую услугу и ответят на все вопросы
                  </p>
                  <a 
                    href="tel:+78435586052" 
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    +7 (843) 558-60-52
                  </a>
                </div>

                {/* Quick Stats */}
                <div className="p-4 rounded-xl bg-accent/50 border border-border/50">
                  <h4 className="font-semibold text-sm mb-3">Статистика клиники</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Направлений</span>
                      <span className="font-medium">{services.length}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Категорий</span>
                      <span className="font-medium">{categories.length}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Всего услуг</span>
                      <span className="font-medium">{totalServices}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile Category Filter */}
              <div className="lg:hidden mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Категории:</span>
                  {activeCategory && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveCategory(null)}
                      className="text-xs h-7"
                    >
                      Сбросить
                      <X className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "cursor-pointer transition-colors",
                      !activeCategory && "bg-primary/10 text-primary"
                    )}
                    onClick={() => setActiveCategory(null)}
                  >
                    Все ({totalServices})
                  </Badge>
                  {categories.map((category) => {
                    const categoryData = servicesPerCategory.find(c => c.category === category)
                    return (
                      <Badge 
                        key={category} 
                        variant="secondary" 
                        className={cn(
                          "cursor-pointer transition-colors",
                          category === activeCategory && "bg-primary/10 text-primary"
                        )}
                        onClick={() => setActiveCategory(category === activeCategory ? null : category)}
                      >
                        {category} ({categoryData?.count || 0})
                      </Badge>
                    )
                  })}
                </div>
              </div>

              {/* Active Filters Indicator */}
              {(searchQuery || activeCategory) && (
                <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-accent/50">
                  <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Активные фильтры:</span>
                  {activeCategory && (
                    <Badge variant="secondary" className="gap-1">
                      {activeCategory}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setActiveCategory(null)}
                      />
                    </Badge>
                  )}
                  {searchQuery && (
                    <Badge variant="secondary" className="gap-1">
                      Поиск: {searchQuery}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setSearchQuery("")}
                      />
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground ml-auto">
                    Найдено: {filteredServices.length} направлений
                  </span>
                </div>
              )}

              {/* No Results */}
              {filteredServices.length === 0 && (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Услуги не найдены
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Попробуйте изменить параметры поиска или выберите другую категорию
                  </p>
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                  >
                    Сбросить все фильтры
                  </Button>
                </div>
              )}

              {/* Services by Category */}
              {groupedServices.map(({ category, services: categoryServices }) => (
                <div 
                  key={category} 
                  id={category.toLowerCase().replace(/\s+/g, '-')}
                  className="mb-12 last:mb-0 scroll-mt-20"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-primary rounded-full" />
                      <div>
                        <h2 className="text-xl font-bold text-foreground">
                          {category}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {categoryServices.length} {categoryServices.length === 1 ? 'направление' : categoryServices.length >= 2 && categoryServices.length <= 4 ? 'направления' : 'направлений'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/prices`)}
                      className="hidden sm:flex items-center gap-1"
                    >
                      Все услуги
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Responsive Grid - Removed variant prop */}
                  <div className={cn(
                    viewMode === "grid" 
                      ? "grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid gap-4 sm:gap-6 grid-cols-1"
                  )}>
                    {categoryServices.map((service, index) => (
                      <div 
                        key={service.id} 
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <ServiceCard service={service} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50 animate-fade-in"
          aria-label="Вернуться наверх"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <CTASection
        title="Нужна помощь в выборе подходящей услуги?"
        description="Наша команда готова помочь вам найти лучшее медицинское решение для ваших потребностей."
        primaryButtonText="Записаться на консультацию"
      />
    </>
  )
}