
export const colors = {
    secondary: "rgb(172, 177, 214)",
    primary : "rgb(236, 179, 113)",
    background: "rgb(130, 148, 196)",
    text: "rgb(202, 208, 226)",
    light:"rgb(255,255,255)",
    dark:"rgb(0,0,0)"
}

export const fonts = {
     
     smallFontSize : 15,
     smallMidFontSize:20,
     middleFontSize: 25,
     middleHighFontSize:30,
     highFontSize : 35,
     smallFontWeight:400,
     middleFontWeight:600,
     highFontWeight:800
}

export const shadows = {
       smallShadow : 2,
       middleShhadow:4,
       highShadow: 8
}

export const borderRadius = {
      smallRadius : 4,
      middleRadius:8,
      highRadius:12,
      circleRadius: (compWidth) => compWidth / 2,  
      generateRadius : (compWidth,rate) => compWidth / rate
}

export const spaces = {
     small : 5,
     middle:10,
     high : 20
}
