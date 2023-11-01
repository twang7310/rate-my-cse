import React from 'react';
import { useNavigate } from 'react-router-dom';

type LayoutProps = {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ( props: LayoutProps ) => {
    return (
        <div className='App'>
            <Header/>
            <Sidebar>
                <LevelTab classlevel='Home'/>
                <LevelTab classlevel='100s'/>
                <LevelTab classlevel='300s'/>
                <LevelTab classlevel='400s'/>
                <LevelTab classlevel='500s'/>
            </Sidebar>
            {props.children}
        </div>
    );
}

export const Header: React.FC = () => {
    return (
        <div className="header">
            {/* This is the content of the header */}
        </div>
    );
}

type SidebarProps = {
    children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ( props: SidebarProps ) => {
    return (
        <div className="sidebar">
            {props.children}
        </div>
    );
}


export const LevelTab: React.FC<{ classlevel: string }> = ({ classlevel }) => {   
    const navigate = useNavigate();
    
    const handleClick = () => {
        console.log('Button clicked: ' + classlevel);
        if (classlevel === 'Home') {
            navigate('/rate-my-cse/');
        } else {
            navigate('/rate-my-cse/cse' + classlevel);
        }
    };

    let label : string;
    if (classlevel === 'Home') {
        label = classlevel;
    } else {
        label = 'CSE ' + classlevel;
    }
    
    return (
        <button className="leveltab" data-testid={`levelTab-${classlevel}`}
                onClick={ handleClick }
        >
            {label}
        </button>
    );
}

export const InnerPage: React.FC = () => {
    return (
        <div className="innerpage">
            {/* This is the content of the inner page */}
        </div>
    );
}
