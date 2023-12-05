import React, {useEffect, useState} from 'react';
import {Header, LevelTab, Login, Logo, Sidebar} from "./Layout-components";

type LayoutProps = {
    children: React.ReactNode;
}

export const HomeLayout: React.FC<LayoutProps> = ( props: LayoutProps ) => {
    var [isSignInHidden, setIsSignInHidden] = useState(false);
    const setSignInVisible = () => {
      setIsSignInHidden(false);
    };

    const setSignInInvisible = () => {
      setIsSignInHidden(true);
    };
    return (
        <div className='homelayout'>
            <Header>
                <Logo isSignInVisible={isSignInHidden} handleUnhideLogin={setSignInVisible} />
                <Login isSignInVisible={isSignInHidden} handleHideLogin={setSignInInvisible} />
            </Header>
            <Sidebar>
                <LevelTab classlevel='Home' isSignInVisible={isSignInHidden} handleUnhideLogin={setSignInVisible}/>
                <LevelTab classlevel='CSE 100s' isSignInVisible={isSignInHidden} handleUnhideLogin={setSignInVisible}/>
                <LevelTab classlevel='CSE 300s' isSignInVisible={isSignInHidden} handleUnhideLogin={setSignInVisible}/>
                <LevelTab classlevel='CSE 400s' isSignInVisible={isSignInHidden} handleUnhideLogin={setSignInVisible}/>
                <LevelTab classlevel='CSE 500s' isSignInVisible={isSignInHidden} handleUnhideLogin={setSignInVisible}/>
            </Sidebar>
            {props.children}
        </div>
    );
}
