import React from 'react';
import {useNavigate} from 'react-router-dom';
import {GetDefaultRoute} from '../utils';

type LayoutProps = {
    children: React.ReactNode;
}

export const HomeLayout: React.FC<LayoutProps> = ( props: LayoutProps ) => {
    return (
        <div className='homelayout'>
            <Header/>
            <Sidebar>
                <LevelTab classlevel='Home'/>
                <LevelTab classlevel='CSE 100s'/>
                <LevelTab classlevel='CSE 300s'/>
                <LevelTab classlevel='CSE 400s'/>
                <LevelTab classlevel='CSE 500s'/>
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

export const GetStringAfterSpace = ( label : string ) => {
    return label.split(" ", 2)[1];
}

export const LevelTab: React.FC<{ classlevel: string }> = ({ classlevel }) => {   
    const navigate = useNavigate();
    
    const handleClick = () => {
        if (classlevel === 'Home') {
            // Default route
            navigate('/' + GetDefaultRoute() + '/');
        } else {
            // Gets 'X00s' from 'CSE X00s' classlevel and routes to that page
            navigate('/' + GetDefaultRoute() + '/cse' + GetStringAfterSpace(classlevel));
        }
    };
    
    return (
        <button className="leveltab" data-testid={`levelTab-${classlevel}`}
                onClick={ handleClick }
        >
            {classlevel}
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
