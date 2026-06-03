import { Card, CardContent } from "@/components/ui/card"
import { MailIcon, MapPinIcon, ShieldCheckIcon, PhoneIcon } from "lucide-react"

function PageLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-center">{title}</h1>
      <Card className="shadow-md border-primary/10">
        <CardContent className="p-6 md:p-10 flex flex-col gap-6 text-muted-foreground leading-relaxed">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

export function AboutUs() {
  return (
    <PageLayout title="About Us">
      <p>
        Welcome to <strong>FlavorSwift</strong>, your ultimate destination for ordering delicious food from your favorite local restaurants.
        We started with a simple mission: to make food delivery fast, reliable, and accessible for everyone.
      </p>
      <p>
        Whether you are craving late-night snacks or planning a massive family dinner, FlavorSwift bridges the gap between you and culinary excellence.
        Our dedicated team of developers, support agents, and delivery partners work around the clock to bring you the best experience possible.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-xl">
          <MapPinIcon className="size-8 text-primary mb-3" />
          <h3 className="font-bold text-foreground">Global Reach</h3>
          <p className="text-sm">Connecting thousands of restaurants across major cities worldwide.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-xl">
          <ShieldCheckIcon className="size-8 text-primary mb-3" />
          <h3 className="font-bold text-foreground">Quality Assured</h3>
          <p className="text-sm">We strictly vet all our partner restaurants to ensure food hygiene and quality.</p>
        </div>
      </div>
    </PageLayout>
  )
}

export function Careers() {
  return (
    <PageLayout title="Careers">
      <p className="text-lg text-foreground font-medium">Join our growing team!</p>
      <p>
        At FlavorSwift, we are always on the lookout for passionate, driven, and innovative individuals to help us build the future of food tech.
        Whether you're an engineer, designer, or operations expert, we have a place for you.
      </p>
      <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mt-6">
        <h3 className="text-xl font-bold text-foreground mb-2">How to Apply</h3>
        <p className="mb-4">
          Ready to make an impact? Send your resume, portfolio, and a brief cover letter directly to our hiring team:
        </p>
        <a href="mailto:loganxtream@gmail.com" className="flex items-center gap-2 text-primary font-bold hover:underline">
          <MailIcon className="size-5" /> loganxtream@gmail.com
        </a>
      </div>
    </PageLayout>
  )
}

export function Contact() {
  return (
    <PageLayout title="Contact Us">
      <p>
        Have a question or need to get in touch with a human? We'd love to hear from you.
        Our customer support team is available 24/7 to assist you.
      </p>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-full"><MailIcon className="size-5 text-primary" /></div>
          <div>
            <p className="font-bold text-foreground">Email</p>
            <p className="text-sm">support@flavorswift.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-full"><PhoneIcon className="size-5 text-primary" /></div>
          <div>
            <p className="font-bold text-foreground">Phone</p>
            <p className="text-sm">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export function Blog() {
  return (
    <PageLayout title="FlavorSwift Blog">
      <p>
        Discover the latest news, updates, and culinary trends from the FlavorSwift team.
        Check back soon as we prepare to launch our brand new food tech blog!
      </p>
      <div className="mt-8 text-center p-12 bg-muted/30 border-2 border-dashed rounded-xl">
        <p className="font-bold text-foreground text-xl">Coming Soon!</p>
        <p className="text-sm mt-2">We are cooking up some amazing content.</p>
      </div>
    </PageLayout>
  )
}

export function Support() {
  return (
    <PageLayout title="Help & Support">
      <p>
        Need assistance with a recent order? Our dedicated support staff is here to resolve your issues as quickly as possible.
      </p>
      <ul className="list-disc pl-5 mt-4 flex flex-col gap-2">
        <li>Track your order in real-time through the Orders tab.</li>
        <li>Request a refund for missing or incorrect items.</li>
        <li>Update your account settings and preferences.</li>
      </ul>
      <p className="mt-6">If you need immediate help, please navigate to your Order History and click "Help with this order".</p>
    </PageLayout>
  )
}

export function SafetyConcerns() {
  return (
    <PageLayout title="Safety Concerns">
      <p>
        Your safety is our top priority. We maintain strict food handling and delivery protocols to ensure your meals arrive securely.
      </p>
      <p className="mt-4">
        If you suspect any tampering, severe allergies, or other safety violations with your delivery, please contact our emergency hotline immediately.
      </p>
      <div className="bg-destructive/10 text-destructive p-4 rounded-xl mt-6 border border-destructive/20 font-medium flex items-center gap-2">
        <ShieldCheckIcon className="size-5" /> Safety Hotline: +1 (800) 999-0000
      </div>
    </PageLayout>
  )
}

export function FAQs() {
  return (
    <PageLayout title="Frequently Asked Questions">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-bold text-foreground text-lg">How do I track my order?</h3>
          <p className="mt-1">You can track your order in real-time by going to the "Order History" section in your Profile.</p>
        </div>
        <div>
          <h3 className="font-bold text-foreground text-lg">What payment methods are accepted?</h3>
          <p className="mt-1">We accept all major credit cards, debit cards, and digital wallets.</p>
        </div>
        <div>
          <h3 className="font-bold text-foreground text-lg">Can I cancel my order?</h3>
          <p className="mt-1">Orders can only be cancelled before the restaurant accepts them. Once accepted, preparation begins and cancellation is no longer possible.</p>
        </div>
      </div>
    </PageLayout>
  )
}

export function PrivacyPolicy() {
  return (
    <PageLayout title="Privacy Policy">
      <p>
        At FlavorSwift, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our app.
      </p>
      <h3 className="font-bold text-foreground mt-6 mb-2">Personal Information We Collect</h3>
      <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>

      <h3 className="font-bold text-foreground mt-6 mb-2">How Do We Use Your Personal Information?</h3>
      <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</p>
    </PageLayout>
  )
}

export function TermsOfService() {
  return (
    <PageLayout title="Terms of Service">
      <p>
        By accessing or using FlavorSwift, you agree to be bound by these Terms of Service and all applicable laws and regulations.
      </p>
      <h3 className="font-bold text-foreground mt-6 mb-2">1. Use License</h3>
      <p>Permission is granted to temporarily download one copy of the materials (information or software) on FlavorSwift's website for personal, non-commercial transitory viewing only.</p>

      <h3 className="font-bold text-foreground mt-6 mb-2">2. Disclaimer</h3>
      <p>The materials on FlavorSwift's website are provided on an 'as is' basis. FlavorSwift makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.</p>
    </PageLayout>
  )
}

export function CookiePolicy() {
  return (
    <PageLayout title="Cookie Policy">
      <p>
        This Cookie Policy explains how FlavorSwift uses cookies and similar technologies to recognize you when you visit our website.
      </p>
      <h3 className="font-bold text-foreground mt-6 mb-2">What are cookies?</h3>
      <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

      <h3 className="font-bold text-foreground mt-6 mb-2">Why do we use cookies?</h3>
      <p>We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies.</p>
    </PageLayout>
  )
}

export function Accessibility() {
  return (
    <PageLayout title="Accessibility Statement">
      <p>
        FlavorSwift is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
      </p>
      <h3 className="font-bold text-foreground mt-6 mb-2">Conformance Status</h3>
      <p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. FlavorSwift strives to be partially conformant with WCAG 2.1 level AA.</p>
      <h3 className="font-bold text-foreground mt-6 mb-2">Feedback</h3>
      <p>We welcome your feedback on the accessibility of FlavorSwift. Please let us know if you encounter accessibility barriers on our platform.</p>
    </PageLayout>
  )
}
