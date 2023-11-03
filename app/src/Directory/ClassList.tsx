import React, { useState, useEffect } from 'react';

interface ClassListProps {
    classLevel: string;
}

const ClassList: React.FC<ClassListProps> = ({ classLevel }) => {
    const [classList, setClassList] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/GetClassData?level=${classLevel}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setClassList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [classLevel]);

  return (
    <div>
      {classList.map((classItem) => {
        console.log('id:', classItem.id);
        console.log('name:', classItem.name);
        console.log('number:', classItem.number);
        console.log('description:', classItem.description);
  
        return (
          <div key={classItem.id} className="card">
            <h3>{classItem.name}</h3>
            <p>Number: {classItem.number}</p>
            <p>Description: {classItem.description}</p>
          </div>
        );
      })}
    </div>
  );
  
};

export default ClassList;
