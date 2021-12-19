import React, { useState, useContext, useEffect } from 'react';
import './App.scss';
import { UIProvider } from './Context/UIContext';
// Utils
import { Switch, Route, __RouterContext, useParams, useHistory, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import utils from './data/utils.json';

// Components
import Layout from './Components/Layout/Layout';
import Footer from './Components/Layout/Footer/Footer';
import Header from './Components/Layout/Header/Header';
import Home from './Components/Pages/Home/Home';
import About from './Components/Pages/About/About';
import Projects from './Components/Pages/Projects/Projects';
import Contact from './Components/Pages/Contact/Contact';
import WindowDimensionsProvider from './Components/Utils/WindowDimensionsProvider';

function App() {

  const history = useHistory();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [useBlackbars, setUseBlackbars] = useState(false);
  const [useBackground, setUseBackground] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [homeStages, setHomeStages] = useState({
    stage01: false,
    stage02: false,
    stage03: false
  });
  const [currentStage, setCurrentStage] = useState(null);

  const scrollToElem = (elem) => {
    document.getElementById(elem).scrollIntoView({
      behavior: 'smooth'
    });
  }

  // Methods
  const updateStages = (props, inViewport) => {
    if (props.stage) {
      const newStages = { ...homeStages };
      newStages[props.stage] = inViewport;
      setHomeStages(newStages)
    }
  }

  const drawerTogglerHandler = (close = false) => {
    setShowDrawer(!showDrawer);
  }

  // const handleScroll = (event) => {
  //   // setScrollPosition(window.pageYOffset);

  //   // const amount = event.target.body.scrollTop;
  //   // const amount = window.scrollY;

  //   // console.log(event.target.body.offsetHeight)
  //   // console.log(window.scrollY)
  //   // return (document.body.offsetHeight)
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   // document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  // }, []);

  // Transitions
  const location = useLocation();
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1, position: "absolute" },
    leave: { opacity: 0, position: "absolute" },
    trail: 800,
    order: ['leave', 'enter', 'update'],
    onDestroyed: () => {
      window.scrollTo(0, 0);
    }
  })

  // Render Variables
  const sections = transitions.map(({ item: location, props, key }) => (
    <animated.div key={key} style={{ ...props, position: "relative", width: "100%", top: 0 }}>
      <Switch location={location}>
        <Route path={utils.homeUrl + '/about'} component={About} />
        <Route path={utils.homeUrl + '/projects'} component={Projects} />
        <Route path={utils.homeUrl + '/contact'} component={Contact} />
        <Route path={utils.homeUrl} render={(props) => <Home />} />
      </Switch>
    </animated.div>
  ));

  return (
    <WindowDimensionsProvider>
      <UIProvider value={{
        updateStages, homeStages,
        setUseBlackbars, setUseBackground, scrollToElem,
        drawerTogglerHandler, showDrawer, setShowDrawer,
        currentStage, setCurrentStage
      }}>
        <div className="App">
          <Header blackbars={useBlackbars} />
          <Layout>
            {sections}
          </Layout>
          <Footer useBackground={useBackground} />
        </div>
      </UIProvider>
    </WindowDimensionsProvider>
  );
}

export default App;
