import React, { useEffect, useState } from 'react'
import { FaBrain } from 'react-icons/fa'
import {
  SiClaude,
  SiGithubcopilot,
  SiGooglegemini,
  SiOpenai,
  SiPerplexity,
} from 'react-icons/si'
import MCP_QUERIES from '../homepage/mcp-queries.json'
import { BiServer } from 'react-icons/bi'

function McpServerForm(props) {
  const [activeQueries, setActiveQueries] = useState([])
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

  return (
    <div className='homepage'>
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
              Built-in MCP (Model Context Protocol) server support for seamless
              AI-driven development.
            </p>
          </div>
          <div className='feature-preview'>
            <div className='mcp-preview'>
              <div className='pulse'>
                <BiServer size={'40px'}/>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default McpServerForm
