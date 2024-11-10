"use client";
import { DotLottieCommonPlayer, DotLottiePlayer } from "@dotlottie/react-player";
import productImage from "@/assets/product-image.png";
import { ComponentPropsWithRef, useEffect, useRef, useState } from "react";
import { animate, useMotionTemplate, useMotionValue, ValueAnimationTransition } from "framer-motion";
import { motion } from "framer-motion";

const tabs = [
  {
    icon: "/assets/lottie/vroom.lottie",
    title: "User-friendly dashboard",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: "/assets/lottie/click.lottie",
    title: "One-click optimization",
    isNew: false,
    backgroundPositionX: 98,
    backgroundPositionY: 100,
    backgroundSizeX: 135,
  },
  {
    icon: "/assets/lottie/stars.lottie",
    title: "Smart keyword generator",
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 27,
    backgroundSizeX: 177,
  },
];


const FeatureTab = (props: typeof tabs[number] & ComponentPropsWithRef<'div'> & { selected : boolean}) => {

  const tab = props;
  const tabRef = useRef<HTMLDivElement>(null);
  const dotLottieRef = useRef<DotLottieCommonPlayer>(null);

  const Xpercentage = useMotionValue(0);
  const Ypercentage = useMotionValue(0);


  useEffect(() => {

    if(!tabRef.current || !props.selected ) return;

    Xpercentage.set(0);
    Ypercentage.set(0);
    const { height , width } = tabRef.current?.getBoundingClientRect();
    const circumference = 2*height + 2*width;

    const times = [0 , width/circumference  , (width + height)/circumference  , (width*2 + height ) / circumference , 1 ]
    const options: ValueAnimationTransition = {
      times,
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop"
    };

    animate(Xpercentage , [0, 100, 100, 0 , 0] , options)

    animate(Ypercentage , [0, 0, 100, 100 , 0] , options)

  } ,[props.selected])

  const handeTabHover = () => {
    
    if(!dotLottieRef.current)return;
    dotLottieRef.current.seek(0);
    dotLottieRef.current.play();
  }

  const makImage = useMotionTemplate`radial-gradient(80px 80px at ${Xpercentage}% ${Ypercentage}%, black, transparent)`;

  return (
    <div
      onClick={props.onClick}  
      onMouseEnter={handeTabHover}
      key={tab.title}
      ref={tabRef}
      className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1 relative"
    >
      {props.selected && (
        <motion.div
         style={{
          maskImage: makImage
         }}
         className="absolute inset-0 -m-px border border-[#A369FF] rounded-xl"></motion.div>
      )}

      <div className="size-12 border border-white/15 rounded-lg inline-flex items-center justify-center">
        <DotLottiePlayer ref={dotLottieRef} className="size-5" src={tab.icon} />
      </div>
      <div className="font-medium">{tab.title}</div>
      {tab.isNew && (
        <div className="text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold">
          new
        </div>
      )}
    </div>
  );
};

export const Features = () => {

  const[selectedTab , setSelectedTab] = useState<number>(0);

  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX);
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY);
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX);
  
  const handleSelectedTab = (index: number) => {
    setSelectedTab(index);
    
    const animateActions : ValueAnimationTransition =  {
      duration: 2,
      ease: "easeInOut"
    }
    
    animate(backgroundSizeX, [backgroundSizeX.get() , 100  , tabs[index].backgroundSizeX] , animateActions)
    
    animate(backgroundPositionX, [backgroundPositionX.get() , tabs[index].backgroundPositionX] ,animateActions)
    
    animate(backgroundPositionY, [backgroundPositionY.get() , tabs[index].backgroundPositionY] ,animateActions)
  }
  
  
    const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`;
    const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`;
    
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
          Elevate Your SEO efforts.
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tight text-center mt-5">
          from small startups to large enterprises, our AI-driven tool has
          revolunized the way bussiness approach SEO.
        </p>
        <div className="mt-10 flex flex-col lg:flex-row gap-3">
          {tabs.map((tab , index) => {
            return(
              <FeatureTab {...tab} selected={index === selectedTab}   onClick={() => {handleSelectedTab(index)}} key={tab.title} />
            )
          })}
        </div>
        <div className=" rounded-xl border border-white/20 mt-3">
          <motion.div
            className="aspect-video bg-cover rounded-lg border border-white/20"
            style={{
              backgroundPosition,
              backgroundSize,
              backgroundImage: `url(${productImage.src})`,
            }}
          ></motion.div>
        </div>
      </div>
    </section>
  );
};
