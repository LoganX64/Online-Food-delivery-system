# 🎨 UI Context (OKLCH Theme – Updated)

This document defines the visual design system for the multi-restaurant food ordering platform using **OKLCH color space**, aligned strictly with the **current implemented theme**.

This version reflects the **latest CSS variable setup**, including the updated radius.

---

# 🌈 Color System (OKLCH)

## ⚪ Base (Neutral – shadcn)

| Token | Value |
|------|------|
| background | oklch(1 0 0) |
| foreground | oklch(0.145 0 0) |
| card | oklch(1 0 0) |
| card-foreground | oklch(0.145 0 0) |
| popover | oklch(1 0 0) |
| popover-foreground | oklch(0.145 0 0) |

---

## 🧡 Primary

| Token | Value |
|------|------|
| primary | oklch(0.553 0.195 38.402) |
| primary-foreground | oklch(0.98 0.016 73.684) |

---

## 🌫️ Secondary

| Token | Value |
|------|------|
| secondary | oklch(0.967 0.001 286.375) |
| secondary-foreground | oklch(0.21 0.006 285.885) |

---

## 🪶 Muted / Accent

| Token | Value |
|------|------|
| muted | oklch(0.97 0 0) |
| muted-foreground | oklch(0.556 0 0) |
| accent | oklch(0.97 0 0) |
| accent-foreground | oklch(0.205 0 0) |

---

## 🚨 System

| Token | Value |
|------|------|
| destructive | oklch(0.577 0.245 27.325) |
| border | oklch(0.922 0 0) |
| input | oklch(0.922 0 0) |
| ring | oklch(0.708 0 0) |

---

## 📊 Charts

| Token | Value |
|------|------|
| chart-1 | oklch(0.837 0.128 66.29) |
| chart-2 | oklch(0.705 0.213 47.604) |
| chart-3 | oklch(0.646 0.222 41.116) |
| chart-4 | oklch(0.553 0.195 38.402) |
| chart-5 | oklch(0.47 0.157 37.304) |

---

## 📌 Sidebar

| Token | Value |
|------|------|
| sidebar | oklch(0.985 0 0) |
| sidebar-foreground | oklch(0.145 0 0) |
| sidebar-primary | oklch(0.646 0.222 41.116) |
| sidebar-primary-foreground | oklch(0.98 0.016 73.684) |
| sidebar-accent | oklch(0.97 0 0) |
| sidebar-accent-foreground | oklch(0.205 0 0) |
| sidebar-border | oklch(0.922 0 0) |
| sidebar-ring | oklch(0.708 0 0) |

---

# 🌙 Dark Mode

| Token | Value |
|------|------|
| background | oklch(0.145 0 0) |
| foreground | oklch(0.985 0 0) |
| card | oklch(0.205 0 0) |
| card-foreground | oklch(0.985 0 0) |
| popover | oklch(0.205 0 0) |
| popover-foreground | oklch(0.985 0 0) |
| primary | oklch(0.47 0.157 37.304) |
| primary-foreground | oklch(0.98 0.016 73.684) |
| secondary | oklch(0.274 0.006 286.033) |
| secondary-foreground | oklch(0.985 0 0) |
| muted | oklch(0.269 0 0) |
| muted-foreground | oklch(0.708 0 0) |
| accent | oklch(0.269 0 0) |
| accent-foreground | oklch(0.985 0 0) |
| destructive | oklch(0.704 0.191 22.216) |
| border | oklch(1 0 0 / 10%) |
| input | oklch(1 0 0 / 15%) |
| ring | oklch(0.556 0 0) |

---

# 📐 Radius

| Token | Value |
|------|------|
| radius | 0.45rem |

---

# ⚙️ Notes

- This is now a **pure shadcn-compatible token set**
- Uses **only implemented CSS variables**
- Fully aligned with your current codebase
- Updated radius for tighter UI (0.45rem)
- No extra design abstractions beyond what's defined in `:root` and `.dark`