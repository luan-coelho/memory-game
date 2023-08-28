"use client"

import React, {createContext, useContext, useState} from 'react';

interface AppContext {
    cardsInfo: CardInfo[];
    toggleCardShow: (id: number) => void;
}

const AppContext = createContext<AppContext | undefined>(undefined);

type AppProviderProps = {
    children: React.ReactNode
    cardsInfo: CardInfo[]
}

export function AppProvider({children, cardsInfo: initialCardsInfo}: AppProviderProps) {
    const [cardsInfo, setCardsInfo] = useState<CardInfo[]>(initialCardsInfo);
    const [cardSelected, setCardSelected] = useState<CardInfo>();

    const toggleCardShow = (id: number) => {
        const updatedCards = cardsInfo.map((card) => {
            if (card.id === id) {
                if (card.found) {
                    return card;
                }

                if (!cardSelected) {
                    setCardSelected(card)
                    return {...card, show: !card.show};
                } else {
                    setCardSelected(undefined)
                    if (cardSelected?.text == card.text) {
                        return {...card, found: true, show: !card.show};
                    }
                    return {...card, show: !card.show};
                }
            }
            return card;
        });
        setCardsInfo(updatedCards);
    };

    return (
        <AppContext.Provider value={{cardsInfo, toggleCardShow}}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = (): AppContext => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('AppContext deve ser usado dentro de um AppProvider');
    }
    return context;
};
