import React, {useContext} from 'react';
import incomeImg from '../../assets/income.svg'; 
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { TransactionsContext } from '../../TransactionsContext';
import { ReturnReal } from '../../utils/returnReal';

import { Container } from "./styles";

export function Summary(){
    //context atualiza todas constantes que utilizam seus dados em tempo real
    const {transactions} = useContext(TransactionsContext);       

    /*
    const totalDeposits = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit'){
            return acc + transaction.amount;
        }

        return acc
    }, 0);

    const totalWithdraws = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'withdraw'){
            return acc + transaction.amount;
        }

        return acc
    }, 0)

    const total = totalDeposits - totalWithdraws;

    ou
    */

    const summary = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit'){
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    })

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    <ReturnReal value={summary.deposits}/>
                </strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomeImg} alt="Entradas" />
                </header>
                <strong>
                    -<ReturnReal value={summary.withdraws}/>
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Entradas" />
                </header>
                <strong>
                    <ReturnReal value={summary.total}/>
                </strong>
            </div>
        </Container>
    )
}


