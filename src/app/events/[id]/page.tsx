"use client"

import PageHeader from '@/components/PageHeader'
import { useGameData } from '@/context/GameDataProvider';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Game() {
    const router = useRouter();
    const { gameData } = useGameData();

    const [selectedOdd, setSelectedOdd] = useState<string | null>(null);
    const [bettingAmount, setBettingAmount] = useState<number>(0);
    const [winningAmount, setWinningAmount] = useState<number>(0);
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

    const handleOddClick = (odd: string, index: number) => {
        setSelectedOdd(odd);
        setWinningAmount(bettingAmount * Number(selectedOdd));
        switch(index) {
            case 0:
              setSelectedTeam(gameData.teams[0]);
              break;
            case 1:
              setSelectedTeam('Draw'); 
              break;
            case 2:
              setSelectedTeam(gameData.teams[1]);
              break;
            default:
              setSelectedTeam(null);
          }
    };

    useEffect(() => {
        setWinningAmount(bettingAmount * Number(selectedOdd));
      }, [selectedOdd, bettingAmount]);

    const handleBettingAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = Number(event.target.value);
        setBettingAmount(amount);
    };

    return (
        <>
            <PageHeader title={`${gameData.sport} Betting`} filter={false}/>

            <div className='bg-sec_2 h-4/6 mt-4 rounded-xl flex flex-col justify-center items-center'>
                <div className='flex justify-around items-center w-3/5'>
                    <div className='flex flex-col items-center justify-center'>
                        <img src={gameData.teamImage[0]} alt="team1" width={50} height={50} />
                        <p className="text-xs uppercase mt-2 font-bold">{gameData.teams[0]}</p>
                    </div>
                    <div className='flex flex-col mx-4'>
                        <p className="text-xs font-bold">{gameData.date}</p>
                        <p className="text-xs">{gameData.time}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src={gameData.teamImage[1]} alt="team2" width={50} height={50} />
                        <p className="text-xs uppercase mt-2 font-bold">{gameData.teams[1]}</p>
                    </div>
                </div>
                <div className='flex w-3/5 justify-around mt-8 mb-4'>
                    {gameData.odds.map((odd: string, index: number) => (
                        <button
                            key={index}
                            className={`${selectedOdd==odd ? 'bg-sec_dim' : 'bg-odd' } px-4 py-1 rounded-md font-cairo font-bold tracking-widest`}
                            onClick={() => handleOddClick(odd, index)}
                        >
                            {odd}
                        </button>
                    ))}
                </div>
                <div>
                    <div className='flex justify-around items-center mb-4'>
                        <p>Betting Amount</p>
                        <input
                            type="number"
                            className='w-1/5 bg-sec_2 border-2 border-sgrad rounded-md px-2 py-1'
                            value={bettingAmount !== 0 ? bettingAmount : ''}
                            onChange={handleBettingAmountChange}
                        />
                    </div>
                    <div className='flex justify-around items-center'>
                        {selectedTeam && <p>
                            If {selectedTeam === 'Draw' ? 'it Draws' : `${selectedTeam} wins, `} you win
                        </p>}
                        <p className='text-green_text'>{winningAmount}</p>
                    </div>
                </div>
                <button className='bg-sgrad mt-4 px-4 py-2 rounded-full font-cairo font-bold tracking-widest'>Bet Now</button>    
            </div>
        </>
    )
}
