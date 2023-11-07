import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {GetDefaultRoute} from '../Helpers/utils';

type LayoutProps = {
    children: React.ReactNode;
}

export const HomeLayout: React.FC<LayoutProps> = ( props: LayoutProps ) => {
    return (
        <div className='homelayout'>
            <Header>
                <Logo/>
            </Header>
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

type HeaderProps = {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ( props: HeaderProps ) => {
  return (
      <div className="header">
          {props.children}
      </div>
  );
}

export const Logo: React.FC = () => {
    
  const handleClick = () => {};
  
  return (
      <h1 className="logo" onClick={ handleClick }>
          RateMyCSE
      </h1>
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

/* 
  Template for the rating boxes.

  Parameters:
  label - Text in the center of the box.
  rating - Determines the color and position of the box 
           (Difficulty, workload, practicality).
*/
const RatingBox: React.FC<{label: string, rating: string}> = ({ label, rating }) => {
  const dynamicclassname = `ratingbox ratingbox-${rating}`;

  return (
    <div className={dynamicclassname}>
      {label}
    </div>
  );
};

type RatingDescProps = {
  children: React.ReactNode;
}

/*
  Template for the descriptions underneath the rating boxes that accepts
  children as the text for the description.
*/
export const RatingDesc: React.FC<RatingDescProps> = ( props: RatingDescProps ) => {
  
  return (
      <div className="ratingdesc">
          {props.children}
      </div>
  );
}

export const HomePage: React.FC = () => {
    return (
        <div className="homepage">
          <h1 className="welcome">
            Welcome to RateMyCSE
          </h1>
          <h3>Wondering if a UW CSE class is as hard as they say?</h3>
          <div className="howitworks">
            <h2>How it works:</h2>
            <h3 className="explanation">
              Students will post ratings based on 3 categories
            </h3>
            <div className="ratingsflexbox">
              <RatingBox label="Difficulty" rating="diff" />
              <RatingBox label="Workload" rating="work" />
              <RatingBox label="Practicality" rating="prac" />
            </div>
            <div className="ratingsflexbox">
              <RatingDesc>
                A combination of how hard the class material was to 
                understand and how much effort the class takes to
                pass.
              </RatingDesc>
              <RatingDesc>
                Based on how much homework there is and how long the 
                homework takes.
              </RatingDesc>
              <RatingDesc>
                How useful is this class in the real world? Have you
                seen the material in the industry?
              </RatingDesc>
            </div>
          </div>
        </div>
    );
}

export const ClassRating: React.FC<{category: string, rating: number, type: string}> = ({category, rating, type}) => {
  const dynamicclassname = `ratings ratingbox-${type}`;

  let display : string;
  if (rating === null) {
    display = "N/A";
  } else {
    display = rating + "/5";
  }

  return(
    <div className="rating-pair">
      <div className="rating-category">{category}</div>
      <div className={dynamicclassname}>{display}</div>
    </div>
  );
}

interface ClassCardProps {
  num: number;
  name: string;
  desc: string;
  rating1: number;
  rating2: number;
  rating3: number;
}

export const ClassCard: React.FC<ClassCardProps> = (props) => {
  return (
    <div className="card">
      <div className="class-info">
        <div className="class-title">
          <p className="class-number bold">{`CSE ${props.num}`}</p>
          <p className="class-name bold">{props.name}</p>
        </div>
        <p className="class-description">Description: {props.desc}</p>
      </div>
      <div className="class-ratings">
        <ClassRating category="Difficulty" type="diff" rating={props.rating1}/>
        <ClassRating category="Workload" type="work" rating={props.rating2}/>
        <ClassRating category="Practicality" type="prac" rating={props.rating3}/>
      </div>
    </div>
  );
}

interface ClassListProps {
    classLevelNumber: string;
}
  
export const ClassList: React.FC<ClassListProps> = ({ classLevelNumber }) => {
    const [classList, setClassList] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
              const response = await fetch(`/api/GetClassData?level=${classLevelNumber}`);
              const data = await response.json();
              setClassList(data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
        };
        fetchData();
    }, [classLevelNumber]);

    return (
        <div className="innerpage">
          <div className="class-list">
            {classList.map((classItem) => (
              <ClassCard key={classItem.class_id} 
              num={classItem.number} 
              name={classItem.name} 
              desc={classItem.description} 
              rating1={classItem.rating_one} 
              rating2={classItem.rating_two} 
              rating3={classItem.rating_three}/>
            ))}
          </div>
        </div>
    );
};