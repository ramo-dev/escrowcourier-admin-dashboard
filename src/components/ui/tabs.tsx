"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const [activeTabRect, setActiveTabRect] = useState({ left: 0, width: 0 })
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateActiveTabRect = () => {
      const activeTab = listRef.current?.querySelector('[data-state="active"]')
      if (activeTab && listRef.current) {
        const listRect = listRef.current.getBoundingClientRect()
        const tabRect = activeTab.getBoundingClientRect()
        
        setActiveTabRect({
          left: tabRect.left - listRect.left,
          width: tabRect.width
        })
      }
    }

    // Initial calculation
    const timer = setTimeout(updateActiveTabRect, 0)

    // Update on tab changes
    const observer = new MutationObserver(updateActiveTabRect)
    if (listRef.current) {
      observer.observe(listRef.current, {
        attributes: true,
        subtree: true,
        attributeFilter: ['data-state']
      })
    }

    // Update on resize
    window.addEventListener('resize', updateActiveTabRect)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      window.removeEventListener('resize', updateActiveTabRect)
    }
  }, [])

  return (
    <TabsPrimitive.List
      ref={(node) => {
        listRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      }}
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Animated background indicator */}
      <div
        className="absolute top-[3px] bottom-[3px] bg-background rounded-md shadow-sm transition-all duration-300 ease-out"
        style={{
          left: activeTabRect.left,
          width: activeTabRect.width,
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
      />
      {props.children}
    </TabsPrimitive.List>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-10 inline-flex h-[calc(100%-6px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out",
      "text-muted-foreground hover:text-foreground",
      "data-[state=active]:text-foreground data-[state=active]:shadow-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "flex-1 outline-none",
      "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-1 data-[state=active]:duration-300 data-[state=active]:ease-out py-4",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
