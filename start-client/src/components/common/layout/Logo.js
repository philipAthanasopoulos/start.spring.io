import PropTypes from 'prop-types'
import React from 'react'

function Logo() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='512'
      height='0'
      viewBox='0 0 512 512'
      role='img'
      aria-labelledby='title desc'
    >
      {/* <title id='title'>Scaffoldr Logo — hexagon grid space theme</title> */}
      {/* <desc id='desc'> */}
      {/*   A hexagonal scaffold frame with glowing joints and Scaffoldr wordmark */}
      {/* </desc> */}
      {/* <defs> */}
      {/*   /!* Gradient for scaffold lines *!/ */}
      {/*   <linearGradient id='scaffoldGrad' x1='0%' y1='0%' x2='100%' y2='100%'> */}
      {/*     <stop offset='0%' stopColor='#6366f1' /> */}
      {/*     <stop offset='100%' stopColor='#a855f7' /> */}
      {/*   </linearGradient> */}
      {/*   /!* Node glow *!/ */}
      {/*   <radialGradient id='nodeGlow' cx='50%' cy='50%' r='50%'> */}
      {/*     <stop offset='0%' stopColor='#a855f7' stopOpacity='0.9' /> */}
      {/*     <stop offset='100%' stopColor='#0f172a' stopOpacity='0' /> */}
      {/*   </radialGradient> */}
      {/* </defs> */}
      {/* <rect width='512' height='512' rx='64' ry='64' fill='#0f172a' /> */}
      {/* <polygon */}
      {/*   points='256,64 416,160 416,352 256,448 96,352 96,160' */}
      {/*   fill='none' */}
      {/*   stroke='url(#scaffoldGrad)' */}
      {/*   strokeWidth='16' */}
      {/* /> */}
      {/* <g stroke='url(#scaffoldGrad)' strokeWidth='8' strokeLinecap='round'> */}
      {/*   <line x1='176' y1='128' x2='176' y2='384' /> */}
      {/*   <line x1='336' y1='128' x2='336' y2='384' /> */}
      {/*   <line x1='128' y1='192' x2='384' y2='192' /> */}
      {/*   <line x1='128' y1='256' x2='384' y2='256' /> */}
      {/*   <line x1='128' y1='320' x2='384' y2='320' /> */}
      {/*   <path */}
      {/*     d='M128 192 L336 320 L384 192' */}
      {/*     stroke='url(#scaffoldGrad)' */}
      {/*     fill='none' */}
      {/*   /> */}
      {/*   <path */}
      {/*     d='M128 320 L336 192 L384 320' */}
      {/*     stroke='url(#scaffoldGrad)' */}
      {/*     fill='none' */}
      {/*   /> */}
      {/* </g> */}
      {/* <g> */}
      {/*   <circle cx='176' cy='192' r='10' fill='url(#nodeGlow)' /> */}
      {/*   <circle cx='336' cy='192' r='10' fill='url(#nodeGlow)' /> */}
      {/*   <circle cx='176' cy='320' r='10' fill='url(#nodeGlow)' /> */}
      {/*   <circle cx='336' cy='320' r='10' fill='url(#nodeGlow)' /> */}
      {/*   <circle cx='256' cy='256' r='12' fill='url(#nodeGlow)' /> */}
      {/* </g> */}
      {/* <g fill='#ffffff' opacity='0.85'> */}
      {/*   <circle cx='80' cy='100' r='2' /> */}
      {/*   <circle cx='420' cy='140' r='1.8' /> */}
      {/*   <circle cx='440' cy='400' r='2.5' /> */}
      {/*   <circle cx='100' cy='380' r='1.5' /> */}
      {/* </g> */}
      {/* <text */}
      {/*   x='256' */}
      {/*   y='492' */}
      {/*   textAnchor='middle' */}
      {/*   fill='#e6eef8' */}
      {/*   fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial" */}
      {/*   fontWeight='700' */}
      {/*   fontSize='42' */}
      {/*   letterSpacing='1.2' */}
      {/* > */}
      {/*   Scaffoldr */}
      {/* </text> */}
    </svg>
  )
}

Logo.propTypes = {
  className: PropTypes.string,
}

Logo.defaultProps = {
  className: '',
}

export default Logo
