import React from 'react';

type ChildrenProps = {
    children: React.ReactNode;
}

export const Header: React.FC<ChildrenProps> = ( props: ChildrenProps ) => {
    return (
        <div className="header">
            {props.children}
        </div>
    );
}


export const Logo: React.FC = () => {   
    
    const handleClick = () => {
        console.log('Button clicked: ' + this);
        
    };
    
    return (
        <h1 className="logo" onClick={ handleClick }>
            RateMyCSE
        </h1>
    );
}

export const Sidebar: React.FC<ChildrenProps> = ( props: ChildrenProps ) => {
    return (
        <div className="sidebar">
            {props.children}
        </div>
    );
}


export const LevelTab: React.FC<{ classlevel: string }> = ({ classlevel }) => {   
    
    const handleClick = () => {
        console.log('Button clicked: ' + classlevel);
        
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
