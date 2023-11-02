import React from 'react';
import {useNavigate} from 'react-router-dom';
import {GetDefaultRoute} from '../Helpers/utils';

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

export const GetClassNumber = ( label : string ) => {
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
            navigate('/' + GetDefaultRoute() + '/cse' + GetClassNumber(classlevel));
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

const RatingBox: React.FC<{label: string, rating: string}> = ({ label, rating }) => {
  const dynamicClassName = `ratingbox ratingbox-${rating}`;

  return (
    <div className={dynamicClassName}>
      {label}
    </div>
  );
};

type RatingDescProps = {
  rating: string;
  children: React.ReactNode;
}

export const RatingDesc: React.FC<RatingDescProps> = ( props: RatingDescProps ) => {
  const dynamicClassName = `ratingdesc ratingdesc-${props.rating}`;
  
  return (
      <div className={dynamicClassName}>
          {props.children}
      </div>
  );
}

export const InnerPage: React.FC = () => {
    return (
        <div className="innerpage">
          {/* This is the content of the inner page */}
          <h1 className="welcome">
            Welcome to RateMyCSE
          </h1>
          <h3>Wondering if a UW CSE class is as hard as they say?</h3>
          <div className="howitworks">
            <h2>How it works:</h2>
            <h3 className="explanation">
              Students will post ratings based on 3 categories
            </h3>
            <RatingBox label="Difficulty" rating="diff" />
            <RatingBox label="Workload" rating="work" />
            <RatingBox label="Practicality" rating="prac" />
            <RatingDesc rating="diff">
              A combination of how hard the class material was to 
              understand and how big of a workload there was
            </RatingDesc>
            <RatingDesc rating="work">
              Based on how much homework there is and how long the 
              homework takes.
            </RatingDesc>
            <RatingDesc rating="prac">
              How useful is this class in the real world? Have you
              seen the material in the industry?
            </RatingDesc>
            
          </div>
        </div>
    );
}
