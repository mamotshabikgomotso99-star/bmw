import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bolt,
  Check,
  CirclePlay,
  Instagram,
  MapPin,
  Menu,
  MonitorPlay,
  MoveUpRight,
  Pause,
  Play,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  Globe2,
  X,
  Youtube,
} from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { modelGroups, technologyFeatures, vehicles, x3Gallery } from './data'

const e30PhotoSource =
  'https://manorparkclassics.com/auction/lot/lot-160---1991-bmw-325i-sport/?lot=2149&sd=1'
const driftVideoSource = 'https://www.pexels.com/video/a-red-car-is-drifting-on-the-track-28545709/'
const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'The legend', href: '#about' },
  { label: 'Experience', href: '#performance' },
  { label: 'Gallery', href: '#models' },
  { label: 'Contact', href: '#contact' },
]

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const fadeImage: Variants = {
  hidden: { opacity: 0, scale: 1.035 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function Logo({ small = false }: { small?: boolean }) {
  return (
    <a className={`brand-lockup${small ? ' brand-lockup--small' : ''}`} href="#home" aria-label="BMW Motors home">
      <span className="bmw-roundel" aria-hidden="true">
        <span className="bmw-roundel__ring">BMW</span>
        <span className="bmw-roundel__center">
          <i />
          <i />
          <i />
          <i />
        </span>
      </span>
      <span className="brand-wordmark">BMW<span> MOTORS</span></span>
    </a>
  )
}

function SectionEyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`eyebrow${light ? ' eyebrow--light' : ''}`}>
      <span className="eyebrow__line" />
      {children}
    </p>
  )
}

function SectionIntro({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  light?: boolean
}) {
  return (
    <motion.div
      className={`section-intro${light ? ' section-intro--light' : ''}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <SectionEyebrow light={light}>{eyebrow}</SectionEyebrow>
      <h2>{title}</h2>
      {description && <p className="section-intro__copy">{description}</p>}
    </motion.div>
  )
}

function Photo({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
}) {
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    setImageSrc(src)
  }, [src])

  return (
    <img
      className={className}
      src={imageSrc}
      alt={alt}
      loading={loading}
      onError={() => setImageSrc('/images/photo-fallback.svg')}
    />
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24)

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return (
    <header className={`site-header${isScrolled ? ' site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="#contact">
          Let’s talk <ArrowUpRight size={15} strokeWidth={1.7} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {navigation.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span> {item.label} <ArrowUpRight size={17} />
              </a>
            ))}
            <a href="#contact" className="mobile-nav__contact" onClick={() => setMenuOpen(false)}>
              Contact BMW Motors <ArrowUpRight size={17} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function ActionLink({
  href,
  children,
  light = false,
  onClick,
}: {
  href: string
  children: ReactNode
  light?: boolean
  onClick?: () => void
}) {
  return (
    <a className={`action-link${light ? ' action-link--light' : ''}`} href={href} onClick={onClick}>
      <span>{children}</span>
      <span className="action-link__arrow" aria-hidden="true">
        <ArrowUpRight size={17} strokeWidth={1.7} />
      </span>
    </a>
  )
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [playbackBlocked, setPlaybackBlocked] = useState(false)
  const { scrollY } = useScroll()
  const textY = useTransform(scrollY, [0, 800], [0, 95])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video || videoFailed) {
      window.open(driftVideoSource, '_blank', 'noopener,noreferrer')
      return
    }

    if (video.paused) {
      void video.play()
        .then(() => setPlaybackBlocked(false))
        .catch(() => {
          setPlaying(false)
          setPlaybackBlocked(true)
        })
    } else {
      video.pause()
      setPlaying(false)
      setPlaybackBlocked(false)
    }
  }

  return (
    <section className="hero" id="home" aria-label="BMW Motors introduction">
      <div className="hero__backdrop" />
      <div className="hero__video-shell">
        {videoFailed ? (
          <Photo className="hero__video hero__video--fallback" src="/images/e30-red-hero.jpg" alt="" loading="eager" />
        ) : (
          <video
            ref={videoRef}
            className="hero__video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/e30-red-hero.jpg"
            aria-label="Licensed red classic BMW drifting at a public event; exact model and event location are unverified"
            onPlay={() => {
              setPlaying(true)
              setPlaybackBlocked(false)
            }}
            onPause={() => setPlaying(false)}
            onCanPlay={() => {
              const video = videoRef.current
              if (!video || !video.paused) return
              void video.play().catch(() => {
                setPlaybackBlocked(true)
              })
            }}
            onError={() => {
              setVideoFailed(true)
              setPlaying(false)
            }}
          >
            <source src="/videos/red-bmw-drift-event.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <div className="hero__shade" />
      <div className="hero__texture" />
      <div className="hero__side-note" aria-hidden="true">
        <span>MZANSI MOTORING CULTURE</span>
        <span className="hero__side-line" />
        <span>E30 · 325i</span>
      </div>

      <motion.div className="hero__content" style={{ y: textY }}>
        <motion.div
          className="hero__copy"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } }}
        >
          <motion.div variants={reveal} className="hero__eyebrow">
            <span className="live-dot" /> <strong>BMW MOTORS</strong> <span className="hero__eyebrow-divider">/</span> A CLASSIC WITH MZANSI SOUL
          </motion.div>
          <motion.h1 variants={reveal}>
            THE LEGEND
            <br />
            <span>NEVER STOPS.</span>
          </motion.h1>
          <motion.p variants={reveal} className="hero__description">
            1991 BMW E30 325i Sport. Timeless engineering. Unmistakable character.
          </motion.p>
          <motion.div variants={reveal} className="hero__actions">
            <ActionLink href="#about" light>
              Discover the legend
            </ActionLink>
            <a href="#performance" className="hero__text-link">
              Experience BMW <ArrowDownRight size={17} />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="hero__bottom">
        <div className="hero__footage-note">
          <span className="hero__footage-indicator" />
          {videoFailed
            ? 'Video unavailable · showing your supplied 1991 E30 reference photo'
            : 'Red classic BMW at a public drift event · exact model and location unverified'}
        </div>
        <div className="hero__video-actions">
          <button
            className="video-toggle"
            type="button"
            onClick={togglePlayback}
            aria-label={videoFailed ? 'Open the original video source' : playing ? 'Pause hero video' : 'Play hero video'}
          >
            {videoFailed ? <ArrowUpRight size={16} /> : playing ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
            <span>{videoFailed ? 'VIEW SOURCE' : playing ? 'PAUSE FILM' : 'PLAY FILM'}</span>
          </button>
          <a className="hero__source-link" href={driftVideoSource} target="_blank" rel="noreferrer">
            VIDEO SOURCE <ArrowUpRight size={14} />
          </a>
          <a className="hero__source-link hero__source-link--reference" href={e30PhotoSource} target="_blank" rel="noreferrer">
            E30 REFERENCE <ArrowUpRight size={14} />
          </a>
          {playbackBlocked && <span className="hero__playback-note" role="status">Autoplay blocked — press play to start.</span>}
        </div>
        <a href="#x3" className="scroll-cue">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={16} strokeWidth={1.5} />
        </a>
      </div>
    </section>
  )
}

function Marquee() {
  return (
    <div className="marquee" aria-label="BMW heritage and performance">
      <div className="marquee__track" aria-hidden="true">
        {Array.from({ length: 2 }).map((_, index) => (
          <div className="marquee__group" key={index}>
            <span>THE JOY OF DRIVING</span><i />
            <span>MADE TO MOVE YOU</span><i />
            <span>ENGINEERED TO INSPIRE</span><i />
            <span>THE JOY OF DRIVING</span><i />
          </div>
        ))}
      </div>
    </div>
  )
}

function X3Showcase({ onGallery }: { onGallery: (index: number) => void }) {
  return (
    <section className="x3-section section-pad" id="x3">
      <div className="container">
        <SectionIntro
          eyebrow="2026 BMW X3 30 xDrive · U.S. specifications"
          title={<>A new point<br className="desktop-break" /> of view.</>}
          description="The X3 has always made more possible. Now, it makes every arrival feel like a beginning."
        />
        <div className="x3-layout">
          <motion.div
            className="x3-image-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeImage}
          >
            <button
              type="button"
              className="x3-image-button"
              onClick={() => onGallery(0)}
              aria-label="Open BMW X3 exterior gallery"
            >
              <Photo
                src={vehicles[0].image}
                alt="Black BMW X3 displayed under moody studio lighting"
                className="x3-image"
                loading="eager"
              />
              <span className="image-corner-label"><span>26</span> / X3</span>
              <span className="image-hover-label"><CirclePlay size={20} /> VIEW THE GALLERY</span>
            </button>
            <span className="x3-image-count">01 <span>/</span> 03</span>
          </motion.div>

          <motion.div
            className="x3-details"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div className="x3-details__topline">
              <span>FEATURED VARIANT · U.S.</span>
              <span>MODEL YEAR 2026 <i /></span>
            </div>
            <h3>X3 <span>30 xDrive</span></h3>
            <p className="x3-details__intro">
              A confident new expression of everything an SAV can be. Designed in motion.
              Ready for wherever life takes you.
            </p>
            <div className="specs-grid">
              <div><span>POWER</span><strong>255 <small>hp</small></strong></div>
              <div><span>0–60 MPH</span><strong>6.0 <small>sec</small></strong></div>
              <div><span>TORQUE</span><strong>295 <small>lb-ft</small></strong></div>
              <div><span>DRIVETRAIN</span><strong>xDrive <small>AWD</small></strong></div>
              <div><span>ENGINE</span><strong>2.0 <small>L turbo + 48V</small></strong></div>
              <div><span>TRANSMISSION</span><strong>8-speed <small>automatic</small></strong></div>
              <div><span>FUEL ECONOMY</span><strong>EPA rating <small>varies by configuration</small></strong></div>
              <div><span>INTERIOR TECH</span><strong>BMW iDrive <small>curved display</small></strong></div>
            </div>
            <p className="x3-details__footnote">
              2026 BMW X3 30 xDrive · U.S. specifications. EPA fuel economy varies with
              configuration; refer to the current vehicle label. Performance figures are
              manufacturer estimates. Verify final specifications with BMW.
            </p>
            <div className="x3-actions">
              <ActionLink href="https://www.bmwusa.com/vehicles/x-series/x3/bmw-x3.html">
                Explore the X3
              </ActionLink>
              <button className="text-button" type="button" onClick={() => onGallery(0)}>
                View gallery <ArrowUpRight size={16} />
              </button>
              <a className="text-button" href="#technology">
                Discover features <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
        <p className="x3-caption"><span>THE NEXT CHAPTER</span> — Introducing a new kind of confidence.</p>
      </div>
    </section>
  )
}

function VehicleCard({
  vehicle,
  index,
  onExplore,
}: {
  vehicle: (typeof vehicles)[number]
  index: number
  onExplore: (selected: (typeof vehicles)[number]) => void
}) {
  return (
    <motion.article
      className="vehicle-card"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      transition={{ delay: index * 0.045 }}
    >
      <button
        type="button"
        className="vehicle-card__image-button"
        onClick={() => onExplore(vehicle)}
        aria-label={`View ${vehicle.name}`}
      >
        <Photo className="vehicle-card__image" src={vehicle.image} alt={vehicle.imageAlt} />
        <span className="vehicle-card__image-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="vehicle-card__expand"><ArrowUpRight size={18} /></span>
        {vehicle.tag && <span className="vehicle-card__tag">{vehicle.tag === 'M' ? 'BMW M' : vehicle.tag}</span>}
        <span className="vehicle-card__image-note">Illustrative model-family image</span>
      </button>
      <div className="vehicle-card__info">
        <div>
          <p>{vehicle.category}</p>
          <h3>{vehicle.name}</h3>
        </div>
        <button
          className="vehicle-card__open"
          type="button"
          aria-label={`Explore ${vehicle.name}`}
          onClick={() => onExplore(vehicle)}
        >
          <ArrowUpRight size={19} strokeWidth={1.6} />
        </button>
      </div>
      <p className="vehicle-card__description">{vehicle.description}</p>
    </motion.article>
  )
}

function Models({
  onExplore,
}: {
  onExplore: (selected: (typeof vehicles)[number]) => void
}) {
  const [activeGroup, setActiveGroup] = useState<(typeof modelGroups)[number]>('All models')
  const [searchQuery, setSearchQuery] = useState('')
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesGroup = activeGroup === 'All models' || vehicle.groups.includes(activeGroup)
    const matchesQuery = !normalizedQuery ||
      `${vehicle.name} ${vehicle.category} ${vehicle.description}`.toLowerCase().includes(normalizedQuery)

    return matchesGroup && matchesQuery
  })

  return (
    <section className="models-section section-pad" id="models">
      <div className="container">
        <div className="models-heading">
          <SectionIntro
            eyebrow="Global BMW model families"
            title={<>Find your<br className="desktop-break" /> BMW.</>}
            description="Browse BMW model families from across the global range, including Neue Klasse electric models and BMW M. Trims and availability vary by country."
          />
          <a className="subtle-link" href="https://www.bmw.co.za/en/all-models.html" target="_blank" rel="noreferrer">
            Open the live BMW South Africa catalogue <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="model-tools">
          <label className="model-search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search BMW models</span>
            <input
              type="search"
              aria-label="Search BMW models"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search the BMW range"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear model search">
                <X size={15} />
              </button>
            )}
          </label>
          <div className="model-filters" role="group" aria-label="Filter BMW model families">
            {modelGroups.map((group) => (
              <button
                type="button"
                key={group}
                className={activeGroup === group ? 'model-filter is-active' : 'model-filter'}
                aria-pressed={activeGroup === group}
                onClick={() => setActiveGroup(group)}
              >
                {group}
              </button>
            ))}
          </div>
          <p className="model-result-count" aria-live="polite">
            Showing {filteredVehicles.length} of {vehicles.length} model families
          </p>
        </div>
        <div className="vehicle-grid">
          {filteredVehicles.length > 0 ? filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.name} vehicle={vehicle} index={vehicles.indexOf(vehicle)} onExplore={onExplore} />
          )) : (
            <p className="model-empty-state">No BMW models match that search. Try another name or category.</p>
          )}
        </div>
        <p className="model-catalogue-note">
          Model families are presented as a worldwide guide, not a guarantee of local sale. BMW updates line-ups by market and model year.
          Images are illustrative. Check <a href="https://www.bmw.com/en/all-models.html" target="_blank" rel="noreferrer">BMW.com’s model overview</a> or your{' '}
          <a href="https://www.bmw.co.za/en/fastlane/bmw-retailer-locator.html" target="_blank" rel="noreferrer"> local BMW retailer</a> for current details.
        </p>
      </div>
    </section>
  )
}

function Performance() {
  const [active, setActive] = useState(0)
  const performanceImages = [
    { src: vehicles[5].image, label: 'M3', detail: 'Built to keep you connected.' },
    { src: vehicles[6].image, label: 'M4', detail: 'A sharper way to take the long road.' },
    { src: vehicles[7].image, label: 'M5', detail: 'Power, with purpose.' },
  ]

  return (
    <section className="performance-section" id="performance">
      <div className="performance-image">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="performance-image__layer"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Photo src={performanceImages[active].src} alt={`BMW ${performanceImages[active].label} performance vehicle`} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="performance-overlay" />
      <div className="performance-content container">
        <SectionEyebrow light>The art of performance</SectionEyebrow>
        <h2>ENGINEERED<br />FOR <span>ADRENALINE.</span></h2>
        <p>Every M carries a part of the track within it. Not for the sake of speed alone, but for the feeling that comes with knowing you’re exactly where you belong.</p>
        <div className="performance-tabs" role="tablist" aria-label="BMW M vehicles">
          {performanceImages.map((item, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={active === index}
              key={item.label}
              className={active === index ? 'performance-tab is-active' : 'performance-tab'}
              onClick={() => setActive(index)}
            >
              <span>BMW</span> {item.label}
            </button>
          ))}
        </div>
        <div className="performance-caption">
          <span>{performanceImages[active].detail}</span>
          <span>0{active + 1} — 03</span>
        </div>
        <ActionLink href="#models" light>Meet the M family</ActionLink>
      </div>
      <div className="performance-vertical" aria-hidden="true">M POWER — MADE TO BE FELT</div>
    </section>
  )
}

function Technology() {
  const [active, setActive] = useState(0)
  const activeFeature = technologyFeatures[active]
  const featureIcons = [MonitorPlay, ShieldCheck, Radio, Bolt]
  const FeatureIcon = featureIcons[active]

  return (
    <section className="technology-section section-pad" id="technology">
      <div className="container">
        <SectionIntro
          eyebrow="Intelligence in motion"
          title={<>Technology,<br className="desktop-break" /> made human.</>}
          description="Thoughtful innovation should feel less like technology, and more like it was always meant to be there."
        />
        <div className="technology-layout">
          <div className="technology-menu" role="tablist" aria-label="BMW innovation features">
            {technologyFeatures.map((feature, index) => {
              const Icon = featureIcons[index]
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-controls={`technology-panel-${feature.id}`}
                  key={feature.id}
                  className={`technology-menu__item${active === index ? ' is-active' : ''}`}
                  onClick={() => setActive(index)}
                >
                  <span className="technology-menu__number">0{index + 1}</span>
                  <Icon size={18} strokeWidth={1.65} />
                  <span>{feature.label}</span>
                  <ArrowUpRight size={16} className="technology-menu__arrow" />
                </button>
              )
            })}
          </div>
          <motion.article
            className="technology-panel"
            id={`technology-panel-${activeFeature.id}`}
            role="tabpanel"
            key={activeFeature.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="technology-panel__image">
              <Photo src={activeFeature.image} alt={activeFeature.imageAlt} />
              <span className="technology-panel__index">0{active + 1} / 04</span>
              <span className="technology-panel__stamp"><FeatureIcon size={18} /> BMW INNOVATION</span>
            </div>
            <div className="technology-panel__copy">
              <SectionEyebrow>{activeFeature.eyebrow}</SectionEyebrow>
              <h3>{activeFeature.title}</h3>
              <p>{activeFeature.body}</p>
              <a href="#contact" className="technology-panel__link">Explore innovation <MoveUpRight size={16} /></a>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

function About() {
  const imageY = useTransform(useScroll().scrollY, [1800, 3400], [24, -24])

  return (
    <section className="about-section" id="about">
      <div className="about-image-wrap">
        <motion.div className="about-image" style={{ y: imageY }}>
          <Photo src={vehicles[1].image} alt="BMW SUV moving along a quiet road surrounded by trees" />
        </motion.div>
        <div className="about-image-shade" />
        <div className="about-image-label"><Sparkles size={14} /> SINCE 1916</div>
      </div>
      <div className="about-content">
        <SectionEyebrow light>A legacy in motion</SectionEyebrow>
        <h2>BORN TO<br />PERFORM.<br /><span>BUILT TO INSPIRE.</span></h2>
        <p>More than a century of engineering courage has taught us one thing: progress should always feel personal. From the first turn of the wheel to the future of intelligent mobility, BMW creates machines for the moments that move you.</p>
        <a className="about-link" href="https://www.bmwgroup.com/en/company/history.html" target="_blank" rel="noreferrer">
          Discover our heritage <ArrowUpRight size={17} />
        </a>
        <div className="about-stat"><strong>1916</strong><span>Where the journey began</span></div>
      </div>
    </section>
  )
}

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitted(false)
    const form = event.currentTarget

    window.setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      form.reset()
    }, 650)
  }

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="container contact-layout">
        <div className="contact-copy">
          <SectionEyebrow light>Your next chapter</SectionEyebrow>
          <h2>Let’s find<br />your <span>BMW.</span></h2>
          <p>Choose your region to reach the official BMW team and find current retailer and service locations.</p>
          <div className="contact-regions" aria-label="BMW contact regions">
            <a
              className="contact-region"
              href="https://www.bmw.co.za/en/fastlane/bmw-retailer-locator.html"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-region__icon"><MapPin size={17} /></span>
              <span className="contact-region__copy">
                <strong>South Africa</strong>
                <small>Locate official BMW retailers and service centres</small>
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a
              className="contact-region"
              href="https://www.bmwgroup.com/en/general/contact.html"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-region__icon"><Globe2 size={17} /></span>
              <span className="contact-region__copy">
                <strong>International</strong>
                <small>BMW Group · International product, dealer & service enquiries</small>
              </span>
              <ArrowUpRight size={16} />
            </a>
          </div>
          <span className="contact-note">Official regional sites show the latest contact details and location availability.</span>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__heading">
            <span>GET IN TOUCH</span>
            <span>01 <i /> 03</span>
          </div>
          <label>
            <span>Your name</span>
            <input name="name" type="text" autoComplete="name" placeholder="How should we address you?" required minLength={2} />
          </label>
          <div className="contact-form__row">
            <label>
              <span>Email address</span>
              <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
            <label>
              <span>Phone <small>OPTIONAL</small></span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="Include your country code" />
            </label>
          </div>
          <label>
            <span>What’s on your mind?</span>
            <textarea name="message" rows={3} placeholder="Tell us what you’re looking for..." required minLength={8} />
          </label>
          <div className="contact-form__bottom">
            <button className="form-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'SENDING...' : 'SEND YOUR MESSAGE'}
              {submitted ? <Check size={18} /> : <ArrowUpRight size={18} />}
            </button>
            <p>Your details stay in this browser.<br />Nothing is sent to a server.</p>
          </div>
          <AnimatePresence>
            {submitted && (
              <motion.p
                className="form-message form-message--success"
                role="status"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Check size={16} /> Thanks for reaching out. This demo does not send your message.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Logo />
            <p>Designed for the feeling<br />that stays with you.</p>
          </div>
          <div className="footer-nav">
            <span>EXPLORE</span>
            <a href="#models">All models</a>
            <a href="#x3">The new X3</a>
            <a href="#performance">BMW M</a>
            <a href="#technology">Innovation</a>
          </div>
          <div className="footer-nav">
            <span>THE DETAILS</span>
            <a href="#about">Our story</a>
            <a href="#contact">Contacts & locations</a>
            <a href="#footer-legal">Privacy policy</a>
            <a href="#footer-legal">Terms & conditions</a>
          </div>
          <div className="footer-social">
            <span>FOLLOW THE FEELING</span>
            <div>
              <a href="https://www.instagram.com/bmw/" target="_blank" rel="noreferrer" aria-label="BMW on Instagram"><Instagram size={17} /></a>
              <a href="https://www.youtube.com/user/BMW" target="_blank" rel="noreferrer" aria-label="BMW on YouTube"><Youtube size={17} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom" id="footer-legal">
          <span>© {new Date().getFullYear()} BMW MOTORS · INDEPENDENT DESIGN CONCEPT</span>
          <span>Not affiliated with or endorsed by BMW AG.</span>
          <a href="#home">BACK TO TOP <ArrowUpRight size={14} /></a>
        </div>
        <p className="footer-credits">
          Hero drift film by <a href="https://www.pexels.com/@borishamer/" target="_blank" rel="noreferrer">Boris Hamer</a> via Pexels ·
          Vehicle photography by Pexels contributors · BMW and model names are trademarks of BMW AG.
        </p>
      </div>
    </footer>
  )
}

function GalleryModal({
  images,
  activeIndex,
  setActiveIndex,
  onClose,
}: {
  images: { src: string; alt: string; label?: string }[]
  activeIndex: number
  setActiveIndex: (index: number) => void
  onClose: () => void
}) {
  const goTo = (direction: number) =>
    setActiveIndex((activeIndex + direction + images.length) % images.length)
  const activeImage = images[activeIndex]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') goTo(1)
      if (event.key === 'ArrowLeft') goTo(-1)
    }
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, onClose])

  return (
    <motion.div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="BMW vehicle gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div className="gallery-modal" initial={{ y: 18, scale: 0.985 }} animate={{ y: 0, scale: 1 }}>
        <div className="gallery-modal__top">
          <Logo small />
          <span>{activeImage.label ?? 'BMW MODEL'}</span>
          <button type="button" onClick={onClose} aria-label="Close gallery"><X size={22} /></button>
        </div>
        <div className="gallery-modal__image-wrap">
          <Photo src={activeImage.src} alt={activeImage.alt} className="gallery-modal__image" loading="eager" />
          <button className="gallery-modal__arrow gallery-modal__arrow--left" onClick={() => goTo(-1)} aria-label="Previous image"><ArrowLeft size={20} /></button>
          <button className="gallery-modal__arrow gallery-modal__arrow--right" onClick={() => goTo(1)} aria-label="Next image"><ArrowRight size={20} /></button>
        </div>
        <div className="gallery-modal__bottom">
          <span>{activeImage.alt}</span>
          <span>0{activeIndex + 1} <i /> 0{images.length}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function VehicleModal({ vehicle, onClose }: { vehicle: (typeof vehicles)[number]; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${vehicle.name} details`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div className="vehicle-modal" initial={{ y: 18, scale: 0.985 }} animate={{ y: 0, scale: 1 }}>
        <button type="button" className="vehicle-modal__close" onClick={onClose} aria-label="Close vehicle details"><X size={22} /></button>
        <Photo src={vehicle.image} alt={vehicle.imageAlt} className="vehicle-modal__image" loading="eager" />
        <div className="vehicle-modal__copy">
          <SectionEyebrow>{vehicle.category}</SectionEyebrow>
          <h2>{vehicle.name}</h2>
          <p>{vehicle.description}</p>
          <p className="vehicle-modal__note">This image is illustrative. Specifications, body styles and availability vary by model year and market.</p>
          <ActionLink href="https://www.bmw.com/en/all-models.html">Explore the BMW global range</ActionLink>
        </div>
      </motion.div>
    </motion.div>
  )
}

function App() {
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<(typeof vehicles)[number] | null>(null)

  const openGallery = (index: number) => setGalleryIndex(index)
  const closeGallery = () => setGalleryIndex(null)
  const closeVehicle = () => setSelectedVehicle(null)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <X3Showcase onGallery={openGallery} />
        <Models onExplore={setSelectedVehicle} />
        <Performance />
        <Technology />
        <About />
        <Contact />
      </main>
      <Footer />
      {galleryIndex !== null && (
        <GalleryModal
          images={x3Gallery}
          activeIndex={galleryIndex}
          setActiveIndex={setGalleryIndex}
          onClose={closeGallery}
        />
      )}
      {selectedVehicle && <VehicleModal vehicle={selectedVehicle} onClose={closeVehicle} />}
    </>
  )
}

export default App
