from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

OUT = "/mnt/user-data/outputs/og"
LOGO = "/mnt/user-data/uploads/dreamdestinatio2.0/src/assets/companylogo.png"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
REG  = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

W, H = 1200, 630

# Brand accents, matched to each page family's accent colour in the app
THEMES = {
    "amber":   ((26, 18, 8),   (245, 158, 11), (37, 99, 235)),
    "blue":    ((8, 15, 30),   (37, 99, 235),  (245, 158, 11)),
    "emerald": ((6, 24, 18),   (16, 185, 129), (249, 115, 22)),
    "slate":   ((13, 17, 23),  (100, 116, 139),(37, 99, 235)),
}

logo = Image.open(LOGO).convert("RGBA")

def fit_text(draw, text, font_path, max_w, start, min_size=40):
    size = start
    while size > min_size:
        f = ImageFont.truetype(font_path, size)
        words, lines, cur = text.split(), [], ""
        for w_ in words:
            t = (cur + " " + w_).strip()
            if draw.textlength(t, font=f) <= max_w:
                cur = t
            else:
                if cur: lines.append(cur)
                cur = w_
        if cur: lines.append(cur)
        if len(lines) <= 3:
            return f, lines
        size -= 4
    f = ImageFont.truetype(font_path, min_size)
    return f, [text[:60]]

def make(slug, title, kicker, theme="blue"):
    bg, accent, accent2 = THEMES[theme]
    img = Image.new("RGB", (W, H), bg)
    d = ImageDraw.Draw(img, "RGBA")

    # Soft accent glows
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([-160, -260, 620, 380], fill=accent + (70,))
    gd.ellipse([760, 300, 1460, 900], fill=accent2 + (52,))
    glow = glow.filter(ImageFilter.GaussianBlur(150))
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    d = ImageDraw.Draw(img, "RGBA")

    # Top accent rule
    d.rectangle([0, 0, W, 7], fill=accent)

    # Logo + wordmark
    lg = logo.copy(); lg.thumbnail((78, 78), Image.LANCZOS)
    img.paste(lg, (72, 64), lg)
    d.text((166, 74), "DreamDestination", font=ImageFont.truetype(BOLD, 30), fill=(255, 255, 255))
    d.text((167, 111), "Study Abroad Experts", font=ImageFont.truetype(REG, 18), fill=(168, 178, 194))

    # Kicker
    kf = ImageFont.truetype(BOLD, 20)
    kw = d.textlength(kicker.upper(), font=kf)
    d.rounded_rectangle([72, 214, 72 + kw + 40, 262], radius=24, fill=accent + (46,), outline=accent + (150,), width=2)
    d.text((92, 226), kicker.upper(), font=kf, fill=accent)

    # Title
    tf, lines = fit_text(d, title, BOLD, W - 150, 70)
    y = 300
    for ln in lines:
        d.text((72, y), ln, font=tf, fill=(255, 255, 255))
        y += tf.size + 12

    # Footer
    d.rectangle([72, H - 96, 132, H - 92], fill=accent)
    d.text((72, H - 74), "www.dreamdestinationstudyabroad.com", font=ImageFont.truetype(REG, 25), fill=(184, 194, 208))

    img.save(os.path.join(OUT, f"{slug}.jpg"), quality=86, optimize=True, progressive=True)

PAGES = [
    ("home", "Study Abroad Consultants for Indian Students", "Free Counselling", "blue"),
    ("career-counselling", "Career Counselling for Study Abroad", "Career Guidance", "amber"),
    ("admission-guidance", "Study Abroad Admission Guidance", "University Applications", "blue"),
    ("financial-assistance", "Education Loan & Financial Assistance", "Funding", "emerald"),
    ("scholarship-assistance", "Scholarship Assistance for Study Abroad", "Scholarships", "amber"),
    ("visa-assistance", "Student Visa Assistance", "Visa Support", "blue"),
    ("student-accommodation", "Student Accommodation Abroad", "Housing", "emerald"),
    ("test-preparations", "IELTS, TOEFL, PTE & GRE Preparation", "Test Prep", "amber"),
    ("travel-forex-assistance", "Travel & Forex Assistance for Students", "Travel & Forex", "emerald"),
    ("insurance-assistance", "Student Insurance Assistance", "Insurance", "blue"),
    ("countries", "Study Abroad Destinations", "15+ Countries", "blue"),
    ("study-in-india", "Study in India for International Students", "Inbound Admissions", "emerald"),
]

COUNTRIES = [
    ("uk","United Kingdom"),("usa","USA"),("canada","Canada"),("australia","Australia"),
    ("new-zealand","New Zealand"),("germany","Germany"),("ireland","Ireland"),("france","France"),
    ("italy","Italy"),("netherlands","Netherlands"),("switzerland","Switzerland"),
    ("singapore","Singapore"),("malaysia","Malaysia"),("dubai","Dubai & UAE"),("mauritius","Mauritius"),
    # Added with the country pages themselves. Without a card here, SEOHead has
    # no branded image for these pages and falls back to the site-wide card.
    ("spain","Spain"),("russia","Russia"),("china","China"),("japan","Japan"),
    ("india","India"),
]

LEGAL = [("privacy-policy","Privacy Policy"),("terms-of-service","Terms of Service"),
         ("disclaimer","Disclaimer"),("cookie-policy","Cookie Policy")]

for slug, title, kicker, theme in PAGES:
    make(slug, title, kicker, theme)
for slug, name in COUNTRIES:
    make(f"study-in-{slug}", f"Study in {name}", "Study Destination", "blue")
for slug, name in LEGAL:
    make(slug, name, "Legal", "slate")

print("generated", len(os.listdir(OUT)), "images")
