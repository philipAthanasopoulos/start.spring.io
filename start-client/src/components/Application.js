import BodyClassName from 'react-body-classname'
import FileSaver from 'file-saver'
import get from 'lodash/get'
import React, {
  Suspense,
  lazy,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { toast } from 'react-toastify'

import useHash from './utils/Hash'
import useWindowsUtils from './utils/WindowsUtils'
import { AppContext } from './reducer/App'
import { Dependency, DependencyDialog } from './common/dependency'
import { Fields } from './common/builder'
import { Header } from './common/layout'
import { InitializrContext } from './reducer/Initializr'
import { getConfig, getInfo, getProject } from './utils/ApiUtils'
import { Button, Form } from './common/form'
import Navbar from './common/Navigation/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router'
import DatabaseForm from './common/builder/DatabaseForm'
import DomainClassForm from './common/builder/DomainClassForm'
import AssociationDescriptionsForm from './common/builder/AssociationDescriptionsForm'
import Actions from './common/builder/Actions'
import Diagram from './common/UmlGraph/Diagram'

const Explore = lazy(() => import('./common/explore/Explore'))
const Share = lazy(() => import('./common/share/Share'))
const History = lazy(() => import('./common/history/History'))
const HotKeys = lazy(() => import('./common/builder/HotKeys'))

export default function Application() {
  const {
    complete,
    dispatch,
    theme,
    share: shareOpen,
    explore: exploreOpen,
    history: historyOpen,
    list,
    dependencies,
  } = useContext(AppContext)
  const {
    values,
    share,
    dispatch: dispatchInitializr,
  } = useContext(InitializrContext)

  const [blob, setBlob] = useState(null)
  const [generating, setGenerating] = useState(false)

  const buttonExplore = useRef(null)
  const buttonDependency = useRef(null)
  const buttonSubmit = useRef(null)

  const windowsUtils = useWindowsUtils()
  useHash()

  useEffect(() => {
    if (windowsUtils.origin) {
      // const url = `http://localhost:8000/metadata/client`
      const url = process.env.REACT_APP_METADATA_URL
      getInfo(url).then(jsonConfig => {
        const response = getConfig(jsonConfig)
        dispatchInitializr({ type: 'COMPLETE', payload: { ...response } })
        dispatch({ type: 'COMPLETE', payload: response })
      })
    }
  }, [dispatch, dispatchInitializr, windowsUtils.origin])

  const onEscape = () => {
    setBlob(null)
    dispatch({
      type: 'UPDATE',
      payload: {
        list: false,
        share: false,
        explore: false,
        nav: false,
        history: false,
      },
    })
  }

  const onSubmit = async () => {
    if (generating || list) {
      return
    }
    setGenerating(true)
    const url = `${windowsUtils.origin}/starter.zip`
    const project = await getProject(
      url,
      values,
      get(dependencies, 'list')
    ).catch(err => {
      toast.error(
        err || `Could not connect to server. Please check your network.`
      )
    })
    setGenerating(false)
    if (project) {
      FileSaver.saveAs(project, `${get(values, 'meta.artifact')}.zip`)
      dispatch({ type: 'ADD_HISTORY', payload: share })
    }
  }

  const onExplore = async () => {
    const url = `${windowsUtils.origin}/starter.zip`
    dispatch({ type: 'UPDATE', payload: { explore: true, list: false } })
    const project = await getProject(
      url,
      values,
      get(dependencies, 'list')
    ).catch(err => {
      toast.error(
        err || `Could not connect to server. Please check your network.`
      )
      onEscape()
    })
    setBlob(project)
  }

  const onShare = () => {
    dispatch({ type: 'UPDATE', payload: { share: true } })
  }

  return (
    <>
      <BodyClassName className={theme} />
      <Suspense fallback=''>
        <HotKeys
          onSubmit={() => {
            if (get(buttonSubmit, 'current')) {
              buttonSubmit.current.click()
            }
          }}
          onExplore={() => {
            if (get(buttonExplore, 'current')) {
              buttonExplore.current.click()
            }
          }}
          onDependency={event => {
            if (get(buttonDependency, 'current')) {
              buttonDependency.current.click()
            }
            event.preventDefault()
          }}
          onEscape={onEscape}
        />
      </Suspense>
      <div id='main'>
        {complete && (
          <Form onSubmit={onSubmit}>
            {/* <Header /> */}
            <DependencyDialog onClose={onEscape} />
            <Routes>
              <Route path='/' element={<Fields />} />
              <Route path='/database' element={<DatabaseForm />} />
              <Route path='/entities' element={<DomainClassForm />} />
              <Route
                path='/relationships'
                element={<AssociationDescriptionsForm />}
              />
              <Route
                path={'/dependencies'}
                element={<Dependency refButton={buttonDependency} />}
              />
              <Route path={'/diagram'} element={<Diagram />} />
            </Routes>
          </Form>
        )}
        <Actions>
          {generating ? (
            <span className='placeholder-button placeholder-button-submit placeholder-button-special'>
              Generating...
            </span>
          ) : (
            <Button
              id='generate-project'
              variant='primary'
              onClick={onSubmit}
              hotkey={`${windowsUtils.symb} + ⏎`}
              refButton={buttonSubmit}
              disabled={generating}
            >
              Generate
            </Button>
          )}
          <Button
            id='explore-project'
            onClick={onExplore}
            hotkey='Ctrl + Space'
            refButton={buttonExplore}
          >
            Explore
          </Button>
          <Button id='share-project' onClick={onShare}>
            Share...
          </Button>
        </Actions>
      </div>
      <Suspense fallback=''>
        <Share open={shareOpen || false} shareUrl={share} onClose={onEscape} />
        <Explore
          projectName={`${get(values, 'meta.artifact')}.zip`}
          blob={blob}
          open={exploreOpen || false}
          onClose={onEscape}
        />
        <History open={historyOpen || false} onClose={onEscape} />
      </Suspense>
    </>
  )
}
