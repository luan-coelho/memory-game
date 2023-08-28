"use client"

import Card from "@/components/card";
import {useAppContext} from "@/contexts/appContext";

export default function Home() {
    const {cardsInfo} = useAppContext();

    return (
        <>
            <div className="w-full h-full flex items-center justify-center">
                <div className=" w-3/12 grid grid-cols-3 gap-4">
                    {cardsInfo.map((info) => {
                        return (
                            <>
                                <Card key={info.id} info={info}/>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
