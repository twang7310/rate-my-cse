import React from 'react';

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
          <h1 className="welcome">Welcome to RateMyCSE</h1>
          <h3>Wondering if a UW CSE class is as hard as they say?</h3>
          <div className="howitworks">
            <h2>How it works:</h2>
            <h4 className="explanation">
              Students will post ratings based on 3 categories
            </h4>
            <div className="diff-box">
              <h3>Difficulty</h3>
            </div>
            <div className="work-box">
              <h3>Workload</h3>
            </div>
            <div className="prac-box">
              <h3>Practicality</h3>
            </div>
          </div>
        </div>
    );
}
