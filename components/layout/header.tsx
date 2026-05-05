"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { clinicInfo, mainNavItems } from "@/lib/data/clinic-info"

// Transform mainNavItems to remove dropdown for Doctors and Services
const transformedNavItems = mainNavItems.map((item) => {
  // Remove dropdown for "Доктора" / "Doctors"
  if (item.label === "Доктора" || item.label === "Doctors" || item.href === "/doctors") {
    return {
      ...item,
      children: undefined,
    }
  }
  // Remove dropdown for "Услуги" / "Services"
  if (item.label === "Услуги" || item.label === "Services" || item.href === "/services") {
    return {
      ...item,
      children: undefined,
    }
  }
  return item
})

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
            : "bg-background"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image
              src="/maya-clinic-logo.png"
              alt="Maya Clinic"
              width={180}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                {transformedNavItems.map((item) =>
                  item.children ? (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuTrigger className="bg-transparent data-[state=open]:bg-accent/50">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[240px] gap-1 p-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    "block select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors",
                                    "hover:bg-accent hover:text-accent-foreground",
                                    "focus:bg-accent focus:text-accent-foreground",
                                    pathname === child.href && "bg-accent/50 font-medium"
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-transparent",
                            pathname === item.href && "text-primary font-medium"
                          )}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Phone */}
            <a
              href={`tel:${clinicInfo.phone}`}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="h-4 w-4" />
              {clinicInfo.phone}
            </a>

            {/* Appointment Button */}
            <Button asChild size="default" className="gap-2">
              <Link href="/appointments">
                <Calendar className="h-4 w-4" />
                Записаться
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-accent lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-40 w-full max-w-sm transform overflow-y-auto border-l border-border bg-background shadow-xl transition-transform lg:hidden">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/maya-clinic-logo.png"
                  alt="Maya Clinic"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2 hover:bg-accent"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4">
              {transformedNavItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  item={item}
                  onClose={() => setMobileMenuOpen(false)}
                  pathname={pathname}
                />
              ))}
              <div className="mt-4 border-t border-border pt-4">
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Phone className="h-4 w-4" />
                  {clinicInfo.phone}
                </a>
                <Button asChild className="mt-3 w-full gap-2">
                  <Link href="/appointments" onClick={() => setMobileMenuOpen(false)}>
                    <Calendar className="h-4 w-4" />
                    Записаться
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}

function MobileNavItem({
  item,
  onClose,
  pathname,
}: {
  item: (typeof mainNavItems)[0]
  onClose: () => void
  pathname: string
}) {
  const [open, setOpen] = useState(false)

  if (item.children) {
    const isActive = item.children.some((child) => child.href === pathname)

    return (
      <div className="border-b border-border last:border-0">
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-accent",
            isActive && "text-primary"
          )}
          onClick={() => setOpen(!open)}
        >
          {item.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          />
        </button>
        {open && (
          <div className="ml-4 space-y-1 pb-2">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-foreground",
                  pathname === child.href
                    ? "bg-accent/50 font-medium text-primary"
                    : "text-muted-foreground"
                )}
                onClick={onClose}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "block rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-accent",
        pathname === item.href && "text-primary"
      )}
      onClick={onClose}
    >
      {item.label}
    </Link>
  )
}