import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";


interface transactionProps{
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

/*interface TransactionInput{
    title: string;
    amount: number;
    type: string;
    category: string;
}

ou 


//utilizando uma copia da interface transactionProps, 
//e omitindo os dados id, e createadAt dela, que a funçao nao precisara
type TransactionInput = Omit<transactionProps, 'id' | 'createdAt'>;

ou
*/

//Pick, pega somente os valores que voce escolhe da interface
type TransactionInput = Pick<transactionProps, 'title' | 'amount' | 'type' | 'category'>

interface TransactionsProviderProps{
    children: ReactNode;
}

interface TransactionsContextData{
    transactions: transactionProps[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);


export function TransactionsProvider({ children }: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<transactionProps[]>([]);

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput){
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction
        ]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )

}



export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;
}