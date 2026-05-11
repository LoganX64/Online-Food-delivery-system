# UI Context

This document defines the visual design system for the multi-restaurant food ordering platform. It establishes consistent rules for color usage, typography, spacing, and component styling to ensure a cohesive, modern, and minimal user experience across customer, restaurant, and admin interfaces.

The design follows a **shadcn-based neutral system with orange as the primary brand accent**, optimized for fast food discovery and checkout flows.

---

# 🎨 Color System

## 🌈 Base (Neutral – shadcn foundation)

| Token              | Purpose             | Hex       |
| ------------------ | ------------------- | --------- |
| `background`       | Main app background | `#FFFFFF` |
| `foreground`       | Primary text        | `#0F172A` |
| `card`             | Card background     | `#FFFFFF` |
| `card-foreground`  | Card text           | `#0F172A` |
| `muted`            | Subtle surfaces     | `#F1F5F9` |
| `muted-foreground` | Secondary text      | `#64748B` |
| `border`           | Default borders     | `#E2E8F0` |
| `input`            | Input borders       | `#E2E8F0` |
| `ring`             | Focus outline       | `#F97316` |

---

## 🧡 Primary Brand (Orange Theme)

| Token                | Purpose                | Hex       |
| -------------------- | ---------------------- | --------- |
| `primary`            | Main CTA / brand color | `#F97316` |
| `primary-foreground` | Text on primary        | `#FFFFFF` |
| `primary-hover`      | Hover state            | `#EA580C` |
| `primary-soft`       | Light background tint  | `#FFF7ED` |

---

## 🍽️ Secondary Accent

| Token                  | Purpose                 | Hex       |
| ---------------------- | ----------------------- | --------- |
| `secondary`            | Supporting accent       | `#FB923C` |
| `secondary-foreground` | Text on secondary       | `#FFFFFF` |
| `secondary-soft`       | Light accent background | `#FFF4E6` |

---

## 📊 Status Colors (System Feedback)

| Token              | Purpose                | Hex       |
| ------------------ | ---------------------- | --------- |
| `success`          | Delivered / success    | `#22C55E` |
| `success-soft`     | Soft green background  | `#DCFCE7` |
| `warning`          | Pending / attention    | `#FACC15` |
| `warning-soft`     | Soft yellow background | `#FEF9C3` |
| `destructive`      | Failed / cancelled     | `#EF4444` |
| `destructive-soft` | Soft red background    | `#FEE2E2` |
| `info`             | System info            | `#3B82F6` |
| `info-soft`        | Soft blue background   | `#DBEAFE` |

---

## 🍔 Food UI Accents

| Token            | Purpose                   | Hex       |
| ---------------- | ------------------------- | --------- |
| `food-highlight` | Featured food items       | `#F97316` |
| `food-soft`      | Food card background glow | `#FFF7ED` |
| `rating`         | Ratings / stars           | `#F59E0B` |
| `popular`        | Popular badge             | `#A855F7` |
| `discount`       | Offers / deals            | `#EC4899` |
| `footer-bg`     | Footer background         | `#FFF1EB` |

---

## 📊 Chart Colors (Analytics / Admin)

| Token     | Purpose         | Hex       |
| --------- | --------------- | --------- |
| `chart-1` | Primary chart   | `#F97316` |
| `chart-2` | Secondary chart | `#FB923C` |
| `chart-3` | Soft orange     | `#FDBA74` |
| `chart-4` | Light accent    | `#FED7AA` |
| `chart-5` | Background tint | `#FFEDD5` |

---

# ✍️ Typography System

## Font Family

| Role        | Font         |
| ----------- | ------------ |
| Headings    | `Geist`      |
| Body        | `Geist Mono` |
| UI Elements | `Geist`      |

---

## Type Scale

| Style       | Size    | Usage          |
| ----------- | ------- | -------------- |
| `text-xs`   | 12px    | labels, badges |
| `text-sm`   | 14px    | secondary text |
| `text-base` | 16px    | body text      |
| `text-lg`   | 18px    | section text   |
| `text-xl`   | 20–24px | headings       |
| `text-2xl+` | 28–40px | page titles    |

---

# 📐 Border Radius System

| Token         | Value | Usage                 |
| ------------- | ----- | --------------------- |
| `radius-sm`   | 6px   | inputs, small buttons |
| `radius`      | 8px   | default components    |
| `radius-md`   | 10px  | cards                 |
| `radius-lg`   | 14px  | containers            |
| `radius-xl`   | 18px  | modals                |
| `radius-full` | 999px | pills, avatars        |

---

# 🧩 Icon System

- Use `lucide-react` exclusively
- Icons must be:
  - stroke-based
  - consistent size (16px / 20px / 24px)
- No mixing with other icon libraries

---

# 🎯 UI Design Principles

- Minimal, clean SaaS layout (shadcn style)
- Orange is the only primary action color
- Strong visual hierarchy for food items and pricing
- Status colors must be instantly distinguishable
- Cards should be the primary UI building block
- Avoid visual clutter in listing and checkout flows

---

# 🧠 UX Intent

This system is optimized for:

- Fast food discovery
- Quick decision-making (browse → add → checkout)
- Clear order status visibility
- Multi-restaurant cart clarity
- Admin dashboard readability
- Restaurant operational efficiency

---

# ⚙️ Implementation Notes

- Built on **Tailwind CSS v4.2**
- Uses **shadcn/ui component system**
- Theme is based on **CSS variables (not hardcoded styles)**
- Fully compatible with React + React Router architecture
