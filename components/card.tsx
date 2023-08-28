"use client"

import React, {useState} from "react";
import {useAppContext} from "@/contexts/appContext";

type CardProps = {
    info: CardInfo
}

export default function Card({info}: CardProps) {
    const {toggleCardShow} = useAppContext();
    const [animate, setAnimate] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    function applyStyle() {
        if (info.found) {
            return;
        }

        if (isAnimating) {
            return;
        }

        setIsAnimating(true);
        setAnimate(true);

        setTimeout(() => {
            setAnimate(false);
            setIsAnimating(false);
        }, 400);
    }

    return <>
        <div onClick={() => {
            toggleCardShow(info.id);
            applyStyle();
        }}
             className={`${animate ? 'animate__animated animate__flipInY' : ''} bg-${info.found ? "green" : "orange"}-400 w-[150px] h-[200px] flex items-center justify-center text-7xl font-medium rounded-2xl shadow-xl`}>
            {info.show &&
                <>
                    <span>{info.text}</span>
                </>
            }
        </div>
    </>
}