import React, { useEffect, useState, useRef } from 'react'
import { setSeo } from '../seo/setSeo'
import '../styles/landing.scss'
import bootcraneLogo from '../images/bootcrane_logo.png'
import {
  SiPostgresql,
  SiMysql,
  SiMariadb,
  SiOracle,
} from 'react-icons/si'
import { FaTools, FaCogs, FaRocket } from 'react-icons/fa'

export default function LandingPage() {
  const heroRef = useRef(null)
  const featureRefs = [useRef(null), useRef(null), useRef(null)]
  const pricingRefs = [useRef(null), useRef(null)]

  useEffect(() => {
    setSeo({
      title: 'BootCrane — Automate Spring Boot Project Generation',
      description:
        'BootCrane lets you instantly scaffold, configure, and download Spring Boot projects. Save time, avoid errors, and focus on coding.',
      url: `${window.location.origin}/`,
      image: `${window.location.origin}/src/images/bootcrane_logo.png`,
      favicon: '/favicon.ico',
    })
    // Animate hero
    if (heroRef.current) {
      heroRef.current.classList.add('lp-animate-fadeInUp')
    }
    // Animate features staggered
    featureRefs.forEach((ref, i) => {
      setTimeout(() => {
        if (ref.current) {
          ref.current.classList.add(
            'lp-animate-fadeInUp',
            `lp-animate-delay-${i + 1}`
          )
        }
      }, 200 + i * 150)
    })
    // Animate pricing cards
    pricingRefs.forEach((ref, i) => {
      setTimeout(() => {
        if (ref.current) {
          ref.current.classList.add(
            'lp-animate-scaleIn',
            `lp-animate-delay-${i + 1}`
          )
        }
      }, 600 + i * 180)
    })
  }, [])

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletterSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    // TODO: Integrate with backend/newsletter service
  }

  return (
    <div className='lp'>
      <header className='lp-header'>
        <div className='lp-container'>
          <div className='lp-logo'>
            <img
              src={bootcraneLogo}
              alt='BootCrane logo'
              height='38'
              style={{ verticalAlign: 'middle', marginRight: 8 }}
            />
            BootCrane
          </div>
          <nav className='lp-nav' aria-label='Main navigation'>
            <a href='#features'>Features</a>
            <a href='#pricing'>Pricing</a>
            <a href='#faq'>FAQ</a>
            <a
              className='lp-btn lp-btn-outline'
              href='https://github.com/bootcrane/bootcrane'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>
            <a className='lp-btn' href='/app'>
              Launch App
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className='lp-hero' ref={heroRef}>
          <div className='lp-container'>
            <h1>Automate Your Spring Boot Projects</h1>
            <h2 className='lp-hero-sub'>
              Instant scaffolding, configuration, and download
            </h2>
            <p>
              BootCrane is the fastest way to generate production-ready Spring
              Boot projects. Select dependencies, configure settings, and
              download your starter in seconds.
            </p>
            <div className='lp-actions'>
              <a className='lp-btn' href='/app'>
                Try BootCrane Free
              </a>
              <a
                className='lp-btn lp-btn-outline'
                href='https://github.com/bootcrane/bootcrane'
                target='_blank'
                rel='noopener noreferrer'
              >
                Contribute on GitHub
              </a>
            </div>
            {/* <img */}
            {/*   className='lp-hero-img' */}
            {/*   src={bootcraneLogo} */}
            {/*   alt='BootCrane product preview' */}
            {/*   style={{ */}
            {/*     background: '#fff', */}
            {/*     borderRadius: 12, */}
            {/*     padding: 12, */}
            {/*     maxWidth: 220, */}
            {/*   }} */}
            {/* /> */}
          </div>
        </section>

        <section id='features' className='lp-section'>
          <div className='lp-container lp-grid'>
            <div className='lp-card' ref={featureRefs[0]}>
              <span className='lp-icon' aria-hidden='true'>
                <FaTools size={32} />
              </span>
              <h3>Instant Scaffolding</h3>
              <p>
                Generate Spring Boot projects with your chosen dependencies in
                seconds.
              </p>
            </div>
            <div className='lp-card' ref={featureRefs[1]}>
              <span className='lp-icon' aria-hidden='true'>
                <FaCogs size={32} />
              </span>
              <h3>Smart Configuration</h3>
              <p>
                Customize Java version, packaging, and more with a simple UI.
              </p>
            </div>
            <div className='lp-card' ref={featureRefs[2]}>
              <span className='lp-icon' aria-hidden='true'>
                <FaRocket size={32} />
              </span>
              <h3>One-Click Download</h3>
              <p>
                Download your ready-to-run Spring Boot starter as a zip
                instantly.
              </p>
            </div>
          </div>
        </section>

        {/* SQL Databases Section */}
        <section id='databases' className='lp-section lp-databases'>
          <div className='lp-container'>
            <div className='lp-db-grid'>
              <div className='lp-db-card'>
                <SiPostgresql size={48} color='#336791' title='PostgreSQL' />
              </div>
              <div className='lp-db-card'>
                <SiMysql size={48} color='#00758f' title='MySQL' />
              </div>
              <div className='lp-db-card'>
                <SiMariadb size={48} color='#003545' title='MariaDB' />
              </div>
              <div className='lp-db-card'>
                <SiOracle size={48} color='#f80000' title='Oracle' />
              </div>
            </div>
          </div>
        </section>

        <section className='lp-section lp-testimonial'>
          <div className='lp-container'>
            <blockquote className='lp-quote'>
              “BootCrane is open source and welcomes contributors! Join us on
              GitHub to help improve the tool for everyone.”
              <footer>— The BootCrane Team</footer>
            </blockquote>
          </div>
        </section>

        <section id='pricing' className='lp-section lp-section-alt'>
          <div className='lp-container'>
            <h2>Simple pricing</h2>
            <p>
              BootCrane is free and open source. Pro features are planned for
              future releases.
            </p>
            <div className='lp-pricing'>
              <div className='lp-plan' ref={pricingRefs[0]}>
                <h4>Free</h4>
                <p className='lp-price'>$0</p>
                <ul>
                  <li>Unlimited projects</li>
                  <li>Community support</li>
                  <li>Open source license</li>
                </ul>
                <a
                  className='lp-btn'
                  href='https://github.com/bootcrane/bootcrane'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Contribute
                </a>
              </div>
              <div className='lp-plan lp-plan-pro' ref={pricingRefs[1]}>
                <h4>
                  Pro{' '}
                  <span style={{ fontSize: '0.7em', color: '#888' }}>
                    (coming soon)
                  </span>
                </h4>
                <p className='lp-price'>TBA</p>
                <ul>
                  <li>Advanced analytics</li>
                  <li>Priority support</li>
                  <li>Team features</li>
                </ul>
                <a
                  className='lp-btn lp-btn-contrast'
                  href='https://github.com/bootcrane/bootcrane'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Follow Updates
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id='faq' className='lp-section'>
          <div className='lp-container'>
            <h2>FAQ</h2>
            <details>
              <summary>Is BootCrane really free?</summary>
              <p>Yes! BootCrane is open source and free for everyone.</p>
            </details>
            <details>
              <summary>How can I contribute?</summary>
              <p>
                Visit our{' '}
                <a
                  href='https://github.com/bootcrane/bootcrane'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  GitHub repository
                </a>{' '}
                to open issues, submit pull requests, or join discussions.
              </p>
            </details>
            <details>
              <summary>Will there be paid features?</summary>
              <p>
                Pro features are planned for future releases, but the core tool
                will remain open source.
              </p>
            </details>
          </div>
        </section>
      </main>

      <footer className='lp-footer'>
        <div className='lp-container lp-footer-grid'>
          <div>
            <div className='lp-logo'>
              <img
                src={bootcraneLogo}
                alt='BootCrane logo'
                height='28'
                style={{ verticalAlign: 'middle', marginRight: 6 }}
              />
              BootCrane
            </div>
            <p>
              © {new Date().getFullYear()} BootCrane. Open source under the MIT
              License.
            </p>
          </div>
          <div>
            <h5>Product</h5>
            <a href='#features'>Features</a>
            <a href='#pricing'>Pricing</a>
            <a
              href='https://github.com/bootcrane/bootcrane'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a
              href='https://github.com/bootcrane/bootcrane/issues'
              target='_blank'
              rel='noopener noreferrer'
            >
              Issues
            </a>
            <a
              href='https://github.com/bootcrane/bootcrane/pulls'
              target='_blank'
              rel='noopener noreferrer'
            >
              Pull Requests
            </a>
            <a
              href='https://github.com/bootcrane/bootcrane/discussions'
              target='_blank'
              rel='noopener noreferrer'
            >
              Discussions
            </a>
          </div>
          <div>
            <h5>Resources</h5>
            <a href='/docs'>Docs</a>
            <a href='/blog'>Blog</a>
            <a href='/support'>Support</a>
            <form className='lp-newsletter' onSubmit={handleNewsletterSubmit}>
              <label htmlFor='newsletter-email'>Newsletter</label>
              <input
                id='newsletter-email'
                type='email'
                placeholder='Your email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-label='Email for newsletter'
              />
              <button className='lp-btn' type='submit' disabled={submitted}>
                {submitted ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  )
}
