"use client"
import Button from "@/components/Button";
import StarsBg from "@/assets/stars.png"
import gridLines from "@/assets/grid-lines.png"
import { useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";
import { motion } from "framer-motion"

export const CallToAction = () => {

  const useRelativeMousePosition = (to: RefObject<HTMLDivElement>) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const updateMousePosition = (event: MouseEvent) => {
      if(!to.current)return;

      const { top , left} = to.current?.getBoundingClientRect();
      mouseX.set(event.x - top);
      mouseY.set(event.y - left);

    }

    useEffect(() => { 
      window.addEventListener('mousemove', updateMousePosition)
      return() => {
        window.removeEventListener('mousemove' , updateMousePosition);
      }
    },[])

    return [mouseX , mouseY];
  }

  const borderedDiv = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ['start end' , 'end start']
  })

  const backgroundPositionY = useTransform(scrollYProgress , [0,1], [-300,300]);

  const [mouseX , mouseY] = useRelativeMousePosition(borderedDiv);

  const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section ref={secRef} className="py-20 md:py-24">
      <div className="container">
        <motion.div 
        animate={{
          backgroundPositionX: StarsBg.width
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        ref={borderedDiv}
        className="border border-white/15 py-24 rounded-xl overflow-hidden relative group" 
        style={{
          backgroundImage: `url(${StarsBg.src})`,
          backgroundPositionY
        }}>
          <div className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700" style={{
            backgroundImage: `url(${gridLines.src})` 
          }}>
          </div>
          
          <motion.div className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"
          style={{
            maskImage : maskImage,
            backgroundImage: `url(${gridLines.src})` 
          }}>
          </motion.div>

          <div className="relative">
          <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium">
            AI-driven SEO for everyone.
          </h2>
          <p className="text-center max-w-xs mx-auto text-lg text-white/70 px-4 mt-5 tracking-tight">
            Archive clear, impactful results without the complexity.
          </p>
          <div className="flex justify-center mt-8">
            <Button>Join waitlist</Button>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
