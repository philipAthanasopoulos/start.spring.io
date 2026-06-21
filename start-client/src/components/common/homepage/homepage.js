import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Highlight from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism'

if (typeof global !== 'undefined') {
  global.Prism = Prism
  require('prismjs/components/prism-java')
}
import {
  FaCode,
  FaLayerGroup,
  FaArrowRight,
  FaProjectDiagram,
  FaPlus,
  FaRocket,
  FaShieldAlt,
  FaCogs,
  FaBrain,
} from 'react-icons/fa'
import {
  SiGithubcopilot,
  SiClaude,
  SiOpenai,
  SiGooglegemini,
  SiPerplexity,
} from 'react-icons/si'

import { Logo } from '../layout'
import { Button } from '../form'
import MCP_QUERIES from './mcp-queries.json'
import { BiServer } from 'react-icons/bi'
import { AiOutlineArrowRight } from 'react-icons/ai'

const CODE_EXAMPLE = `@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public List<User> getUsers() {
        return userService.findAll();
    }
}`

function BrightenText({ text }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const segments = text.split(/([.,])/)
  const joinedSegments = []
  for (let i = 0; i < segments.length; i += 2) {
    joinedSegments.push(segments[i] + (segments[i + 1] || ''))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % joinedSegments.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [joinedSegments.length])

  return (
    <span className='brighten-animate'>
      {joinedSegments.map((segment, index) => (
        <span key={index} className={index === activeIndex ? 'active' : ''}>
          {segment}
        </span>
      ))}
    </span>
  )
}

function Homepage() {
  const navigate = useNavigate()
  const [typedCode, setTypedCode] = useState('')
  const [activeQueries, setActiveQueries] = useState([])

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= CODE_EXAMPLE.length) {
        setTypedCode(CODE_EXAMPLE.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomQuery =
        MCP_QUERIES[Math.floor(Math.random() * MCP_QUERIES.length)]
      const id = Date.now()
      const side = Math.random() > 0.5 ? 'left' : 'right'
      const agents = ['copilot', 'claude', 'openai', 'gemini', 'perplexity']
      const agent = agents[Math.floor(Math.random() * agents.length)]
      const rotation = Math.floor(Math.random() * 10) - 5 // Random rotation between -5 and 5 degrees

      setActiveQueries(prev => [
        ...prev,
        { id, text: randomQuery, side, agent, rotation },
      ])

      setTimeout(() => {
        setActiveQueries(prev => prev.filter(q => q.id !== id))
      }, 4000)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const goToApp = () => {
    navigate('/app')
  }

  return (
    <div className='homepage'>
      <header className='hero'>
        <div className='hero-content'>
          <div className='hero-logo'>
            <Logo />
            <h1>Bootcrane</h1>
          </div>
          <p className='hero-subtitle'>
            <BrightenText text='Turn your ideas into production ready Spring projects' />
          </p>
          <div className='hero-actions'>
            <Button
              id='try-now'
              variant='primary'
              onClick={goToApp}
              className='button btn-get-started'
            >
              <span className='btn-content'>
                Boot UP<AiOutlineArrowRight />
              </span>
              <span className='btn-logo'>
                <Logo />
              </span>
            </Button>
          </div>
        </div>
      </header>

      <section className='feature-section section-uml'>
        <div className='section-container'>
          <div className='feature-content'>
            <div className='feature-icon'>
              <FaProjectDiagram />
            </div>
            <h3>UML to Code</h3>
            <p>
              <BrightenText text='Transform your UML diagrams directly into functional Spring Boot applications.' />
            </p>
          </div>
          <div className='feature-preview'>
            <div className='uml-mock-diagram'>
              <div className='uml-class'>
                <div className='uml-class-header'>User</div>
                <div className='uml-class-body'>
                  <div className='uml-property'>String username</div>
                  <div className='uml-property'>String email</div>
                  <div className='uml-method'>login()</div>
                </div>
              </div>
              <div className='uml-relationship'>
                <span className='relation-label'>1 to *</span>
              </div>
              <div className='uml-class'>
                <div className='uml-class-header'>Order</div>
                <div className='uml-class-body'>
                  <div className='uml-property'>Long id</div>
                  <div className='uml-property'>Date date</div>
                </div>
              </div>
              <button
                className='btn-add-entity'
                onClick={e => e.preventDefault()}
              >
                <FaPlus /> Add Entity
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='feature-section section-rest reverse'>
        <div className='section-container'>
          <div className='feature-content'>
            <div className='feature-icon'>
              <FaCode />
            </div>
            <h3>REST Controllers</h3>
            <p>
              <BrightenText text='Automatically generate clean, documented REST controllers based on your domain model.' />
            </p>
          </div>
          <div className='feature-preview'>
            <div className='code-preview'>
              <Highlight
                Prism={Prism}
                code={typedCode}
                language='java'
                theme={undefined}
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => (
                  <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                    <span className='cursor'></span>
                  </pre>
                )}
              </Highlight>
            </div>
          </div>
        </div>
      </section>

      <section className='feature-section section-services'>
        <div className='section-container'>
          <div className='feature-content'>
            <div className='feature-icon'>
              <FaLayerGroup />
            </div>
            <h3>Services, Repos & Views</h3>
            <p>
              <BrightenText text='Full-stack generation including service layers, data repositories and Thymeleaf-powered web views.' />
            </p>
          </div>
          <div className='feature-preview'>
            <div className='stack-preview'>
              <div className='layer'>Thymeleaf Views</div>
              <div className='layer'>Service Layer</div>
              <div className='layer'>Data Repositories</div>
            </div>
          </div>
        </div>
      </section>

      <section className='feature-section section-mcp reverse'>
        <div className='section-container'>
          <div className='feature-content'>
            <div className='feature-icon'>
              <FaBrain />
            </div>
            <h3>
              MCP Server <span className='badge'>coming soon</span>{' '}
            </h3>
            <p>
              <BrightenText text='Built-in MCP (Model Context Protocol) server support for seamless AI-driven development.' />
            </p>
          </div>
          <div className='feature-preview'>
            <div className='mcp-preview'>
              <div className='pulse'>
                <BiServer size={'40px'} />
              </div>
              <div className='agent-icon copilot'>
                <SiGithubcopilot />
                {activeQueries
                  .filter(q => q.agent === 'copilot')
                  .map(query => (
                    <div
                      key={query.id}
                      className={`query-dialog ${query.side} ${query.agent}`}
                      style={{ '--rotation': `${query.rotation}deg` }}
                    >
                      <div className='dialog-icon'>
                        <SiGithubcopilot />
                      </div>
                      <div className='dialog-text'>{query.text}</div>
                    </div>
                  ))}
              </div>
              <div className='agent-icon claude'>
                <SiClaude />
                {activeQueries
                  .filter(q => q.agent === 'claude')
                  .map(query => (
                    <div
                      key={query.id}
                      className={`query-dialog ${query.side} ${query.agent}`}
                      style={{ '--rotation': `${query.rotation}deg` }}
                    >
                      <div className='dialog-icon'>
                        <SiClaude />
                      </div>
                      <div className='dialog-text'>{query.text}</div>
                    </div>
                  ))}
              </div>
              <div className='agent-icon openai'>
                <SiOpenai />
                {activeQueries
                  .filter(q => q.agent === 'openai')
                  .map(query => (
                    <div
                      key={query.id}
                      className={`query-dialog ${query.side} ${query.agent}`}
                      style={{ '--rotation': `${query.rotation}deg` }}
                    >
                      <div className='dialog-icon'>
                        <SiOpenai />
                      </div>
                      <div className='dialog-text'>{query.text}</div>
                    </div>
                  ))}
              </div>
              <div className='agent-icon gemini'>
                <SiGooglegemini />
                {activeQueries
                  .filter(q => q.agent === 'gemini')
                  .map(query => (
                    <div
                      key={query.id}
                      className={`query-dialog ${query.side} ${query.agent}`}
                      style={{ '--rotation': `${query.rotation}deg` }}
                    >
                      <div className='dialog-icon'>
                        <SiGooglegemini />
                      </div>
                      <div className='dialog-text'>{query.text}</div>
                    </div>
                  ))}
              </div>
              <div className='agent-icon perplexity'>
                <SiPerplexity />
                {activeQueries
                  .filter(q => q.agent === 'perplexity')
                  .map(query => (
                    <div
                      key={query.id}
                      className={`query-dialog ${query.side} ${query.agent}`}
                      style={{ '--rotation': `${query.rotation}deg` }}
                    >
                      <div className='dialog-icon'>
                        <SiPerplexity />
                      </div>
                      <div className='dialog-text'>{query.text}</div>
                    </div>
                  ))}
              </div>
              <span>MCP Server Active</span>
            </div>
          </div>
        </div>
      </section>

      <section className='why-bootcrane'>
        <div className='section-container'>
          <h2>Why Bootcrane?</h2>
          <div className='steps'>
            <div className='step'>
              <div className='step-icon'>
                <FaShieldAlt />
              </div>
              <div className='step-content'>
                <span className='step-number'>01</span>
                <h4>Clean Architecture by Default</h4>
                <p>
                  Generate code that adheres to strict architectural standards,
                  industry best practices, and proven design patterns from the
                  start.
                </p>
              </div>
            </div>
            <div className='step'>
              <div className='step-icon'>
                <FaCogs />
              </div>
              <div className='step-content'>
                <span className='step-number'>02</span>
                <h4>Design-First Approach</h4>
                <p>
                  Shift your focus from boilerplate implementation to system
                  design, allowing you to model complex domains before writing a
                  single line of code.
                </p>
              </div>
            </div>
            <div className='step'>
              <div className='step-icon'>
                <FaRocket />
              </div>
              <div className='step-content'>
                <span className='step-number'>03</span>
                <h4>Accelerate Delivery</h4>
                <p>
                  Bridge the gap between ideation and production. Launch with a
                  robust foundation and start delivering business value on day
                  one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className='homepage-footer'>
        <p>&copy; 2026 Bootcrane. Built with developers in mind.</p>
        <p>
          Built while listening to{' '}
          <a href='https://www.youtube.com/watch?v=PqCloRZ8iTI&list=RDPqCloRZ8iTI'>
            @PizzaHotline
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Homepage
