import React from 'react'

const Album = ({title,click_function,image,class1,classimgae,class2}) => {
  return (
    <div className={class1} onClick={()=>click_function(`${title}`)}>
      <div>
        <img src={image} alt={title} className={classimgae} />
      </div>
      <div className={class2}>
        <div>{title}</div>
        
      </div>
    </div>
  );
}

export default Album

